# Header Tests - Visual Folder Structure

```
CP test/
└── tests/
    └── headers/                                    # Main header tests folder
        │
        ├── README.md                               # Documentation & guide
        ├── FOLDER_STRUCTURE.md                     # This file
        │
        ├── common/                                 # ✅ Common tests (all headers)
        │   ├── breadcrumbs.spec.ts                # 7 tests - BC-01 to BC-07
        │   ├── notice-buttons.spec.ts             # 11 tests - NB-01 to NB-11
        │   ├── cta-buttons.spec.ts                # 6 tests - CTA-01 to CTA-06
        │   ├── gradient.spec.ts                   # 5 tests - GR-01 to GR-05
        │   ├── h1-heading.spec.ts                 # 7 tests - H1-01 to H1-07
        │   ├── logo.spec.ts                       # 5 tests - LG-01 to LG-05
        │   └── hamburger-menu.spec.ts             # 4 tests - HM-01 to HM-04
        │
        ├── normal/                                 # 🖼️ Normal header variants
        │   ├── normal-v1.spec.ts                  # 7 tests - NV1-01 to NV1-07
        │   │                                       # V1: Full-width image overlay
        │   ├── normal-v2.spec.ts                  # 7 tests - NV2-01 to NV2-07
        │   │                                       # V2: Stacked (image top, content bottom)
        │   ├── normal-v3.spec.ts                  # 8 tests - NV3-01 to NV3-08
        │   │                                       # V3: Split (content left, image right)
        │   └── normal-v4.spec.ts                  # 8 tests - NV4-01 to NV4-08
        │                                           # V4: Framed/boxed layout
        │
        ├── no-header/                              # 📏 No header variants (minimal)
        │   ├── no-header-v1.spec.ts               # 9 tests - NH1-01 to NH1-09
        │   │                                       # V1: Centered logo on mobile
        │   └── no-header-v2.spec.ts               # 4 tests - NH2-01 to NH2-04
        │                                           # V2: Left-aligned logo on mobile
        │
        ├── video/                                  # 🎥 Video header variants
        │   ├── video-v1.spec.ts                   # 17 tests - VH1-01 to VH1-17
        │   │                                       # V1: Video overlay with controls
        │   └── video-v2.spec.ts                   # 5 tests - VH2-01 to VH2-05
        │                                           # V2: Video stacked (video top, content bottom)
        │
        ├── carousel/                               # 🎠 Image carousel variants
        │   ├── carousel-v1.spec.ts                # 16 tests - CH1-01 to CH1-16
        │   │                                       # V1: Carousel overlay with pagination
        │   └── carousel-v2.spec.ts                # 6 tests - CH2-01 to CH2-06
        │                                           # V2: Carousel stacked (carousel top, content bottom)
        │
        ├── responsive.spec.ts                      # 📱 Responsive behavior (10 tests)
        │                                           # RB-01 to RB-10
        │
        ├── accessibility.spec.ts                   # ♿ Accessibility (10 tests)
        │                                           # A11Y-01 to A11Y-10
        │
        ├── performance.spec.ts                     # ⚡ Performance (6 tests)
        │                                           # PERF-01 to PERF-06
        │
        ├── edge-cases.spec.ts                      # 🔧 Edge cases & error handling (10 tests)
        │                                           # EDGE-01 to EDGE-10
        │
        └── cross-browser.spec.ts                   # 🌐 Cross-browser compatibility (6 tests)
                                                    # CB-01 to CB-06
```

---

## File Organization Summary

### 📁 **7 Common Test Files** (45 tests total)
All tests that apply to every header variant

| File | Tests | Focus |
|------|-------|-------|
| `breadcrumbs.spec.ts` | 7 | Visibility, content, links, colors |
| `notice-buttons.spec.ts` | 11 | Layout, positioning, badges, hover |
| `cta-buttons.spec.ts` | 6 | Position, count, hover, clicks |
| `gradient.spec.ts` | 5 | Appearance, loading, H1 scaling |
| `h1-heading.spec.ts` | 7 | Width, alignment, colors, scaling |
| `logo.spec.ts` | 5 | Visibility, positioning, clicks |
| `hamburger-menu.spec.ts` | 4 | Visibility, position, hover, click |

### 📁 **4 Normal Header Files** (30 tests total)
Different layout patterns for normal headers

| File | Tests | Layout Pattern |
|------|-------|----------------|
| `normal-v1.spec.ts` | 7 | Full-width image overlay |
| `normal-v2.spec.ts` | 7 | Stacked (image above, content below) |
| `normal-v3.spec.ts` | 8 | Split (content left, image right) |
| `normal-v4.spec.ts` | 8 | Framed/boxed with margins |

### 📁 **2 No Header Files** (13 tests total)
Minimal header with reduced height

| File | Tests | Difference |
|------|-------|------------|
| `no-header-v1.spec.ts` | 9 | Logo centered on mobile |
| `no-header-v2.spec.ts` | 4 | Logo left-aligned on mobile |

### 📁 **2 Video Header Files** (22 tests total)
Headers with video backgrounds

| File | Tests | Layout Pattern |
|------|-------|----------------|
| `video-v1.spec.ts` | 17 | Video overlay with custom controls |
| `video-v2.spec.ts` | 5 | Video stacked (video above, content below) |

### 📁 **2 Carousel Header Files** (22 tests total)
Headers with image carousels

| File | Tests | Layout Pattern |
|------|-------|----------------|
| `carousel-v1.spec.ts` | 16 | Carousel overlay with pagination |
| `carousel-v2.spec.ts` | 6 | Carousel stacked (carousel above, content below) |

### 📁 **5 Cross-Cutting Test Files** (42 tests total)
Tests that apply across all variants

| File | Tests | Focus |
|------|-------|-------|
| `responsive.spec.ts` | 10 | Breakpoint transitions, repositioning |
| `accessibility.spec.ts` | 10 | Keyboard, ARIA, contrast, screen readers |
| `performance.spec.ts` | 6 | Loading, animations, mobile performance |
| `edge-cases.spec.ts` | 10 | Error handling, missing content |
| `cross-browser.spec.ts` | 6 | Chrome, Firefox, Safari, Edge, mobile |

---

## Total Test Count: **23 files, ~200 test cases**

---

## Test Execution Examples

### Run all header tests
```bash
npx playwright test tests/headers
```

### Run by category
```bash
# Common tests only
npx playwright test tests/headers/common

# Normal header variants only
npx playwright test tests/headers/normal

# Video headers only
npx playwright test tests/headers/video

# Carousel headers only
npx playwright test tests/headers/carousel

# No header variants only
npx playwright test tests/headers/no-header
```

### Run specific file
```bash
npx playwright test tests/headers/common/breadcrumbs.spec.ts
npx playwright test tests/headers/normal/normal-v1.spec.ts
npx playwright test tests/headers/video/video-v1.spec.ts
```

### Run specific test by ID
```bash
npx playwright test tests/headers/common/breadcrumbs.spec.ts -g "BC-01"
npx playwright test tests/headers/normal/normal-v1.spec.ts -g "NV1-03"
```

### Run with specific viewport
```bash
npx playwright test tests/headers --project=mobile
npx playwright test tests/headers --project=desktop
```

---

## Benefits of This Structure

✅ **Organized by Concern** - Common tests separate from variant-specific tests  
✅ **Easy to Navigate** - Clear folder hierarchy and naming  
✅ **Scalable** - Easy to add new variants or test types  
✅ **Maintainable** - Related tests grouped together  
✅ **Flexible Execution** - Run all tests, by category, or individual files  
✅ **Clear Ownership** - Each file has a specific responsibility  
✅ **Documentation** - README and structure docs included  

---

## Next Steps

1. ✅ Folder structure created
2. ⏳ Create test file templates
3. ⏳ Write test implementations
4. ⏳ Set up test data and fixtures
5. ⏳ Configure test URLs
6. ⏳ Run and validate tests
