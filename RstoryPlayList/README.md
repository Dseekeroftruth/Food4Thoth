---
title: "Rstory Playlist & Downloader — Solana Token-Gated Audio Hub"
subtitle: "FOOD4THOTH player with Phantom connect, gated video hydration, and RSTORY download unlocks"
author: "DeJahn (Food4Thoth / Artabillies)"
created: 2025-10-10
last_updated: 2025-10-10
permalink: /RstoryPlayList/readme/
layout: default
image: https://www.food4thoth.com/RstoryPlayList/TaxStarve.png
tags:
  - Food4Thoth
  - RSTORY
  - Solana
  - Phantom
  - token gating
  - playlist
  - Swiper
  - Web Audio
description: |
  A client-only playlist and downloader that integrates Phantom wallet connect on Solana to gate
  premium content by RSTORY token balance. Fans can listen to tracks, unlock a hidden message,
  and, at higher thresholds, download media. Includes a Swiper coverflow slider, a minimalist
  audio player, token-aware video hydration, and a cinematic rune-decode effect.
canonical_url: "https://www.food4thoth.com/RstoryPlayList/index.html"
social:
  image: "https://www.food4thoth.com/RstoryPlayList/RivieraBones.png"
  twitter_card: "summary_large_image"
  twitter_site: "@Food4ThOth"
  og_type: "website"
  og_title: "Rstory Token-Gated Playlist & Downloader"
  og_description: "Connect Phantom, verify RSTORY, and unlock exclusive FOOD4THOTH media & downloads."
---

<style>
  /* Readme page theming (safe to keep here; remove if your site injects its own) */
  :root { --fg:#fff; --bg:#000; --accent:#00ffff; --head:#ffd400; --card:#0d0d0d; }
  body { background:var(--bg); color:var(--fg); }
  a { color:var(--accent); text-decoration:none; }
	body {
    background-color: black;
    color: white;
  }
  a { color: #00ffff; }
  h1, h2, h3, h4, h5, h6 { color: yellow; }
	
  a:hover { text-decoration:underline; }
  h1,h2,h3,h4,h5,h6 { color: var(--head); }
  code, pre code { background:#101317; color:#cfe8ff; border:1px solid #18202b; padding:0.2em 0.4em; border-radius:6px; }
  pre { background:#0c0f14; border:1px solid #1a2330; border-radius:10px; padding:14px; overflow:auto; }
  blockquote { border-left:4px solid #334155; margin:1em 0; padding:0.6em 1em; background:#0a0d12; color:#cbd5e1; }
  .kbd { border:1px solid #3b3b3b; background:#171717; border-bottom-width:3px; padding:.15em .45em; border-radius:.4em; font-family:ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", monospace; }
  .nav-button {
    display:inline-block; padding:10px 18px; margin:6px;
    background:linear-gradient(135deg,#ff00ff,#001eff);
    color:#fff; font-weight:bold; text-decoration:none; border-radius:8px;
    box-shadow:3px 3px 12px rgba(255,0,255,.5); font-size:1rem; transition:.3s;
  }
  .nav-button:hover { background:linear-gradient(135deg,#00ffff,#6600cc); box-shadow:0 0 10px #00ffff; }
  .wrap { word-wrap: break-word; overflow-wrap: break-word; white-space: normal; }
  .callout { border:1px solid #263042; padding:12px 14px; background:#0b1017; border-radius:10px; }
  .ok { color:#22c55e; }
  .warn { color:#f59e0b; }
  .err { color:#ef4444; }
</style>

# 🎧 Rstory Playlist & Downloader

A **Phantom wallet**–aware, **Solana** token-gated audio hub for **FOOD4THOTH** releases.  
Holders with at least **1 RSTORY** can view the special message; holders with **10,000 RSTORY** can download gated tracks/videos.  
The carousel opens on **“Riviera of Bones.”**

---

## ⚡ Highlights

- **Phantom Connect** + balance check via `@solana/web3.js`
- **Two thresholds**
  - View message ≥ **1** RSTORY
  - Enable downloads ≥ **10,000** RSTORY
- **Swiper coverflow** carousel that syncs to the audio player
- **Starts on “Riviera of Bones”** (`initialSlide: 4`, `currentSongIndex = 4`)
- **Gated video hydration** (sources are hex-encoded and only hydrated after gate)
- **Rune-style message decode** (cinematic “scramble → reveal”)
- **Downloader** that force-saves the current track when the gate allows

---

## 🗂️ File / Folder Layout (suggested)

```text
/RstoryPlayList/
  index.html              # main page (the big file you pasted)
  readme/
    index.md              # THIS README file (permalinked here)
  MidwayBlitz.png
  RivieraBones.png
  TaxStarve.png
  IMG_9573.JPG
  navigation.html         # loaded into #nav-container at runtime
```

> You can rename the README to `README.md`, but for pretty site routing use `readme/index.md` with the permalink above.

---

## 🛠️ Dependencies (CDN)

- Font Awesome 6.5.1  
- Swiper 11  
- Ionicons 7.1  
- `@solana/web3.js@1.95.3` (ESM from `esm.sh`)  
- (Optional) Phantom Wallet extension/app

_All are already referenced via CDN in `index.html`._

---

## 🧠 Token Gate — Config Overview

In `index.html` (Phantom section):

```js
// ---- CONFIG ----
const ANKR_HEX   = "<your_ankr_api_key_hex>";  // hex-encoded
const CHAIN      = "solana";                    // or "solana_devnet" / "solana_testnet"
const RSTORY_MINT = "RstyC4aoSD1JKPGTxnjB3PkWdRzV3yoePH1XiPMxBfz";
const RSTORY_DECIMALS = 6;

// Thresholds
const THRESHOLD_USER_UNITS = 10000; // download unlock ≥ 10,000 RSTORY
const VIEW_THRESHOLD_USER_UNITS = 1; // message unlock ≥ 1 RSTORY
```

- **API endpoint:**
  ```js
  `https://rpc.ankr.com/${CHAIN}/${hexToString(ANKR_HEX)}`
  ```
- **Event broadcast:** after each balance check, the page dispatches
  ```js
  window.dispatchEvent(new CustomEvent("rstory:gate", {
    detail: { hasAny, hasDownload, raw }
  }));
  ```
  …so other modules (videos, player, decoder) can react.

**Tip: Hex-encode your ANKR key (DevTools):**
```js
[...new TextEncoder().encode("YOUR_ANKR_KEY")]
  .map(b => b.toString(16).padStart(2,"0"))
  .join("");
```

---

## 🔊 Audio Player & Carousel Sync

**Start on “Riviera of Bones”:**
```js
let currentSongIndex = 4;

var swiper = new Swiper(".swiper", {
  // ...
  initialSlide: 4,
  // ...
});
```

**Slide ↔ Song mapping** _(adjust if you reorder slides)_:
```js
const slideToSong = [0, 1, 2, 3, 4, 5, 6, 7, 8];
```

**Keep them in sync:**
```js
function syncPlayerToSlide(i, { autoplay = false } = {}) {
  const next = slideToSong[i];
  if (next == null) return;
  currentSongIndex = next;
  updateSongInfo();
  if (autoplay) playSong(); else pauseSong();
}
swiper.on("slideChange", () => syncPlayerToSlide(swiper.realIndex));
```

---

## 🎵 Songs Array (public + gated examples)

```js
const songs = [
  { title: "Rstory BackTrack", name: "FOOD4THOTH",
    source: "https://www.food4thoth.com/MusicLibraryVis/music/RstoryRainbowRap.m4a" },
  { title: "Time is Breaking", name: "INPROGRESSION",
    source: "https://www.food4thoth.com/MusicLibraryVis/InproSqSpace/Inprogression+-+Time+and+Energy+-+02+Time+is+Breaking.mp3" },
  { title: "Blip Blox 3D", name: "DeJahn",
    source: "https://www.food4thoth.com/MusicLibraryVis/music/BlipBlox3.wav" },

  // GATED (hex sources)
  { title: "Midway Blitz — industrial indictment", name: "FOOD4THOTH", gated: true,
    sourceHex: "68747470733a2f2f62726f6e7a652d6b696e642d7469636b2d3337302e6d7970696e6174612e636c6f75642f697066732f62616679626569676c6b6e636870327937656d6c6675757877696371776e7a65633668326663756a3376366d78617961617864673534676a336c75" },
  { title: "Riviera of Bones", name: "FOOD4THOTH", gated: true,
    sourceHex: "68747470733a2f2f62726f6e7a652d6b696e642d7469636b2d3337302e6d7970696e6174612e636c6f75642f697066732f62616679626569666833763535706770376d677378346a656e696466777335683370767a656665716668786135657663356b70727a62323634676d" },
  { title: "You Pay Tax Dollars to Starve Children", name: "FOOD4THOTH", gated: true,
    sourceHex: "68747470733a2f2f62726f6e7a652d6b696e642d7469636b2d3337302e6d7970696e6174612e636c6f75642f697066732f62616679626569627a6877326963716876646d7361736c326b66723669613279666b6d646b35696d79337470326d6e6a7472793368677261346d79" },

  { title: "Mescalito Amazing Story", name: "DeJahn",
    source: "https://www.food4thoth.com/MusicLibraryVis/music/MescalinosAmazingStory.wav" },
  { title: "Rabbit Hole", name: "INPROGRESSION",
    source: "https://www.food4thoth.com/MusicLibraryVis/InproSqSpace/Inprogression+-+Down+the+Rabbit+Hole+-+03+Rabbit+Hole%202.mp3" },
  { title: "Funkin Around", name: "DeJahn",
    source: "https://static1.squarespace.com/static/569ded85a128e6228959a613/t/56b0bbfd2eeb819ad6daaf05/1454423107728/ZOOM0003_ST001.mp3/original/ZOOM0003_ST001.mp3" }
];
```

> For **gated** tracks, the player decodes `sourceHex` to a playable `source` (so listening is allowed),  
> but **downloads** remain locked until the **10k RSTORY** threshold.

---

## ⬇️ Download Unlock (≥ 10,000 RSTORY)

**Gate state flows in via the global event:**
```js
let gateOK = false;
window.addEventListener("rstory:gate", (e) => {
  gateOK = !!(e.detail?.hasDownload); // true only when ≥ 10k
  updateDownloadState();
});
```

**Button guard:**
```js
function updateDownloadState() {
  const s = songs[currentSongIndex];
  const locked = s.gated && !gateOK;
  downloadBtn.disabled = locked;
  downloadBtn.title = locked ? "Hold 10k RSTORY to download" : "Download";
}
```

**Force a file save when permitted:**
```js
downloadBtn.addEventListener("click", async () => {
  const s = songs[currentSongIndex];
  if (s.gated && !gateOK) return;
  const url = s.downloadHex ? fromHex(s.downloadHex)
            : s.source || (s.sourceHex ? fromHex(s.sourceHex) : "");
  if (!url) return;

  const resp = await fetch(url, { mode: "cors" });
  const blob = await resp.blob();
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = `${(s.title||"track").replace(/[^\w\-]+/g,"_")}.${(blob.type?.split("/")[1]||"mp3")}`;
  document.body.appendChild(a); a.click(); a.remove();
});
```

---

## 🎬 Video Hydration (token-aware)

- **Before unlock:** videos have **no `src`**.  
- **After unlock (≥ 1 RSTORY):** a listener fills each `<video>` `src` from its hex map.

```js
const VIDEO_HEX_BY_ID = new Map([
  ["midway-blitz", "68747470733a2f2f62726f6e7a652d6b696e642d7469636b2d3337302e6d7970696e6174612e636c6f75642f697066732f62616679626569676c6b6e636870327937656d6c6675757877696371776e7a65633668326663756a3376366d78617961617864673534676a336c75"],
  ["riviera",      "68747470733a2f2f62726f6e7a652d6b696e642d7469636b2d3337302e6d7970696e6174612e636c6f75642f697066732f62616679626569666833763535706770376d677378346a656e696466777335683370767a656665716668786135657663356b70727a62323634676d"],
  ["core-truth",   "68747470733a2f2f62726f6e7a652d6b696e642d7469636b2d3337302e6d7970696e6174612e636c6f75642f697066732f62616679626569627a6877326963716876646d7361736c326b66723669613279666b6d646b35696d79337470326d6e6a7472793368677261346d79"],
]);

function hydrateVideosAfterGate() {
  document.querySelectorAll(".song-card").forEach(card => {
    const id = card.getAttribute("data-song-id");
    const hex = VIDEO_HEX_BY_ID.get(id);
    const v = card.querySelector("video");
    if (!hex || !v || v.dataset.hydrated === "1") return;
    v.src = fromHex(hex) + "#t=0.1"; // tiny seek for thumbnail on some browsers
    v.dataset.hydrated = "1";
  });
}

window.addEventListener("rstory:gate", (e) => {
  if (e.detail?.hasAny) hydrateVideosAfterGate(); // ≥ 1 RSTORY
});
```

---

## 🔐 Message Gate + Rune Decode

- Button `.btn#decryptBtn` is disabled until **≥ 1 RSTORY**  
- On click, it builds a coded display from `MSG_HEX`, then animates character “spins” into the plaintext.

```js
window.addEventListener("rstory:gate", (e) => {
  const ok = !!(e.detail?.hasAny);
  decryptBtn.disabled = !ok;
});
```

> Set `AUTO_DECODE_ON_GATE = true` if you want it to auto-reveal as soon as the holder is verified.

---

## 🧩 Navigation Loader

The page fetches `../navigation.html` into `#nav-container` and sets up:

- Sticky top toggle button (`#toggle-nav`)
- Expandable `.submenu` sections via `data-expand` attributes
- Outside-click to close

If your project doesn’t have `navigation.html` at that path, create it or remove the fetch block.

---

## 🧭 How to Add New Songs

1. Add a slide in the Swiper with your cover image and any social links.  
2. Append an entry to `songs[]`. For public media, use `source`. For gated media, use `gated: true` with `sourceHex`:
   ```js
   { title:"My New Track", name:"FOOD4THOTH", gated:true, sourceHex:"<hex url>" }
   ```
3. Map the slide index to the `songs[]` index in `slideToSong`.  
4. (Optional) If you have a distinct download file/format, add `downloadHex` to that song.

**Encoding to hex (DevTools):**
```js
const toHex = s =>
  [...new TextEncoder().encode(s)]
    .map(b => b.toString(16).padStart(2,"0"))
    .join("");
```

---

## 🧪 Quick Start / Local Test

- Open `index.html` in a modern browser.  
- Install **Phantom** and switch to the desired network that matches `CHAIN`.  
- Click **Connect Phantom**.  
- If your wallet holds:
  - ≥ **1 RSTORY** → message unlock + video hydration  
  - ≥ **10,000 RSTORY** → download button enabled on gated items

**If balance reads 0 but you hold tokens, check:**
- `RSTORY_MINT` is correct  
- `CHAIN` matches your holdings’ network  
- Your RPC key (ANKR) is valid and not rate-limited  

---

## 🧯 Troubleshooting

- **“Phantom not found”** → Install Phantom (desktop or mobile in-app browser).  
- **CORS on downloads** → Your media host must allow cross-origin `GET`. For IPFS gateways, prefer a trusted gateway.  
- **Autoplay blocked** → Browsers require user gesture; start playback via the play button.  
- **Swiper not sliding** → Ensure the container has `.swiper` and `.swiper-wrapper > .swiper-slide` structure and that `observer: true` is set (already included).  
- **Gating is client-only** → This is soft gating. Power users can still share direct URLs. For stronger protection, serve signed URLs or proxy through a backend that verifies wallet holdings.

---

## 🔒 Security Notes

- All gating occurs in the **browser**. Do **not** store real secrets client-side.  
- The **ANKR key** is exposed (even hex-encoded). Use a **rate-limited** or public RPC key intended for client apps.  
- For high-value media, add a **server check** that verifies ownership and returns short-lived signed URLs.

---

## ♿ Accessibility & UX

- Contrast-aware colors and large tap targets on controls  
- Keyboard support enabled in Swiper (`keyboard.enabled = true`)  
- Status badges (“Not connected”, “Message unlocked”, etc.) for clear state

---

## 📈 SEO / Social

- Open Graph / Twitter metadata included in the front matter  
- Use a representative **image** (1200×630 recommended) for rich shares

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

**Traditional Payments:**
1. https://paypal.me/artabillies  
2. https://venmo.com/u/DeJahnvu

**Cryptocurrency:**
- **Ethereum (ETH) & ERC-20 Tokens**:  
  <div class="wrap">0x900e8f0d397048fD946b05553DeD5Ed3D5e4f1a0</div>  

- **Bitcoin (BTC)**:  
  <div class="wrap">bc1qcsa7ffef296pp9hkrn03p9wu7lt0fm3s2sz0wp</div>  

- **Ethereum Classic (ETC)**:  
  <div class="wrap">0xEb3C0e08868ACB0f515442579333c41E7a34F215</div>

- **Solana (SOL)**:  
  <div class="wrap">B7nCFQs6HkFAvkz1wEUiPpM4Cj7G6FJNYQ7Avrt6a4cm</div> 

- **Ripple (XRP)**:  
  Address: <div class="wrap">rEAKseZ7yNgaDuxH74PkqB12cVWohpi7R6</div>  
  Memo: `3109966062`  

- **Dogecoin (DOGE)**:  
  <div class="wrap">DP2e6J8NbUzswLtBw8ou2xYz4BinyzgU7n</div>  

- **Cardano (ADA)**:  
  <div class="wrap">addr1qxqgjp4h4vh4pxrg7jur8m96lzf5w98cahfflrw376qhufgg6h5us0avc20ee2azzun58lgylyl54sjr6y9efwq86krs3ladtw</div>  

- **Bitcoin Cash (BCH)**:  
  <div class="wrap">bitcoincash:qpu93py8j8ykcf7m6tmau2hldefl67t9lydw8afsa5</div> 

- **Stellar Lumens (XLM)**:  
  Address: <div class="wrap">GB2ES2N326MZK4EGJBKN3ZARCQ5RTFQSAWIJAAKFVIIIJSCC35TXIMLB</div>  
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

```bash
# 1) Fork the repository, then clone your fork
git clone <your-fork-url>
cd <repo>

# 2) Create a feature branch
git checkout -b feature-name

# 3) Commit your changes
git commit -m "Add feature or fix"

# 4) Push your branch
git push origin feature-name

# 5) Open a Pull Request on GitHub/GitLab
```

---

## 🔗 Explore the Food4Thoth Hub

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

- **Email**: food4thoth@proton.me

---

## 🎉 Acknowledgments

This platform is part of the **Food4Thoth Initiative**, which blends creativity, technology, and community to make a positive impact.  
Special thanks to our supporters for enabling these innovative projects and empowering meaningful change.

Your contributions make a difference. Thank you for your support!

---

<style>
  .wrap {
    word-wrap: break-word;
    overflow-wrap: break-word;
    white-space: normal;
  }
</style>

**⚡ Credits**  
Designed, coded, and curated by DeJahn under Artabillies & FOOD4THOTH.

---

## 📝 License

© 2025 Food4Thoth. All rights reserved.  
Unauthorized redistribution, copying, or modification without explicit permission is prohibited.
