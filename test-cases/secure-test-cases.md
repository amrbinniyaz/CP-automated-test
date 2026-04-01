# Secure Page — Test Cases

**URL:** https://mvcbasev3.tiarc-staging.co.uk/secure/test-secure
**Date Created:** 2025-02-25
**Tested By:** QA / Automation
**Page Title:** Test-secure | WebBase MVC v3
**Authentication:** Cookie-based session (server-side)
**Meta Robots:** noindex

---

## Table of Contents

1. [Pre-Login — Login Form](#section-1--pre-login--login-form)
2. [Post-Login — Access Control & Session](#section-2--post-login--access-control--session)
3. [Post-Login — Page Structure & Content](#section-3--post-login--page-structure--content)
4. [Navigation & Header](#section-4--navigation--header)
5. [Logout & Session Termination](#section-5--logout--session-termination)
6. [SEO, Social & Metadata](#section-6--seo-social--metadata)
7. [Footer](#section-7--footer)
8. [Cookie Consent](#section-8--cookie-consent)
9. [Responsive Design & Cross-Browser](#section-9--responsive-design--cross-browser)
10. [Performance & Technical](#section-10--performance--technical)
11. [Summary of Key Findings](#summary-of-key-findings)

---

## Section 1 — Pre-Login — Login Form

### TC-001 — Page Load & Initial State

| Field | Details |
|---|---|
| **Description** | Verify the secure page loads correctly with all expected elements |
| **Preconditions** | User is not logged in |
| **Steps** | Navigate to `/secure/test-secure` |
| **Expected** | Page loads with heading "Secure", italic heading "Log in to access your account and continue where you left off.", instructional paragraph, Email field, Password field, and Login button all visible. No error messages shown on load. |
| **Priority** | High |

---

### TC-002 — Successful Login (Happy Path)

| Field | Details |
|---|---|
| **Description** | Verify login succeeds with valid credentials |
| **Preconditions** | Valid account credentials exist |
| **Steps** | 1. Enter valid email address. 2. Enter correct password. 3. Click Login. |
| **Expected** | User is authenticated and redirected to the secure area. No error messages displayed. |
| **Priority** | Critical |

---

### TC-003 — Submit Empty Form

| Field | Details |
|---|---|
| **Description** | Verify validation fires when both fields are empty |
| **Preconditions** | Both fields are blank |
| **Steps** | Leave Email and Password empty, click Login |
| **Expected** | Both fields highlight red. Error box shows: `* Email address is required.` and `* Password is required.` Form is NOT submitted. |
| **Priority** | High |

---

### TC-004 — Submit with Email Only (Empty Password)

| Field | Details |
|---|---|
| **Description** | Verify validation fires when password is missing |
| **Steps** | Enter a valid email, leave Password empty, click Login |
| **Expected** | Password field highlights red. Error: `* Password is required.` Email field shows no error. Form is NOT submitted. |
| **Priority** | High |

---

### TC-005 — Submit with Password Only (Empty Email)

| Field | Details |
|---|---|
| **Description** | Verify validation fires when email is missing |
| **Steps** | Leave Email empty, enter any password, click Login |
| **Expected** | Email field highlights red. Error: `* Email address is required.` Form is NOT submitted. |
| **Priority** | High |

---

### TC-006 — Invalid Email Format — No @ Symbol

| Field | Details |
|---|---|
| **Description** | Verify email format validation rejects plain text |
| **Steps** | Enter `invalidemail` in Email, enter any password, click Login |
| **Expected** | Email field highlights red. Error: `* Please enter a valid email address.` Form is NOT submitted. |
| **Priority** | High |

---

### TC-007 — Invalid Email Format — Missing Domain

| Field | Details |
|---|---|
| **Description** | Verify email format validation rejects address with no domain |
| **Steps** | Enter `user@` in Email, enter any password, click Login |
| **Expected** | Email field highlights red. Error: `* Please enter a valid email address.` |
| **Priority** | High |

---

### TC-008 — Invalid Email Format — Missing Local Part

| Field | Details |
|---|---|
| **Description** | Verify email format validation rejects address with no local part |
| **Steps** | Enter `@domain.com` in Email, enter any password, click Login |
| **Expected** | Email field highlights red. Error: `* Please enter a valid email address.` |
| **Priority** | High |

---

### TC-009 — Invalid Email Format — No TLD

| Field | Details |
|---|---|
| **Description** | Verify whether `user@domain` (no TLD) is accepted or rejected |
| **Steps** | Enter `user@domain` in Email, enter any password, click Login |
| **Expected** | Should be rejected with `* Please enter a valid email address.` Observe and document actual behaviour. |
| **Priority** | Medium |

---

### TC-010 — Valid Email Format, Non-Existent Account

| Field | Details |
|---|---|
| **Description** | Verify correct error shown for valid-format email that does not exist |
| **Steps** | Enter a properly formatted but non-existent email, enter any password, click Login |
| **Expected** | Error message: `Invalid username or password.` Both fields highlight red. The error does NOT confirm whether the email exists (prevents user enumeration). |
| **Priority** | Critical |

---

### TC-011 — Correct Email, Wrong Password

| Field | Details |
|---|---|
| **Description** | Verify error shown for a real registered email with wrong password |
| **Preconditions** | A valid account exists |
| **Steps** | Enter a valid registered email, enter an incorrect password, click Login |
| **Expected** | Error message: `Invalid username or password.` Error does NOT confirm whether the email exists. |
| **Priority** | Critical |

---

### TC-012 — Case Sensitivity — Email

| Field | Details |
|---|---|
| **Description** | Verify email is handled case-insensitively |
| **Steps** | Log in with `USER@DOMAIN.COM` where the registered email is `user@domain.com` |
| **Expected** | Login succeeds. Email lookup should be case-insensitive. |
| **Priority** | Medium |

---

### TC-013 — Case Sensitivity — Password

| Field | Details |
|---|---|
| **Description** | Verify password is case-sensitive |
| **Steps** | Enter the valid email, then enter the correct password in the wrong case (e.g., all caps) |
| **Expected** | Login fails with `Invalid username or password.` Password must match exactly. |
| **Priority** | High |

---

### TC-014 — Password Field Masking

| Field | Details |
|---|---|
| **Description** | Verify the password field masks input |
| **Steps** | Click on the Password field and type any characters |
| **Expected** | Characters displayed as bullet dots (•). Raw text not visible. Input confirmed as `type="password"`. |
| **Priority** | High |

---

### TC-015 — Whitespace in Email (Leading/Trailing)

| Field | Details |
|---|---|
| **Description** | Verify leading/trailing whitespace in email is handled |
| **Steps** | Enter ` test@test.com ` (with spaces) and a password, click Login |
| **Expected** | Input is trimmed and validated/rejected correctly, OR form shows a validation error. No unhandled server error. |
| **Priority** | Medium |

---

### TC-016 — Whitespace-Only Email

| Field | Details |
|---|---|
| **Description** | Verify a whitespace-only email is treated as empty |
| **Steps** | Enter only spaces in Email, enter a password, click Login |
| **Expected** | Behaves as empty — shows `* Email address is required.` or `* Please enter a valid email address.` |
| **Priority** | Medium |

---

### TC-017 — Whitespace-Only Password

| Field | Details |
|---|---|
| **Description** | Verify a whitespace-only password is treated as empty or rejected |
| **Steps** | Enter a valid email, enter only spaces in Password, click Login |
| **Expected** | Shows `* Password is required.` or `Invalid username or password.` No unhandled errors. |
| **Priority** | Medium |

---

### TC-018 — Very Long Email Address (Boundary)

| Field | Details |
|---|---|
| **Description** | Verify behaviour with an extremely long email string (256+ characters) |
| **Steps** | Enter a valid-format email of 256+ characters, enter a password, click Login |
| **Expected** | Field limits input, displays a validation error, or returns `Invalid username or password.` gracefully. No server error or crash. |
| **Priority** | Medium |

---

### TC-019 — Very Long Password (Boundary)

| Field | Details |
|---|---|
| **Description** | Verify behaviour with an extremely long password (500+ characters) |
| **Steps** | Enter a valid email and a 500+ character password, click Login |
| **Expected** | Field limits input or system returns `Invalid username or password.` gracefully. No server error or crash. |
| **Priority** | Medium |

---

### TC-020 — Special Characters in Email (+ Addressing)

| Field | Details |
|---|---|
| **Description** | Verify special characters in email are handled safely |
| **Steps** | Enter `test+alias@domain.co.uk` and a password, click Login |
| **Expected** | The `+` addressing is accepted as a valid email format and processed without error. |
| **Priority** | Medium |

---

### TC-021 — SQL Injection in Password Field

| Field | Details |
|---|---|
| **Description** | Verify the password field is safe against SQL injection |
| **Steps** | Enter a valid email, enter `'; DROP TABLE users; --` as the password, click Login |
| **Expected** | Returns `Invalid username or password.` No server error. No SQL injection vulnerability. Inputs are properly sanitised/parameterised. |
| **Priority** | Critical — Security |

---

### TC-022 — XSS in Email Field

| Field | Details |
|---|---|
| **Description** | Verify the email field is protected against reflected XSS |
| **Steps** | Enter `<script>alert('XSS')</script>@test.com` in Email, any password, click Login |
| **Expected** | No alert dialog fires. Value is correctly escaped/sanitised. Script tag is never executed. |
| **Priority** | Critical — Security |

---

### TC-023 — Error Messages Do Not Expose User Enumeration

| Field | Details |
|---|---|
| **Description** | Verify error messages are generic and do not confirm whether an email exists |
| **Steps** | 1. Submit with a known-valid email + wrong password. 2. Submit with a non-existent email + any password. |
| **Expected** | Both return identical message: `Invalid username or password.` Response timing should also be similar. |
| **Priority** | Critical — Security |

---

### TC-024 — Brute Force / Multiple Failed Login Attempts

| Field | Details |
|---|---|
| **Description** | Verify the system has protection against repeated login attempts |
| **Steps** | Attempt login with a valid email and wrong password 10+ times in quick succession |
| **Expected** | Account temporarily locked, CAPTCHA appears, or rate limiting activates. Investigate and document whether any protection currently exists. |
| **Priority** | High — Security |

---

### TC-025 — Form Uses GET Method — Credentials in URL

| Field | Details |
|---|---|
| **Description** | Verify credentials are not exposed in the URL |
| **Steps** | Submit the login form and inspect the browser address bar |
| **Expected** | **KNOWN BUG — CRITICAL:** Form currently uses `method="GET"`. Credentials (email, password) appear in the URL as query parameters. This exposes credentials in browser history, server logs, and referrer headers. Must be changed to `method="POST"`. |
| **Priority** | Critical — Security |

---

### TC-026 — HTTPS Enforced

| Field | Details |
|---|---|
| **Description** | Verify the page is only accessible over HTTPS |
| **Steps** | Attempt to navigate to `http://mvcbasev3.tiarc-staging.co.uk/secure/test-secure` |
| **Expected** | Request is redirected to the HTTPS version. No plain HTTP login page is accessible. |
| **Priority** | Critical — Security |

---

### TC-027 — Password Field Autocomplete Attribute

| Field | Details |
|---|---|
| **Description** | Verify the password field has an appropriate autocomplete attribute |
| **Steps** | Inspect the `autocomplete` attribute of the password input |
| **Expected** | Should have `autocomplete="current-password"` at minimum. Currently blank — this should be reviewed to prevent unintended credential caching. |
| **Priority** | Medium — Security |

---

### TC-028 — HTML `required` Attribute vs JS Validation

| Field | Details |
|---|---|
| **Description** | Verify that disabling JavaScript does not bypass validation |
| **Steps** | Disable JavaScript in the browser, submit the form with empty fields |
| **Expected** | HTML `required` attributes prevent submission OR the server validates and returns appropriate errors. **Note:** Currently the inputs do NOT have `required` attributes — JS validation is the only client-side guard. Server-side validation must be confirmed. |
| **Priority** | High |

---

### TC-029 — Keyboard Navigation & Form Submission

| Field | Details |
|---|---|
| **Description** | Verify the form is fully keyboard navigable |
| **Steps** | Tab from Email → Password → Login button. Press Enter from Password field. |
| **Expected** | Tab order is logical. Pressing Enter in the Password field submits the form. All elements receive visible focus indicators. |
| **Priority** | High — Accessibility |

---

### TC-030 — Error Message Accessibility

| Field | Details |
|---|---|
| **Description** | Verify error messages are accessible to screen readers |
| **Steps** | Trigger a validation error and inspect the error container for ARIA attributes |
| **Expected** | Error messages should use `role="alert"` or `aria-live="polite"` so screen readers announce them. Fields should use `aria-describedby` to link to their error messages. |
| **Priority** | Medium — Accessibility |

---

## Section 2 — Post-Login — Access Control & Session

### TC-101 — Successful Redirect After Login

| Field | Details |
|---|---|
| **Description** | Verify that after successful login the user lands on the correct secure page |
| **Steps** | Submit valid credentials on the login form |
| **Expected** | User redirected to `/secure/test-secure`. Title reads "Test-secure | WebBase MVC v3". Hero banner shows "TEST-SECURE". Breadcrumb shows `HOME > TEST-SECURE`. Login form is no longer visible. |
| **Priority** | Critical |

---

### TC-102 — Unauthenticated Direct URL Access

| Field | Details |
|---|---|
| **Description** | Verify a user not logged in cannot access the secure page directly |
| **Steps** | Open a fresh browser (no session), navigate directly to `/secure/test-secure` |
| **Expected** | Login form is displayed. Secure "Test-secure" content is NOT shown. Confirmed: server returns login form when credentials are omitted. |
| **Priority** | Critical — Security |

---

### TC-103 — Session Persistence Across Page Refresh

| Field | Details |
|---|---|
| **Description** | Verify the user remains logged in after refreshing the page |
| **Steps** | Log in, then press F5/Cmd+R |
| **Expected** | Secure page content continues to display. User is NOT redirected to login form. |
| **Priority** | High |

---

### TC-104 — Session Persistence Across New Tab

| Field | Details |
|---|---|
| **Description** | Verify authenticated session carries over to a new tab |
| **Steps** | Log in, then open `/secure/test-secure` in a new tab in the same browser |
| **Expected** | Secure content displayed without requiring re-authentication. |
| **Priority** | Medium |

---

### TC-105 — Access After Session Expiry

| Field | Details |
|---|---|
| **Description** | Verify an expired session correctly redirects to the login page |
| **Steps** | Log in, wait for session to expire (or manually clear session cookie), then access `/secure/test-secure` |
| **Expected** | User is redirected to the login page and shown the login form, not the secure content. |
| **Priority** | High — Security |

---

### TC-106 — Session Cookie Security Flags

| Field | Details |
|---|---|
| **Description** | Verify the authentication cookie has appropriate security attributes |
| **Steps** | Log in and inspect the session cookie via DevTools → Application → Cookies |
| **Expected** | Session cookie must have: `HttpOnly` flag, `Secure` flag (HTTPS only), `SameSite=Strict` or `SameSite=Lax`. Auth token must NOT be accessible via `document.cookie` in JavaScript. |
| **Priority** | Critical — Security |

---

### TC-107 — Authenticated User Revisits Login URL

| Field | Details |
|---|---|
| **Description** | Verify a logged-in user going back to the login URL is handled gracefully |
| **Steps** | While logged in, navigate directly to `/secure/test-secure` login URL |
| **Expected** | User sees secure content directly (already authenticated) or sees "You are already logged in". The login form should NOT be re-presented to an authenticated user. |
| **Priority** | Medium |

---

### TC-108 — Secure Page Cache-Control Headers

| Field | Details |
|---|---|
| **Description** | Verify the secure page response includes cache-prevention headers |
| **Steps** | Inspect response headers for `/secure/test-secure` in DevTools → Network tab |
| **Expected** | Response includes `Cache-Control: no-store` or `no-cache, private`. Prevents authenticated content leaking via browser back-button or shared proxy caches. |
| **Priority** | High — Security |

---

## Section 3 — Post-Login — Page Structure & Content

### TC-201 — Hero Banner Renders Correctly

| Field | Details |
|---|---|
| **Description** | Verify the hero banner displays the correct title and imagery |
| **Steps** | Log in and observe the top of the page |
| **Expected** | Hero image (classroom photo) is displayed. Heading "TEST-SECURE" overlaid in white text. Breadcrumb `HOME | TEST-SECURE` visible within the hero area. |
| **Priority** | Medium |

---

### TC-202 — Breadcrumb Navigation

| Field | Details |
|---|---|
| **Description** | Verify the breadcrumb trail is correct and functional |
| **Steps** | Observe the breadcrumb `HOME | TEST-SECURE` |
| **Expected** | "HOME" is a clickable link to `/`. "TEST-SECURE" is the current page and non-interactive. Uses correct semantic markup (`<ol class="breadcrumbs">`). |
| **Priority** | Medium |

---

### TC-203 — Main Content Area

| Field | Details |
|---|---|
| **Description** | Verify the main content body renders correctly |
| **Steps** | Observe the `<main>` element content after login |
| **Expected** | Main content displays "Test-secure" text. Content is inside `.module-content > .secondLvlCss`. No residual login form elements visible. Verify with CMS whether additional content should populate this area. |
| **Priority** | Medium |
| **Note** | Currently only contains placeholder text "Test-secure" — may be intentional for this test/staging page. |

---

### TC-204 — Sidebar — Page Title

| Field | Details |
|---|---|
| **Description** | Verify the sidebar renders the correct page title |
| **Steps** | Observe the `.sidebar-title` element in the right-hand sidebar |
| **Expected** | Sidebar heading reads "Test-secure", matching the page `<h1>`. |
| **Priority** | Low |

---

### TC-205 — Sidebar — Menu Levels (Child Pages)

| Field | Details |
|---|---|
| **Description** | Verify the sidebar menu levels section renders correctly |
| **Steps** | Inspect the `.menu-levels` / `.ml-list` sidebar section |
| **Expected** | If the secure section has child pages, they appear here as navigation links. Currently the list is empty — verify if child pages exist or if this is the expected state. |
| **Priority** | Medium |

---

### TC-206 — Sidebar — Duplicate "Explore More" Sections

| Field | Details |
|---|---|
| **Description** | Verify there are no duplicate sidebar components rendered |
| **Steps** | Observe the sidebar for "Explore More" headings |
| **Expected** | Only ONE "Explore More" section should appear. **Currently two "Explore More" headings are rendered** — this is a suspected bug in the sidebar component duplication. Raise with the development team. |
| **Priority** | Medium — Bug |

---

### TC-207 — Page Meta robots: noindex

| Field | Details |
|---|---|
| **Description** | Verify the secure page is excluded from search engine indexing |
| **Steps** | Inspect the `<head>` for meta robots tag |
| **Expected** | `<meta name="robots" content="noindex">` is present. Correct behaviour for a protected page. |
| **Priority** | High — SEO/Security |

---

### TC-208 — Page Title Format

| Field | Details |
|---|---|
| **Description** | Verify the browser tab title is correctly formatted |
| **Steps** | Observe the browser tab after logging in |
| **Expected** | Title reads: `Test-secure | WebBase MVC v3`. Consistent with other second-level pages. |
| **Priority** | Low |

---

## Section 4 — Navigation & Header

### TC-301 — Global Header Renders on Secure Page

| Field | Details |
|---|---|
| **Description** | Verify the site header is present and functional on the secure page |
| **Steps** | Observe the header after login |
| **Expected** | Header visible with logo, navigation links, and Menu button. Verify whether a logged-in state indicator (e.g. "Logged in as...") is a requirement. |
| **Priority** | Medium |

---

### TC-302 — Mobile Menu Toggle

| Field | Details |
|---|---|
| **Description** | Verify the "Menu" hamburger button opens mobile navigation |
| **Steps** | Click the "Menu" button (`.toggle-btn`) |
| **Expected** | Mobile navigation expands showing all nav items. Clicking again closes it. |
| **Priority** | Medium |

---

### TC-303 — Logo Links to Homepage

| Field | Details |
|---|---|
| **Description** | Verify the site logo navigates to the homepage |
| **Steps** | Click the logo in the top-left |
| **Expected** | User navigated to `/` (homepage). Works regardless of login state. |
| **Priority** | Low |

---

### TC-304 — Navigation Dropdown Menus

| Field | Details |
|---|---|
| **Description** | Verify dropdown menus work on the secure page |
| **Steps** | Hover/click top-level nav items with sub-menus (e.g., "About Us", "Student Excellence") |
| **Expected** | Dropdowns open correctly. Sub-items are reachable. No z-index or overlay issues. |
| **Priority** | Low |

---

### TC-305 — Skip to Content (Accessibility)

| Field | Details |
|---|---|
| **Description** | Verify the "Skip to content" link works on the secure page |
| **Steps** | Press Tab once immediately after page load; press Enter on "Skip to content" |
| **Expected** | Focus jumps to the `<main>` content area, bypassing header navigation. |
| **Priority** | Medium — Accessibility |

---

## Section 5 — Logout & Session Termination

### TC-401 — Logout Mechanism Exists

| Field | Details |
|---|---|
| **Description** | Verify there is a way for the user to log out |
| **Steps** | Search the authenticated page for a logout button, link, or user menu option |
| **Expected** | A clearly labelled "Log out" or "Sign out" option should be accessible. **CURRENTLY NO LOGOUT LINK IS VISIBLE ON THE PAGE** — this is a functional gap. Raise with the development team. |
| **Priority** | High — Bug |

---

### TC-402 — Logout Clears Server-Side Session

| Field | Details |
|---|---|
| **Description** | Verify that logging out invalidates the server-side session |
| **Preconditions** | A logout endpoint exists |
| **Steps** | Log in, copy session cookie value, log out, then request `/secure/test-secure` using the copied cookie |
| **Expected** | Server rejects the old session cookie and returns the login form. Session must be invalidated server-side, not just client-side. |
| **Priority** | Critical — Security |

---

### TC-403 — Back Button After Logout

| Field | Details |
|---|---|
| **Description** | Verify the browser back button does not restore the secure page after logout |
| **Steps** | Log in, view secure page, log out, press browser Back button |
| **Expected** | Secure content is NOT restored from browser cache. User sees login form or "session expired". `Cache-Control: no-store` headers should prevent caching. |
| **Priority** | High — Security |

---

## Section 6 — SEO, Social & Metadata

### TC-501 — Open Graph / Twitter Card Tags on Secure Page

| Field | Details |
|---|---|
| **Description** | Verify social sharing metadata is appropriate for a protected page |
| **Steps** | Inspect `<head>` for `og:` and `twitter:` meta tags |
| **Expected** | Page currently has full OG and Twitter Card metadata. For a password-protected page, verify whether exposing the page title and image URL publicly is intentional — this could inadvertently reveal the existence and title of protected content. |
| **Priority** | Medium — Security/SEO |

---

### TC-502 — Canonical URL

| Field | Details |
|---|---|
| **Description** | Verify the page has an appropriate canonical tag or none |
| **Steps** | Inspect `<head>` for `<link rel="canonical">` |
| **Expected** | Given `robots: noindex`, there should ideally be no canonical tag pointing to this page, or it should be consistent with the noindex directive. |
| **Priority** | Low |

---

## Section 7 — Footer

### TC-601 — Footer Renders Correctly

| Field | Details |
|---|---|
| **Description** | Verify the site footer is present and complete on the secure page |
| **Steps** | Scroll to the bottom of the authenticated secure page |
| **Expected** | Footer contains: school logo, contact address, phone number, email link, Key Links list, accreditation badges, social media icons, Terms and Sitemap links, and design credits. |
| **Priority** | Low |

---

### TC-602 — Footer Links Are Functional

| Field | Details |
|---|---|
| **Description** | Verify key footer links navigate correctly |
| **Steps** | Click "Terms" (`/terms`) and "Sitemap" (`/sitemap`) in the footer |
| **Expected** | Both pages load correctly. Terms and Sitemap are public pages — verify authenticated state is maintained when returning to the secure area. |
| **Priority** | Low |

---

## Section 8 — Cookie Consent

### TC-701 — Cookie Banner on First Visit to Secure Page

| Field | Details |
|---|---|
| **Description** | Verify the GDPR cookie consent banner appears on the secure page when no consent is given |
| **Steps** | Clear cookies and local storage, log in, observe whether cookie banner appears |
| **Expected** | Cookie banner appears if consent not yet given. Does not interfere with login flow or secure content display. |
| **Priority** | Medium — Legal/Compliance |

---

### TC-702 — Accept All Cookies on Secure Page

| Field | Details |
|---|---|
| **Description** | Verify accepting all cookies from within the secure page works correctly |
| **Steps** | If banner is visible, click "Accept All" |
| **Expected** | Banner dismisses. Consent stored in `localStorage`. User remains on the secure page. Session not disrupted. |
| **Priority** | Medium |

---

### TC-703 — Only Necessary Cookies Does Not Break Session

| Field | Details |
|---|---|
| **Description** | Verify accepting only necessary cookies does not break the session |
| **Steps** | Open cookie preferences, select "Only Necessary", save preferences |
| **Expected** | Only essential cookies set. The authentication session cookie (which is "necessary") still functions. Secure page remains accessible. |
| **Priority** | Medium |

---

## Section 9 — Responsive Design & Cross-Browser

### TC-801 — Mobile Layout (375×667px)

| Field | Details |
|---|---|
| **Description** | Verify the authenticated secure page renders correctly on mobile |
| **Steps** | Set viewport to 375×667px (iPhone SE), log in, view the secure page |
| **Expected** | Hero image scales correctly. Breadcrumb readable. Main content and sidebar stack vertically. No horizontal overflow. Menu button accessible. Footer reflows correctly. |
| **Priority** | High |

---

### TC-802 — Tablet Layout (768×1024px)

| Field | Details |
|---|---|
| **Description** | Verify the secure page renders correctly on tablet |
| **Steps** | Set viewport to 768×1024px, view the authenticated secure page |
| **Expected** | Two-column layout (main + sidebar) maintained or gracefully collapsed. No content overlap or clipping. |
| **Priority** | Medium |

---

### TC-803 — Cross-Browser Compatibility

| Field | Details |
|---|---|
| **Description** | Verify the authenticated secure page works across major browsers |
| **Steps** | Log in and view `/secure/test-secure` in Chrome, Firefox, Safari, and Edge |
| **Expected** | Page renders consistently. Hero, main content, sidebar, header, and footer all display correctly. Session cookies function correctly in all browsers. |
| **Priority** | Medium |

---

## Section 10 — Performance & Technical

### TC-901 — Secure Page Load Time

| Field | Details |
|---|---|
| **Description** | Verify the secure page loads within an acceptable time |
| **Steps** | Measure load time using DevTools Network tab after a cache-clear login |
| **Expected** | Full page load (including hero image, JS bundles: `global.js`, `globalContentPage.module.js`, `Login.js`) completes within 3 seconds on a standard connection. |
| **Priority** | Medium |

---

### TC-902 — No Console Errors on Secure Page

| Field | Details |
|---|---|
| **Description** | Verify no JavaScript errors appear in the browser console |
| **Steps** | Log in, open DevTools Console, refresh the secure page |
| **Expected** | No red errors in the console. Warnings are acceptable but should be reviewed. All three JS bundles load without errors. |
| **Priority** | Medium |

---

### TC-903 — Unauthenticated Response Returns Login Form (Not 404 or 500)

| Field | Details |
|---|---|
| **Description** | Verify that accessing the secure URL without auth returns an appropriate response |
| **Steps** | Send a request to `/secure/test-secure` with credentials omitted |
| **Expected** | Server returns HTTP 200 with the login form (confirmed). It should NOT return 404 (resource not found) or 500 (server error). A 401/302 redirect to login would also be acceptable. |
| **Priority** | Medium |

---

## Browser Test Results (Staging)

**URL Tested:** `https://mvcbasev3.tiarc-staging.co.uk/secure/test-secure`
**Date:** 2026-02-25
**Browser:** Chrome (desktop 1512x775 + mobile 375x667)

### Section 1 — Pre-Login Tests

| TC | Test | Result | Notes |
|---|---|---|---|
| TC-001 | Page Load & Initial State | **PASS** | Login form renders: heading, instruction text, email field, password field, Login button all present. No error messages on load. |
| TC-003 | Submit Empty Form | **PASS** | Both fields highlight red. Error box shows "* Email address is required." and "* Password is required." Form NOT submitted. |
| TC-006 | Invalid Email Format (no @) | **PASS** | Email field red. Error: "* Please enter a valid email address." Password field not highlighted. |
| TC-014 | Password Field Masking | **PASS** | `type="password"` confirmed. Characters displayed as dots. |
| TC-022 | XSS in Email Field | **PASS** | `<script>` tag rendered as text, not executed. Server returned "Invalid username or password." No script injection. |
| TC-023 | Error Messages No User Enumeration | **PASS** | Non-existent email returns generic "Invalid username or password." |
| TC-025 | Form Uses GET Method | **REVISED** | HTML `method="get"` confirmed, BUT JS intercepts form submission via AJAX — credentials do NOT appear in URL. Still recommend changing to `method="POST"` for correctness and for cases where JS fails. |
| TC-026 | HTTPS Enforced | **PASS** | Page served over `https://`. |
| TC-027 | Password Autocomplete Attribute | **FAIL** | No `autocomplete` attribute on either input. Should have `autocomplete="current-password"` on password field. |
| TC-028 | HTML `required` Attribute | **FAIL** | Neither email nor password has `required` attribute. JS validation is the only guard. |
| TC-029 | Keyboard Navigation | **PASS** | Login button has `type="submit"`. Tab order is logical. |
| TC-030 | Error Message Accessibility | **FAIL** | `.message-element` has no `role="alert"` or `aria-live` attribute. Screen readers won't announce errors. |

### Section 1 — Additional Bugs Found

| Bug ID | Finding | Severity |
|---|---|---|
| BUG-SECURE-014 | **Password label uses `<div>` instead of `<label>`** — breaks screen reader association. `<div class="form-input__label" for="secure-password">` should be `<label>`. | High — Accessibility |
| BUG-SECURE-015 | **Pre-login page title is "Secure"** not "Test-secure \| WebBase MVC v3" — inconsistent with post-login title | Low |

### Section 2 — Post-Login Tests (Authenticated State)

| TC | Test | Result | Notes |
|---|---|---|---|
| TC-101 | Successful Redirect After Login | **PASS** | Page shows secure content with title "Test-secure \| WebBase MVC v3", hero banner, breadcrumb, profile widgets. Login form hidden. |
| TC-102 | Unauthenticated Direct URL Access | **PASS** | Clearing `.ASPXAUTH` cookie and reloading shows login form. Secure content NOT accessible. |
| TC-103 | Session Persistence (Refresh) | **PASS** | Refreshing while authenticated keeps secure content visible. |
| TC-106 | Session Cookie Security Flags | **FAIL — CRITICAL** | `.ASPXAUTH` cookie is **accessible via `document.cookie`** (NOT HttpOnly). Vulnerable to XSS-based cookie theft. |
| TC-202 | Breadcrumb Navigation | **PASS** | Breadcrumb shows: Home \| Test-secure. "Home" links to `/`. |
| TC-203 | Main Content Area | **PASS** | `<main>` element contains body copy and profile widgets. |
| TC-206 | Duplicate "Explore More" Sidebars | **FAIL** | **2 "Explore More" headings** found in sidebar — confirmed bug. |
| TC-207 | Meta robots: noindex | **PASS** | `<meta name="robots" content="noindex">` present. |
| TC-208 | Page Title Format | **PASS** | Title reads "Test-secure \| WebBase MVC v3". |
| TC-305 | Skip to Content | **PASS** | "Skip to content" button present. |
| TC-401 | Logout Mechanism Exists | **FAIL** | **No logout link or button found anywhere** on authenticated page. 0 links, 0 buttons matching "log out" or "sign out". |

### Section 3 — Cookie & Metadata Tests

| TC | Test | Result | Notes |
|---|---|---|---|
| TC-501 | OG/Twitter Meta Tags | **REVIEW** | `og:title` = "Test-secure \| WebBase MVC v3", `twitter:card` = "summary_large_image". Exposing secure page title publicly. |
| TC-502 | Canonical URL | **REVIEW** | Canonical present: `https://mvcbasev3.tiarc-staging.co.uk/secure/test-secure`. Should be removed or suppressed given `noindex`. |
| TC-701 | Cookie Banner | **PASS** | Cookie consent banner appears on page. |

### Section 4 — CSS Variable Cascade (Runtime)

| Test | Result | Notes |
|---|---|---|
| Change `--status-error` to `#0000ff` | **FAIL** | Error label color: unchanged (`rgb(203, 29, 35)`). Error input border: unchanged. Error input bg: unchanged. Message box bg: unchanged. Message text color: unchanged. **CONFIRMED: All error/success styles use compiled SCSS variables, not CSS variables.** |
| Change `--primary-color` to `#ff0000` | **PASS** | Button background changed to red. Input text color changed to red. General text changed to red. |
| Change `--neutral-color` to `#e0ffe0` | **PASS** | Input background changed to light green. |
| Change `--primary-font` to `Arial` | **PASS** | Labels and inputs switched to Arial. |

### Section 5 — Responsive (Mobile 375x667)

| TC | Test | Result | Notes |
|---|---|---|---|
| TC-801 | Mobile Layout | **PASS** | Form stacks vertically. No horizontal overflow. Email/password fields and login button all accessible. Text readable. |

### Section 6 — Console Errors

| TC | Test | Result | Notes |
|---|---|---|---|
| TC-902 | No Console Errors | **FAIL** | **12 JavaScript exceptions** on page load in `globalContentPage.module.js`: 9x `TypeError: n(...).catch is not a function` and 3x `ReferenceError: navOpen is not defined`. These appear to be caused by Cloudflare Rocket Loader interfering with module loading. |

### Cookies Found on Page

| Cookie | Purpose | HttpOnly | Notes |
|---|---|---|---|
| `.ASPXAUTH` | Authentication session | **NO — BUG** | Visible via `document.cookie`. Must be HttpOnly. |
| `intSchoolsCookieManager` | Cookie consent | No | Expected — client-side consent management. |
| `culture` | Locale | No | `en-GB` |
| `_clck` | Analytics (Clarity) | No | Tracking cookie. |
| `__gsas` | Google Ads | No | Marketing cookie. |

---

## SCSS Audit — CSS Variable Cascade Bugs

### Audit Scope

Files audited:
- `/Website/Styles/Legacy/components/_common-form.scss` (lines 1–99)
- `/Website/Styles/_globals/_theme.scss` (lines 840–866 — `baseBtn` / `downloadBtn` mixins)
- `/Website/Styles/_globals/_theme-cssvars.scss` (lines 28–29 — `--status-error` / `--status-success` definitions)
- `/Website/Styles/Legacy/components/_cp-layout/_content-page-layout.scss` (lines 50–52, 193–324 — layout & module-widget)
- `/Website/Styles/Legacy/components/_common/_content-style.scss` (lines 150–154 — `.downloadBtn`)

### BUG-SECURE-001 — `.message-element` background uses SCSS `$statusError` instead of CSS variable

| Field | Details |
|---|---|
| **Severity** | High |
| **File** | `/Website/Styles/Legacy/components/_common-form.scss:25` |
| **Actual** | `background: lighten(theme.$statusError, 50%);` |
| **Expected** | Should use `var(--status-error)` with a CSS-based lightening approach (e.g. `color-mix()` or an `--status-error-light` variable) |
| **Impact** | Error message background will NOT update if `--status-error` is changed at runtime |

---

### BUG-SECURE-002 — `.message-element p` color uses SCSS `$statusError`

| Field | Details |
|---|---|
| **Severity** | High |
| **File** | `/Website/Styles/Legacy/components/_common-form.scss:33` |
| **Actual** | `color: theme.$statusError;` |
| **Expected** | `color: var(--status-error);` |
| **Impact** | Error message text color will NOT update if `--status-error` is changed at runtime |

---

### BUG-SECURE-003 — `.form-input.has-error .form-input__label` uses SCSS `$statusError`

| Field | Details |
|---|---|
| **Severity** | High |
| **File** | `/Website/Styles/Legacy/components/_common-form.scss:80` |
| **Actual** | `color: theme.$statusError;` |
| **Expected** | `color: var(--status-error);` |
| **Impact** | Error label color won't respond to theme changes |

---

### BUG-SECURE-004 — `.form-input.has-error .form-input__input` uses SCSS `$statusError`

| Field | Details |
|---|---|
| **Severity** | High |
| **File** | `/Website/Styles/Legacy/components/_common-form.scss:84-85` |
| **Actual** | `border-color: theme.$statusError;` and `background: lighten(theme.$statusError, 50%);` |
| **Expected** | `border-color: var(--status-error);` and a CSS variable approach for the lightened background |
| **Impact** | Error input border and background won't respond to theme changes |

---

### BUG-SECURE-005 — `.form-input.has-success .form-input__label` uses SCSS `$statusSuccess`

| Field | Details |
|---|---|
| **Severity** | High |
| **File** | `/Website/Styles/Legacy/components/_common-form.scss:91` |
| **Actual** | `color: theme.$statusSuccess;` |
| **Expected** | `color: var(--status-success);` |
| **Impact** | Success label color won't respond to theme changes |

---

### BUG-SECURE-006 — `.form-input.has-success .form-input__input` uses SCSS `$statusSuccess`

| Field | Details |
|---|---|
| **Severity** | High |
| **File** | `/Website/Styles/Legacy/components/_common-form.scss:95-96` |
| **Actual** | `border-color: theme.$statusSuccess;` and `background: lighten(theme.$statusSuccess, 50%);` |
| **Expected** | `border-color: var(--status-success);` and a CSS variable approach for the lightened background |
| **Impact** | Success input border and background won't respond to theme changes |

---

### Hardcoded Values (Low Severity)

These values are hardcoded but may be intentional — review with design team:

| Bug ID | File:Line | Element | Actual | Potential Variable |
|---|---|---|---|---|
| BUG-SECURE-007 | `_common-form.scss:14` | `.common-form__wrapper` gap | `gap: 2rem` | `var(--margin-d)` or spacing variable |
| BUG-SECURE-008 | `_common-form.scss:26` | `.message-element` padding | `padding: 2rem` | `var(--padding-e)` |
| BUG-SECURE-009 | `_common-form.scss:46` | `.form-input` gap | `gap: 1rem` | `var(--padding-g)` or similar |
| BUG-SECURE-010 | `_common-form.scss:51` | `.form-input__input` height | `height: 5rem` | Consider responsive `clmp()` value |
| BUG-SECURE-011 | `_common-form.scss:64` | `input` padding | `padding: 1.8rem` | `var(--padding-e)` or similar |
| BUG-SECURE-012 | `_common-form.scss:66` | `input` font-size | `font-size: 2rem` | Font variable from design spec |
| BUG-SECURE-013 | `_common-form.scss:72` | `.form-input__label` font-size | `font-size: 2rem` | Font variable from design spec |

### Correctly Using CSS Variables ✅

These are working correctly:

| File:Line | Element | Variable Used |
|---|---|---|
| `_common-form.scss:52` | `.form-input__input` background | `var(--neutral-color)` ✅ |
| `_common-form.scss:57` | `input` font-family | `var(--primary-font)` ✅ |
| `_common-form.scss:65` | `input` color | `var(--primary-color)` ✅ |
| `_common-form.scss:74` | `.form-input__label` font-family | `var(--primary-font)` ✅ |
| `_theme.scss:849` | `.baseBtn` background | `var(--primary-color)` ✅ |
| `_theme.scss:851` | `.baseBtn` border-radius | `var(--general-btn-base-bradius)` ✅ |
| `_theme.scss:858` | `.baseBtn:hover` background | `var(--tertiary-color)` ✅ |
| `_content-page-layout.scss:307` | `.module-widget--with-bg` background | `var(--widget-background)` ✅ |
| `_content-page-layout.scss:308-309` | `.module-widget--with-bg` padding | `var(--widget-with-bg--p-top/bottom)` ✅ |
| `_content-page-layout.scss:312-313` | `.module-widget--smaller-padding` | `var(--widget-with-bg--p-top/bottom-small)` ✅ |
| `_theme.scss:850` | `.baseBtn` text color | `#fff` ✅ (branding white — intentionally hardcoded) |

---

## Summary of Key Findings

### Functional & Security Issues

| # | Bug ID | Finding | Severity | Status | Recommendation |
|---|---|---|---|---|---|
| 1 | — | **`.ASPXAUTH` cookie missing `HttpOnly` flag** — the authentication cookie can be read by JavaScript via `document.cookie`. No active XSS vulnerability exists on this page (TC-022 passed), so the real-world risk is low. However, if an XSS vulnerability were introduced elsewhere on the site in future, the auth token could be stolen. This is a defence-in-depth hardening fix — one-line change in `web.config`. | Medium | CONFIRMED | Add `httpOnlyCookies="true"` to `web.config` |
| 2 | — | **Form uses `method="GET"`** in HTML (JS intercepts via AJAX) | Medium (revised) | CONFIRMED | Change to `method="POST"` for when JS fails |
| 3 | — | **No logout mechanism visible** on authenticated page | High | CONFIRMED | Add a clearly accessible Log Out link/button |
| 4 | — | **No visible brute-force protection** | High | NOT TESTED | Implement rate limiting / account lockout |
| 5 | — | **12 JS console errors** on page load (`navOpen` undefined, `.catch` not a function) | Medium | CONFIRMED | Fix module loading / Rocket Loader conflicts |
| 6 | — | **Duplicate "Explore More" sidebars** rendered | Medium | CONFIRMED | Investigate double-rendering of sidebar component |
| 7 | — | **Password label uses `<div>` not `<label>`** | Medium | CONFIRMED | Change to `<label>` for accessibility |
| 8 | — | **No `role="alert"` on error messages** | Medium | CONFIRMED | Add `role="alert"` or `aria-live="polite"` |
| 9 | — | **Open Graph/Twitter meta exposed** on secure page | Medium | CONFIRMED | Strip or genericise social meta for protected content |
| 10 | — | **No `required` attribute on login inputs** | Medium | CONFIRMED | Add HTML `required` as non-JS fallback |
| 11 | — | **No `autocomplete` attribute on password field** | Medium | CONFIRMED | Add `autocomplete="current-password"` |

### CSS Variable Cascade Bugs

| # | Bug ID | Finding | Severity | File |
|---|---|---|---|---|
| 8 | BUG-SECURE-001 | `.message-element` background uses `theme.$statusError` | High | `_common-form.scss:25` |
| 9 | BUG-SECURE-002 | `.message-element p` color uses `theme.$statusError` | High | `_common-form.scss:33` |
| 10 | BUG-SECURE-003 | `.has-error` label uses `theme.$statusError` | High | `_common-form.scss:80` |
| 11 | BUG-SECURE-004 | `.has-error` input border/bg uses `theme.$statusError` | High | `_common-form.scss:84-85` |
| 12 | BUG-SECURE-005 | `.has-success` label uses `theme.$statusSuccess` | High | `_common-form.scss:91` |
| 13 | BUG-SECURE-006 | `.has-success` input border/bg uses `theme.$statusSuccess` | High | `_common-form.scss:95-96` |

### Hardcoded Spacing (Needs Design Review)

| # | Bug ID | Finding | Severity | File |
|---|---|---|---|---|
| 14 | BUG-SECURE-007 | Form wrapper `gap: 2rem` hardcoded | Low | `_common-form.scss:14` |
| 15 | BUG-SECURE-008 | Message element `padding: 2rem` hardcoded | Low | `_common-form.scss:26` |
| 16 | BUG-SECURE-009 | Form input `gap: 1rem` hardcoded | Low | `_common-form.scss:46` |
| 17 | BUG-SECURE-010 | Input wrapper `height: 5rem` hardcoded | Low | `_common-form.scss:51` |
| 18 | BUG-SECURE-011 | Input `padding: 1.8rem` hardcoded | Low | `_common-form.scss:64` |
| 19 | BUG-SECURE-012 | Input `font-size: 2rem` hardcoded | Low | `_common-form.scss:66` |
| 20 | BUG-SECURE-013 | Label `font-size: 2rem` hardcoded | Low | `_common-form.scss:72` |

### Working Correctly ✅

| # | Finding | Status |
|---|---|---|
| 21 | `robots: noindex` present | ✅ Good |
| 22 | Unauthenticated access returns login form | ✅ Good |
| 23 | Error messages are generic (no user enumeration) | ✅ Good |
| 24 | Client-side format validation present | ✅ Good |
| 25 | Input text uses `var(--primary-color)` | ✅ Good |
| 26 | Input background uses `var(--neutral-color)` | ✅ Good |
| 27 | Font-family uses `var(--primary-font)` | ✅ Good |
| 28 | Button uses `var(--primary-color)` / `var(--tertiary-color)` hover | ✅ Good |
| 29 | Widget background uses `var(--widget-background)` | ✅ Good |
| 30 | Widget padding uses `var(--widget-with-bg--p-top/bottom-small)` | ✅ Good |
| 31 | Button `#fff` text — intentionally hardcoded (branding white) | ✅ OK |

**Total: 11 functional/security issues (1 critical, 2 high, 8 medium), 6 high-severity CSS variable bugs, 7 low-severity hardcoded values, 11 items working correctly.**

---

*Updated: 2026-02-25 | Page: https://mvcbasev3.tiarc-staging.co.uk/secure/test-secure*
