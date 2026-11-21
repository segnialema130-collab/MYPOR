import {BRAND_CONFIG} from '../data/portfolioData';

export interface PdfDownloadResult {
  ok: boolean;
  error?: string;
}

/**
 * Fetches the CV PDF bytes, verifies the `%PDF-` signature, and triggers a clean
 * `application/pdf` Blob download so browsers always save a valid readable PDF file.
 */
export async function downloadCvPdf(): Promise<PdfDownloadResult> {
  try {
    const response = await fetch(BRAND_CONFIG.cvUrl, {
      method: 'GET',
      credentials: 'same-origin',
      cache: 'no-cache',
    });

    if (!response.ok) {
      return {ok: false, error: `Could not fetch CV (HTTP ${response.status}).`};
    }

    const buffer = await response.arrayBuffer();
    if (buffer.byteLength < 100) {
      return {ok: false, error: 'Downloaded PDF file appears empty.'};
    }

    const headerBytes = new Uint8Array(buffer.slice(0, 5));
    const signature = String.fromCharCode(...headerBytes);
    if (signature !== '%PDF-') {
      return {ok: false, error: 'File returned by server is not a valid PDF document.'};
    }

    const pdfBlob = new Blob([buffer], {type: 'application/pdf'});
    const blobUrl = URL.createObjectURL(pdfBlob);

    const anchor = document.createElement('a');
    anchor.href = blobUrl;
    anchor.download = BRAND_CONFIG.cvDownloadName;
    anchor.type = 'application/pdf';
    anchor.style.display = 'none';
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);

    window.setTimeout(() => {
      URL.revokeObjectURL(blobUrl);
    }, 60_000);

    return {ok: true};
  } catch {
    return {ok: false, error: 'Unable to download PDF in this browser context.'};
  }
}

export async function fetchCvBlobUrl(): Promise<string | null> {
  try {
    const response = await fetch(BRAND_CONFIG.cvUrl, {
      method: 'GET',
      credentials: 'same-origin',
    });
    if (!response.ok) return null;
    const buffer = await response.arrayBuffer();
    const headerBytes = new Uint8Array(buffer.slice(0, 5));
    if (String.fromCharCode(...headerBytes) !== '%PDF-') return null;
    const blob = new Blob([buffer], {type: 'application/pdf'});
    return URL.createObjectURL(blob);
  } catch {
    return null;
  }
}
