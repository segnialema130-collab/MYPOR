import {useState, type FormEvent} from 'react';
import {Check, Copy, Instagram, Loader2, Mail, MessageCircle, Send, Youtube} from 'lucide-react';
import {BRAND_CONFIG} from '../data/portfolioData';

const PROJECT_TYPES = [
  'YouTube Video Editing',
  'Cinematic Video Editing',
  'Motion Graphics / 3D Logo',
  'Promotional Commercial',
  'Social Media Reels / Shorts',
  'Monthly Retainer',
];

export function ContactSection() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [projectType, setProjectType] = useState(PROJECT_TYPES[0]);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [sending, setSending] = useState(false);
  const [submittedMode, setSubmittedMode] = useState<'email' | 'relay' | null>(null);
  const [savedToInbox, setSavedToInbox] = useState(false);
  const [showStaticChannels, setShowStaticChannels] = useState(false);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleCopy = (key: string, value: string) => {
    navigator.clipboard?.writeText(value).catch(() => {});
    setCopiedKey(key);
    window.setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const cleanName = name.trim();
    const cleanEmail = email.trim();
    const cleanMessage = message.trim();

    if (!cleanName || !cleanEmail || !cleanMessage) {
      setError('Please enter your name, email address, and comment or idea.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
      setError('Please enter a valid email address.');
      return;
    }

    setError('');
    setShowStaticChannels(false);
    setSavedToInbox(false);
    setSending(true);

    let inboxSaved = false;

    try {
      try {
        const apiRes = await fetch('/api/contact', {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            name: cleanName,
            email: cleanEmail,
            projectType,
            message: cleanMessage,
          }),
        });

        const contentType = apiRes.headers.get('content-type') || '';
        const isJsonApi = contentType.includes('application/json');

        if (isJsonApi && apiRes.status !== 404 && apiRes.status !== 405) {
          const apiData = (await apiRes.json().catch(() => ({}))) as {
            ok?: boolean;
            error?: string;
            savedToInbox?: boolean;
            emailDelivered?: boolean;
          };

          if (!apiRes.ok || !apiData.ok) {
            setError(apiData.error || 'Could not send message right now. Please try again.');
            return;
          }

          inboxSaved = Boolean(apiData.savedToInbox);
          setSavedToInbox(inboxSaved);

          if (apiData.emailDelivered) {
            setSubmittedMode('email');
            return;
          }
        }
      } catch {
        // Continue to browser email relay when /api/contact is unavailable
      }

      // Browser FormData relay to FormSubmit (avoids JSON CORS preflight issues)
      const formData = new FormData();
      formData.append('name', cleanName);
      formData.append('email', cleanEmail);
      formData.append('projectType', projectType);
      formData.append('message', cleanMessage);
      formData.append('_replyto', cleanEmail);
      formData.append('_subject', `[PORTFOLIO] ${projectType} from ${cleanName}`);
      formData.append('_template', 'table');
      formData.append('_captcha', 'false');
      formData.append('_honey', '');
      if (typeof window !== 'undefined' && window.location?.href) {
        formData.append('_url', window.location.href);
      }

      const relayEndpoint = `https://formsubmit.co/ajax/${encodeURIComponent(BRAND_CONFIG.contact.email)}`;
      const relayRes = await fetch(relayEndpoint, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
        },
        body: formData,
      });

      const relayData = (await relayRes.json().catch(() => ({}))) as {
        success?: boolean | string;
        message?: string;
      };

      if (relayRes.ok && (relayData.success === true || relayData.success === 'true')) {
        setSubmittedMode('relay');
        return;
      }

      const needsActivation =
        typeof relayData.message === 'string' && /activat/i.test(relayData.message);

      setShowStaticChannels(true);
      if (needsActivation) {
        setError(
          inboxSaved
            ? `Your message is saved in Segni's Client Inbox, and the domain email verification link was just sent to ${BRAND_CONFIG.contact.email}. To notify Segni instantly right now, tap "Send via Gmail" or "Send via WhatsApp" below.`
            : `First-time email verification for this website link was sent to ${BRAND_CONFIG.contact.email} (Segni needs to click "Activate Form" once in Gmail). Tap "Send via Gmail" or "Send via WhatsApp" below to send your pre-filled message right now!`,
        );
      } else {
        setError(
          inboxSaved
            ? `Your message is saved in Segni's Client Inbox, but external email delivery could not complete automatically. Tap "Send via Gmail" or "Send via WhatsApp" below to reach Segni immediately.`
            : 'Direct email delivery could not complete automatically on this browser. Tap "Send via Gmail" or "Send via WhatsApp" below to send your pre-filled message in one tap.',
        );
      }
    } catch {
      setShowStaticChannels(true);
      setError(
        inboxSaved
          ? `Your message was saved in Segni's Client Inbox. You can also tap "Send via Gmail" or "Send via WhatsApp" below.`
          : 'Could not reach the email relay right now. Tap "Send via Gmail" or "Send via WhatsApp" below to send your pre-filled message instantly.',
      );
    } finally {
      setSending(false);
    }
  };

  const formattedText = `Hi Segni, I'm ${name.trim() || 'a client'} (${email.trim()}).\nProject: ${projectType}\n\n${message.trim()}`;
  const emailSubject = `[PORTFOLIO] ${projectType} from ${name.trim() || 'Portfolio Visitor'}`;
  const whatsappDirectHref = `${BRAND_CONFIG.contact.whatsappUrl}?text=${encodeURIComponent(formattedText)}`;
  const gmailComposeHref = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
    BRAND_CONFIG.contact.email,
  )}&su=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(formattedText)}`;
  const mailtoDirectHref = `mailto:${BRAND_CONFIG.contact.email}?subject=${encodeURIComponent(
    emailSubject,
  )}&body=${encodeURIComponent(formattedText)}`;

  return (
    <section id="contact" className="py-24 lg:py-36">
      <div className="mx-auto max-w-[1380px] px-6 sm:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Left Column: CTA & Direct Contact Channels */}
          <div className="lg:col-span-5">
            <p className="text-lg sm:text-xl font-semibold tracking-wide text-orange-400">Start a Project</p>
            <h2 className="mt-4 font-display text-4xl font-bold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-[3.5rem]">
              Let&apos;s Create Something Amazing Together.
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-zinc-300">
              Enter your name, email, and idea in the form to send it straight to Segni&apos;s Client Inbox—or reach out
              instantly via WhatsApp or Telegram.
            </p>

            {/* Contact Channel Rows */}
            <div className="mt-9 space-y-3.5">
              {/* WhatsApp */}
              <div className="flex items-center justify-between gap-3 rounded-xl border border-orange-500/15 bg-[#0E0D0C]/88 backdrop-blur-md px-5 py-4">
                <a
                  href={BRAND_CONFIG.contact.whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex min-w-0 items-center gap-3.5 text-base text-zinc-200 hover:text-white transition-colors"
                >
                  <MessageCircle className="h-5 w-5 shrink-0 text-orange-400" />
                  <div className="min-w-0">
                    <span className="block text-sm text-zinc-400">WhatsApp</span>
                    <span className="block truncate font-medium font-mono tabular-nums">
                      {BRAND_CONFIG.contact.whatsappNumber}
                    </span>
                  </div>
                </a>
                <button
                  type="button"
                  onClick={() => handleCopy('whatsapp', BRAND_CONFIG.contact.whatsappNumber)}
                  aria-label="Copy WhatsApp number"
                  className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-zinc-900 text-zinc-300 hover:text-orange-300 cursor-pointer"
                >
                  {copiedKey === 'whatsapp' ? (
                    <Check className="h-4 w-4 text-orange-400" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </button>
              </div>

              {/* Telegram */}
              <a
                href={BRAND_CONFIG.contact.telegramUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between gap-3 rounded-xl border border-orange-500/15 bg-[#0E0D0C]/88 backdrop-blur-md px-5 py-4 text-base text-zinc-200 transition-colors hover:border-orange-400/55 hover:text-white"
              >
                <span className="flex items-center gap-3.5">
                  <Send className="h-5 w-5 shrink-0 text-orange-400" />
                  <span>
                    <span className="block text-sm text-zinc-400">Telegram</span>
                    <span className="block font-medium">{BRAND_CONFIG.contact.telegramHandle}</span>
                  </span>
                </span>
                <span className="text-sm text-zinc-400">Message</span>
              </a>

              {/* Email */}
              <div className="flex items-center justify-between gap-3 rounded-xl border border-orange-500/15 bg-[#0E0D0C]/88 backdrop-blur-md px-5 py-4">
                <a
                  href={`mailto:${BRAND_CONFIG.contact.email}`}
                  className="flex min-w-0 items-center gap-3.5 text-base text-zinc-200 hover:text-white transition-colors"
                >
                  <Mail className="h-5 w-5 shrink-0 text-amber-300" />
                  <div className="min-w-0">
                    <span className="block text-sm text-zinc-400">Email</span>
                    <span className="block truncate font-medium">{BRAND_CONFIG.contact.email}</span>
                  </div>
                </a>
                <button
                  type="button"
                  onClick={() => handleCopy('email', BRAND_CONFIG.contact.email)}
                  aria-label="Copy email address"
                  className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-zinc-900 text-zinc-300 hover:text-orange-300 cursor-pointer"
                >
                  {copiedKey === 'email' ? <Check className="h-4 w-4 text-orange-400" /> : <Copy className="h-4 w-4" />}
                </button>
              </div>

              {/* Social Pair: Instagram & YouTube */}
              <div className="grid grid-cols-2 gap-3.5 pt-1">
                <a
                  href={BRAND_CONFIG.contact.instagramUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 rounded-xl border border-orange-500/15 bg-[#0E0D0C]/88 backdrop-blur-md px-5 py-3.5 text-base text-zinc-200 transition-colors hover:border-orange-400/55 hover:text-white"
                >
                  <Instagram className="h-5 w-5 shrink-0 text-orange-400" />
                  <span className="truncate font-medium">Instagram</span>
                </a>
                <a
                  href={BRAND_CONFIG.contact.youtubeUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 rounded-xl border border-orange-500/15 bg-[#0E0D0C]/88 backdrop-blur-md px-5 py-3.5 text-base text-zinc-200 transition-colors hover:border-orange-400/55 hover:text-white"
                >
                  <Youtube className="h-5 w-5 shrink-0 text-orange-400" />
                  <span className="truncate font-medium">YouTube</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Instant Client Inbox Submission Form */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl border border-orange-500/15 bg-[#0E0D0C]/90 backdrop-blur-md p-7 sm:p-10">
              {submittedMode ? (
                <div className="py-10 text-center">
                  <div className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-full border border-orange-400/50 bg-orange-500/15 text-orange-400">
                    <Check className="h-6 w-6" />
                  </div>
                  <h3 className="mt-5 font-display text-2xl font-bold text-white">
                    Message Sent Directly!
                  </h3>
                  <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-zinc-300">
                    Thank you, {name}. Your comment and email (<span className="font-medium text-orange-300">{email}</span>)
                    {submittedMode === 'email'
                      ? ` have been delivered directly to ${BRAND_CONFIG.contact.email}${savedToInbox ? " and saved in Segni's Client Inbox." : '.'}`
                      : ` have been sent straight to ${BRAND_CONFIG.contact.email}${savedToInbox ? " and saved in Segni's Client Inbox." : '.'}`}
                  </p>
                  <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
                    <a
                      href={whatsappDirectHref}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex min-h-[44px] items-center gap-2 rounded-lg border border-orange-400/45 bg-orange-500/15 px-5 py-2.5 text-sm font-semibold text-orange-300 hover:bg-orange-500/25"
                    >
                      <MessageCircle className="h-4 w-4" />
                      Also Ping on WhatsApp
                    </a>
                    <button
                      type="button"
                      onClick={() => {
                        setSubmittedMode(null);
                        setSavedToInbox(false);
                        setShowStaticChannels(false);
                        setName('');
                        setEmail('');
                        setMessage('');
                      }}
                      className="inline-flex min-h-[44px] items-center rounded-lg bg-gradient-to-r from-orange-500 to-amber-500 px-6 py-2.5 text-sm font-semibold text-black hover:from-orange-400 hover:to-amber-400 cursor-pointer"
                    >
                      Send Another Message
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-6">
                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="contact-name" className="block text-sm font-medium text-zinc-300">
                        Your Name
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        required
                        disabled={sending}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Alex Mercer"
                        className="mt-2 w-full rounded-lg border border-white/15 bg-zinc-950 px-4 py-3.5 text-base text-white placeholder-zinc-500 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500 disabled:opacity-60"
                      />
                    </div>

                    <div>
                      <label htmlFor="contact-email" className="block text-sm font-medium text-zinc-300">
                        Your Email Address
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        required
                        disabled={sending}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@studio.com"
                        className="mt-2 w-full rounded-lg border border-white/15 bg-zinc-950 px-4 py-3.5 text-base text-white placeholder-zinc-500 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500 disabled:opacity-60"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="contact-service" className="block text-sm font-medium text-zinc-300">
                      Project Category
                    </label>
                    <select
                      id="contact-service"
                      disabled={sending}
                      value={projectType}
                      onChange={(e) => setProjectType(e.target.value)}
                      className="mt-2 w-full rounded-lg border border-white/15 bg-zinc-950 px-4 py-3.5 text-base text-white focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500 disabled:opacity-60"
                    >
                      {PROJECT_TYPES.map((type) => (
                        <option key={type} value={type} className="bg-zinc-950 text-white">
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="contact-message" className="block text-sm font-medium text-zinc-300">
                      Your Idea / Comment
                    </label>
                    <textarea
                      id="contact-message"
                      rows={4}
                      required
                      disabled={sending}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Write your idea, comment, footage details, or project deadline..."
                      className="mt-2 w-full resize-none rounded-lg border border-white/15 bg-zinc-950 px-4 py-3.5 text-base text-white placeholder-zinc-500 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500 disabled:opacity-60"
                    />
                  </div>

                  {error && (
                    <div
                      role="alert"
                      className="space-y-3 rounded-lg border border-orange-500/35 bg-orange-500/10 p-3.5 text-xs font-medium text-orange-200"
                    >
                      <p>{error}</p>
                      {showStaticChannels && (
                        <div className="flex flex-wrap gap-2 pt-1">
                          <a
                            href={gmailComposeHref}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1.5 rounded-md bg-orange-500 px-3 py-1.5 text-xs font-semibold text-black hover:bg-orange-400"
                          >
                            <Mail className="h-3.5 w-3.5" />
                            Send via Gmail
                          </a>
                          <a
                            href={whatsappDirectHref}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1.5 rounded-md border border-orange-400/45 bg-orange-500/15 px-3 py-1.5 text-xs font-semibold text-orange-200 hover:bg-orange-500/25"
                          >
                            <MessageCircle className="h-3.5 w-3.5" />
                            Send via WhatsApp
                          </a>
                          <a
                            href={mailtoDirectHref}
                            className="inline-flex items-center gap-1.5 rounded-md border border-white/15 bg-zinc-900 px-3 py-1.5 text-xs font-semibold text-white hover:border-orange-400/60"
                          >
                            <Mail className="h-3.5 w-3.5 text-orange-400" />
                            Open Email App
                          </a>
                          <a
                            href={BRAND_CONFIG.contact.telegramUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1.5 rounded-md border border-white/15 bg-zinc-900 px-3 py-1.5 text-xs font-semibold text-white hover:border-orange-400/60"
                          >
                            <Send className="h-3.5 w-3.5 text-orange-400" />
                            Telegram
                          </a>
                        </div>
                      )}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={sending}
                    className="inline-flex min-h-[52px] w-full items-center justify-center gap-2.5 rounded-lg bg-gradient-to-r from-orange-500 to-amber-500 px-6 py-3.5 text-base font-bold text-black transition-all duration-150 hover:from-orange-400 hover:to-amber-400 hover:shadow-[0_0_24px_rgba(249,115,22,0.4)] disabled:opacity-60 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400"
                  >
                    {sending ? (
                      <>
                        <Loader2 className="h-5 w-5 animate-spin" />
                        Sending Message...
                      </>
                    ) : (
                      <>
                        <Send className="h-5 w-5" />
                        Send Message Directly
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
