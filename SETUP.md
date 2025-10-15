# Setup Guide

Complete setup instructions for the Content Page Spacing Test Suite.

## Prerequisites Check

Before starting, ensure you have:

```bash
# Check Node.js version (must be >= 18.0.0)
node --version

# Check npm version
npm --version

# Check Git
git --version
```

## Step-by-Step Setup

### 1. Project Installation

```bash
# Navigate to project directory
cd /Users/macbookpro/CP\ test

# Install dependencies
npm install

# This will install:
# - @playwright/test
# - @types/node
# - typescript
# - dotenv
```

### 2. Install Playwright Browsers

```bash
# Install all browsers (chromium, firefox, webkit)
npx playwright install

# Or install specific browsers
npx playwright install chromium
npx playwright install firefox
npx playwright install webkit

# Install with system dependencies (Linux)
npx playwright install --with-deps
```

### 3. Configure Environment

The `.env` file is already created with default values:

```env
BASE_URL=https://mvcbasev3.leia.tiarc-live.co.uk
STAGING_URL=https://staging.yoursite.com
TIMEOUT=30000
TOLERANCE=2
```

**To test against a different URL:**
```bash
# Edit .env file
echo "BASE_URL=https://your-site.com" > .env
```

### 4. Identify CSS Selectors

Many selectors are marked as "TO BE IDENTIFIED". Update them:

```bash
# Use Playwright Codegen to find selectors
npm run codegen

# This opens a browser where you can:
# 1. Navigate to the target page
# 2. Click elements to generate selectors
# 3. Copy selectors to config/selectors.ts
```

**Example selector update:**

```typescript
// In config/selectors.ts
// Before:
featuredParagraphV1: '.featured-paragraph--v1', // TO BE IDENTIFIED

// After:
featuredParagraphV1: '.cp-featured-paragraph.variant-1',
```

### 5. Verify Installation

```bash
# Run a quick test
npx playwright test margin-rules.spec.ts --project=desktop-chrome

# Expected output:
# Running 12 tests using 1 worker
# ✓ tests/margin-rules.spec.ts:... (passed)
```

## First Test Run

### Run All Tests

```bash
npm test
```

This will:
- Run tests across all 3 breakpoints (mobile, desktop, large)
- Generate HTML and JSON reports
- Save screenshots for failures

### View Results

```bash
# Open HTML report
npm run report

# Or manually
open reports/html/index.html  # macOS
xdg-open reports/html/index.html  # Linux
start reports/html/index.html  # Windows
```

## Development Setup

### VS Code Setup (Recommended)

1. **Install Playwright Extension**
   - Open VS Code
   - Install "Playwright Test for VSCode"
   - Reload window

2. **Configure Workspace**
   ```json
   // .vscode/settings.json
   {
     "playwright.testDir": "./tests",
     "playwright.config": "./playwright.config.ts"
   }
   ```

3. **Run tests from VS Code**
   - Click the Testing icon (beaker)
   - View all tests in tree view
   - Run individual tests with one click

### TypeScript Setup

TypeScript is already configured via `tsconfig.json`. To verify:

```bash
# Check for TypeScript errors
npx tsc --noEmit
```

## Selector Identification Workflow

### Priority 1: Essential Selectors

Identify these first (marked "TO BE IDENTIFIED"):

1. **Featured Paragraphs**
   - `.featuredParagraphV1`
   - `.featuredParagraphV2`

2. **Content Templates**
   - `.content-template--half-half`
   - `.content-template--full-width`

3. **Buttons**
   - `.btn-primary`
   - `.btn-secondary`
   - `.btn-tertiary`

4. **Widgets**
   - `.module-widget--events`
   - `.module-widget--profiles`

### Finding Selectors

**Method 1: Browser DevTools**
```bash
# 1. Open target URL in browser
open https://mvcbasev3.leia.tiarc-live.co.uk/full-list-of-widgets#

# 2. Right-click element → Inspect
# 3. In Elements panel, right-click element → Copy → Copy selector
```

**Method 2: Playwright Codegen**
```bash
npm run codegen

# Click "Record" button
# Click elements on page
# Copy generated selectors
```

**Method 3: Console Testing**
```javascript
// In browser console
document.querySelector('.your-selector')
// Should return the element if selector is correct
```

### Update Selectors

After identifying selectors, update `config/selectors.ts`:

```typescript
export const SELECTORS = {
  text: {
    featuredParagraphV1: '.cp-featured-paragraph--variant-1', // IDENTIFIED
    featuredParagraphV2: '.cp-featured-paragraph--variant-2', // IDENTIFIED
  },
  // ... other selectors
};
```

## Directory Structure Creation

Some directories need to be created for reports:

```bash
# Create report directories
mkdir -p reports/html
mkdir -p reports/json
mkdir -p reports/screenshots
mkdir -p reports/screenshots/comparisons

# Create fixtures directory (for reference data)
mkdir -p fixtures

# Verify structure
tree -L 2 reports/
```

## Testing Against Different Environments

### Staging Environment

```bash
# Update .env
BASE_URL=https://staging.your-site.com

# Or override at runtime
BASE_URL=https://staging.your-site.com npm test
```

### Local Development

```bash
# Run local server first
# Then test against it
BASE_URL=http://localhost:3000 npm test
```

## CI/CD Setup (Optional)

### GitHub Actions

1. **Create secrets in GitHub:**
   - Go to Settings → Secrets → Actions
   - Add: `TEST_URL` (if different from default)

2. **Push to GitHub:**
   ```bash
   git add .
   git commit -m "Initial test suite setup"
   git push origin main
   ```

3. **Monitor workflow:**
   - Go to Actions tab in GitHub
   - View test runs

## Validation Checklist

After setup, verify everything works:

- [ ] Node.js >= 18.0.0 installed
- [ ] Dependencies installed (`npm install` succeeded)
- [ ] Playwright browsers installed
- [ ] At least one test runs successfully
- [ ] Reports generate correctly
- [ ] Essential selectors identified
- [ ] .env configured for your environment

## Next Steps

1. **Identify remaining selectors** - Update `config/selectors.ts`
2. **Adjust spacing rules** - If needed, update `config/spacing-rules.ts`
3. **Run full test suite** - `npm test`
4. **Review reports** - `npm run report`
5. **Set up CI/CD** - Push to GitHub for automated testing

## Troubleshooting

If you encounter issues:

1. **Check TROUBLESHOOTING.md** for common problems
2. **Verify Node version** - Must be >= 18.0.0
3. **Clear cache and reinstall**:
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```
4. **Check network connectivity** to test URLs

## Getting Help

- **Documentation**: See README.md and CONTRIBUTING.md
- **Issues**: Check existing issues or create new one
- **Playwright Docs**: https://playwright.dev

## Quick Reference Commands

```bash
# Installation
npm install
npm run install:browsers

# Running tests
npm test                    # All tests
npm run test:mobile        # Mobile only
npm run test:desktop       # Desktop only
npm run test:headed        # See browser
npm run test:debug         # Debug mode

# Reports
npm run report             # View HTML report

# Development
npm run codegen            # Find selectors
npx tsc --noEmit          # Check TypeScript

# Cleanup
rm -rf node_modules reports test-results
```

---


