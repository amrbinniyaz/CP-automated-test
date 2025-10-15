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

export const TOLERANCE = 2; // ±2px acceptable deviation
