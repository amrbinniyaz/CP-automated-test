# Portals Component Test Case

**Component:** Portals (Portal Card, Carousel, Grid)  

**Last Updated:** 2025-12-03  
**Test URL:** https://test-1-mvcbasev3.tiarc-staging.co.uk/amr-test/portals  
**Local URL:** https://localhost:4335/amr-test/portals

---

## Table of Contents
1. [Overview](#overview)
2. [Test Environment](#test-environment)
3. [Portal Card Tests](#portal-card-tests)
4. [Portals Carousel Tests](#portals-carousel-tests)
5. [Portals Grid Tests](#portals-grid-tests)
6. [Typography & Spacing Tests](#typography--spacing-tests)
7. [CSS Variable Inheritance Tests](#css-variable-inheritance-tests)
8. [Font Variable Tests](#font-variable-tests)
9. [Color Variable Tests](#color-variable-tests)
10. [Known Bugs](#known-bugs)
11. [Test Execution Checklist](#test-execution-checklist)

---

## Overview

The Portals (Portal Icons) component displays navigation links with icons in three layouts:
- **Portal Card**: Individual portal with icon and title
- **Portals Carousel**: Horizontal scrollable portals with navigation arrows
- **Portals Grid**: Responsive grid layout

### Portal Card Variants:
| Variant | Description |
|---------|-------------|
| v1 | Icon with square primary color background, title below |
| v2 | Full card with primary background, icon and title centered |
| v3 | Icon only, title below with padding |

### Carousel Variants:
| Variant | Description |
|---------|-------------|
| v1-v4 | Different arrow positioning and styling |

---

## Test Environment

| Property | Value |
|----------|-------|
| Browser | Chrome (latest) |
| Viewports | 375px, 768px, 1440px, 2560px |
| Test URL | Staging environment |

---

## Portal Card Tests

### PC-001: Icon Display
**Priority:** High  
**Precondition:** Portal card visible

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | View portal card | Icon image displays correctly |
| 2 | Check icon sizing | Height is responsive (69px → 90px) |
| 3 | Check icon fit | `object-fit: contain` applied |

---

### PC-002: Hover Effect
**Priority:** Medium  
**Precondition:** Portal card visible, desktop with mouse

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Hover over portal card | Icon translates up by 0.5rem |
| 2 | Transition | Smooth 0.3s ease transition |
| 3 | Move mouse away | Icon returns to original position |

---

### PC-003: Title Styling
**Priority:** High  
**Precondition:** Portal card visible

| Property | Expected Value |
|----------|----------------|
| Text align | Center |
| Font size | `clmp(1.6rem, 2.5rem)` = 16px → 25px |
| Font weight | 500 |
| Line height | 1.25 |

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Check title alignment | Centered |
| 2 | Check font size | Responsive between 16-25px |

---

### PC-004: Arrow Icon
**Priority:** Medium  
**Precondition:** Portal with link

| Property | Expected Value |
|----------|----------------|
| Icon | Right arrow (>) |
| Font size | `clmp(1.1rem, 1.3rem)` |
| Color | Inherited from text |

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Check arrow presence | Arrow icon visible after title |
| 2 | Check arrow styling | Matches text color |

---

## Portal Card Variant Tests

### PCV-001: Variant 1 Styling
**Priority:** High  
**Precondition:** Portal card variant 1 visible

| Element | Expected Style |
|---------|----------------|
| Image background | `var(--primary-color)` |
| Image padding | 4.2rem |
| Image aspect ratio | 1:1 |
| Title color | `var(--primary-color)` |
| Title padding-top | `var(--padding-h-inner)` |

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Check icon background | Primary color (#1c2b3c) |
| 2 | Check title color | Primary color |
| 3 | On dark background | Icon bg = fourth-color, title = white |

---

### PCV-002: Variant 2 Styling
**Priority:** High  
**Precondition:** Portal card variant 2 visible

| Element | Expected Style |
|---------|----------------|
| Card background | `var(--primary-color)` |
| Card aspect ratio | 1:1 |
| Gap | 1.5rem |
| Title color | White (#fff) |

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Check full card background | Primary color |
| 2 | Check title color | White |
| 3 | On dark background | Card bg = fourth-color, title = primary, icon = tertiary |

---

### PCV-003: Variant 3 Styling
**Priority:** High  
**Precondition:** Portal card variant 3 visible

| Element | Expected Style |
|---------|----------------|
| Icon height | `clmp(6rem, 12.6rem)` = 60px → 126px |
| Title padding-top | 2.6rem |
| Title color | `var(--primary-color)` |

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Check icon sizing | Larger than v1/v2 |
| 2 | Check title spacing | 2.6rem padding from icon |
| 3 | On dark background | Title = white |

---

## Portals Carousel Tests

### PCR-001: Carousel Navigation
**Priority:** High  
**Precondition:** Portals carousel with > visible items

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Check arrows | Next/Previous arrows visible |
| 2 | Click Next | Carousel scrolls to next items |
| 3 | Click Previous | Carousel scrolls to previous items |

---

### PCR-002: Arrow Disabled States
**Priority:** Medium  
**Precondition:** Portals carousel visible

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | At start | Previous arrow disabled |
| 2 | At end | Next arrow disabled |
| 3 | Visual indicator | Disabled arrows have reduced opacity |

---

### PCR-003: Arrow Hover Colors
**Priority:** High  
**Precondition:** Carousel visible

| State | Background | Arrow |
|-------|------------|-------|
| Normal | `branding 2` (#7fc9c7) | `branding 1` (#1c2b3c) |
| Hover | `branding 3` (#c55f3c) | TBD |
| Disabled | `branding 2` (opacity 0.5) | `branding 1` (opacity 0.5) |

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Check normal state | Secondary color background |
| 2 | Hover over arrow | Background changes to tertiary |
| 3 | Check disabled | 50% opacity |

---

## Portals Grid Tests

### PG-001: Grid Layout
**Priority:** High  
**Precondition:** Portals grid visible at different viewports

| Viewport | Expected Layout |
|----------|-----------------|
| Mobile (375px) | 2 columns |
| Tablet (768px) | 3 columns |
| Desktop (1440px) | 4+ columns |

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | View at 375px | 2-column grid |
| 2 | View at 768px | 3-column grid |
| 3 | View at 1440px | Appropriate columns |

---

### PG-002: Uniform Dimensions
**Priority:** Medium  
**Precondition:** Grid with portals

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Add portals with different title lengths | Grid displays |
| 2 | Check portal dimensions | All portals have consistent sizing |

---

## Typography & Spacing Tests

### TS-001: Title Typography
**Priority:** High  
**Design Spec:** Promo font style

| Property | Expected Value |
|----------|----------------|
| Font Family | Primary or Secondary (per variant) |
| Font Size | `clmp(1.6rem, 2.5rem)` |
| Font Weight | 500 |
| Line Height | 1.25 or 1.4 (per variant) |

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Inspect portal title | Font matches spec |
| 2 | Check responsiveness | Size scales between breakpoints |

---

## CSS Variable Inheritance Tests

### CV-001: Primary Color Variable
**Priority:** Medium  
**Precondition:** Access to CSS variables

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Note current `--primary-color` | Document current value |
| 2 | Change to test value | Save and rebuild |
| 3 | View portal v1 background | Background color changes |
| 4 | View portal v2 card | Card color changes |
| 5 | Revert to original | Colors return |

---

### CV-002: Fourth Color Variable
**Priority:** Medium  
**Precondition:** Portal on dark background

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Note current `--fourth-color` | Document current value |
| 2 | Change to test value | Save and rebuild |
| 3 | View portal on dark bg | Background updates |
| 4 | Revert to original | Returns to original |

---

### CV-003: Tertiary Color Variable
**Priority:** Medium  
**Precondition:** Portal v2 on dark background

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Note current `--tertiary-color` | Document current value |
| 2 | Change to test value | Save and rebuild |
| 3 | View arrow icon | Icon color changes |
| 4 | Revert to original | Returns to original |

---

## Font Variable Tests

### FV-001: Portal Title Font (Variant 1/3 on light)
**Priority:** High  
**Font Variable:** `promo b`  
**Precondition:** Portal variant 1 or 3 on light background

| Property | Expected Value |
|----------|----------------|
| Color | `branding 1` (primary) |

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Inspect title | Dark primary color |
| 2 | Change `--primary-color` | Title color changes |

---

### FV-002: Portal Title Font (Variant 2 on light)
**Priority:** High  
**Font Variable:** `promo a`  
**Precondition:** Portal variant 2 visible

| Property | Expected Value |
|----------|----------------|
| Color | White (#fff) |

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Inspect title | White text |

---

### Font Variables by Component (from CSV)

| Component | Portal Variant | Title Font |
|-----------|----------------|------------|
| Carousel (v1-4) | v1 | promo b |
| Carousel (v1-4) | v2 | promo a |
| Carousel (v1-4) | v3 | promo b |
| CT Portals + Text | v1 | promo a |
| CT Portals + Text | v2 | promo b |
| CT Portals + Text | v3 | promo a |
| Portals Grid | v1 | promo b |
| Portals Grid | v2 | promo a |
| Portals Grid | v3 | promo b |

---

## Color Variable Tests

### COL-001: Portal Icon Colors (from CSV)

| Portal Variant | On Light Bg | On Dark Bg |
|----------------|-------------|------------|
| v1 - background | `branding 1` | `branding 4` |
| v1 - title | `branding 1` | `branding white` |
| v1 - icon | `branding 1` | `branding 1` |
| v2 - background | `branding 1` | `branding 4` |
| v2 - title | `branding white` | `branding 1` |
| v2 - icon | inherit | `branding 3` |
| v3 - title | `branding 1` | `branding white` |
| v3 - icon | `branding 1` | `branding 1` |

---

### CSS Variables Reference Table

| Variable | Location | Affects |
|----------|----------|---------|
| `--primary-color` | `_theme-cssvars.scss` | v1/v2 background, title color |
| `--fourth-color` | `_theme-cssvars.scss` | Background on dark modules |
| `--tertiary-color` | `_theme-cssvars.scss` | v2 icon on dark background |
| `--secondary-color` | `_theme-cssvars.scss` | Carousel button background |
| `--padding-h-inner` | `_theme-cssvars.scss` | v1 title padding-top |

---

## Known Bugs

| # | Issue | Current | Expected | File:Line |
|---|-------|---------|----------|-----------|
| 1 | Portals carousel button background wrong | `branding 2` (#7fc9c7) | `branding 1` (#1c2b3c) per CSV style b | `_theme.scss:224` |
| 2 | Portals carousel button opacity wrong | 100% (40% disabled) | 50% normal per CSV | `_theme.scss:224` |
| 3 | Portals carousel arrow color wrong | `branding 1` (inherited) | `branding white` per CSV style b | `_theme.scss` |
| 4 | No variant-specific carousel button styles | Same style for all carousels | Different styles (a, b, c, d) per component | Global issue |
| 5 | Portal v2 card gap too small | 15px | 24px (1.5rem per spec) | `_theme.scss:1703` |
| 6 | Portal grid exceeds max 3 per row | 4+ portals in single row | Max 3 per row, extras in new rows | Grid layout issue |
| 7 | Mobile: odd portal not wider at end | Last portal same width (147.5px) | Last portal should stretch to full row width | Grid mobile layout |
| 8 | Desktop: 2 portals not stretching to 3-width | 2 portals = 493px total | Should stretch to ~657px (3-portal width) | Grid desktop layout |

---

## Test Execution Checklist

### Portal Card
- [ ] PC-001: Icon Display
- [ ] PC-002: Hover Effect
- [ ] PC-003: Title Styling
- [ ] PC-004: Arrow Icon

### Portal Card Variants
- [ ] PCV-001: Variant 1 Styling
- [ ] PCV-002: Variant 2 Styling
- [ ] PCV-003: Variant 3 Styling

### Portals Carousel
- [ ] PCR-001: Carousel Navigation
- [ ] PCR-002: Arrow Disabled States
- [ ] PCR-003: Arrow Hover Colors

### Portals Grid
- [ ] PG-001: Grid Layout
- [ ] PG-002: Uniform Dimensions

### Typography & Spacing
- [ ] TS-001: Title Typography

### CSS Variable Inheritance
- [ ] CV-001: Primary Color Variable
- [ ] CV-002: Fourth Color Variable
- [ ] CV-003: Tertiary Color Variable

### Font Variable Tests
- [ ] FV-001: Portal Title Font (v1/v3 on light)
- [ ] FV-002: Portal Title Font (v2)

### Known Bugs
- [ ] Bug 1: Portals carousel button background wrong
- [ ] Bug 2: Portals carousel button opacity wrong
- [ ] Bug 3: Portals carousel arrow color wrong
- [ ] Bug 4: No variant-specific carousel button styles
- [ ] Bug 5: Portal v2 card gap too small (15px vs 24px)
- [ ] Bug 6: Portal grid exceeds max 3 per row
- [ ] Bug 7: Mobile - odd portal not wider at end
- [ ] Bug 8: Desktop - 2 portals not stretching to 3-width

---

## Appendix

### How to Change Portal Card Variant

**File:** `/Website/Pages/Templates/SecondLevel.cshtml`  
**Query String:** `?portalCard=X` (where X is 1-3)

```csharp
// Line 1383
variant = GeneralHelpers.QueryStringVariants(1, 3, "portalCard").ToString();
```

### How to Change Carousel Variant

**Query String:** `?portaliconsCarousel=X` (where X is 1-4)

```csharp
// Line 79
portaliconsCarouselVariant = GeneralHelpers.QueryStringVariants(1, 4, "portaliconsCarousel"),
```

### Related Files
- **Theme:** `/Website/Styles/_globals/_theme.scss` (portalCard mixin, lines 1640-1789)
- **Base Styles:** `/Website/Styles/Legacy/components/portals/_portal-card.scss`
- **Variant 1:** `/Website/Styles/Legacy/components/portals/_portal-card.v1.scss`
- **Variant 2:** `/Website/Styles/Legacy/components/portals/_portal-card.v2.scss`
- **Variant 3:** `/Website/Styles/Legacy/components/portals/_portal-card.v3.scss`

### Portal Styling Mixin Location

**File:** `/Website/Styles/_globals/_theme.scss`

```scss
@mixin portalCard($variant) {
  // Line 1640+
  // Hover effect: translate -0.5rem
  // Text centered
  // Variant-specific backgrounds
}
```

### Key Styling Details

| Element | Style |
|---------|-------|
| Hover effect | Icon translate -0.5rem up |
| Text alignment | Center |
| Transition | 0.3s ease |
| Icon height | 69px → 90px (v1/v2), 60px → 126px (v3) |
