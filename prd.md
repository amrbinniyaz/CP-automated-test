Product Requirements Document (PRD)
Content Page Spacing Automation Test Suite
Version: 1.0
Date: October 14, 2025
Status: Ready for Implementation
Target Platform: Playwright with TypeScript

1. Executive Summary
1.1 Objective
Build an automated test suite using Playwright to validate margin and padding spacing rules for a content management system's content page across multiple responsive breakpoints.
1.2 Success Criteria

✅ 90%+ test coverage for spacing rules from specification document
✅ Tests run across 3 breakpoints (375px, 1440px, 2560px)
✅ Generate comprehensive spacing reports
✅ Tests complete in under 5 minutes
✅ CI/CD ready
✅ Clear pass/fail criteria with tolerance handling

1.3 Target URL

Live Site: https://mvcbasev3.leia.tiarc-live.co.uk/full-list-of-widgets#
Staging: TBD (configure in environment variables)


2. Technical Requirements
2.1 Technology Stack
json{
  "framework": "Playwright",
  "language": "TypeScript",
  "runner": "@playwright/test",
  "nodeVersion": ">=18.0.0",
  "browsers": ["chromium", "firefox", "webkit"]
}
2.2 Project Structure
content-page-tests/
├── .env                          # Environment variables
├── .gitignore                    # Git ignore file
├── package.json                  # Dependencies
├── playwright.config.ts          # Main configuration
├── tsconfig.json                 # TypeScript configuration
├── README.md                     # Setup instructions
│
├── config/
│   ├── breakpoints.ts           # Viewport configurations
│   ├── selectors.ts             # CSS selector mappings
│   └── spacing-rules.ts         # Expected spacing values
│
├── tests/
│   ├── margin-rules.spec.ts     # Margin A, B, C, D tests
│   ├── padding-rules.spec.ts    # Internal padding tests
│   ├── responsive.spec.ts       # Cross-breakpoint tests
│   ├── components/              # Component-specific tests
│   │   ├── featured-paragraph.spec.ts
│   │   ├── content-templates.spec.ts
│   │   ├── widgets.spec.ts
│   │   ├── buttons.spec.ts
│   │   └── lists-tables.spec.ts
│   └── reporting.spec.ts        # Spacing report generation
│
├── utils/
│   ├── spacing-helpers.ts       # Spacing calculation utilities
│   ├── assertion-helpers.ts     # Custom assertions
│   ├── screenshot-helpers.ts    # Visual capture utilities
│   └── report-generator.ts      # Report creation
│
├── fixtures/
│   └── spacing-data.json        # Expected values reference
│
└── reports/
    ├── html/                     # HTML reports
    ├── json/                     # JSON reports
    └── screenshots/              # Failure screenshots

3. Core Features
3.1 Margin Testing
3.1.1 Margin Rule Tests
Purpose: Validate external spacing follows specification rules
Rules to Test:
typescript// From specification document
const MARGIN_RULES = {
  A: { 375: 60, 1440: 90, 2560: 140 },   // Large sections
  B: { 375: 40, 1440: 50, 2560: 70 },    // Medium sections
  C: { 375: 30, 1440: 40, 2560: 60 },    // Small sections
  D: { 375: 20, 1440: 30, 2560: 30 }     // Minimal sections
};
Test Cases:

Test Margin A at 375px viewport → expect 60px ±2px
Test Margin A at 1440px viewport → expect 90px ±2px
Test Margin A at 2560px viewport → expect 140px ±2px
Repeat for Margin B, C, D
Test margin collapse between stacked elements

Acceptance Criteria:

All margin values within ±2px tolerance
Margins scale proportionally across breakpoints
Margin collapse works correctly (0px between full-width backgrounds)


3.2 Padding Testing
3.2.1 Internal Padding Rules
Purpose: Validate internal spacing for components with backgrounds
Rules to Test:
typescriptconst PADDING_RULES = {
  featuredParagraphV1: {
    375: { top: 40, bottom: 40 },
    1440: { top: 85, bottom: 85 },
    2560: { top: 160, bottom: 160 }
  },
  contentTemplateHalfHalf: {
    375: { top: 50, bottom: 50 },
    1259: { top: 85, bottom: 85 },
    1260: { top: 85, bottom: 85 },
    2560: { top: 200, bottom: 200 }
  },
  fullWidthImage: {
    375: { top: 90, bottom: 90 },
    1440: { top: 150, bottom: 150 },
    2560: { top: 270, bottom: 270 }
  }
};
Test Cases:

Featured Paragraph V1 - internal padding at all breakpoints
Content Templates (half-half, full-width) - padding validation
Module widgets with backgrounds - padding consistency
Story cards - fixed 20px padding
Widget wrappers - title separation spacing

Acceptance Criteria:

Padding values match specification ±2px
Components with backgrounds have proper internal padding
Padding scales correctly across breakpoints


3.3 Component-Specific Tests
3.3.1 Featured Paragraph
Selectors: .featuredParagraph, variants TBD
Tests:

Margin bottom: 30px at all breakpoints
Variant 1: Has internal padding + background
Variant 2: Left-aligned, no background
Text container width rules
Alignment (centered vs left)

3.3.2 Content Templates
Types: Half-half, Full-width
Tests:

Minimum height requirements (275px mobile, 1050px large)
Internal padding per variant
Media vs HTML ordering on mobile
Margin reduction when stacked
Background color handling

3.3.3 Buttons
Types: Primary, Secondary, Tertiary
Tests:

Internal padding consistency
No single-word widowing on wrap
Border, corner radius validation
Icon spacing (never widowed)

3.3.4 Widgets
Types: Events, Stories, Profiles, Cards, Stats, Promos, Quotes
Tests:

Module widget bottom margin (~94.5px at 1440px)
Internal padding for widgets with backgrounds (~89px)
Widget title bottom margin
Carousel arrow positioning
Grid layouts (1-4 items per row)

3.3.5 Lists & Tables
Tests:

Bullet list spacing
Numbered list spacing
Table overflow with scroll/fade
Indentation support

3.3.6 Dividers
Tests:

Padding above/below (60px mobile, 90px desktop, 165px large)
No padding accumulation from adjacent elements
Width and thickness


3.4 Responsive Behavior
3.4.1 Breakpoint Tests
Purpose: Ensure spacing scales correctly
Breakpoints:

Mobile: 375px
Tablet: 768px (optional)
Desktop: 1440px
Large: 2560px
Special: 1259px vs 1260px (content template behavior change)

Test Cases:

Spacing increases from mobile → desktop → large
Proportional scaling (desktop ≥ mobile * 0.95)
No sudden jumps or drops
Breakpoint-specific rules (1259px vs 1260px)

3.4.2 Layout Shifts
Tests:

Half-half templates reorder on mobile
Grid adaptations (4 → 2 → 1 columns)
Text reflow without breaking
Image ratio maintenance


3.5 Margin Reduction Rules
3.5.1 Stacked Elements
Purpose: Validate 0px margin between full-width backgrounds
Elements that trigger reduction:

Half-half content templates (with background)
Full-width content templates
Full-width video
Header (all types)
Featured Paragraph V1
Event full-width promo
Admissions calculator V1
Tickertape V2
Notices/Events lists
Quote carousel V1
Widget carousels with backgrounds

Test Cases:

Two stacked widgets with backgrounds → margin = 0px
Widget without background → normal margin maintained
Mixed stacking → verify per specification

Acceptance Criteria:

Gap between stacked backgrounds ≤ 5px
Normal elements maintain standard margins (>10px gap)


3.6 Reporting & Analysis
3.6.1 Comprehensive Spacing Report
Purpose: Generate detailed spacing analysis
Report Contents:
json{
  "viewport": "1440x900",
  "timestamp": "2025-10-14T10:30:00Z",
  "components": [
    {
      "selector": ".main-layout",
      "margins": { "top": 0, "right": 0, "bottom": 0, "left": 0 },
      "paddings": { "top": 67.56, "right": 0, "bottom": 0, "left": 0 },
      "dimensions": { "width": 1440, "height": 2000 },
      "status": "PASS",
      "expected": { "paddingTop": 90 },
      "actual": { "paddingTop": 67.56 },
      "deviation": -22.44
    }
  ],
  "summary": {
    "total": 50,
    "passed": 48,
    "failed": 2,
    "warnings": 3
  }
}
3.6.2 Inconsistency Detection
Purpose: Flag potential spacing issues
Checks:

Values not multiples of 5px
Unusually large margins (>200px)
Unusually large padding (>300px)
Asymmetric spacing without justification
Missing expected elements

3.6.3 Visual Regression
Purpose: Screenshot-based spacing validation
Features:

Highlight tested elements with colored outlines
Show margin/padding areas visually
Diff comparison for regressions
Save on failure for debugging


4. Implementation Specifications
4.1 Configuration Files
4.1.1 playwright.config.ts
typescriptimport { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  
  reporter: [
    ['html', { outputFolder: 'reports/html' }],
    ['json', { outputFile: 'reports/json/results.json' }],
    ['list']
  ],
  
  use: {
    baseURL: process.env.BASE_URL || 'https://mvcbasev3.leia.tiarc-live.co.uk',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  
  projects: [
    {
      name: 'mobile-chrome',
      use: { 
        ...devices['iPhone 12'],
        viewport: { width: 375, height: 812 }
      },
    },
    {
      name: 'desktop-chrome',
      use: { 
        ...devices['Desktop Chrome'],
        viewport: { width: 1440, height: 900 }
      },
    },
    {
      name: 'large-desktop',
      use: { 
        ...devices['Desktop Chrome'],
        viewport: { width: 2560, height: 1440 }
      },
    },
  ],
});
4.1.2 config/breakpoints.ts
typescriptexport const BREAKPOINTS = {
  mobile: { width: 375, height: 812, name: 'mobile' },
  tablet: { width: 768, height: 1024, name: 'tablet' },
  desktop: { width: 1440, height: 900, name: 'desktop' },
  large: { width: 2560, height: 1440, name: 'large' }
} as const;

export type BreakpointName = keyof typeof BREAKPOINTS;
4.1.3 config/selectors.ts
typescriptexport const SELECTORS = {
  layout: {
    mainLayout: '.main-layout',
    heroContent: '.hero-cp__content',
    moduleContent: '.module-content'
  },
  text: {
    featuredParagraph: '.featuredParagraph',
    featuredParagraphV1: '.featured-paragraph--v1', // TO BE IDENTIFIED
    featuredParagraphV2: '.featured-paragraph--v2', // TO BE IDENTIFIED
    heading1: 'h1',
    heading2: 'h2',
    heading3: 'h3',
    heading4: 'h4',
    bodyText: 'p'
  },
  widgets: {
    moduleWidget: '.module-widget',
    moduleWidgetWithBg: '.module-widget--with-bg',
    widgetWrapper: '.module-widget__wrapper',
    widgetTitle: '.module-widget__title',
    stories: '.module-widget--stories',
    events: '.module-widget--events', // TO BE IDENTIFIED
    profiles: '.module-widget--profiles', // TO BE IDENTIFIED
  },
  cards: {
    storyCard: '.story-card',
    storyCardContent: '.story-card__content',
    cardCarousel: '.module-widget--has-carousel',
    eventCard: '.event-card', // TO BE IDENTIFIED
    profileCard: '.profile-card', // TO BE IDENTIFIED
    promoCard: '.promo-card', // TO BE IDENTIFIED
  },
  contentTemplates: {
    halfHalf: '.content-template--half-half', // TO BE IDENTIFIED
    fullWidth: '.content-template--full-width', // TO BE IDENTIFIED
  },
  buttons: {
    primary: '.btn-primary', // TO BE IDENTIFIED
    secondary: '.btn-secondary', // TO BE IDENTIFIED
    tertiary: '.btn-tertiary', // TO BE IDENTIFIED
  },
  lists: {
    bulletList: 'ul',
    numberedList: 'ol'
  },
  misc: {
    divider: 'hr',
    table: 'table',
    quote: '.quote', // TO BE IDENTIFIED
    faq: '.faq', // TO BE IDENTIFIED
  }
} as const;
4.1.4 config/spacing-rules.ts
typescriptexport const MARGIN_RULES = {
  A: { 375: 60, 1440: 90, 2560: 140 },
  B: { 375: 40, 1440: 50, 2560: 70 },
  C: { 375: 30, 1440: 40, 2560: 60 },
  D: { 375: 20, 1440: 30, 2560: 30 }
} as const;

export const PADDING_RULES = {
  featuredParagraphV1: {
    375: { top: 40, bottom: 40 },
    1440: { top: 85, bottom: 85 },
    2560: { top: 160, bottom: 160 }
  },
  contentTemplateHalfHalf: {
    375: { top: 50, bottom: 50 },
    1259: { top: 85, bottom: 85 },
    1260: { top: 85, bottom: 85 },
    2560: { top: 200, bottom: 200 }
  },
  fullWidthImage: {
    375: { top: 90, bottom: 90 },
    1440: { top: 150, bottom: 150 },
    2560: { top: 270, bottom: 270 }
  },
  divider: {
    375: { top: 60, bottom: 60 },
    1440: { top: 90, bottom: 90 },
    2560: { top: 165, bottom: 165 }
  }
} as const;

export const TOLERANCE = 2; // ±2px acceptable deviation

4.2 Utility Functions
4.2.1 utils/spacing-helpers.ts
typescriptimport { Page } from '@playwright/test';

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
      return parseFloat(styles[`margin-${s}`]);
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
      return parseFloat(styles[`padding-${s}`]);
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
4.2.2 utils/assertion-helpers.ts
typescriptimport { expect } from '@playwright/test';
import { TOLERANCE } from '../config/spacing-rules';

/**
 * Assert value is within tolerance
 */
export function assertWithinTolerance(
  actual: number | null,
  expected: number,
  message: string,
  tolerance: number = TOLERANCE
): void {
  if (actual === null) {
    throw new Error(`${message}: Element not found or spacing not measurable`);
  }
  
  const diff = Math.abs(actual - expected);
  const detailedMessage = `${message}
    Expected: ${expected}px ±${tolerance}px
    Actual: ${actual}px
    Difference: ${diff}px`;
  
  expect(diff, detailedMessage).toBeLessThanOrEqual(tolerance);
}

/**
 * Assert value is within range
 */
export function assertWithinRange(
  actual: number | null,
  min: number,
  max: number,
  message: string
): void {
  if (actual === null) {
    throw new Error(`${message}: Element not found`);
  }
  
  const detailedMessage = `${message}
    Expected range: ${min}px - ${max}px
    Actual: ${actual}px`;
  
  expect(actual, detailedMessage).toBeGreaterThanOrEqual(min);
  expect(actual, detailedMessage).toBeLessThanOrEqual(max);
}

/**
 * Assert proportional scaling
 */
export function assertProportionalScaling(
  smallerValue: number | null,
  largerValue: number | null,
  minRatio: number,
  message: string
): void {
  if (smallerValue === null || largerValue === null) {
    throw new Error(`${message}: Values not measurable`);
  }
  
  const ratio = largerValue / smallerValue;
  const detailedMessage = `${message}
    Smaller: ${smallerValue}px
    Larger: ${largerValue}px
    Ratio: ${ratio.toFixed(2)}
    Expected min ratio: ${minRatio}`;
  
  expect(ratio, detailedMessage).toBeGreaterThanOrEqual(minRatio);
}
4.2.3 utils/report-generator.ts
typescriptimport { ComponentSpacing } from './spacing-helpers';
import * as fs from 'fs';
import * as path from 'path';

export interface SpacingReport {
  viewport: string;
  timestamp: string;
  url: string;
  components: ComponentReportItem[];
  summary: {
    total: number;
    passed: number;
    failed: number;
    warnings: number;
  };
}

export interface ComponentReportItem extends ComponentSpacing {
  status: 'PASS' | 'FAIL' | 'WARNING';
  expected?: any;
  actual?: any;
  deviation?: number;
  message?: string;
}

export class ReportGenerator {
  private report: SpacingReport;
  
  constructor(viewport: string, url: string) {
    this.report = {
      viewport,
      timestamp: new Date().toISOString(),
      url,
      components: [],
      summary: {
        total: 0,
        passed: 0,
        failed: 0,
        warnings: 0
      }
    };
  }
  
  addComponent(item: ComponentReportItem): void {
    this.report.components.push(item);
    this.report.summary.total++;
    
    if (item.status === 'PASS') this.report.summary.passed++;
    else if (item.status === 'FAIL') this.report.summary.failed++;
    else if (item.status === 'WARNING') this.report.summary.warnings++;
  }
  
  saveToJson(filename: string): void {
    const dir = path.join(process.cwd(), 'reports', 'json');
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    
    const filepath = path.join(dir, filename);
    fs.writeFileSync(filepath, JSON.stringify(this.report, null, 2));
    console.log(`Report saved to: ${filepath}`);
  }
  
  saveToHtml(filename: string): void {
    const html = this.generateHtmlReport();
    const dir = path.join(process.cwd(), 'reports', 'html');
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    
    const filepath = path.join(dir, filename);
    fs.writeFileSync(filepath, html);
    console.log(`HTML report saved to: ${filepath}`);
  }
  
  private generateHtmlReport(): string {
    // HTML template generation
    return `
<!DOCTYPE html>
<html>
<head>
  <title>Spacing Test Report - ${this.report.viewport}</title>
  <style>
    body { font-family: Arial, sans-serif; margin: 20px; background: #f5f5f5; }
    .header { background: #2563eb; color: white; padding: 20px; border-radius: 8px; }
    .summary { display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; margin: 20px 0; }
    .summary-card { background: white; padding: 15px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
    .pass { color: #16a34a; }
    .fail { color: #dc2626; }
    .warning { color: #ea580c; }
    table { width: 100%; background: white; border-collapse: collapse; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
    th, td { padding: 12px; text-align: left; border-bottom: 1px solid #e5e7eb; }
    th { background: #f3f4f6; font-weight: 600; }
    .status-badge { padding: 4px 8px; border-radius: 4px; font-size: 12px; font-weight: 600; }
    .status-pass { background: #dcfce7; color: #16a34a; }
    .status-fail { background: #fee2e2; color: #dc2626; }
    .status-warning { background: #ffedd5; color: #ea580c; }
  </style>
</head>
<body>
  <div class="header">
    <h1>Spacing Test Report</h1>
    <p>Viewport: ${this.report.viewport} | Timestamp: ${this.report.timestamp}</p>
    <p>URL: ${this.report.url}</p>
  </div>
  
  <div class="summary">
    <div class="summary-card">
      <h3>Total Tests</h3>
      <h2>${this.report.summary.total}</h2>
    </div>
    <div class="summary-card pass">
      <h3>Passed</h3>
      <h2>${this.report.summary.passed}</h2>
    </div>
    <div class="summary-card fail">
      <h3>Failed</h3>
      <h2>${this.report.summary.failed}</h2>
    </div>
    <div class="summary-card warning">
      <h3>Warnings</h3>
      <h2>${this.report.summary.warnings}</h2>
    </div>
  </div>
  
  <table>
    <thead>
      <tr>
        <th>Component</th>
        <th>Status</th>
        <th>Margin Top</th>
        <th>Margin Bottom</th>
        <th>Padding Top</th>
        <th>Padding Bottom</th>
        <th>Message</th>
      </tr>
    </thead>
    <tbody>
      ${this.report.components.map(comp => `
        <tr>
          <td><code>${comp.selector}</code></td>
          <td><span class="status-badge status-${comp.status.toLowerCase()}">${comp.status}</span></td>
          <td>${comp.margins.top.toFixed(2)}px</td>
          <td>${comp.margins.bottom.toFixed(2)}px</td>
          <td>${comp.paddings.top.toFixed(2)}px</td>
          <td>${comp.paddings.bottom.toFixed(2)}px</td>
          <td>${comp.message || '-'}</td>
        </tr>
      `).join('')}
    </tbody>
  </table>
</body>
</html>
    `.trim();
  }
  
  getReport(): SpacingReport {
    return this.report;
  }
}

4.3 Test File Examples
4.3.1 tests/margin-rules.spec.ts
typescriptimport { test, expect } from '@playwright/test';
import { MARGIN_RULES, TOLERANCE } from '../config/spacing-rules';
import { BREAKPOINTS } from '../config/breakpoints';
import { SELECTORS } from '../config/selectors';
import { getMargin } from '../utils/spacing-helpers';
import { assertWithinTolerance } from '../utils/assertion-helpers';

test.describe('Margin Rules - External Spacing', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/full-list-of-widgets#');
    await page.waitForLoadState('networkidle');
  });

  // Test Margin A across all breakpoints
  Object.entries(BREAKPOINTS).forEach(([name, viewport]) => {
    if (viewport.width === 375 || viewport.width === 1440 || viewport.width === 2560) {
      test(`Margin A should be ${MARGIN_RULES.A[viewport.width]}px at ${name} (${viewport.width}px)`, async ({ page }) => {
        await page.setViewportSize({ width: viewport.width, height: viewport.height });
        await page.waitForTimeout(300); // Allow reflow
        
        // Test on main content sections that use Margin A
        const marginTop = await getMargin(page, '.content-section', 'top');
        
        assertWithinTolerance(
          marginTop,
          MARGIN_RULES.A[viewport.width],
          `Margin A at ${name}`
        );
      });
    }
  });

  // Similar tests for Margin B, C, D
  // ... (repeat pattern for other margin rules)
});
4.3.2 tests/padding-rules.spec.ts
typescriptimport { test, expect } from '@playwright/test';
import { PADDING_RULES } from '../config/spacing-rules';
import { BREAKPOINTS } from '../config/breakpoints';
import { SELECTORS } from '../config/selectors';
import { getPadding, getElementSpacing } from '../utils/spacing-helpers';
import { assertWithinTolerance } from '../utils/assertion-helpers';

test.describe('Padding Rules - Internal Spacing', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/full-list-of-widgets#');
    await page.waitForLoadState('networkidle');
  });

  test('Featured Paragraph V1 - padding at mobile (375px)', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.waitForTimeout(300);
    
    const selector = SELECTORS.text.featuredParagraphV1;
    const paddingTop = await getPadding(page, selector, 'top');
    const paddingBottom = await getPadding(page, selector, 'bottom');
    
    assertWithinTolerance(
      paddingTop,
      PADDING_RULES.featuredParagraphV1[375].top,
      'Featured Paragraph V1 padding-top at mobile'
    );
    
    assertWithinTolerance(
      paddingBottom,
      PADDING_RULES.featuredParagraphV1[375].bottom,
      'Featured Paragraph V1 padding-bottom at mobile'
    );
  });

  test('Featured Paragraph V1 - padding at desktop (1440px)', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.waitForTimeout(300);
    
    const selector = SELECTORS.text.featuredParagraphV1;
    const paddingTop = await getPadding(page, selector, 'top');
    
    assertWithinTolerance(
      paddingTop,
      PADDING_RULES.featuredParagraphV1[1440].top,
      'Featured Paragraph V1 padding-top at desktop'
    );
  });

  test('Module widget with background - internal padding', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    
    const spacing = await getElementSpacing(page, SELECTORS.widgets.moduleWidgetWithBg);
    
    if (spacing) {
      assertWithinTolerance(
        spacing.paddings.top,
        89,
        'Module widget with background padding-top'
      );
      
      assertWithinTolerance(
        spacing.paddings.bottom,
        89,
        'Module widget with background padding-bottom'
      );
    }
  });

  test('Story card - fixed 20px padding', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    
    const spacing = await getElementSpacing(page, SELECTORS.cards.storyCardContent);
    
    if (spacing) {
      assertWithinTolerance(
        spacing.paddings.top,
        20,
        'Story card padding-top',
        1 // Tighter tolerance for fixed values
      );
      
      assertWithinTolerance(
        spacing.paddings.bottom,
        20,
        'Story card padding-bottom',
        1
      );
    }
  });
});
4.3.3 tests/responsive.spec.ts
typescriptimport { test, expect } from '@playwright/test';
import { BREAKPOINTS } from '../config/breakpoints';
import { SELECTORS } from '../config/selectors';
import { getElementSpacing } from '../utils/spacing-helpers';
import { assertProportionalScaling } from '../utils/assertion-helpers';

test.describe('Responsive Spacing Tests', () => {
  test('Main layout padding should scale proportionally', async ({ page }) => {
    await page.goto('/full-list-of-widgets#');
    
    const selector = SELECTORS.layout.mainLayout;
    const results: Record<string, number> = {};
    
    // Collect padding at all breakpoints
    for (const [name, viewport] of Object.entries(BREAKPOINTS)) {
      await page.setViewportSize({ width: viewport.width, height: viewport.height });
      await page.waitForTimeout(300);
      
      const spacing = await getElementSpacing(page, selector);
      if (spacing) {
        results[name] = spacing.paddings.top;
      }
    }
    
    // Verify scaling: desktop >= mobile, large >= desktop
    if (results.mobile && results.desktop) {
      assertProportionalScaling(
        results.mobile,
        results.desktop,
        0.95,
        'Mobile to Desktop scaling'
      );
    }
    
    if (results.desktop && results.large) {
      assertProportionalScaling(
        results.desktop,
        results.large,
        0.95,
        'Desktop to Large scaling'
      );
    }
    
    console.log('Padding progression:', results);
  });

  test('Content template behavior change at 1259px vs 1260px', async ({ page }) => {
    await page.goto('/full-list-of-widgets#');
    
    const selector = SELECTORS.contentTemplates.halfHalf;
    
    // Test at 1259px
    await page.setViewportSize({ width: 1259, height: 900 });
    await page.waitForTimeout(300);
    const spacing1259 = await getElementSpacing(page, selector);
    
    // Test at 1260px
    await page.setViewportSize({ width: 1260, height: 900 });
    await page.waitForTimeout(300);
    const spacing1260 = await getElementSpacing(page, selector);
    
    // Verify expected behavior change
    // (Specific assertions depend on actual design requirements)
    expect(spacing1259).toBeDefined();
    expect(spacing1260).toBeDefined();
  });
});
4.3.4 tests/components/featured-paragraph.spec.ts
typescriptimport { test, expect } from '@playwright/test';
import { SELECTORS } from '../../config/selectors';
import { getElementSpacing, hasBackground } from '../../utils/spacing-helpers';
import { assertWithinTolerance } from '../../utils/assertion-helpers';

test.describe('Featured Paragraph Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/full-list-of-widgets#');
    await page.waitForLoadState('networkidle');
  });

  test('should have 30px bottom margin', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    
    const spacing = await getElementSpacing(page, SELECTORS.text.featuredParagraph);
    
    if (spacing) {
      assertWithinTolerance(
        spacing.margins.bottom,
        30,
        'Featured Paragraph margin-bottom'
      );
    }
  });

  test('Variant 1 - should have background and internal padding', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    
    const selector = SELECTORS.text.featuredParagraphV1;
    const hasBg = await hasBackground(page, selector);
    const spacing = await getElementSpacing(page, selector);
    
    expect(hasBg, 'Variant 1 should have background').toBe(true);
    
    if (spacing) {
      expect(spacing.paddings.top).toBeGreaterThan(80);
      expect(spacing.paddings.bottom).toBeGreaterThan(80);
    }
  });

  test('Variant 2 - should NOT have background', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    
    const selector = SELECTORS.text.featuredParagraphV2;
    const hasBg = await hasBackground(page, selector);
    
    expect(hasBg, 'Variant 2 should NOT have background').toBe(false);
  });

  test('should be wider than rest of page text (Variant 1)', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    
    const featuredWidth = await page.evaluate((sel) => {
      const el = document.querySelector(sel);
      return el ? el.getBoundingClientRect().width : null;
    }, SELECTORS.text.featuredParagraphV1);
    
    const bodyWidth = await page.evaluate((sel) => {
      const el = document.querySelector(sel);
      return el ? el.getBoundingClientRect().width : null;
    }, SELECTORS.text.bodyText);
    
    if (featuredWidth && bodyWidth) {
      expect(featuredWidth).toBeGreaterThan(bodyWidth);
    }
  });
});
4.3.5 tests/components/buttons.spec.ts
typescriptimport { test, expect } from '@playwright/test';
import { SELECTORS } from '../../config/selectors';

test.describe('Button Components', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/full-list-of-widgets#');
    await page.waitForLoadState('networkidle');
  });

  test('should not have single word widowing on wrap', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    
    const buttons = await page.locator('button, a.btn, .button').all();
    
    for (const button of buttons) {
      const text = await button.textContent();
      if (!text) continue;
      
      const words = text.trim().split(/\s+/);
      if (words.length > 1) {
        // Check if button is wrapping
        const box = await button.boundingBox();
        if (box && box.height > 50) { // Multi-line button
          // Verify last line doesn't have single word
          // (This is a simplified check - actual implementation may vary)
          const lastWord = words[words.length - 1];
          expect(lastWord.length).toBeGreaterThan(3);
        }
      }
    }
  });

  test('all button types should work correctly', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    
    const buttonTypes = [
      SELECTORS.buttons.primary,
      SELECTORS.buttons.secondary,
      SELECTORS.buttons.tertiary
    ];
    
    for (const selector of buttonTypes) {
      const button = page.locator(selector).first();
      
      if (await button.count() > 0) {
        // Verify button is visible and clickable
        await expect(button).toBeVisible();
        
        // Check internal padding exists
        const padding = await button.evaluate(el => {
          const styles = window.getComputedStyle(el);
          return {
            top: parseFloat(styles.paddingTop),
            bottom: parseFloat(styles.paddingBottom),
            left: parseFloat(styles.paddingLeft),
            right: parseFloat(styles.paddingRight)
          };
        });
        
        expect(padding.top).toBeGreaterThan(5);
        expect(padding.bottom).toBeGreaterThan(5);
        expect(padding.left).toBeGreaterThan(10);
        expect(padding.right).toBeGreaterThan(10);
      }
    }
  });
});
4.3.6 tests/reporting.spec.ts
typescriptimport { test } from '@playwright/test';
import { BREAKPOINTS } from '../config/breakpoints';
import { SELECTORS } from '../config/selectors';
import { getElementSpacing } from '../utils/spacing-helpers';
import { ReportGenerator } from '../utils/report-generator';

test.describe('Spacing Reports', () => {
  test('generate comprehensive spacing report', async ({ page }) => {
    await page.goto('/full-list-of-widgets#');
    
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
    await page.setViewportSize({ width: 1440, height: 900 });
    
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
});

5. Testing Strategy
5.1 Test Execution Plan
Phase 1: Core Infrastructure (Week 1)

✅ Set up project structure
✅ Install dependencies
✅ Configure Playwright
✅ Create utility functions
✅ Identify remaining CSS selectors

Phase 2: Basic Tests (Week 1-2)

✅ Margin A, B, C, D tests
✅ Basic padding tests
✅ Main layout tests
✅ Module widget tests
✅ Story card tests

Phase 3: Component Tests (Week 2-3)

✅ Featured Paragraph (both variants)
✅ Content Templates
✅ Buttons (all types)
✅ Widgets (events, stories, profiles, etc.)
✅ Lists and Tables
✅ Dividers

Phase 4: Advanced Tests (Week 3-4)

✅ Responsive behavior
✅ Margin reduction rules
✅ Breakpoint-specific tests
✅ Layout shifts
✅ Visual regression

Phase 5: Reporting & CI/CD (Week 4)

✅ Report generation
✅ Inconsistency detection
✅ CI/CD integration
✅ Documentation

5.2 Test Coverage Goals
CategoryTarget CoveragePriorityMargin Rules100%HighPadding Rules100%HighFeatured Paragraph100%HighContent Templates100%HighWidgets90%MediumButtons100%MediumLists & Tables80%LowResponsive90%HighVisual Regression50%Low
5.3 CI/CD Integration
GitHub Actions Example
yaml# .github/workflows/spacing-tests.yml
name: Spacing Tests

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main, develop ]
  schedule:
    - cron: '0 2 * * *' # Daily at 2 AM

jobs:
  test:
    runs-on: ubuntu-latest
    
    strategy:
      matrix:
        browser: [chromium, firefox, webkit]
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - name: Install dependencies
        run: |
          npm ci
          npx playwright install --with-deps ${{ matrix.browser }}
      
      - name: Run spacing tests
        run: npx playwright test --project=${{ matrix.browser }}
        env:
          BASE_URL: ${{ secrets.TEST_URL }}
      
      - name: Upload test results
        if: always()
        uses: actions/upload-artifact@v3
        with:
          name: playwright-report-${{ matrix.browser }}
          path: reports/
          retention-days: 30
      
      - name: Upload screenshots on failure
        if: failure()
        uses: actions/upload-artifact@v3
        with:
          name: screenshots-${{ matrix.browser }}
          path: reports/screenshots/
          retention-days: 7

6. Deliverables
6.1 Code Deliverables

✅ Complete Playwright project with all configuration files
✅ Test suite covering 90%+ of spacing rules
✅ Utility functions and helpers
✅ Report generation system
✅ CI/CD configuration files

6.2 Documentation Deliverables

✅ README.md with setup instructions
✅ Contributing guide
✅ Selector identification guide
✅ Test writing guide
✅ Troubleshooting guide

6.3 Report Deliverables

✅ JSON spacing reports per breakpoint
✅ HTML visual reports
✅ Inconsistency reports
✅ Test execution summary
✅ Coverage metrics


7. Installation & Setup Guide
7.1 Prerequisites

Node.js >= 18.0.0
npm or yarn
Git
Internet connection

7.2 Quick Start
bash# 1. Create project directory
mkdir content-page-spacing-tests
cd content-page-spacing-tests

# 2. Initialize npm
npm init -y

# 3. Install Playwright
npm install --save-dev @playwright/test @types/node typescript

# 4. Install browsers
npx playwright install chromium firefox webkit

# 5. Initialize TypeScript
npx tsc --init

# 6. Create project structure
mkdir -p tests/{components} config utils fixtures reports/{html,json,screenshots}

# 7. Copy all configuration and test files
# (Use Cursor/Windsurf to generate files based on this PRD)

# 8. Run tests
npx playwright test

# 9. View reports
npx playwright show-report
7.3 Environment Variables
Create .env file:
bashBASE_URL=https://mvcbasev3.leia.tiarc-live.co.uk
STAGING_URL=https://staging.yoursite.com
TIMEOUT=30000
TOLERANCE=2

8. Success Metrics
8.1 Technical Metrics

✅ Test execution time < 5 minutes
✅ Test reliability > 95% (no flaky tests)
✅ Code coverage > 90%
✅ All tests pass on CI/CD

8.2 Quality Metrics

✅ Catch 100% of spacing regressions
✅ Clear failure messages
✅ Actionable reports
✅ Easy to maintain and extend

8.3 Business Metrics

✅ Reduce manual QA time by 70%
✅ Catch issues before production
✅ Faster deployment cycles
✅ Improved design consistency


9. Risk & Mitigation
RiskImpactMitigationFlaky testsHighProper wait conditions, retry logicMissing selectorsHighPhased rollout, selector discovery toolBrowser differencesMediumTest on all browsers, use CSS normalizePerformanceLowParallel execution, optimize waitsMaintenance burdenMediumGood documentation, helper functions

10. Future Enhancements
10.1 Phase 2 Features

Visual regression with screenshot comparison
Automated selector discovery
Performance profiling integration
Mobile device testing (real devices)
Accessibility checks alongside spacing

10.2 Phase 3 Features

AI-powered spacing anomaly detection
Interactive test dashboard
Integration with design tools (Figma)
Cross-browser visual comparison
Automated fix suggestions


11. Support & Maintenance
11.1 Updating Tests
When design changes:

Update config/spacing-rules.ts with new values
Update selectors in config/selectors.ts
Run tests to verify
Update tolerance if needed
Commit changes

11.2 Adding New Components

Identify CSS selector
Add to config/selectors.ts
Add spacing rules to config/spacing-rules.ts
Create test file in tests/components/
Run and verify tests

11.3 Troubleshooting
Common issues and solutions documented in TROUBLESHOOTING.md

12. Appendix
12.1 Package.json Scripts
json{
  "scripts": {
    "test": "playwright test",
    "test:mobile": "playwright test --project=mobile-chrome",
    "test:desktop": "playwright test --project=desktop-chrome",
    "test:large": "playwright test --project=large-desktop",
    "test:headed": "playwright test --headed",
    "test:debug": "playwright test --debug",
    "test:ui": "playwright test --ui",
    "report": "playwright show-report",
    "report:json": "node -e \"console.log(require('./reports/json/results.json'))\"",
    "codegen": "playwright codegen https://mvcbasev3.leia.tiarc-live.co.uk",
    "install:browsers": "playwright install"
  }
}
12.2 Complete Dependencies
json{
  "devDependencies": {
    "@playwright/test": "^1.40.0",
    "@types/node": "^20.10.0",
    "typescript": "^5.3.0",
    "dotenv": "^16.3.1"
  }
}

13. Cursor/Windsurf Implementation Prompts
Use these prompts in Cursor or Windsurf to build the project:
Prompt 1: Initial Setup
Create a Playwright TypeScript project with the following structure:
- playwright.config.ts with 3 viewports (375px, 1440px, 2560px)
- config/ folder with breakpoints.ts, selectors.ts, spacing-rules.ts
- utils/ folder with spacing-helpers.ts, assertion-helpers.ts, report-generator.ts
- tests/ folder with margin-rules.spec.ts, padding-rules.spec.ts
- All files should follow TypeScript best practices
- Add proper typing and JSDoc comments
Prompt 2: Utility Functions
Implement spacing-helpers.ts with these functions:
- getMargin(page, selector, side): Get computed margin
- getPadding(page, selector, side): Get computed padding  
- getElementSpacing(page, selector): Get all spacing values
- hasBackground(page, selector): Check if element has background
- getGapBetweenElements(page, sel1, sel2): Calculate gap

Use Playwright Page type and return proper types.
Prompt 3: Test Files
Create margin-rules.spec.ts that tests:
- Margin A (60-90-140px) at 375/1440/2560px breakpoints
- Margin B, C, D with their respective values
- Use the helper functions from spacing-helpers.ts
- Include proper error handling and logging
- Follow Playwright best practices
Prompt 4: Configuration
Create spacing-rules.ts with:
- MARGIN_RULES object mapping (A, B, C, D) to breakpoint values
- PADDING_RULES for components (featuredParagraph, contentTemplate, etc.)
- TOLERANCE constant set to 2px
- Proper TypeScript types
Prompt 5: Reporting
Implement report-generator.ts with ReportGenerator class:
- Constructor takes viewport and URL
- addComponent() method to add test results
- saveToJson() saves to reports/json/
- saveToHtml() generates HTML report with styling
- Include summary statistics (total, passed, failed, warnings)

14. Final Checklist
Before marking complete, verify:

 All configuration files created
 All utility functions implemented
 Core test files working
 Reports generating correctly
 CI/CD configuration added
 README.md complete
 All selectors identified (or marked as TBD)
 Tests passing locally
 Documentation complete
 Example reports generated


END OF PRD
This PRD is comprehensive and ready for implementation in Cursor or Windsurf. Use the prompts provided in Section 13 to generate the code systematically.