# Media Wall Test Cases

## Overview

| Property | Value |
|----------|-------|
| **Widget** | Media Wall |
| **Phase** | Phase 2 |
| **Card Variants** | 1 (story-card--v1) |
| **CMS Tag** | N/A (standalone page template) |
| **Test Page URL** | https://test-1-mvcbasev3.tiarc-staging.co.uk/media/ |

---

## Phase 2 Rules (Design Requirements)

| Rule | Status |
|------|--------|
| MVP ready — same format as current media wall | TBC |
| Stories grid should fill the page, cards responding at all sizes to column widths | Not Started |
| On mobile, filter opened should NOT fill screen height unless content requires it | ❌ FAIL — see BUG-MW-001 |

---

## Design Specifications

### Grid Layout — Column Breakpoints

| Breakpoint | Columns | Card Width % | Notes |
|------------|---------|--------------|-------|
| > 1590px | 6 | 16.666% | — |
| ≤ 1590px | 5 | 20% | — |
| ≤ 1300px | 4 | 25% | — |
| ≤ 1023px | 3 | 33.33% | — |
| ≤ 767px | 2 | 50% | — |
| ≤ 500px | 1 | 100% | max-width: 350px on card; inner wrapper capped at 340px |

### Grid Behavior Rules
- [ ] Cards fill the full page width at all breakpoints
- [ ] Card widths respond correctly when viewport changes
- [ ] Masonry layout: card heights determined by their own content (no equal-height rows)
- [ ] Inner grid container at ≤ 500px: `max-width: 340px; margin: 0 auto` — grid is centred, does NOT fill full page width

### Filter Behavior Rules
- [ ] Desktop (≥ 1024px): filter bar is sticky at top (`position: sticky; top: 0`)
- [ ] Mobile/Tablet (< 1024px): filter opens as an overlay panel
- [ ] Mobile filter panel height should be `auto` / content-driven, NOT full-screen unless content overflows
- [ ] "Close" button dismisses the filter panel
- [ ] "Show results" button appears at bottom of filter panel on mobile

### Filter Panel Contents (observed on staging)
- Search input
- Category filter buttons: YouTube, News
- Reset button (hidden by default)
- Count displayed on toggle button: e.g., "filter (26)"

---

## Code Implementation

### SCSS Files

| File | Purpose |
|------|---------|
| `/Website/Styles/Media/_mediaCustomElements.scss` | Card column widths per breakpoint |
| `/Website/Styles/Media/components/_mediaGrid.scss` | Grid container, skeleton card styles |
| `/Website/Styles/Media/components/_mediaTopFilters.scss` | Filter panel, mobile filter toggle, show-results button |
| `/Website/Styles/Media/components/_mediaSearch.scss` | Search input styles |
| `/Website/Styles/Media/components/_mediaScrollToTopButton.scss` | Scroll-to-top button |
| `/Website/Styles/Media/components/_mediaDatePicker.scss` | Date picker styles |
| `/Website/Styles/Media/_mtColorsAndFonts.scss` | Media wall colour/font variables |
| `/Website/Styles/Media/Media.scss` | Entry point / imports |
| `/Website/Styles/Legacy/components/stories/_story-card.scss` | Story card base styles |

### Key CSS Classes

| Class | Purpose |
|-------|---------|
| `.mtGridContainer` | Outer grid wrapper |
| `.mtGridContainer__inner` | Inner grid (floated cards inside) |
| `.mtStoryItem` | Each card column item (`float: left`) |
| `.story-card` | The card component itself |
| `.mtFiltersContainer` | Filter overlay panel |
| `.mtFiltersContainer.isOpened` | Opened state on mobile |
| `.mtMobileFiltersToggle` | Mobile filter toggle button |
| `.filters-holder` | Inner scroll container for filters |
| `.filter-wrapper` | Centred wrapper inside filter panel |
| `.show-results` | "Show results" button (mobile only) |

### CSS Variables Used

| Variable | Purpose | Location |
|----------|---------|----------|
| `--margin-d` | Filter wrapper padding | `_mediaTopFilters.scss:18` |
| `$mt-filters-background` | Filter panel background (SCSS var) | `_mediaTopFilters.scss:9` |
| `$mt-mobileFiltersToggle-color` | Toggle button text colour (SCSS var) | `_mediaTopFilters.scss:340` |
| `$mt-mobileFiltersToggle-background` | Toggle button background (SCSS var) | `_mediaTopFilters.scss:341` |
| `$mt-topFilters-background` | Filter button background (SCSS var) | `_mediaTopFilters.scss:111` |

### Hardcoded / SCSS Variables (Potential Bugs)

| Location | Value | Should Be |
|----------|-------|-----------|
| `_mediaGrid.scss:5` | `padding: 0 0 80px 0` (hardcoded) | CSS variable? |
| `_mediaGrid.scss:6` | `margin-top: 20px !important` (hardcoded) | CSS variable? |
| `_mediaTopFilters.scss:111` | `$mt-topFilters-background` (SCSS var) | CSS var if themeable |
| `_mediaTopFilters.scss:341` | `$mt-mobileFiltersToggle-background` (SCSS var) | CSS var if themeable |

---

## Known Bugs

### BUG-MW-001: Mobile filter panel fills full screen height
- **Severity:** Medium
- **File:** `/Website/Styles/Media/components/_mediaTopFilters.scss:44-52`
- **Rule:** Filter panel should NOT fill screen height unless content requires it
- **Expected:** Panel height auto-sized to content (search + filter buttons ≈ 215px)
- **Actual:** `position: fixed; top: 0; bottom: 0; height: 100%` — always fills 100vh
- **Measured:** Container = 812px tall, actual content = ~215px tall (391px bottom — large empty grey area below)
- **Breakpoints affected:** All breakpoints ≤ 1023px (mobile + tablet)
- **Status:** ❌ CONFIRMED — tested at 375px and 768px

---

## Test Cases

### Grid — Page Fill Tests

#### RESP-MW-001: Grid fills full page width at 1440px (5 columns)
- [ ] 5 cards per row
- [ ] Each card ≈ 285px (20% of 1425px body width)
- [ ] No horizontal white space at edges
- **Measured:** 5 × 285px = 1425px ✅

#### RESP-MW-002: Grid fills full page width at 768px (3 columns)
- [ ] 3 cards per row
- [ ] Each card ≈ 251px
- [ ] No horizontal white space at edges
- **Measured:** 3 × 251px = 753px ✅

#### RESP-MW-003: Grid at 375px mobile (1 column)
- [ ] 1 card per row
- [ ] Card width = 340px (max)
- [ ] Inner wrapper capped at 340px — centred with ~17px either side
- **Note:** Grid does NOT fill full width at ≤ 500px due to `max-width: 340px` on `.mtGridContainer__inner`. Decide if this is intended or a bug.

#### RESP-MW-004: Column transitions at breakpoints
- [ ] At 501px → 2 columns (50% each)
- [ ] At 768px → 3 columns (33.33%)
- [ ] At 1024px → 3 columns (33.33%)
- [ ] At 1301px → 4 columns (25%)
- [ ] At 1591px → 6 columns (16.666%)

### Filter — Behaviour Tests

#### FILTER-MW-001: Mobile filter height (BUG-MW-001 retest)
- [ ] Open filter panel at 375px
- [ ] Measure `.mtFiltersContainer` height vs content height
- [ ] Panel should NOT fill full viewport height if content is smaller
- **Current result:** ❌ FAIL — panel = 812px, content = 215px

#### FILTER-MW-002: Mobile filter height with many categories
- [ ] Test with page that has many filter categories (overflow scenario)
- [ ] When categories fill/exceed viewport height, panel CAN fill screen
- [ ] Scroll should be available inside panel in that case

#### FILTER-MW-003: Filter toggle button
- [ ] Toggle button visible at < 1024px
- [ ] Toggle button hidden at ≥ 1024px
- [ ] Shows correct item count (e.g., "filter (26)")
- [ ] Opens filter panel on click
- [ ] Arrow icon changes direction when open/closed

#### FILTER-MW-004: Close button
- [ ] "Close" button visible when panel is open
- [ ] Clicking "Close" dismisses panel
- [ ] Grid is accessible again after close

#### FILTER-MW-005: Show results button
- [ ] "Show results" button appears at bottom on mobile
- [ ] Fixed position at bottom of panel
- [ ] Clicking applies filters and closes panel
- [ ] Hidden at ≥ 1024px

#### FILTER-MW-006: Desktop filter bar
- [ ] At ≥ 1024px, filter bar is sticky (not overlay)
- [ ] Sticks to top of page on scroll
- [ ] No mobile toggle button visible

### Styling Tests

#### SC-MW-001: Story card basic styling
- [ ] Card has correct border radius
- [ ] Thumbnail image fills card top
- [ ] Category label (e.g., "School News", "YouTube") displays correctly
- [ ] Title text truncation works
- [ ] Date/time ago displays correctly
- [ ] "+" share/expand button present

#### SC-MW-002: Cards without thumbnails
- [ ] Cards with no image show placeholder/background correctly
- [ ] No broken image icons

#### SC-MW-003: YouTube cards vs News cards
- [ ] YouTube cards show YouTube play icon overlay
- [ ] News/School News cards styled correctly
- [ ] Filter correctly hides/shows each category

### Responsive Tests

#### RESP-MW-005: Mobile (375px) — general
- [ ] Correct 1-column layout
- [ ] Filter toggle button visible
- [ ] Search input full-width
- [ ] "Show More" button present and functional
- [ ] No horizontal overflow

#### RESP-MW-006: Tablet (768px)
- [ ] 3-column layout
- [ ] Filter still in mobile/overlay mode (< 1024px)
- [ ] Cards correctly sized

#### RESP-MW-007: Desktop (1440px)
- [ ] 5-column layout
- [ ] Filter bar sticky (desktop mode)
- [ ] No mobile toggle button

#### RESP-MW-008: Large Desktop (2560px)
- [ ] Confirm column count (should be 6 at > 1590px)
- [ ] Cards scale correctly
- [ ] No runaway max widths

---

## Color Variable Tests

#### COL-MW-001: Primary colour cascade
- [ ] Change `--primary-color`
- [ ] Check if card category text / link colours update
- [ ] Document any hardcoded elements that don't respond

#### COL-MW-002: Filter button colours
- [ ] Check if filter button background/border use CSS variables or SCSS vars
- [ ] `$mt-topFilters-background` vs `var(--...)` — see `_mediaTopFilters.scss:111`

---

## Font Variable Tests

#### FV-MW-001: Story card title font
- [ ] Identify which font variable is mapped to card title
- [ ] Change font variable and verify cascade

#### FV-MW-002: Story card category label font
- [ ] Identify font variable for category label
- [ ] Change and verify

#### FV-MW-003: Story card date/time font
- [ ] Identify font variable for "1 year ago" text
- [ ] Change and verify

---

## Spacing Variable Tests

#### SV-MW-001: Card internal padding
- [ ] Identify if card content area uses `--padding-e-inner` or hardcoded values
- [ ] Change `--padding-e-inner` and verify card content padding updates

#### SV-MW-002: Filter wrapper padding
- [ ] `.filter-wrapper` uses `var(--margin-d)` for padding (`_mediaTopFilters.scss:18`)
- [ ] Change `--margin-d` and verify filter wrapper padding updates

---

## Test Execution Checklist

| Test ID | Description | Status | Tester | Date | Notes |
|---------|-------------|--------|--------|------|-------|
| RESP-MW-001 | Grid fills width at 1440px | ✅ PASS | Auto | 2026-02-18 | 5×285px = 1425px |
| RESP-MW-002 | Grid fills width at 768px | ✅ PASS | Auto | 2026-02-18 | 3×251px = 753px |
| RESP-MW-003 | Grid at 375px mobile | ⚠️ NOTE | Auto | 2026-02-18 | Capped at 340px, centred |
| RESP-MW-004 | Column transitions at breakpoints | Not Started | | | |
| FILTER-MW-001 | Mobile filter height | ❌ FAIL | Auto | 2026-02-18 | BUG-MW-001 confirmed |
| FILTER-MW-002 | Filter height overflow scenario | Not Started | | | |
| FILTER-MW-003 | Filter toggle button | Not Started | | | |
| FILTER-MW-004 | Close button | Not Started | | | |
| FILTER-MW-005 | Show results button | Not Started | | | |
| FILTER-MW-006 | Desktop filter bar sticky | Not Started | | | |
| SC-MW-001 | Story card basic styling | Not Started | | | |
| SC-MW-002 | Cards without thumbnails | Not Started | | | |
| SC-MW-003 | YouTube vs News card styling | Not Started | | | |
| RESP-MW-005 | Mobile 375px general | Not Started | | | |
| RESP-MW-006 | Tablet 768px | Not Started | | | |
| RESP-MW-007 | Desktop 1440px | Not Started | | | |
| RESP-MW-008 | Large Desktop 2560px | Not Started | | | |
| COL-MW-001 | Primary colour cascade | Not Started | | | |
| COL-MW-002 | Filter button colours | Not Started | | | |
| FV-MW-001 | Card title font cascade | Not Started | | | |
| FV-MW-002 | Category label font cascade | Not Started | | | |
| FV-MW-003 | Date/time font cascade | Not Started | | | |
| SV-MW-001 | Card internal padding variable | Not Started | | | |
| SV-MW-002 | Filter wrapper padding variable | Not Started | | | |

---

## Test URLs

| Environment | URL | Notes |
|-------------|-----|-------|
| Staging | https://test-1-mvcbasev3.tiarc-staging.co.uk/media/ | Main test page |

---

---

## Accessibility Audit (axe-core WCAG 2AA — tested 2026-02-18 @ 1440px)

**Summary:** 4 violations found, 35 checks passed, 2 incomplete

### BUG-MW-A001: Menu button has no discernible text
- **Severity:** Critical (WCAG 2.1 — 4.1.2 Name, Role, Value)
- **axe rule:** `button-name`
- **Element:** `<button :aria-label="navOpen ? 'Close navigation' : 'Open navigation'">`
- **Issue:** Alpine.js dynamic `:aria-label` binding is not rendered as a static attribute — the button has no text, no title, and no resolved aria-label at audit time
- **Impact:** Screen readers cannot identify this button
- **Fix:** Add a static `aria-label="Open navigation"` fallback or ensure Alpine renders the attribute before axe scans

### BUG-MW-A002: Colour contrast failures on navigation
- **Severity:** Serious (WCAG 2.1 — 1.4.3 Contrast Minimum)
- **axe rule:** `color-contrast`
- **Failures:**
  - Nav link labels on red background: contrast **2.21:1** (requires 4.5:1) — `#4a4a49` on `#ff0000`
  - Red text on light grey background: contrast **3.47:1** (requires 4.5:1) — `#ff0000` on `#efefef`
- **Impact:** Users with low vision cannot read navigation links

### BUG-MW-A003: No `<main>` landmark
- **Severity:** Moderate (WCAG 2.1 — 1.3.6 Identify Purpose / best practice)
- **axe rule:** `landmark-one-main`
- **Issue:** Page has no `<main>` element — screen reader users cannot jump to main content
- **Impact:** Keyboard/SR users must tab through entire header to reach content

### BUG-MW-A004: Page content outside landmark regions
- **Severity:** Moderate (WCAG 2.1 — best practice)
- **axe rule:** `region`
- **Elements affected:** Hero area, search/filter bar, all story cards
- **Issue:** None of the main page content is wrapped in a semantic landmark (`<main>`, `<section aria-label>`, etc.)

### BUG-MW-A005: Filter toggle button missing ARIA state
- **Severity:** Serious (WCAG 2.1 — 4.1.2 Name, Role, Value)
- **Element:** `.mtMobileFiltersToggle` (the "filter (26)" button)
- **Missing attributes:**
  - No `aria-expanded` — screen readers don't know if panel is open or closed
  - No `aria-controls` — no link between toggle and the panel it controls
  - No `aria-label` — the visible text "filter (26)" is ambiguous
- **Confirmed:** `ariaExpanded: null`, `ariaControls: null`, `ariaLabel: null`

### BUG-MW-A006: No focus trap when filter panel is open (mobile)
- **Severity:** Serious (WCAG 2.1 — 2.1.2 No Keyboard Trap / 2.4.3 Focus Order)
- **Issue:** When the filter overlay opens on mobile, **79 out of 83 focusable elements** remain reachable outside the panel
  - No `aria-modal="true"` on the container
  - No `role="dialog"`
  - No `aria-hidden` applied to background content
  - No `inert` attribute on background
- **Impact:** Keyboard users can Tab behind the visual overlay to hidden/obscured content; screen reader users get no modal context

### BUG-MW-A007: Filter container missing dialog semantics
- **Severity:** Moderate (WCAG 2.1 — 4.1.2)
- **Element:** `.mtFiltersContainer`
- **Missing:** `role="dialog"`, `aria-label` or `aria-labelledby`, `aria-modal="true"`
- **Impact:** Screen readers do not announce the filter panel as a dialog when it opens

### BUG-MW-A008: Card thumbnail images — empty alt (acceptable, noting for record)
- **Severity:** Info
- **Finding:** All card `<img>` thumbnails have `alt=""` (empty, intentional for decorative images)
- **Status:** ✅ Acceptable — card title text provides the accessible name via surrounding content
- **Note:** Verify cards always have a visible title so the empty alt is genuinely decorative

---

## Accessibility Test Cases

#### A11Y-MW-001: Keyboard navigation — grid
- [ ] Tab from page top reaches skip link first
- [ ] Skip link jumps focus to main content area
- [ ] Each card is reachable by Tab
- [ ] Cards are activatable with Enter/Space
- [ ] Tab order follows visual reading order (left-to-right, top-to-bottom)
- [ ] No focus traps outside the filter panel

#### A11Y-MW-002: Keyboard navigation — filter (desktop)
- [ ] Filter bar reachable by Tab
- [ ] Search input focusable and usable with keyboard
- [ ] Category filter buttons reachable and activatable
- [ ] Focus visible at all times (no invisible focus ring)

#### A11Y-MW-003: Keyboard navigation — filter panel (mobile)
- [ ] Toggle button reachable by Tab
- [ ] Enter/Space opens filter panel
- [ ] Focus moves INTO filter panel on open (not left at toggle button behind overlay)
- [ ] Tab stays within filter panel while open (focus trap)
- [ ] Escape key closes filter panel
- [ ] Focus returns to toggle button after close
- **Current result:** ❌ FAIL — no focus trap (BUG-MW-A006), no Escape handler confirmed

#### A11Y-MW-004: Screen reader announcements
- [ ] Filter toggle announces open/closed state (`aria-expanded`)
- [ ] Filter panel announces as a dialog (`role="dialog"`)
- [ ] Category filter buttons announce their label (e.g., "YouTube filter")
- [ ] "Show results" button announces result count
- [ ] Card "Open story" button announces which story (ideally includes title)

#### A11Y-MW-005: Colour contrast — navigation
- [ ] Nav link labels meet 4.5:1 contrast on red background — ❌ FAIL (2.21:1) BUG-MW-A002
- [ ] Red text on grey background meets 4.5:1 — ❌ FAIL (3.47:1) BUG-MW-A002

#### A11Y-MW-006: Heading structure
- [ ] H1 present: "Media" ✅
- [ ] No heading levels skipped
- [ ] Cards use appropriate heading level for their title (H2 or H3)
- **Current:** H1 → H2 (error message) — card titles are `<p>` not headings. Decide if card titles should be H3.

#### A11Y-MW-007: Zoom / text resize
- [ ] Page usable at 200% browser zoom
- [ ] No content clipped or overlapping at 200%
- [ ] Filter panel usable at 200%

---

## Edge Case Tests

### Search Edge Cases

#### EDGE-MW-001: Empty search
- [ ] Clicking search icon with empty input — no action / shows all results
- [ ] No error state or broken layout

#### EDGE-MW-002: Search with no results
- [ ] Searching for a term with no matches shows "no results" message
- [ ] Message is visible and readable (`.mtMediaMessage`)
- [ ] Grid area handles gracefully (no blank space / broken layout)
- [ ] Filter count updates (e.g., "filter (0)")

#### EDGE-MW-003: Search with special characters
- [ ] Input: `<script>alert(1)</script>` — no XSS execution
- [ ] Input: `"'--` — no SQL-like injection handling issues
- [ ] Input: `%20%20` — URL-encoded chars handled correctly
- [ ] `.mtSearch__noSpecialChars` error message displays for invalid input chars

#### EDGE-MW-004: Very long search query
- [ ] Typing 200+ characters does not break input layout
- [ ] Search input does not overflow its container

### Grid Edge Cases

#### EDGE-MW-005: Single card / very few items
- [ ] If only 1 item: card displays as a single card (not stretched to fill row)
- [ ] Layout doesn't break with 1, 2, or 3 items

#### EDGE-MW-006: Cards without thumbnails
- [ ] Cards with no image show a placeholder or background correctly
- [ ] No broken image icon shown
- [ ] Card text area fills the space appropriately
- **Observed:** "News - No Thumb" card visible on staging — verify appearance

#### EDGE-MW-007: Card with very long title
- [ ] Long title truncates correctly (ellipsis or line clamp)
- [ ] Does not overflow or break card layout
- [ ] Does not push other cards out of alignment

#### EDGE-MW-008: Card with very long category label
- [ ] Category label truncates or wraps without breaking layout

### Pagination / Load More Edge Cases

#### EDGE-MW-009: "Show More" button
- [ ] "Show More Stories" button loads additional cards
- [ ] New cards render correctly in the grid
- [ ] Loading state shown while fetching
- [ ] Button disappears when all items are loaded
- [ ] If API returns error, user sees a friendly message (not broken UI)

#### EDGE-MW-010: All items already visible
- [ ] "Show More" button hidden when total items ≤ initial load count
- [ ] No "load more" loop / duplicate cards

#### EDGE-MW-011: Scroll position after "Show More"
- [ ] Page does not jump to top after loading more cards
- [ ] User remains at their scroll position

### Filter Edge Cases

#### EDGE-MW-012: Filter + search combined
- [ ] Selecting "YouTube" filter AND typing a search term combines both filters
- [ ] Results update correctly for AND logic
- [ ] Clearing search retains the category filter
- [ ] Clearing filter retains the search term

#### EDGE-MW-013: Filter with 0 results
- [ ] Selecting a filter that returns 0 items shows "no results" message
- [ ] Filter count shows "(0)"
- [ ] "Show More" button hidden when 0 results

#### EDGE-MW-014: Rapid filter switching
- [ ] Clicking multiple filters rapidly doesn't cause duplicate renders or race conditions
- [ ] Results are always consistent with the last active filter

#### EDGE-MW-015: Filter toggle at viewport edge breakpoint (1023px/1024px)
- [ ] At 1023px: mobile overlay filter shown
- [ ] At 1024px: sticky desktop filter shown
- [ ] No broken state at exact breakpoint
- [ ] Resizing across the breakpoint live updates the filter mode

### Network / Loading Edge Cases

#### EDGE-MW-016: Slow network / loading state
- [ ] Skeleton cards shown while grid is loading
- [ ] Skeleton cards match approximate card dimensions
- [ ] Grid transitions smoothly from skeleton to real cards (`.mtGridContainer.complete`)

#### EDGE-MW-017: API error / no data
- [ ] If the media feed fails, a user-facing message is shown
- [ ] No uncaught JS errors breaking the rest of the page
- [ ] Grid container does not show as blank with no message

---

## Accessibility Bugs Summary

| Bug ID | Severity | WCAG | Description | Status |
|--------|----------|------|-------------|--------|
| BUG-MW-A001 | Critical | 4.1.2 | Menu button no accessible name (Alpine.js) | ❌ Confirmed |
| BUG-MW-A002 | Serious | 1.4.3 | Nav contrast failures (2.21:1 and 3.47:1) | ❌ Confirmed |
| BUG-MW-A003 | Moderate | best practice | No `<main>` landmark | ❌ Confirmed |
| BUG-MW-A004 | Moderate | best practice | Content outside landmark regions | ❌ Confirmed |
| BUG-MW-A005 | Serious | 4.1.2 | Filter toggle missing `aria-expanded`/`aria-controls` | ❌ Confirmed |
| BUG-MW-A006 | Serious | 2.1.2 / 2.4.3 | No focus trap in filter overlay (mobile) | ❌ Confirmed |
| BUG-MW-A007 | Moderate | 4.1.2 | Filter container missing `role="dialog"` / `aria-modal` | ❌ Confirmed |
| BUG-MW-A008 | Info | — | Card images have empty alt (acceptable for decorative) | ✅ Acceptable |

---

## Updated Test Execution Checklist

| Test ID | Description | Status | Date | Notes |
|---------|-------------|--------|------|-------|
| RESP-MW-001 | Grid fills width at 1440px | ✅ PASS | 2026-02-18 | 5×285px |
| RESP-MW-002 | Grid fills width at 768px | ✅ PASS | 2026-02-18 | 3×251px |
| RESP-MW-003 | Grid at 375px mobile | ⚠️ NOTE | 2026-02-18 | Capped at 340px centred |
| RESP-MW-004 | Column transitions | Not Started | | |
| FILTER-MW-001 | Mobile filter height | ❌ FAIL | 2026-02-18 | BUG-MW-001 |
| FILTER-MW-002 | Filter height overflow | Not Started | | |
| FILTER-MW-003 | Filter toggle button | Not Started | | |
| FILTER-MW-004 | Close button | Not Started | | |
| FILTER-MW-005 | Show results button | Not Started | | |
| FILTER-MW-006 | Desktop filter sticky | Not Started | | |
| SC-MW-001 | Card basic styling | Not Started | | |
| SC-MW-002 | Cards without thumbnails | Not Started | | |
| SC-MW-003 | YouTube vs News styling | Not Started | | |
| RESP-MW-005 | Mobile 375px general | Not Started | | |
| RESP-MW-006 | Tablet 768px | Not Started | | |
| RESP-MW-007 | Desktop 1440px | Not Started | | |
| RESP-MW-008 | Large Desktop 2560px | Not Started | | |
| COL-MW-001 | Primary colour cascade | Not Started | | |
| COL-MW-002 | Filter button colours | Not Started | | |
| FV-MW-001 | Card title font cascade | Not Started | | |
| FV-MW-002 | Category label font cascade | Not Started | | |
| FV-MW-003 | Date/time font cascade | Not Started | | |
| SV-MW-001 | Card internal padding variable | Not Started | | |
| SV-MW-002 | Filter wrapper padding variable | Not Started | | |
| A11Y-MW-001 | Keyboard nav — grid | ❌ FAIL | 2026-02-18 | No skip link to main, no `<main>` |
| A11Y-MW-002 | Keyboard nav — filter desktop | Not Started | | |
| A11Y-MW-003 | Keyboard nav — filter mobile | ❌ FAIL | 2026-02-18 | No focus trap (BUG-MW-A006) |
| A11Y-MW-004 | Screen reader announcements | ❌ FAIL | 2026-02-18 | Missing aria-expanded, dialog role |
| A11Y-MW-005 | Colour contrast nav | ❌ FAIL | 2026-02-18 | BUG-MW-A002 |
| A11Y-MW-006 | Heading structure | ⚠️ NOTE | 2026-02-18 | Card titles are `<p>`, not headings |
| A11Y-MW-007 | Zoom 200% | Not Started | | |
| EDGE-MW-001 | Empty search | Not Started | | |
| EDGE-MW-002 | Search no results | Not Started | | |
| EDGE-MW-003 | Special characters in search | Not Started | | |
| EDGE-MW-004 | Very long search query | Not Started | | |
| EDGE-MW-005 | 1–3 items in grid | Not Started | | |
| EDGE-MW-006 | Cards without thumbnails | Not Started | | |
| EDGE-MW-007 | Very long card title | Not Started | | |
| EDGE-MW-008 | Very long category label | Not Started | | |
| EDGE-MW-009 | Show More button | Not Started | | |
| EDGE-MW-010 | All items visible (no more) | Not Started | | |
| EDGE-MW-011 | Scroll position after load more | Not Started | | |
| EDGE-MW-012 | Filter + search combined | Not Started | | |
| EDGE-MW-013 | Filter with 0 results | Not Started | | |
| EDGE-MW-014 | Rapid filter switching | Not Started | | |
| EDGE-MW-015 | Filter at breakpoint boundary | Not Started | | |
| EDGE-MW-016 | Slow network / skeleton | Not Started | | |
| EDGE-MW-017 | API error / no data | Not Started | | |

---

## Notes

- Phase 2 widget — not covered in Phase 1 Master Template CSV
- Font/colour variable mappings TBC from design (not yet in CSV checklists)
- `$mt-*` SCSS variables in `_mtColorsAndFonts.scss` control Media Wall theming — SCSS compile-time only, not CSS runtime variables
- JS error on page: `$TiarcShare is not defined` — appears on every story card interaction (non-blocking)
- **BUG-MW-001** — filter height on mobile/tablet (layout bug)
- **BUG-MW-A006** — no focus trap in filter panel (most critical a11y fix needed)
