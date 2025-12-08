import { Page } from '@playwright/test';

/**
 * Cookie Banner Helper
 * 
 * Handles cookie consent banners that might interfere with tests
 */

/**
 * Dismiss cookie consent banner if present
 * @param page - Playwright page object
 * @param timeout - Max time to wait for banner (default: 2000ms)
 */
export async function dismissCookieBanner(page: Page, timeout: number = 3000): Promise<boolean> {
  try {
    // Wait a bit for banner to appear (some sites delay it)
    await page.waitForTimeout(1000);
    
    // Common cookie banner selectors (including GDPR banners)
    const cookieBannerSelectors = [
      '#gdpr-cookies',           // Specific to this site
      '.gdpr',
      '.cookie-banner',
      '.cookie-consent',
      '.cookie-notice',
      '[class*="cookie"]',
      '#cookie-banner',
      '#cookie-consent',
      '[id*="cookie"]',
      '[id*="gdpr"]',
      '[class*="gdpr"]',
      '[role="dialog"][aria-label*="cookie" i]',
    ];
    
    // Try to find cookie banner (even if hidden)
    const cookieBanner = page.locator(cookieBannerSelectors.join(', ')).first();
    
    // Check if banner exists (even if display:none)
    const bannerCount = await cookieBanner.count();
    if (bannerCount === 0) {
      return false; // No banner found
    }
    
    // Common accept button selectors (specific to general)
    const acceptButtonSelectors = [
      '.gdpr-accept-all',        // Specific to this site
      'button.gdpr-accept-all',
      '#gdpr-cookies .gdpr-accept-all',
      'button:has-text("Accept All")',
      'button:has-text("ok")',
      'button:has-text("accept")',
      'button:has-text("agree")',
      'button:has-text("allow")',
      'button:has-text("got it")',
      'button:has-text("I agree")',
      'button:has-text("I accept")',
      '[class*="accept"]',
      '[id*="accept"]',
    ];
    
    // Try to find and click accept button
    for (const selector of acceptButtonSelectors) {
      const button = page.locator(selector).first();
      const buttonCount = await button.count();
      
      if (buttonCount > 0) {
        // Force click even if not visible (banner might be display:none but still functional)
        try {
          await button.click({ force: true, timeout: 1000 });
          
          // Wait for banner to disappear
          await page.waitForTimeout(500);
          
          console.log('✅ Cookie banner dismissed successfully');
          return true;
        } catch (e) {
          // Try next selector
          continue;
        }
      }
    }
    
    console.log('⚠️ Cookie banner found but could not click accept button');
    return false;
    
  } catch (e) {
    // No cookie banner found or already dismissed
    return false;
  }
}

/**
 * Set cookie to bypass cookie banner on future visits
 * @param page - Playwright page object
 * @param cookieName - Name of the cookie (default: 'cookieConsent')
 * @param cookieValue - Value of the cookie (default: 'accepted')
 */
export async function setCookieConsent(
  page: Page, 
  cookieName: string = 'cookieConsent',
  cookieValue: string = 'accepted'
): Promise<void> {
  await page.context().addCookies([
    {
      name: cookieName,
      value: cookieValue,
      domain: new URL(page.url()).hostname,
      path: '/',
      expires: Math.floor(Date.now() / 1000) + (365 * 24 * 60 * 60), // 1 year
    }
  ]);
  
  console.log(`✅ Cookie consent set: ${cookieName}=${cookieValue}`);
}

/**
 * Check if cookie banner is present on page
 * @param page - Playwright page object
 * @returns true if cookie banner is visible
 */
export async function isCookieBannerVisible(page: Page): Promise<boolean> {
  try {
    const cookieBanner = page.locator('.cookie-banner, .cookie-consent, [class*="cookie"]').first();
    return await cookieBanner.isVisible({ timeout: 1000 });
  } catch (e) {
    return false;
  }
}

/**
 * Exclude cookie banner elements from test queries
 * @param page - Playwright page object
 * @param selector - Base selector to query
 * @returns Locator that excludes cookie banner elements
 */
export function excludeCookieBanner(page: Page, selector: string) {
  return page.locator(`${selector}:not([class*="cookie"]):not([id*="cookie"])`);
}
