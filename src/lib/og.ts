export type OgCategory = 'posts' | 'journal-club' | 'summits' | 'default';

export type OgImage = {
  url: string;
  width: number;
  height: number;
  alt?: string;
};

export const OG_IMAGE_DIMENSIONS = {
  width: 1200,
  height: 630,
} as const;

export const DEFAULT_DESCRIPTION =
  'The global hub for RdRp research and collaboration.';

const OG_CATEGORY_DEFAULTS: Record<OgCategory, string> = {
  posts: '/og/posts.png',
  'journal-club': '/og/journal-club.png',
  summits: '/og/summits.png',
  default: '/og/default.png',
};

const normalizePublicPath = (value: string): string => {
  if (value.startsWith('http://') || value.startsWith('https://')) {
    return value;
  }
  return value.startsWith('/') ? value : `/${value}`;
};

const stripMarkdown = (value: string): string => {
  return value
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/`[^`]*`/g, ' ')
    .replace(/!\[[^\]]*]\([^)]+\)/g, ' ')
    .replace(/\[([^\]]+)]\([^)]+\)/g, '$1')
    .replace(/<\/?[^>]+>/g, ' ')
    .replace(/[#>*_~\-]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
};

const truncate = (value: string, maxLength: number): string => {
  if (value.length <= maxLength) {
    return value;
  }
  return `${value.slice(0, Math.max(0, maxLength - 1)).trim()}…`;
};

export const resolveDescription = ({
  description,
  excerpt,
  body,
  fallback,
  maxLength = 160,
}: {
  description?: string | null;
  excerpt?: string | null;
  body?: string | null;
  fallback?: string;
  maxLength?: number;
}): string => {
  const candidate = [description, excerpt, body].find(
    (value) => value && value.trim()
  );
  if (!candidate) {
    return fallback ?? DEFAULT_DESCRIPTION;
  }
  return truncate(stripMarkdown(candidate), maxLength);
};

export const resolveOgImage = ({
  image,
  alt,
  category = 'default',
}: {
  image?: string | null;
  alt?: string | null;
  category?: OgCategory;
}): OgImage => {
  const trimmedImage = image?.trim();
  if (trimmedImage) {
    return {
      url: normalizePublicPath(trimmedImage),
      width: OG_IMAGE_DIMENSIONS.width,
      height: OG_IMAGE_DIMENSIONS.height,
      alt: alt?.trim() || undefined,
    };
  }

  const fallback = OG_CATEGORY_DEFAULTS[category] ?? OG_CATEGORY_DEFAULTS.default;
  return {
    url: fallback,
    width: OG_IMAGE_DIMENSIONS.width,
    height: OG_IMAGE_DIMENSIONS.height,
  };
};
