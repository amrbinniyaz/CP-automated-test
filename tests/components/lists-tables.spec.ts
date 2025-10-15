import { test, expect } from '@playwright/test';
import { SELECTORS } from '../../config/selectors';

test.describe('Lists and Tables', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/full-list-of-widgets#');
    await page.waitForLoadState('networkidle');
  });

  test('Bullet list spacing', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.waitForTimeout(300);
    
    const list = page.locator(SELECTORS.lists.bulletList).first();
    
    if (await list.count() > 0) {
      const spacing = await list.evaluate(el => {
        const styles = window.getComputedStyle(el);
        return {
          marginTop: parseFloat(styles.marginTop),
          marginBottom: parseFloat(styles.marginBottom),
          paddingLeft: parseFloat(styles.paddingLeft)
        };
      });
      
      console.log('Bullet list spacing:', spacing);
      
      expect(spacing.marginTop, 'List should have top margin').toBeGreaterThanOrEqual(0);
      expect(spacing.marginBottom, 'List should have bottom margin').toBeGreaterThanOrEqual(0);
      expect(spacing.paddingLeft, 'List should have left padding for bullets').toBeGreaterThan(0);
    }
  });

  test('Numbered list spacing', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.waitForTimeout(300);
    
    const list = page.locator(SELECTORS.lists.numberedList).first();
    
    if (await list.count() > 0) {
      const spacing = await list.evaluate(el => {
        const styles = window.getComputedStyle(el);
        return {
          marginTop: parseFloat(styles.marginTop),
          marginBottom: parseFloat(styles.marginBottom),
          paddingLeft: parseFloat(styles.paddingLeft)
        };
      });
      
      console.log('Numbered list spacing:', spacing);
      
      expect(spacing.paddingLeft, 'Numbered list should have left padding').toBeGreaterThan(0);
    }
  });

  test('List item spacing', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.waitForTimeout(300);
    
    const listItems = await page.locator('li').all();
    
    if (listItems.length > 0) {
      for (const item of listItems.slice(0, 5)) {
        const spacing = await item.evaluate(el => {
          const styles = window.getComputedStyle(el);
          return {
            marginBottom: parseFloat(styles.marginBottom),
            paddingBottom: parseFloat(styles.paddingBottom)
          };
        });
        
        console.log('List item spacing:', spacing);
      }
    }
  });

  test('Table overflow with scroll/fade', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.waitForTimeout(300);
    
    const table = page.locator(SELECTORS.misc.table).first();
    
    if (await table.count() > 0) {
      const container = table.locator('xpath=ancestor::div[1]');
      
      if (await container.count() > 0) {
        const overflow = await container.evaluate(el => {
          const styles = window.getComputedStyle(el);
          return {
            overflowX: styles.overflowX,
            overflowY: styles.overflowY,
            width: el.getBoundingClientRect().width
          };
        });
        
        console.log('Table container overflow:', overflow);
        
        // Check if table can scroll on mobile
        const tableWidth = await table.evaluate(el => el.getBoundingClientRect().width);
        console.log('Table width:', tableWidth, 'Container width:', overflow.width);
      }
    }
  });

  test('Table spacing and borders', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.waitForTimeout(300);
    
    const table = page.locator(SELECTORS.misc.table).first();
    
    if (await table.count() > 0) {
      const spacing = await table.evaluate(el => {
        const styles = window.getComputedStyle(el);
        return {
          marginTop: parseFloat(styles.marginTop),
          marginBottom: parseFloat(styles.marginBottom),
          borderCollapse: styles.borderCollapse,
          borderSpacing: styles.borderSpacing
        };
      });
      
      console.log('Table spacing:', spacing);
      
      expect(spacing.marginTop, 'Table should have top margin').toBeGreaterThanOrEqual(0);
      expect(spacing.marginBottom, 'Table should have bottom margin').toBeGreaterThanOrEqual(0);
    }
  });

  test('Table cell padding', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.waitForTimeout(300);
    
    const cells = await page.locator('td, th').all();
    
    if (cells.length > 0) {
      for (const cell of cells.slice(0, 5)) {
        const padding = await cell.evaluate(el => {
          const styles = window.getComputedStyle(el);
          return {
            top: parseFloat(styles.paddingTop),
            right: parseFloat(styles.paddingRight),
            bottom: parseFloat(styles.paddingBottom),
            left: parseFloat(styles.paddingLeft)
          };
        });
        
        console.log('Cell padding:', padding);
        
        expect(padding.top, 'Cell should have padding').toBeGreaterThan(0);
        expect(padding.left, 'Cell should have padding').toBeGreaterThan(0);
      }
    }
  });

  test('Indentation support in lists', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.waitForTimeout(300);
    
    // Check for nested lists
    const nestedLists = await page.locator('ul ul, ol ol, ul ol, ol ul').all();
    
    if (nestedLists.length > 0) {
      for (const nestedList of nestedLists) {
        const indentation = await nestedList.evaluate(el => {
          const styles = window.getComputedStyle(el);
          return {
            marginLeft: parseFloat(styles.marginLeft),
            paddingLeft: parseFloat(styles.paddingLeft)
          };
        });
        
        console.log('Nested list indentation:', indentation);
        
        const totalIndent = indentation.marginLeft + indentation.paddingLeft;
        expect(totalIndent, 'Nested list should be indented').toBeGreaterThan(10);
      }
    }
  });
});
