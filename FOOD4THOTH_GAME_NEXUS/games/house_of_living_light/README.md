# The House of Living Light

A full mobile-first HTML/CSS/JavaScript point-and-click horror adventure inspired by the *structure* of classic cinematic haunted-house games, while using a new original story, setting, characters, rooms, puzzles, and mechanics.

## What is included

- `index.html` — complete game shell and iOS/PWA metadata
- `css/styles.css` — responsive iPhone/iPad interface, psychedelic Gothic visuals, reduced-motion and soft-horror modes
- `js/game.js` — room graph, chapter manager, inventory, journal, hints, endings, audio synthesis, save/load, PWA registration
- `manifest.webmanifest` — installable PWA manifest
- `service-worker.js` — simple offline cache
- `assets/icons/` — SVG app icons

## Core features

- Seven chapter structure
- 17 explorable rooms
- Point-and-tap hotspots
- Inventory and item-use puzzles
- Chapter progress meter
- Automatic clue journal
- Layered hint system
- Dynamic psychedelic room rendering
- Canvas atmosphere particles
- Web Audio API ambience and sound cues
- LocalStorage save/load
- Chapter select
- Three endings: Redeem, Banish, Merge
- iPhone safe-area support
- PWA support for adding to iPhone Home Screen
- Reduce motion mode
- Soft horror mode

## How to run locally

Open `index.html` in a browser. For best PWA/service-worker behavior, serve the folder from a local web server:

```bash
cd house_of_living_light
python3 -m http.server 8080
```

Then open:

```text
http://localhost:8080
```

## How to test on iPhone

1. Upload the folder to GitHub Pages, Netlify, Vercel, or your own web host.
2. Open the hosted URL in Safari on iPhone.
3. Tap Share.
4. Tap Add to Home Screen.
5. Launch it like an app.

## How to wrap for iOS App Store

You can use this as the web layer inside:

- Capacitor
- Cordova
- Expo WebView
- React Native WebView
- A native WKWebView shell in Xcode

Recommended path:

```bash
npm create @capacitor/app
# copy these files into the web output folder
npx cap add ios
npx cap open ios
```

## Design notes

This is built as a clean state-machine adventure. The key objects are:

- `chapters`
- `rooms`
- `items`
- `scenes`
- `chapterGoals`
- `hintSets`
- `state`

To expand the game, add new rooms to `rooms`, add new items to `items`, and add new flags to `chapterGoals`.

## Important creative note

This project does not copy *Phantasmagoria* characters, plot, text, video, music, images, or trademarks. It adapts the broader design pattern of a chapter-based haunted-location point-and-click adventure into an original psychedelic Gothic game.


## Patch note

This build includes an iPhone/Safari tap fix for the Arrival scene Continue button. It adds a proper `[hidden]` CSS override for the cinematic overlay and touch-safe `touchend`/`click` button handling.
