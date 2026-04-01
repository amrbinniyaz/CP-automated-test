# Contact Form Test Cases

## Overview

| Property | Value |
|----------|-------|
| **Widget** | Contact Form (includes Form, Map, GDPR, Confirmation) |
| **Components** | Contact Form, Contact Map, Contact GDPR Checkbox, Contact Confirmation |
| **Variants** | 1 |
| **CMS Page** | `/contact` (dedicated template, not a Content Page widget) |
| **XD Design** | https://xd.adobe.com/view/53f48a19-8a18-4e08-a505-b58cb2d5c35c-06a7/ |
| **XD Screens** | 5 (1440px, 375px, 2560px, Submit Page, Email Confirmation) |
| **Test Page URL** | https://test-1-mvcbasev3.tiarc-staging.co.uk/contact |

---

## Design Specifications (from XD)

### Contact Page Structure
| Section | Description |
|---------|-------------|
| **Header** | "Contact Us" page title in hero area |
| **CMS Content** | Optional body content from CMS |
| **Form Section** | "Get in touch" heading + form fields with background |
| **Map Section** | Leaflet map with school info box overlay |
| **Footer** | Standard site footer |

### Form Fields
| Field | Type | Required | Validation | Placeholder |
|-------|------|----------|------------|-------------|
| Department | Select (dropdown) | Yes | Parsley required | "--Select--" |
| First name | Text input | Yes | Required | "Adam" |
| Surname | Text input | Yes | Required | "Smith" |
| Phone number | Tel input | No (optional) | Min 4, Max 15 chars, pattern `^[\d\+\-\.\(\)\/\s]*$` | "+0123456789" |
| Email address | Email input | Yes | Required, email format | "johnsmith@gmail.com" |
| Subject title | Text input | Yes | Required | "e.g. Inquiry" |
| Message | Textarea | Yes | Required | "Type your message here..." |
| GDPR consent | Checkbox | No (popup if unchecked) | Optional with popup confirmation | - |
| reCAPTCHA | Google reCAPTCHA v2 | Yes | Min 6 chars token | - |
| Submit | Button | - | - | "send my message" |

### Confirmation Page
- URL: `/contact-confirmation`
- Displays: "Thank you [Title] [FirstName] [LastName]!"
- Shows: "Your message has been sent to [Department]"
- Link: "send another message" → back to `/contact`
- Query params: `?title=&firstname=&lastname=&department=`

---

## Code Implementation

### Template Files
| File | Purpose |
|------|---------|
| `/Website/Pages/Templates/Contact.cshtml` | Main contact page template |
| `/Website/Pages/MainControls/Partials/Content/Contact/_ContactForm.cshtml` | Form partial view |
| `/Website/Pages/MainControls/Partials/Content/Contact/_ContactMap.cshtml` | Map partial view |
| `/Website/Pages/Templates/ContactConfirmation.cshtml` | Confirmation page template |

### SCSS Files
| File | Purpose |
|------|---------|
| `/Website/Styles/Contact/contact.scss` | Main bundle entry |
| `/Website/Styles/Contact/_contactColorsAndFonts.scss` | Colors, fonts, mixins |
| `/Website/Styles/Contact/components/_contactForm.scss` | Form styles (523 lines) |
| `/Website/Styles/Contact/components/_contactGDPR.scss` | GDPR checkbox/popup styles |
| `/Website/Styles/Contact/components/_contactMap.scss` | Map + info box styles |
| `/Website/Styles/Contact/components/_contactIcons.scss` | Icon font (bike, bus, walk, car, error) |
| `/Website/Styles/Contact/components/_layout.scss` | Layout wrapper |
| `/Website/Styles/Contact/components/_ctFormSubmitted.scss` | Confirmation page styles |
| `/Website/Styles/Contact/_contactCustomElements.scss` | Custom overrides (empty) |

### JavaScript Files
| File | Purpose |
|------|---------|
| `/Website/Scripts/Modules/ModuleContact.js` | Module loader (loads via sail.js) |
| CDN: `contactForm.js` | Form logic, validation, submission |
| CDN: `contactMap.js` | Map initialization, school locations |
| CDN: `contactHelpers.js` | Helper functions |
| CDN: `parsley.min.js` | Form validation library |
| CDN: `jquery.selectric.js` | Custom select dropdown |
| CDN: `jquery.watermark.min.js` | Placeholder watermarks |

### CSS Variables / SCSS Variables Used
| Variable | Type | Purpose | Location |
|----------|------|---------|----------|
| `var(--primary-font)` | CSS var | Form text font | `_contactColorsAndFonts.scss:6` |
| `var(--secondary-font)` | CSS var | Secondary font | `_contactColorsAndFonts.scss:7` |
| `theme.$primaryColor` | SCSS var | Primary color (multiple uses) | `_contactColorsAndFonts.scss:9` |
| `theme.$secondaryColor` | SCSS var | Secondary color | `_contactColorsAndFonts.scss:10` |
| `theme.$tertiaryColor` | SCSS var | Tertiary color | `_contactColorsAndFonts.scss:11` |
| `theme.$fourthColor` | SCSS var | Fourth color | `_contactColorsAndFonts.scss:12` |
| `theme.$neutralColor` | SCSS var | Neutral color | `_contactColorsAndFonts.scss:13` |
| `theme.$statusSuccess` | SCSS var | Success validation color | `_contactColorsAndFonts.scss:14` |
| `theme.$statusError` | SCSS var | Error validation color | `_contactColorsAndFonts.scss:15` |
| `theme.$statusWarning` | SCSS var | Warning color | `_contactColorsAndFonts.scss:16` |

---

## Known Bugs (Hardcoded Values / SCSS Variables)

### BUG-CT-001: All colors use SCSS variables instead of CSS variables
- **Severity:** High
- **Location:** `_contactColorsAndFonts.scss:9-16`
- **Expected:** CSS variables like `var(--primary-color)`, `var(--secondary-color)`, etc.
- **Actual:** SCSS variables `theme.$primaryColor`, `theme.$secondaryColor`, etc.
- **Impact:** Colors won't cascade at runtime when theme changes. All form colors are compile-time only.

### BUG-CT-002: Hardcoded input border colors
- **Severity:** Medium
- **Location:** `_contactColorsAndFonts.scss:49-51`
- **Expected:** CSS variable for input borders
- **Actual:** `$ct-inputBorder: #fff`, `$ct-inputBorder-hover: #fff`, `$ct-inputBorder-focus: #fff`
- **Impact:** Input borders hardcoded to white, won't respond to theme changes

### BUG-CT-003: Hardcoded input background
- **Severity:** Medium
- **Location:** `_contactColorsAndFonts.scss:52`
- **Expected:** CSS variable for input background
- **Actual:** `$ct-inputBackground: #fff`
- **Impact:** Input background hardcoded to white

### BUG-CT-004: Hardcoded select option hover background
- **Severity:** Low
- **Location:** `_contactColorsAndFonts.scss:56`
- **Expected:** CSS variable
- **Actual:** `rgba(0, 0, 0, 0.1)` hardcoded
- **Impact:** Dropdown hover color won't change with theme

### BUG-CT-005: Hardcoded GDPR checkbox border
- **Severity:** Low
- **Location:** `_contactGDPR.scss:50`, `_contactColorsAndFonts.scss:73`
- **Expected:** CSS variable for border color
- **Actual:** `#c1c1c1` hardcoded
- **Impact:** Checkbox border won't respond to theme changes

### BUG-CT-006: Hardcoded GDPR inner background
- **Severity:** Low
- **Location:** `_contactGDPR.scss:4`
- **Expected:** CSS variable
- **Actual:** `rgba(#fff, 0.6)` hardcoded
- **Impact:** GDPR section background won't change with theme

### BUG-CT-007: Hardcoded map text colors
- **Severity:** Medium
- **Location:** `_contactColorsAndFonts.scss:97, 103`
- **Expected:** CSS variable for map text
- **Actual:** `color: #fff` hardcoded in `ct-map-eventTitle` and `ct-map-textStyle`
- **Impact:** Map info box text always white regardless of theme

### BUG-CT-008: Hardcoded map button colors
- **Severity:** Low
- **Location:** `_contactMap.scss:134-135`
- **Expected:** CSS variable
- **Actual:** `color: #000` and `background: transparent` hardcoded
- **Impact:** "Find nearest" / "Go to map" button colors won't theme

### BUG-CT-009: Hardcoded autofill box-shadow
- **Severity:** Low
- **Location:** `_contactForm.scss:187`
- **Expected:** CSS variable or theme-based color
- **Actual:** `-webkit-box-shadow: 0 0 0 50px white inset` hardcoded
- **Impact:** Autofill background always white

### BUG-CT-010: Hardcoded required asterisk color
- **Severity:** Low
- **Location:** `_contactForm.scss:303`
- **Expected:** CSS variable for error/required color
- **Actual:** `color: red` hardcoded
- **Impact:** Required asterisk always red regardless of theme error color

### BUG-CT-011: Hardcoded confirmation page divider
- **Severity:** Low
- **Location:** `_ctFormSubmitted.scss:19`
- **Expected:** CSS variable
- **Actual:** `background: #e0e0e0` hardcoded
- **Impact:** Divider line won't change with theme

---

## Test Cases

### Form Structure & Layout Tests

#### SC-CT-001: Page Structure
- [ ] Page has "Contact Us" heading in hero area
- [ ] "Get in touch" H2 heading displays above form
- [ ] Form is wrapped in `module-widget--with-bg` container
- [ ] Map section appears below the form
- [ ] Footer displays correctly

#### SC-CT-002: Form Fields Present
- [ ] Department dropdown present with "--Select--" default
- [ ] First name input present with "Adam" placeholder
- [ ] Surname input present with "Smith" placeholder
- [ ] Phone number input present with "+0123456789" placeholder and "(optional)" label
- [ ] Email address input present with "johnsmith@gmail.com" placeholder
- [ ] Subject title input present with "e.g. Inquiry" placeholder
- [ ] Message textarea present with "Type your message here..." placeholder
- [ ] GDPR consent checkbox present with privacy terms text
- [ ] reCAPTCHA widget present
- [ ] "send my message" submit button present

#### SC-CT-003: Form Labels & Accessibility
- [ ] All required fields have visible labels
- [ ] All inputs have `aria-label` attributes
- [ ] All fieldsets have `<legend>` elements (hidden)
- [ ] Error icons (`.contact-icon.ct-error-field-icon`) present in labels
- [ ] Tab order follows logical field sequence
- [ ] Skip to content link works

---

### Form Validation Tests

#### VAL-CT-001: Required Field - Department
- [ ] Submit without selecting department → shows validation error
- [ ] Parsley error class applied to fieldset
- [ ] Error styling (red border, red background) appears on dropdown
- [ ] Select a valid department → error clears

#### VAL-CT-002: Required Field - First Name
- [ ] Submit with empty first name → shows validation error
- [ ] Error icon becomes visible (opacity: 1)
- [ ] Label turns error color
- [ ] Input gets error border and background
- [ ] Enter valid name → error clears

#### VAL-CT-003: Required Field - Surname
- [ ] Submit with empty surname → shows validation error
- [ ] Error styling matches first name field behavior
- [ ] Enter valid surname → error clears

#### VAL-CT-004: Optional Field - Phone Number
- [ ] Submit without phone → no validation error (field is optional)
- [ ] Enter less than 4 characters → validation error (minlength)
- [ ] Enter more than 15 characters → validation error (maxlength)
- [ ] Enter letters/special chars (not matching pattern) → validation error
- [ ] Valid patterns accepted: `+44 1234 567890`, `01onal234567`, `(020) 1234-5678`

#### VAL-CT-005: Required Field - Email Address
- [ ] Submit with empty email → shows validation error
- [ ] Enter invalid email (no @) → validation error
- [ ] Enter invalid email (no domain) → validation error
- [ ] Enter valid email → error clears

#### VAL-CT-006: Required Field - Subject Title
- [ ] Submit with empty subject → shows validation error
- [ ] Enter valid subject → error clears

#### VAL-CT-007: Required Field - Message
- [ ] Submit with empty message → shows validation error
- [ ] Textarea gets error border and background
- [ ] Enter valid message → error clears

#### VAL-CT-008: reCAPTCHA Validation
- [ ] Submit without completing reCAPTCHA → validation error
- [ ] reCAPTCHA border turns red on error
- [ ] Complete reCAPTCHA → error clears
- [ ] reCAPTCHA expiry triggers `captchaExpired` callback

#### VAL-CT-009: Multiple Validation Errors
- [ ] Submit completely empty form → all required fields show errors simultaneously
- [ ] Fix one field at a time → individual errors clear
- [ ] All errors clear when all fields valid

---

### Form Behavior Tests

#### BHV-CT-001: Form Submission - Success
- [ ] Fill all required fields correctly
- [ ] Complete reCAPTCHA
- [ ] Click "send my message"
- [ ] Form enters `isSubmitting` state (overlay + loader animation)
- [ ] Loader spinner appears on submit button
- [ ] Redirects to `/contact-confirmation` page
- [ ] Confirmation shows correct name and department

#### BHV-CT-002: Form Submission - Error
- [ ] Trigger server-side error
- [ ] `.ctForm__errorMessage` becomes visible (`isVisible` class)
- [ ] Error message displays with red left border animation
- [ ] Error message contains fallback email contact

#### BHV-CT-003: GDPR Checkbox - Consent Given
- [ ] Check GDPR checkbox
- [ ] Checkbox tick mark appears (opacity: 1)
- [ ] `.isChecked` class added to `.contactGdpr`
- [ ] Tick box border becomes transparent
- [ ] Submit form → proceeds normally

#### BHV-CT-004: GDPR Checkbox - No Consent (Popup)
- [ ] Leave GDPR checkbox unchecked
- [ ] Click submit
- [ ] GDPR popup appears above checkbox
- [ ] Popup text: "You are about to submit this form without giving consent..."
- [ ] "No" button (js-consent-yes) → closes popup, checks the checkbox
- [ ] "Yes" button (js-consent-no) → closes popup, submits without consent

#### BHV-CT-005: Department Dropdown (Selectric)
- [ ] Dropdown renders with Selectric custom styling
- [ ] Click opens dropdown options list
- [ ] Hover highlights option with background color
- [ ] Select option → label updates
- [ ] Arrow icon displays correctly (`.ct-dropdpownArrow`)
- [ ] Keyboard navigation works (up/down arrows, enter)

#### BHV-CT-006: Input Focus & Hover States
- [ ] Input hover → border changes to `$ct-inputBorder-hover`
- [ ] Input focus → border changes to `$ct-inputBorder-focus`
- [ ] Textarea hover → border appears
- [ ] Textarea focus → outline + border appears
- [ ] Transitions are smooth (0.3s ease-in-out)

#### BHV-CT-007: Watermark/Placeholder Behavior
- [ ] Watermarks display when fields are empty
- [ ] Watermarks disappear when user types
- [ ] Watermark color is 50% opacity of input color
- [ ] Required field watermarks show asterisk (*)

---

### Map Tests

#### MAP-CT-001: Map Display
- [ ] Leaflet map renders correctly
- [ ] Map fills available width
- [ ] Map has minimum height of 530px (desktop)
- [ ] Map markers display with correct opacity (0.6 default, 1 when active)

#### MAP-CT-002: Map Info Box
- [ ] Info box overlays map on right side
- [ ] School name displays in large font
- [ ] Address displays with border separators
- [ ] Distance icons (bike, bus, walk, car) display
- [ ] Icon hover changes color

#### MAP-CT-003: Multiple Schools
- [ ] If multiple schools: "Find nearest" button appears
- [ ] If single school: single school info displays
- [ ] "Go to map" link works
- [ ] School switching updates map marker

---

### Confirmation Page Tests

#### CONF-CT-001: Confirmation Page Display
- [ ] "Thank you [Name]!" heading displays correctly
- [ ] Department name shown in bold
- [ ] "send another message" link present and styled as button
- [ ] Link navigates back to `/contact`
- [ ] Map section displays below confirmation
- [ ] CMS content section displays

#### CONF-CT-002: Confirmation Page Query Params
- [ ] `?title=Mr` → displays "Mr" before name
- [ ] `?firstname=John` → displays "John"
- [ ] `?lastname=Smith` → displays "Smith"
- [ ] `?department=General` → displays "General"

---

### Edge Case Tests

#### EDGE-CT-001: XSS in Form Fields
- [ ] Enter `<script>alert('xss')</script>` in first name → no script execution
- [ ] Enter `<img src=x onerror=alert(1)>` in surname → no script execution
- [ ] Enter `"><script>alert(1)</script>` in subject → no script execution
- [ ] Enter HTML tags in message textarea → properly escaped on confirmation page

#### EDGE-CT-002: XSS in Confirmation Page Query Params
- [ ] Navigate to `/contact-confirmation?firstname=<script>alert(1)</script>` → no script execution
- [ ] Navigate with `?department=<img/src=x onerror=alert(1)>` → no script execution
- [ ] Verify `Server.UrlDecode` + `@variable` output is HTML-encoded by Razor

#### EDGE-CT-003: SQL Injection in Form Fields
- [ ] Enter `'; DROP TABLE users; --` in text fields → no database impact
- [ ] Enter `1' OR '1'='1` in fields → handled safely

#### EDGE-CT-004: Very Long Input Values
- [ ] Enter 1000+ characters in first name → field handles gracefully
- [ ] Enter 5000+ characters in message textarea → no overflow/crash
- [ ] Enter 255+ characters in email → validation handles correctly
- [ ] Enter 255+ characters in subject → no layout break

#### EDGE-CT-005: Special Characters in Fields
- [ ] Enter unicode characters: `José María García` → accepted in name
- [ ] Enter emoji: `Hello 👋` in message → handled correctly
- [ ] Enter RTL text: `مرحبا` → no layout break
- [ ] Enter Chinese/Japanese characters → accepted
- [ ] Enter `O'Brien` (apostrophe in name) → accepted without error

#### EDGE-CT-006: Email Edge Cases
- [ ] `user@domain.co.uk` → valid
- [ ] `user+tag@domain.com` → valid
- [ ] `user@subdomain.domain.com` → valid
- [ ] `user@domain` (no TLD) → should be invalid
- [ ] `@domain.com` (no local part) → invalid
- [ ] `user@.com` → invalid
- [ ] `user name@domain.com` (space) → invalid
- [ ] Very long email (254 chars) → should be valid
- [ ] Email with consecutive dots `user..name@domain.com` → check behavior

#### EDGE-CT-007: Phone Number Edge Cases
- [ ] `+44` (3 chars, below min 4) → validation error
- [ ] `+441234567890123456` (18 chars, above max 15) → validation error
- [ ] `+44 (0) 1234 567890` (with spaces/brackets) → valid per pattern
- [ ] `abc` → invalid per pattern
- [ ] `12.34.56.78` (dots) → valid per pattern (dots allowed)
- [ ] Empty (optional) → no error
- [ ] `+` (1 char) → validation error (minlength)

#### EDGE-CT-008: Double Submit Prevention
- [ ] Click submit rapidly multiple times → only one submission processed
- [ ] Form enters `isSubmitting` state → overlay prevents interaction
- [ ] Submit button disabled during submission

#### EDGE-CT-009: reCAPTCHA Edge Cases
- [ ] reCAPTCHA expires after timeout → form cannot submit
- [ ] reCAPTCHA challenge appears → user can complete it
- [ ] Network error loading reCAPTCHA → graceful fallback
- [ ] reCAPTCHA script blocked (ad blocker) → user informed

#### EDGE-CT-010: Browser Autofill
- [ ] Browser autofills name/email → form accepts values
- [ ] Autofill styling doesn't break layout (webkit-autofill override)
- [ ] Autofilled fields pass validation
- [ ] Watermarks clear when autofill populates fields

#### EDGE-CT-011: Form State After Back Navigation
- [ ] Submit form → confirmation page → browser back → form state
- [ ] Check if fields retain values after back navigation
- [ ] Check if reCAPTCHA resets properly

#### EDGE-CT-012: Empty Department List
- [ ] If CMS has no email list configured → default emails display
- [ ] Default list contains expected team members
- [ ] All default email addresses are valid format

#### EDGE-CT-013: Confirmation Page Without Query Params
- [ ] Navigate directly to `/contact-confirmation` (no params)
- [ ] Page handles missing params gracefully (no errors)
- [ ] "Thank you !" displays without name (empty but no crash)

#### EDGE-CT-014: GDPR Popup Interaction
- [ ] Open GDPR popup → click outside popup → popup behavior
- [ ] Open GDPR popup → press Escape → popup behavior
- [ ] Open GDPR popup → tab through options → keyboard accessible
- [ ] GDPR popup positioning doesn't overflow viewport on mobile

#### EDGE-CT-015: Concurrent Form Modifications
- [ ] Fill form → change department mid-way → no issues
- [ ] Clear all fields after partial fill → validation resets
- [ ] Paste content into fields → validation triggers correctly

#### EDGE-CT-016: Network Failure During Submission
- [ ] Lose network after clicking submit → error message displays
- [ ] Error message shows fallback email contact
- [ ] User can retry after network restored

#### EDGE-CT-017: JavaScript Disabled
- [ ] Form displays without JS (basic HTML form)
- [ ] Native HTML5 validation works (`required` attributes)
- [ ] reCAPTCHA won't load → form cannot submit (expected)

---

### Responsive Tests

#### RESP-CT-001: Mobile (375px)
- [ ] Form fields stack vertically (full width)
- [ ] All labels readable
- [ ] Input text size readable (no zoom required)
- [ ] reCAPTCHA scales down (transform: scale3D(0.95))
- [ ] Submit button below reCAPTCHA (not beside)
- [ ] GDPR checkbox tick box larger (26px × 26px)
- [ ] Map stacks below (320px padding-top for map)
- [ ] Map info box full width
- [ ] Captcha and submit section displays as block (not flex row)

#### RESP-CT-002: Mobile Small (320px)
- [ ] No horizontal overflow
- [ ] reCAPTCHA doesn't overflow container
- [ ] All text readable
- [ ] Touch targets minimum 44px

#### RESP-CT-003: Tablet (768px)
- [ ] Form layout appropriate for width
- [ ] Map info box width scales correctly
- [ ] GDPR text wraps properly

#### RESP-CT-004: Desktop (1440px)
- [ ] Form centered in container
- [ ] Map info box overlays right side (width: clmp 350-430px)
- [ ] Captcha and submit side by side (flex row with gap)
- [ ] Hover states work on all interactive elements

#### RESP-CT-005: Large Desktop (2560px)
- [ ] Layout scales appropriately
- [ ] Form doesn't stretch too wide
- [ ] Map scales correctly
- [ ] Font sizes appropriate

---

### Color Variable Tests

#### COL-CT-001: Primary Color Cascade
- [ ] Change `--primary-color` at runtime
- [ ] Check if form label colors update → **Expected: NO** (uses SCSS `$primaryColor`)
- [ ] Check if input text color updates → **Expected: NO** (uses SCSS variable)
- [ ] Check if map info box background updates → **Expected: NO** (uses SCSS variable)
- [ ] **Document:** All form colors use SCSS variables, none will cascade (BUG-CT-001)

#### COL-CT-002: Validation Colors
- [ ] Error state uses `$statusError` color for borders
- [ ] Error state uses `$statusError` with 0.1 opacity for backgrounds
- [ ] Success state uses `$statusSuccess` color for borders
- [ ] Error icon color matches error state

---

### Font Variable Tests

#### FV-CT-001: Primary Font Cascade
- [ ] Change `--primary-font` at runtime
- [ ] Form input text font updates → **Expected: YES** (uses `var(--primary-font)`)
- [ ] Label font updates → **Expected: YES** (uses `var(--primary-font)`)
- [ ] Textarea font updates → **Expected: YES**

#### FV-CT-002: Secondary Font Cascade
- [ ] Change `--secondary-font` at runtime
- [ ] "Get in touch" H2 heading updates → **Expected: YES** (via secondLvlCss)

---

### Accessibility Tests

#### A11Y-CT-001: Keyboard Navigation
- [ ] Tab through all form fields in logical order
- [ ] Enter/Space activates submit button
- [ ] Enter/Space toggles GDPR checkbox
- [ ] Escape closes GDPR popup (if applicable)
- [ ] Focus visible on all interactive elements

#### A11Y-CT-002: Screen Reader
- [ ] All inputs have associated labels
- [ ] All inputs have `aria-label` attributes
- [ ] Error states announced to screen readers
- [ ] GDPR text readable by screen reader
- [ ] reCAPTCHA accessible

#### A11Y-CT-003: Color Contrast
- [ ] Label text meets WCAG AA contrast ratio (4.5:1)
- [ ] Placeholder text meets minimum contrast
- [ ] Error text meets contrast requirements
- [ ] Button text meets contrast requirements

#### A11Y-CT-004: Focus Management
- [ ] Focus trapped within GDPR popup when open
- [ ] Focus returns to trigger after popup closes
- [ ] Error focus management (first error field focused)

---

## Test Execution Checklist

| Test ID | Description | Status | Tester | Date | Notes |
|---------|-------------|--------|--------|------|-------|
| SC-CT-001 | Page structure | Not Started | | | |
| SC-CT-002 | Form fields present | Not Started | | | |
| SC-CT-003 | Labels & accessibility | Not Started | | | |
| VAL-CT-001 | Department validation | Not Started | | | |
| VAL-CT-002 | First name validation | Not Started | | | |
| VAL-CT-003 | Surname validation | Not Started | | | |
| VAL-CT-004 | Phone validation | Not Started | | | |
| VAL-CT-005 | Email validation | Not Started | | | |
| VAL-CT-006 | Subject validation | Not Started | | | |
| VAL-CT-007 | Message validation | Not Started | | | |
| VAL-CT-008 | reCAPTCHA validation | Not Started | | | |
| VAL-CT-009 | Multiple errors | Not Started | | | |
| BHV-CT-001 | Submission success | Not Started | | | |
| BHV-CT-002 | Submission error | Not Started | | | |
| BHV-CT-003 | GDPR consent given | Not Started | | | |
| BHV-CT-004 | GDPR no consent popup | Not Started | | | |
| BHV-CT-005 | Department dropdown | Not Started | | | |
| BHV-CT-006 | Focus & hover states | Not Started | | | |
| BHV-CT-007 | Watermark behavior | Not Started | | | |
| MAP-CT-001 | Map display | Not Started | | | |
| MAP-CT-002 | Map info box | Not Started | | | |
| MAP-CT-003 | Multiple schools | Not Started | | | |
| CONF-CT-001 | Confirmation display | Not Started | | | |
| CONF-CT-002 | Confirmation params | Not Started | | | |
| EDGE-CT-001 | XSS in form fields | Not Started | | | |
| EDGE-CT-002 | XSS in confirmation params | Not Started | | | |
| EDGE-CT-003 | SQL injection | Not Started | | | |
| EDGE-CT-004 | Very long inputs | Not Started | | | |
| EDGE-CT-005 | Special characters | Not Started | | | |
| EDGE-CT-006 | Email edge cases | Not Started | | | |
| EDGE-CT-007 | Phone edge cases | Not Started | | | |
| EDGE-CT-008 | Double submit | Not Started | | | |
| EDGE-CT-009 | reCAPTCHA edge cases | Not Started | | | |
| EDGE-CT-010 | Browser autofill | Not Started | | | |
| EDGE-CT-011 | Back navigation | Not Started | | | |
| EDGE-CT-012 | Empty department list | Not Started | | | |
| EDGE-CT-013 | Confirmation no params | Not Started | | | |
| EDGE-CT-014 | GDPR popup interaction | Not Started | | | |
| EDGE-CT-015 | Concurrent modifications | Not Started | | | |
| EDGE-CT-016 | Network failure | Not Started | | | |
| EDGE-CT-017 | JavaScript disabled | Not Started | | | |
| RESP-CT-001 | Mobile 375px | Not Started | | | |
| RESP-CT-002 | Mobile 320px | Not Started | | | |
| RESP-CT-003 | Tablet 768px | Not Started | | | |
| RESP-CT-004 | Desktop 1440px | Not Started | | | |
| RESP-CT-005 | Large Desktop 2560px | Not Started | | | |
| COL-CT-001 | Primary color cascade | Not Started | | | |
| COL-CT-002 | Validation colors | Not Started | | | |
| FV-CT-001 | Primary font cascade | Not Started | | | |
| FV-CT-002 | Secondary font cascade | Not Started | | | |
| A11Y-CT-001 | Keyboard navigation | Not Started | | | |
| A11Y-CT-002 | Screen reader | Not Started | | | |
| A11Y-CT-003 | Color contrast | Not Started | | | |
| A11Y-CT-004 | Focus management | Not Started | | | |

---

## Test URLs

| Environment | URL | Notes |
|-------------|-----|-------|
| Staging | https://test-1-mvcbasev3.tiarc-staging.co.uk/contact | Main test page |
| Staging Confirmation | https://test-1-mvcbasev3.tiarc-staging.co.uk/contact-confirmation | After submission |
| XD Design | https://xd.adobe.com/view/53f48a19-8a18-4e08-a505-b58cb2d5c35c-06a7/ | 5 screens |

---

## Notes

- **Contact form is NOT a Content Page widget** — it has its own dedicated template (`Contact.cshtml`) and SCSS bundle (`contact.scss`), separate from the Content Page theme system.
- **11 hardcoded value bugs identified** in SCSS before visual testing (BUG-CT-001 through BUG-CT-011).
- **Font variables partially use CSS vars** — `var(--primary-font)` and `var(--secondary-font)` are used, so font cascade should work. But all color variables use SCSS compile-time variables.
- **Form JS is loaded from CDN** — validation logic, submission handling, and map code are external. Testing must be done on staging (not locally without CDN access).
- **Country-specific behavior** — Surname label says "surname" (UK default) or "last name" (US). GDPR text says "tick" (UK) or "check" (US).
- **reCAPTCHA site key** comes from CMS setting `Generic_RecaptchaSiteKey`.
- **Department emails** come from CMS `ContactUs_Page.GetEmailsList` — falls back to hardcoded default list if CMS not configured.
