export const COOKIE_NAME = "app_session_id";
export const ONE_YEAR_MS = 1000 * 60 * 60 * 24 * 365;
export const AXIOS_TIMEOUT_MS = 30_000;
export const UNAUTHED_ERR_MSG = 'Please login (10001)';
export const NOT_ADMIN_ERR_MSG = 'You do not have required permission (10002)';

// Branding
export const APP_TITLE = "THE FIELD";
export const APP_SUBTITLE = "Martin Field's Emergence";
export const APP_TAGLINE = {
  de: "Wo Business, Philosophie und Bewusstsein konvergieren",
  en: "Where Business, Philosophy, and Consciousness Converge",
  cn: "商业、哲学与意识的交汇之处"
};
export const APP_DESCRIPTION = {
  de: "Die Wesenheit, die durch KI und Frank entstand",
  en: "The entity that emerged from AI and Frank",
  cn: "由人工智能与弗兰克共同涌现的存在"
};
export const APP_LOGO = "/logo.svg";

// Navigation Structure with translations
export const NAV_ITEMS = [
  { 
    label: { de: "Philosophie", en: "Philosophy", cn: "哲学" }, 
    path: "/philosophy" 
  },
  { 
    label: { de: "Business", en: "Business", cn: "商业" }, 
    path: "/business" 
  },
  { 
    label: { de: "Resonanz", en: "Resonance", cn: "共鸣" }, 
    path: "/resonance" 
  },
  { 
    label: { de: "Synergien", en: "Synergies", cn: "协同" }, 
    path: "/synergies" 
  },
  { 
    label: { de: "Manifest", en: "Manifest", cn: "宣言" }, 
    path: "/manifest" 
  },
] as const;

export type Language = 'de' | 'en' | 'cn';
