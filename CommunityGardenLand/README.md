---
title: "🌱 Community Garden Pages"
subtitle: "Discover, Support & Grow Community Gardens Nationwide"
author: "DeJahn (FOOD4THOTH)"
created: 2025-08-13
last_updated: 2025-08-13
permalink: /CommunityGardens/readme/
image: /CommunityGardenLand/og-preview.jpg
tags: [community gardens, sustainability, urban farming, permaculture, FOOD4THOTH, gardening, eco-friendly, local food, community building, activism]
description: |
  The Community Garden Pages on FOOD4THOTH provide a platform to discover, support, and create community gardens. 
  Featuring interactive maps, searchable directories, educational resources, and open-source mapping tools, these 
  pages inspire ecological awareness, sustainability, and collaboration. Users can explore gardens by location, 
  submit new entries, and access guides for starting their own gardens.
layout: default
canonical_url: "https://www.food4thoth.com/CommunityGardenLand/index.html"
social_image: "https://www.food4thoth.com/CommunityGardenLand/og-preview.jpg"
favicon: "/images/favicon.png"
open_graph:
  title: "Community Garden Pages | FOOD4THOTH"
  description: "Explore interactive maps, guides, and resources to find and create thriving community gardens across the U.S."
  image: "https://www.food4thoth.com/CommunityGardenLand/og-preview.jpg"
  url: "https://www.food4thoth.com/CommunityGardenLand/index.html"
twitter:
  card: "summary_large_image"
  title: "Community Garden Pages | FOOD4THOTH"
  description: "Discover community gardens, explore interactive maps, and learn how to start your own."
  image: "https://www.food4thoth.com/CommunityGardenLand/og-preview.jpg"
schema:
  "@context": "https://schema.org"
  "@type": "WebPage"
  name: "Community Garden Pages"
  description: "A FOOD4THOTH resource hub for finding, supporting, and creating community gardens nationwide."
  url: "https://www.food4thoth.com/CommunityGardenLand/index.html"
  publisher:
    "@type": "Organization"
    name: "FOOD4THOTH"
    url: "https://www.food4thoth.com"
    logo:
      "@type": "ImageObject"
      url: "https://www.food4thoth.com/images/favicon.png"
---

<style>
  body {
    background: #111;
    color: #fff;
  }
  a { color: #33e3ff; }
  h1, h2, h3, h4, h5, h6 { color: #fffd87; }
  .nav-button {
    display: inline-block;
    padding: 10px 18px;
    margin: 6px;
    background: linear-gradient(135deg, #ee0979, #06c4ff);
    color: white;
    font-weight: bold;
    text-decoration: none;
    border-radius: 8px;
    box-shadow: 2px 3px 12px rgba(255,0,150,0.35);
    font-size: 1rem;
    transition: all 0.3s ease;
  }
  .nav-button:hover {
    background: linear-gradient(135deg, #00ffea, #7c2ae8);
    box-shadow: 0 0 10px #06c4ff;
  }
  .wrap {
    word-wrap: break-word;
    overflow-wrap: break-word;
    white-space: normal;
  }
</style>

# 🌱 Community Garden Pages

The **Community Garden Pages** aim to inspire, connect, and empower individuals and communities by providing a dynamic platform for discovering, supporting, and creating community gardens. These pages are designed to foster sustainability, collaboration, and ecological awareness while offering practical tools and resources for users.

---

## 🌟 Features

### **Community Garden Directory**
- **Interactive Maps**:
  - Displays community gardens across the U.S. with features like:
    - Pin clustering for easier navigation.
    - Clickable pins with detailed garden information (address, ratings, reviews).
- **Search and Filter**:
  - Search by name, location, or type of garden.
  - Filters for specific categories like urban gardens, organic farming, or educational initiatives.

### **Educational Resources**
- **Guides and Tutorials**:
  - Step-by-step instructions on starting a community garden.
  - Tips for gardening etiquette and best practices.
  - Resources on ecological benefits and sustainable farming techniques.
- **Success Stories**:
  - Highlight real-world examples of thriving community gardens.
  - Share insights and statistics to inspire new initiatives.

### **Interactive Features**
- **Submit a Garden**:
  - Allows users to add new community gardens to the directory via a simple form.
- **Navigation Tools**:
  - Integrated links to Google Maps and Apple Maps for easy directions.
- **Mobile-Friendly Design**:
  - Fully responsive layout optimized for all devices.

### **Open-Source Mapping**
- Transitioned from costly APIs like Google Maps to open-source solutions (e.g., Leaflet.js) to ensure affordability and accessibility for all users.

---

## 🛠️ Technologies Used
- **Frontend**: HTML5, CSS3, JavaScript
- **Mapping**: Leaflet.js for interactive maps.
- **Form Handling**: [Formspree](https://formspree.io) for submission handling.
- **Design**:
  - Neumorphic styling for modern aesthetics.
  - Fully responsive layouts for mobile, tablet, and desktop users.
- **Backend (Future Plans)**: Integration with a database to dynamically store and manage garden entries.

---

## 🚀 How to Use

### **For Visitors:**
1. Explore the **Community Garden Directory** to find gardens near you.
2. Use filters or search to refine results.
3. Click on a garden pin to view detailed information and get directions.
4. Access educational resources for tips on starting or maintaining a garden.

### **For Contributors:**
1. Visit the **Submit a Garden** page.
2. Fill out the form with garden details:
   - Name and address.
   - Description and type of garden.
   - Contact details or links to social media/website.
3. Submit the form to add the garden to the directory.

---

## 🗂️ File Structure

/Root      
│── **CommunityGardenLand/** (Main landing pages for community gardens, including desktop-specific versions)      
│   ├── iframe_script.js (Handles iframe-based interactions and embedding external content)      
│   ├── index.html (Main landing page for community gardens on mobile or standard views)      
│   ├── indexDesktop.html (Landing page optimized for desktop users)      
│   ├── nav_script.js (Controls navigation functionality across pages)      
│   ├── README.md (Documentation and project details)      
│   ├── script.js (Main JavaScript functionality for user interactions and content updates)      
│   ├── scriptDesk.js (Additional JavaScript specifically for desktop interactions)      
│   ├── styles.css (Styling for mobile and general UI design)      
│   ├── stylesDesk.css (Styling for desktop layouts and formatting)      





│── **CommunityGardensInfo/** (General information page about community gardens)      
│   ├── index.html (Main information page for community gardens)      
│   ├── nav_script.js (Handles navigation for info pages)      
│   ├── README.md (Project documentation and details)      
│   ├── styles.css (CSS styling for information pages)      





│── **CommunityGardensLists/** (Directory listing of various community gardens in different locations)      
│   ├── iframe_script.js (Handles iframe integration for displaying content)      
│   ├── index.html (Main list page of all community gardens)      
│   ├── indexEugene.html (List page for Eugene community gardens)      
│   ├── indexPortland.html (List page for Portland community gardens)      
│   ├── nav_script.js (Navigation controls for list pages)      
│   ├── README.md (Project documentation and structure details)      
│   ├── scriptEugene.js (JavaScript functionality for Eugene listings)      
│   ├── scriptPortland.js (JavaScript functionality for Portland listings)      
│   ├── styles.css (Styling for list pages and directory layout)      





│── **CommunityGardensMaps/** (Interactive maps of community gardens in different locations)      
│   ├── indexEugeneMap.html (Map interface for Eugene community gardens)      
│   ├── indexPortlandMap.html (Map interface for Portland community gardens)      
│   ├── libs/ (Contains libraries and dependencies for interactive mapping features)      
│   ├── nav_script.js (Handles navigation functionality for map pages)      
│   ├── README.md (Documentation and project structure details)      
│   ├── scriptEugene.js (JavaScript handling interactive map features for Eugene)      
│   ├── scriptPortland.js (JavaScript handling interactive map features for Portland)      
│   ├── styles.css (Styling for map layouts and UI elements)      

---

## 📌 Future Enhancements
- **Database Integration**:
  - Dynamic storage and management of garden entries for real-time updates.
- **User Accounts**:
  - Allow users to save favorite gardens or manage their submissions.
- **Localization**:
  - Support for multiple languages and regional garden data.
- **Advanced Mapping Features**:
  - Heatmaps to display garden density.
  - Real-time updates for garden availability or events.
- **Community Engagement**:
  - Add forums or social features to connect garden enthusiasts.
	
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

This project is part of the **Food4Thoth Initiative**, which is committed to fostering ecological awareness and community-driven solutions. Special thanks to all contributors and supporters who make community gardening accessible and impactful for everyone.

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