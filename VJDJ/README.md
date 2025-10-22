---
layout: default
title: "Video-DJ — Live Visualizer + Recorder — README"
description: "A browser-based VJ app: mix audio-reactive visuals with wallpaper & overlay videos, pro blend modes, glitch/kaleidoscope/mirror FX, EQ + reverb, and record WebM with audio."
permalink: /VJDJ/readme/
image: https://www.food4thoth.com/VJDJ/og-preview.jpg

og_title: "Video-DJ — Live Visualizer + Recorder (Web App)"
og_description: "Audio-reactive VJ app in your browser. Mix overlay videos with blend modes, add glitch/kaleidoscope FX, and record shareable WebM clips."
og_image: https://www.food4thoth.com/VJDJ/og-preview.jpg

twitter_card: summary_large_image
twitter_title: "Video-DJ — Live Visualizer + Recorder (Web App)"
twitter_description: "Browser VJ app: audio-reactive visuals, overlay video blend modes, glitch/kaleidoscope FX, and one-click recording."
twitter_image: https://www.food4thoth.com/VJDJ/og-preview.jpg
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

# 🎛️ Video-DJ — Live Visualizer + Recorder (Web App)

## Overview
**Video-DJ (VJDJ)** is a single-page **browser VJ app**. Load your **music files, mic/line-in, or a simulation** source; blend in **wallpaper & overlay videos** with **pro blend modes**; sculpt the look with **glitch / kaleidoscope / mirror / pixel / vignette / aberration** effects; and **record** everything to a **WebM** video with audio. No installs — **open the page and perform**.

- Live canvas **visualizer** → **WebGL** shader post-FX
- **Blend-mode overlay** video with compatibility auto-detection
- **AudioHub**: master, reverb send, bass/treble EQ
- **AutoMode**: start/stop recorder with the track
- **Presets** switch visuals mid-performance

---

## Demo / Canonical
- Canonical app: **https://www.food4thoth.com/VJDJ/**  
- README permalink: **https://www.food4thoth.com/VJDJ/readme/**  
- OG image: **https://www.food4thoth.com/VJDJ/og-preview.jpg**

---

## Features
- **Inputs**
  - **Playlist (Files/iCloud/Drive)** — audio or video
  - **Microphone / Line-In** — via `getUserMedia`
  - **Simulation** — test tone (saw) + noise w/ LFO vibrato
- **Audio processing**
  - **Master gain**, **Convolver reverb** send, **Bass/Treble** shelves
  - **Analyser**: level, **bass/mid/treble** bands, simple **beat** pulse
- **Visual engine**
  - 2D canvas **modes**: _Bars, Radial, Mandala, Shapes, Dreaming, Psychedelic, Tunnel, Lissajous_
  - WebGL post-FX: **Hue**, **Saturation**, **Contrast**, **Glitch**, **Kaleidoscope (slices)**, **Mirror X/Y**
  - Extra SFX: **Pixelate**, **Vignette**, **Chromatic Aberration**, **Warp**, **Posterize**, **Scanlines**, **Audio-react amount**
- **Overlay layer**
  - Load an **Overlay video**, choose **Scale**, **Opacity**, and **Blend mode**
  - **Blend-mode support detection** auto-disables unsupported options per browser
- **Recording**
  - Canvas + master audio mixed via `captureStream()` + `MediaRecorder`
  - Codec selection fallback: VP9 → VP8 → generic WebM
  - **AutoMode** starts/stops recording with media element playback
- **UX polish**
  - **Double-tap a label** to reset that control (iOS/desktop)
  - Presets grid for fast visual switching
  - Status badge and share/download helpers

---

## Quick Start
1. **Open the app:** `https://www.food4thoth.com/VJDJ/`
2. **Load audio/video** files (bottom dock → 🎵).  
   _Tip: videos can act as audio tracks; visuals still react to the audio._
3. (Optional) **Mic/Line-In** (🎙) or **Simulation** (〰️) source.
4. Open **Wallpaper & Video Layers** (🖼):
   - Pick a **Wallpaper image** or **Background video**.
   - Pick an **Overlay video** and adjust **Scale**, **Opacity**, **Blend**.
5. Open **Color & Levels** (🎚) and **SFX** (✨) to style the look.
6. **Record** (REC): saves **WebM** with audio; then **Download** or **Share**.
7. Enable **AutoMode** (🤖) to arm REC with Play/End of the current file.

---

## Controls Reference

### Transport & Import (Bottom Dock)
- **⏮ Prev / ▶ Play-Pause / ⏭ Next**
- **Add tracks** (🎵) — choose multiple audio/video files
- **Mic** (🎙) — use microphone/line-in
- **Simulation** (〰️) — test tone + noise

### AudioHub (Headphones FAB → Sheet)
- **Source**: Playlist / Mic / Simulation
- **Master Volume**
- **Reverb Amount** (convolver send)
- **Bass (lowshelf)** / **Treble (highshelf)**

### Panels (Left Rail)
- **Wallpaper & Video Layers (🖼)**
  - Background Color
  - Wallpaper Image (cover)
  - Background Video (cover)
  - **Overlay Video** (centered)
  - **Overlay Scale** (20–300%)
  - **Overlay Opacity** (0–100%)
  - **Overlay Blend**: `normal (source-over)`, `screen`, `lighter`, `multiply`, `difference`, `hard-light`, `soft-light`, `overlay`, `darken`, `lighten`, `color-dodge`, `color-burn`, `exclusion`, `hue`, `saturation`, `color`, `luminosity`  
    _Unsupported modes are auto-disabled for your browser._
- **Color & Levels (🎚)**
  - Hue, Saturation, Contrast, Trails (feedback)
- **SFX (✨)**
  - Glitch, Kaleidoscope Slices, Mirror X/Y  
  - **Extra SFX** (injected rows): Pixelate, Vignette, Chromatic Aberration, Warp, Posterize, Scanlines, Audio-react amount
- **Presets (🔷)** — switch visual modes on the fly

### Recorder Rail (Right)
- **REC** — start/stop MediaRecorder
- **🤖 AutoMode** — start with Play, stop on track end
- **Share** — Web Share API (if supported)
- **Download** — last recording WebM

### QoL
- **Double-tap any slider’s label** to reset its default value.
- When the page is hidden, playback pauses to conserve battery.

---

## Blend-Modes Compatibility (Important)
The app **probe-tests** each `CanvasRenderingContext2D.globalCompositeOperation` and **disables** unsupported options for your browser. If a mode is greyed out and shows “(unsupported)”, choose another mode. The **fallback** is always `source-over` (normal).

---

## Recording Details
- **Stream**: `stage.captureStream(60)` + `AudioContext` master into `MediaStreamDestination()` → `MediaRecorder`
- **Codecs**: attempts `video/webm;codecs=vp9,opus` → `vp8,opus` → `video/webm`
- **Bitrates**: video ~6 Mbps, audio ~192 kbps (tweakable in code)
- **Output**: `VideoDJ_*.webm` (download/share after stop)

> _Note:_ Safari may prefer VP8 over VP9; older iOS versions may restrict MediaRecorder. If recording isn’t supported, you’ll see an alert with the error message.

---

## Browser Support & Permissions
- Requires **WebGL**, **Web Audio**, and **MediaRecorder**.
- **Microphone** prompts a permission dialog; denied access will disable Mic mode.
- **Autoplay policies**: Audio is unlocked after the first user gesture (click/tap).

---

## Performance Tips
- Use **H.264/AAC MP4** or **WebM** inputs for smooth decode.  
- Keep **Overlay Scale** close to **100%** and use shorter/looped overlay videos.
- Lower **Glitch/Pixelate/Warp** if GPU is weak; try fewer kaleidoscope slices.
- Mobile: rotate to **landscape** and close other tabs for best performance.

---

## Troubleshooting
- **No sound until click/tap** → Browser autoplay policy; interact once to unlock audio.
- **Recording not supported** → Try a Chromium browser or check codec fallbacks.
- **Blend mode doesn’t change** → It may be unsupported; choose a different mode.
- **Crackling** → Lower reverb amount, reduce SFX intensity, or close background apps.
- **Black screen** → Ensure WebGL is enabled; try another browser/device or update GPU drivers.

---

## Tech Stack (At a Glance)
- **UI / Panels**: plain HTML/CSS
- **Audio**: Web Audio API (Gain, BiquadFilter, Convolver, Analyser)
- **Visuals**: 2D Canvas → uploaded to **WebGL** texture each frame
- **Shader FX**: single pass fragment shader (HSV ops, posterize, scanlines, vignette, aberration, warp, glitch)
- **Recording**: Canvas `captureStream()` + Web Audio → `MediaRecorder`

---

## Embed / Link
Use the canonical URL anywhere you need to link to the app:

https://www.food4thoth.com/VJDJ/

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
