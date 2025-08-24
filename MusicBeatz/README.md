---
layout: default
title: "MAX Sounds Multitrack Sequencer — README"
description: "A performance-ready Web Audio multitrack step sequencer with synth & drum engines, sampler + mic recording, granular clouds, and master FX (delay, chorus, phaser, reverb, drive, compressor, sidechain ducking). Mobile-first grid that never overflows the viewport."
permalink: /MusicBeatz/readme/
image: https://www.food4thoth.com/MusicBeatz/MAXSounds_og.jpg

og_title: "MAX Sounds — Web Audio Multitrack Sequencer"
og_description: "Build beats, basslines, and textures with a 16–64 step grid, synth/drum engines, live sampler, granular bursts, and studio-style master FX — all in your browser."
og_image: https://www.food4thoth.com/MusicBeatz/MAXSounds_og.jpg

twitter_card: summary_large_image
twitter_title: "MAX Sounds — Web Audio Multitrack Sequencer"
twitter_description: "Performance-ready browser sequencer with synths, drums, sampler/mic, granular, and master FX. Function > form. Mobile-friendly."
twitter_image: https://www.food4thoth.com/MusicBeatz/MAXSounds_og.jpg
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

<div style="text-align:center; margin-bottom:20px;">
  <a class="nav-button" href="https://www.food4thoth.com/index.html">FOOD4THOTH Website</a>
  <a class="nav-button" href="https://www.food4thoth.com/Artabillies/index.html">Learn About ARTABILLIES</a>
  <a class="nav-button" href="https://www.food4thoth.com/RstoryArtabillies/index.html">Artabillies Rstory &amp; TUDE</a>
  <a class="nav-button" href="https://www.food4thoth.com/Inprogression/index.html">INPROGRESSION Info</a>
  <a class="nav-button" href="https://www.food4thoth.com/MusicLibrary/index.html">INPROGRESSION Music Library</a>
  <a class="nav-button" href="https://www.food4thoth.com/ArpAppWithVisual/index.html">Arp Synth Visualizer</a>
  <a class="nav-button" href="https://www.food4thoth.com/LoopStationHiFi/index.html">Loop HIFI Mixer</a>
</div>

# 🎚️ MAX Sounds — Web Audio Multitrack Sequencer

## Overview
MAX Sounds is a Web Audio API multitrack step sequencer designed for fast idea capture and live performance. It blends per-track engines (kicks, snares, hats, toms, cymbal, basses, subtractive/FM/wavetable synths, PWM, Karplus-Strong plucks), a step-aware **Sampler** with mic recording and file load, and a **Granular** source for cloud textures. The master buss includes **Delay**, **Chorus**, **Phaser**, **Reverb**, **Drive**, **Compressor**, and **Sidechain ducking** keyed by kicks. A **Global LFO** can modulate each track’s filter via per-track amount.

The UI is *function > form*: minimal, responsive, and optimized so the step grid **never exceeds phone width** in portrait.

---

## Feature Highlights
- **Transport & Grid**: Play/Stop, BPM 40–220, Steps 8–64, spacebar transport, per-track playhead
- **Tracks**: Add via presets, Mute/Solo, Volume, Pan, Drive, Filter, Sends, Auto-Pan, 2 macro params (P1/P2), Duplicate/Delete
- **Engines**: Drum synths, Basses/Synths (FM, PWM, Wavetable, KS Pluck), Noise, Ring Mod
- **Sampler/Granular**: Loop/one-shot, mic recording, reverse/rate/loop, grain clouds
- **Master FX**: Delay, Reverb, Chorus, Phaser, Drive, Compressor, Sidechain
- **Global LFO**: Rate/Depth, routed per-track
- **Pattern I/O**: Randomize, Clear, Export/Import (JSON)
- **Mobile grid**: No horizontal overflow; portrait scaling

---

## Quick Start
1. Click **Start Audio** to unlock sound.
2. Hit **Play** or press **Space**.
3. Toggle steps on tracks.
4. Adjust **BPM** and **Steps**.
5. Add tracks (Sampler/Granular).
6. Mix: per-track filter, drive, sends.
7. Master: Delay, Chorus, Phaser, Reverb, Drive, Comp, Duck.
8. Save/export JSON patterns.

---

## Controls Reference
- **Global**: BPM, Steps, Randomize, Export/Import
- **Master FX**: Delay, Reverb, Chorus, Phaser, Drive, Comp, Duck, Volume
- **Track**: Engine, Mute/Solo, Vol, Pan, Filter, Drive, Sends, Auto-Pan, LFO Amt, P1/P2, Duplicate/Delete

---

## Engine Macros
- **PWM**: width / decay  
- **Wavetable**: wave select / decay  
- **FM/Bell**: index / decay  
- **Pluck (KS)**: brightness / decay  
- **Granular**: grain dur/spray / rate/cloud length  
- **Ring Mod**: carrier freq  

---

## Mobile & Performance Notes
- Grid uses `minmax()` & CSS vars to fit screen.
- Portrait shrinks cell: `--cell: calc(100vw / var(--cols) - 4px)`.
- Touch hardened, no accidental text select.
- Tight scheduler w/ short lookahead.
- Spacebar transport.

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