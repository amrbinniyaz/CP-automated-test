# Events Widgets Test Cases

## Overview

| Property | Value |
|----------|-------|
| **Widgets Covered** | Event Card, Events Carousel, Events Grid, Events List |
| **Card Variants** | 3 (v1, v2, v3) |
| **Carousel Variants** | 2 |
| **List Variants** | 2 |
| **CMS Tags** | `{events}`, `{events-grid}`, `{events-list}`, `{events-featured}` |
| **Test Page URL** | https://test-1-mvcbasev3.tiarc-staging.co.uk/amr-test/events |

---

## Design Specifications (from Master Template CSV)

### Event Card (3 variants)
| Element | Styling Options |
|---------|-----------------|
| Character styles | Heading 5, body copy |
| Card | colour, rounded corners (individually), opacity |
| Image | rounded corners (individually) |
| Date | custom font choice, rounded corners (individually), internal and external padding, colour, and opacity |

### Events Carousel (2 variants)
**Behavior Rules:**
- [ ] Carousel isn't looping
- [ ] The appropriate arrow is "greyed out" and no longer clickable when you get to either end of the carousel
- [ ] The carousel arrows don't appear when all elements are fully visible
- [ ] The event with the most content determines the height of every event in the carousel

### Events Grid
**Behavior Rules:**
- [ ] On screens bigger than 1440px, display 4 events in one row
- [ ] Depending on the number of elements in the grid, it shifts the layout accordingly (design includes layout for 1, 2, 3, 4, 5+ elements)
- [ ] An event in a specific row with the most text determines the height of that row. Rows don't have to have an equal height.

### Events List (2 variants)
| Element | Styling Options |
|---------|-----------------|
| Character styles | Heading 2, Heading 5, body copy (date is exception - fonts chosen separately) |
| Card | colour, rounded corners (individually), opacity |
| Date | custom font choice, rounded corners (individually), internal padding, colour, and opacity |

**Behavior Rules:**
- [ ] The image's height should be: 375px screen: 185px height, 2560px screen: 400px height

### Events Featured / Full-width (2 variants)
| Element | Styling Options |
|---------|-----------------|
| **Variant 1** | |
| Character styles | Heading 2, body copy |
| Countdown | divider line's colour and opacity |
| Image | rounded corners (individually), optional blur effect |
| Gradient | colour and opacity |
| Button (arrow) | replaceable SVG |
| Pagination | colour and opacity |
| Date | custom font choice, rounded corners (individually), internal padding, colour, and opacity |
| **Variant 2** | |
| Character styles | Heading 2, body copy |
| Countdown | divider line's colour and opacity |
| Background | colour and opacity, rounded corners (individually) |
| Button (arrow) | replaceable SVG |
| Pagination | colour and opacity |
| Date | custom font choice, rounded corners (individually), internal padding, colour, and opacity |

**Behavior Rules:**
- [ ] Truncate body copy text after 2 lines
- [ ] Approx Internal margin:
  - 375px screen: 90px margin
  - 1440px screen: 150px margin
  - 2560px screen: 275px margin

**CMS Tag:** `{events-featured}`

**Test URLs:**
| Variant | URL |
|---------|-----|
| Variant 1 (centered) | `https://test-1-mvcbasev3.tiarc-staging.co.uk/amr-test/events?eventsFeatured=1` |
| Variant 2 (left-aligned) | `https://test-1-mvcbasev3.tiarc-staging.co.uk/amr-test/events?eventsFeatured=2` |

**Variant Differences:**
- **V1:** Content centered, full-width layout
- **V2:** Content left-aligned, grid columns 4-10, navigation stacked on left

---

## Color Variables (from CSV)

### Events Carousel (Variant 1) - Card
| Variable | Component | Sub-component |
|----------|-----------|---------------|
| branding 4 | events carousel (variant 1) - card | event card - date background |
| branding 1 | events carousel (variant 1) - card | event card - date number |
| branding 1 | events carousel (variant 1) - card | event card - date text |
| branding 1 | events carousel (variant 1) - card | event card (variant 1) - read more icon |
| branding 4 | events carousel (variant 1) - card | event card (variant 1) - text background |
| branding 1 | events carousel (variant 1) - card | event card (variant 1) - time |
| branding 1 | events carousel (variant 1) - card | event card (variant 1) - title |
| branding white | events carousel (variant 1) - card | event card (variant 2) - read more icon |
| branding black | events carousel (variant 1) - card | event card (variant 2) - text gradient |
| branding white | events carousel (variant 1) - card | event card (variant 2) - time |
| branding white | events carousel (variant 1) - card | event card (variant 2) - title |
| branding 1 | events carousel (variant 1) - card | event card (variant 3) - read more icon |
| branding 4 | events carousel (variant 1) - card | event card (variant 3) - text background |
| branding 1 | events carousel (variant 1) - card | event card (variant 3) - time |
| branding white | events carousel (variant 1) - card | event card (variant 3) - title |

### Events Carousel - Container
| Variable | Component | Sub-component |
|----------|-----------|---------------|
| branding white | events carousel (variant 1) - title | - |
| branding 1 | events carousel (variant 1) - background | - |
| branding 2 | events carousel (variant 1) - full calendar button | secondary button - background |
| branding 1 | events carousel (variant 1) - next/previous button | next/previous style a - arrow |
| branding 2 | events carousel (variant 1) - next/previous button | next/previous style a - background |
| branding 3 | events carousel (variant 1) - next/previous button | next/previous style a (hover) - background |

---

## Font Variables (from CSV)

### Events Carousel
| Variable | CMS Widget | Component | Sub-component |
|----------|------------|-----------|---------------|
| heading 2a | events carousel | events carousel (variant 1) - heading | - |
| button a | events carousel | events carousel (variant 1) - button text | - |
| body copy a | events carousel | events carousel (variant 1) - card | event card (variant 1) - time |
| heading 5a | events carousel | events carousel (variant 1) - card | event card (variant 1) - title |
| body copy b | events carousel | events carousel (variant 1) - card | event card (variant 2) - time |
| heading 5b | events carousel | events carousel (variant 1) - card | event card (variant 2) - title |
| body copy a | events carousel | events carousel (variant 1) - card | event card (variant 3) - time |
| heading 5b | events carousel | events carousel (variant 1) - card | event card (variant 3) - title |
| ? | events carousel | events carousel (variant 1) - card | event card - date number |
| ? | events carousel | events carousel (variant 1) - card | event card - date text |

### Events Grid
| Variable | CMS Widget | Component | Sub-component |
|----------|------------|-----------|---------------|
| body copy a | events grid | events grid - card | event card (variant 1) - time |
| heading 5a | events grid | events grid - card | event card (variant 1) - title |
| body copy b | events grid | events grid - card | event card (variant 2) - time |
| heading 5b | events grid | events grid - card | event card (variant 2) - title |
| body copy a | events grid | events grid - card | event card (variant 3) - time |
| heading 5b | events grid | events grid - card | event card (variant 3) - title |

### Events List
| Variable | CMS Widget | Component | Sub-component |
|----------|------------|-----------|---------------|
| ? | events list | events list (variant 1) - date number | - |
| ? | events list | events list (variant 1) - date text | - |
| body copy a | events list | events list (variant 1) - time | - |
| heading 5a | events list | events list (variant 1) - title | - |
| heading 5b | events list | events list (variant 2) - featured title | - |

---

## Spacing Variables (from CSV)

### Events Carousel
| Widget | Variant | Component | Side | Variable |
|--------|---------|-----------|------|----------|
| events carousel | variant 1 | card (variant 1) - date box | top/bottom/left/right | Padding E |
| events carousel | variant 1 | card (variant 1) - text box | top/bottom/left/right | Padding E |
| events carousel | variant 1 | card (variant 1) - title | bottom | Padding G |
| events carousel | variant 1 | title | bottom | Padding D |

---

## Code Implementation

### SCSS Files
| File | Purpose |
|------|---------|
| `/Website/Styles/Legacy/components/events/_event-card.scss` | Event card base styles |
| `/Website/Styles/Legacy/components/events/_event-list-item.scss` | Event list item styles |
| `/Website/Styles/Legacy/components/events/_event-fader-item.scss` | Event fader/featured styles |
| `/Website/Styles/_globals/_theme.scss` | Theme mixins (eventsCard, eventsList, eventFader) |

### CSS Variables Used
| Variable | Purpose | Location |
|----------|---------|----------|
| `--general-events-radius` | Card border radius | _event-card.scss:13 |
| `--general-events-list-radius` | List item border radius | _event-list-item.scss:12 |
| `--padding-g-inner` | Title bottom margin | _event-card.scss:53 |
| `--padding-h-inner` | Time margin | _event-card.scss:154 |
| `--padding-a-inner`, `--padding-b-inner` | Content padding | _event-card.scss:195 |
| `--primary-color` | Text colors | _theme.scss:946,1027,1135,1147,1165 |
| `--fourth-color` | Background colors | _theme.scss:999,1025,1032 |

---

## Known Bugs (Hardcoded Values)

### BUG-EV-001: Hardcoded gradient colors in event card image
- **Severity:** Medium
- **Location:** `_theme.scss:970`
- **Expected:** CSS variable for gradient colors
- **Actual:** `rgba(0, 0, 0, 0)` and `rgba(0, 0, 0, 1)` hardcoded
- **Impact:** Gradient won't change when theme colors change

### BUG-EV-002: Hardcoded white color in event card v2
- **Severity:** Medium
- **Location:** `_theme.scss:1006`
- **Expected:** `var(--branding-white)` or appropriate CSS variable
- **Actual:** `color: #fff` hardcoded
- **Impact:** Color won't cascade with theme changes

### BUG-EV-003: Hardcoded white color in event card v3
- **Severity:** Medium
- **Location:** `_theme.scss:1017`
- **Expected:** `var(--branding-white)` or appropriate CSS variable
- **Actual:** `color: #fff` hardcoded
- **Impact:** Color won't cascade with theme changes

### BUG-EV-004: SCSS variable used instead of CSS variable in event fader
- **Severity:** High
- **Location:** `_theme.scss:1080`
- **Expected:** `var(--primary-color)`
- **Actual:** `$primaryColor` SCSS variable
- **Impact:** Color change at runtime won't affect this element
- **Widget:** `{events-featured}`

### BUG-EV-005: Hardcoded calendar-date background in events list
- **Severity:** High
- **Location:** `_theme.scss:1136`
- **Expected:** `var(--fourth-color)` or theme variable
- **Actual:** `background: #7fc9c7` hardcoded
- **Impact:** Calendar date background won't change with theme

### BUG-EV-006: Hardcoded white background in events list v1
- **Severity:** Medium
- **Location:** `_theme.scss:1172`
- **Expected:** CSS variable for background
- **Actual:** `background: #fff` hardcoded
- **Impact:** List item background won't cascade with theme

### BUG-EV-007: Hardcoded box-shadow color in events list v1
- **Severity:** Low
- **Location:** `_theme.scss:1173`
- **Expected:** CSS variable or theme-based shadow
- **Actual:** `box-shadow: 0px 3px 20px rgba(0, 0, 0, 0.1)` hardcoded
- **Impact:** Shadow color won't change with theme

### BUG-EV-008: SCSS variable used for border in events list v2
- **Severity:** Medium
- **Location:** `_theme.scss:1179`
- **Expected:** `var(--primary-color)`
- **Actual:** `$primaryColor` SCSS variable
- **Impact:** Border color won't cascade at runtime

### BUG-EV-009: Hardcoded white colors in events list v2 featured item
- **Severity:** Medium
- **Location:** `_theme.scss:1183, 1187, 1190`
- **Expected:** CSS variables
- **Actual:** `#fff` hardcoded for title, time, and arrow colors
- **Impact:** Colors won't cascade with theme changes

### BUG-EV-010: SCSS variable in events list v2 gradient
- **Severity:** High
- **Location:** `_theme.scss:1207`
- **Expected:** `var(--primary-color)` in gradient
- **Actual:** `$primaryColor` SCSS variable
- **Impact:** Gradient won't update with theme changes

### BUG-EV-011: Same-date events display redundant date range
- **Severity:** Medium
- **Location:** Calendar date display logic (JS/Template)
- **Expected:** Single-day events should show "26 Aug" (single date)
- **Actual:** Shows "26 - 26 Aug" (redundant range format)
- **Impact:** Confusing UX, looks like a bug to users
- **Visual Evidence:** Screenshot shows "26 - 26 Aug" for event "normal event - no thumb"
- **Status:** CONFIRMED on https://mvcbasev3.tiarc-staging.co.uk/amr-test/events

---

## Confirmed Bug Summary (Visual Testing 2026-01-21)

| Bug ID | Status | Verified Value |
|--------|--------|----------------|
| BUG-EV-005 | **CONFIRMED** | `rgb(127, 201, 199)` = `#7fc9c7` hardcoded |
| BUG-EV-006 | **CONFIRMED** | `rgb(255, 255, 255)` = `#fff` hardcoded |
| BUG-EV-007 | **CONFIRMED** | `rgba(0, 0, 0, 0.1)` hardcoded shadow |
| BUG-EV-011 | **CONFIRMED** | "26 - 26 Aug" same-date display |

---

## Test Cases

### Styling Tests

#### SC-EV-001: Event Card Variant 1 - Basic Styling
- [ ] Card has correct border radius (`--general-events-radius`)
- [ ] Date box positioned top-left
- [ ] Text background uses `--fourth-color`
- [ ] Title uses correct font variable (heading 5a)
- [ ] Time uses correct font variable (body copy a)

#### SC-EV-002: Event Card Variant 2 - Overlay Style
- [ ] Image fills entire card
- [ ] Gradient overlay displays correctly
- [ ] White text readable over image
- [ ] Date displays inline format

#### SC-EV-003: Event Card Variant 3 - Mixed Style
- [ ] Date box positioned top-right
- [ ] Title area has gradient overlay
- [ ] Time area uses `--fourth-color` background

### Behavior Tests

#### ECAR-001: Carousel Not Looping
- [x] At first item, cannot navigate to last item ✅ PASS
- [ ] At last item, cannot navigate to first item
- [x] No infinite scroll behavior ✅ PASS

#### ECAR-002: Arrow Disabled States
- [x] Left arrow greyed out at start ✅ PASS (`carousel-btn--disabled` class)
- [x] Left arrow not clickable at start ✅ PASS (`disabled` attribute)
- [ ] Right arrow greyed out at end
- [ ] Right arrow not clickable at end
- [x] Arrow opacity reduced when disabled ✅ PASS

#### ECAR-003: Arrow Visibility
- [x] Arrows hidden when all items visible ✅ PASS (`carousel-btn--hidden` class)
- [x] Arrows appear when items exceed viewport ✅ PASS
- [ ] Test at multiple breakpoints

#### ECAR-004: Equal Height Cards
- [ ] Card with most content sets height for row
- [ ] All cards in carousel same height
- [ ] Shorter content cards expand to match

#### EGRID-001: Grid Layout - 4 Columns at 1440px+
- [ ] 4 events per row at 1440px
- [ ] 4 events per row at 2560px
- [ ] Correct column count at each breakpoint

#### EGRID-002: Grid Layout Adaptation
- [ ] 1 event: single item layout
- [ ] 2 events: 2-column layout
- [ ] 3 events: 3-column layout
- [ ] 4 events: 4-column layout
- [ ] 5+ events: 4-column with wrap

#### EGRID-003: Row Height Independence
- [ ] Row 1 height independent of Row 2
- [ ] Tallest item in row determines row height
- [ ] Rows can have different heights

#### ELIST-001: Events List Image Heights
- [ ] 375px screen: image height ~185px
- [ ] 2560px screen: image height ~400px
- [ ] Height scales between breakpoints

---

## Color Variable Tests

#### COL-EV-001: Primary Color Cascade
- [ ] Change `--primary-color` value
- [ ] Event card description color updates
- [ ] Event list title color updates
- [ ] Event list time icon color updates
- [ ] Calendar date text color updates

#### COL-EV-002: Fourth Color Cascade
- [ ] Change `--fourth-color` value
- [ ] Event card v1 text background updates
- [ ] Event card v3 time background updates
- [ ] Single card background updates

#### COL-EV-003: Branding White Cascade
- [ ] Items using branding white should update
- [ ] Check v2 card title, time, read more icon
- [ ] Check v3 card title

### BUG VERIFICATION: Hardcoded Values
#### COL-EV-BUG-001: Verify BUG-EV-005
- [ ] Change theme colors
- [ ] Calendar date background in events list stays `#7fc9c7`
- [ ] Document as confirmed bug

---

## Font Variable Tests

> **Test Date:** 2026-01-21
> **Test URL:** https://test-1-mvcbasev3.tiarc-staging.co.uk/amr-test/events
> **Note:** Font variables use `--primary-font` (body copy) and `--secondary-font` (headings) rather than heading-5a/body-copy-a naming.

#### FV-EV-001: Heading 5a Cascade
- [x] Change heading 5a font properties ✅ PASS
- [ ] Event card v1 title updates (Events Carousel not loaded - API issue)
- [ ] Events grid card v1 title updates (Events Grid not loaded - API issue)
- [x] Events list title updates ✅ PASS

**Result:** `.event-list-item__title` (H5) cascades via `--secondary-font`
- Initial: `"Cormorant Garamond", serif`
- Changed to: `Arial, sans-serif`
- Font updated correctly

#### FV-EV-002: Body Copy a Cascade
- [x] Change body copy a font properties ✅ PASS
- [ ] Event card v1 time updates (Events Carousel not loaded - API issue)
- [ ] Events grid card v1 time updates (Events Grid not loaded - API issue)
- [x] Events list time updates ✅ PASS

**Result:** `.event-list-item__time` (P) cascades via `--primary-font`
- Initial: `Gelion, sans-serif`
- Changed to: `Georgia, serif`
- Font updated correctly

#### FV-EV-003: Heading 2a Cascade
- [x] Change heading 2a font properties ✅ PASS
- [x] Events carousel heading updates ✅ PASS (tested on module-widget__title)

**Result:** `.module-widget__title` (H2) cascades via `--secondary-font`
- Initial: `"Cormorant Garamond", serif`
- Changed to: `Arial, sans-serif`
- Font updated correctly

---

## Spacing Variable Tests

> **Test Date:** 2026-01-21
> **Test URL:** https://test-1-mvcbasev3.tiarc-staging.co.uk/amr-test/events

#### SV-EV-001: Padding E Cascade
- [x] Change `--padding-e-inner` value ✅ Tested
- [ ] Event card date box padding updates (all sides) ❌ FAIL - Not using variable
- [ ] Event card text box padding updates (all sides) (Events Carousel not loaded - API issue)

**Result:** Calendar date (`.calendar-date`) does NOT use `--padding-e-inner`
- Initial `--padding-e-inner`: `2rem`
- Changed to: `4rem`
- Calendar date padding remained: `0px 15px` (hardcoded)
- **Status:** ❌ FAIL - Variable not cascading to calendar date

#### SV-EV-002: Padding G Cascade
- [x] Change `--padding-g-inner` value ✅ PASS
- [x] Event card title bottom margin updates ✅ PASS (tested on event list title)

**Result:** `.event-list-item__title` margin-bottom cascades via `--padding-g-inner`
- Initial `--padding-g-inner`: `1rem` → margin-bottom: `10px`
- Changed to: `3rem` → margin-bottom: `30px`
- **Status:** ✅ PASS - Variable cascades correctly

#### SV-EV-003: Padding D Cascade
- [x] Change `--padding-d-inner` value ✅ Tested
- [ ] Events carousel title bottom padding updates ❌ FAIL - Not using variable

**Result:** `.module-widget__title` does NOT use `--padding-d-inner` for spacing
- Initial `--padding-d-inner`: `clamp(2rem, 0.4694835681vw + 1.823943662rem, 2.5rem)`
- Changed to: `5rem`
- Padding/margin remained: `0px`
- **Status:** ❌ FAIL - Variable not cascading to module widget title

---

## Theme Variable Cascade Tests

#### TV-EV-001: Full Theme Change Test
1. Change `--primary-color` to red (#ff0000)
2. Change `--fourth-color` to blue (#0000ff)
3. Verify all event widgets update appropriately
4. Document any elements that don't change (hardcoded bugs)

---

## Responsive Tests

### RESP-EV-001: Mobile (375px)
- [ ] Event cards stack appropriately
- [ ] Touch interactions work
- [ ] Text readable without horizontal scroll
- [ ] Carousel swipe works

### RESP-EV-002: Tablet (768px)
- [ ] Layout transitions correctly
- [ ] Grid shows appropriate columns
- [ ] Carousel shows appropriate items

### RESP-EV-003: Desktop (1440px)
- [ ] 4-column grid layout
- [ ] Full carousel functionality
- [ ] All hover states work

### RESP-EV-004: Large Desktop (2560px)
- [ ] Layout scales appropriately
- [ ] Images don't pixelate
- [ ] Spacing uses clmp() correctly

---

## Test Execution Checklist

| Test ID | Description | Status | Tester | Date | Notes |
|---------|-------------|--------|--------|------|-------|
| SC-EV-001 | Card v1 basic styling | Not Started | | | |
| SC-EV-002 | Card v2 overlay style | Not Started | | | |
| SC-EV-003 | Card v3 mixed style | Not Started | | | |
| ECAR-001 | Carousel not looping | Not Started | | | |
| ECAR-002 | Arrow disabled states | Not Started | | | |
| ECAR-003 | Arrow visibility | Not Started | | | |
| ECAR-004 | Equal height cards | Not Started | | | |
| EGRID-001 | Grid 4-column layout | Not Started | | | |
| EGRID-002 | Grid layout adaptation | Not Started | | | |
| EGRID-003 | Row height independence | Not Started | | | |
| ELIST-001 | List image heights | Not Started | | | |
| COL-EV-001 | Primary color cascade | Not Started | | | |
| COL-EV-002 | Fourth color cascade | Not Started | | | |
| COL-EV-003 | Branding white cascade | Not Started | | | |
| FV-EV-001 | Heading 5a cascade | ✅ PASS | Cascade | 2026-01-21 | Font cascades via --secondary-font |
| FV-EV-002 | Body copy a cascade | ✅ PASS | Cascade | 2026-01-21 | Font cascades via --primary-font |
| FV-EV-003 | Heading 2a cascade | ✅ PASS | Cascade | 2026-01-21 | Font cascades via --secondary-font |
| SV-EV-001 | Padding E cascade | ❌ FAIL | Cascade | 2026-01-21 | Calendar date not using variable |
| SV-EV-002 | Padding G cascade | ✅ PASS | Cascade | 2026-01-21 | Title margin cascades correctly |
| SV-EV-003 | Padding D cascade | ❌ FAIL | Cascade | 2026-01-21 | Module title not using variable |
| TV-EV-001 | Full theme change | Not Started | | | |
| RESP-EV-001 | Mobile 375px | Not Started | | | |
| RESP-EV-002 | Tablet 768px | Not Started | | | |
| RESP-EV-003 | Desktop 1440px | Not Started | | | |
| RESP-EV-004 | Large Desktop 2560px | Not Started | | | |

---

## Test URLs

| Environment | URL | Notes |
|-------------|-----|-------|
| Staging | https://test-1-mvcbasev3.tiarc-staging.co.uk/amr-test/events | Main test page |
| Local | localhost:xxxx | For CSS variable testing |

---

## Notes

- **10 hardcoded value bugs identified** in SCSS before visual testing
- Date font variables marked as "?" in CSV - need design clarification
- Events Featured widget not included in this test case (separate test case needed)
