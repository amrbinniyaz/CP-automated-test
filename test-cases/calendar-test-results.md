# School Calendar Test Results

> **Test Date:** 2026-03-31
> **Test URL:** https://test-1-mvcbasev3.tiarc-staging.co.uk/calendar?startDate=20260301&endDate=20260405
> **Tester:** Codex using Playwright CLI
> **Test Case:** `/CP test/test-cases/calendar-test-case.md`

---

## Summary

| Area | Outcome | Notes |
|------|---------|-------|
| Desktop layout (1440px) | Mostly pass | Hero, sidebar, grid, popup, month nav, toggle, print all work |
| Interactive filters/search | Mixed | Core actions work, but several state-reset behaviors do not match the case |
| Mobile/tablet responsive | Mostly pass | 375px and 768px both use the mobile filter pattern |
| Large desktop (2560px) | Partial pass | Sidebar and event text scale up, but not every text size scales |
| Color cascade | Fail | Runtime CSS variable changes do not update calendar colors |
| Font cascade | Pass | `--primary-font` updates live as expected |

---

## Highest-Signal Findings

### BUG-CAL-001: Calendar icon font files 404, leaving missing/broken icon glyphs
- **Severity:** High
- **Live evidence:** `/Fonts/icons/calendar/calendar-icons.ttf` and `.woff` return 404 on page load
- **Impact:** Filter icon, close icon, plus icon, and some list-row affordances render as missing glyphs or empty squares
- **Code reference:** `/Website/Styles/Calendar/components/_calendar-icons.scss:5-9`

### BUG-CAL-002: Calendar colors are compile-time SCSS values, not runtime CSS variables
- **Severity:** High
- **Live evidence:** Changing `--primary-color`, `--secondary-color`, and `--tertiary-color` at runtime did not change:
  - grid day-number color
  - print button text/background pairing
  - search submit button background
  - search input text color
  - today border highlight
- **Root cause:** Calendar color tokens are assigned from `theme.$...` SCSS variables instead of `var(--...)`
- **Code reference:** `/Website/Styles/Calendar/_calendarColorAndFonts.scss:9-16`

### BUG-CAL-003: Hardcoded white values still bypass theme changes
- **Severity:** Medium
- **Live evidence:** Popup and list-view white surfaces remain fixed
- **Code references:**
  - `/Website/Styles/Calendar/_calendarColorAndFonts.scss:243-246`
  - `/Website/Styles/Calendar/_calendarColorAndFonts.scss:301-305`
  - `/Website/Styles/Calendar/_calendarColorAndFonts.scss:522-542`
  - `/Website/Styles/Calendar/_calendarColorAndFonts.scss:615-617`
  - `/Website/Styles/Calendar/_calendarColorAndFonts.scss:729`

### BUG-CAL-004: Popup "Read more" opens in a new tab instead of the same tab
- **Severity:** Medium
- **Expected:** Same-tab navigation per test case `SC-CAL-006`
- **Actual:** Popup link target is `_blank`
- **Live evidence:** Event popup for `Test All Styles - Extended` and `Test event - with image Heading 2 event name goes here`

### BUG-CAL-005: Clearing a search pill does not restore the default grid state
- **Severity:** Medium
- **Expected:** Removing the search pill should clear search and return to the default grid state
- **Actual:** After searching `extended` from grid view, clicking the pill's delete icon returned to `gridView=listMonth`, kept the placeholder as `Enter Keyword`, and did not restore the original grid view
- **Live evidence:**  
  Start: `?startDate=20260301&endDate=20260405`  
  Search: `?startDate=20260301&endDate=20270301&searchExpression=extended&gridView=listCustom`  
  Clear: `?startDate=20260301&endDate=20260401&gridView=listMonth`

### BUG-CAL-006: Reset only clears the search term; category/source filters remain applied
- **Severity:** High
- **Expected:** Reset clears search, calendar source, category, date range, and view
- **Actual:** Reset removed the search tag but left `eventType=Athletics`, `categories=Test-Event`, and `gridView=listCustom` in place
- **Live evidence:**  
  Before reset: `?eventType=Athletics&categories=Test-Event&startDate=20260301&endDate=20270301&searchExpression=extended`  
  After reset: `?eventType=Athletics&categories=Test-Event&startDate=20260301&endDate=20270301&gridView=listCustom`

### BUG-CAL-007: Follow Calendar options do not match the test case
- **Severity:** Medium
- **Expected:** Google, Apple, Outlook, iCal, Copy Link
- **Actual:** Google, local app (`webcal://`), Yahoo, Copy calendar ics
- **Code reference:** `/Website/Pages/Templates/Events.cshtml:168-198`
- **Note:** This may indicate the test case is outdated rather than a regression in the live page

---

## Detailed Results

| Test ID | Result | Notes |
|---------|--------|-------|
| `SC-CAL-001` | Pass | Hero renders with dark navy background and white serif heading |
| `SC-CAL-002` | Pass | Desktop sidebar shows search, calendars, categories, follow, and reset |
| `SC-CAL-003` | Pass | 7-column grid renders correctly; previous/next-month days show `opacity: 0.5`; today's border uses tertiary color |
| `SC-CAL-004` | Pass | Grid event click opens popup; close button and outside-click dismissal both work |
| `SC-CAL-005` | Pass | Popup image/no-image behavior works |
| `SC-CAL-006` | Fail | `Read more` opens in a new tab |
| `SC-CAL-007` | Pass | `Get directions` opens Google Maps in a new tab and includes the event location |
| `SC-CAL-008` | Pass | Prev/next month updates title and URL without a hard page reload |
| `SC-CAL-009` | Pass | Grid/List toggle works and preserves list view across month navigation |
| `SC-CAL-010` | Partial | List layout renders correctly, but right-side plus/close icon glyphs are broken because the calendar icon font 404s |
| `SC-CAL-011` | Fail | Search switches to `listCustom` and expands to one year, but clearing the pill does not return to the default grid state |
| `SC-CAL-012` | Partial | Calendar source filtering works, but for 4 sources it behaves as an immediate checkbox list, not a dropdown with `Apply Filters` |
| `SC-CAL-013` | Partial | Category selection works, but it unexpectedly switches to `listCustom` and a one-year date range |
| `SC-CAL-014` | Fail | Reset does not clear category/source filters or restore the default view/range |
| `SC-CAL-015` | Pass | Print button calls `window.print()` |
| `SC-CAL-016` | Fail | Follow Calendar opens/closes correctly, but the option set does not match the test case |
| `SC-CAL-017` | Not tested | Need a data set with more than 6 calendar sources |
| `RESP-CAL-001` | Pass | At 375px the sidebar collapses, Filters/Print buttons appear, and the grid remains visible |
| `RESP-CAL-002` | Partial | Mobile filter panel opens and `Show Results` closes it, but the close icon glyph is missing because the icon font is broken |
| `RESP-CAL-003` | Pass | At 768px the page still uses the mobile filter layout; controls remain usable |
| `RESP-CAL-004` | Partial | At 2560px sidebar width, search height, and event text scale up, but the month title stays fixed at `28px` |
| `COL-CAL-001` | Fail | `--primary-color` / `--tertiary-color` changes do not cascade through calendar UI |
| `COL-CAL-002` | Fail | `--secondary-color` change does not update the search submit button |
| `FV-CAL-001` | Pass | `--primary-font` updates the search input and view-toggle fonts live |

---

## Responsive Measurements

| Viewport | Observation |
|----------|-------------|
| `375px` | Filters button visible, Print button visible, sidebar hidden, grid still visible but heavily cramped |
| `768px` | Mobile filter pattern still active; sidebar width collapses to `0px` and Filters button remains visible |
| `1440px` | Sidebar visible at about `228.9px` wide |
| `2560px` | Sidebar grows to about `500px`; search height grows from `50px` to `70px`; event title text grows from about `16.9px` to `18px` |

---

## Theme Cascade Evidence

### Runtime color change test

```js
document.documentElement.style.setProperty('--primary-color', '#ff0000');
document.documentElement.style.setProperty('--secondary-color', '#0000ff');
document.documentElement.style.setProperty('--tertiary-color', '#00ff00');
```

| Element | Before | After | Result |
|---------|--------|-------|--------|
| Grid day number | `rgb(28, 43, 60)` | `rgb(28, 43, 60)` | No cascade |
| Print button text | `rgb(28, 43, 60)` | `rgb(28, 43, 60)` | No cascade |
| Print button background | `rgb(228, 231, 233)` | `rgb(228, 231, 233)` | No cascade |
| Search submit background | `rgb(127, 201, 199)` | `rgb(127, 201, 199)` | No cascade |
| Search input text | `rgb(28, 43, 60)` | `rgb(28, 43, 60)` | No cascade |
| Today border | `rgb(197, 95, 60)` | `rgb(197, 95, 60)` | No cascade |

### Runtime font change test

```js
document.documentElement.style.setProperty('--primary-font', 'serif');
```

| Element | Before | After | Result |
|---------|--------|-------|--------|
| Search input font | `Gelion, sans-serif` | `serif` | Cascades correctly |
| Grid/List toggle font | `Gelion, sans-serif` | `serif` | Cascades correctly |

---

## Code Evidence

### Color system is SCSS-driven
- `/Website/Styles/Calendar/_calendarColorAndFonts.scss:9-16`
- `/Website/Styles/Calendar/_calendarColorAndFonts.scss:22-24`
- `/Website/Styles/Calendar/_calendarColorAndFonts.scss:42-47`
- `/Website/Styles/Calendar/_calendarColorAndFonts.scss:74-80`
- `/Website/Styles/Calendar/_calendarColorAndFonts.scss:146-169`
- `/Website/Styles/Calendar/_calendarColorAndFonts.scss:301-305`
- `/Website/Styles/Calendar/_calendarColorAndFonts.scss:447-469`
- `/Website/Styles/Calendar/_calendarColorAndFonts.scss:509-579`

### Follow Calendar options are hardcoded in the template
- `/Website/Pages/Templates/Events.cshtml:168-198`

### Reset button exists in the template, but the live behavior does not fully clear state
- `/Website/Pages/Templates/Events.cshtml:201-204`

### Calendar icon font is defined in SCSS but the runtime asset URLs 404
- `/Website/Styles/Calendar/components/_calendar-icons.scss:5-9`

---

## Senior Tester Follow-up

### Additional High-Value Findings

### BUG-CAL-008: Browser history does not restore calendar state consistently
- **Severity:** High
- **Flow tested:** month change -> list view -> search -> source filter -> browser back/forward/refresh
- **Actual:**
  - First `Back` did not remove the source filter state at all
  - Second `Back` removed `eventType` from the URL, but the UI still showed `Athletics` selected
  - Third `Back` changed the URL to `gridView=listMonth` with a one-month range, but the rendered page still showed `listCustom` with the one-year search state
  - `Refresh` kept the `listCustom` search rendering but silently reset the source selection back to `All Calendars`
- **Impact:** URL, rendered view, and selected filters can disagree, which makes the feature unreliable for users and hard to debug

### BUG-CAL-009: Invalid URL parameters can leave the calendar shell blank without graceful recovery
- **Severity:** High
- **Actual:**
  - `gridView=foo` leaves the calendar mounted with no toolbar title and no active view
  - `startDate=notadate` does the same
- **Expected:** Invalid params should fall back to a safe default month and default view

### BUG-CAL-010: No-results messaging is missing when filters/search produce an empty calendar
- **Severity:** Medium
- **Actual:**
  - `eventType=Athletics` produced `0` events with no visible no-results message
  - `searchExpression=zzzzzznotfound` produced `0` events with no visible no-results message
- **Expected:** The user should see the configured no-results message when the result set is empty

### BUG-CAL-011: Popup fails keyboard focus management and Escape close behavior
- **Severity:** High
- **Actual:**
  - Opening the popup leaves focus on `body`
  - `Tab` moves through background calendar events instead of staying inside the popup
  - `Escape` does not close the popup
  - Closing the popup returns focus to `body`, not the triggering event
- **Expected:** Focus should move into the dialog, remain trapped there, `Escape` should close it, and focus should return to the trigger

### BUG-CAL-012: Popup close button has no accessible name
- **Severity:** Medium
- **Actual:** `.cGridPopup__close` renders with no visible text, `aria-label`, or `title`
- **Expected:** Close control should have an accessible name such as `Close event popup`

---

## Senior Test Results

| Test ID | Result | Notes |
|---------|--------|-------|
| `STATE-CAL-001` | Fail | Search + source + month navigation preserved a complex filtered state, but the resulting URL and UI behavior are brittle |
| `STATE-CAL-002` | Fail | Browser back/forward does not reliably restore state; URL and UI drift apart |
| `STATE-CAL-003` | Fail | Refresh preserves some search state but silently resets source filter selection |
| `URL-CAL-001` | Pass | No params self-heals to `?startDate=20260301&endDate=20260405` |
| `URL-CAL-002` | Fail | `gridView=foo` leaves a blank calendar shell with no toolbar title/view |
| `URL-CAL-003` | Fail | `startDate=notadate` leaves a blank calendar shell with no toolbar title/view |
| `URL-CAL-004` | Pass | Reversed range self-heals to a valid April 2026 month window |
| `URL-CAL-005` | Pass | `startDate` without `endDate` self-heals to the default March 2026 month |
| `URL-CAL-006` | Partial | Very long `searchExpression` does not crash the page, but it shows an empty calendar without visible guidance |
| `CLEAR-CAL-001` | Fail | Clearing a search pill returns to `listMonth`, not the default grid |
| `CLEAR-CAL-002` | Pass | Clearing source by selecting `All Calendars` restores the default source state |
| `CLEAR-CAL-003` | Partial | Clearing category by selecting `All Categories` works, but it returns to `listMonth` rather than the original grid state |
| `CLEAR-CAL-004` | Fail | `Reset` clears tags but still lands on `listMonth` instead of the default grid state |
| `A11Y-CAL-001` | Fail | Popup has no focus trap and no Escape-to-close behavior |
| `A11Y-CAL-002` | Fail | Popup close button has no accessible name |
| `A11Y-CAL-003` | Pass | Core sidebar controls have usable names via `aria-label`, `title`, or visible text |
| `DATA-CAL-001` | Pass | Sampled events correctly handle no image, no location, all-day, timed, and image+location combinations |
| `DATA-CAL-002` | Fail | Sampled popup `Read more` links all open in a new tab |
| `EMPTY-CAL-001` | Fail | Zero-result source filter shows a blank calendar with no no-results messaging |
| `EMPTY-CAL-002` | Fail | Zero-result search URL shows a blank calendar with no no-results messaging |
| `RESP-CAL-005` | Pass | Mobile portrait and mobile landscape both keep Filters and Print visible without horizontal body overflow |
| `RESIL-CAL-001` | Pass | Five rapid next clicks and five rapid previous clicks kept month/title/URL in sync |

---

## Open Questions

1. The test case expects `Select Calendars` to use a dropdown plus `Apply Filters`, but the live page uses an always-visible checkbox list for 4 sources and filters immediately. This looks like either an outdated spec or a behavior regression that needs product confirmation.
2. The test case expects Follow Calendar options for Apple/Outlook/iCal, but the template only renders Google, local app (`webcal://`), Yahoo, and Copy Link.
3. `Read more` opening in a new tab is clearly observable live, but I did not trace that link generation back to a local source file in this pass.
