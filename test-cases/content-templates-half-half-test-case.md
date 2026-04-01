# Content Templates (Half-Half) Test Cases

## Overview

| Property | Value |
|----------|-------|
| Widget Name | Content Templates (half-half) |
| CMS Tag | `{content-templates}` |
| Variants | 2 |
| Types | image+HTML, image carousel+HTML, video+HTML, widget+HTML (& reverse layouts) |

---

## Design Specifications (from Master Template CSV)

### Variants

**Variant 1 (with background):**
- Character styles: all
- Background: colour, opacity, SVG watermark

**Variant 2 (without background):**
- Character styles: all
- No background

**Variant Control:** `/Website/Styles/_globals/_theme.scss` lines 19-21
- `$CTCarouselHasBg: 1;` → set to `0` for no background
- `$CTTwoEqualColumnHasBg: 1;` → set to `0` for no background
- `$CTHtmlElemeHasBg: 1;` → set to `0` for no background

### Layout Types

1. **Image + HTML** (& reverse)
2. **Image Carousel + HTML** (& reverse)
3. **Video + HTML** (& reverse)
4. **Widget + HTML** (& reverse)

### Behavior Rules

| Rule | Description |
|------|-------------|
| Mobile Layout | On mobile (up to 1259px), HTML content is always below image/video/widget |
| Image Carousel | Should feature gradient above image and beneath pagination |
| Video | Opens pop-up when clicked |
| Widget Carousel | Not looping, arrows greyed out at ends, arrows hidden when all visible |
| Background Alternation | Content templates' background colour alternates when stacked |

### Minimum Height Rules

| Screen Range | Minimum Height |
|--------------|----------------|
| 375px-1259px (media above HTML) | N/A - follows padding rules |
| 1260px (media next to HTML) | 560px |
| 2560px (media next to HTML) | 840px |

### Padding Rules (Internal)

**Range 1: Media above HTML (375px - 1259px)**
| Screen | Padding |
|--------|---------|
| 375px | 40px (image+HTML) / 50px (widget+HTML) |
| 1259px | 85px |

**Range 2: Media next to HTML (1260px+)**
| Screen | Padding |
|--------|---------|
| 1260px | 85px (above & below HTML) |
| 2560px | 200px (image+HTML) / 160px (widget+HTML) |

### Margin Rules (External)

Reduce margin to 0px when placed above/below full-width elements with background:
- Another half-half content template*
- Full-width content template
- Full-width video
- Header (all types)
- Featured Paragraph (variant 1)
- Event full-width promo (both variants)
- Admissions calculator (variant 1)
- Tickertape (variant 2)
- Notices list (both variants)
- Events list (both variants)
- Donations calculator
- Quote carousel (variant 1)
- Widget carousel with background

*If variant 2 (no background), reduce padding to 50% instead of 0px

---

## CSS Variables Used (from _theme-cssvars.scss)

| Variable | Purpose | Default Value |
|----------|---------|---------------|
| `--widget-background` | Background color | `var(--primary-color)` |
| `--widget-background2` | Alt background | `var(--fourth-color)` |
| `--widget-background-even` | Alternating bg | `rgba($primaryColor, 0.97)` **BUG** |
| `--content-templates-padding` | Top/bottom padding | `var(--padding-b)` |
| `--two-equal-column-bg-padding` | Equal column padding | `var(--padding-a) 0` |
| `--two-equal-column-gap` | Column gap | `var(--margin-c)` |
| `--two-column-min-height` | Min height | `clmp(560px, 840px, 1260px, 2560px)` |
| `--two-equal-column-min-height` | Equal col min height | `clmp(275px, 1050px, 375px, 2560px)` |
| `--mobile-column-gap` | Mobile gap | `var(--margin-c)` |

---

## Code Implementation

### Files

| File | Purpose |
|------|---------|
| `/Website/Styles/Legacy/components/_content-templates.scss` | Base component styles |
| `/Website/Styles/_globals/_theme.scss` | Theme mixins (lines 2254-2590) |
| `/Website/Styles/_globals/_theme-cssvars.scss` | CSS variable definitions |

### Key Mixins (from _theme.scss)

| Mixin | Purpose |
|-------|---------|
| `contentTemplatesAltText` | Alt text colors for light background |
| `contentTemplatesCenteredText` | Centered text styles |
| `contentTemplatesTwoEqualColumnBg` | Two equal column background handling |
| `contentTemplatesHtmlElemBg` | HTML element background handling |
| `contentTemplatesCarouselGeneral` | Carousel styling with alternating backgrounds |
| `contentTemplates` | Main content templates mixin |

---

## Known Bugs Found

### BUG-CT-001: SCSS Variable in rgba() - widget-background-even
| Property | Value |
|----------|-------|
| **Severity** | High |
| **File** | `/Website/Styles/_globals/_theme-cssvars.scss` |
| **Line** | 53 |
| **Code** | `--widget-background-even: #{rgba($primaryColor, 0.97)};` |
| **Expected** | Should use CSS variable or CSS color-mix() |
| **Issue** | Uses `$primaryColor` SCSS variable - won't cascade at runtime |

### BUG-CT-002: SCSS Variable in gradient - module-fader--images
| Property | Value |
|----------|-------|
| **Severity** | High |
| **File** | `/Website/Styles/Legacy/components/_content-templates.scss` |
| **Line** | 480 |
| **Code** | `background: linear-gradient(to bottom, rgba($primaryColor, 0) 0%, rgba($primaryColor, 1) 100%);` |
| **Expected** | Should use CSS variable |
| **Issue** | Uses `$primaryColor` SCSS variable in gradient |

### BUG-CT-003: SCSS Variables in contentTemplates mixin
| Property | Value |
|----------|-------|
| **Severity** | High |
| **File** | `/Website/Styles/_globals/_theme.scss` |
| **Line** | 2386-2387 |
| **Code** | `$CTshadowColor: $primaryColor;` and `$CTSolidColor: $primaryColor;` |
| **Expected** | Should use CSS variables |
| **Issue** | Local SCSS variables assigned from global SCSS variable |

### BUG-CT-004: Hardcoded #fff in promo-card within content-templates
| Property | Value |
|----------|-------|
| **Severity** | Medium |
| **File** | `/Website/Styles/_globals/_theme.scss` |
| **Line** | 1573 |
| **Code** | `color: #fff;` |
| **Expected** | Should use `var(--neutral-color)` or appropriate CSS variable |
| **Issue** | Hardcoded white color won't respond to theme changes |

### BUG-CT-005: Hardcoded #fff in portal-card within content-templates
| Property | Value |
|----------|-------|
| **Severity** | Medium |
| **File** | `/Website/Styles/_globals/_theme.scss` |
| **Line** | 1749 |
| **Code** | `color: #fff;` |
| **Expected** | Should use CSS variable |
| **Issue** | Hardcoded white color |

### BUG-CT-006: Hardcoded #fff in portal-card variant 3
| Property | Value |
|----------|-------|
| **Severity** | Medium |
| **File** | `/Website/Styles/_globals/_theme.scss` |
| **Line** | 1786 |
| **Code** | `color: #fff;` |
| **Expected** | Should use CSS variable |
| **Issue** | Hardcoded white color |

---

## Test Cases

### Styling Tests

| ID | Test Case | Expected | Breakpoints |
|----|-----------|----------|-------------|
| SC-CT-001 | Verify half-half layout displays correctly | Image/video on one side, HTML on other | 1440px, 2560px |
| SC-CT-002 | Verify mobile layout stacks content | HTML below media content | 375px, 768px |
| SC-CT-003 | Verify minimum height is respected | Min 560px at 1260px, 840px at 2560px | 1260px, 2560px |
| SC-CT-004 | Verify padding scales with breakpoints | Padding matches rules in specs | All |
| SC-CT-005 | Verify background alternation works | Adjacent content templates alternate bg | 1440px |

### Color Variable Tests

| ID | Test Case | Variable | Expected |
|----|-----------|----------|----------|
| COL-CT-001 | Change --primary-color at runtime | `--primary-color` | Background updates |
| COL-CT-002 | Change --fourth-color at runtime | `--fourth-color` | Alt background updates |
| COL-CT-003 | Verify gradient uses CSS variable | N/A | Gradient should update (WILL FAIL - BUG-CT-002) |

### Spacing Variable Tests

| ID | Test Case | Variable | Expected |
|----|-----------|----------|----------|
| SV-CT-001 | Verify content-templates-padding | `--content-templates-padding` | Uses `--padding-b` value |
| SV-CT-002 | Verify two-equal-column-bg-padding | `--two-equal-column-bg-padding` | Uses `--padding-a` value |
| SV-CT-003 | Verify mobile-column-gap | `--mobile-column-gap` | Uses `--margin-c` on mobile |

### Responsive Tests

| ID | Test Case | Breakpoints | Expected |
|----|-----------|-------------|----------|
| RESP-CT-001 | Layout switches to stacked on mobile | 1259px -> 1260px | Side-by-side to stacked |
| RESP-CT-002 | Padding scales correctly | 375px, 1440px, 2560px | Matches padding rules |
| RESP-CT-003 | Min height scales correctly | 1260px, 2560px | 560px to 840px |

### Behavior Tests

| ID | Test Case | Expected |
|----|-----------|----------|
| BHV-CT-001 | Image carousel pagination | Dots visible, gradient above image |
| BHV-CT-002 | Video opens in popup | Clicking video opens modal |
| BHV-CT-003 | Widget carousel arrows | Greyed out at ends, hidden when all visible |
| BHV-CT-004 | Carousel not looping | Cannot loop past first/last item |

---

## Test Execution Checklist

- [ ] SC-CT-001: Half-half layout (Desktop)
- [ ] SC-CT-002: Mobile stacked layout
- [ ] SC-CT-003: Minimum height verification
- [ ] SC-CT-004: Padding verification
- [ ] SC-CT-005: Background alternation
- [ ] COL-CT-001: Primary color cascade
- [ ] COL-CT-002: Fourth color cascade
- [ ] COL-CT-003: Gradient color cascade (Expected FAIL)
- [ ] SV-CT-001: Content templates padding
- [ ] SV-CT-002: Two equal column padding
- [ ] SV-CT-003: Mobile column gap
- [ ] RESP-CT-001: Layout breakpoint switch
- [ ] RESP-CT-002: Padding responsive scaling
- [ ] RESP-CT-003: Min height responsive scaling
- [ ] BHV-CT-001: Image carousel pagination
- [ ] BHV-CT-002: Video popup
- [ ] BHV-CT-003: Widget carousel arrows
- [ ] BHV-CT-004: Carousel looping disabled

---

## Test URLs

### Staging Base
`https://test-1-mvcbasev3.tiarc-staging.co.uk/amr-test/`

### Pages with Content Templates
- `https://test-1-mvcbasev3.tiarc-staging.co.uk/amr-test/content-templates` - Main content templates test page

---

## Notes

1. **White/Black are intentionally hardcoded** per design spec - `branding white` (#fff) and `branding black` (#000) don't have CSS variables by design.

2. **BUG-CT-002 is critical** - The gradient in `.module-fader--images` uses `$primaryColor` which means the image carousel overlay won't update when themes change.

3. **BUG-CT-001 affects alternating backgrounds** - When content templates are stacked, the alternating background color uses SCSS variable, breaking theme cascade.

---

## Revision History

| Date | Author | Changes |
|------|--------|---------|
| 2026-01-23 | Claude | Initial test case document created |
| 2026-01-26 | Claude | Test execution at 1512px - BUG-CT-002 confirmed, results documented |
