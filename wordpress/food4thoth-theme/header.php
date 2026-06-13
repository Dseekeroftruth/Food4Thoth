<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo( 'charset' ); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <link rel="profile" href="https://gmpg.org/xfn/11">
    <?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
<?php wp_body_open(); ?>

<div class="site-wrapper">

    <!-- ===== TOGGLE BUTTON ===== -->
    <button id="toggle-nav" class="toggle-button" aria-expanded="false" aria-controls="navigation">
        ☰ Nav
    </button>

    <!-- ===== FULL NAVIGATION (mirrors original food4thoth.com nav exactly) ===== -->
    <nav id="navigation" class="navigation hidden" aria-label="<?php esc_attr_e( 'Main Navigation', 'food4thoth' ); ?>">

        <a href="<?php echo esc_url( home_url( '/' ) ); ?>" class="neumorphic-tab">Home</a>

        <a href="<?php echo esc_url( home_url( '/donations/' ) ); ?>" class="neumorphic-tab">Donations Page</a>

        <!-- Black Business Eugene -->
        <a href="#" class="neumorphic-tab" data-expand="submenu-black-business">Black Business Eugene</a>
        <div id="submenu-black-business" class="submenu hidden">
            <a href="https://www.food4thoth.com/BlackBuisnessEugene/" class="neumorphic-tab" target="_blank">Black Business Directory</a>
            <a href="https://www.food4thoth.com/BlackBuisnessEugene/blackbusinessformpage.html" class="neumorphic-tab" target="_blank">Black Business Form</a>
        </div>

        <!-- Community Gardens -->
        <a href="#" class="neumorphic-tab" data-expand="submenu-community-garden">Community Gardens</a>
        <div id="submenu-community-garden" class="submenu hidden">
            <a href="https://www.food4thoth.com/CommunityGardensLists/" class="neumorphic-tab" target="_blank">Full List of All Gardens</a>
            <a href="https://www.food4thoth.com/CommunityGardenLand/" class="neumorphic-tab" target="_blank">Mobile Landing</a>
            <a href="https://www.food4thoth.com/CommunityGardenLand/indexDesktop.html" class="neumorphic-tab" target="_blank">Desktop Landing</a>
            <a href="https://www.food4thoth.com/CommunityGardensMaps/indexEugeneMap.html" class="neumorphic-tab" target="_blank">Eugene Garden Map</a>
            <a href="https://www.food4thoth.com/CommunityGardensMaps/indexPortlandMap.html" class="neumorphic-tab" target="_blank">Portland Garden Map</a>
            <a href="https://www.food4thoth.com/CommunityGardensInfo/" class="neumorphic-tab" target="_blank">Community Garden Info</a>
            <a href="https://www.food4thoth.com/CommunityGardensLists/indexEugene.html" class="neumorphic-tab" target="_blank">Eugene Garden List</a>
            <a href="https://www.food4thoth.com/CommunityGardensLists/indexPortland.html" class="neumorphic-tab" target="_blank">Portland Garden List</a>
        </div>

        <!-- Sound & Voice Visualizers -->
        <a href="#" class="neumorphic-tab" data-expand="submenu-visualizers">Sound &amp; Voice Visualizers</a>
        <div id="submenu-visualizers" class="submenu hidden">
            <a href="https://www.food4thoth.com/SoundActivatedVisualizor/" class="neumorphic-tab" target="_blank">Voice Activated Visualizer</a>
            <a href="https://www.food4thoth.com/SoundVisualizerWmedia/" class="neumorphic-tab" target="_blank">Sound Visualizer w/Media Loader</a>
        </div>

        <!-- ARP Synths -->
        <a href="#" class="neumorphic-tab" data-expand="submenu-arp">ARP Synths</a>
        <div id="submenu-arp" class="submenu hidden">
            <a href="https://www.food4thoth.com/ArpAppNoVisualHighFi/" class="neumorphic-tab" target="_blank">ARP App: No Visual (High-Fi)</a>
            <a href="https://www.food4thoth.com/ArpAppNoVisualLoFi/" class="neumorphic-tab" target="_blank">ARP App: No Visual (Lo-Fi)</a>
            <a href="https://www.food4thoth.com/ArpAppWithVisual/" class="neumorphic-tab" target="_blank">ARP App: With Visual</a>
        </div>

        <!-- Loop Stations -->
        <a href="#" class="neumorphic-tab" data-expand="submenu-loopstation">Loop Stations</a>
        <div id="submenu-loopstation" class="submenu hidden">
            <a href="https://www.food4thoth.com/Bboy/" class="neumorphic-tab" target="_blank">NoWhere Man Looper</a>
            <a href="https://www.food4thoth.com/BJungle/" class="neumorphic-tab" target="_blank">BJungle Looper</a>
            <a href="https://www.food4thoth.com/LoopStation/" class="neumorphic-tab" target="_blank">Loop Station</a>
            <a href="https://www.food4thoth.com/LoopStationHiFi/" class="neumorphic-tab" target="_blank">Loop Station HiFi (Advanced Effects)</a>
        </div>

        <!-- Music Vue Library -->
        <a href="#" class="neumorphic-tab" data-expand="submenu-music">Music Vue Library</a>
        <div id="submenu-music" class="submenu hidden">
            <a href="https://www.food4thoth.com/MusicLibrary/" class="neumorphic-tab" target="_blank">Music Library Lite</a>
            <a href="https://www.food4thoth.com/MusicLibraryVis/" class="neumorphic-tab" target="_blank">Music Library (Visualizer)</a>
        </div>

        <!-- Music Collections -->
        <a href="#" class="neumorphic-tab" data-expand="submenu-music-collection">Music Collections</a>
        <div id="submenu-music-collection" class="submenu hidden">
            <a href="https://www.food4thoth.com/DeJahn/" class="neumorphic-tab" target="_blank">DeJahn</a>
            <a href="https://www.food4thoth.com/SeekerStar/" class="neumorphic-tab" target="_blank">Seeker &amp; the Star</a>
            <a href="https://www.food4thoth.com/GroundCherry/" class="neumorphic-tab" target="_blank">Ground Cherry</a>
            <a href="https://www.food4thoth.com/PeruvianMelt/" class="neumorphic-tab" target="_blank">Peruvian Melt</a>
            <a href="https://www.artabillies.com/inprogression" class="neumorphic-tab" target="_blank">INPROGRESSION Artabillies</a>
            <a href="https://youtube.com/playlist?list=PLsiMr0_hgaOmqlIGzjHZBzi94yaRgQ38L&si=DMZc6ng8GWx8uMbU" class="neumorphic-tab" target="_blank">INPROGRESSION DVD</a>
        </div>

        <a href="https://www.food4thoth.com/ChooseYourOwnAdventure/prologue.html" class="neumorphic-tab" target="_blank">Choose Your Own Adventure</a>

        <!-- Games -->
        <a href="#" class="neumorphic-tab" data-expand="submenu-games">Games</a>
        <div id="submenu-games" class="submenu hidden">
            <a href="https://www.food4thoth.com/NewSchoolGameKid/" class="neumorphic-tab" target="_blank">New School Game: Kid Sprite</a>
            <a href="https://www.food4thoth.com/NewSchoolGameWizard/" class="neumorphic-tab" target="_blank">New School Game: Wizard Sprite</a>
            <a href="https://www.food4thoth.com/OldSchoolGameDesktop/" class="neumorphic-tab" target="_blank">Old School Game: Desktop</a>
            <a href="https://www.food4thoth.com/OldSchoolGameMobile/" class="neumorphic-tab" target="_blank">Old School Game: Mobile</a>
            <a href="https://www.food4thoth.com/TerminalGameTransition/" class="neumorphic-tab" target="_blank">Terminal Transition Game</a>
            <a href="https://www.food4thoth.com/bergs-of-life/" class="neumorphic-tab" target="_blank">Bergs of Life</a>
            <a href="https://www.food4thoth.com/NexusOfGames/" class="neumorphic-tab" target="_blank">Nexus of Games</a>
        </div>

        <!-- Claw Machine -->
        <a href="#" class="neumorphic-tab" data-expand="submenu-claw">Claw Machine</a>
        <div id="submenu-claw" class="submenu hidden">
            <a href="https://www.food4thoth.com/claw-machine/" class="neumorphic-tab" target="_blank">Claw Machine OG</a>
            <a href="https://www.food4thoth.com/claw-machineGame/" class="neumorphic-tab" target="_blank">Claw Machine Enhanced</a>
        </div>

        <!-- Glo-Calculato -->
        <a href="#" class="neumorphic-tab" data-expand="submenu-calculato">Glo-Calculato</a>
        <div id="submenu-calculato" class="submenu hidden">
            <a href="https://www.food4thoth.com/GloCalculatoLanding/" class="neumorphic-tab" target="_blank">Glo-Calculato Landing</a>
            <a href="https://www.food4thoth.com/GloCalculato/" class="neumorphic-tab" target="_blank">Full-Sized Glo-Calculato</a>
            <a href="https://www.food4thoth.com/tariff-calculator/" class="neumorphic-tab" target="_blank">Tariff Calculator</a>
        </div>

        <!-- Tarot -->
        <a href="#" class="neumorphic-tab" data-expand="submenu-tarot">Tarot</a>
        <div id="submenu-tarot" class="submenu hidden">
            <a href="https://www.food4thoth.com/TarotLanding/" class="neumorphic-tab" target="_blank">Tarot Orientation Landing</a>
            <a href="https://www.food4thoth.com/TarotLanding/HowTo.html" class="neumorphic-tab" target="_blank">How To: Tarot</a>
            <a href="https://www.food4thoth.com/TarotFlipCardGallery/" class="neumorphic-tab" target="_blank">Quick Reference Flip Gallery</a>
            <a href="https://www.food4thoth.com/TarotTogetherNoAge/" class="neumorphic-tab" target="_blank">Tarot Card Gallery (3 Decks)</a>
            <a href="https://www.food4thoth.com/TarotTogetherNoAge4Decks/" class="neumorphic-tab" target="_blank">Tarot Card Gallery (4 Decks)</a>
            <a href="https://www.food4thoth.com/CelticCrossTarot/" class="neumorphic-tab" target="_blank">Celtic Cross Reading</a>
            <a href="https://www.food4thoth.com/ThreeCardTarot/" class="neumorphic-tab" target="_blank">Three-Card Tarot w/ Gallery</a>
            <a href="https://www.food4thoth.com/ThreeCardTarotByItself/" class="neumorphic-tab" target="_blank">Three-Card Tarot Reading</a>
            <a href="https://www.food4thoth.com/TarotSacredGeometry/" class="neumorphic-tab" target="_blank">Sacred Geometry Tarot</a>
            <a href="https://www.food4thoth.com/TarotCyberPunkDark/" class="neumorphic-tab" target="_blank">CyberPunk Dark Tarot</a>
            <a href="https://www.food4thoth.com/TarotCyberPunkMelo/" class="neumorphic-tab" target="_blank">CyberPunk Melo Tarot</a>
            <a href="https://www.food4thoth.com/TarotOG/" class="neumorphic-tab" target="_blank">OG Tarot w/Voice Commands</a>
            <a href="https://www.food4thoth.com/EgyptianTarot/" class="neumorphic-tab" target="_blank">Custom Egyptian Major Arcana</a>
            <a href="https://www.food4thoth.com/EgyptianTarotFull/" class="neumorphic-tab" target="_blank">Custom Sacred Geometry (1–78)</a>
            <a href="https://www.food4thoth.com/TarotJungian/" class="neumorphic-tab" target="_blank">Jungian Thoth Tarot Spread</a>
            <a href="https://www.food4thoth.com/TarotTextList/" class="neumorphic-tab" target="_blank">Cyberpunk Tarot Text Library</a>
            <a href="https://www.food4thoth.com/DrawTarot/" class="neumorphic-tab" target="_blank">All Spreads</a>
            <a href="https://www.food4thoth.com/MajixLanding/" class="neumorphic-tab" target="_blank">Majix Galleries Landing</a>
            <a href="https://www.food4thoth.com/MajixTarotMajor/" class="neumorphic-tab" target="_blank">Majix Major Arcana</a>
            <a href="https://www.food4thoth.com/MajixTarotWands/" class="neumorphic-tab" target="_blank">Majix Wands</a>
            <a href="https://www.food4thoth.com/MajixTarotCups/" class="neumorphic-tab" target="_blank">Majix Cups</a>
            <a href="https://www.food4thoth.com/MajixTarotSwords/" class="neumorphic-tab" target="_blank">Majix Swords</a>
            <a href="https://www.food4thoth.com/MajixTarotPentacles/" class="neumorphic-tab" target="_blank">Majix Pentacles</a>
            <a href="https://www.food4thoth.com/MajixTarotAll/" class="neumorphic-tab" target="_blank">Majix All Cards</a>
            <a href="https://www.food4thoth.com/TarotGalleries/" class="neumorphic-tab" target="_blank">Explore All Galleries</a>
            <a href="https://www.food4thoth.com/TarotAllResources/" class="neumorphic-tab" target="_blank">All Resources</a>
        </div>

        <!-- I Ching -->
        <a href="#" class="neumorphic-tab" data-expand="submenu-iching">I Ching</a>
        <div id="submenu-iching" class="submenu hidden">
            <a href="https://www.food4thoth.com/Iching/" class="neumorphic-tab" target="_blank">I Ching Simple</a>
            <a href="https://www.food4thoth.com/IchingFractal/" class="neumorphic-tab" target="_blank">I Ching Fractal</a>
            <a href="https://www.food4thoth.com/IchingPhoto/" class="neumorphic-tab" target="_blank">I Ching Fractal/Photo</a>
            <a href="https://www.food4thoth.com/Iching/ichingAnimeLoop.html" class="neumorphic-tab" target="_blank">I Ching Anime Loop</a>
        </div>

        <!-- Hakim Bey -->
        <a href="#" class="neumorphic-tab" data-expand="submenu-hakim">Hakim Bey</a>
        <div id="submenu-hakim" class="submenu hidden">
            <a href="https://www.food4thoth.com/HakimBey/" class="neumorphic-tab" target="_blank">Hakim Bey Anarchy Page</a>
            <a href="https://www.food4thoth.com/HakimBey/joinTheMovement.html" class="neumorphic-tab" target="_blank">Anarchy Collective Contact</a>
        </div>

        <!-- Hashisheen -->
        <a href="#" class="neumorphic-tab" data-expand="submenu-hashisheen">Hashisheen Album Reviews</a>
        <div id="submenu-hashisheen" class="submenu hidden">
            <a href="https://www.food4thoth.com/EndOfLawHASHISHEEN/AllHashineenReviews.html" class="neumorphic-tab" target="_blank">Landing Page</a>
            <a href="https://www.food4thoth.com/EndOfLawHASHISHEEN/FullAlbumReview.html" class="neumorphic-tab" target="_blank">Full Album Review</a>
            <?php for ( $i = 1; $i <= 22; $i++ ) : ?>
            <a href="https://www.food4thoth.com/EndOfLawHASHISHEEN/index<?php echo $i; ?>.html" class="neumorphic-tab" target="_blank">Track <?php echo $i; ?></a>
            <?php endfor; ?>
        </div>

        <a href="https://www.food4thoth.com/DrawingFractals/" class="neumorphic-tab" target="_blank">Draw w/Fractals</a>

        <a href="https://www.food4thoth.com/RainbowGathering/" class="neumorphic-tab" target="_blank">Rainbow Recordings</a>

        <!-- Rainbow Reveals -->
        <a href="#" class="neumorphic-tab" data-expand="submenu-rainbows">Rainbow Reveals &amp; Generators</a>
        <div id="submenu-rainbows" class="submenu hidden">
            <a href="https://www.food4thoth.com/Rainbows4Thoth/Reveal1.html" class="neumorphic-tab" target="_blank">Rainbow Reveal 1</a>
            <a href="https://www.food4thoth.com/Rainbows4Thoth/Reveal2.html" class="neumorphic-tab" target="_blank">Rainbow Reveal 2</a>
            <a href="https://www.food4thoth.com/Rainbows4Thoth/ListReveal.html" class="neumorphic-tab" target="_blank">Rainbow Reveal List</a>
            <a href="https://www.food4thoth.com/RainbowFracGenerator/" class="neumorphic-tab" target="_blank">Fractal Generator</a>
            <a href="https://www.food4thoth.com/RainbowGenerator/" class="neumorphic-tab" target="_blank">Rainbow Shape Generator</a>
        </div>

        <!-- Mescalito -->
        <a href="#" class="neumorphic-tab" data-expand="submenu-mescalito">Mescalito Reveals</a>
        <div id="submenu-mescalito" class="submenu hidden">
            <a href="https://www.food4thoth.com/Mescalito/Reveal1.html" class="neumorphic-tab" target="_blank">Mescalito Reveal 1</a>
            <a href="https://www.food4thoth.com/Mescalito/Reveal2.html" class="neumorphic-tab" target="_blank">Mescalito Reveal 2</a>
            <a href="https://www.food4thoth.com/Mescalito/ListReveal.html" class="neumorphic-tab" target="_blank">Mescalito Reveal List</a>
        </div>

        <!-- Akashic Records -->
        <a href="#" class="neumorphic-tab" data-expand="submenu-akashic">Akashic Records</a>
        <div id="submenu-akashic" class="submenu hidden">
            <a href="https://www.food4thoth.com/css-only-3d-image-carousel/" class="neumorphic-tab" target="_blank">Main Landing</a>
            <a href="https://www.food4thoth.com/AkashicAsclepiusDeep/" class="neumorphic-tab" target="_blank">Akashic Asclepius Deep</a>
            <a href="https://www.food4thoth.com/AkashicAsclepiusLite/" class="neumorphic-tab" target="_blank">Akashic Asclepius Lite</a>
            <a href="https://www.food4thoth.com/AkashicEmeraldAsAbove/" class="neumorphic-tab" target="_blank">Akashic Emerald As Above</a>
            <a href="https://www.food4thoth.com/AkashicEmeraldDeep/" class="neumorphic-tab" target="_blank">Akashic Emerald Deep</a>
            <a href="https://www.food4thoth.com/AkashicEmeraldLite/" class="neumorphic-tab" target="_blank">Akashic Emerald Lite</a>
            <a href="https://www.food4thoth.com/AkashicHermiticum/" class="neumorphic-tab" target="_blank">Akashic Hermiticum</a>
            <a href="https://www.food4thoth.com/AkashicHymnLite/" class="neumorphic-tab" target="_blank">Akashic Hymn Lite</a>
            <a href="https://www.food4thoth.com/AkashicNag/" class="neumorphic-tab" target="_blank">Akashic Nag</a>
            <a href="https://www.food4thoth.com/AkashicNag13Codex/" class="neumorphic-tab" target="_blank">Akashic Nag 13 Codex</a>
            <a href="https://www.food4thoth.com/AkashicNagTreaties/" class="neumorphic-tab" target="_blank">Akashic Nag Treaties</a>
            <a href="https://www.food4thoth.com/AkashicThothDeep/" class="neumorphic-tab" target="_blank">Akashic Thoth Deep</a>
            <a href="https://www.food4thoth.com/AkashicThothLite/" class="neumorphic-tab" target="_blank">Akashic Thoth Lite</a>
        </div>

        <!-- Anarchy -->
        <a href="#" class="neumorphic-tab" data-expand="submenu-anarchy">Anarchy Comics &amp; Info</a>
        <div id="submenu-anarchy" class="submenu hidden">
            <a href="https://www.food4thoth.com/AnarchyComicBreakFree/" class="neumorphic-tab" target="_blank">Anarchy Comic: Break Free</a>
            <a href="https://www.food4thoth.com/AnarchyComicCocoon/" class="neumorphic-tab" target="_blank">Anarchy Comic: Cocoon</a>
            <a href="https://www.food4thoth.com/AnarchyDepth/" class="neumorphic-tab" target="_blank">Anarchy Depth</a>
            <a href="https://www.food4thoth.com/AnarchyIsAlwaysMobile/" class="neumorphic-tab" target="_blank">Anarchy Is Always Mobile</a>
            <a href="https://www.food4thoth.com/AnarchyPoetics/" class="neumorphic-tab" target="_blank">Anarchy Poetics</a>
            <a href="https://www.food4thoth.com/AnarchyTAZ/" class="neumorphic-tab" target="_blank">Anarchy TAZ</a>
        </div>

        <!-- Eye Spy -->
        <a href="#" class="neumorphic-tab" data-expand="submenu-eyespy">Eye Spy</a>
        <div id="submenu-eyespy" class="submenu hidden">
            <a href="https://www.food4thoth.com/EyeSPY1/" class="neumorphic-tab" target="_blank">Eye Spy Game 20 (1st Edition)</a>
            <a href="https://www.food4thoth.com/EyeSPY2/" class="neumorphic-tab" target="_blank">Eye Spy Game 46 (2nd Edition)</a>
            <a href="https://www.food4thoth.com/EyeSPY3/" class="neumorphic-tab" target="_blank">Eye Spy Game 66 (3rd Edition)</a>
        </div>

        <!-- Tide Walk -->
        <a href="#" class="neumorphic-tab" data-expand="submenu-tide">Tide Walk</a>
        <div id="submenu-tide" class="submenu hidden">
            <a href="https://www.food4thoth.com/TideApp/" class="neumorphic-tab" target="_blank">Tide Walk USA</a>
            <a href="https://www.food4thoth.com/TideApp/indexOregon.html" class="neumorphic-tab" target="_blank">Tide Walk Oregon</a>
            <a href="https://www.food4thoth.com/TideApp/indexBoston.html" class="neumorphic-tab" target="_blank">Tide Walk Boston</a>
        </div>

        <!-- Trent -->
        <a href="#" class="neumorphic-tab" data-expand="submenu-trent">Trent</a>
        <div id="submenu-trent" class="submenu hidden">
            <a href="https://www.food4thoth.com/TrentOfTheDay/" class="neumorphic-tab" target="_blank">Trent of the Day</a>
            <a href="https://www.food4thoth.com/TrentStorybook1stMobile/" class="neumorphic-tab" target="_blank">Trent Storybook</a>
        </div>

        <!-- Prayer -->
        <a href="#" class="neumorphic-tab" data-expand="submenu-prayer">Prayer For Love</a>
        <div id="submenu-prayer" class="submenu hidden">
            <a href="https://www.food4thoth.com/PrayerForLove/" class="neumorphic-tab" target="_blank">Prayer For Love</a>
            <a href="https://www.food4thoth.com/PrayerThanks/" class="neumorphic-tab" target="_blank">Thanks &amp; Gratitude</a>
            <a href="https://www.food4thoth.com/PrayerChildrensStill/" class="neumorphic-tab" target="_blank">Prayer Childrens Still</a>
            <a href="https://www.food4thoth.com/PrayerChildrensFade/" class="neumorphic-tab" target="_blank">Prayer Childrens Fade</a>
            <a href="https://www.food4thoth.com/PrayerChildrensFlip/" class="neumorphic-tab" target="_blank">Prayer Childrens Flip</a>
        </div>

        <a href="https://www.food4thoth.com/Haudenosaunee/" class="neumorphic-tab" target="_blank">Haudenosaunee Thanksgiving</a>
        <a href="https://www.food4thoth.com/Inprogression/" class="neumorphic-tab" target="_blank">INPROGRESSION</a>
        <a href="https://www.food4thoth.com/MindMelt/" class="neumorphic-tab" target="_blank">MindMelt</a>
        <a href="https://www.food4thoth.com/behind-the-fold/" class="neumorphic-tab" target="_blank">Behind the Fold</a>
        <a href="https://www.food4thoth.com/skating-bunny/" class="neumorphic-tab" target="_blank">Rabbit Hole</a>

        <!-- Fractals & Visuals -->
        <a href="#" class="neumorphic-tab" data-expand="submenu-fractals">Fractals &amp; Visuals</a>
        <div id="submenu-fractals" class="submenu hidden">
            <a href="https://www.food4thoth.com/FractalTrees/" class="neumorphic-tab" target="_blank">Fractal Trees</a>
            <a href="https://www.food4thoth.com/DrawingFractals/" class="neumorphic-tab" target="_blank">Draw w/Fractals</a>
            <a href="https://www.food4thoth.com/dragon-curve/" class="neumorphic-tab" target="_blank">Dragon Curve</a>
            <a href="https://www.food4thoth.com/snowflake/" class="neumorphic-tab" target="_blank">Snowflake Generator</a>
            <a href="https://www.food4thoth.com/spiral/" class="neumorphic-tab" target="_blank">Spiral</a>
            <a href="https://www.food4thoth.com/not-hopalong/" class="neumorphic-tab" target="_blank">Not Hopalong</a>
            <a href="https://www.food4thoth.com/neuro-noise/" class="neumorphic-tab" target="_blank">Neuro Noise</a>
            <a href="https://www.food4thoth.com/webgl-fluid-simulation/" class="neumorphic-tab" target="_blank">WebGL Fluid Simulation</a>
            <a href="https://www.food4thoth.com/psychedelic-waves/" class="neumorphic-tab" target="_blank">Psychedelic Waves</a>
        </div>

        <!-- Socials -->
        <a href="#" class="neumorphic-tab" data-expand="submenu-socials">Socials</a>
        <div id="submenu-socials" class="submenu hidden">
            <a href="https://www.instagram.com/emerald_path_food4th0th/" class="neumorphic-tab" target="_blank">FOOD4THOTH Instagram</a>
            <a href="https://www.facebook.com/share/W8VnfAM2NHBAMTUb/" class="neumorphic-tab" target="_blank">FOOD4THOTH Facebook</a>
            <a href="https://www.facebook.com/share/19M7DM1SrT/" class="neumorphic-tab" target="_blank">INPROGRESSION Facebook</a>
            <a href="https://www.instagram.com/artabillies/" class="neumorphic-tab" target="_blank">ARTABILLIES Instagram</a>
            <a href="https://www.facebook.com/share/sEUxePbaAo9kyRNN/" class="neumorphic-tab" target="_blank">ARTABILLIES Facebook</a>
            <a href="https://www.artabillies.com/" class="neumorphic-tab" target="_blank">Artabillies.com</a>
            <a href="https://www.instagram.com/trent_son_of_reznor" class="neumorphic-tab" target="_blank">Trent's Instagram</a>
        </div>

        <!-- Artabillies / About -->
        <a href="#" class="neumorphic-tab" data-expand="submenu-about">About / Artabillies</a>
        <div id="submenu-about" class="submenu hidden">
            <a href="https://www.food4thoth.com/Artabillies/" class="neumorphic-tab" target="_blank">Artabillies Info</a>
            <a href="https://www.food4thoth.com/CollectiveSummary/" class="neumorphic-tab" target="_blank">Collective Summary 1.0</a>
            <a href="https://www.food4thoth.com/CollectiveSummary/index2.html" class="neumorphic-tab" target="_blank">Collective Summary 2.0</a>
            <a href="https://www.food4thoth.com/indexF4T.html" class="neumorphic-tab" target="_blank">F4T ReadMe</a>
        </div>

        <a href="<?php echo esc_url( home_url( '/portfolio/' ) ); ?>" class="neumorphic-tab">Portfolio</a>
        <a href="<?php echo esc_url( home_url( '/contact/' ) ); ?>" class="neumorphic-tab">Contact</a>
        <a href="<?php echo esc_url( home_url( '/blog/' ) ); ?>" class="neumorphic-tab">Blog</a>
        <a href="mailto:food4thoth@proton.me" class="neumorphic-tab">Email Us</a>

    </nav><!-- #navigation -->
