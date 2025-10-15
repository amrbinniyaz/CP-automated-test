import { Page } from '@playwright/test';

export interface SpacingValues {
  top: number;
  right: number;
  bottom: number;
  left: number;
}

export interface ComponentSpacing {
  selector: string;
  margins: SpacingValues;
  paddings: SpacingValues;
  width: number;
  height: number;
}

/**
 * Get computed margin for an element
 */
export async function getMargin(
  page: Page,
  selector: string,
  side: 'top' | 'right' | 'bottom' | 'left'
): Promise<number | null> {
  return await page.evaluate(
    ({ sel, s }) => {
      const el = document.querySelector(sel);
      if (!el) return null;
      const styles = window.getComputedStyle(el);
      return parseFloat(styles[`margin-${s}` as any]);
    },
    { sel: selector, s: side }
  );
}

/**
 * Get computed padding for an element
 */
export async function getPadding(
  page: Page,
  selector: string,
  side: 'top' | 'right' | 'bottom' | 'left'
): Promise<number | null> {
  return await page.evaluate(
    ({ sel, s }) => {
      const el = document.querySelector(sel);
      if (!el) return null;
      const styles = window.getComputedStyle(el);
      return parseFloat(styles[`padding-${s}` as any]);
    },
    { sel: selector, s: side }
  );
}

/**
 * Get all spacing for an element
 */
export async function getElementSpacing(
  page: Page,
  selector: string
): Promise<ComponentSpacing | null> {
  return await page.evaluate((sel) => {
    const el = document.querySelector(sel);
    if (!el) return null;
    
    const styles = window.getComputedStyle(el);
    const rect = el.getBoundingClientRect();
    
    return {
      selector: sel,
      margins: {
        top: parseFloat(styles.marginTop),
        right: parseFloat(styles.marginRight),
        bottom: parseFloat(styles.marginBottom),
        left: parseFloat(styles.marginLeft)
      },
      paddings: {
        top: parseFloat(styles.paddingTop),
        right: parseFloat(styles.paddingRight),
        bottom: parseFloat(styles.paddingBottom),
        left: parseFloat(styles.paddingLeft)
      },
      width: rect.width,
      height: rect.height
    };
  }, selector);
}

/**
 * Check if element has background color
 */
export async function hasBackground(
  page: Page,
  selector: string
): Promise<boolean> {
  return await page.evaluate((sel) => {
    const el = document.querySelector(sel);
    if (!el) return false;
    
    const bg = window.getComputedStyle(el).backgroundColor;
    return bg !== 'rgba(0, 0, 0, 0)' && bg !== 'transparent';
  }, selector);
}

/**
 * Calculate gap between two elements
 */
export async function getGapBetweenElements(
  page: Page,
  selector1: string,
  selector2: string
): Promise<number | null> {
  return await page.evaluate(
    ({ sel1, sel2 }) => {
      const el1 = document.querySelector(sel1);
      const el2 = document.querySelector(sel2);
      
      if (!el1 || !el2) return null;
      
      const rect1 = el1.getBoundingClientRect();
      const rect2 = el2.getBoundingClientRect();
      
      // Assuming el2 is below el1
      return rect2.top - rect1.bottom;
    },
    { sel1: selector1, sel2: selector2 }
  );
}
