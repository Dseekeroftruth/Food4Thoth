FOOD4THOTH NEXUS — Standalone HTML Version
==========================================

This is a fully self-contained web build of the NEXUS overworld plus all 16 games
and every asset. It uses RELATIVE paths, so it works hosted at any URL or in any
subfolder. No backend, database, or internet connection is required (only Google
Fonts load from the web if available; the app still runs without them).

HOW TO RUN
----------
This is a modern web app, so it must be served by a web server — double-clicking
index.html (file://) will NOT work in most browsers.

Easiest options:

1) Any static host: upload the CONTENTS of this folder to Netlify, Vercel,
   GitHub Pages, Cloudflare Pages, itch.io, or any web host. Done.

2) Run a quick local server from inside this folder:
     Python:   python3 -m http.server 8000
     Node:     npx serve .
   Then open http://localhost:8000 in your browser.

INSTALL ON iPhone / iPad (PWA)
------------------------------
Open the hosted URL in Safari, tap Share, then "Add to Home Screen". It launches
fullscreen like a native app. (This does NOT affect or replace your App Store build.)

WHAT'S INSIDE
-------------
  index.html          - the NEXUS launcher (overworld + hub)
  assets/             - app code & styles
  games/              - all 16 games, each individually playable too
  manifest.json       - PWA metadata
