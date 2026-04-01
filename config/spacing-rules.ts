// CSS Variable definitions with expected values at each breakpoint
// Values are in pixels and represent expected computed values at exact breakpoint widths

export const CSS_VARIABLES = {
  margins: {
    '--margin-a': { 375: 60, 768: 72, 1024: 81, 1440: 90, 1512: 97, 2560: 160 },
    '--margin-b': { 375: 40, 768: 44, 1024: 47, 1440: 50, 1512: 52, 2560: 70 },
    '--margin-c': { 375: 30, 768: 34, 1024: 37, 1440: 40, 1512: 43, 2560: 60 },
    '--margin-d': { 375: 20, 768: 24, 1024: 27, 1440: 30, 1512: 30, 2560: 30 }
  },
  paddings: {
    '--padding-e-inner': { 375: 10, 768: 15, 1024: 17, 1440: 20, 1441: 20, 2560: 20 },
    '--padding-g-inner': { 375: 15, 768: 17, 1024: 18, 1440: 20, 1441: 10, 2560: 10 },
    '--padding-h-inner': { 375: 10, 768: 12, 1024: 13, 1440: 15, 1441: 6, 2560: 6 },
    '--padding-c-inner': { 375: 20, 768: 20, 1024: 27, 1440: 35, 2560: 35 }
  }
} as const;

// Type for CSS variable names
export type MarginVariableName = keyof typeof CSS_VARIABLES.margins;
export type PaddingVariableName = keyof typeof CSS_VARIABLES.paddings;
export type CSSVariableName = MarginVariableName | PaddingVariableName;

// Component to CSS Variable mapping
// Maps component selectors to the CSS variables they should use
export const COMPONENT_CSS_VAR_MAPPING = {
  profileCard: {
    description: {
      selector: '.profile-card__description',
      padding: '--padding-c-inner',
      paddingSides: ['top', 'right', 'bottom', 'left'] as const
    },
    role: {
      selector: '.profile-card__role',
      marginTop: '--padding-g-inner'
    }
  },
  storyCard: {
    content: {
      selector: '.story-card__content',
      padding: '--padding-e-inner',
      paddingSides: ['top', 'right', 'bottom', 'left'] as const
    }
  },
  eventCard: {
    content: {
      selector: '.event-card__content',
      padding: '--padding-e-inner',
      paddingSides: ['top', 'right', 'bottom', 'left'] as const
    },
    meta: {
      selector: '.event-card__meta',
      marginTop: '--padding-h-inner'
    }
  },
  statCard: {
    content: {
      selector: '.stat-card__content',
      padding: '--padding-e-inner',
      paddingSides: ['top', 'right', 'bottom', 'left'] as const
    }
  },
  promoCard: {
    content: {
      selector: '.promo-card__content',
      padding: '--padding-e-inner',
      paddingSides: ['top', 'right', 'bottom', 'left'] as const
    }
  }
} as const;

// Legacy rules (kept for backward compatibility with existing tests)
export const MARGIN_RULES = {
  A: { 375: 60, 1440: 90, 2560: 140 },
  B: { 375: 40, 1440: 50, 2560: 70 },
  C: { 375: 30, 1440: 40, 2560: 60 },
  D: { 375: 20, 1440: 30, 2560: 30 }
} as const;

export const PADDING_RULES = {
  featuredParagraphV1: {
    375: { top: 40, bottom: 40 },
    1440: { top: 85, bottom: 85 },
    2560: { top: 160, bottom: 160 }
  },
  contentTemplateHalfHalf: {
    375: { top: 50, bottom: 50 },
    1259: { top: 85, bottom: 85 },
    1260: { top: 85, bottom: 85 },
    2560: { top: 200, bottom: 200 }
  },
  fullWidthImage: {
    375: { top: 90, bottom: 90 },
    1440: { top: 150, bottom: 150 },
    2560: { top: 270, bottom: 270 }
  },
  divider: {
    375: { top: 60, bottom: 60 },
    1440: { top: 90, bottom: 90 },
    2560: { top: 165, bottom: 165 }
  }
} as const;

// Default tolerance for CSS value comparisons (in pixels)
export const TOLERANCE = 2;

// Test URLs
export const TEST_URLS = {
  allWidgets: '/full-list-of-widgets',
  profiles: '/amr-test/profiles',
  stories: '/amr-test/stories',
  events: '/amr-test/events',
  stats: '/amr-test/stats',
  promos: '/amr-test/promos'
} as const;

// Helper function to get all CSS variable names
export function getAllCSSVariables(): CSSVariableName[] {
  return [
    ...Object.keys(CSS_VARIABLES.margins) as MarginVariableName[],
    ...Object.keys(CSS_VARIABLES.paddings) as PaddingVariableName[]
  ];
}

// Helper function to get expected value for a CSS variable at a given width
export function getExpectedValue(
  variableName: CSSVariableName,
  width: number
): number | null {
  const marginVar = CSS_VARIABLES.margins[variableName as MarginVariableName];
  const paddingVar = CSS_VARIABLES.paddings[variableName as PaddingVariableName];
  const values = marginVar || paddingVar;

  if (!values) return null;

  // Find exact match or interpolate
  if (values[width as keyof typeof values] !== undefined) {
    return values[width as keyof typeof values];
  }

  // Get sorted breakpoints
  const breakpoints = Object.keys(values).map(Number).sort((a, b) => a - b);

  // Find surrounding breakpoints for interpolation
  let lower = breakpoints[0];
  let upper = breakpoints[breakpoints.length - 1];

  for (const bp of breakpoints) {
    if (bp <= width) lower = bp;
    if (bp >= width && upper === breakpoints[breakpoints.length - 1]) upper = bp;
  }

  if (lower === upper) {
    return values[lower as keyof typeof values];
  }

  // Linear interpolation
  const lowerValue = values[lower as keyof typeof values];
  const upperValue = values[upper as keyof typeof values];
  const ratio = (width - lower) / (upper - lower);

  return Math.round(lowerValue + (upperValue - lowerValue) * ratio);
}
