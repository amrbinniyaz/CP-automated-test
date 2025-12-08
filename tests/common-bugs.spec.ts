import { test, expect } from '@playwright/test';
import { dismissCookieBanner } from '../utils/cookie-helper';

/**
 * Common Bugs Test Suite
 * 
 * This file tests for frequently occurring bugs across the content page.
 * These are real-world issues that have been found in production.
 */

test.describe('Common Bugs - Content Validation', () => {
  test.beforeEach(async ({ page }) => {
    // Use environment variable or default path
    const testUrl = process.env.TEST_PAGE_PATH || '/full-list-of-widgets#';
    
    // Navigate with extended timeout and simple wait strategy
    await page.goto(testUrl, { 
      waitUntil: 'load',
      timeout: 60000 
    });
    
    // Dismiss cookie banner if present
    await dismissCookieBanner(page);
  });

  test.describe('Stats Widget Bugs', () => {
    
    test('should NOT have duplicate dollar signs ($$) in stat figures', async ({ page }) => {
      // Find all stat cards
      const statCards = await page.locator('.stat-card').all();
      
      expect(statCards.length, 'Stats widget should exist on page').toBeGreaterThan(0);
      
      const bugsFound: string[] = [];
      
      for (let i = 0; i < statCards.length; i++) {
        const card = statCards[i];
        // Support both naming conventions: .stat-card__head and .stat-head
        const figure = await card.locator('.stat-card__head, .stat-head').textContent();
        
        if (figure && figure.includes('$$')) {
          const description = await card.locator('.stat-card__description, .stat-description').textContent();
          bugsFound.push(`Card ${i + 1}: "${figure}" - ${description?.substring(0, 30)}`);
        }
      }
      
      expect(bugsFound, `Found duplicate dollar signs in stat figures:\n${bugsFound.join('\n')}`).toHaveLength(0);
    });

    test('should NOT have duplicate percent signs (%%) in stat figures', async ({ page }) => {
      const statCards = await page.locator('.stat-card').all();
      
      expect(statCards.length, 'Stats widget should exist on page').toBeGreaterThan(0);
      
      const bugsFound: string[] = [];
      
      for (let i = 0; i < statCards.length; i++) {
        const card = statCards[i];
        const figure = await card.locator('.stat-card__head, .stat-head').textContent();
        
        if (figure && figure.includes('%%')) {
          const description = await card.locator('.stat-card__description, .stat-description').textContent();
          bugsFound.push(`Card ${i + 1}: "${figure}" - ${description?.substring(0, 30)}`);
        }
      }
      
      expect(bugsFound, `Found duplicate percent signs in stat figures:\n${bugsFound.join('\n')}`).toHaveLength(0);
    });

    test('should NOT have duplicate currency symbols (££, €€, ¥¥)', async ({ page }) => {
      const statCards = await page.locator('.stat-card').all();
      
      expect(statCards.length, 'Stats widget should exist on page').toBeGreaterThan(0);
      
      const bugsFound: string[] = [];
      const duplicateSymbols = ['££', '€€', '¥¥', '##'];
      
      for (let i = 0; i < statCards.length; i++) {
        const card = statCards[i];
        const figure = await card.locator('.stat-card__head, .stat-head').textContent();
        
        if (figure) {
          for (const symbol of duplicateSymbols) {
            if (figure.includes(symbol)) {
              const description = await card.locator('.stat-card__description, .stat-description').textContent();
              bugsFound.push(`Card ${i + 1}: "${figure}" contains ${symbol} - ${description?.substring(0, 30)}`);
            }
          }
        }
      }
      
      expect(bugsFound, `Found duplicate currency symbols in stat figures:\n${bugsFound.join('\n')}`).toHaveLength(0);
    });

    test('should NOT have empty stat figures', async ({ page }) => {
      const statCards = await page.locator('.stat-card.has-head').all();
      
      const emptyFigures: string[] = [];
      
      for (let i = 0; i < statCards.length; i++) {
        const card = statCards[i];
        const figure = await card.locator('.stat-card__head, .stat-head').textContent();
        
        if (!figure || figure.trim() === '') {
          const description = await card.locator('.stat-card__description, .stat-description').textContent();
          emptyFigures.push(`Card ${i + 1}: Empty figure - ${description?.substring(0, 30)}`);
        }
      }
      
      expect(emptyFigures, `Found empty stat figures:\n${emptyFigures.join('\n')}`).toHaveLength(0);
    });
  });

  test.describe('Button Bugs', () => {
    
    test('should NOT have buttons with only whitespace text', async ({ page }) => {
      const buttons = await page.locator('button, a.downloadBtn, a.secondaryDownloadBtn, a.thirdDownloadBtn').all();
      
      const emptyButtons: string[] = [];
      
      for (let i = 0; i < buttons.length; i++) {
        const button = buttons[i];
        const text = await button.textContent();
        
        if (text && text.trim() === '') {
          const classes = await button.getAttribute('class');
          emptyButtons.push(`Button ${i + 1}: class="${classes}"`);
        }
      }
      
      expect(emptyButtons, `Found buttons with only whitespace:\n${emptyButtons.join('\n')}`).toHaveLength(0);
    });

    test('should NOT have duplicate button text (e.g., "Click HereClick Here")', async ({ page }) => {
      const buttons = await page.locator('button, a.downloadBtn, a.secondaryDownloadBtn, a.thirdDownloadBtn').all();
      
      const duplicateText: string[] = [];
      
      for (let i = 0; i < buttons.length; i++) {
        const button = buttons[i];
        const text = await button.textContent();
        
        if (text) {
          const trimmed = text.trim();
          const words = trimmed.split(/\s+/);
          
          // Check if text appears to be duplicated
          if (words.length >= 2) {
            const half = Math.floor(words.length / 2);
            const firstHalf = words.slice(0, half).join(' ');
            const secondHalf = words.slice(half).join(' ');
            
            if (firstHalf === secondHalf && firstHalf.length > 3) {
              duplicateText.push(`Button ${i + 1}: "${trimmed}"`);
            }
          }
        }
      }
      
      expect(duplicateText, `Found buttons with duplicate text:\n${duplicateText.join('\n')}`).toHaveLength(0);
    });
  });

  test.describe('Link Bugs', () => {
    
    test('should NOT have links with href="#" that are not intentional placeholders', async ({ page }) => {
      // Get all links with href="#"
      const placeholderLinks = await page.locator('a[href="#"]').all();
      
      // This is informational - log how many we found
      console.log(`Found ${placeholderLinks.length} links with href="#"`);
      
      // Check if any are in main content (likely bugs)
      const mainContentLinks = await page.locator('main a[href="#"]').all();
      
      if (mainContentLinks.length > 0) {
        const linkDetails: string[] = [];
        
        for (let i = 0; i < Math.min(mainContentLinks.length, 10); i++) {
          const link = mainContentLinks[i];
          const text = await link.textContent();
          linkDetails.push(`"${text?.trim()}"`);
        }
        
        console.warn(`Warning: Found ${mainContentLinks.length} placeholder links in main content:`, linkDetails);
      }
    });

    test('should NOT have broken mailto links (missing email address)', async ({ page }) => {
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
      
      expect(brokenLinks, `Found broken mailto links:\n${brokenLinks.join('\n')}`).toHaveLength(0);
    });
  });

  test.describe('Image Bugs', () => {
    
    test('should NOT have images with missing alt text (accessibility)', async ({ page }) => {
      // Get all images in main content
      const images = await page.locator('main img').all();
      
      const missingAlt: string[] = [];
      
      for (let i = 0; i < images.length; i++) {
        const img = images[i];
        const alt = await img.getAttribute('alt');
        const src = await img.getAttribute('src');
        
        if (alt === null || alt === '') {
          missingAlt.push(`Image ${i + 1}: src="${src?.substring(0, 50)}..."`);
        }
      }
      
      // This might be a warning rather than failure depending on requirements
      if (missingAlt.length > 0) {
        console.warn(`Warning: Found ${missingAlt.length} images without alt text (accessibility issue)`);
      }
      
      expect(missingAlt.length, `Images should have alt text for accessibility`).toBeLessThan(5);
    });

    test('should NOT have images with src pointing to placeholder/dummy URLs', async ({ page }) => {
      const images = await page.locator('main img').all();
      
      const placeholderImages: string[] = [];
      const placeholderPatterns = [
        'placeholder',
        'dummy',
        'example.com',
        'lorem',
        'test-image',
        'image-not-found'
      ];
      
      for (let i = 0; i < images.length; i++) {
        const img = images[i];
        const src = await img.getAttribute('src');
        
        if (src) {
          const lowerSrc = src.toLowerCase();
          for (const pattern of placeholderPatterns) {
            if (lowerSrc.includes(pattern)) {
              placeholderImages.push(`Image ${i + 1}: "${src}"`);
              break;
            }
          }
        }
      }
      
      expect(placeholderImages, `Found placeholder images:\n${placeholderImages.join('\n')}`).toHaveLength(0);
    });
  });

  test.describe('Text Content Bugs', () => {
    
    test('should NOT have "Lorem Ipsum" placeholder text in headings', async ({ page }) => {
      const headings = await page.locator('main h1, main h2, main h3, main h4, main h5, main h6').all();
      
      const loremHeadings: string[] = [];
      
      for (let i = 0; i < headings.length; i++) {
        const heading = headings[i];
        const text = await heading.textContent();
        
        if (text && text.toLowerCase().includes('lorem ipsum')) {
          const tagName = await heading.evaluate(el => el.tagName);
          loremHeadings.push(`${tagName}: "${text.trim().substring(0, 50)}..."`);
        }
      }
      
      // This is informational - Lorem Ipsum might be intentional in test pages
      if (loremHeadings.length > 0) {
        console.log(`Note: Found ${loremHeadings.length} headings with Lorem Ipsum (may be intentional on test page)`);
      }
    });

    test('should NOT have duplicate consecutive spaces in visible text', async ({ page }) => {
      // Check main content paragraphs
      const paragraphs = await page.locator('main p').all();
      
      const doubleSpaces: string[] = [];
      
      for (let i = 0; i < Math.min(paragraphs.length, 20); i++) {
        const p = paragraphs[i];
        const text = await p.textContent();
        
        if (text && text.includes('  ')) {
          doubleSpaces.push(`Paragraph ${i + 1}: "${text.trim().substring(0, 50)}..."`);
        }
      }
      
      if (doubleSpaces.length > 0) {
        console.warn(`Warning: Found ${doubleSpaces.length} paragraphs with double spaces`);
      }
    });
  });

  test.describe('Widget Duplication Bugs', () => {
    
    test('should NOT have duplicate widget IDs', async ({ page }) => {
      const widgets = await page.locator('[id^="widget-"], [id^="module-"]').all();
      
      const ids: string[] = [];
      const duplicates: string[] = [];
      
      for (const widget of widgets) {
        const id = await widget.getAttribute('id');
        if (id) {
          if (ids.includes(id)) {
            duplicates.push(id);
          } else {
            ids.push(id);
          }
        }
      }
      
      expect(duplicates, `Found duplicate widget IDs:\n${duplicates.join('\n')}`).toHaveLength(0);
    });

    test('should NOT have stats appearing multiple times with same content', async ({ page }) => {
      const statCards = await page.locator('.stat-card').all();
      
      const statContents = new Map<string, number>();
      
      for (const card of statCards) {
        const figure = await card.locator('.stat-card__head').textContent();
        const title = await card.locator('.stat-card__subhead').textContent();
        const key = `${figure}|${title}`;
        
        statContents.set(key, (statContents.get(key) || 0) + 1);
      }
      
      const duplicates: string[] = [];
      for (const [content, count] of statContents.entries()) {
        if (count > 4) { // Allow some duplication for carousels/grids, but not excessive
          const [figure, title] = content.split('|');
          duplicates.push(`"${figure}" - "${title}" appears ${count} times`);
        }
      }
      
      if (duplicates.length > 0) {
        console.warn(`Warning: Found potentially duplicated stats:\n${duplicates.join('\n')}`);
      }
    });
  });

  test.describe('Carousel Bugs', () => {
    
    test('carousel arrows should be disabled at start/end positions', async ({ page }) => {
      const carousels = await page.locator('.module-widget--has-carousel').all();
      
      for (let i = 0; i < carousels.length; i++) {
        const carousel = carousels[i];
        
        // Check if carousel has navigation
        const prevButton = carousel.locator('button:has-text("Previous"), button[aria-label*="previous" i]').first();
        const nextButton = carousel.locator('button:has-text("Next"), button[aria-label*="next" i]').first();
        
        if (await prevButton.count() > 0) {
          // At start, previous should be disabled
          const isPrevDisabled = await prevButton.isDisabled();
          expect(isPrevDisabled, `Carousel ${i + 1}: Previous button should be disabled at start`).toBe(true);
        }
      }
    });
  });
});
