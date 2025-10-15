import { Page } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

/**
 * Take screenshot with spacing highlights
 */
export async function screenshotWithSpacingHighlights(
  page: Page,
  filename: string,
  selectors: string[]
): Promise<void> {
  // Add visual highlights to elements
  await page.evaluate((sels) => {
    sels.forEach((selector, index) => {
      const el = document.querySelector(selector);
      if (el) {
        const htmlEl = el as HTMLElement;
        const color = ['#ff0000', '#00ff00', '#0000ff', '#ff00ff'][index % 4];
        htmlEl.style.outline = `3px solid ${color}`;
        htmlEl.style.outlineOffset = '2px';
      }
    });
  }, selectors);
  
  // Take screenshot
  const dir = path.join(process.cwd(), 'reports', 'screenshots');
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  
  await page.screenshot({ 
    path: path.join(dir, filename),
    fullPage: true 
  });
  
  // Remove highlights
  await page.evaluate((sels) => {
    sels.forEach((selector) => {
      const el = document.querySelector(selector);
      if (el) {
        const htmlEl = el as HTMLElement;
        htmlEl.style.outline = '';
        htmlEl.style.outlineOffset = '';
      }
    });
  }, selectors);
}

/**
 * Take screenshot with margin/padding visualization
 */
export async function screenshotWithSpacingOverlay(
  page: Page,
  filename: string,
  selector: string
): Promise<void> {
  await page.evaluate((sel) => {
    const el = document.querySelector(sel);
    if (!el) return;
    
    const styles = window.getComputedStyle(el);
    const rect = el.getBoundingClientRect();
    
    // Create overlay div for margins (red)
    const marginOverlay = document.createElement('div');
    marginOverlay.style.position = 'absolute';
    marginOverlay.style.top = `${rect.top - parseFloat(styles.marginTop)}px`;
    marginOverlay.style.left = `${rect.left - parseFloat(styles.marginLeft)}px`;
    marginOverlay.style.width = `${rect.width + parseFloat(styles.marginLeft) + parseFloat(styles.marginRight)}px`;
    marginOverlay.style.height = `${rect.height + parseFloat(styles.marginTop) + parseFloat(styles.marginBottom)}px`;
    marginOverlay.style.backgroundColor = 'rgba(255, 0, 0, 0.2)';
    marginOverlay.style.border = '2px dashed red';
    marginOverlay.style.pointerEvents = 'none';
    marginOverlay.style.zIndex = '10000';
    document.body.appendChild(marginOverlay);
    
    // Create overlay div for padding (green)
    const paddingOverlay = document.createElement('div');
    paddingOverlay.style.position = 'absolute';
    paddingOverlay.style.top = `${rect.top}px`;
    paddingOverlay.style.left = `${rect.left}px`;
    paddingOverlay.style.width = `${rect.width}px`;
    paddingOverlay.style.height = `${rect.height}px`;
    paddingOverlay.style.backgroundColor = 'rgba(0, 255, 0, 0.2)';
    paddingOverlay.style.border = '2px dashed green';
    paddingOverlay.style.pointerEvents = 'none';
    paddingOverlay.style.zIndex = '10001';
    document.body.appendChild(paddingOverlay);
  }, selector);
  
  const dir = path.join(process.cwd(), 'reports', 'screenshots');
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  
  await page.screenshot({ 
    path: path.join(dir, filename),
    fullPage: true 
  });
}

/**
 * Compare spacing between two viewport sizes
 */
export async function screenshotViewportComparison(
  page: Page,
  viewports: Array<{ width: number; height: number; name: string }>,
  baseFilename: string
): Promise<void> {
  const dir = path.join(process.cwd(), 'reports', 'screenshots', 'comparisons');
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  
  for (const viewport of viewports) {
    await page.setViewportSize({ width: viewport.width, height: viewport.height });
    await page.waitForTimeout(300);
    
    await page.screenshot({
      path: path.join(dir, `${baseFilename}-${viewport.name}.png`),
      fullPage: true
    });
  }
}

/**
 * Annotate screenshot with spacing measurements
 */
export async function screenshotWithAnnotations(
  page: Page,
  filename: string,
  measurements: Array<{ selector: string; label: string }>
): Promise<void> {
  await page.evaluate((items) => {
    items.forEach(({ selector, label }) => {
      const el = document.querySelector(selector);
      if (!el) return;
      
      const rect = el.getBoundingClientRect();
      
      // Create label
      const labelDiv = document.createElement('div');
      labelDiv.textContent = label;
      labelDiv.style.position = 'absolute';
      labelDiv.style.top = `${rect.top - 30}px`;
      labelDiv.style.left = `${rect.left}px`;
      labelDiv.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
      labelDiv.style.color = 'white';
      labelDiv.style.padding = '4px 8px';
      labelDiv.style.fontSize = '12px';
      labelDiv.style.fontFamily = 'monospace';
      labelDiv.style.zIndex = '10002';
      labelDiv.style.borderRadius = '3px';
      document.body.appendChild(labelDiv);
      
      // Highlight element
      const htmlEl = el as HTMLElement;
      htmlEl.style.outline = '2px solid #ff0000';
    });
  }, measurements);
  
  const dir = path.join(process.cwd(), 'reports', 'screenshots');
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  
  await page.screenshot({ 
    path: path.join(dir, filename),
    fullPage: true 
  });
}
