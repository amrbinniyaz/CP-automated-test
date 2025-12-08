# Header Tests - Folder Structure

This folder contains all test cases for Content Page Headers organized by header type and component.

## Folder Structure

```
headers/
├── README.md                           # This file
├── common/                             # Common tests for all header types
│   ├── breadcrumbs.spec.ts            # Breadcrumb tests (BC-01 to BC-07)
│   ├── notice-buttons.spec.ts         # Notice button tests (NB-01 to NB-11)
│   ├── cta-buttons.spec.ts            # CTA button tests (CTA-01 to CTA-06)
│   ├── gradient.spec.ts               # Gradient tests (GR-01 to GR-05)
│   ├── h1-heading.spec.ts             # H1 heading tests (H1-01 to H1-07)
│   ├── logo.spec.ts                   # Logo tests (LG-01 to LG-05)
│   └── hamburger-menu.spec.ts         # Hamburger menu tests (HM-01 to HM-04)
├── normal/                             # Normal header variants
│   ├── normal-v1.spec.ts              # Normal V1 tests (NV1-01 to NV1-07)
│   ├── normal-v2.spec.ts              # Normal V2 tests (NV2-01 to NV2-07)
│   ├── normal-v3.spec.ts              # Normal V3 tests (NV3-01 to NV3-08)
│   └── normal-v4.spec.ts              # Normal V4 tests (NV4-01 to NV4-08)
├── no-header/                          # No header variants
│   ├── no-header-v1.spec.ts           # No Header V1 tests (NH1-01 to NH1-09)
│   └── no-header-v2.spec.ts           # No Header V2 tests (NH2-01 to NH2-04)
├── video/                              # Video header variants
│   ├── video-v1.spec.ts               # Video V1 tests (VH1-01 to VH1-17)
│   └── video-v2.spec.ts               # Video V2 tests (VH2-01 to VH2-05)
├── carousel/                           # Image carousel header variants
│   ├── carousel-v1.spec.ts            # Carousel V1 tests (CH1-01 to CH1-16)
│   └── carousel-v2.spec.ts            # Carousel V2 tests (CH2-01 to CH2-06)
├── responsive.spec.ts                  # Responsive behavior tests (RB-01 to RB-10)
├── accessibility.spec.ts               # Accessibility tests (A11Y-01 to A11Y-10)
├── performance.spec.ts                 # Performance tests (PERF-01 to PERF-06)
├── edge-cases.spec.ts                  # Edge cases tests (EDGE-01 to EDGE-10)
└── cross-browser.spec.ts               # Cross-browser tests (CB-01 to CB-06)
```

## Test Organization

### Common Tests (7 files)
Tests that apply to ALL header variants:
- **breadcrumbs.spec.ts** - Visibility, content, links, colors
- **notice-buttons.spec.ts** - Layout, positioning, badges, hover states
- **cta-buttons.spec.ts** - Position, count, text, hover, clicks
- **gradient.spec.ts** - Appearance, loading, scaling with H1
- **h1-heading.spec.ts** - Width, hyphenation, alignment, colors, scaling
- **logo.spec.ts** - Visibility, positioning, clickability
- **hamburger-menu.spec.ts** - Visibility, position, hover, click

### Variant-Specific Tests (10 files)
Tests specific to each header variant:

**Normal Headers (4 files)**
- **normal-v1.spec.ts** - Full-width image overlay
- **normal-v2.spec.ts** - Stacked (image top, content bottom)
- **normal-v3.spec.ts** - Split layout (content left, image right)
- **normal-v4.spec.ts** - Framed/boxed layout

**No Header (2 files)**
- **no-header-v1.spec.ts** - Centered logo on mobile
- **no-header-v2.spec.ts** - Left-aligned logo on mobile

**Video Headers (2 files)**
- **video-v1.spec.ts** - Video overlay with controls
- **video-v2.spec.ts** - Video stacked (video top, content bottom)

**Carousel Headers (2 files)**
- **carousel-v1.spec.ts** - Carousel overlay with pagination
- **carousel-v2.spec.ts** - Carousel stacked (carousel top, content bottom)

### Cross-Cutting Tests (5 files)
Tests that apply across all variants:
- **responsive.spec.ts** - Breakpoint transitions, repositioning, scaling
- **accessibility.spec.ts** - Keyboard nav, focus, ARIA, contrast, screen readers
- **performance.spec.ts** - Loading times, animations, mobile performance
- **edge-cases.spec.ts** - Error handling, missing content, extreme cases
- **cross-browser.spec.ts** - Chrome, Firefox, Safari, Edge, mobile browsers

## Running Tests

### Run all header tests
```bash
npx playwright test tests/headers
```

### Run specific category
```bash
npx playwright test tests/headers/common
npx playwright test tests/headers/normal
npx playwright test tests/headers/video
```

### Run specific file
```bash
npx playwright test tests/headers/common/breadcrumbs.spec.ts
npx playwright test tests/headers/normal/normal-v1.spec.ts
```

### Run specific test
```bash
npx playwright test tests/headers/common/breadcrumbs.spec.ts -g "BC-01"
```

### Run with specific browser
```bash
npx playwright test tests/headers --project=chromium
npx playwright test tests/headers --project=firefox
npx playwright test tests/headers --project=webkit
```

## Test URLs

Each test file expects specific test URLs:
- `/header-normal-v1` - Normal Header Variant 1
- `/header-normal-v2` - Normal Header Variant 2
- `/header-normal-v3` - Normal Header Variant 3
- `/header-normal-v4` - Normal Header Variant 4
- `/header-no-header-v1` - No Header Variant 1
- `/header-no-header-v2` - No Header Variant 2
- `/header-video-v1` - Video Header Variant 1
- `/header-video-v2` - Video Header Variant 2
- `/header-carousel-v1` - Image Carousel Header Variant 1
- `/header-carousel-v2` - Image Carousel Header Variant 2

## Test Count Summary

| Category | Files | Test Cases |
|----------|-------|------------|
| Common Tests | 7 | ~70 |
| Normal Headers | 4 | ~30 |
| No Header | 2 | ~13 |
| Video Headers | 2 | ~22 |
| Carousel Headers | 2 | ~22 |
| Responsive | 1 | 10 |
| Accessibility | 1 | 10 |
| Performance | 1 | 6 |
| Edge Cases | 1 | 10 |
| Cross-Browser | 1 | 6 |
| **TOTAL** | **23 files** | **~200 tests** |

## Priority Levels

### Priority 1 (Critical) - Must Pass
- All common tests
- Layout positioning for all variants
- Responsive behavior at all breakpoints
- Video auto-play and controls
- Carousel navigation

### Priority 2 (High) - Should Pass
- Hover states
- Gradient behavior
- Accessibility basics
- Performance (loading)

### Priority 3 (Medium) - Nice to Have
- Edge cases
- Cross-browser compatibility
- Advanced accessibility
- Animation smoothness
