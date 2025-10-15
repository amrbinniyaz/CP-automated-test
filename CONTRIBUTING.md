# Contributing Guide

Thank you for contributing to the Content Page Spacing Test Suite!

## Getting Started

1. **Fork the repository**
2. **Clone your fork**
   ```bash
   git clone https://github.com/your-username/content-page-tests.git
   cd content-page-tests
   ```
3. **Install dependencies**
   ```bash
   npm install
   npm run install:browsers
   ```

## Development Workflow

### 1. Create a Branch

```bash
git checkout -b feature/your-feature-name
```

### 2. Make Changes

- Update selectors in `config/selectors.ts`
- Add/modify tests in `tests/`
- Update spacing rules in `config/spacing-rules.ts`

### 3. Run Tests Locally

```bash
npm test
npm run test:headed  # To see tests running
```

### 4. Commit Changes

```bash
git add .
git commit -m "feat: add new widget tests"
```

Use conventional commit messages:
- `feat:` New features
- `fix:` Bug fixes
- `docs:` Documentation changes
- `test:` Adding or updating tests
- `refactor:` Code refactoring

### 5. Push and Create PR

```bash
git push origin feature/your-feature-name
```

## Adding New Tests

### Adding a Component Test

1. Create a new file in `tests/components/`:
   ```typescript
   // tests/components/my-component.spec.ts
   import { test, expect } from '@playwright/test';
   import { SELECTORS } from '../../config/selectors';
   
   test.describe('My Component', () => {
     test.beforeEach(async ({ page }) => {
       await page.goto('/full-list-of-widgets#');
       await page.waitForLoadState('networkidle');
     });
     
     test('should have correct spacing', async ({ page }) => {
       // Your test here
     });
   });
   ```

2. Add selector to `config/selectors.ts`:
   ```typescript
   export const SELECTORS = {
     // ...
     myComponent: {
       container: '.my-component',
       title: '.my-component__title'
     }
   };
   ```

3. Add spacing rules if needed in `config/spacing-rules.ts`

### Adding Utility Functions

Add helper functions to `utils/spacing-helpers.ts`:

```typescript
/**
 * Your utility function
 */
export async function myUtility(
  page: Page,
  selector: string
): Promise<number> {
  // Implementation
}
```

## Identifying Selectors

Many selectors are marked as "TO BE IDENTIFIED". To find them:

1. **Use Playwright Codegen**:
   ```bash
   npm run codegen
   ```

2. **Inspect with Browser DevTools**:
   - Open the target URL
   - Right-click element → Inspect
   - Find unique CSS selector

3. **Update `config/selectors.ts`** with found selectors

## Testing Best Practices

### 1. Use Helper Functions

```typescript
// Good
import { getMargin } from '../utils/spacing-helpers';
const margin = await getMargin(page, selector, 'top');

// Avoid
const margin = await page.evaluate((sel) => {
  const el = document.querySelector(sel);
  return parseFloat(window.getComputedStyle(el).marginTop);
}, selector);
```

### 2. Handle Missing Elements

```typescript
const spacing = await getElementSpacing(page, selector);

if (spacing && spacing.margins.bottom > 0) {
  assertWithinTolerance(spacing.margins.bottom, 30, 'Margin test');
}
```

### 3. Wait for Stability

```typescript
await page.setViewportSize({ width: 1440, height: 900 });
await page.waitForTimeout(300); // Allow reflow
```

### 4. Use Descriptive Messages

```typescript
// Good
assertWithinTolerance(
  margin,
  60,
  'Featured Paragraph margin-bottom at mobile'
);

// Avoid
assertWithinTolerance(margin, 60, 'margin test');
```

## Code Style

- Use TypeScript strict mode
- Follow existing code structure
- Add JSDoc comments for functions
- Use meaningful variable names
- Keep functions small and focused

## Running Specific Tests

```bash
# Run single test file
npx playwright test margin-rules.spec.ts

# Run tests matching pattern
npx playwright test --grep "Margin A"

# Run with specific project
npx playwright test --project=mobile-chrome
```

## Debugging Tests

```bash
# Debug mode
npm run test:debug

# UI mode
npm run test:ui

# Headed mode (see browser)
npm run test:headed
```

## Documentation

When adding features, update:
- `README.md` - User-facing documentation
- `CONTRIBUTING.md` (this file) - Developer guide
- Inline comments - Complex logic
- JSDoc - Function documentation

## Pull Request Checklist

- [ ] Tests pass locally
- [ ] New tests added for new features
- [ ] Selectors are identified (not "TO BE IDENTIFIED")
- [ ] Documentation updated
- [ ] Commit messages follow conventions
- [ ] No console.log statements (use proper logging)
- [ ] Code follows existing style

## Questions?

Open an issue or reach out to the maintainers.

## License

By contributing, you agree that your contributions will be licensed under the ISC License.
