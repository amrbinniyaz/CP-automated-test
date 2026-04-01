# Search Test Cases

## Overview

| Property | Value |
|----------|-------|
| Widget Name | Search |
| Template | `/Website/Pages/Templates/Search.cshtml` |
| SCSS File | `/Website/Styles/Forms/Search.scss` |
| JS File | `/Website/Scripts/Forms/Search.js` |
| Engine | Google Custom Search Element (CSE) |
| Variants | 1 |

---

## Design Specifications (from provided rules)

### Behavior Rules

| # | Rule | Description |
|---|------|-------------|
| 1 | Spell Check & autocorrect | Add spell check & autocorrect mistakes |
| 2 | Auto suggestions | Show 3 suggested phrases once users start typing |
| 3 | Multi-word search | It is possible to search for a phrase consisting of more than one word |
| 4 | Search trigger | Users can search for results by pressing the button or the Enter key |
| 5 | Result thumbnails | The results display the page image or the default logo thumb |
| 6 | Title truncation | Truncate title after 1 line |
| 7 | Body copy truncation | Truncate body copy after 2 lines |
| 8 | Pagination | Display max 5 results per page |

---

## Code Implementation

### Files

| File | Purpose |
|------|---------|
| `/Website/Pages/Templates/Search.cshtml` | Template - renders search div + sitemap |
| `/Website/Styles/Forms/Search.scss` | All search styling (402 lines) |
| `/Website/Scripts/Forms/Search.js` | Google CSE initialization, URL history management |
| `/Website/IS_Bundler/bundle.config.js:66` | CSS bundle entry |
| `/Website/IS_Bundler/bundle.config.js:227` | JS bundle entry |

### Architecture

The search uses **Google Custom Search Element (CSE)** API:
1. `Search.cshtml` renders a hidden input with the Google CSE key (`hdnGoogleSearchCode`) and an empty `#tiarcGoogleSearch` div
2. `Search.js` loads the CSE script from `https://cse.google.com/cse.js` and renders the search element into the div
3. `Search.scss` overrides all Google CSE default styles to match the site theme

### CSS Variables Used

| Variable | Element | Line(s) |
|----------|---------|---------|
| `var(--primary-font)` | `.gssb_c`, input, results, no-results | 40, 212, 283, 327, 394 |
| `var(--tertiary-color)` | Suggestion bold text, clear button, title bold, title hover | 77, 148, 274, 277 |
| `var(--secondary-color)` | Search button background | 177 |
| `var(--primary-color)` | Search button icon, result titles, visible URL, pagination, result text | 187, 265, 285, 310, 332 |
| `var(--general-bradius)` | Not used (hardcoded border-radius) | - |

### SCSS Variables Used (potential bugs)

| SCSS Variable | Element | Line(s) | Issue |
|---------------|---------|---------|-------|
| `theme.$fourthColor` | Suggestion dropdown bg, arrow bg | 53, 58 | `lighten()` requires SCSS variable |
| `theme.$secondaryColor` | Search button hover, pagination active/hover | 195, 313, 317 | `lighten()` and `rgba()` require SCSS variable |

### Hardcoded Values

| Value | Element | Line(s) | Severity |
|-------|---------|---------|----------|
| `#e4e7e9` | Search box background | 131, 203 | Medium - should use CSS variable |
| `#fff` | Search button icon color | 184 | Low - overridden by line 187 (`var(--primary-color)`) |
| `#000` | Result info text, file format text, input border/color/bg | 255, 323, 378-380 | Medium - hardcoded black |
| `#c55f3c` | Result snippet bold text | 339 | Medium - hardcoded accent color |
| `0.5rem` | Suggestion container border-radius | 63 | Low - cosmetic |
| `2.5rem` | Search box border-radius | 133 | Low - cosmetic |
| `5rem` / `10rem` | Image box size | 346-347 | Low - uses clmp() |
| `15px` | Result item padding | 368 | Medium - hardcoded pixel value |

---

## Known Bugs Found

### BUG-SEARCH-001: Hardcoded #e4e7e9 for search box background
| Property | Value |
|----------|-------|
| **Severity** | Medium |
| **File** | `/Website/Styles/Forms/Search.scss:131` |
| **Code** | `background: #e4e7e9;` |
| **Also at** | Line 203 (`.gsc-input-box`) |
| **Expected** | Should use `var(--fourth-color)` or similar CSS variable |
| **Issue** | Hardcoded color won't respond to theme changes |

### BUG-SEARCH-002: SCSS variable in lighten() for suggestion dropdown
| Property | Value |
|----------|-------|
| **Severity** | High |
| **File** | `/Website/Styles/Forms/Search.scss:53` |
| **Code** | `background: lighten(theme.$fourthColor, 1%) !important;` |
| **Also at** | Line 58 (`.gsc-completion-container`) |
| **Expected** | Should use CSS variable (e.g., `var(--fourth-color)` with color-mix or separate variable) |
| **Issue** | `lighten()` is a Sass function requiring compile-time value, won't cascade |

### BUG-SEARCH-003: SCSS variable in lighten() for button hover
| Property | Value |
|----------|-------|
| **Severity** | High |
| **File** | `/Website/Styles/Forms/Search.scss:195` |
| **Code** | `background: lighten(theme.$secondaryColor, 10%);` |
| **Expected** | Should use CSS variable for hover state |
| **Issue** | Hover background won't cascade with theme changes |

### BUG-SEARCH-004: SCSS variable in rgba() for pagination
| Property | Value |
|----------|-------|
| **Severity** | High |
| **File** | `/Website/Styles/Forms/Search.scss:313` |
| **Code** | `background: rgba(theme.$secondaryColor, 0.3);` |
| **Also at** | Line 317 (hover state) |
| **Expected** | Should use CSS variable with opacity |
| **Issue** | Pagination active/hover background won't cascade |

### BUG-SEARCH-005: Hardcoded #c55f3c accent color in results
| Property | Value |
|----------|-------|
| **Severity** | Medium |
| **File** | `/Website/Styles/Forms/Search.scss:339` |
| **Code** | `color: #c55f3c;` |
| **Expected** | Should use `var(--tertiary-color)` or similar CSS variable |
| **Issue** | Hardcoded orange/accent color in bold search result text |

### BUG-SEARCH-006: Hardcoded #000 in result info and inputs
| Property | Value |
|----------|-------|
| **Severity** | Low |
| **File** | `/Website/Styles/Forms/Search.scss:255, 323, 378-380` |
| **Code** | `color: #000 !important;` (multiple instances) |
| **Expected** | `#000` is intentionally hardcoded per design spec (branding black) |
| **Issue** | Acceptable per design - branding black has no CSS variable by design |

### BUG-SEARCH-007: No title truncation (1 line) in CSS
| Property | Value |
|----------|-------|
| **Severity** | Medium |
| **File** | `/Website/Styles/Forms/Search.scss` |
| **Code** | No `-webkit-line-clamp` or overflow truncation on `.gs-title` |
| **Expected** | Title should truncate after 1 line per spec |
| **Issue** | Missing CSS truncation rule |

### BUG-SEARCH-008: No body copy truncation (2 lines) in CSS
| Property | Value |
|----------|-------|
| **Severity** | Medium |
| **File** | `/Website/Styles/Forms/Search.scss` |
| **Code** | No `-webkit-line-clamp` or overflow truncation on `.gsc-table-result` |
| **Expected** | Body copy should truncate after 2 lines per spec |
| **Issue** | Missing CSS truncation rule |

### BUG-SEARCH-009: No max 5 results per page configuration
| Property | Value |
|----------|-------|
| **Severity** | Medium |
| **File** | `/Website/Scripts/Forms/Search.js` |
| **Code** | No `resultSetSize` or `num` configuration in the CSE render settings |
| **Expected** | Should set `{ resultSetSize: 5 }` or equivalent to limit results per page |
| **Issue** | Google CSE defaults to 10 results per page, spec requires 5 |

### BUG-SEARCH-010: No spell check / autocorrect configuration
| Property | Value |
|----------|-------|
| **Severity** | Low |
| **File** | `/Website/Scripts/Forms/Search.js` |
| **Code** | No spell check configuration, relies on Google CSE defaults |
| **Expected** | Google CSE may provide "Did you mean?" by default, needs verification |
| **Issue** | No explicit spell check / autocorrect implementation visible |

### BUG-SEARCH-011: Auto-suggestion shows 8+ instead of max 3
| Property | Value |
|----------|-------|
| **Severity** | Medium |
| **File** | `/Website/Scripts/Forms/Search.js` + `/Website/Styles/Forms/Search.scss` |
| **Code** | No max suggestion count configuration |
| **Expected** | Should show max 3 suggested phrases |
| **Actual** | Typing "te" showed 8+ suggestions (tesco, temu, teams, tesco near me, tesco mobile, temu uk, tell me lies, tesco clubcard...) |
| **Issue** | Google CSE auto-complete count is controlled by Google, needs CSS `nth-child` limit or JS truncation |

### BUG-SEARCH-012: Search button hidden (display: none)
| Property | Value |
|----------|-------|
| **Severity** | High |
| **File** | `/Website/Styles/Forms/Search.scss` |
| **Code** | `td.gsc-search-button` has `display: none` from Google CSE default CSS, site SCSS only styles child `.gsc-search-button-v2` with `display: flex` |
| **Expected** | Search button should be visible so users can click to search (spec rule #4) |
| **Actual** | Button is completely hidden; only Enter key and suggestion clicks work |
| **Fix needed** | Add `td.gsc-search-button { display: table-cell !important; }` to Search.scss |

### BUG-SEARCH-013: Pagination shows 10 pages when actual results only fill ~6 pages
| Property | Value |
|----------|-------|
| **Severity** | High |
| **File** | `/Website/Scripts/Forms/Search.js` |
| **Code** | No `resultSetSize` configuration in CSE render settings |
| **Expected** | Pagination should only show pages that have actual results |
| **Actual** | Searching "admission" shows 10 pagination pages on page 1. Actual results: pages 1-5 have 10 results each (50), page 6 has 1 result (51 total). Pages 7-10 show "Your search did not match any results." with no way to navigate back. |
| **Root Cause** | Google CSE **estimates** ~100 results upfront and shows 10 pages optimistically. It only corrects pagination as you navigate deeper (by page 6 it drops to 6 pages). But clicking pages 7-10 directly from page 1 jumps past the correction. |
| **Fix options** | 1. Set `resultSetSize: 'filtered'` in CSE config to return only quality results (fewer pages). 2. Set `resultSetSize: 50` to cap total results. 3. Combined with setting 5 results/page (BUG-SEARCH-009), pagination would be more accurate. |

### BUG-SEARCH-014: Google CSE indexes wrong domain - searches interactiveschools.com instead of staging site
| Property | Value |
|----------|-------|
| **Severity** | Critical |
| **File** | `/Website/Pages/Templates/Search.cshtml` + CMS setting `Generic_GoogleSearchCode` |
| **Code** | CSE key `cx=52fff56a395a748d1` is configured to search `interactiveschools.com` |
| **Expected** | Search should return results from the staging site's own pages (e.g., `test-1-mvcbasev3.tiarc-staging.co.uk/team-x-test/head-s-welcome`) |
| **Actual** | ALL search results come from `www.interactiveschools.com`. Searching "Reigatian" (unique word on Head's Welcome page) returns 0 results. Searching "Headmaster welcome" returns 4 results all from interactiveschools.com. Searching "Reigate Grammar School" returns 1 result from interactiveschools.com/portfolio. No staging site pages appear in any search. |
| **Root Cause** | The Google Programmable Search Engine (cx ID `52fff56a395a748d1`) is configured to index `interactiveschools.com` only, not the staging domain. This is configured in Google's PSE console, not in code. |
| **Fix** | Each client deployment needs its own Google CSE with their domain added. For staging, the CSE must include `test-1-mvcbasev3.tiarc-staging.co.uk` as a search site. The CMS setting `Generic_GoogleSearchCode` controls which CSE key is used per site. |
| **Note** | This is expected for a base template - each client configures their own Google CSE key. But the current staging key is pointing at the wrong domain, making search unusable for testing. |

---

## Test Cases

### Behavior Tests

| ID | Test Case | Expected | Status |
|----|-----------|----------|--------|
| BHV-SEARCH-001 | Type a misspelled word and submit | Spell check / "Did you mean?" suggestion appears | **PASS** - "schoool" → "Showing results for **school**" with option to search original |
| BHV-SEARCH-002 | Start typing in search box | Auto-suggestions appear (max 3 phrases) | **FAIL** - Shows 8+ suggestions instead of max 3 (BUG-SEARCH-011) |
| BHV-SEARCH-003 | Search for a multi-word phrase | Results for the full phrase are returned | **PASS** - "test page" returned relevant multi-word results |
| BHV-SEARCH-004 | Press Enter key to search | Search executes, results display | **PASS** - Enter key triggers search correctly |
| BHV-SEARCH-005 | Click search button to search | Search executes, results display | **FAIL** - Search button is hidden (`display: none`) (BUG-SEARCH-012) |
| BHV-SEARCH-006 | Check result thumbnails | Each result shows page image or default logo | **PASS** - Results show circular page image or hexagonal default logo |
| BHV-SEARCH-007 | Check title truncation | Title truncates after 1 line with ellipsis | **FAIL** - No truncation CSS; `overflow: hidden` but no `-webkit-line-clamp` (BUG-SEARCH-007) |
| BHV-SEARCH-008 | Check body copy truncation | Body copy truncates after 2 lines | **FAIL** - No truncation CSS; `overflow: visible`, no line-clamp (BUG-SEARCH-008) |
| BHV-SEARCH-009 | Count results per page | Max 5 results displayed per page | **FAIL** - Shows 10 results per page (Google CSE default) (BUG-SEARCH-009) |
| BHV-SEARCH-010 | Test pagination | Page numbers appear, clicking navigates results | **FAIL** - Shows 10 pages but only ~6 have results. Pages 7-10 show "no results" with no way back (BUG-SEARCH-013) |
| BHV-SEARCH-011 | URL updates with search term | Browser URL updates to `/search/[term]` | **PASS** - URL updates to `/search/test%20page` |

### Styling Tests

| ID | Test Case | Expected | Breakpoints |
|----|-----------|----------|-------------|
| SC-SEARCH-001 | Search box renders correctly | Rounded pill shape, grey background, icon button | **PASS** (375px, 1512px) - Pill shape, #e4e7e9 bg, clear button visible |
| SC-SEARCH-002 | Search button styling | Circular, secondary-color bg, search icon | **FAIL** - Button exists in DOM (50x50, teal bg, border-radius:50%) but parent td is `display:none` (BUG-SEARCH-012) |
| SC-SEARCH-003 | Auto-suggestion dropdown styling | Matches theme, correct font, border-radius | **PASS** - Grey bg with upward arrow, typed text dark, completions in tertiary color |
| SC-SEARCH-004 | Result item layout | Image thumbnail + title + URL + body in flex row | **PASS** - Circular image + title + URL + snippet in vertical layout |
| SC-SEARCH-005 | Pagination styling | Circular page numbers, centered | **PASS** - Circular page numbers, centered, 10 pages shown |
| SC-SEARCH-006 | No results message | Centered, correct font/size | Not tested |
| SC-SEARCH-007 | Result image is circular | `.gs-image` has `border-radius: 50%` | **PASS** - Images display as circles |

### Color Variable Tests

| ID | Test Case | Variable | Expected |
|----|-----------|----------|----------|
| COL-SEARCH-001 | Change --primary-color | `--primary-color` | Result titles, URLs, pagination, result text update |
| COL-SEARCH-002 | Change --secondary-color | `--secondary-color` | Search button bg updates |
| COL-SEARCH-003 | Change --tertiary-color | `--tertiary-color` | Suggestion bold text, clear button, title hover update |
| COL-SEARCH-004 | Verify #e4e7e9 does NOT update | N/A | Search box bg stays grey (BUG-SEARCH-001) |
| COL-SEARCH-005 | Verify #c55f3c does NOT update | N/A | Result bold text stays orange (BUG-SEARCH-005) |
| COL-SEARCH-006 | Verify button hover does NOT update | N/A | Uses SCSS lighten() (BUG-SEARCH-003) |
| COL-SEARCH-007 | Verify pagination active does NOT update | N/A | Uses SCSS rgba() (BUG-SEARCH-004) |

### Font Variable Tests

| ID | Test Case | Variable | Expected |
|----|-----------|----------|----------|
| FV-SEARCH-001 | Change --primary-font | `--primary-font` | All search text updates (suggestions, input, results, no-results) |

### Responsive Tests

| ID | Test Case | Breakpoints | Expected |
|----|-----------|-------------|----------|
| RESP-SEARCH-001 | Search box fits viewport | 375px, 768px, 1440px | No horizontal overflow |
| RESP-SEARCH-002 | Result images scale | 375px, 1440px | `clmp(5rem, 10rem)` scales correctly |
| RESP-SEARCH-003 | Title font scales | 375px, 1440px | `clmp(1.6rem, 2rem)` scales correctly |

---

## Test Execution Checklist

### Behavior
- [x] BHV-SEARCH-001: Spell check / autocorrect - **PASS**
- [x] BHV-SEARCH-002: Auto-suggestions (max 3) - **FAIL** (8+ shown)
- [x] BHV-SEARCH-003: Multi-word search - **PASS**
- [x] BHV-SEARCH-004: Enter key triggers search - **PASS**
- [x] BHV-SEARCH-005: Button click triggers search - **FAIL** (button hidden)
- [x] BHV-SEARCH-006: Result thumbnails (page image or logo) - **PASS**
- [x] BHV-SEARCH-007: Title truncation (1 line) - **FAIL** (no truncation CSS)
- [x] BHV-SEARCH-008: Body copy truncation (2 lines) - **FAIL** (no truncation CSS)
- [x] BHV-SEARCH-009: Max 5 results per page - **FAIL** (shows 10)
- [x] BHV-SEARCH-010: Pagination works - **FAIL** (empty pages 7-10)
- [x] BHV-SEARCH-011: URL updates - **PASS**

### Styling
- [x] SC-SEARCH-001: Search box rendering - **PASS**
- [x] SC-SEARCH-002: Search button styling - **FAIL** (hidden)
- [x] SC-SEARCH-003: Auto-suggestion dropdown - **PASS**
- [x] SC-SEARCH-004: Result item layout - **PASS**
- [x] SC-SEARCH-005: Pagination styling - **PASS**
- [ ] SC-SEARCH-006: No results message - Not tested
- [x] SC-SEARCH-007: Circular result images - **PASS**

### Color Variables
- [ ] COL-SEARCH-001: --primary-color cascade
- [ ] COL-SEARCH-002: --secondary-color cascade
- [ ] COL-SEARCH-003: --tertiary-color cascade
- [ ] COL-SEARCH-004: #e4e7e9 does NOT cascade (Expected)
- [ ] COL-SEARCH-005: #c55f3c does NOT cascade (Expected)
- [ ] COL-SEARCH-006: Button hover does NOT cascade (Expected)
- [ ] COL-SEARCH-007: Pagination active does NOT cascade (Expected)

### Font Variables
- [ ] FV-SEARCH-001: --primary-font cascade

### Responsive
- [x] RESP-SEARCH-001: Search box fits all viewports - **PASS** (375px, 1512px)
- [ ] RESP-SEARCH-002: Result image scaling
- [ ] RESP-SEARCH-003: Title font scaling

---

## Edge Case Tests

| ID | Test Case | Result |
|----|-----------|--------|
| EDGE-SEARCH-001 | Empty search (Enter with no input) | **PASS** - No error, no results, URL unchanged |
| EDGE-SEARCH-002 | Spaces-only search | **PASS** - "No results" message, no crash |
| EDGE-SEARCH-003 | Unicode characters ("école française") | **PASS** - Input preserved, URL encoded correctly, no crash |
| EDGE-SEARCH-004 | SQL injection (`' OR 1=1 --`) | **PASS** - No error, no crash. Not applicable - Google CSE uses no SQL |
| EDGE-SEARCH-005 | Search with `#` and `?` characters | **FAIL** - URL breaks. `encodeURI()` doesn't encode `#?&`, so `test#fragment` becomes URL fragment instead of search term (BUG-SEARCH-015) |

---

## Security Tests

| ID | Test Case | Result |
|----|-----------|--------|
| SEC-SEARCH-001 | XSS via search input (`<script>document.title='XSS'</script>`) | **PASS** - Script tags URL-encoded (`%3Cscript%3E`), title unchanged, XSS blocked |
| SEC-SEARCH-002 | XSS via URL path (`/search/<img onerror=...>`) | **PASS** - Server returns 404, rejects HTML in URL path |
| SEC-SEARCH-003 | XSS via URL-encoded path (`/search/%22%3E%3Cscript%3E...`) | **PASS** - Server returns 404, rejects encoded HTML |
| SEC-SEARCH-004 | Google CSE key exposed in hidden input | **Low risk** - CSE key `52fff56a395a748d1` visible in page source. CSE keys are public by design (client-side API), but domain restrictions should be set in Google console. |
| SEC-SEARCH-005 | `encodeURI` vs `encodeURIComponent` in URL construction | **FAIL** - `Search.js` lines 41, 48, 56 use `encodeURI()` which leaves `#`, `?`, `&`, `=` unencoded. Searching `test#hack` sets URL path to `/search/test` with `#hack` as fragment. Not an XSS risk but breaks URL integrity. (BUG-SEARCH-015) |

---

## Accessibility Tests

| ID | Test Case | Result |
|----|-----------|--------|
| A11Y-SEARCH-001 | Search input has `aria-label` | **PASS** - `aria-label="search"` present |
| A11Y-SEARCH-002 | Search button has `aria-label` | **FAIL** - Button has no `aria-label` (and is hidden anyway - BUG-SEARCH-012) |
| A11Y-SEARCH-003 | `role="search"` landmark on form | **FAIL** - No search landmark found on page (BUG-SEARCH-016) |
| A11Y-SEARCH-004 | Search input keyboard accessible | **PASS** - `tabIndex=0`, Enter key works |

---

## Additional Bugs Found (Edge Cases & Security)

### BUG-SEARCH-015: `encodeURI()` used instead of `encodeURIComponent()` in URL construction
| Property | Value |
|----------|-------|
| **Severity** | Medium |
| **File** | `/Website/Scripts/Forms/Search.js:41, 48, 56` |
| **Code** | `history.replaceState({}, document.title, '/search/' + encodeURI($('input.gsc-input').val()));` |
| **Expected** | Should use `encodeURIComponent()` to encode all special URL characters |
| **Actual** | `encodeURI('test#frag')` → `test#frag` (broken). `encodeURIComponent('test#frag')` → `test%23frag` (correct) |
| **Impact** | Searching terms with `#`, `?`, `&` breaks URL path. Not an XSS vector but breaks back-button and URL sharing. |
| **Fix** | Replace `encodeURI(` with `encodeURIComponent(` on lines 41, 48, 56 |

### BUG-SEARCH-016: Missing `role="search"` ARIA landmark
| Property | Value |
|----------|-------|
| **Severity** | Low |
| **File** | `/Website/Pages/Templates/Search.cshtml` |
| **Code** | `<div id="tiarcGoogleSearch"></div>` has no ARIA role |
| **Expected** | Container or parent should have `role="search"` for screen reader navigation |
| **Issue** | Screen readers can't identify the search region via landmarks |

---

## Test URLs

### Staging
`https://test-1-mvcbasev3.tiarc-staging.co.uk/amr-test/search`

---

## Summary of Findings

### Test Results Summary

| Category | Pass | Fail | Not Tested |
|----------|------|------|------------|
| Behavior (11) | 5 | 6 | 0 |
| Styling (7) | 5 | 1 | 1 |
| Color Variables (7) | 0 | 0 | 7 |
| Font Variables (1) | 0 | 0 | 1 |
| Responsive (3) | 1 | 0 | 2 |
| Edge Cases (5) | 4 | 1 | 0 |
| Security (5) | 4 | 1 | 0 |
| Accessibility (4) | 2 | 2 | 0 |
| **Total (43)** | **21** | **11** | **11** |

### Bugs by Severity

| Severity | Count | Bug IDs |
|----------|-------|---------|
| **Critical** | 1 | BUG-SEARCH-014 (CSE indexes interactiveschools.com, not the staging/client site) |
| **High** | 5 | BUG-SEARCH-002, 003, 004, 012, 013 (SCSS variables, search button hidden, phantom pagination) |
| **Medium** | 7 | BUG-SEARCH-001, 005, 007, 008, 009, 011, 015 (hardcoded colors, missing truncation, results count, suggestion count, encodeURI) |
| **Low** | 3 | BUG-SEARCH-006, 010, 016 (intentional hardcoded black, Google CSE spell check default, missing ARIA landmark) |

### Key Issues (Browser-Verified)

1. **Search button completely hidden** (BUG-SEARCH-012) - `td.gsc-search-button` is `display: none` from Google CSE default CSS. Site SCSS styles the child button but never overrides the parent container. Users can ONLY search via Enter key.
2. **10 results per page instead of 5** (BUG-SEARCH-009) - Confirmed: 10 results counted on page. No `resultSetSize` config in `Search.js`.
3. **8+ auto-suggestions instead of max 3** (BUG-SEARCH-011) - Typing "te" showed: tesco, temu, teams, tesco near me, tesco mobile, temu uk, tell me lies, tesco clubcard+
4. **No title truncation** (BUG-SEARCH-007) - Computed: `overflow: hidden`, `white-space: normal`, no `-webkit-line-clamp`. Titles wrap freely.
5. **No body copy truncation** (BUG-SEARCH-008) - Computed: `overflow: visible`, no line-clamp. Snippets are not truncated.
6. **Spell check works** - Google CSE "Showing results for..." autocorrect confirmed working by default.
7. **SCSS variables prevent theme cascade** - `lighten()` and `rgba()` require compile-time SCSS variables.
8. **Hardcoded #e4e7e9** - Search box bg confirmed `rgb(228, 231, 233)` instead of CSS variable.
9. **Hardcoded #c55f3c** - Result bold text uses non-variable accent color.
10. **Phantom pagination pages** (BUG-SEARCH-013) - "admission" search shows 10 pages but only ~51 results (6 pages). Pages 7-10 show "no results" dead end. Google CSE estimates 100 results upfront. Fix: set `resultSetSize` in CSE config.
11. **CRITICAL: Wrong search domain** (BUG-SEARCH-014) - Google CSE key `52fff56a395a748d1` is configured to search `interactiveschools.com`, NOT the staging site. All results come from the wrong domain. Staging site pages (e.g., Head's Welcome with "Reigatian") return zero results. Each client needs their own CSE key with their domain configured.

---

## Revision History

| Date | Author | Changes |
|------|--------|---------|
| 2026-02-12 | Claude | Initial test case document created |
| 2026-02-12 | Claude | Browser testing at 375px & 1512px on staging. Added BUG-SEARCH-012 (hidden search button). Updated all behavior & styling test results. |
| 2026-02-12 | Claude | Pagination deep-dive: "admission" search pages 7-10 show empty results. Added BUG-SEARCH-013 (phantom pagination). |
| 2026-02-12 | Claude | Domain indexing test: CSE indexes interactiveschools.com, not staging. Added BUG-SEARCH-014 (Critical). |
| 2026-02-12 | Claude | Edge case, security & accessibility testing. Added BUG-SEARCH-015 (encodeURI), BUG-SEARCH-016 (missing ARIA). Final: 16 bugs (1 Critical, 5 High, 7 Medium, 3 Low). 21 pass / 11 fail / 11 not tested across 43 test cases. |
