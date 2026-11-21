import type {IncomingMessage, ServerResponse} from 'http';
import nodemailer from 'nodemailer';

const TARGET_EMAIL = 'segnialema130@gmail.com';
const MAX_BODY_BYTES = 16 * 1024;
const RATE_WINDOW_MS = 10 * 60 * 1000;
const RATE_MAX_REQUESTS = 10;

interface RateLimitEntry {
  count: number;
  resetAt: number;
}

const rateLimitMap = new Map<string, RateLimitEntry>();

type VercelRequest = IncomingMessage & {
  body?: unknown;
};

function sendJson(res: ServerResponse, statusCode: number, payload: Record<string, unknown>): void {
  res.statusCode = statusCode;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.end(JSON.stringify(payload));
}

function getClientIp(req: IncomingMessage): string {
  const forwarded = req.headers['x-forwarded-for'];
  if (typeof forwarded === 'string' && forwarded.trim()) {
    return forwarded.split(',')[0].trim();
  }
  if (Array.isArray(forwarded) && forwarded[0]) {
    return forwarded[0].trim();
  }
  return req.socket?.remoteAddress || 'unknown';
}

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, {count: 1, resetAt: now + RATE_WINDOW_MS});
    return false;
  }
  if (entry.count >= RATE_MAX_REQUESTS) {
    return true;
  }
  entry.count += 1;
  return false;
}

function stripHeaderBreaks(value: string): string {
  return value.replace(/[\r\n]+/g, ' ').trim();
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

async function readJsonBody(req: VercelRequest): Promise<Record<string, unknown> | null> {
  if (req.body && typeof req.body === 'object' && !Buffer.isBuffer(req.body)) {
    return req.body as Record<string, unknown>;
  }
  if (typeof req.body === 'string') {
    try {
      const parsed = JSON.parse(req.body);
      return parsed && typeof parsed === 'object' ? (parsed as Record<string, unknown>) : null;
    } catch {
      return null;
    }
  }

  return new Promise((resolve) => {
    const chunks: Buffer[] = [];
    let totalBytes = 0;
    let settled = false;

    req.on('data', (chunk: Buffer) => {
      if (settled) return;
      totalBytes += chunk.length;
      if (totalBytes > MAX_BODY_BYTES) {
        settled = true;
        resolve(null);
        return;
      }
      chunks.push(chunk);
    });

    req.on('end', () => {
      if (settled) return;
      settled = true;
      try {
        const raw = Buffer.concat(chunks).toString('utf8');
        const parsed = JSON.parse(raw);
        resolve(parsed && typeof parsed === 'object' ? (parsed as Record<string, unknown>) : null);
      } catch {
        resolve(null);
      }
    });

    req.on('error', () => {
      if (!settled) {
        settled = true;
        resolve(null);
      }
    });
  });
}

export default async function handler(req: VercelRequest, res: ServerResponse): Promise<void> {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    sendJson(res, 405, {ok: false, error: 'Method not allowed.'});
    return;
  }

  const clientIp = getClientIp(req);
  if (isRateLimited(clientIp)) {
    sendJson(res, 429, {
      ok: false,
      error: 'Too many submissions. Please wait a few minutes before trying again.',
    });
    return;
  }

  const body = await readJsonBody(req);
  if (!body) {
    sendJson(res, 400, {ok: false, error: 'Invalid request payload.'});
    return;
  }

  const rawName = typeof body.name === 'string' ? stripHeaderBreaks(body.name) : '';
  const rawEmail = typeof body.email === 'string' ? stripHeaderBreaks(body.email) : '';
  const rawProjectType =
    typeof body.projectType === 'string' ? stripHeaderBreaks(body.projectType) : 'Video Project';
  const rawMessage = typeof body.message === 'string' ? body.message.trim() : '';

  if (!rawName || rawName.length > 120) {
    sendJson(res, 400, {ok: false, error: 'Please enter a valid name (1–120 characters).'});
    return;
  }

  if (!rawEmail || rawEmail.length > 160 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(rawEmail)) {
    sendJson(res, 400, {ok: false, error: 'Please enter a valid email address.'});
    return;
  }

  if (!rawMessage || rawMessage.length > 4000) {
    sendJson(res, 400, {ok: false, error: 'Please write a message (1–4000 characters).'});
    return;
  }

  const projectType = rawProjectType.slice(0, 100) || 'Video Project';
  const subject = `[PORTFOLIO] ${projectType} from ${rawName}`;
  const textBody = [
    'New portfolio inquiry for Segni Alemayehu',
    '',
    `Name: ${rawName}`,
    `Email: ${rawEmail}`,
    `Category: ${projectType}`,
    '',
    'Message:',
    rawMessage,
  ].join('\n');

  const htmlBody = `
    <div style="font-family: Arial, sans-serif; color: #18181b; line-height: 1.6;">
      <h2 style="margin-bottom: 12px;">New Portfolio Inquiry — PORTFOLIO</h2>
      <p><strong>Name:</strong> ${escapeHtml(rawName)}</p>
      <p><strong>Email:</strong> ${escapeHtml(rawEmail)}</p>
      <p><strong>Category:</strong> ${escapeHtml(projectType)}</p>
      <hr style="border: none; border-top: 1px solid #e4e4e7; margin: 16px 0;" />
      <p><strong>Message:</strong></p>
      <p style="white-space: pre-wrap;">${escapeHtml(rawMessage)}</p>
    </div>
  `;

  const forwardedVia: string[] = [];

  const smtpPass = process.env.SMTP_PASS || process.env.GMAIL_APP_PASSWORD;
  const smtpUser = process.env.SMTP_USER || TARGET_EMAIL;
  if (smtpPass) {
    try {
      const port = Number(process.env.SMTP_PORT) || 465;
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST || 'smtp.gmail.com',
        port,
        secure: port === 465,
        auth: {user: smtpUser, pass: smtpPass},
      });
      await transporter.sendMail({
        from: `"PORTFOLIO Inquiry" <${smtpUser}>`,
        to: TARGET_EMAIL,
        replyTo: rawEmail,
        subject,
        text: textBody,
        html: htmlBody,
      });
      forwardedVia.push('smtp');
    } catch (err) {
      console.error('Vercel SMTP forward skipped:', err);
    }
  }

  const resendKey = process.env.RESEND_API_KEY?.trim();
  if (resendKey) {
    try {
      const resendRes = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${resendKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: process.env.RESEND_FROM || 'PORTFOLIO <onboarding@resend.dev>',
          to: [TARGET_EMAIL],
          reply_to: rawEmail,
          subject,
          text: textBody,
          html: htmlBody,
        }),
      });
      if (resendRes.ok) {
        forwardedVia.push('resend');
      }
    } catch (err) {
      console.error('Vercel Resend forward skipped:', err);
    }
  }

  const web3FormsKey = process.env.WEB3FORMS_ACCESS_KEY?.trim();
  if (web3FormsKey) {
    try {
      const w3Res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          access_key: web3FormsKey,
          name: rawName,
          email: rawEmail,
          replyto: rawEmail,
          subject,
          category: projectType,
          message: rawMessage,
        }),
      });
      const w3Data = (await w3Res.json().catch(() => ({}))) as {success?: boolean};
      if (w3Res.ok && w3Data.success) {
        forwardedVia.push('web3forms');
      }
    } catch (err) {
      console.error('Vercel Web3Forms forward skipped:', err);
    }
  }

  const tgToken = process.env.TELEGRAM_BOT_TOKEN?.trim();
  const tgChatId = process.env.TELEGRAM_CHAT_ID?.trim();
  if (tgToken && tgChatId) {
    try {
      const tgText = `New PORTFOLIO Inquiry\nName: ${rawName}\nEmail: ${rawEmail}\nCategory: ${projectType}\n\n${rawMessage}`;
      const tgRes = await fetch(`https://api.telegram.org/bot${encodeURIComponent(tgToken)}/sendMessage`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({chat_id: tgChatId, text: tgText}),
      });
      if (tgRes.ok) {
        forwardedVia.push('telegram');
      }
    } catch (err) {
      console.error('Vercel Telegram forward skipped:', err);
    }
  }

  const emailDelivered = forwardedVia.some(
    (ch) => ch === 'smtp' || ch === 'resend' || ch === 'web3forms',
  );

  sendJson(res, 200, {
    ok: true,
    savedToInbox: false,
    emailDelivered,
    forwardedVia,
  });
}
