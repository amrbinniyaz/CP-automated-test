import { Page, test } from '@playwright/test';

/**
 * Check if an element exists on the page
 */
export async function elementExists(
  page: Page,
  selector: string
): Promise<boolean> {
  const element = await page.$(selector);
  return element !== null;
}

/**
 * Check if multiple elements exist on the page
 */
export async function elementsExist(
  page: Page,
  selectors: string[]
): Promise<Record<string, boolean>> {
  const results: Record<string, boolean> = {};
  for (const selector of selectors) {
    results[selector] = await elementExists(page, selector);
  }
  return results;
}

/**
 * Count elements matching a selector
 */
export async function countElements(
  page: Page,
  selector: string
): Promise<number> {
  const elements = await page.$$(selector);
  return elements.length;
}

/**
 * Wait for an element to exist with a timeout
 * Returns true if found, false if timeout
 */
export async function waitForElement(
  page: Page,
  selector: string,
  timeout: number = 5000
): Promise<boolean> {
  try {
    await page.waitForSelector(selector, { timeout });
    return true;
  } catch {
    return false;
  }
}

/**
 * Get element's bounding box
 */
export async function getElementBounds(
  page: Page,
  selector: string
): Promise<{ x: number; y: number; width: number; height: number } | null> {
  const element = await page.$(selector);
  if (!element) return null;
  return await element.boundingBox();
}

/**
 * Check if element is visible in viewport
 */
export async function isElementVisible(
  page: Page,
  selector: string
): Promise<boolean> {
  return await page.evaluate((sel) => {
    const element = document.querySelector(sel);
    if (!element) return false;

    const rect = element.getBoundingClientRect();
    const style = window.getComputedStyle(element);

    return (
      style.display !== 'none' &&
      style.visibility !== 'hidden' &&
      parseFloat(style.opacity) > 0 &&
      rect.width > 0 &&
      rect.height > 0
    );
  }, selector);
}

/**
 * Skip test if element is not found on page
 * Use this in tests to gracefully skip when component is missing
 */
export function skipIfNotFound(
  exists: boolean,
  componentName: string
): void {
  if (!exists) {
    test.skip(true, `${componentName} not found on page - skipping test`);
  }
}

/**
 * Get all elements matching a selector with their computed styles
 */
export async function getElementsWithStyles(
  page: Page,
  selector: string,
  properties: string[]
): Promise<Array<{ index: number; styles: Record<string, string> }>> {
  return await page.evaluate(
    ({ sel, props }) => {
      const elements = document.querySelectorAll(sel);
      return Array.from(elements).map((el, index) => {
        const computed = window.getComputedStyle(el);
        const styles: Record<string, string> = {};
        for (const prop of props) {
          styles[prop] = computed.getPropertyValue(prop);
        }
        return { index, styles };
      });
    },
    { sel: selector, props: properties }
  );
}

/**
 * Scroll element into view
 */
export async function scrollToElement(
  page: Page,
  selector: string
): Promise<boolean> {
  return await page.evaluate((sel) => {
    const element = document.querySelector(sel);
    if (!element) return false;
    element.scrollIntoView({ behavior: 'instant', block: 'center' });
    return true;
  }, selector);
}

/**
 * Get the first visible element matching a selector
 */
export async function getFirstVisibleElement(
  page: Page,
  selector: string
): Promise<string | null> {
  return await page.evaluate((sel) => {
    const elements = document.querySelectorAll(sel);
    for (const el of elements) {
      const rect = el.getBoundingClientRect();
      const style = window.getComputedStyle(el);
      if (
        style.display !== 'none' &&
        style.visibility !== 'hidden' &&
        parseFloat(style.opacity) > 0 &&
        rect.width > 0 &&
        rect.height > 0
      ) {
        // Return a unique identifier for this element
        return sel + `[data-testindex="${Array.from(document.querySelectorAll(sel)).indexOf(el)}"]`;
      }
    }
    return null;
  }, selector);
}
