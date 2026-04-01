export const BREAKPOINTS = {
  mobile: { width: 375, height: 812, name: 'mobile' },
  tablet: { width: 768, height: 1024, name: 'tablet' },
  smallDesktop: { width: 1024, height: 768, name: 'smallDesktop' },
  desktop: { width: 1440, height: 900, name: 'desktop' },
  largeDesktop: { width: 1512, height: 982, name: 'largeDesktop' },
  ultrawide: { width: 2560, height: 1440, name: 'ultrawide' }
} as const;

export type BreakpointName = keyof typeof BREAKPOINTS;

// Helper to get breakpoint widths as array for iteration
export const BREAKPOINT_WIDTHS = Object.values(BREAKPOINTS).map(bp => bp.width);

// Get breakpoint by width
export function getBreakpointByWidth(width: number): BreakpointName | null {
  for (const [name, bp] of Object.entries(BREAKPOINTS)) {
    if (bp.width === width) return name as BreakpointName;
  }
  return null;
}
