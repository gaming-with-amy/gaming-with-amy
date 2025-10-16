# My Webpage

**Date Created:** 10/2/2025

## Overview

I'm kind of thinking I need a website. Nothing too complicated. Don't need to reinvent the wheel.

**Update** 10/10/2025

Keeping it modular. Crashed out a bit last night but feeling recharged. I like the idea of a contact page but have no clue how to do that...yet. But at least I can build a form to start with.

**Update** 10/15/2025  
I think I’ve finally cracked the layout. Header! Sidebar! Intro message! It’s all actually working (mostly)! 

## What’s here so far
- `index.js` — boots the layout (header + left rail + main + junior + footer) and swaps “pages” with a tiny render function
- `modules/` — little chunks so I don’t lose my mind:
  - `home.js` (hero + latest video)
  - `headNav.js` (top nav with buttons)
  - `sidebar.js` (left rail: quick links, playlists toggle)
  - `videos.js` (simple list view for now)
  - `contact.js` (currently nonfunctional contact form)
  - `footer.js` (copyright, etc.)
- `data/videos.json5` — my video list (populates Home “latest,” the Videos page, and sidebar link)
- `style/` — `reset.css` + `main.css` 
- `templates/index.html` — the HTML template webpack builds from
