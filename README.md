# LearnSphere Learning Platform

A responsive student dashboard built with React, Vite, and Tailwind CSS.

## Features

- Course filtering and search with an empty state.
- Accessible course-details modal: Escape and backdrop close, initial keyboard focus, scroll locking, semantic dialog attributes, and a responsive internal scroll area.
- Sticky navigation and an accessible notification center with unread count and a bounded, scrollable panel.
- Mobile-first course cards and layout with no horizontal page overflow.

## Run locally

```bash
npm install
npm run dev
```

## Suggested component structure

```text
src/
  components/
    CourseCard.jsx
    CourseDetailsModal.jsx
    NavBar.jsx
    NotificationCenter.jsx
    ProgressBar.jsx
  data/courses.js
  App.jsx
  index.css
```

The assignment keeps these small components in `App.jsx` so the implementation is easy to review; move them into the folders above as the application grows.

## Git workflow

```bash
git checkout -b feat/course-modal-notifications
git add src/App.jsx src/index.css README.md
git commit -m "feat: add accessible course modal and notification center"
git push -u origin feat/course-modal-notifications
```
