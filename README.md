# LearnSphere Learning Platform

A responsive student dashboard built with React, Vite, and Tailwind CSS.

## Run locally

```bash
npm install
npm run dev
```

## Advanced Tailwind CSS Assignment

**Branch:** `feature/advanced-tailwind-ui`

### Feature 1: Course Details Modal

- Opens from **View details** on every course card.
- Uses a fixed, full-screen overlay with a high z-index so it appears above the sticky navigation and page content.
- Closes with the close button, backdrop click, or Escape; focus begins on the close button and is kept within the dialog.
- Has responsive width, internal vertical scrolling, course artwork, category, status, progress, and a primary action.
- The icon-only close button includes `sr-only` text and visible keyboard focus states.

### Feature 2: Notification Center

- Sticky navigation contains an accessible bell button with an unread-count badge.
- The responsive dropdown contains five notifications with title, message, time, and read/unread state.
- Notification content has a bounded height and its own vertical scrolling.
- Unread items have a stronger background and an indicator; buttons and items have hover, focus, and active states.

### Three UI problems identified and fixed

1. **Spacing/alignment:** Course-card actions had one uneven button treatment. They now share reusable button classes and wrap cleanly on narrow screens.
2. **Responsive issue:** A notification dropdown could exceed the mobile viewport. It now uses a viewport-aware width and hides horizontal overflow.
3. **Overflow/positioning issue:** Long modal content could extend beyond the visible screen. The overlay is fixed and the modal uses a viewport-based maximum height with internal vertical scrolling.

### Tailwind concepts practiced

- `fixed`, `sticky`, `relative`, `absolute`, and z-index layering
- Responsive widths and spacing
- `overflow-y-auto`, `overflow-x-hidden`, and maximum heights
- Flexbox/grid centering and layout
- Conditional classes for notification state
- `hover:`, `focus-visible:`, and `active:` interactive states
- `sr-only` labels and accessible focus treatment

### Custom CSS

The small `nav-link` class in `src/index.css` uses Tailwind `@apply` solely to keep repeated navigation-link utilities consistent. Component styling otherwise uses Tailwind utilities directly.

## Responsive review checklist

Use browser device emulation at 375px, 768px, 1024px, and 1440px to check modal width, notification position, sticky navigation, text wrapping, course-card actions, and horizontal overflow.
