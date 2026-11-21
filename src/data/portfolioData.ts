export type PortfolioCategory =
  | 'All Projects'
  | 'Portfolio Videos'
  | 'Promotional Videos'
  | 'Motion Graphics'
  | 'Social Media Videos'
  | 'Interview Videos'
  | 'Narration Videos';

export interface PortfolioProject {
  id: string;
  title: string;
  category: Exclude<PortfolioCategory, 'All Projects'>;
  duration: string;
  year: string;
  client: string;
  aspectLabel: string;
  description: string;
  tools: string[];
  thumbnail: string;
  /**
   * Replace with your own MP4 path (e.g. "/videos/my-edit.mp4")
   * or a YouTube / Vimeo URL (e.g. "https://www.youtube.com/watch?v=...")
   * Leave undefined to play the built-in interactive cinema preview sequence.
   */
  videoUrl?: string;
  featured?: boolean;
  accentHue: 'purple' | 'blue';
}

export interface ServiceItem {
  id: string;
  number: string;
  title: string;
  description: string;
  deliverables: string;
  iconName:
    | 'Film'
    | 'Youtube'
    | 'Clapperboard'
    | 'Sparkles'
    | 'Box'
    | 'Smartphone'
    | 'Megaphone'
    | 'Palette'
    | 'PlaySquare';
}

export interface SoftwareSkill {
  id: string;
  code: string;
  name: string;
  specialty: string;
  proficiency: number;
  accentColor: string;
  bgTint: string;
}

export interface ProcessStep {
  step: string;
  title: string;
  description: string;
  turnaround: string;
}

export interface TestimonialItem {
  id: string;
  quote: string;
  name: string;
  role: string;
  company: string;
  outcome: string;
  projectType: string;
}

/**
 * ============================================================================
 * PERSONAL & CONTACT CONFIGURATION
 * Tracked in src/data/portfolioData.ts for portfolio content & media URLs.
 * ============================================================================
 */
export function assetUrl(assetPath: string): string {
  if (/^(https?:|data:|blob:)/i.test(assetPath)) {
    return assetPath;
  }
  const cleanPath = assetPath.replace(/^\/+/, '');
  const base = import.meta.env.BASE_URL || './';
  const normalizedBase = base.endsWith('/') ? base : `${base}/`;
  return `${normalizedBase}${cleanPath}`;
}

export const BRAND_CONFIG = {
  brandName: 'SEGNI EDITOR',
  editorName: 'Segni Alemayehu',
  tagline: 'Your Vision, My Creativity.',
  location: 'Available Worldwide · Remote Post-Production',
  heroPortrait: assetUrl('/assets/aistudio/segni_portrait.webp'),
  contact: {
    email: 'segnialema130@gmail.com',
    whatsappNumber: '+251 963749142',
    whatsappUrl: 'https://wa.me/251963749142',
    telegramHandle: '@segni111111',
    telegramUrl: 'https://t.me/segni111111',
    instagramHandle: '@segnieditor',
    instagramUrl: 'https://instagram.com/segnieditor',
    youtubeHandle: '@SegniEditor',
    youtubeUrl: 'https://youtube.com/@SegniEditor',
  },
};

export const HERO_METRICS = [
  {value: '80+', label: 'Projects Delivered'},
  {value: '2.4M+', label: 'Organic Views Generated'},
  {value: '3+ Yrs', label: 'Post-Production Craft'},
  {value: '36 hrs', label: 'Average First Cut'},
];

export const PORTFOLIO_CATEGORIES: PortfolioCategory[] = [
  'All Projects',
  'Portfolio Videos',
  'Promotional Videos',
  'Motion Graphics',
  'Social Media Videos',
  'Interview Videos',
  'Narration Videos',
];

/**
 * ============================================================================
 * PORTFOLIO PROJECTS
 * Segni Alemayehu's uploaded portfolio, promo, motion graphics, interview,
 * narration, and social media video edits.
 * ============================================================================
 */
export const PORTFOLIO_PROJECTS: PortfolioProject[] = [
  {
    id: 'segni-portfolio-showreel',
    title: "Hi, I'm Segni — Video Editor & Motion Showreel",
    category: 'Portfolio Videos',
    duration: '00:25',
    year: '2026',
    client: 'SEGNI EDITOR · Signature Intro',
    aspectLabel: '16:9 Widescreen',
    description:
      'Personal introduction and work showcase blending kinetic 3D card transitions, motion-blurred warm lighting, and signature narrative edits.',
    tools: ['Adobe Premiere Pro', 'Adobe After Effects', 'Adobe Photoshop'],
    thumbnail: assetUrl('/src/assets/images/thumb_cinematic_edit_1795201039958.jpg'),
    videoUrl: assetUrl('/assets/aistudio/video_2026-11-20_12-03-50_043b792f.mp4'),
    featured: true,
    accentHue: 'blue',
  },
  {
    id: 'visual-identity-portfolio',
    title: 'Visual Identity — Clean Motion & Reel Showcase',
    category: 'Portfolio Videos',
    duration: '00:20',
    year: '2026',
    client: 'SEGNI EDITOR · Client Pitch Reel',
    aspectLabel: '9:16 Vertical',
    description:
      'High-retention kinetic typography and 3D icon choreography demonstrating how raw talking-head footage transforms into structured visual storytelling.',
    tools: ['Adobe After Effects', 'Adobe Premiere Pro', 'Adobe Illustrator'],
    thumbnail: assetUrl('/src/assets/images/thumb_motion_graphics_1795201040256.jpg'),
    videoUrl: assetUrl('/assets/aistudio/Download__3__c576312e.mp4'),
    accentHue: 'purple',
  },
  {
    id: 'one-koo-coffee-promo',
    title: 'ONE-KOO Coffee — Commercial Product Promo',
    category: 'Promotional Videos',
    duration: '00:18',
    year: '2026',
    client: 'ONE-KOO Coffee',
    aspectLabel: '9:16 Commercial',
    description:
      'Energetic product commercial combining custom cutout layering, kinetic Afaan Oromo typography, sound design cues, and warm atmospheric pacing.',
    tools: ['Adobe Premiere Pro', 'Adobe After Effects', 'Adobe Photoshop'],
    thumbnail: assetUrl('/src/assets/images/thumb_promo_commercial_1795201039843.jpg'),
    videoUrl: assetUrl('/assets/aistudio/video_2026-11-06_09-19-14_847221cd.mp4'),
    accentHue: 'blue',
  },
  {
    id: 'koomarti-restaurant-promo',
    title: 'Koomarti Restaurant — Hospitality Commercial',
    category: 'Promotional Videos',
    duration: '00:58',
    year: '2026',
    client: 'Koomarti Restaurant',
    aspectLabel: '9:16 Commercial',
    description:
      'Full commercial restaurant spot pairing appetizing culinary B-roll, voiceover synchronization, animated titles, and seamless pacing transitions.',
    tools: ['Adobe Premiere Pro', 'Adobe After Effects', 'CapCut'],
    thumbnail: assetUrl('/src/assets/images/thumb_promo_commercial_1795201039843.jpg'),
    videoUrl: assetUrl('/assets/aistudio/Download__1__b2ae0e00.mp4'),
    accentHue: 'purple',
  },
  {
    id: 'konkolaataa-motion-graphics',
    title: 'Konkolaataa & Manas — Motion Graphics Storytelling',
    category: 'Motion Graphics',
    duration: '00:15',
    year: '2026',
    client: 'Creative Motion Concept',
    aspectLabel: '9:16 Motion',
    description:
      'Composite motion graphics piece featuring layered 2.5D depth, floating landscape cutouts, dynamic shadows, and synchronized kinetic text.',
    tools: ['Adobe After Effects', 'Adobe Photoshop'],
    thumbnail: assetUrl('/src/assets/images/thumb_motion_graphics_1795201040256.jpg'),
    videoUrl: assetUrl('/assets/aistudio/video_2026-11-20_12-06-44_a7cdd141.mp4'),
    accentHue: 'purple',
  },
  {
    id: 'digital-balance-social',
    title: 'Bilbilli Sammuu — Social Media Awareness Reel',
    category: 'Social Media Videos',
    duration: '00:14',
    year: '2026',
    client: 'Social Awareness Campaign',
    aspectLabel: '9:16 Social Reel',
    description:
      'Scroll-stopping vertical social edit using 3D device compositing, visual metaphors, progress overlays, and punchy audio-visual transitions.',
    tools: ['Adobe After Effects', 'CapCut', 'Adobe Premiere Pro'],
    thumbnail: assetUrl('/src/assets/images/thumb_social_reel_1795201038793.jpg'),
    videoUrl: assetUrl('/assets/aistudio/video_2026-11-06_09-22-59_f92b368a.mp4'),
    accentHue: 'blue',
  },
  {
    id: 'creator-interview-edit',
    title: 'Creator Interview & Motivational Documentary Cut',
    category: 'Interview Videos',
    duration: '00:46',
    year: '2026',
    client: 'Documentary & Creator Series',
    aspectLabel: '9:16 Interview Cut',
    description:
      'Interview-led storytelling sequence combining crisp dialogue hooks, atmospheric B-roll montages, emotional soundtrack swelling, and clean subtitles.',
    tools: ['Adobe Premiere Pro', 'Adobe After Effects'],
    thumbnail: assetUrl('/src/assets/images/thumb_youtube_doc_1795201039374.jpg'),
    videoUrl: assetUrl('/assets/aistudio/video_2026-11-06_09-26-40_b04a36c9.mp4'),
    accentHue: 'purple',
  },
  {
    id: 'jabaadhu-narration-film',
    title: 'Jabaadhu — Inspirational Narration Film',
    category: 'Narration Videos',
    duration: '00:22',
    year: '2026',
    client: 'Narrative Storytelling Series',
    aspectLabel: '9:16 Narration',
    description:
      'Voice-driven inspirational narrative pairing soulful soundtrack timing, slow-motion nature shots, and clean typographic emphasis.',
    tools: ['Adobe Premiere Pro', 'CapCut', 'Adobe Photoshop'],
    thumbnail: assetUrl('/src/assets/images/thumb_cinematic_edit_1795201039958.jpg'),
    videoUrl: assetUrl('/assets/aistudio/Download__2__37aa21c2.mp4'),
    accentHue: 'blue',
  },
];

export const SERVICES_LIST: ServiceItem[] = [
  {
    id: 'pro-editing',
    number: '01.',
    title: 'Professional Video Editing',
    description:
      'Precision narrative assembly, clean pacing, multi-cam synchronization, and seamless audio mixing tailored for brands and studios.',
    deliverables: 'Master 4K Delivery · Clean Audio Mix',
    iconName: 'Film',
  },
  {
    id: 'youtube-editing',
    number: '02.',
    title: 'YouTube Video Editing',
    description:
      'Hook-driven storytelling engineered for high average view duration, dynamic B-roll layering, and clean visual chapter breaks.',
    deliverables: 'Retention Hooks · Custom Callouts',
    iconName: 'Youtube',
  },
  {
    id: 'cinematic-editing',
    number: '03.',
    title: 'Cinematic Video Editing',
    description:
      'Atmospheric short films, travel narratives, and music visuals built on emotional rhythm, soundscapes, and theatrical color tones.',
    deliverables: 'Anamorphic Framing · Foley Design',
    iconName: 'Clapperboard',
  },
  {
    id: 'motion-graphics',
    number: '04.',
    title: 'Motion Graphics',
    description:
      'Bespoke kinetic typography, UI explainers, animated data visualizations, and sleek broadcast lower thirds that elevate clarity.',
    deliverables: 'Custom Keyframes · Alpha Overlays',
    iconName: 'Sparkles',
  },
  {
    id: '3d-logo-animation',
    number: '05.',
    title: '3D Logo Animation',
    description:
      'Memorable metallic, glass, or minimalist brand stings sculpted with cinematic lighting and synchronized sonic signatures.',
    deliverables: '60fps Renders · Transparent Stings',
    iconName: 'Box',
  },
  {
    id: 'social-media',
    number: '06.',
    title: 'Social Media Video Editing',
    description:
      'Scroll-stopping Reels, TikToks, and YouTube Shorts with snappy cuts, animated captions, and thumb-stopping visual hooks.',
    deliverables: '9:16 Vertical · Retention Captions',
    iconName: 'Smartphone',
  },
  {
    id: 'promotional-videos',
    number: '07.',
    title: 'Promotional Videos',
    description:
      'Conversion-focused commercial spots, SaaS product showcases, and campaign teasers crafted to make viewers act.',
    deliverables: 'Ad Variations · Crisp CTA Frames',
    iconName: 'Megaphone',
  },
  {
    id: 'color-grading',
    number: '08.',
    title: 'Color Grading',
    description:
      'Balanced skin tones, film-stock LUT emulation, shot matching across cameras, and moody signature color palettes.',
    deliverables: 'Rec.709 / Log Grading · Shot Match',
    iconName: 'Palette',
  },
  {
    id: 'intro-outro',
    number: '09.',
    title: 'Intro and Outro Animation',
    description:
      'Cohesive channel openers and end-screen packages built to lock in brand recognition from the very first frame.',
    deliverables: 'Channel Branding · End-Card Packs',
    iconName: 'PlaySquare',
  },
];

export const SOFTWARE_SKILLS: SoftwareSkill[] = [
  {
    id: 'premiere',
    code: 'Pr',
    name: 'Adobe Premiere Pro',
    specialty: 'Narrative Editing, Multi-Cam & Audio Sync',
    proficiency: 96,
    accentColor: '#9999FF',
    bgTint: 'rgba(153, 153, 255, 0.12)',
  },
  {
    id: 'after-effects',
    code: 'Ae',
    name: 'Adobe After Effects',
    specialty: 'Motion Graphics, Compositing & 3D Camera',
    proficiency: 92,
    accentColor: '#A78BFA',
    bgTint: 'rgba(167, 139, 250, 0.12)',
  },
  {
    id: 'photoshop',
    code: 'Ps',
    name: 'Adobe Photoshop',
    specialty: 'High-CTR Thumbnails, Matte Prep & Retouching',
    proficiency: 88,
    accentColor: '#38BDF8',
    bgTint: 'rgba(56, 189, 248, 0.12)',
  },
  {
    id: 'illustrator',
    code: 'Ai',
    name: 'Adobe Illustrator',
    specialty: 'Vector Branding, Title Systems & Iconography',
    proficiency: 85,
    accentColor: '#F59E0B',
    bgTint: 'rgba(245, 158, 11, 0.12)',
  },
  {
    id: 'capcut',
    code: 'CC',
    name: 'CapCut',
    specialty: 'Rapid Short-Form Social Cuts & Beat Sync',
    proficiency: 95,
    accentColor: '#E4E4E7',
    bgTint: 'rgba(228, 228, 231, 0.10)',
  },
];

export const WORK_PROCESS: ProcessStep[] = [
  {
    step: '01.',
    title: 'Understanding the Project',
    description:
      'We clarify your target audience, core message, platform format, and visual references so every cut serves a clear goal.',
    turnaround: 'Discovery Brief',
  },
  {
    step: '02.',
    title: 'Planning & Storyboarding',
    description:
      'Raw footage is logged, structured into a narrative beat sheet, and paired with music pacing cues before timeline assembly.',
    turnaround: 'Creative Blueprint',
  },
  {
    step: '03.',
    title: 'Video Editing',
    description:
      'Tight A-roll story cuts, intentional B-roll layering, and rhythmic transitions build an engaging rough-to-fine assembly.',
    turnaround: 'First Cut Review',
  },
  {
    step: '04.',
    title: 'Motion Graphics & Effects',
    description:
      'Custom kinetic typography, 3D logo stings, callouts, and seamless visual effects elevate clarity and polish.',
    turnaround: 'Visual Layering',
  },
  {
    step: '05.',
    title: 'Color Grading & Sound Design',
    description:
      'Shot-matched cinematic color, crisp vocal EQ, risers, whooshes, and subtle room ambience lock the emotional mood.',
    turnaround: 'Finishing Suite',
  },
  {
    step: '06.',
    title: 'Final Delivery',
    description:
      'Platform-optimized 4K masters, vertical social cutdowns, and clean project revisions delivered right on schedule.',
    turnaround: 'Ready to Publish',
  },
];

export const TESTIMONIALS: TestimonialItem[] = [
  {
    id: 't1',
    quote:
      'Segni transformed 3 hours of raw multi-cam studio footage into the sharpest documentary episode on our channel. Our average view duration jumped by 38% within the first week.',
    name: 'Daniel Bekele',
    role: 'Executive Producer',
    company: 'Creator Talk Media',
    outcome: '+38% Avg. View Duration',
    projectType: 'YouTube Documentary Series',
  },
  {
    id: 't2',
    quote:
      'Every frame Segni delivers feels intentional. From our 3D metallic logo reveal to the product launch commercial, his motion design and sound sync elevated our entire brand launch.',
    name: 'Sophia Morales',
    role: 'Head of Brand Marketing',
    company: 'Aura Acoustics',
    outcome: '2.4x Launch Ad CTR',
    projectType: 'Promotional Launch Film',
  },
  {
    id: 't3',
    quote:
      'Fast turnaround, zero hand-holding, and an instinctive eye for rhythm. Our vertical campaign reels consistently cross 200K+ organic views thanks to his pacing and grading.',
    name: 'Marcus Vance',
    role: 'Creative Director',
    company: 'Urban Athletics Collective',
    outcome: '200K+ Avg. Reel Reach',
    projectType: 'Social Media Campaign',
  },
];
