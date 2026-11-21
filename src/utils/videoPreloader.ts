import {useEffect, useState} from 'react';
import type {PortfolioProject} from '../data/portfolioData';

const preloadedBlobUrls = new Map<string, string>();
const inFlightDownloads = new Map<string, Promise<string | null>>();
const listeners = new Set<() => void>();

let queueStarted = false;
const queuedUrls: string[] = [];
const queuedSet = new Set<string>();
let activeCount = 0;
const MAX_CONCURRENCY = 3;

function isStreamableDirectVideo(url?: string): url is string {
  if (!url) return false;
  if (/^(blob:|data:)/i.test(url)) return false;
  if (/youtube\.com|youtu\.be|vimeo\.com/i.test(url)) return false;
  return true;
}

function notifyListeners(): void {
  listeners.forEach((listener) => listener());
}

async function downloadVideoToBlob(url: string): Promise<string | null> {
  const existingBlob = preloadedBlobUrls.get(url);
  if (existingBlob) return existingBlob;

  const existingPromise = inFlightDownloads.get(url);
  if (existingPromise) return existingPromise;

  const task = (async () => {
    try {
      const response = await fetch(url, {cache: 'force-cache'});
      if (!response.ok) return null;
      const blob = await response.blob();
      if (!blob || blob.size === 0) return null;
      const blobUrl = URL.createObjectURL(blob);
      preloadedBlobUrls.set(url, blobUrl);
      notifyListeners();
      return blobUrl;
    } catch {
      return null;
    } finally {
      inFlightDownloads.delete(url);
    }
  })();

  inFlightDownloads.set(url, task);
  return task;
}

function pumpQueue(concurrencyLimit = MAX_CONCURRENCY): void {
  while (activeCount < concurrencyLimit && queuedUrls.length > 0) {
    const nextUrl = queuedUrls.shift();
    if (!nextUrl) continue;
    queuedSet.delete(nextUrl);

    if (preloadedBlobUrls.has(nextUrl) || inFlightDownloads.has(nextUrl)) {
      continue;
    }

    activeCount += 1;
    void downloadVideoToBlob(nextUrl).finally(() => {
      activeCount = Math.max(0, activeCount - 1);
      pumpQueue();
    });
  }
}

export function getPreloadedVideoUrl(url?: string): string | undefined {
  if (!url) return undefined;
  return preloadedBlobUrls.get(url) ?? url;
}

export function isVideoPreloaded(url?: string): boolean {
  if (!url) return false;
  if (/^(blob:|data:)/i.test(url)) return true;
  return preloadedBlobUrls.has(url);
}

export function prioritizeVideoPreload(url?: string): void {
  if (!isStreamableDirectVideo(url)) return;
  if (preloadedBlobUrls.has(url) || inFlightDownloads.has(url)) return;

  const existingIdx = queuedUrls.indexOf(url);
  if (existingIdx !== -1) {
    queuedUrls.splice(existingIdx, 1);
  }
  queuedUrls.unshift(url);
  queuedSet.add(url);
  pumpQueue(MAX_CONCURRENCY + 1);
}

export function startPortfolioVideoPreload(projects: PortfolioProject[]): void {
  if (queueStarted || typeof window === 'undefined') return;
  queueStarted = true;

  const nav = navigator as Navigator & {connection?: {saveData?: boolean}};
  if (nav.connection?.saveData) return;

  // Load lightweight / featured reels first so nearly all cards become instant within seconds,
  // followed immediately by the longer ~1-minute commercial & narration films.
  const ordered = [...projects].sort((a, b) => {
    if (a.featured && !b.featured) return -1;
    if (!a.featured && b.featured) return 1;
    const aHeavy = /Download__[12]__/.test(a.videoUrl ?? '') ? 1 : 0;
    const bHeavy = /Download__[12]__/.test(b.videoUrl ?? '') ? 1 : 0;
    return aHeavy - bHeavy;
  });

  for (const project of ordered) {
    const url = project.videoUrl;
    if (!isStreamableDirectVideo(url)) continue;
    if (preloadedBlobUrls.has(url) || inFlightDownloads.has(url) || queuedSet.has(url)) continue;
    queuedUrls.push(url);
    queuedSet.add(url);
  }

  // Start right after initial critical paint (hero portrait + CSS)
  window.setTimeout(() => {
    pumpQueue();
  }, 60);
}

export function usePreloadedVideoUrl(url?: string): {src: string | undefined; isReadyInMemory: boolean} {
  const [, setVersion] = useState(0);

  useEffect(() => {
    const handleUpdate = () => setVersion((v) => v + 1);
    listeners.add(handleUpdate);
    return () => {
      listeners.delete(handleUpdate);
    };
  }, []);

  if (!url) return {src: undefined, isReadyInMemory: false};
  const blobUrl = preloadedBlobUrls.get(url);
  return {
    src: blobUrl ?? url,
    isReadyInMemory: Boolean(blobUrl) || /^(blob:|data:)/i.test(url),
  };
}
