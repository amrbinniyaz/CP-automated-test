# School Calendar Test Cases

## Latest Results

- Results document: `/Users/IS/bundler/website-mvc-website-base-v3/CP test/test-cases/calendar-test-results.md`
- Last tested: `2026-03-31`

## Overview

| Property | Value |
|----------|-------|
| **Widget** | School Calendar (Grid + List) |
| **Variants** | 1 |
| **Technology** | FullCalendar JS, Alpine.js, Selectric dropdowns |
| **Test Page URL** | https://test-1-mvcbasev3.tiarc-staging.co.uk/calendar |
| **XD Design** | https://xd.adobe.com/view/365102e8-61c6-4c24-965e-9dd368593912-6302/ |
| **SCSS File** | `/Website/Styles/Calendar/_calendarColorAndFonts.scss` |

---

## XD Design Reference

The XD file has **5 screens**:

| Screen | Name | Description |
|--------|------|-------------|
| 1 | Calendar – Grid view – 1440px | Main grid layout, left sidebar with filters |
| 2 | Calendar – List view – 1440px | Same page, list mode active |
| 3 | Calendar – Grid view – 2560px | Large desktop breakpoint |
| 4 | Calendar – Event info popup | Modal shown on event click |
| 5 | Calendar Assets | Component state reference (sidebar variants) |

---

## Page Structure

### Hero / Header
- Full-width dark navy banner
- `<h1>` "SCHOOL CALENDAR" in large serif font
- No image; background is the primary brand colour

### Layout (Desktop)
```
[ Sidebar (left, fixed width) ] | [ Calendar (right, flex-fill) ]
```

### Layout (Mobile < 769px)
```
[ Filters button ] [ Print button ]
[ ← Month title → ]
[ Calendar grid (no sidebar) ]
```

The sidebar is hidden; it opens as a full-screen panel via the "Filters" button.

---

## URL Parameters

| Parameter | Values | Effect |
|-----------|--------|--------|
| `startDate` | `YYYYMMDD` | Start of displayed date range |
| `endDate` | `YYYYMMDD` | End of displayed date range |
| `gridView` | `dayGridMonth` / `listMonth` / `listCustom` | Current view mode |
| `searchExpression` | string | Active search term |

**Example URLs:**
```
# Grid view (default)
https://test-1-mvcbasev3.tiarc-staging.co.uk/calendar?startDate=20260301&endDate=20260405

# List view
https://test-1-mvcbasev3.tiarc-staging.co.uk/calendar?startDate=20260301&endDate=20260401&gridView=listMonth

# Search results (1-year range, listCustom)
https://test-1-mvcbasev3.tiarc-staging.co.uk/calendar?startDate=20260201&endDate=20270201&searchExpression=test&gridView=listCustom
```

---

## Sidebar Components

### Search
- Text input with placeholder "Search"
- Teal submit button (search icon)
- After submitting: placeholder changes to "Enter Keyword"
- Search term displayed as a **removable pill tag** below the input
- Clear (×) button appears inside the input field to reset

### Select Calendars
- Label: "Select Calendars"
- **Up to 6 calendars** → displayed as individual checkboxes
- **More than 6 calendars** → displayed as a dropdown (see XD Screen 5)
- Current live options: All Calendars, Athletics, Game, School Events
- "All Calendars" is selected (filled checkbox) by default
- Selection requires clicking "Apply Filters" inside the dropdown

### Select Categories
- Label: "Select Categories"
- Always displayed as a dropdown regardless of count
- Default: "All Categories"

### Follow Calendar
- Outlined button with calendar icon
- Opens subscription options (Google, Apple, Outlook, iCal, copy link)

### Reset Button
- Outlined button with reset icon
- Clears all active filters: search tags, calendar selection, category selection

---

## Calendar Toolbar

| Element | Position | Behaviour |
|---------|----------|-----------|
| Print | Left | Triggers browser print dialog |
| ← (prev) | Center-left | Navigates to previous month; updates URL |
| Month + Year title | Center | e.g. "March 2026" |
| → (next) | Center-right | Navigates to next month; updates URL |
| Grid button | Right | Switches to `dayGridMonth` view (active = dark bg) |
| List button | Right | Switches to `listMonth` view (active = dark bg) |

---

## Event Popup (on event click)

Shown as an overlay/modal when any event is clicked (in grid or list view).

| Field | Notes |
|-------|-------|
| Close (×) | Top-right; dismisses popup |
| Image | Circular thumbnail, optional (not all events have one) |
| Title | Event name |
| When | Date + time (label in accent/tertiary colour) |
| Where | Location text (label in accent/tertiary colour) |
| Description | Body text, truncated with "..." |
| Duration | e.g. "All day" or time range |
| Get Directions | Map pin icon + link; opens Google Maps |
| Read more | Right-aligned link with arrow icon; goes to full event detail page |

---

## Test Cases

---

### SC-CAL-001 – Hero banner renders correctly

**Test:** Grid view at 1440px

| Check | Expected |
|-------|----------|
| Hero background | Dark navy (primary colour) |
| `<h1>` text | "SCHOOL CALENDAR" |
| `<h1>` font | Large serif, white/neutral colour |
| Hero height | Proportional to design (not too tall, not cut off) |

---

### SC-CAL-002 – Sidebar renders at desktop

**Test:** 1440px, grid view

| Check | Expected |
|-------|----------|
| Sidebar visible | Yes |
| Search input | Visible, placeholder "Search" |
| "Select Calendars" heading | Visible |
| Calendar checkboxes | All Calendars (checked), Athletics, Game, School Events (unchecked) |
| "Select Categories" heading | Visible |
| Categories dropdown | Shows "All Categories" |
| "Follow calendar" button | Visible with icon |
| "Reset" button | Visible with icon |

---

### SC-CAL-003 – Calendar grid renders correctly

**Test:** Grid view, 1440px

| Check | Expected |
|-------|----------|
| Day header row | 7 columns: Sun Mon Tue Wed Thu Fri Sat |
| Day header background | Primary colour (dark navy) |
| Day header text | White/neutral, capitalised |
| Grid cells | Visible dates, events listed inside |
| Today's date | Highlighted with a border in tertiary/accent colour |
| Previous/next month dates | Greyed out at 50% opacity |
| Event text in cell | Truncated to max 2 lines |
| Event time | Bold, displayed before event title |

---

### SC-CAL-004 – Grid view event click opens popup

**Test:** Click any event in grid view

| Check | Expected |
|-------|----------|
| Popup appears | Yes, overlays the calendar |
| Popup has close (×) button | Yes, top-right corner |
| Title shown | Matches event title |
| "When" field shown | Date + time in accent colour |
| "Where" field shown | Location text in accent colour (if event has location) |
| "Description" shown | Body text present |
| "Get Directions" link | Visible with map-pin icon (if location set) |
| "Read more >" link | Visible, right-aligned |
| Close button works | Clicking × dismisses popup |
| Clicking outside popup | Dismisses popup |

---

### SC-CAL-005 – Event popup – image field

**Test:** Click an event that has an image

| Check | Expected |
|-------|----------|
| Circular thumbnail | Visible, top-left of popup |
| Title aligned next to image | Yes (flex layout) |
| Event without image | No image area shown; title takes full width |

---

### SC-CAL-006 – Event popup – "Read more" link

**Test:** Click "Read more >" in popup

| Check | Expected |
|-------|----------|
| Navigates to event detail page | Yes |
| Opens in same tab | Yes (default) |

---

### SC-CAL-007 – Event popup – "Get Directions" link

**Test:** Click "Get Directions" in popup

| Check | Expected |
|-------|----------|
| Opens Google Maps | Yes |
| Opens in new tab | Yes |
| URL contains event location | Yes |

---

### SC-CAL-008 – Month navigation (previous / next)

**Test:** Click ← and → buttons

| Check | Expected |
|-------|----------|
| Month title updates | e.g. "March 2026" → "April 2026" |
| URL updates | `startDate` and `endDate` params update accordingly |
| No full page reload | Update is AJAX (only calendar area refreshes) |
| Events load for new month | Calendar shows events for the new month |
| Prev button at earliest valid month | Not blocked (no hard limit observed) |

---

### SC-CAL-009 – Grid ↔ List view toggle

**Test:** Click "Grid" and "List" buttons

| Check | Expected |
|-------|----------|
| Active button state | Dark background, light text |
| Inactive button state | Light background (fourth colour), dark text |
| Grid → List switch | Calendar re-renders as grouped list rows |
| List → Grid switch | Calendar re-renders as monthly grid |
| URL updates | `gridView` param changes (`dayGridMonth` / `listMonth`) |
| No full page reload | AJAX update only |
| View persists across month navigation | If on List view, navigating months stays in List |

---

### SC-CAL-010 – List view layout

**Test:** Switch to List view at 1440px

| Check | Expected |
|-------|----------|
| Date header rows | Dark navy background with date (e.g. "March 01") and day name ("Sunday") |
| Event rows | Time in left column, title in right column |
| ALL-DAY label | Shown for all-day events (uppercase) |
| Timed events | Show time range (e.g. "2:51 PM – 7 PM") |
| "+" icon | Small icon on the right side of each event row |
| Clicking an event | Opens the same popup as grid view |
| Empty month | Shows "no results" message |

---

### SC-CAL-011 – Search functionality

**Test:** Type a keyword, click search

| Check | Expected |
|-------|----------|
| Input clears placeholder → shows "Enter Keyword" | Yes |
| Search tag pill appears below input | Shows keyword with × button |
| View switches to list (listCustom) | Yes |
| Date range expands to ~1 year | `endDate` moves forward 1 year from current month |
| Results show matching events | Events containing the keyword |
| Clicking × on the tag | Removes tag, clears search, returns to default view |
| Searching with no results | Shows "There are no results based on your current date range..." message |
| Multiple search terms | Each term becomes a separate pill tag |

---

### SC-CAL-012 – Calendar source filter (Select Calendars)

**Test:** Select a specific calendar source (e.g. Athletics)

| Check | Expected |
|-------|----------|
| Dropdown opens on click | Shows list of calendar sources with checkboxes |
| Selecting a source | Checkbox becomes checked |
| "Apply Filters" button | Visible at bottom of dropdown |
| Clicking "Apply Filters" | Dropdown closes, calendar filters to selected source |
| Events from other sources | Hidden from the calendar |
| "All Calendars" selected | Shows all events regardless of source |

---

### SC-CAL-013 – Category filter (Select Categories)

**Test:** Change "Select Categories" dropdown

| Check | Expected |
|-------|----------|
| Dropdown opens | Shows list of categories |
| Selecting a category | Filters events to that category only |
| Selecting "All Categories" | Removes category filter |

---

### SC-CAL-014 – Reset button

**Test:** Apply search + calendar filter, then click Reset

| Check | Expected |
|-------|----------|
| Search tag pills removed | Yes |
| Calendar source → "All Calendars" | Yes |
| Category → "All Categories" | Yes |
| Date range returns to current month | Yes |
| View returns to grid (default) | Yes |

---

### SC-CAL-015 – Print button

**Test:** Click Print button at 1440px

| Check | Expected |
|-------|----------|
| Browser print dialog opens | Yes |
| Print layout matches design | Calendar visible, sidebar optional |

---

### SC-CAL-016 – Follow Calendar button

**Test:** Click "Follow calendar"

| Check | Expected |
|-------|----------|
| Dropdown opens with subscription options | Google Calendar, Apple Calendar, Outlook, iCal, Copy Link |
| iCal URL format | `webcal://...` |
| Dropdown closes on clicking outside | Yes |

---

### SC-CAL-017 – Sidebar: More than 6 calendars state

**Test:** Configure the page with more than 6 calendar sources

| Check | Expected |
|-------|----------|
| Checkboxes replaced by a single dropdown | Yes ("All Calendars" dropdown shown) |
| Dropdown lists all sources | Yes |
| "Follow Calendar" and "Reset all filters" visible | Yes |
| Behaviour otherwise identical | Yes |

*Reference: XD Screen 5 – "More than 6 calendars" state*

---

### RESP-CAL-001 – Mobile layout (375px)

**Test:** Resize to 375px width

| Check | Expected |
|-------|----------|
| Sidebar hidden | Yes |
| "Filters" button visible | Yes, top-left of calendar area |
| "Print" button visible | Yes, top-right of calendar area |
| Grid/List toggle | Hidden on mobile |
| Calendar grid | Visible with dates and events (events are truncated/cramped) |
| Month navigation < > | Visible, functional |
| "Filters" button click | Opens full-screen filter panel |

---

### RESP-CAL-002 – Mobile filter panel (375px)

**Test:** Tap "Filters" button on mobile

| Check | Expected |
|-------|----------|
| Full-screen panel opens | Yes |
| "Filter the calendar" heading + close icon | Visible |
| Search input | Visible |
| Select Calendars checkboxes | Visible |
| Select Categories dropdown | Visible |
| "SHOW RESULTS" button | Visible at bottom |
| Tapping "SHOW RESULTS" | Closes panel, applies filters, updates calendar |
| Close (×) icon in header | Closes panel without applying |

---

### RESP-CAL-003 – Tablet layout (768px)

**Test:** Resize to 768px width

| Check | Expected |
|-------|----------|
| Sidebar visible or collapsed | Verify which breakpoint triggers mobile mode |
| Calendar grid readable | No overflow, events legible |
| Controls accessible | Print, navigation, view toggle |

---

### RESP-CAL-004 – Large desktop (2560px)

**Test:** Resize to 2560px

| Check | Expected |
|-------|----------|
| Sidebar scales up | Font sizes, padding scale with `clmp()` |
| Calendar grid fills width correctly | No excessive whitespace or overflow |
| Event text readable | Font size scales proportionally |
| All controls functional | Print, navigation, toggle, search |

---

## Colour Variable Tests

### COL-CAL-001 – Primary colour cascade

**Test:** Change `--primary-color` at runtime via DevTools
```js
document.documentElement.style.setProperty('--primary-color', '#ff0000')
```

| Element | Expected to Update? | Notes |
|---------|---------------------|-------|
| Day header row background | ❌ No | BUG: uses `$calendar-primaryColor` (SCSS compile-time) |
| Date number colour in cells | ❌ No | BUG: uses `$calendar-primaryColor` |
| List view date header background | ❌ No | BUG: uses `$calendar-primaryColor` |
| Event border in list view | ❌ No | BUG: uses `$calendar-primaryColor` |
| Sidebar background tint | ❌ No | BUG: uses `rgba($calendar-primaryColor, .03)` |
| "Select Calendars" item colour | ❌ No | BUG: uses `$calendar-primaryColor` |
| Print button text colour | ❌ No | BUG: uses `$calendar-primaryColor` |
| Nav arrow colour (tertiary) | ❌ No | BUG: uses `$calendar-tertiaryColor` |
| Today border highlight | ❌ No | BUG: uses `$calendar-tertiaryColor` |
| Font family | ✅ Yes | Uses `var(--primary-font)` correctly |

### COL-CAL-002 – Secondary colour cascade

**Test:** Change `--secondary-color`
```js
document.documentElement.style.setProperty('--secondary-color', '#ff0000')
```

| Element | Expected to Update? | Notes |
|---------|---------------------|-------|
| Search submit button background | ❌ No | BUG: uses `$calendar-secondaryColor` |
| Apply Filters button background | ❌ No | BUG: uses `$calendar-secondaryColor` |
| Search tag pill background | ❌ No | BUG: uses `rgba($calendar-secondaryColor, .2)` |

---

## Known Bugs (Found During Exploration)

### BUG-CAL-001 — Calendar icon font missing (404)
- **Severity:** High
- **File:** `/Fonts/icons/calendar/calendar-icons.ttf` and `.woff`
- **Error:** `Failed to load resource: 404`
- **Effect:** Calendar-specific icons (filter icon, close icon, plus icon in list view) do not render — replaced by empty space or broken squares
- **Seen at:** All breakpoints

### BUG-CAL-002 — SCSS variables used instead of CSS variables for colours
- **Severity:** High
- **File:** `/Website/Styles/Calendar/_calendarColorAndFonts.scss` lines 9–13
- **Code:**
  ```scss
  $calendar-primaryColor: theme.$primaryColor;   // should be var(--primary-color)
  $calendar-secondaryColor: theme.$secondaryColor; // should be var(--secondary-color)
  $calendar-tertiaryColor: theme.$tertiaryColor;   // should be var(--tertiary-color)
  $calendar-fourthColor: theme.$fourthColor;       // should be var(--fourth-color)
  ```
- **Effect:** Changing CSS variables at runtime has no effect on calendar colours — the entire calendar colour system is compile-time only

### BUG-CAL-003 — Hardcoded `#fff` in popup and select dropdown
- **Severity:** Medium
- **File:** `/Website/Styles/Calendar/_calendarColorAndFonts.scss`
- **Locations:**
  - Line 248: `.cl-select-head { background: #fff; }` (select dropdown header)
  - Line 617: `.cGridPopup__content { background: #fff; }` (event popup background)
  - Line 523: `.fc-list-day-text { background: rgba(255, 255, 255, .2); }` (list view day text bg)
  - Line 543: list day cushion link `color: #fff;`
  - Line 729: `$cl-backgroundFiltersMobile: #fff;` (mobile filter panel background)
- **Effect:** These elements will not respond to theme changes

### BUG-CAL-004 — FullCalendar unknown options warnings
- **Severity:** Low
- **Console:** `Unknown option 'popupAllowedFields'` and `Unknown option 'resources'`
- **File:** Custom FullCalendar plugin config
- **Effect:** May indicate deprecated or incorrectly named options; no visible impact currently

### BUG-CAL-005 — Logo 404 (staging only)
- **Severity:** Low (staging environment issue)
- **File:** `/Images/img/global/logo-full.svg` — 404
- **Effect:** Logo does not render in header on this staging site

### BUG-CAL-006 — Preload resources not used
- **Severity:** Low
- **Console:** `logo.svg` and typekit font preloaded but not used within a few seconds
- **Effect:** Wasted network requests; may slightly delay page render

---

## CSS Variable Audit Summary

| Variable | Used Correctly? | Location |
|----------|----------------|----------|
| `var(--primary-font)` | ✅ Yes | Line 6 – assigned to `$calendar-primaryFont` |
| `var(--secondary-font)` | ✅ Yes | Line 7 – assigned to `$calendar-secondaryFont` |
| `var(--primary-color)` | ❌ No | Uses `theme.$primaryColor` (compile-time) |
| `var(--secondary-color)` | ❌ No | Uses `theme.$secondaryColor` (compile-time) |
| `var(--tertiary-color)` | ❌ No | Uses `theme.$tertiaryColor` (compile-time) |
| `var(--fourth-color)` | ❌ No | Uses `theme.$fourthColor` (compile-time) |
| `var(--margin-*)` | ❌ Not used | Calendar uses hardcoded `clmp()` values for spacing |
| `var(--padding-*)` | ❌ Not used | Calendar uses hardcoded `clmp()` values for padding |

---

## Responsive Breakpoints Summary

| Breakpoint | Sidebar | Grid/List toggle | Filters access |
|------------|---------|-----------------|----------------|
| 375px | Hidden | Hidden | "Filters" button → full-screen panel |
| 768px | TBD | TBD | TBD |
| 1440px | Visible (left column) | Visible (top-right) | Inline in sidebar |
| 2560px | Visible, scaled up | Visible, scaled up | Inline in sidebar |

---

## Testing Checklist

### Layout
- [ ] SC-CAL-001 – Hero banner renders correctly
- [ ] SC-CAL-002 – Sidebar renders at desktop
- [ ] SC-CAL-003 – Calendar grid renders correctly

### Interactions
- [ ] SC-CAL-004 – Event click opens popup
- [ ] SC-CAL-005 – Event popup image field (with and without image)
- [ ] SC-CAL-006 – "Read more" link navigates to event detail
- [ ] SC-CAL-007 – "Get Directions" opens Google Maps in new tab
- [ ] SC-CAL-008 – Month navigation (prev/next)
- [ ] SC-CAL-009 – Grid ↔ List toggle
- [ ] SC-CAL-010 – List view layout

### Filters
- [ ] SC-CAL-011 – Search (tag pill, year range, listCustom view)
- [ ] SC-CAL-012 – Calendar source filter (Apply Filters)
- [ ] SC-CAL-013 – Category filter
- [ ] SC-CAL-014 – Reset button clears all filters
- [ ] SC-CAL-015 – Print button
- [ ] SC-CAL-016 – Follow calendar dropdown
- [ ] SC-CAL-017 – Sidebar: More than 6 calendars state

### Responsive
- [ ] RESP-CAL-001 – Mobile layout 375px
- [ ] RESP-CAL-002 – Mobile filter panel
- [ ] RESP-CAL-003 – Tablet layout 768px
- [ ] RESP-CAL-004 – Large desktop 2560px

### CSS Variables / Theme
- [ ] COL-CAL-001 – Primary colour cascade (all fail — bug documented)
- [ ] COL-CAL-002 – Secondary colour cascade (all fail — bug documented)

### Known Bugs to Verify
- [ ] BUG-CAL-001 – Icon font 404
- [ ] BUG-CAL-002 – SCSS variables instead of CSS variables
- [ ] BUG-CAL-003 – Hardcoded `#fff` values
- [ ] BUG-CAL-004 – FullCalendar unknown options warnings
- [ ] BUG-CAL-005 – Logo 404 (staging)
- [ ] BUG-CAL-006 – Preload warnings

---

## Edge Cases

---

### EDGE-CAL-001 — Empty search (no results)

**Steps:** Type a term that matches no events (e.g. `xyznothing12345`), submit

| Check | Expected | Actual |
|-------|----------|--------|
| "No events to display" message shown | Yes | ✅ Shows "No events to display" |
| Date range still expands to 1 year | Yes | ✅ Confirmed |
| Search tag pill still appears | Yes | ✅ Confirmed |
| Calendar area is not broken/empty | Graceful empty state | ✅ Grey empty area shown |
| Reset button clears and returns to current month | Yes | Verify |

---

### EDGE-CAL-002 — Search with special characters / XSS

**Steps:** Type `<script>alert(1)</script>` in the search input and submit

| Check | Expected | Actual |
|-------|----------|--------|
| Script does NOT execute | Should be sanitised | ❌ **BUG: Alert fires — XSS confirmed** |
| Tag pill displays as escaped text | `&lt;script&gt;...` | ❌ Raw `<script>` injected into DOM via innerHTML |
| URL encodes the parameter | `%3Cscript%3E...` | ✅ URL is encoded correctly |

> **BUG-CAL-007 — XSS in search input (HIGH SECURITY)**
> The search term is written into the DOM using `innerHTML` inside `.booleanTags span`. A `<script>` tag in the input executes immediately on submit.
> **File:** Search tag rendering logic (JS)
> **Fix:** Use `textContent` instead of `innerHTML` when rendering tag pill labels.

---

### EDGE-CAL-003 — Invalid date params via URL

**Steps:** Load `?startDate=99999999&endDate=00000000`

| Check | Expected | Actual |
|-------|----------|--------|
| Page does not crash | Yes | ✅ Page loads |
| Calendar renders | Falls back gracefully | ⚠️ FullCalendar renders but toolbar title is blank/undefined |
| No JS errors | Ideally none | ❌ Additional console errors triggered |

---

### EDGE-CAL-004 — Far past date navigation

**Steps:** Load `?startDate=19000101&endDate=19000201`

| Check | Expected | Actual |
|-------|----------|--------|
| Calendar shows January 1900 | Fallback to today preferred | ⚠️ Actually renders January 1900 — no guard |
| Empty state shown | Yes | ✅ No events (correct) |
| Page not broken | Yes | ✅ |

---

### EDGE-CAL-005 — searchExpression via URL with HTML tags

**Steps:** Load `?searchExpression=<img src=x onerror=alert(2)>`

| Check | Expected | Actual |
|-------|----------|--------|
| Page handles gracefully | No script execution | ✅ Redirects to 404 (server rejects malformed URL) |

---

### EDGE-CAL-006 — Cell overflow: day with many events

**Steps:** Check a date cell that has 6+ events

| Check | Expected | Actual |
|-------|----------|--------|
| "+N more" overflow link shown | Yes (FullCalendar default) | ⚠️ No overflow link observed — all events stack in cell, making it very tall |
| Cell height manageable | Yes | ❌ Cells with many events become very long |
| Events truncated to 2 lines each | Yes per SCSS `-webkit-line-clamp: 2` | ✅ Truncation applied |

---

### EDGE-CAL-007 — Multi-day spanning events

**Steps:** Check events that span across multiple days

| Check | Expected | Actual |
|-------|----------|--------|
| Event renders as a bar across multiple cells | Yes | ⚠️ 0 spanning events found in test data — all events appear as per-day blocks |
| Start and end cells styled differently | Yes (FullCalendar default) | Not verified (no spanning test data) |

---

### EDGE-CAL-008 — Today highlight accuracy

**Steps:** Load the calendar today (2026-03-30)

| Check | Expected | Actual |
|-------|----------|--------|
| Today's cell has tertiary colour border | Yes | ✅ `data-date="2026-03-30"` has `.fc-day-today` class |
| After midnight, "today" moves to next day | Yes | Verify at boundary |
| In a past/future month, no "today" border | Yes | Verify |

---

### EDGE-CAL-009 — Filter combination edge cases

**Steps:** Combine search + calendar source + category simultaneously

| Check | Expected | Actual |
|-------|----------|--------|
| All three filters active together | Results match all conditions | Verify |
| Search + Athletics calendar = only Athletics events matching keyword | Yes | Verify |
| No events match combined filters | Empty state shown | Verify |
| Reset clears all three | Yes | Verify |

---

### EDGE-CAL-010 — View state preserved across navigation

**Steps:** Switch to List view, navigate to next month

| Check | Expected | Actual |
|-------|----------|--------|
| List view stays active after month nav | Yes | ✅ `gridView=listMonth` preserved in URL |
| Grid view stays active after month nav | Yes | ✅ Confirmed |
| Search state preserved after month nav | Search term + tag stays | Verify |

---

### EDGE-CAL-011 — Escape key on popup

**Steps:** Open event popup, press Escape

| Check | Expected | Actual |
|-------|----------|--------|
| Popup closes on Escape | Yes (WCAG 2.1 – 1.3.4) | ❌ **BUG: Escape does not close popup** |
| Focus returns to triggering event | Yes | ❌ Focus returns to `<body>` / page wrapper |

> **BUG-CAL-008 — Escape key does not close event popup**
> Pressing Escape while popup is open has no effect. Must click × button.

---

### EDGE-CAL-012 — Rapid month navigation (click spam)

**Steps:** Click next month button 10 times rapidly

| Check | Expected | Actual |
|-------|----------|--------|
| No duplicate API calls or race conditions | Debounced / queued | Verify (no spinner/loader observed) |
| Calendar ends up on correct month | Yes | ✅ URL updates correctly each time |
| No broken UI state | Yes | Verify |

---

### EDGE-CAL-013 — Follow calendar dropdown edge cases

**Steps:** Click "Follow calendar", then click outside

| Check | Expected | Actual |
|-------|----------|--------|
| Dropdown closes on outside click | Yes | Verify |
| iCal link uses `webcal://` protocol | Yes | ✅ `webcal://test-1-mvcbasev3.tiarc-staging.co.uk/...` |
| Options include: Google, Apple, Outlook, iCal, Copy | Yes | Verify |

---

### EDGE-CAL-014 — Print triggers browser dialog

**Steps:** Click Print button

| Check | Expected | Actual |
|-------|----------|--------|
| Browser print dialog opens | Yes | Verify |
| Print styles applied (sidebar hidden etc.) | Depends on `@media print` | Verify |

---

### EDGE-CAL-015 — Very long event title in popup

**Steps:** Click an event with a very long title

| Check | Expected | Actual |
|-------|----------|--------|
| Title wraps without overflowing popup | Yes | Verify |
| Popup width remains constrained | Yes | Verify |
| Close button still accessible | Yes | Verify |

---

### EDGE-CAL-016 — Event with no optional fields

**Steps:** Click an event that has only a title and date (no image, no location, no description)

| Check | Expected | Actual |
|-------|----------|--------|
| "Where" field is hidden | Yes | Verify |
| "Description" field is hidden | Yes | Verify |
| "Get Directions" link is hidden | Yes | Verify |
| "Image" is hidden | Yes | Verify |
| Popup layout not broken | Yes | Verify |

---

## Accessibility Test Cases

---

### A11Y-CAL-001 — Page language attribute

| Check | Expected | Actual |
|-------|----------|--------|
| `<html lang="...">` is set | `lang="en"` or appropriate | ✅ `lang="en"` confirmed |

---

### A11Y-CAL-002 — Page title

| Check | Expected | Actual |
|-------|----------|--------|
| `<title>` is descriptive | "School Calendar" | ✅ `<title>School Calendar</title>` confirmed |
| Title updates on navigation (SPA) | Should reflect current view | ⚠️ Title stays "School Calendar" regardless of month — does not update |

---

### A11Y-CAL-003 — Skip to content link

| Check | Expected | Actual |
|-------|----------|--------|
| Skip link is the first focusable element | Yes (WCAG 2.4.1) | ✅ First Tab focus hits "Skip to content" |
| Skip link is visible on focus | Should appear on screen | Verify (visually hidden by default) |
| Skip link has an `href` target | `href="#main-content"` or similar | ❌ **BUG: `href` is null** — pressing Enter on skip link does nothing |
| After activating, focus jumps to main content | Yes | ❌ Not functional (no href) |

> **BUG-CAL-009 — Skip to content link is broken**
> The "Skip to content" button has no `href` and no click handler that moves focus. It does not skip navigation.

---

### A11Y-CAL-004 — Heading structure

| Check | Expected |
|-------|----------|
| `<h1>` exists and is "School Calendar" | ✅ Confirmed |
| "Select Calendars" is `<h2>` | ✅ Confirmed |
| "Select Categories" is `<h2>` | ✅ Confirmed |
| No heading levels skipped | Verify h1 → h2 → h3 order |
| Popup event title uses appropriate heading | ✅ Uses `<h4>` |

---

### A11Y-CAL-005 — Landmark regions

| Check | Expected | Actual |
|-------|----------|--------|
| `<header>` landmark present | Yes | ✅ Present |
| `<main>` or `role="main"` landmark present | Yes (WCAG 1.3.6) | ❌ No `<main>` element — calendar is in a `<section>` |
| `<nav>` for site navigation | Yes | ✅ Present |
| `<aside>` for sidebar | Yes | ✅ `.calendarSidebar` is `<aside>` |
| `<footer>` landmark present | Yes | ✅ Present |

> **BUG-CAL-010 — No `<main>` landmark**
> Screen reader users rely on landmarks to navigate. The calendar page lacks a `<main>` element, making it harder to jump to main content.

---

### A11Y-CAL-006 — Search input accessibility

| Check | Expected | Actual |
|-------|----------|--------|
| Input has `aria-label` | "Search input for events" | ✅ Confirmed |
| Input has `aria-describedby` pointing to error | `#search-error` | ✅ Confirmed |
| Error message has `role="alert"` + `aria-live="assertive"` | Yes | ✅ Confirmed |
| Submit button has `aria-label` | "Submit search" | ✅ Confirmed |
| Clear button has `aria-label` | "Clear search input" | ✅ Confirmed |
| Search tag pill close button has `aria-label` | "Delete [term] tag" | ✅ Confirmed (but tag is XSS vulnerable) |

---

### A11Y-CAL-007 — Calendar grid accessibility

| Check | Expected | Actual |
|-------|----------|--------|
| Grid table has `role="grid"` | Yes (FullCalendar) | ✅ `<table role="grid">` confirmed |
| Day cells have `data-date` attribute | Yes | ✅ `data-date="2026-03-01"` etc. |
| Today cell has `aria-current="date"` | Yes (WCAG) | ❌ **BUG: No `aria-current` on today cell** — only CSS class `.fc-day-today` |
| Column headers (Mon, Tue…) have `scope="col"` | Yes | Verify |
| Event links are focusable via Tab | Yes | ⚠️ Events are `<a>` tags — focusable, but 192 events = excessive Tab stops |

> **BUG-CAL-011 — Today's date cell missing `aria-current="date"`**
> Screen readers cannot identify the current date without `aria-current="date"` on the cell.

---

### A11Y-CAL-008 — Calendar toolbar button labels

| Check | Expected | Actual |
|-------|----------|--------|
| Prev month button has accessible label | `aria-label` or `title` | ⚠️ Has `title="Previous month"` only — `title` is not reliably announced by all screen readers |
| Next month button has accessible label | `aria-label` or `title` | ⚠️ Has `title="Next month"` only |
| Print button has accessible label | `aria-label` | ❌ **BUG: Print button has no `aria-label` and empty text content** |
| Grid/List toggle buttons have `aria-pressed` | Yes | ✅ `aria-pressed="true"/"false"` confirmed |
| Month title announced on change | `aria-live` on title | ❌ No `aria-live` on `.fc-toolbar-title` — screen readers won't announce month change |

> **BUG-CAL-012 — Print button has no accessible label**
> The print button renders as an icon-only button with no text and no `aria-label`. Screen readers cannot identify it.

> **BUG-CAL-013 — Month title not announced on navigation**
> When prev/next month buttons are clicked, the `.fc-toolbar-title` text changes but has no `aria-live` attribute. Screen reader users won't hear the new month name.

---

### A11Y-CAL-009 — Event popup accessibility

| Check | Expected | Actual |
|-------|----------|--------|
| Popup has `role="dialog"` | Yes (WCAG 4.1.2) | ❌ **BUG: Popup is `<aside>` with no `role` override** |
| Popup has `aria-modal="true"` | Yes | ❌ Missing |
| Popup has `aria-label` or `aria-labelledby` | Event title | ❌ Missing |
| Focus moves into popup on open | Yes (focus trap) | ❌ Focus stays on page body — no focus management |
| Focus is trapped inside popup while open | Yes | ❌ No focus trap — Tab escapes popup |
| Escape key closes popup | Yes (WCAG 1.4.13) | ❌ Does not work |
| Focus returns to triggering event on close | Yes | ❌ Focus returns to page wrapper |
| Close button has accessible label | "Close" | ❌ Close button is `<button>` with only `<i>` (icon) — no `aria-label`, no text |

> **BUG-CAL-014 — Event popup fails multiple WCAG dialog requirements**
> - Missing `role="dialog"`
> - Missing `aria-modal="true"`
> - No accessible name (`aria-labelledby`)
> - No focus trap (Tab escapes)
> - No focus management on open/close
> - Close button has no label
> - Escape key not handled

---

### A11Y-CAL-010 — Mobile filter panel accessibility

| Check | Expected | Actual |
|-------|----------|--------|
| "Filters" open button has `aria-expanded` | Yes | Verify |
| Filter panel close button has `aria-label` | "Close filter menu" | ✅ `aria-label="Close filter menu"` confirmed |
| Filter panel has `role="dialog"` | Yes | Verify |
| Focus moves into panel on open | Yes | Verify |
| "SHOW RESULTS" button is keyboard accessible | Yes | Verify |

---

### A11Y-CAL-011 — Checkbox and dropdown accessibility

| Check | Expected | Actual |
|-------|----------|--------|
| Selectric hides native `<select>` from AT | `aria-hidden="true"` on native select | ⚠️ Observed `aria-hidden` not explicitly set — verify |
| Selectric input has `aria-label` | "Filter events by categories" | ✅ Confirmed |
| Checkbox items keyboard navigable | Yes | Verify |
| Selected state conveyed to AT | checked/unchecked state | Verify |

---

### A11Y-CAL-012 — Colour contrast

**Primary colour (dark navy `rgb(28, 43, 60)`) on neutral background:**

| Element | Foreground | Background | Ratio (approx) | WCAG AA (4.5:1) |
|---------|-----------|-----------|----------------|-----------------|
| Day number in cell | `rgb(28,43,60)` | `rgba(228,231,233,0.6)` | ~7:1 | ✅ Pass |
| Event text in cell | `rgb(28,43,60)` | `rgba(228,231,233,0.6)` | ~7:1 | ✅ Pass |
| Day header text | `#fff` | `rgb(28,43,60)` | ~12:1 | ✅ Pass |
| List date header text | `#fff` | `rgb(28,43,60)` | ~12:1 | ✅ Pass |
| Prev/next month dates (50% opacity) | Dimmed | White | ⚠️ Reduced opacity may fail WCAG AA — verify exact ratio |
| Search placeholder text | Faded (opacity 0.6) | Input bg | ⚠️ Reduced opacity — verify ratio |
| "No events to display" text | Verify colour | Light grey bg | Verify |

---

### A11Y-CAL-013 — Keyboard-only navigation flow

**Tab order expected:**
1. Skip to content (broken — BUG-CAL-009)
2. Site navigation links
3. Search input
4. Search submit button
5. Calendar source filter (selectric input)
6. Category filter (selectric input)
7. Follow calendar button
8. Reset button
9. Print button
10. Prev month button
11. Next month button
12. Grid button
13. List button
14. All 192 event links (excessive — no skip mechanism)
15. Footer links

| Check | Expected | Actual |
|-------|----------|--------|
| All interactive elements reachable by Tab | Yes | ⚠️ 192 event anchor links in grid = keyboard trap in practice |
| Focus indicator visible on all elements | Yes (WCAG 2.4.7) | Verify — no `:focus` outline detected in computed styles |
| Logical Tab order (top-left to bottom-right) | Yes | Verify |
| No focus goes off-screen | Yes | Verify |
| Grid/List toggle operable by keyboard | Yes (`aria-pressed`) | ✅ Button elements, keyboard accessible |

> **BUG-CAL-015 — 192 focusable event links with no skip mechanism**
> In grid view, every event in every cell is an `<a>` tag. With 192 events visible in a month, keyboard users must Tab through all of them before reaching the footer. There is no "skip calendar" mechanism.

---

### A11Y-CAL-014 — Screen reader announcements

| Check | Expected |
|-------|----------|
| Current month announced on load | h2 title read by SR |
| Month change announced | ❌ No `aria-live` — BUG-CAL-013 |
| Search results count announced | e.g. "Showing X results" | Verify |
| "No events to display" announced to SR | role="alert" or aria-live needed | Verify |
| Popup open announced as dialog | ❌ No role="dialog" — BUG-CAL-014 |
| Filter applied announced | Verify aria-live feedback |

---

### A11Y-CAL-015 — Reduced motion

| Check | Expected | Actual |
|-------|----------|--------|
| CSS transitions respect `prefers-reduced-motion` | `@media (prefers-reduced-motion)` | Verify in SCSS — transitions used extensively |
| Calendar transitions disabled if preferred | Yes | Verify |

---

## Accessibility Bugs Summary

| ID | Severity | Issue | WCAG |
|----|----------|-------|------|
| BUG-CAL-007 | **Critical** | XSS in search input — `innerHTML` used for tag pills | Security |
| BUG-CAL-008 | **High** | Escape key does not close event popup | 1.4.13 |
| BUG-CAL-009 | **High** | Skip to content link has no `href` — non-functional | 2.4.1 |
| BUG-CAL-010 | **High** | No `<main>` landmark on page | 1.3.6 |
| BUG-CAL-011 | **High** | Today's cell missing `aria-current="date"` | 1.3.1 |
| BUG-CAL-012 | **High** | Print button has no accessible label | 4.1.2 |
| BUG-CAL-013 | **High** | Month title not announced on navigation (no `aria-live`) | 4.1.3 |
| BUG-CAL-014 | **High** | Event popup missing role, focus trap, focus management, close label | 1.3.1, 2.1.2, 2.4.3 |
| BUG-CAL-015 | **Medium** | 192 event links with no skip mechanism for keyboard users | 2.4.1 |

---

## Edge Case + Accessibility Checklist

### Edge Cases
- [ ] EDGE-CAL-001 — Empty search "no results" state
- [ ] EDGE-CAL-002 — XSS in search input (BUG-CAL-007)
- [ ] EDGE-CAL-003 — Invalid date URL params
- [ ] EDGE-CAL-004 — Far past date navigation (year 1900)
- [ ] EDGE-CAL-005 — HTML in URL searchExpression param
- [ ] EDGE-CAL-006 — Day with many events (overflow/stacking)
- [ ] EDGE-CAL-007 — Multi-day spanning events
- [ ] EDGE-CAL-008 — Today highlight accuracy
- [ ] EDGE-CAL-009 — Combined filter edge cases
- [ ] EDGE-CAL-010 — View state preserved across month navigation
- [ ] EDGE-CAL-011 — Escape key on popup (BUG-CAL-008)
- [ ] EDGE-CAL-012 — Rapid month navigation (race conditions)
- [ ] EDGE-CAL-013 — Follow calendar dropdown
- [ ] EDGE-CAL-014 — Print button
- [ ] EDGE-CAL-015 — Very long event title in popup
- [ ] EDGE-CAL-016 — Event with no optional fields

### Accessibility
- [ ] A11Y-CAL-001 — `lang` attribute
- [ ] A11Y-CAL-002 — Page title
- [ ] A11Y-CAL-003 — Skip to content (BUG-CAL-009)
- [ ] A11Y-CAL-004 — Heading structure
- [ ] A11Y-CAL-005 — Landmark regions (BUG-CAL-010)
- [ ] A11Y-CAL-006 — Search input ARIA
- [ ] A11Y-CAL-007 — Grid ARIA (BUG-CAL-011)
- [ ] A11Y-CAL-008 — Toolbar button labels (BUG-CAL-012, BUG-CAL-013)
- [ ] A11Y-CAL-009 — Event popup dialog (BUG-CAL-014)
- [ ] A11Y-CAL-010 — Mobile filter panel
- [ ] A11Y-CAL-011 — Checkbox/dropdown accessibility
- [ ] A11Y-CAL-012 — Colour contrast
- [ ] A11Y-CAL-013 — Keyboard-only navigation (BUG-CAL-015)
- [ ] A11Y-CAL-014 — Screen reader announcements
- [ ] A11Y-CAL-015 — Reduced motion
