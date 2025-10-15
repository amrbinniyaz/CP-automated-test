# Quick Start Guide

Get up and running with spacing tests in 5 minutes.

## 📦 Install

```bash
# Install dependencies
npm install

# Install Playwright browsers
npx playwright install
```

## 🎯 Identify Selectors (Important!)

Many selectors are marked "TO BE IDENTIFIED". Use codegen to find them:

```bash
npm run codegen
```

Then update `config/selectors.ts` with the correct selectors for your site.

## ▶️ Run Tests

```bash
# Run all tests
npm test

# Run specific viewport
npm run test:mobile
npm run test:desktop
npm run test:large

# Run with UI (recommended for first time)
npm run test:ui
```

## 📊 View Reports

```bash
npm run report
```

## 🔧 Common First Steps

### 1. Update Base URL (if needed)

Edit `.env`:
```bash
BASE_URL=https://your-site.com
```

### 2. Identify Essential Selectors

Update these in `config/selectors.ts`:
- `.featuredParagraphV1`
- `.featuredParagraphV2`
- `.content-template--half-half`
- `.content-template--full-width`
- Button selectors

### 3. Adjust Tolerance (if tests fail)

Edit `config/spacing-rules.ts`:
```typescript
export const TOLERANCE = 5; // Increase from 2
```

### 4. Run Single Test File

```bash
npx playwright test margin-rules.spec.ts
```

## 📖 Learn More

- **Full Setup**: See `SETUP.md`
- **Troubleshooting**: See `TROUBLESHOOTING.md`
- **Contributing**: See `CONTRIBUTING.md`
- **Documentation**: See `README.md`

## 🚀 Quick Commands Reference

| Command | Description |
|---------|-------------|
| `npm test` | Run all tests |
| `npm run test:headed` | See tests run in browser |
| `npm run test:debug` | Debug mode |
| `npm run test:ui` | Interactive UI mode |
| `npm run report` | View test report |
| `npm run codegen` | Find CSS selectors |

## 💡 Tips

1. **Start with one test file** to verify setup
2. **Use test:ui mode** for interactive debugging
3. **Check reports** after each run
4. **Update selectors** before running full suite
5. **Increase tolerance** if values are close but failing

## ⚠️ Common Issues

**Tests timing out?**
- Check BASE_URL in `.env`
- Increase timeout in `playwright.config.ts`

**Element not found?**
- Update selectors in `config/selectors.ts`
- Use `npm run codegen` to find them

**Values slightly off?**
- Increase TOLERANCE in `config/spacing-rules.ts`
- Update expected values if design changed

---

**Ready to test!** Run `npm test` to get started. 🎉
