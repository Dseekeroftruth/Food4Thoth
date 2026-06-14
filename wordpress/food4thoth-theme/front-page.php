<?php
/**
 * Front Page Template — mirrors the Food4Thoth homepage.
 */
get_header(); ?>

    <!-- ===== ANIMATED LOGOS (served from food4thoth.com) ===== -->
    <div class="logo-animation-container" aria-hidden="true">
        <iframe src="https://www.food4thoth.com/Artabillies4ThothAnimate/F4TLOGO5.html"
                title="Food4Thoth Animated Logo"
                loading="lazy"></iframe>
    </div>

    <iframe aria-hidden="true" tabindex="-1"
            src="https://www.food4thoth.com/Artabillies4ThothAnimate/F4TLOGO3.2.html"
            style="width:100vw;height:10vh;border:none;top:-30px;position:sticky;left:0;display:block;pointer-events:none;"
            title="" loading="lazy"></iframe>

    <iframe aria-hidden="true" tabindex="-1"
            src="https://www.food4thoth.com/Artabillies4ThothAnimate/F4TLOGO4.html"
            style="width:100vw;height:30vh;border:none;top:0;position:absolute;left:0;display:block;pointer-events:none;"
            title="" loading="lazy"></iframe>

    <iframe aria-hidden="true" tabindex="-1"
            src="https://www.food4thoth.com/Artabillies4ThothAnimate/F4TLOGO3.2.html"
            style="width:100vw;height:2vh;border:none;top:10px;position:absolute;left:0;display:block;pointer-events:none;"
            title="" loading="lazy"></iframe>

    <!-- sticky wrapper: zero-height, overflows visibly — lets us pin the iframe exactly behind the nav button -->
    <div aria-hidden="true" style="position:sticky;top:0;height:0;overflow:visible;z-index:1090;pointer-events:none;">
        <iframe tabindex="-1"
                src="https://www.food4thoth.com/Artabillies4ThothAnimate/F4TLOGO2.1.html"
                style="position:absolute;top:0;left:10px;width:110px;height:44px;border:none;"
                title="" loading="lazy"></iframe>
    </div>

    <!-- ===== ACTION BUTTONS ===== -->
    <div class="button-container">
        <button id="btn-pull-card" class="neumorphic-button">PULL A CARD 👁️</button>
    </div>
    <div class="button-container">
        <button id="btn-animate" class="neumorphic-button">👁️ ANIMATE 👁️</button>
    </div>
    <div class="button-container">
        <a href="https://www.food4thoth.com/RstoryArtabillies/" target="_blank">
            <button class="neumorphic-button">$ 👁️ RSTORY 👁️ $</button>
        </a>
    </div>
    <div class="button-container">
        <button id="btn-random" class="neumorphic-button">👁️ RANDOM 👁️</button>
    </div>

    <!-- ===== CARD POPUP (rebuilt dynamically by JS) ===== -->
    <div id="cardPopup" class="popup" role="dialog" aria-modal="true">
        <div class="popup-content"></div>
    </div>

    <!-- ===== ANIMATION POPUP ===== -->
    <div id="animationPopup" class="popup" role="dialog" aria-modal="true" aria-label="Animation">
        <div class="popup-content" style="padding:10px;">
            <button class="close-btn" aria-label="Close">&times;</button>
            <!-- NO loading="lazy" — src is set dynamically -->
            <iframe id="animationIframe" src="" style="width:100%;height:70vh;border:none;display:block;"
                    title="Food4Thoth Animation"
                    allow="autoplay;fullscreen"></iframe>
            <div style="text-align:center;margin-top:8px;">
                <a href="#" class="popup-ext-link" target="_blank" rel="noopener"
                   style="color:#00ff99;font-size:0.85rem;">Open in full screen ↗</a>
            </div>
        </div>
    </div>

    <!-- ===== RANDOM POPUP ===== -->
    <div id="randomPopup" class="popup" role="dialog" aria-modal="true" aria-label="Random Creation">
        <div class="popup-content" style="padding:10px;">
            <button class="close-btn" aria-label="Close">&times;</button>
            <!-- NO loading="lazy" — src is set dynamically -->
            <iframe id="randomIframe" src="" style="width:100%;height:70vh;border:none;display:block;"
                    title="Food4Thoth Random"
                    allow="autoplay;fullscreen"></iframe>
            <div style="text-align:center;margin-top:8px;">
                <a href="#" class="popup-ext-link" target="_blank" rel="noopener"
                   style="color:#00ff99;font-size:0.85rem;">Explore CREATION ↗</a>
            </div>
        </div>
    </div>

    <main id="main" class="content-area" role="main">

        <!-- INTRO -->
        <section class="intro-section">
            <h1>Welcome to Food4Thoth</h1>
            <p>A multifaceted hub for creativity, exploration, and connection — bridging art, mysticism, technology, and community.</p>
        </section>

        <!-- LOGO ANIMATION 2 -->
        <div aria-hidden="true" style="display:flex;justify-content:center;align-items:center;width:100%;overflow:visible;">
            <iframe src="https://www.food4thoth.com/Artabillies4ThothAnimate/F4TLOGO1.1.html"
                    style="width:80vw;max-width:450px;height:80vw;max-height:450px;border:none;display:block;"
                    loading="lazy" title="Food4Thoth Logo Animation 2"></iframe>
        </div>

        <!-- CATEGORY HUB CARDS -->
        <section class="content-section">
            <h2>Explore Food4Thoth</h2>
            <div class="category-hub">

                <a href="https://www.food4thoth.com/TarotLanding/" class="category-card" target="_blank">
                    <div class="card-icon">🃏</div>
                    <h3>Tarot &amp; Divination</h3>
                    <p>27+ Tarot decks, Celtic Cross, I Ching, and more</p>
                </a>

                <a href="https://www.food4thoth.com/LoopStation/" class="category-card" target="_blank">
                    <div class="card-icon">🎵</div>
                    <h3>Music &amp; Audio</h3>
                    <p>Loop Stations, ARP Synths, Music Library, Visualizers</p>
                </a>

                <a href="https://www.food4thoth.com/NexusOfGames/" class="category-card" target="_blank">
                    <div class="card-icon">🎮</div>
                    <h3>Games &amp; Interactive</h3>
                    <p>Retro games, Claw Machine, Choose Your Adventure</p>
                </a>

                <a href="https://www.food4thoth.com/DrawingFractals/" class="category-card" target="_blank">
                    <div class="card-icon">🌀</div>
                    <h3>Fractals &amp; Visuals</h3>
                    <p>WebGL, fractals, psychedelic animations, art generators</p>
                </a>

                <a href="https://www.food4thoth.com/css-only-3d-image-carousel/" class="category-card" target="_blank">
                    <div class="card-icon">📜</div>
                    <h3>Akashic Records</h3>
                    <p>Emerald Tablet, Hermiticum, Nag Hammadi, Asclepius</p>
                </a>

                <a href="https://www.food4thoth.com/AnarchyComicBreakFree/" class="category-card" target="_blank">
                    <div class="card-icon">✊</div>
                    <h3>Anarchy &amp; Philosophy</h3>
                    <p>Comics, Hakim Bey, TAZ, Haudenosaunee Thanksgiving</p>
                </a>

                <a href="https://www.food4thoth.com/CommunityGardensLists/" class="category-card" target="_blank">
                    <div class="card-icon">🌱</div>
                    <h3>Community Gardens</h3>
                    <p>Eugene &amp; Portland garden maps, directories, info</p>
                </a>

                <a href="https://www.food4thoth.com/BlackBuisnessEugene/" class="category-card" target="_blank">
                    <div class="card-icon">🏪</div>
                    <h3>Black Business Eugene</h3>
                    <p>Directory of Black-owned businesses in Eugene, OR</p>
                </a>

                <a href="https://www.food4thoth.com/GloCalculato/" class="category-card" target="_blank">
                    <div class="card-icon">🌈</div>
                    <h3>Glo-Calculato</h3>
                    <p>Rainbow glowing calculator app &amp; tariff calculator</p>
                </a>

                <a href="https://www.food4thoth.com/PrayerForLove/" class="category-card" target="_blank">
                    <div class="card-icon">🙏</div>
                    <h3>Prayer &amp; Spirit</h3>
                    <p>Prayer for Love, Childrens Prayers, Gratitude</p>
                </a>

                <a href="https://www.food4thoth.com/TrentOfTheDay/" class="category-card" target="_blank">
                    <div class="card-icon">🐾</div>
                    <h3>Trent the Dog</h3>
                    <p>Trent of the Day, Storybook, and more canine wisdom</p>
                </a>

                <a href="<?php echo esc_url( home_url( '/blog/' ) ); ?>" class="category-card">
                    <div class="card-icon">📝</div>
                    <h3>Blog</h3>
                    <p>Thoughts, updates, and explorations from Food4Thoth</p>
                </a>

            </div>
        </section>

        <!-- FEATURES SECTION -->
        <section class="features-section">
            <h2>Core Features and Offerings</h2>

            <div class="feature">
                <h3>1. Art and Cyber Design</h3>
                <ul>
                    <li>Celebrating art in all its forms: traditional, digital, and experimental.</li>
                    <li>Cyber design and experimentation push the boundaries of creativity.</li>
                    <li>Showcases curated art pieces, interactive galleries, and creative tools.</li>
                </ul>
            </div>

            <div class="feature">
                <h3>2. Esoterica, Gnosticism, and Hermetics</h3>
                <ul>
                    <li>A treasure trove of esoteric knowledge exploring the mystical and hidden.</li>
                    <li>Deep dives into Gnosticism, emphasizing personal spiritual knowledge.</li>
                    <li>Resources on Hermetics, focusing on universal principles.</li>
                </ul>
            </div>

            <div class="feature">
                <h3>3. Tarot, I Ching, and Divination</h3>
                <ul>
                    <li>Apps for Tarot card readings, bringing ancient introspection into the digital age.</li>
                    <li>I Ching readings offering modern insights into life's complexities.</li>
                    <li>Tools designed for both beginners and experienced users.</li>
                </ul>
            </div>

            <div class="feature">
                <h3>4. Community Gardens and Directories</h3>
                <ul>
                    <li>Encourages real-world connection through community gardens.</li>
                    <li>Fosters sustainability and local action by connecting people to nearby projects.</li>
                </ul>
            </div>

            <div class="feature">
                <h3>5. Music Reviews and Explorations</h3>
                <ul>
                    <li>In-depth music reviews blending artistic appreciation with cultural critique.</li>
                    <li>Explores various genres, emphasizing music's connection to the human experience.</li>
                </ul>
            </div>

            <div class="feature">
                <h3>6. Anarchy and Creative Freedom</h3>
                <ul>
                    <li>Promotes anarchy as a philosophy of personal freedom and radical creativity.</li>
                    <li>Encourages exploring one's full potential beyond societal constraints.</li>
                </ul>
            </div>

            <div class="feature">
                <h3>7. Black Business Support</h3>
                <ul>
                    <li>Features a directory of local Black-owned businesses in Eugene, OR.</li>
                    <li>Celebrates creativity and entrepreneurship within the Black community.</li>
                </ul>
            </div>

            <div class="feature">
                <h3>8. Games and Interactive Experiences</h3>
                <ul>
                    <li>Games and tools that are both entertaining and thought-provoking.</li>
                    <li>Designed to challenge perspectives and encourage creativity.</li>
                </ul>
            </div>

            <div class="feature">
                <h3>9. Rainbow Glowing Calculator App</h3>
                <ul>
                    <li>A whimsical yet functional calculator with a glowing rainbow design.</li>
                    <li>Blends practicality with fun and vibrant visuals.</li>
                </ul>
            </div>

            <div class="feature">
                <h3>10. Inspirational Dog Trent</h3>
                <ul>
                    <li>Features Trent, a dog with a heartwarming presence.</li>
                    <li>Embodies themes of loyalty, connection, and joy.</li>
                </ul>
            </div>
        </section>

        <!-- PHILOSOPHY SECTION -->
        <section class="philosophy-section">
            <h2>Philosophy and Vision</h2>
            <p>Food4Thoth embodies a philosophy of holistic creativity and exploration. Named after the Egyptian god Thoth, associated with wisdom and the mysteries of life, the platform serves as "food" for the mind and spirit.</p>
            <h3>Key Values:</h3>
            <ul>
                <li><strong>Creativity:</strong> Celebrating the power of imagination in all forms.</li>
                <li><strong>Connection:</strong> Building bridges between individuals, communities, and ideas.</li>
                <li><strong>Exploration:</strong> Encouraging curiosity and the pursuit of knowledge.</li>
                <li><strong>Fun and Play:</strong> Balancing deep inquiry with joyful experiences.</li>
            </ul>
        </section>

        <!-- WHO IS IT FOR -->
        <section class="audience-section">
            <h2>Who Is It For?</h2>
            <ul>
                <li><strong>Artists:</strong> Seeking inspiration and a community to share work.</li>
                <li><strong>Mystics and Seekers:</strong> Exploring Tarot, I Ching, and esoteric wisdom.</li>
                <li><strong>Community Builders:</strong> Interested in gardens and local action.</li>
                <li><strong>Music Lovers:</strong> Looking for thoughtful reviews and connections to sound.</li>
                <li><strong>Explorers of the Mind:</strong> Curious about philosophy, anarchy, and the unknown.</li>
            </ul>
        </section>

        <!-- WHY VISIT -->
        <section class="why-visit-section">
            <h2>Why Visit Food4Thoth?</h2>
            <ol>
                <li><strong>Diverse Offerings:</strong> Find something that resonates with your interests.</li>
                <li><strong>Innovative Tools:</strong> Blending functionality with creativity.</li>
                <li><strong>Connection and Community:</strong> Meet others who value creativity and exploration.</li>
                <li><strong>Inspiration:</strong> Spark curiosity, reflection, and joy.</li>
            </ol>
            <p>Food4Thoth is not just a website — it's a living ecosystem for those who hunger for knowledge, creativity, and connection. Explore and thrive with us.</p>
        </section>

        <!-- BACKGROUND ANIMATIONS -->
        <div aria-hidden="true" style="pointer-events:none;overflow:hidden;opacity:0.3;position:sticky;top:0;z-index:0;height:0;">
            <iframe src="https://www.food4thoth.com/behind-the-fold/" style="width:100vw;height:100vh;border:none;margin-top:-100vh;" loading="lazy"></iframe>
        </div>
        <div aria-hidden="true" style="pointer-events:none;overflow:hidden;opacity:0.3;position:sticky;top:0;z-index:0;height:0;">
            <iframe src="https://www.food4thoth.com/spiral/" style="width:100vw;height:100vh;border:none;margin-top:-100vh;" loading="lazy"></iframe>
        </div>

        <!-- DONATIONS -->
        <section class="donations-section">
            <h2>Support Food4Thoth</h2>
            <p>Help keep this free creative platform alive. All contributions go directly into creating new tools and content.</p>

            <div class="donation-grid">
                <div class="donation-btn">
                    <a href="https://paypal.me/artabillies" target="_blank" rel="noopener">PayPal</a>
                </div>
                <div class="donation-btn">
                    <a href="https://venmo.com/u/DeJahnvu" target="_blank" rel="noopener">Venmo</a>
                </div>
                <div class="donation-btn">
                    <a href="https://cash.app/$artabillies" target="_blank" rel="noopener">Cash App</a>
                </div>
                <div class="donation-btn">
                    <a href="https://ko-fi.com/artabillies" target="_blank" rel="noopener">Ko-fi</a>
                </div>
            </div>

            <div class="crypto-section">
                <h3>Cryptocurrency Donations</h3>
                <p><strong>Bitcoin (BTC):</strong></p>
                <code>bc1qexampleaddresshere</code>
                <p><strong>Ethereum (ETH):</strong></p>
                <code>0xExampleEthereumAddressHere</code>
                <p style="font-size:0.85rem;color:#aaa;margin-top:10px;">
                    Replace with actual wallet addresses in WordPress Admin → Appearance → Customize → Additional CSS or edit front-page.php.
                </p>
            </div>
        </section>

        <!-- RECENT BLOG POSTS -->
        <?php
        $recent_posts = new WP_Query( [
            'post_type'      => 'post',
            'posts_per_page' => 3,
            'post_status'    => 'publish',
        ] );
        if ( $recent_posts->have_posts() ) : ?>
        <section class="content-section">
            <h2>Latest from the Blog</h2>
            <div class="posts-grid">
                <?php while ( $recent_posts->have_posts() ) : $recent_posts->the_post(); ?>
                <article class="post-card">
                    <h2><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h2>
                    <p class="post-meta"><?php echo get_the_date(); ?> &mdash; <?php the_author(); ?></p>
                    <div class="post-excerpt"><?php the_excerpt(); ?></div>
                    <a href="<?php the_permalink(); ?>" class="read-more">Read More →</a>
                </article>
                <?php endwhile; wp_reset_postdata(); ?>
            </div>
            <div class="button-container" style="margin-top:20px;">
                <a href="<?php echo esc_url( home_url( '/blog/' ) ); ?>" class="neumorphic-button">View All Posts</a>
            </div>
        </section>
        <?php endif; ?>

    </main>

<?php get_footer(); ?>
