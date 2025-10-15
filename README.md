# Content Page Spacing Automation Test Suite

Automated Playwright test suite for validating margin and padding spacing rules across multiple responsive breakpoints.

## 🎯 Overview

This test suite validates spacing rules for a content management system's content page, ensuring consistent design implementation across mobile, desktop, and large screen breakpoints.

### Key Features

- ✅ 90%+ test coverage for spacing rules
- ✅ Tests across 3 breakpoints (375px, 1440px, 2560px)
- ✅ Comprehensive spacing reports (HTML & JSON)
- ✅ CI/CD ready with GitHub Actions
- ✅ Clear pass/fail criteria with tolerance handling

## 📋 Prerequisites

- Node.js >= 18.0.0
- npm or yarn
- Git

## 🚀 Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Install Playwright Browsers

```bash
npm run install:browsers
```

### 3. Run Tests

```bash
# Run all tests
npm test

# Run mobile tests only
npm run test:mobile

# Run desktop tests only
npm run test:desktop

# Run tests with UI
npm run test:ui

# Run tests in headed mode
npm run test:headed

# Debug tests
npm run test:debug
```

### 4. View Reports

```bash
npm run report
```

## 📁 Project Structure

```
content-page-tests/
├── .env                          # Environment variables
├── .gitignore                    # Git ignore file
├── package.json                  # Dependencies
├── playwright.config.ts          # Main configuration
├── tsconfig.json                 # TypeScript configuration
├── README.md                     # This file
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
│   │   ├── buttons.spec.ts
│   │   ├── widgets.spec.ts
│   │   └── lists-tables.spec.ts
│   └── reporting.spec.ts        # Spacing report generation
│
├── utils/
│   ├── spacing-helpers.ts       # Spacing calculation utilities
│   ├── assertion-helpers.ts     # Custom assertions
│   └── report-generator.ts      # Report creation
│
├── fixtures/
│   └── spacing-data.json        # Expected values reference
│
└── reports/
    ├── html/                     # HTML reports
    ├── json/                     # JSON reports
    └── screenshots/              # Failure screenshots
```

## 🧪 Test Categories

### Margin Rules
Tests external spacing between elements:
- **Margin A**: Large sections (60px → 90px → 140px)
- **Margin B**: Medium sections (40px → 50px → 70px)
- **Margin C**: Small sections (30px → 40px → 60px)
- **Margin D**: Minimal sections (20px → 30px → 30px)

### Padding Rules
Tests internal spacing for components with backgrounds:
- Featured Paragraph V1 padding
- Content Template padding
- Module widget padding
- Story card padding (fixed 20px)

### Responsive Tests
- Proportional scaling validation
- Breakpoint-specific behavior (1259px vs 1260px)
- Layout adaptations
- No sudden spacing jumps

### Component Tests
- Featured Paragraphs (variants 1 & 2)
- Buttons (primary, secondary, tertiary)
- Widgets (events, stories, profiles, cards)
- Lists & Tables

## ⚙️ Configuration

### Environment Variables

Create a `.env` file with:

```bash
BASE_URL=https://mvcbasev3.leia.tiarc-live.co.uk
STAGING_URL=https://staging.yoursite.com
TIMEOUT=30000
TOLERANCE=2
```

### Spacing Rules

Edit `config/spacing-rules.ts` to update expected values:

```typescript
export const MARGIN_RULES = {
  A: { 375: 60, 1440: 90, 2560: 140 },
  B: { 375: 40, 1440: 50, 2560: 70 },
  // ...
};
```

### Selectors

Update `config/selectors.ts` to match your site's CSS selectors:

```typescript
export const SELECTORS = {
  layout: {
    mainLayout: '.main-layout',
    // ...
  },
  // ...
};
```

## 📊 Reports

### HTML Reports
Visual reports with pass/fail status for each test:
```bash
npm run report
```

### JSON Reports
Programmatic access to test results:
```bash
npm run report:json
```

### Screenshots
Failure screenshots saved to `reports/screenshots/`

## 🔧 Troubleshooting

### Tests Failing Due to Selectors

Some selectors are marked as "TO BE IDENTIFIED". Update `config/selectors.ts` with actual CSS selectors from your site.

### Timing Issues

Adjust wait times in tests if elements take longer to load:
```typescript
await page.waitForTimeout(500); // Increase from 300ms
```

### Tolerance Adjustments

If spacing is slightly off but acceptable, adjust tolerance in `config/spacing-rules.ts`:
```typescript
export const TOLERANCE = 3; // Increase from 2px
```

## 🚀 CI/CD Integration

### GitHub Actions

The project includes a `.github/workflows/spacing-tests.yml` file for automated testing on push/PR.

Create the workflow file:

```yaml
name: Spacing Tests

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main, develop ]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npx playwright install --with-deps
      - run: npx playwright test
```

## 📈 Success Metrics

- ✅ Test execution time < 5 minutes
- ✅ Test reliability > 95% (no flaky tests)
- ✅ Code coverage > 90%
- ✅ All tests pass on CI/CD

## 🤝 Contributing

1. Update `config/selectors.ts` with identified selectors
2. Add new test cases to appropriate spec files
3. Run tests locally before committing
4. Update this README if adding new features

## 📝 Maintenance

### Adding New Components

1. Add selector to `config/selectors.ts`
2. Add spacing rules to `config/spacing-rules.ts`
3. Create test file in `tests/components/`
4. Run and verify tests

### Updating Design Values

1. Update `config/spacing-rules.ts`
2. Run tests to verify changes
3. Commit updated rules

## 📚 Additional Resources

- [Playwright Documentation](https://playwright.dev)
- [TypeScript Documentation](https://www.typescriptlang.org)
- Project PRD: `prd.md`

## 📄 License

ISC

## 👥 Authors

Content Page Spacing Test Suite Team

---

**Target URL**: https://mvcbasev3.leia.tiarc-live.co.uk/full-list-of-widgets#
