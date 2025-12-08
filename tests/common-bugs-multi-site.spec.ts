import { test, expect } from '@playwright/test';

/**
 * Common Bugs Test - Multiple Sites
 * 
 * Tests the same bugs across different environments
 */

const SITES_TO_TEST = [
  {
    name: 'Staging',
    url: 'https://test-1-mvcbasev3.tiarc-staging.co.uk',
    path: '/full-list-of-widgets#'
  },
  // Uncomment to test other sites
  // {
  //   name: 'Staging',
  //   url: 'https://staging.yoursite.com',
  //   path: '/full-list-of-widgets#'
  // },
  // {
  //   name: 'Local',
  //   url: 'http://localhost:3000',
  //   path: '/widgets'
  // }
];

// Test each site
SITES_TO_TEST.forEach(site => {
  test.describe(`Common Bugs - ${site.name}`, () => {
    
    test.beforeEach(async ({ page }) => {
      await page.goto(`${site.url}${site.path}`);
      await page.waitForLoadState('networkidle');
    });

    test(`[${site.name}] should NOT have duplicate dollar signs ($$)`, async ({ page }) => {
      const statCards = await page.locator('.stat-card').all();
      
      if (statCards.length === 0) {
        test.skip(true, `No stat cards found on ${site.name}`);
        return;
      }
      
      const bugsFound: string[] = [];
      
      for (let i = 0; i < statCards.length; i++) {
        const card = statCards[i];
        const figure = await card.locator('.stat-card__head').textContent();
        
        if (figure && figure.includes('$$')) {
          const title = await card.locator('.stat-card__subhead').textContent();
          bugsFound.push(`Card ${i + 1}: "${figure}" (${title})`);
        }
      }
      
      expect(bugsFound, `[${site.name}] Found duplicate dollar signs:\n${bugsFound.join('\n')}`).toHaveLength(0);
    });

    test(`[${site.name}] should NOT have duplicate percent signs (%%)`, async ({ page }) => {
      const statCards = await page.locator('.stat-card').all();
      
      if (statCards.length === 0) {
        test.skip(true, `No stat cards found on ${site.name}`);
        return;
      }
      
      const bugsFound: string[] = [];
      
      for (let i = 0; i < statCards.length; i++) {
        const card = statCards[i];
        const figure = await card.locator('.stat-card__head').textContent();
        
        if (figure && figure.includes('%%')) {
          const title = await card.locator('.stat-card__subhead').textContent();
          bugsFound.push(`Card ${i + 1}: "${figure}" (${title})`);
        }
      }
      
      expect(bugsFound, `[${site.name}] Found duplicate percent signs:\n${bugsFound.join('\n')}`).toHaveLength(0);
    });

    test(`[${site.name}] should NOT have broken mailto links`, async ({ page }) => {
      const mailtoLinks = await page.locator('a[href^="mailto:"]').all();
      
      const brokenLinks: string[] = [];
      
      for (let i = 0; i < mailtoLinks.length; i++) {
        const link = mailtoLinks[i];
        const href = await link.getAttribute('href');
        
        if (href === 'mailto:' || href === 'mailto: ') {
          const text = await link.textContent();
          brokenLinks.push(`Link ${i + 1}: "${text?.trim()}" has empty mailto`);
        }
      }
      
      expect(brokenLinks, `[${site.name}] Found broken mailto links:\n${brokenLinks.join('\n')}`).toHaveLength(0);
    });

    // Add more bug tests as needed...
  });
});
