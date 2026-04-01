# Global Spacing Rules (Design Spec)

This document defines the expected padding and margin values across all viewports.

---

## Margin Rules

### Expected Values

| Variable | 375px | 1440px | 2560px |
|----------|-------|--------|--------|
| Margin A | 60px | 90px | 140px |
| Margin B | 40px | 50px | 70px |
| Margin C | 30px | 40px | 60px |
| Margin D | 20px | 30px | 30px |

### CSS Variables

| Variable | Usage |
|----------|-------|
| `--margin-a` | Widget general gap, h2 spacing, hr spacing |
| `--margin-b` | h3/h4/h5 spacing, mobile column gap |
| `--margin-c` | Two equal column gap, blockquote/table spacing |
| `--margin-d` | Carousel item gap, grid widget gap, content margin |

---

## Padding Rules

### Expected Values

| Variable | 375px | 1440px | 2560px |
|----------|-------|--------|--------|
| Padding A | - | 150px | - |
| Padding B | - | 90px | 120px |
| Padding C | - | 70px | 90px |
| Padding D | - | 50px | - |
| Padding E | 20px | 30px | 40px |
| Padding F | - | 20px | - |
| Padding G | 10px | 15px | 20px |
| Padding H | 6px | 10px | 15px |

### Inner Padding Variables (Used by Cards)

| Variable | 375px | 1440px | 2560px |
|----------|-------|--------|--------|
| Padding E Inner | 20px | 30px | 40px |
| Padding G Inner | 10px | 15px | 20px |
| Padding H Inner | 6px | 10px | 15px |

### CSS Variables

| Variable | Usage |
|----------|-------|
| `--padding-a` | Widget with background padding top |
| `--padding-b` | Widget with background padding bottom |
| `--padding-c` | Content templates padding |
| `--padding-d` | General inner padding |
| `--padding-e` | Small element padding |
| `--padding-e-inner` | Card content padding (all sides) |
| `--padding-f` | Micro padding |
| `--padding-g` | Small gap |
| `--padding-g-inner` | Card element gap (between title, description, date) |
| `--padding-h` | Tiny padding |
| `--padding-h-inner` | Tiny inner padding |

---

## Component Usage

### Stories Cards

| Element | Variable | Description |
|---------|----------|-------------|
| `.story-card__content` | `--padding-e-inner` | Content box padding (top, right, bottom, left) |
| `.story-card__content` | `--padding-g-inner` | Gap between handle, description, and date |

### Profile Cards

| Element | Variable | Description |
|---------|----------|-------------|
| Text box | `--padding-e-inner` | Content padding |
| Name to description | `--padding-g-inner` | Gap between elements |

### Event Cards

| Element | Variable | Description |
|---------|----------|-------------|
| Content area | `--padding-e-inner` | Content padding |
| Element spacing | `--padding-g-inner` | Gap between elements |

---

## Breakpoints

| Name | Width | Description |
|------|-------|-------------|
| Mobile S | 320px | Small mobile |
| Mobile M | 375px | Standard mobile |
| Mobile L | 425px | Large mobile |
| Tablet | 768px | Tablet |
| Desktop S | 1024px | Small desktop |
| Desktop M | 1440px | Standard desktop |
| MacBook Pro | ~1512px | Common MacBook size |
| Desktop L | 2560px | Large desktop / 4K |

---

## Scaling Behavior

Values should scale smoothly between breakpoints using CSS `clamp()`:

### Mobile to Desktop (375px → 1440px)
- Margin A: 60px → 90px
- Margin B: 40px → 50px
- Margin C: 30px → 40px
- Margin D: 20px → 30px
- Padding E: 20px → 30px
- Padding G: 10px → 15px
- Padding H: 6px → 10px

### Desktop to Large Desktop (1440px → 2560px)
- Margin A: 90px → 140px
- Margin B: 50px → 70px
- Margin C: 40px → 60px
- Margin D: 30px (fixed)
- Padding B: 90px → 120px
- Padding C: 70px → 90px
- Padding E: 30px → 40px
- Padding G: 15px → 20px
- Padding H: 10px → 15px

---

## Source File

All spacing variables are defined in:
```
Website/Styles/_globals/_theme-cssvars.scss
```

Lines:
- Margins: 96-99
- Paddings: 102-118
- Large desktop overrides: 120-133
- Mobile overrides: 135-141
