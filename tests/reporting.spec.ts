import { test } from '@playwright/test';
import { BREAKPOINTS } from '../config/breakpoints';
import { SELECTORS } from '../config/selectors';
import { getElementSpacing } from '../utils/spacing-helpers';
import { ReportGenerator } from '../utils/report-generator';

test.describe('Spacing Reports', () => {
  test('generate comprehensive spacing report', async ({ page }) => {
    await page.goto('/full-list-of-widgets#');
    await page.waitForLoadState('networkidle');
    
    for (const [name, viewport] of Object.entries(BREAKPOINTS)) {
      await page.setViewportSize({ width: viewport.width, height: viewport.height });
      await page.waitForTimeout(500);
      
      const report = new ReportGenerator(
        `${name} (${viewport.width}x${viewport.height})`,
        page.url()
      );
      
      // Collect spacing for all defined selectors
      const allSelectors = Object.values(SELECTORS).flatMap(category => 
        Object.values(category)
      );
      
      for (const selector of allSelectors) {
        const spacing = await getElementSpacing(page, selector);
        
        if (spacing) {
          report.addComponent({
            ...spacing,
            status: 'PASS',
            message: 'Spacing measured successfully'
          });
        }
      }
      
      // Save reports
      report.saveToJson(`spacing-report-${name}.json`);
      report.saveToHtml(`spacing-report-${name}.html`);
      
      console.log(`\n=== Report for ${name} ===`);
      console.log(report.getReport().summary);
    }
  });

  test('detect spacing inconsistencies', async ({ page }) => {
    await page.goto('/full-list-of-widgets#');
    await page.waitForLoadState('networkidle');
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.waitForTimeout(300);
    
    const inconsistencies = await page.evaluate(() => {
      const issues: string[] = [];
      const elements = document.querySelectorAll('*');
      
      elements.forEach(el => {
        const styles = window.getComputedStyle(el);
        const marginTop = parseFloat(styles.marginTop);
        const marginBottom = parseFloat(styles.marginBottom);
        const paddingTop = parseFloat(styles.paddingTop);
        const paddingBottom = parseFloat(styles.paddingBottom);
        
        // Flag non-multiple-of-5 values
        if (marginTop > 5 && marginTop % 5 !== 0) {
          issues.push(`${el.className}: marginTop ${marginTop}px not multiple of 5`);
        }
        
        // Flag unusually large values
        if (marginTop > 200) {
          issues.push(`${el.className}: marginTop ${marginTop}px unusually large`);
        }
        
        if (paddingTop > 300) {
          issues.push(`${el.className}: paddingTop ${paddingTop}px unusually large`);
        }
      });
      
      return issues.slice(0, 50); // Return first 50 issues
    });
    
    console.log('\n=== Spacing Inconsistencies ===');
    inconsistencies.forEach(issue => console.log(`  - ${issue}`));
    console.log(`Total issues found: ${inconsistencies.length}`);
  });

  test('visual spacing analysis with screenshots', async ({ page }) => {
    await page.goto('/full-list-of-widgets#');
    await page.waitForLoadState('networkidle');
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.waitForTimeout(500);
    
    // Take screenshot for visual analysis
    await page.screenshot({ 
      path: 'reports/screenshots/full-page-desktop.png', 
      fullPage: true 
    });
    
    // Highlight elements with spacing
    await page.evaluate(() => {
      document.querySelectorAll('.module-widget, .featuredParagraph').forEach((el, index) => {
        const htmlEl = el as HTMLElement;
        htmlEl.style.outline = `2px solid ${index % 2 === 0 ? '#ff0000' : '#00ff00'}`;
      });
    });
    
    await page.screenshot({ 
      path: 'reports/screenshots/highlighted-elements.png', 
      fullPage: true 
    });
    
    console.log('Visual analysis screenshots saved to reports/screenshots/');
  });

  test('spacing metrics summary', async ({ page }) => {
    await page.goto('/full-list-of-widgets#');
    await page.waitForLoadState('networkidle');
    
    const breakpoints = [375, 1440, 2560];
    const allMetrics: Record<string, any> = {};
    
    for (const width of breakpoints) {
      const height = width === 375 ? 812 : width === 1440 ? 900 : 1440;
      await page.setViewportSize({ width, height });
      await page.waitForTimeout(300);
      
      const metrics = await page.evaluate(() => {
        const elements = document.querySelectorAll('*');
        const margins: number[] = [];
        const paddings: number[] = [];
        
        elements.forEach(el => {
          const styles = window.getComputedStyle(el);
          const marginTop = parseFloat(styles.marginTop);
          const paddingTop = parseFloat(styles.paddingTop);
          
          if (marginTop > 0) margins.push(marginTop);
          if (paddingTop > 0) paddings.push(paddingTop);
        });
        
        return {
          marginCount: margins.length,
          paddingCount: paddings.length,
          avgMargin: margins.reduce((a, b) => a + b, 0) / margins.length || 0,
          avgPadding: paddings.reduce((a, b) => a + b, 0) / paddings.length || 0,
          maxMargin: Math.max(...margins, 0),
          maxPadding: Math.max(...paddings, 0)
        };
      });
      
      allMetrics[`${width}px`] = metrics;
    }
    
    console.log('\n=== Spacing Metrics Across Breakpoints ===');
    console.log(JSON.stringify(allMetrics, null, 2));
  });

  test('export spacing data to JSON', async ({ page }) => {
    await page.goto('/full-list-of-widgets#');
    await page.waitForLoadState('networkidle');
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.waitForTimeout(300);
    
    const spacingData = await page.evaluate((selectors) => {
      const data: any = {};
      
      Object.entries(selectors).forEach(([category, selectorMap]) => {
        data[category] = {};
        
        Object.entries(selectorMap as Record<string, string>).forEach(([name, selector]) => {
          const el = document.querySelector(selector);
          if (el) {
            const styles = window.getComputedStyle(el);
            data[category][name] = {
              selector,
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
              }
            };
          }
        });
      });
      
      return data;
    }, SELECTORS);
    
    // Save to fixtures for reference
    const fs = require('fs');
    const path = require('path');
    const dir = path.join(process.cwd(), 'fixtures');
    
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    
    fs.writeFileSync(
      path.join(dir, 'spacing-data.json'),
      JSON.stringify(spacingData, null, 2)
    );
    
    console.log('Spacing data exported to fixtures/spacing-data.json');
  });
});
