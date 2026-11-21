import {useEffect, useState} from 'react';
import {AnimatePresence, motion} from 'motion/react';
import {Check, Download, FileText, Loader2, X} from 'lucide-react';
import {BRAND_CONFIG} from '../data/portfolioData';
import {downloadCvPdf, fetchCvBlobUrl} from '../utils/cvDownload';

interface CvPreviewModalProps {
  open: boolean;
  onClose: () => void;
}

export function CvPreviewModal({open, onClose}: CvPreviewModalProps) {
  const [pdfBlobUrl, setPdfBlobUrl] = useState<string | null>(null);
  const [loadingPdf, setLoadingPdf] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [downloaded, setDownloaded] = useState(false);
  const [viewMode, setViewMode] = useState<'pdf' | 'reader'>('pdf');

  useEffect(() => {
    if (!open) return;
    let revokedUrl: string | null = null;
    let active = true;
    setLoadingPdf(true);

    fetchCvBlobUrl().then((url) => {
      if (!active) {
        if (url) URL.revokeObjectURL(url);
        return;
      }
      revokedUrl = url;
      setPdfBlobUrl(url);
      setLoadingPdf(false);
    });

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);

    return () => {
      active = false;
      window.removeEventListener('keydown', onKeyDown);
      if (revokedUrl) URL.revokeObjectURL(revokedUrl);
      setPdfBlobUrl(null);
    };
  }, [open, onClose]);

  const handleDownload = async () => {
    if (downloading) return;
    setDownloading(true);
    const res = await downloadCvPdf();
    setDownloading(false);
    if (res.ok) {
      setDownloaded(true);
      window.setTimeout(() => setDownloaded(false), 3000);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="cv-modal-backdrop"
          initial={{opacity: 0}}
          animate={{opacity: 1}}
          exit={{opacity: 0}}
          transition={{duration: 0.2}}
          onClick={onClose}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 sm:p-6 overflow-y-auto"
          role="dialog"
          aria-modal="true"
          aria-labelledby="cv-modal-title"
        >
          <motion.div
            initial={{opacity: 0, scale: 0.97, y: 12}}
            animate={{opacity: 1, scale: 1, y: 0}}
            exit={{opacity: 0, scale: 0.97, y: 12}}
            transition={{duration: 0.22, ease: [0.16, 1, 0.3, 1]}}
            onClick={(e) => e.stopPropagation()}
            className="relative flex max-h-[90vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl border border-orange-500/25 bg-[#0E0D0C] shadow-2xl"
          >
            {/* Header */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-orange-500/20 px-5 py-4 sm:px-6">
              <div className="flex items-center gap-3 min-w-0">
                <div className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-orange-400/45 bg-orange-500/15 text-orange-300">
                  <FileText className="h-5 w-5" />
                </div>
                <div className="min-w-0">
                  <h3 id="cv-modal-title" className="truncate font-display text-lg sm:text-xl font-bold text-white">
                    Segni Alemayehu — Curriculum Vitae (PDF)
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-400">Readable PDF Document · 1.1 MB</p>
                </div>
              </div>

              <div className="flex items-center gap-2.5 shrink-0">
                <div className="inline-flex rounded-lg border border-white/10 bg-zinc-900 p-0.5 text-xs font-medium">
                  <button
                    type="button"
                    onClick={() => setViewMode('pdf')}
                    className={`rounded-md px-3 py-1.5 transition-colors cursor-pointer ${
                      viewMode === 'pdf' ? 'bg-orange-500 text-black font-semibold' : 'text-zinc-300 hover:text-white'
                    }`}
                  >
                    PDF View
                  </button>
                  <button
                    type="button"
                    onClick={() => setViewMode('reader')}
                    className={`rounded-md px-3 py-1.5 transition-colors cursor-pointer ${
                      viewMode === 'reader' ? 'bg-orange-500 text-black font-semibold' : 'text-zinc-300 hover:text-white'
                    }`}
                  >
                    Text Reader
                  </button>
                </div>

                <button
                  type="button"
                  onClick={handleDownload}
                  disabled={downloading}
                  className="inline-flex min-h-[40px] items-center gap-2 rounded-lg bg-gradient-to-r from-orange-500 to-amber-400 px-4 py-2 text-sm font-bold text-black transition-all hover:from-orange-400 hover:to-amber-300 disabled:opacity-60 cursor-pointer"
                >
                  {downloading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Downloading...
                    </>
                  ) : downloaded ? (
                    <>
                      <Check className="h-4 w-4" />
                      PDF Saved
                    </>
                  ) : (
                    <>
                      <Download className="h-4 w-4" />
                      Download PDF
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Close CV preview"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/15 bg-zinc-900 text-zinc-200 hover:border-orange-400/55 hover:text-orange-300 cursor-pointer"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto bg-zinc-950">
              {viewMode === 'pdf' ? (
                <div className="relative h-[70vh] min-h-[460px] w-full">
                  {loadingPdf ? (
                    <div className="flex h-full items-center justify-center gap-2 text-sm text-zinc-300">
                      <Loader2 className="h-5 w-5 animate-spin text-orange-400" />
                      Loading PDF document...
                    </div>
                  ) : pdfBlobUrl ? (
                    <object
                      data={pdfBlobUrl}
                      type="application/pdf"
                      className="h-full w-full"
                    >
                      <iframe
                        src={pdfBlobUrl}
                        title="Segni Alemayehu CV PDF"
                        className="h-full w-full border-0"
                      />
                    </object>
                  ) : (
                    <iframe
                      src={BRAND_CONFIG.cvUrl}
                      title="Segni Alemayehu CV PDF"
                      className="h-full w-full border-0"
                    />
                  )}
                </div>
              ) : (
                <div className="mx-auto max-w-3xl bg-white text-zinc-900 p-6 sm:p-10 shadow-inner">
                  <div className="border-b border-zinc-200 pb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                      <h4 className="font-display text-3xl font-bold text-[#5A2D46]">SEGNI ALEMAYEHU</h4>
                      <p className="mt-1 text-base font-medium text-zinc-700">Professional Video Editor</p>
                    </div>
                    <div className="text-sm text-zinc-600 space-y-0.5">
                      <p>{BRAND_CONFIG.contact.email}</p>
                      <p>0963749142 · Robe, Ethiopia</p>
                    </div>
                  </div>

                  <div className="mt-6 space-y-6 text-sm leading-relaxed text-zinc-800">
                    <section>
                      <h5 className="font-bold tracking-wide text-[#5A2D46] uppercase">Professional Profile</h5>
                      <p className="mt-1.5">
                        I am a creative and detail-oriented Professional Video Editor with a strong passion for
                        transforming raw footage into engaging, high-quality visual content. I specialize in video
                        editing, motion graphics, visual storytelling, and creating compelling content for digital
                        platforms.
                      </p>
                    </section>

                    <section>
                      <h5 className="font-bold tracking-wide text-[#5A2D46] uppercase">Editing Approach</h5>
                      <p className="mt-1.5">
                        My editing approach focuses on creativity, smooth transitions, professional color grading,
                        sound design, and effective storytelling. I work with modern video editing tools, including
                        Adobe Premiere Pro, Adobe After Effects, and CapCut, to produce visually appealing and
                        professional video content for different platforms and audiences.
                      </p>
                    </section>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <section>
                        <h5 className="font-bold tracking-wide text-[#5A2D46] uppercase">Technical Skills</h5>
                        <ul className="mt-1.5 list-disc pl-5 space-y-1">
                          <li>Video editing and timeline organization</li>
                          <li>Motion graphics and animated titles</li>
                          <li>Color correction and grading</li>
                          <li>Audio, music, and sound balancing</li>
                          <li>Social media video content creation</li>
                          <li>Video exporting for digital platforms</li>
                        </ul>
                      </section>

                      <section className="space-y-4">
                        <div>
                          <h5 className="font-bold tracking-wide text-[#5A2D46] uppercase">Editing Software</h5>
                          <ul className="mt-1.5 list-disc pl-5 space-y-1">
                            <li>Adobe Premiere Pro</li>
                            <li>Adobe After Effects</li>
                            <li>CapCut</li>
                          </ul>
                        </div>
                        <div>
                          <h5 className="font-bold tracking-wide text-[#5A2D46] uppercase">Languages</h5>
                          <p className="mt-1.5">English – Intermediate · Afaan Oromoo</p>
                        </div>
                      </section>
                    </div>

                    <section>
                      <h5 className="font-bold tracking-wide text-[#5A2D46] uppercase">Career Objective</h5>
                      <p className="mt-1.5">
                        I am passionate about bringing ideas to life through video, maintaining high-quality standards,
                        and continuously improving my creative and technical skills. My goal is to deliver engaging video
                        experiences that communicate messages effectively and capture the audience&apos;s attention.
                      </p>
                    </section>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
