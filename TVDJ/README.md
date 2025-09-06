---
layout: default
title: "AV Slicer — Live Video + Audio Sampler — README"
description: "A browser-based AV sampler that slices video+audio into triggerable clips, supports keyboard banks, overlapping layers, optional backing track, and BPM/grid quantize for live performance."
permalink: /TVDJ/readme/
image: https://www.food4thoth.com/TVDJ/og-preview.jpg

og_title: "AV Slicer — Live Video + Audio Sampler (Web App)"
og_description: "Slice, trigger, layer, and quantize video+audio clips right in your browser. Keyboard banks, backing tracks, and a mobile mini-keyboard included."
og_image: https://www.food4thoth.com/TVDJ/og-preview.jpg

twitter_card: summary_large_image
twitter_title: "AV Slicer — Live Video + Audio Sampler (Web App)"
twitter_description: "Clip grid triggers, overlapping layers, backing track, and BPM quantize — all in your browser."
twitter_image: https://www.food4thoth.com/TVDJ/og-preview.jpg
---

<style>
  body { background:#000; color:#fff; font-family: system-ui, -apple-system, sans-serif; line-height:1.6; }
  a { color:#00ffff; }
  h1, h2, h3, h4, h5, h6 { color:#ff66cc; }
  .nav-button {
    display:inline-block; padding:10px 18px; margin:6px;
    background:linear-gradient(135deg,#ff00ff,#001eff);
    color:#fff; font-weight:700; text-decoration:none;
    border-radius:8px; box-shadow:3px 3px 12px rgba(255,0,255,.5);
    font-size:1rem; transition:all .3s ease;
  }
  .nav-button:hover {
    background:linear-gradient(135deg,#00ffff,#6600cc);
    box-shadow:0 0 10px #00ffff;
  }
  .wrap { word-wrap:break-word; overflow-wrap:break-word; white-space:normal; }
  .callout { border:1px solid #444; padding:12px; border-radius:8px; background:#0b0b0b; }
  hr { border:0; border-top:1px solid #444; margin:24px 0; }
</style>

<div style="text-align: center; margin-bottom: 20px;">
  <a class="nav-button" href="https://www.food4thoth.com/index.html">FOOD4THOTH Website</a>
  <a class="nav-button" href="https://www.instagram.com/emerald_path_food4th0th/profilecard/?igsh=dTJnejRlczhqNjho">FOOD4THOTH Instagram</a>
  <a class="nav-button" href="https://www.facebook.com/share/W8VnfAM2NHBAMTUb/?mibextid=JRoKGi">FOOD4THOTH Facebook</a>
  <a class="nav-button" href="https://www.food4thoth.com/Artabillies/index.html">Learn About ARTABILLIES</a>
  <a class="nav-button" href="https://www.instagram.com/artabillies/profilecard/?igsh=MW1zbGg2Y2Z1a3FhdQ==">ARTABILLIES Instagram</a>
  <a class="nav-button" href="https://www.facebook.com/share/sEUxePbaAo9kyRNN/?mibextid=JRoKGi">ARTABILLIES Facebook</a>
  <a class="nav-button" href="https://www.facebook.com/share/g/6N5MX3W8pS3dbQuD/?mibextid=K35XfP">ARTABILLIES Facebook Group</a>
  <a class="nav-button" href="https://www.artabillies.com/contact-us">Contact Artabillies</a>
  <a class="nav-button" href="https://www.artabillies.com/artist-info">Artists Info</a>
  <a class="nav-button" href="https://www.food4thoth.com/RstoryArtabillies/index.html">Artabillies Rstory & TUDE</a>
  <a class="nav-button" href="https://www.food4thoth.com/Inprogression/index.html">INPROGRESSION Info</a>
  <a class="nav-button" href="https://www.food4thoth.com/MusicLibrary/index.html">INPROGRESSION Music Library</a>
  <a class="nav-button" href="https://www.food4thoth.com/MusicLibraryVis/index.html">INPROGRESSION Library w/Visualiser</a>
  <a class="nav-button" href="https://www.facebook.com/share/19M7DM1SrT/?mibextid=wwXIfr">INPROGRESSION Facebook</a>
  <a class="nav-button" href="https://www.artabillies.com/inprogression">INPROGRESSION Artabillies</a>
  <a class="nav-button" href="https://www.food4thoth.com/ArpAppNoVisualHighFi/index.html">Arp Synth NoVis HIFI</a>
  <a class="nav-button" href="https://www.food4thoth.com/ArpAppNoVisualLoFi/index.html">Arp Synth NoVis LOFI</a>
  <a class="nav-button" href="https://www.food4thoth.com/ArpAppWithVisual/index.html">Arp Synth Visualizer</a>
  <a class="nav-button" href="https://www.food4thoth.com/Bboy/index.html">NoWhere Man Mixer</a>
  <a class="nav-button" href="https://www.food4thoth.com/BJungle/index.html">Creature Art Mixer</a>
  <a class="nav-button" href="https://www.food4thoth.com/LoopStation/index.html">Loop Mixer</a>
  <a class="nav-button" href="https://www.food4thoth.com/LoopStationHiFi/index.html">Loop HIFI Mixer</a>
</div>

# 🎬 AV Slicer — Live Video + Audio Sampler (Web App)

## Overview
**AV Slicer** is a single-page web app that lets you load a video file (with audio), **slice it into clips**, and **trigger** those clips from a **grid of buttons**, a **keyboard**, or a **mobile mini-keyboard**. It supports **overlapping layers** (polyphony), an optional **backing track** (Web Audio buffer or media element), and **BPM/grid quantize** so your triggers can land on beat.

No installs, no builds — **open the page and perform**.

---

## Demo / Canonical
- Canonical: [https://www.food4thoth.com/TVDJ/](https://www.food4thoth.com/TVDJ/index.html)
- README permalink: [https://www.food4thoth.com/TVDJ/readme/](https://www.food4thoth.com/TVDJ/readme/)
- OG image: [https://www.food4thoth.com/TVDJ/og-preview.jpg](https://www.food4thoth.com/TVDJ/og-preview.jpg)

---

## Features
- **Load sources**
  - Video file (with audio) as the main source
  - Optional backing track (audio or video)
- **Slicing modes**
  - Fixed length (seconds)
  - Equal slices by count (N slices)
  - Offset start, per-clip edit (start/length), delete
- **Triggering**
  - Grid buttons
  - **Keyboard banks** (digits 1–0, then A–Z = 36 keys per bank; ⇧Shift = quick bank 2)
  - **Mobile mini-keyboard** docked at bottom
- **Layering**
  - Set maximum overlapping clips (polyphony)
- **Quantize**
  - BPM + grid size (¼, ⅛, 1/16, ½, bar)
  - Toggle on/off
- **Mixer**
  - Master volume, clip volume, backing volume
  - “Stop All Clips” panic
- **UX**
  - “Visual follows last trigger” (seek and show the clip on the preview)
  - Flash feedback on triggered clip
  - Persists volumes to active media elements
- **Responsive**
  - Single column controls + large preview; grid auto-fills

---

## Quick Start
1. Click “**Video (with audio)**” and choose a video file.
2. (Optional) Load a **Backing track** (audio or video).
3. Adjust slicing: **Mode**, **Len (s)** or **Count**, plus **Offset**.
4. Click **Make Clip Buttons**.
5. Trigger via:
   - UI **Clip buttons**
   - **Keyboard**: digits then letters (bank 1), hold **⇧Shift** for bank 2
   - **Mini-keyboard** on mobile/desktop
6. Use **BPM** + **Grid** + **Quantize: ON** to align triggers to beat.
7. **Max overlap** controls how many clips can play at once.
8. **Stop All Clips** to clear layers (backing continues unless toggled off).

---

## Controls Reference
- **Sources**
  - `Video (with audio)` — file picker for main video
  - `Backing track` — file picker for optional background (audio or video)
  - `▶/⏸ Backing` — toggle background playback
  - `Vol` — backing level
  - `Master` — app-wide media level (clips + preview)
- **Slicing**
  - `Mode` — `Fixed length (sec)` or `Equal slices (by count)`
  - `Len (s)` — seconds per clip (fixed length)
  - `Count` — number of slices (equal slices)
  - `Offset (s)` — start offset into the video
  - `Max overlap` — concurrent clip limit (polyphony)
  - `Make Clip Buttons` — create/refresh the clip grid
  - Each clip has: Start, Len, **Save**, **Delete**
- **Quantize**
  - `BPM` — tempo for the quantize grid
  - `Grid` — beat division (¼, ⅛, 1/16, ½, bar)
  - `Quantize: OFF/ON` — toggle delay-to-grid for triggers
  - `Visual follows last trigger` — seek preview to the last clip
- **Clip Defaults**
  - `Clip volume` — level applied to clip clones
  - `Stop All Clips` — stops all playing clip layers (not the backing)

---

## Keyboard & Banks
- **Base keys** per bank:  
  `1 2 3 4 5 6 7 8 9 0 a b c d e f g h i j k l m n o p q r s t u v w x y z`  
  (10 digits + 26 letters = 36 clips per bank)
- **Banking**
  - Bank 1 = default mapping
  - **Hold ⇧Shift** to fire keys in **bank 2** (quick access) without switching the mini bar’s page
  - Mini bar shows buttons for the **current bank**; use ◀ / ▶ to change
- Labels on clip buttons show the key hint (e.g., `⇧+K`).

---

## Architecture Notes
- **Main Video**: visual bus; muted (clips carry audio)
- **Clip Audio**: each trigger creates a **hidden video clone** (so decoded A/V stays in sync); clone plays audio for `dur` seconds then is removed
- **Backing**:
  - **Buffer mode** (`decodeAudioData`) if audio-only decode succeeds
  - **Media mode** (HTMLMediaElement) for other files (including video)
- **Quantize**: computes delay to next grid boundary using backing clock (if playing) or `performance.now()` as fallback
- **Volume**: `Master` applies to preview+clips; `Clip volume` caps per-clip level; `Vol` applies to backing bus

---

## Performance Tips
- Use **H.264/AAC MP4** or **WebM** sources for best decode/playback
- Keep **Max overlap** reasonable for your device/CPU (e.g., 2–6)
- Shorter **slice lengths** reduce decode seek stress
- When using **Quantize**, keep **BPM** accurate to your backing

---

## Accessibility
- Buttons are focusable; mini-keyboard is clickable/touchable
- Consider system **Reduce Motion** preferences in future updates
- Add captions to your video source for screen reader context (future)

---

## Troubleshooting
- No sound until first click: Browsers require user interaction to unlock audio; the app resumes the AudioContext on first click.
- Back button/spacebar triggers scroll: Ensure page focus is on the document (not inside an input).
- Crackles or lag: Lower Max overlap, use shorter clips, or try a different codec/container.
- Quantize feels late: Verify BPM and grid; ensure backing is playing (quantize locks to backing clock if present).

---

## Roadmap
- Save/Load clip sets (JSON)
- Optional MIDI in for triggers
- Per-clip transpose/playback rate and envelopes
- Basic send FX (delay/reverb) per clip layer

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

## 🔗 Explore the Food4Thoth Hub

Visit the **Food4Thoth** portal and begin your journey through creativity, mysticism, and connection.

- 🌟 [FOOD4THOTH Website](../index.html)
- 🌟 [FOOD4THOTH Instagram](https://www.instagram.com/emerald_path_food4th0th/profilecard/?igsh=dTJnejRlczhqNjho)
- 🌟 [FOOD4THOTH Facebook](https://www.facebook.com/share/W8VnfAM2NHBAMTUb/?mibextid=JRoKGi)
- 🌟 [Learn About ARTABILLIES](../Artabillies/index.html)
- 🌟 [Do You Do Dobbs Gallery](https://rstory.io/Dobbs_GATE.html) 
- 🌟 [ARTABILLIES Article](https://hive.blog/crypto/@rstory/artabillies-receives-1m-rstory-gratitude-tokens)
- 🌟 [ARTABILLIES Instagram](https://www.instagram.com/artabillies/profilecard/?igsh=MW1zbGg2Y2Z1a3FhdQ==)
- 🌟 [ARTABILLIES Facebook](https://www.facebook.com/share/sEUxePbaAo9kyRNN/?mibextid=JRoKGi)
- 🌟 [ARTABILLIES Facebook Group](https://www.facebook.com/share/g/6N5MX3W8pS3dbQuD/?mibextid=K35XfP)
- 🌟 [Contact Artabillies](https://www.artabillies.com/contact-us)  
- 🌟 [Artists Info](https://www.artabillies.com/artist-info)  
- 🌟 [Artabillies Rstory & TUDE](../RstoryArtabillies/index.html)  
- 🌟 [INPROGRESSION Info](../Inprogression/index.html)  
- 🌟 [INPROGRESSION Music Library](../MusicLibrary/index.html)  
- 🌟 [INPROGRESSION Library w/Visualiser](../MusicLibraryVis/index.html)  
- 🌟 [INPROGRESSION Facebook](https://www.facebook.com/share/19M7DM1SrT/?mibextid=wwXIfr) 
- 🌟 [INPROGRESSION Artabillies](https://www.artabillies.com/inprogression)
- 🌟 [NoWhere Man Mixer](../Bboy/index.html)  
- 🌟 [Creature Art Mixer](../BJungle/index.html)  
- 🌟 [Loop Mixer](../LoopStation/index.html)  
- 🌟 [Loop HIFI Mixer](../LoopStationHiFi/index.html) 
- 🌟 [Arp Synth NoVis HIFI](../ArpAppNoVisualHighFi/index.html)  
- 🌟 [Arp Synth NoVis LOFI](../ArpAppNoVisualLoFi/index.html)  
- 🌟 [Arp Synth Visualizer](../ArpAppWithVisual/index.html) 
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

⚡ Credits

Coded, and curated by DeJahn under Artabillies & FOOD4THOTH.

---

📝 License

© 2025 Food4Thoth. All rights reserved. Unauthorized redistribution, copying, or modification without explicit permission is prohibited.

<div style="text-align: center; margin-bottom: 20px;">
  <a class="nav-button" href="https://www.food4thoth.com/index.html">FOOD4THOTH Website</a>
  <a class="nav-button" href="https://www.instagram.com/emerald_path_food4th0th/profilecard/?igsh=dTJnejRlczhqNjho">FOOD4THOTH Instagram</a>
  <a class="nav-button" href="https://www.facebook.com/share/W8VnfAM2NHBAMTUb/?mibextid=JRoKGi">FOOD4THOTH Facebook</a>
  <a class="nav-button" href="https://www.food4thoth.com/Artabillies/index.html">Learn About ARTABILLIES</a>
  <a class="nav-button" href="https://www.instagram.com/artabillies/profilecard/?igsh=MW1zbGg2Y2Z1a3FhdQ==">ARTABILLIES Instagram</a>
  <a class="nav-button" href="https://www.facebook.com/share/sEUxePbaAo9kyRNN/?mibextid=JRoKGi">ARTABILLIES Facebook</a>
  <a class="nav-button" href="https://www.facebook.com/share/g/6N5MX3W8pS3dbQuD/?mibextid=K35XfP">ARTABILLIES Facebook Group</a>
  <a class="nav-button" href="https://www.artabillies.com/contact-us">Contact Artabillies</a>
  <a class="nav-button" href="https://www.artabillies.com/artist-info">Artists Info</a>
  <a class="nav-button" href="https://www.food4thoth.com/RstoryArtabillies/index.html">Artabillies Rstory & TUDE</a>
  <a class="nav-button" href="https://www.food4thoth.com/Inprogression/index.html">INPROGRESSION Info</a>
  <a class="nav-button" href="https://www.food4thoth.com/MusicLibrary/index.html">INPROGRESSION Music Library</a>
  <a class="nav-button" href="https://www.food4thoth.com/MusicLibraryVis/index.html">INPROGRESSION Library w/Visualiser</a>
  <a class="nav-button" href="https://www.facebook.com/share/19M7DM1SrT/?mibextid=wwXIfr">INPROGRESSION Facebook</a>
  <a class="nav-button" href="https://www.artabillies.com/inprogression">INPROGRESSION Artabillies</a>
  <a class="nav-button" href="https://www.food4thoth.com/ArpAppNoVisualHighFi/index.html">Arp Synth NoVis HIFI</a>
  <a class="nav-button" href="https://www.food4thoth.com/ArpAppNoVisualLoFi/index.html">Arp Synth NoVis LOFI</a>
  <a class="nav-button" href="https://www.food4thoth.com/ArpAppWithVisual/index.html">Arp Synth Visualizer</a>
  <a class="nav-button" href="https://www.food4thoth.com/Bboy/index.html">NoWhere Man Mixer</a>
  <a class="nav-button" href="https://www.food4thoth.com/BJungle/index.html">Creature Art Mixer</a>
  <a class="nav-button" href="https://www.food4thoth.com/LoopStation/index.html">Loop Mixer</a>
  <a class="nav-button" href="https://www.food4thoth.com/LoopStationHiFi/index.html">Loop HIFI Mixer</a>
</div>
