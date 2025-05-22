---
layout: default
title: "Loop Mixer README"
description: "Cyberpunk-styled music app demo with modular audio loops and adjustable effects. Featuring Reverb, Delay, and Distortion in a vibrant neon interface powered by Tone.js."
permalink: /LoopStation/readme/
image: https://www.food4thoth.com/LoopStation/Loop.png

og_title: "Loop Mixer | Food4Thoth"
og_description: "A futuristic music app demo with real-time sound loops, neon visuals, and adjustable reverb, delay, and distortion. Explore modular sound mixing with Food4Thoth."
og_image: https://www.food4thoth.com/LoopStation/Loop.png

twitter_card: summary_large_image
twitter_title: "Loop Mixer | Food4Thoth"
twitter_description: "Cyberpunk music mixer with modular loops and real-time effects—explore sound in a futuristic playground powered by Food4Thoth."
twitter_image: https://www.food4thoth.com/LoopStation/Loop.png
---

<style>
  body {
    background-color: black;
    color: white;
  }
  a { color: #00ffff; }
  h1, h2, h3, h4, h5, h6 { color: #ff66cc; }
	
	  .nav-button {
    display: inline-block;
    padding: 10px 18px;
    margin: 6px;
    background: linear-gradient(135deg, #ff00ff, #001eff);
    color: white;
    font-weight: bold;
    text-decoration: none;
    border-radius: 8px;
    box-shadow: 3px 3px 12px rgba(255, 0, 255, 0.5);
    font-size: 1rem;
    transition: all 0.3s ease;
  }
  .nav-button:hover {
    background: linear-gradient(135deg, #00ffff, #6600cc);
    box-shadow: 0 0 10px #00ffff;
  }

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

# 🎵 Music App Demo

## 🎶 Overview  
**Music App Demo** is a cyberpunk-inspired music mixer that uses **Tone.js** for real-time audio manipulation. With a striking neon aesthetic, the app allows users to select songs, toggle individual tracks, and adjust audio effects (Reverb, Delay, Distortion) using stylish controls. The interface is designed with a futuristic cyberpunk theme, using an Orbitron font and vibrant neon colors.

---

## 🚀 Features  
- **Song Selection & Track Management**:  
  - Choose from multiple songs via a dropdown menu.
  - Dynamic list of tracks with individual toggle checkboxes.
- **Play Controls**:  
  - Play all tracks, stop all, or play only selected tracks.
- **Effects Control**:  
  - Adjust Reverb (with adjustable decay).
  - Adjust Delay (with adjustable delay time).
  - Adjust Distortion (with adjustable amount).
- **Cyberpunk Aesthetic**:  
  - Dark backgrounds with radial gradients.
  - Neon colors (cyan, pink, green) and glowing text/shadows.
  - Cyberpunk-style fonts (Orbitron) for an immersive look.
- **Responsive & Dynamic UI**:  
  - A multi-column layout for tracks.
  - Custom buttons and sliders styled with neon effects.
  - Neumorphic navigation sidebar for quick access to related pages.

---

## 🛠 Technologies Used  
- **HTML5, CSS3, JavaScript**  
- **[Tone.js](https://tonejs.github.io/)** for Web Audio API interactions  
- **Google Fonts (Orbitron)** for the cyberpunk typography

---

## 🗂️ File Structure

/Root
│── LoopStation/     
│   ├── iframe_script.js     
│   ├── index.html     
│   ├── info/      
│   ├── nav_script.js    
│   ├── README.md     
│   ├── script.js    
│   ├── song1/     
│   ├── song2/    
│   ├── song3/    
│   ├── song4/     
│   ├── styles.css     
│   ├── Tone.min.js     

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

Designed, coded, and curated by DeJahn under Artabillies & FOOD4THOTH.

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