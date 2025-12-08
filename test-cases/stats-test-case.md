# Stats Component Test Case

**Component:** Stats (Card, Carousel, Grid)  

**Last Updated:** 2025-11-27  
**Test URL:** https://test-1-mvcbasev3.tiarc-staging.co.uk/amr-test/content-page-stats

---

## Table of Contents
1. [Overview](#overview)
2. [Test Environment](#test-environment)
3. [Stats Card Tests](#stats-card-tests)
4. [Stats Carousel Tests](#stats-carousel-tests)
5. [Stats Grid Tests](#stats-grid-tests)
6. [Typography & Spacing Tests](#typography--spacing-tests)
7. [CSS Variable Inheritance Tests](#css-variable-inheritance-tests)
8. [Test Execution Checklist](#test-execution-checklist)

---

## Overview

The Stats component displays statistical information in three layouts:
- **Stats Card**: Individual stat display
- **Stats Carousel**: Horizontal scrollable stats with navigation arrows
- **Stats Grid**: Responsive grid layout

### Variants
| Component | Variants | Description |
|-----------|----------|-------------|
| Stats Carousel | 4 | Arrow positions (right, left, center, center-edge) |
| Stats Grid | 1 | Standard grid |

---

## Test Environment

| Requirement | Details |
|-------------|---------|
| Browsers | Chrome, Firefox, Safari, Edge |
| Breakpoints | 375px (mobile), 768px (tablet), 1024px, 1440px, 2560px (desktop) |
| Devices | Desktop, Tablet, Mobile |

---

## Stats Card Tests

### SC-001: Field Display Order
**Priority:** High  
**Precondition:** Stats added via CMS with all fields populated

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | View a stat card with all fields | Fields display in order: Icon → Stat Figure → Title → Body Copy → Arrow |
| 2 | Verify visual hierarchy | Each element is clearly distinguishable |

---

### SC-002: Optional Fields
**Priority:** High  
**Precondition:** Create stats with various field combinations

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Create stat with only Title | Card displays without errors |
| 2 | Create stat with only Figure | Card displays without errors |
| 3 | Create stat with only Description | Card displays without errors |
| 4 | Create stat with Icon + Title | Card displays without errors |
| 5 | Create stat with all fields | All fields display correctly |

**Note:** None of the fields are mandatory

---

### SC-003: Link Arrow Visibility
**Priority:** High  
**Precondition:** Stats with and without links

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | View stat WITHOUT a link | Arrow icon is NOT visible |
| 2 | View stat WITH a link | Arrow icon IS visible |
| 3 | Add link to existing stat | Arrow appears |
| 4 | Remove link from stat | Arrow disappears |

---

### SC-004: Link Hover State
**Priority:** Medium  
**Precondition:** Stat card with a link added

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Hover over linked stat card | Background color changes (tertiary color at 40% opacity) |
| 2 | Hover over arrow icon | Arrow translates 0.5rem to the right |
| 3 | Move mouse away | Card returns to default state |

---

### SC-005: Icon Container Width
**Priority:** Medium  
**Precondition:** Stat with icon and text content

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | View stat with icon | Icon container max-width matches text max-width |
| 2 | Compare icon alignment | Icon is centered above text content |

---

### SC-006: Stat Figure Text Shrinking
**Priority:** Medium  
**Precondition:** Stats with varying text lengths

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | View stat with short figure (e.g., "100%") | Normal font size |
| 2 | View stat with long figure (e.g., "INTSCHOOLS") | Font size shrinks to fit |
| 3 | Compare both stats | Long text is smaller but still readable |

**Technical Note:** Uses CSS calc with `--titleLength` variable

---

## Stats Carousel Tests

### SCR-001: Carousel Arrow Variants
**Priority:** High  
**Precondition:** Access to change variant in `SecondLevel.cshtml` line 76

| Variant | Class | Arrow Position |
|---------|-------|----------------|
| 1 | `--right` | Stacked on right side |
| 2 | `--left` | Stacked on left side |
| 3 | `--center` | Split on opposite edges |
| 4 | `--center` + `close-to-edge` | Split, closer to carousel |

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Set variant to 1 | Arrows appear on right |
| 2 | Set variant to 2 | Arrows appear on left |
| 3 | Set variant to 3 | Arrows on opposite edges |
| 4 | Set variant to 4 | Arrows on edges, closer to content |

---

### SCR-002: Equal Height Cards
**Priority:** High  
**Precondition:** Carousel with stats of varying content lengths

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Add stats with different content amounts | All visible |
| 2 | Measure height of each card | All cards have EQUAL height |
| 3 | Verify tallest stat determines height | Shorter stats stretch to match |

---

### SCR-003: Non-Looping Behavior
**Priority:** High  
**Precondition:** Carousel with multiple stats

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Navigate to first stat | Previous button is disabled/greyed out |
| 2 | Click Previous button | Nothing happens (carousel doesn't loop) |
| 3 | Navigate to last stat | Next button is disabled/greyed out |
| 4 | Click Next button | Nothing happens (carousel doesn't loop) |

---

### SCR-004: Arrow Disabled States
**Priority:** High  
**Precondition:** Carousel with multiple stats

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Load carousel at start | Previous button greyed out, not clickable |
| 2 | Click Next to advance | Previous button becomes active |
| 3 | Navigate to end | Next button greyed out, not clickable |
| 4 | Verify visual state | Disabled arrows have 40% opacity |

---

### SCR-005: Arrow Visibility (All Items Visible)
**Priority:** Medium  
**Precondition:** Carousel with few items that all fit in viewport

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Add only 2-3 stats to carousel | View on wide screen |
| 2 | Check if all stats are visible | All stats visible without scrolling |
| 3 | Verify arrow visibility | Arrows are HIDDEN when all elements visible |

---

### SCR-006: Arrow Centering
**Priority:** Low  
**Precondition:** Carousel visible on page

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | View carousel on desktop | Arrows centered vertically to viewport |
| 2 | Resize browser | Arrows remain centered |

---

## Stats Grid Tests

### SG-001: Row Height Behavior
**Priority:** High  
**Precondition:** Grid with stats of varying content

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Add stats with different text lengths | Grid displays |
| 2 | Check row heights | Tallest stat in each ROW sets that row's height |
| 3 | Compare different rows | Rows can have DIFFERENT heights |

**Note:** Unlike carousel, grid rows don't need equal heights

---

### SG-002: Responsive Layout (Element Count)
**Priority:** High  
**Precondition:** Ability to add/remove stats from grid

| Element Count | Expected Layout |
|---------------|-----------------|
| 1 | Single stat, full width or centered |
| 2 | 2 columns |
| 3 | 3 columns |
| 4 | 4 columns (or 2x2 on smaller screens) |
| 5+ | Wraps to multiple rows |

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Add 1 stat | Layout adapts per design |
| 2 | Add 2 stats | 2-column layout |
| 3 | Add 3 stats | 3-column layout |
| 4 | Add 4 stats | 4-column layout |
| 5 | Add 5+ stats | Multi-row layout |

---

### SG-003: Large Screen Layout (>1440px)
**Priority:** Medium  
**Precondition:** Screen width > 1440px

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | View grid on screen > 1440px | 4 stats display per row |
| 2 | Add 8 stats | 2 rows of 4 stats each |
| 3 | Verify alignment | Stats aligned in clean grid |

---

## Typography & Spacing Tests

### TS-001: Title Typography
**Priority:** High  
**Design Spec:** Heading 4a

#### CSS Variable Dependencies
| Element | Variable | Default Value |
|---------|----------|---------------|
| Title Color | `--primary-color` | `#1c2b3c` |
| Title Font | `--primary-font` or `--secondary-font` | Per theme |
| Description Color | `--primary-color` | `#1c2b3c` |
| Description Font | `--primary-font` | Arial, sans-serif |

| Property | Expected Value |
|----------|----------------|
| Font Size | `clmp(1.9rem, 2.8rem)` = 19px → 28px |
| Line Height | 1.125 |
| Font Weight | 400 |

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Inspect stat title | Font size between 19-28px (responsive) |
| 2 | Check at 375px | ~19px |
| 3 | Check at 1440px | ~28px |

---

### TS-002: Description Typography
**Priority:** High  
**Design Spec:** Body Copy A

| Property | Expected Value |
|----------|----------------|
| Font Size | `clmp(1.6rem, 2rem)` = 16px → 20px |
| Line Height | 1.44 |
| Font Weight | 400 |

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Inspect stat description | Font size between 16-20px (responsive) |
| 2 | Check at 375px | ~16px |
| 3 | Check at 1440px | ~20px |

---

### TS-003: Internal Spacing
**Priority:** High  
**Design Spec:** See padding diagram

| Element | Spacing | Expected Value |
|---------|---------|----------------|
| Card padding (all sides) | Padding D | `clmp(20px, 25px)` |
| Icon → Title | Padding G | `clmp(15px, 20px)` |
| Title → Description | Padding G | `clmp(15px, 20px)` |

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Measure card internal padding | 20-25px on all sides |
| 2 | Measure icon to title gap | 15-20px |
| 3 | Measure title to description gap | 15-20px |

---

## CSS Variable Inheritance Tests

### CV-001: Primary Color Variable
**Priority:** High  
**Precondition:** Access to `_theme-cssvars.scss` or theme file

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Note current `--primary-color` value | Document current color (e.g., `#1c2b3c`) |
| 2 | Change `--primary-color` to a test value (e.g., `#ff0000`) | Save and rebuild |
| 3 | View stats title | Title color changes to new value |
| 4 | View stats description | Description color changes to new value |
| 5 | Revert `--primary-color` to original | Colors return to original |

---

### CV-002: Primary Font Variable
**Priority:** High  
**Precondition:** Access to `_theme-cssvars.scss` or theme file

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Note current `--primary-font` value | Document current font (e.g., `Arial, sans-serif`) |
| 2 | Change `--primary-font` to a test font (e.g., `Georgia, serif`) | Save and rebuild |
| 3 | View stats description | Description uses new font family |
| 4 | Revert `--primary-font` to original | Font returns to original |

---

### CV-003: Secondary Font Variable
**Priority:** High  
**Precondition:** Access to `_theme-cssvars.scss` or theme file

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Note current `--secondary-font` value | Document current font |
| 2 | Change `--secondary-font` to a test font | Save and rebuild |
| 3 | View stats title (if using secondary font) | Title uses new font family |
| 4 | Revert `--secondary-font` to original | Font returns to original |

---

### CV-004: Fourth Color Variable (Background)
**Priority:** Medium  
**Precondition:** Access to `_theme-cssvars.scss` or theme file

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Note current `--fourth-color` value | Document current color (e.g., `#e4e7e9`) |
| 2 | Change `--fourth-color` to a test value (e.g., `#ffcc00`) | Save and rebuild |
| 3 | View stat card background | Background color changes to new value |
| 4 | Revert `--fourth-color` to original | Background returns to original |

---

### CV-005: Tertiary Color Variable (Hover State)
**Priority:** Medium  
**Precondition:** Stat card with a link

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Note current `--tertiary-color` value | Document current color (e.g., `#c55f3c`) |
| 2 | Change `--tertiary-color` to a test value | Save and rebuild |
| 3 | Hover over linked stat card | Hover background uses new tertiary color |
| 4 | Revert `--tertiary-color` to original | Hover color returns to original |

---

### CV-006: Spacing Variables
**Priority:** Medium  
**Precondition:** Access to `_theme-cssvars.scss`

| Variable | Used For |
|----------|----------|
| `--padding-d-inner` | Card internal padding |
| `--padding-g` | Icon→Title and Title→Description gaps |
| `--padding-g-inner` | Content container gap |

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Note current `--padding-d-inner` value | Document current value |
| 2 | Change `--padding-d-inner` to `50px` | Save and rebuild |
| 3 | View stat card | Internal padding increases to 50px |
| 4 | Revert to original | Padding returns to original |

---

### CSS Variables Reference Table

| Variable | Location | Affects |
|----------|----------|---------|
| `--primary-color` | `_theme-cssvars.scss` | Title color, Description color |
| `--secondary-color` | `_theme-cssvars.scss` | Carousel buttons |
| `--tertiary-color` | `_theme-cssvars.scss` | Hover state background |
| `--fourth-color` | `_theme-cssvars.scss` | Card background |
| `--primary-font` | `_theme-cssvars.scss` | Description font family |
| `--secondary-font` | `_theme-cssvars.scss` | Title font family (if applied) |
| `--padding-d-inner` | `_theme-cssvars.scss` | Card padding |
| `--padding-g` | `_theme-cssvars.scss` | Element spacing |

---

## Test Execution Checklist

### Stats Card
- [ ] SC-001: Field Display Order
- [ ] SC-002: Optional Fields
- [ ] SC-003: Link Arrow Visibility
- [ ] SC-004: Link Hover State
- [ ] SC-005: Icon Container Width
- [ ] SC-006: Stat Figure Text Shrinking

### Stats Carousel
- [ ] SCR-001: Carousel Arrow Variants
- [ ] SCR-002: Equal Height Cards
- [ ] SCR-003: Non-Looping Behavior
- [ ] SCR-004: Arrow Disabled States
- [ ] SCR-005: Arrow Visibility (All Items Visible)
- [ ] SCR-006: Arrow Centering

### Stats Grid
- [ ] SG-001: Row Height Behavior
- [ ] SG-002: Responsive Layout (Element Count)
- [ ] SG-003: Large Screen Layout (>1440px)

### Typography & Spacing
- [ ] TS-001: Title Typography
- [ ] TS-002: Description Typography
- [ ] TS-003: Internal Spacing

### CSS Variable Inheritance
- [ ] CV-001: Primary Color Variable
- [ ] CV-002: Primary Font Variable
- [ ] CV-003: Secondary Font Variable
- [ ] CV-004: Fourth Color Variable (Background)
- [ ] CV-005: Tertiary Color Variable (Hover State)
- [ ] CV-006: Spacing Variables

---

## Appendix

### How to Change Carousel Variant

**File:** `/Website/Pages/Templates/SecondLevel.cshtml`  
**Line:** 76

```csharp
// Change first parameter (1-4) to switch variant
statsCarouselVariant = GeneralHelpers.QueryStringVariants(2, 4, "statsCarousel"),
```

Or use URL query string: `?statsCarousel=2`

### Related Files
- **Theme:** `/Website/Styles/_globals/_theme.scss` (statCard mixin)
- **Base Styles:** `/Website/Styles/Legacy/components/stats/_stat-card.scss`
- **Carousel Styles:** `/Website/Styles/Legacy/components/_cp-layout/_module-carousel.scss`
- **Grid Styles:** `/Website/Styles/Legacy/components/_cp-layout/_module-grid.scss`
