---
title: "📷 FOOD4THOTH Trace Overlay — Mobile Camera Lucida"
subtitle: "Overlay any image on your live phone camera to trace in real life"
author: "FOOD4THOTH"
created: 2025-10-21
last_updated: 2025-10-21
permalink: /Trace/readme/
layout: default
image: /Trace/og-preview.jpg
tags:
  - camera lucida
  - tracing
  - iPhone
  - PWA
  - web app
  - mobile camera overlay
description: |
  FOOD4THOTH Trace Overlay turns your phone into a modern camera lucida.
  Import a reference image or grab a frame from the live camera, then drag, pinch, and rotate the overlay
  above the real-world camera feed so you can trace on paper. Features: opacity ("ghost"),
  mirror, rotation, grid, camera zoom (hardware when available), torch, nudge controls,
  fit-to-width/height, help bubble, Add‑to‑Home‑Screen guidance, and a one-tap toggle to hide/show
  the entire bottom control panel.
canonical_url: "https://www.food4thoth.com/Trace/"
social:
  image: "https://www.food4thoth.com/Trace/og-preview.jpg"
  twitter_card: "summary_large_image"
  twitter_site: "@food4th0th"
  og_type: "website"
  og_title: "FOOD4THOTH Trace Overlay — Mobile Camera Lucida"
  og_description: "Overlay any image atop the live camera and trace on paper. Pinch/rotate/mirror, grid, torch, fit, and more."
---

<style>
  body { background: #000; color: #fff; }
  a { color: #00ffff; }
  h1, h2, h3, h4, h5, h6 { color: yellow; }
  code, pre { background: #0e0e12; color: #e8e8ff; }
  .nav-button {
    display: inline-block; padding: 10px 16px; margin: 6px 6px 12px;
    background: linear-gradient(135deg, #8a7dff, #47c8ff);
    color: #0a0a0a; font-weight: 700; text-decoration: none;
    border-radius: 10px; box-shadow: 0 6px 18px rgba(0,0,0,.35);
  }
  .nav-button:hover { filter: saturate(115%); }

:root{
    --code-bg:#15161a;                 /* dark grey */
    --code-text:#e8e8ff;               /* soft light */
    --code-border:rgba(255,255,255,.12);
  }

  /* Inline code (backticks) */
  :not(pre) > code,
  code.highlighter-rouge {
    background: var(--code-bg);
    color: var(--code-text);
    border: 1px solid var(--code-border);
    border-radius: .35rem;
    padding: .12em .4em;
  }

  /* Fenced code blocks ``` */
  pre, pre code {
    background: var(--code-bg) !important;
    color: var(--code-text) !important;
  }
  pre {
    border: 1px solid var(--code-border);
    border-radius: .6rem;
    padding: .9rem 1rem;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
  }

  /* Jekyll/Rouge wrappers */
  .highlighter-rouge,
  .highlight {
    background: var(--code-bg) !important;
    border-radius: .6rem;
  }
  .highlight pre {
    background: transparent !important; /* prevent double background */
    color: var(--code-text) !important;
    border: 0;
    padding: 0; /* padding is on the outer wrapper already */
  }
  .highlight code { background: transparent !important; }

</style>

# 📷 FOOD4THOTH Trace Overlay — Mobile Camera Lucida

**Trace on paper using your phone.** Load any reference image (or capture a frame from the live camera), position it atop the camera view, then look through your phone to trace with accurate proportions.

👉 **Live demo:** `https://www.food4thoth.com/Trace/`  
👉 **Add to Home Screen:** Use your browser share menu → **Add to Home Screen** for a fullscreen, app-like experience.

---

## ✨ Features

- **Overlay any image** from Photos / Files (supports HEIC/HEIF, JPG, PNG).  
- **Grab Frame** from the live camera to freeze a reference.  
- **Drag / Pinch / Rotate** gestures on the overlay image.  
- **Ghost (opacity)** slider for see‑through tracing.  
- **Mirror** (flip horizontally) and **Rotate** with snapping.  
- **Grid overlay** to help align proportions.  
- **Torch** toggle (on devices/browsers that expose the capability).  
- **Camera Zoom** (hardware zoom via `MediaTrackConstraints` when available, else CSS fallback).  
- **Nudge controls** for pixel-precise moves + angle snap.  
- **Fit Width / Fit Height** quick scaling.  
- **Help bubble** with core gestures.  
- **Bottom Bar Toggle** button in the top toolbar hides/shows the entire bottom control panel.  
- **State persistence** via `localStorage` (opacity, grid, overlay transform, camera zoom, bottom bar state).  
- **PWA‑ready**: optional `manifest.webmanifest` and `sw.js` service worker.

---

## 🧭 UI & Controls

**Top Bar**  
- 🖼️ **Photos** — Pick an image from Photos/Files.  
- 📷 **Take Photo** — Capture via camera picker (rear camera).  
- 🧩 **Grab Frame** — Snapshot the current live camera frame into the overlay.  
- ↺ **Reset** — Reset overlay position/scale/rotation (keeps lock).  
- 🔒 **Lock** — Locks overlay; pinch then zooms the **camera** instead.  
- ↔︎ **Mirror** — Flip overlay horizontally.  
- # **Grid** — Toggle grid overlay above camera.  
- 💡 **Torch** — Toggle device torch (where supported).  
- ❓ **Help** — Show/hide help bubble.  
- ⬇︎ / ⬆︎ **Hide/Show** — Collapse/expand the **bottom bar**.  
- ⬆️ **Add Home** — Instructions to Add to Home Screen.

**Bottom Bar**  
- **Ghost** — Overlay opacity.  
- **Rotate** — Slider (snaps when within 3° of –180, –90, 0, 90, 180).  
- **CamZoom** — Camera zoom slider (hardware zoom if supported).  
- **Nudge Pad** — ⬆︎⬇︎⬅︎➡︎ move overlay by a few pixels; • center; ⤾ snap rotation.  
- **Fit** — **Fit Width** / **Fit Height** to quickly scale overlay.

**Gestures**  
- **Drag** with one finger.  
- **Pinch** to scale.  
- **Twist** (two fingers) to rotate.  
- **Double‑tap overlay** to reset transform.  
- **When Locked**: two‑finger pinch adjusts **camera zoom**.

---

## 📁 File Structure

```
/Trace
│── index.html            # This app
│── og-preview.jpg        # Social preview image
│── manifest.webmanifest  # (optional PWA manifest)
│── sw.js                 # (optional Service Worker)
│── nav-fetch.js          # (optional site navigation)
│── nav_script2.js        # (optional site navigation)
```

> The `nav-*.js` files are optional. Remove their `<script>` tags if you don't use site-wide navigation injection.

---

## 🔧 Quick Start (Local Development)

### 1) Serve over HTTPS or localhost
Camera access requires a secure context:
- Deploy on **https://** OR  
- Use **localhost** during development.

### 2) Run a quick local server

**Python 3**
```bash
cd Trace
python -m http.server 8000
# open http://localhost:8000 
in Safari/Chrome 
(mobile devices: same Wi‑Fi, use your machine IP)
```

**Node (http-server)**
```bash
npm i -g http-server
http-server -p 8000
```

---

## 💾 State Persistence (localStorage Keys)

- `trace.opacity` — number (0.05–1).  
- `trace.grid` — boolean.  
- `trace.zoom` — number (hardware zoom value or CSS scale).  
- `trace.state` — object `{ x, y, scale, rot, mirror, locked }`.  
- `trace.bottomOpen` — boolean to show/hide the bottom bar.

> All values are stored **locally on device**. No data leaves the browser.

---

## 🔒 Permissions & Privacy

- The app uses `getUserMedia({ video })` to access the camera feed.  
- **No server upload:** Images you load or frames you grab remain **on device**.  
- Torch/zoom requests are applied to the current camera track where supported.  
- Wake Lock API (when available) keeps the screen on during tracing.


---

## 🔎 SEO & Social (already included)

- Canonical link, basic description, robots.  
- Open Graph (`og:*`) and Twitter card.  
- JSON‑LD `WebApplication` schema.  
- Favicons / apple-touch-icon.

---

## 🧩 Accessibility Notes

- Buttons include `aria-label`/`aria-pressed` where relevant.  
- Bottom bar declares `role="region"`; top bar declares `role="navigation"`.  
- Live status for nudges may use a visually hidden element with `aria-live="polite"`.  
- Ensure contrast (light text on dark UI).

---

## 📱 Compatibility & Known Limitations

- **Secure context required:** HTTPS or localhost.  
- **iOS Safari**  
  - Torch and hardware zoom availability depends on device and iOS version.  
  - Some HEIC/HEIF images may decode differently across devices.  
- **Android/Chrome**: Torch/zoom vary by OEM and camera HAL capabilities.  
- **Desktop browsers**: App works, but intended for phones/tablets.

If the camera feed remains blank:
1) Confirm page is on **https://** or **localhost**.  
2) Check browser **camera permissions** (blocked = no prompt).  
3) Ensure another tab/app is not using the camera.  
4) Reload the page after granting permission.

---

## 🤝 Contributing

1. Fork this project.  
2. Create a feature branch: `git checkout -b feature/your-idea`  
3. Commit: `git commit -m "feat: add your idea"`  
4. Push: `git push origin feature/your-idea`  
5. Open a Pull Request.

---

## 🌌 Philosophy and Vision

Food4Thoth is inspired by the principles of its namesake, Thoth:
- **Creativity**: A celebration of art, imagination, and innovation.
- **Exploration**: Encouraging curiosity and the pursuit of knowledge.
- **Community Building**: Connecting individuals through shared resources and mutual support.
- **Playfulness**: Balancing deep inquiry with interactive and fun experiences.

The platform is a digital garden where ancient wisdom meets modern innovation.

---

## ✨ Why Visit Food4Thoth?

1. **Diverse Offerings**: Content that caters to various interests, from art and mysticism to community activism.
2. **Interactive Tools**: Explore engaging applications like calculators, games, and divination apps.
3. **Community Engagement**: Opportunities for collaboration and connection through artistic and social projects.
4. **Inspiration**: A space to spark curiosity, reflection, and joy.

---

## 🤝 Support and Contributions

Your contributions help support innovative projects like the Rainbow Glo-Calculato, community gardens, and esoteric tools, ensuring **Food4Thoth** continues to thrive.

### Donation Options

#### Traditional Payments:
1. [PayPal](https://paypal.me/artabillies)
2. [Venmo](https://venmo.com/u/DeJahnvu)

#### Cryptocurrency:
- **Ethereum (ETH) & ERC-20 Tokens**:  
  <div class="wrap">0x900e8f0d397048fD946b05553DeD5Ed3D5e4f1a0</div>  
  

- **Bitcoin (BTC)**:  
  <div class="wrap">bc1qcsa7ffef296pp9hkrn03p9wu7lt0fm3s2sz0wp</div>  
  

- **Ethereum Classic (ETC)**:  
  <div class="wrap">0xEb3C0e08868ACB0f515442579333c41E7a34F215</div>

- **Solana (SOL)**:  
   <div class="wrap">B7nCFQs6HkFAvkz1wEUiPpM4Cj7G6FJNYQ7Avrt6a4cm</div> 
  

- **Ripple (XRP)**:  
  Address:  <div class="wrap">rEAKseZ7yNgaDuxH74PkqB12cVWohpi7R6</div> 
  Memo: `3109966062`  
  

- **Dogecoin (DOGE)**:  
  <div class="wrap">DP2e6J8NbUzswLtBw8ou2xYz4BinyzgU7n</div>  
  

- **Cardano (ADA)**:  
  <div class="wrap">addr1qxqgjp4h4vh4pxrg7jur8m96lzf5w98cahfflrw376qhufgg6h5us0avc20ee2azzun58lgylyl54sjr6y9efwq86krs3ladtw</div>  
  

- **Bitcoin Cash (BCH)**:  
   <div class="wrap">bitcoincash:qpu93py8j8ykcf7m6tmau2hldefl67t9lydw8afsa5</div> 
 

- **Stellar Lumens (XLM)**:  
  Address:  <div class="wrap">GB2ES2N326MZK4EGJBKN3ZARCQ5RTFQSAWIJAAKFVIIIJSCC35TXIMLB</div>
  Memo: `2967141893`  
 

- **Litecoin (LTC)**:  
   <div class="wrap">ltc1qklestxa5shsym0gmuqmv2xewp56cst58vmhggl</div>

- **Tezos (XTZ)**:  
   <div class="wrap">tz1guFykj1dQAyiGH7g5YJVZzaGdoTWeMK81</div>  
 

---

## 💡 Wallets
1. **Coinbase Wallet**:  
  <div class="wrap">0x30D47A5815D94040291a819B8E39765AA09d44A8</div> 
   

2. **Metamask Wallet**:  
   <div class="wrap">0x30D47A5815D94040291a819B8E39765AA09d44A8</div>

3. **VeWorld Wallet**:  
    <div class="wrap">0x020a79559990145e2f7d48c5771b233399b30bee</div> 
   

4. **Anchor Wallet**:  
   `artabilly.gm`

---

## 🤝 Contribution Guidelines

We welcome contributions to enhance this project:
1. Fork the repository.
2. Create a feature branch: `git checkout -b feature-name`.
3. Commit your changes: `git commit -m "Add feature or fix"`.
4. Push your branch: `git push origin feature-name`.
5. Submit a pull request for review.

---

## 🔗 Explore the Food4Thoth Hub

Visit the **Food4Thoth** portal and begin your journey through creativity, mysticism, and connection.

- 🌟 [FOOD4THOTH Website](../index.html)
- 🌟 [FOOD4THOTH Instagram](https://www.instagram.com/emerald_path_food4th0th/profilecard/?igsh=dTJnejRlczhqNjho)
- 🌟 [FOOD4THOTH Facebook](https://www.facebook.com/share/W8VnfAM2NHBAMTUb/?mibextid=JRoKGi)
- 🌟 [Learn About ARTABILLIES](../Artabillies/index.html)
- 🌟 [ARTABILLIES Website](http://www.artabillies.com)
- 🌟 [ARTABILLIES Instagram](https://www.instagram.com/artabillies/profilecard/?igsh=MW1zbGg2Y2Z1a3FhdQ==)
- 🌟 [ARTABILLIES Facebook](https://www.facebook.com/share/sEUxePbaAo9kyRNN/?mibextid=JRoKGi)
- 🌟 [ARTABILLIES Facebook Group](https://www.facebook.com/share/g/6N5MX3W8pS3dbQuD/?mibextid=K35XfP)
- 🌟 [Rstory, FOOD4THOTH & ARTABILLIES](../RstoryArtabillies/index.html)
- 🌟 [Donations Page](../Donations/index.html)

---

## 💌 Contact

For inquiries or feedback:
- **Email**: [food4thoth@proton.me](mailto:food4thoth@proton.me)

---

## 🎉 Acknowledgments

Food4Thoth represents the collective effort of artists, mystics, and community builders. Thank you to all contributors and supporters who make this digital garden flourish.

Join us and explore the endless possibilities of **Food4Thoth**!

---

<style>
  .wrap {
    word-wrap: break-word;
    overflow-wrap: break-word;
    white-space: normal;
  }
</style>

## Thank you for exploring the FOOD4THOTH Trace Camera Lucida! Keep creating, keep questioning, and keep playing with the infinite. 🌌✨


## 🧾 License

© 2025 **FOOD4THOTH**. All rights reserved.  
This project’s source is provided for personal and educational use. Commercial redistribution requires permission.

---

## 🙏 Credits

Design & development by **FOOD4THOTH**.  
Inspired by classic camera lucida tools, adapted for modern mobile browsers.
