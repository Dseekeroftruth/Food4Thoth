# Food4Thoth WordPress Migration

A complete WordPress theme and plugin to run **Food4Thoth** on WordPress — matching the full visual experience of [food4thoth.com](https://food4thoth.com) with all 165+ interactive tools embedded via iframe.

---

## ⚡ The Short Answer About "Free" WordPress

| Option | Cost | Storage | Custom Theme | JavaScript Apps | Verdict |
|--------|------|---------|--------------|-----------------|---------|
| **WordPress.com Free** | $0 | 1 GB | ❌ No | ❌ Blocked | ⚠️ Very limited |
| **WordPress.com Personal** | ~$9/mo | 6 GB | ❌ No | ❌ Blocked | ❌ Not enough |
| **InfinityFree** (self-hosted WP) | $0 | Unlimited* | ✅ Yes | ✅ Via iframe | ✅ Best free option |
| **000webhost** (self-hosted WP) | $0 | 1 GB | ✅ Yes | ✅ Via iframe | ⚠️ Storage limit |
| **WPX.net / SiteGround** | ~$5/mo | SSD | ✅ Yes | ✅ Via iframe | ✅ Best overall |
| **food4thoth.com (existing)** | $0 (GitHub Pages) | Unlimited | N/A | ✅ Full native | ✅ Already working! |

> **Important:** The existing food4thoth.com site on GitHub Pages is **already free and fully functional**. The WordPress version works as a CMS-powered portal that **embeds all tools via iframes** from food4thoth.com.
>
> The interactive tools (WebGL, Tone.js audio, Canvas games) **cannot run natively inside WordPress** — they require the full browser context of their own HTML pages. The iframe approach preserves 100% of their functionality.

---

## 🏗️ What's Included

```
wordpress/
├── README.md                          ← You are here
├── food4thoth-theme/                  ← WordPress theme
│   ├── style.css                      ← Theme header + all CSS
│   ├── functions.php                  ← Theme setup, menus, meta boxes
│   ├── header.php                     ← Full navigation (all 40+ submenus)
│   ├── footer.php                     ← Site footer
│   ├── front-page.php                 ← Homepage (matches food4thoth.com)
│   ├── index.php                      ← Blog index
│   ├── page.php                       ← Static page template
│   ├── single.php                     ← Single blog post
│   ├── archive.php                    ← Archive / category lists
│   ├── 404.php                        ← 404 error page
│   ├── page-templates/
│   │   ├── page-tool-embed.php        ← Embed any tool via iframe
│   │   ├── page-portfolio.php         ← Portfolio grid of all tools
│   │   ├── page-contact.php           ← Contact form
│   │   └── page-hub.php               ← Category hub (auto child-page grid)
│   └── assets/js/
│       └── navigation.js              ← Nav toggle, popups, random tool
└── food4thoth-plugin/
    └── food4thoth-plugin.php          ← Plugin: auto-creates 80+ pages
```

---

## 🚀 Installation — Step by Step

### Option A: Free Self-Hosted WordPress on InfinityFree

1. **Sign up** at [infinityfree.com](https://infinityfree.net) (free)
2. **Create a hosting account** — choose a subdomain like `food4thoth.epizy.com` or use your custom domain
3. **Install WordPress** via their auto-installer (Softaculous)
4. **Log into WordPress Admin** at `yoursite.com/wp-admin`
5. **Install the theme:** Appearance → Themes → Upload Theme → upload `food4thoth-theme/` as a ZIP
6. **Install the plugin:** Plugins → Add New → Upload Plugin → upload `food4thoth-plugin/` as a ZIP
7. **Activate both**
8. **Run setup:** Food4Thoth (in admin menu) → "Create / Refresh All Pages"
9. **Set homepage:** Settings → Reading → Set "Front page displays" to "A static page" → select "Home"

### Option B: WordPress.com Free (Limited)

WordPress.com free plan does **not** allow:
- Custom theme uploads (must use their themes)
- Plugin installation
- Custom JavaScript

You **can** still use it to:
- Write blog posts linking to food4thoth.com
- Add content pages with embedded iframes (using the Embed block)
- Use the free subdomain (yourname.wordpress.com)

To embed a tool on WordPress.com:
1. Add a new page
2. Add an "HTML" block (Custom HTML)
3. Paste: `<iframe src="https://www.food4thoth.com/TarotLanding/" style="width:100%;height:85vh;border:none;" loading="lazy"></iframe>`

### Option C: Local WordPress (for development/export)

1. Install [LocalWP](https://localwp.com) (free desktop app)
2. Create a new local site
3. Install the theme and plugin
4. Export as XML: Tools → Export → All content
5. Import to any WordPress host

---

## 📁 Theme Features

### Navigation
The header replicates the **exact navigation** from food4thoth.com including all 40+ expandable submenus:
- Tarot (27+ tools)
- Music & Loop Stations
- Games
- Fractals & Visuals
- Akashic Records (13 texts)
- Anarchy & Philosophy
- Community Gardens
- Socials

### Page Templates

| Template | Purpose |
|----------|---------|
| **Tool Embed (iframe)** | Full-screen iframe embed of any food4thoth.com tool |
| **Portfolio Hub** | Filterable grid of all 40+ tools by category |
| **Category Hub** | Auto card-grid from WordPress child pages |
| **Contact Page** | Contact form + social links |

### Shortcodes

```
[f4t_tool url="https://www.food4thoth.com/TarotLanding/" height="85vh" title="Tarot"]
```
Embeds any tool inline in any page/post.

```
[f4t_category_hub]
```
Auto-generates a card grid from child pages.

### Custom Meta Fields (Tool Embed pages)

In the WordPress editor, each Tool Embed page has:
- **Tool URL** — the food4thoth.com URL to embed
- **iframe Height** — `85vh`, `600px`, `100%`, etc.
- **Show full-screen button** — adds an "Open Full Screen" link

---

## 🎨 Visual Design

The theme exactly matches food4thoth.com:
- **Background:** Dark gradient (#2e3b4e → #16222a) + mystical background image
- **Dark overlay:** rgba(0,0,0,0.55) + backdrop blur
- **Neon green:** #00ff99 (links, accents)
- **Neon pink:** #ff0095 (hover, highlights)
- **Rotating conic gradient:** Used on all buttons, nav tabs, borders
- **Neumorphic navigation tabs** with animated glow
- **Animated logo iframes** from food4thoth.com

---

## 🔌 Plugin — Auto Page Creation

Activating the `food4thoth-plugin` automatically creates:

**Hub pages (with Category Hub template):**
- Tarot & Divination
- Music & Audio
- Games
- Fractals & Visuals
- Akashic Records
- Community
- Esoteric Library

**Tool pages (80+, with iframe template):**
- All major tarot decks
- All music tools
- All games
- All visual/fractal tools
- All Akashic Records texts
- All community tools

Each page comes pre-configured with the correct food4thoth.com URL.

---

## 🌐 Custom Domain Setup

If you own `food4thoth.com`:
1. The GitHub Pages site stays at food4thoth.com (tools remain there)
2. Set up WordPress at a subdomain: `wp.food4thoth.com` or `www2.food4thoth.com`
3. Or move WordPress to a paid host and redirect food4thoth.com there

If you want WordPress AS the main domain:
1. Move WordPress to a host supporting PHP+MySQL
2. Update iframes from `food4thoth.com/...` to `pages.food4thoth.com/...` (GitHub Pages at subdomain)

---

## 📋 What WordPress Does vs. food4thoth.com

| Feature | food4thoth.com (GitHub Pages) | WordPress Version |
|---------|-------------------------------|-------------------|
| Tarot apps | ✅ Full native | ✅ Via iframe |
| Music/audio tools | ✅ Full native | ✅ Via iframe |
| WebGL/Canvas games | ✅ Full native | ✅ Via iframe |
| Blog posts | ✅ Static HTML | ✅ CMS-managed |
| Contact form | ✅ External link | ✅ Native PHP form |
| SEO | ✅ Jekyll | ✅ Yoast/RankMath |
| Admin panel | ❌ Manual code | ✅ Full WP admin |
| User accounts | ❌ None | ✅ WordPress users |
| Comments | ❌ None | ✅ WordPress comments |
| E-commerce | ❌ None | ✅ WooCommerce |

---

## 🔒 Recommended Plugins

Install these free plugins for a complete setup:

| Plugin | Purpose |
|--------|---------|
| Yoast SEO | SEO meta tags, sitemap |
| WP Super Cache | Page caching for speed |
| Wordfence Security | Firewall & malware scan |
| Contact Form 7 | Advanced contact forms |
| UpdraftPlus | Backups |
| WooCommerce | If you want a donation/shop |

---

## ❓ FAQ

**Q: Will the Tarot apps still work?**
A: Yes — they load from food4thoth.com inside iframes. All JavaScript, WebGL, and audio work exactly as on the original site.

**Q: Can I edit the tools from WordPress?**
A: The tool code lives on GitHub (food4thoth.com). WordPress manages pages/posts/blog. Edit tool code in the GitHub repo as before.

**Q: Do I need both sites running?**
A: Yes — WordPress handles CMS, blog, and portal. food4thoth.com (GitHub Pages) serves the interactive tools via iframe.

**Q: What if food4thoth.com goes down?**
A: The iframe embeds would show blank. The WordPress pages/blog would still work.

**Q: Can I use WordPress.com free plan?**
A: Very limited — you can write blog posts and add iframes in Custom HTML blocks, but you can't install this theme/plugin. Use InfinityFree for free self-hosted WordPress instead.

---

## 📞 Support

- Email: food4thoth@proton.me
- GitHub: [dseekeroftruth/food4thoth](https://github.com/dseekeroftruth/food4thoth)
- Original site: [food4thoth.com](https://food4thoth.com)
