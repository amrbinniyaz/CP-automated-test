export const BREAKPOINTS = {
  mobile: { width: 375, height: 812, name: 'mobile' },
  tablet: { width: 768, height: 1024, name: 'tablet' },
  desktop: { width: 1440, height: 900, name: 'desktop' },
  large: { width: 2560, height: 1440, name: 'large' }
} as const;

export type BreakpointName = keyof typeof BREAKPOINTS;
