<?php
/**
 * Plugin Name:  Food4Thoth Tools
 * Plugin URI:   https://food4thoth.com
 * Description:  Adds custom post types, shortcodes, and admin tools for the Food4Thoth WordPress installation. Pairs with the Food4Thoth theme.
 * Version:      1.0.0
 * Author:       DeJahn / Artabillies
 * Author URI:   https://www.artabillies.com
 * License:      GPL-2.0-or-later
 * Text Domain:  food4thoth
 */

if ( ! defined( 'ABSPATH' ) ) exit;

define( 'F4T_PLUGIN_VERSION', '1.0.0' );
define( 'F4T_PLUGIN_PATH',    plugin_dir_path( __FILE__ ) );
define( 'F4T_PLUGIN_URL',     plugin_dir_url( __FILE__ ) );
define( 'F4T_BASE_URL',       'https://www.food4thoth.com/' );

/* =============================================
   ACTIVATION: Create default pages
   ============================================= */
register_activation_hook( __FILE__, 'f4t_plugin_activate' );

function f4t_plugin_activate() {
    f4t_create_default_pages();
    flush_rewrite_rules();
}

function f4t_create_default_pages() {
    $pages = [
        // Top-level pages
        [ 'title' => 'Home',          'slug' => 'home',          'template' => '',                                      'parent' => 0 ],
        [ 'title' => 'Portfolio',     'slug' => 'portfolio',     'template' => 'page-templates/page-portfolio.php',     'parent' => 0 ],
        [ 'title' => 'Blog',          'slug' => 'blog',          'template' => '',                                      'parent' => 0 ],
        [ 'title' => 'Contact',       'slug' => 'contact',       'template' => 'page-templates/page-contact.php',       'parent' => 0 ],
        [ 'title' => 'Donations',     'slug' => 'donations',     'template' => '',                                      'parent' => 0 ],

        // HUB PAGES (parent categories)
        [ 'title' => 'Tarot & Divination', 'slug' => 'tarot',    'template' => 'page-templates/page-hub.php',          'parent' => 0 ],
        [ 'title' => 'Music & Audio',      'slug' => 'music',    'template' => 'page-templates/page-hub.php',          'parent' => 0 ],
        [ 'title' => 'Games',              'slug' => 'games',    'template' => 'page-templates/page-hub.php',          'parent' => 0 ],
        [ 'title' => 'Fractals & Visuals', 'slug' => 'visuals',  'template' => 'page-templates/page-hub.php',          'parent' => 0 ],
        [ 'title' => 'Akashic Records',    'slug' => 'akashic',  'template' => 'page-templates/page-hub.php',          'parent' => 0 ],
        [ 'title' => 'Community',          'slug' => 'community','template' => 'page-templates/page-hub.php',          'parent' => 0 ],
        [ 'title' => 'Esoteric Library',   'slug' => 'esoteric', 'template' => 'page-templates/page-hub.php',          'parent' => 0 ],
    ];

    $created_ids = [];

    foreach ( $pages as $page_data ) {
        $exists = get_page_by_path( $page_data['slug'] );
        if ( $exists ) {
            $created_ids[ $page_data['slug'] ] = $exists->ID;
            continue;
        }

        $id = wp_insert_post( [
            'post_title'   => $page_data['title'],
            'post_name'    => $page_data['slug'],
            'post_status'  => 'publish',
            'post_type'    => 'page',
            'post_parent'  => isset( $created_ids[ $page_data['parent'] ] ) ? $created_ids[ $page_data['parent'] ] : 0,
        ] );

        if ( $id && ! is_wp_error( $id ) ) {
            $created_ids[ $page_data['slug'] ] = $id;
            if ( $page_data['template'] ) {
                update_post_meta( $id, '_wp_page_template', $page_data['template'] );
            }
        }
    }

    // Now create tool sub-pages under their parent hubs
    $tool_pages = f4t_get_all_tools();

    foreach ( $tool_pages as $tool ) {
        $parent_id = isset( $created_ids[ $tool['parent_slug'] ] ) ? $created_ids[ $tool['parent_slug'] ] : 0;
        $exists    = get_page_by_path( $tool['slug'], OBJECT, 'page' );
        if ( $exists ) continue;

        $id = wp_insert_post( [
            'post_title'   => $tool['title'],
            'post_name'    => $tool['slug'],
            'post_status'  => 'publish',
            'post_type'    => 'page',
            'post_parent'  => $parent_id,
            'menu_order'   => $tool['order'] ?? 0,
        ] );

        if ( $id && ! is_wp_error( $id ) ) {
            update_post_meta( $id, '_wp_page_template', 'page-templates/page-tool-embed.php' );
            update_post_meta( $id, '_f4t_iframe_url',   $tool['url'] );
            update_post_meta( $id, '_f4t_open_new_tab', '1' );
            update_post_meta( $id, '_f4t_short_desc',   $tool['desc'] ?? '' );
        }
    }
}

function f4t_get_all_tools() {
    return [
        // TAROT
        [ 'title' => 'Tarot Orientation Landing',   'slug' => 'tarot-landing',         'parent_slug' => 'tarot',    'url' => F4T_BASE_URL . 'TarotLanding/',           'desc' => 'Introduction to tarot on Food4Thoth.' ],
        [ 'title' => 'Tarot Card Gallery (3 Decks)','slug' => 'tarot-3-decks',         'parent_slug' => 'tarot',    'url' => F4T_BASE_URL . 'TarotTogetherNoAge/',     'desc' => 'Gallery of 3 tarot decks.' ],
        [ 'title' => 'Tarot Card Gallery (4 Decks)','slug' => 'tarot-4-decks',         'parent_slug' => 'tarot',    'url' => F4T_BASE_URL . 'TarotTogetherNoAge4Decks/', 'desc' => 'Gallery of 4 tarot decks.' ],
        [ 'title' => 'Celtic Cross Reading',         'slug' => 'celtic-cross-tarot',    'parent_slug' => 'tarot',    'url' => F4T_BASE_URL . 'CelticCrossTarot/',       'desc' => 'Full Celtic Cross spread.' ],
        [ 'title' => 'Three-Card Tarot w/ Gallery',  'slug' => 'three-card-tarot',      'parent_slug' => 'tarot',    'url' => F4T_BASE_URL . 'ThreeCardTarot/',         'desc' => 'Three-card reading with gallery.' ],
        [ 'title' => 'Three-Card Tarot (Standalone)','slug' => 'three-card-standalone', 'parent_slug' => 'tarot',    'url' => F4T_BASE_URL . 'ThreeCardTarotByItself/', 'desc' => 'Standalone three-card tarot reading.' ],
        [ 'title' => 'Sacred Geometry Tarot',        'slug' => 'sacred-geometry-tarot', 'parent_slug' => 'tarot',    'url' => F4T_BASE_URL . 'TarotSacredGeometry/',    'desc' => 'Tarot fused with sacred geometry.' ],
        [ 'title' => 'CyberPunk Dark Tarot',         'slug' => 'cyberpunk-dark-tarot',  'parent_slug' => 'tarot',    'url' => F4T_BASE_URL . 'TarotCyberPunkDark/',     'desc' => 'Dark CyberPunk themed tarot deck.' ],
        [ 'title' => 'CyberPunk Melo Tarot',         'slug' => 'cyberpunk-melo-tarot',  'parent_slug' => 'tarot',    'url' => F4T_BASE_URL . 'TarotCyberPunkMelo/',     'desc' => 'Melo CyberPunk themed tarot deck.' ],
        [ 'title' => 'OG Tarot w/ Voice Commands',   'slug' => 'og-tarot',              'parent_slug' => 'tarot',    'url' => F4T_BASE_URL . 'TarotOG/',                'desc' => 'Original tarot with voice command support.' ],
        [ 'title' => 'Egyptian Major Arcana (1-22)', 'slug' => 'egyptian-tarot',        'parent_slug' => 'tarot',    'url' => F4T_BASE_URL . 'EgyptianTarot/',           'desc' => 'Custom Egyptian Major Arcana.' ],
        [ 'title' => 'Egyptian Tarot Full (1-78)',    'slug' => 'egyptian-tarot-full',   'parent_slug' => 'tarot',    'url' => F4T_BASE_URL . 'EgyptianTarotFull/',       'desc' => 'Full 78-card Egyptian sacred geometry tarot.' ],
        [ 'title' => 'Jungian Thoth Tarot',          'slug' => 'jungian-tarot',         'parent_slug' => 'tarot',    'url' => F4T_BASE_URL . 'TarotJungian/',            'desc' => 'Jungian-inspired Thoth Tarot spread.' ],
        [ 'title' => 'Cyberpunk Tarot Text Library', 'slug' => 'tarot-text-library',    'parent_slug' => 'tarot',    'url' => F4T_BASE_URL . 'TarotTextList/',           'desc' => 'Text-based Cyberpunk Tarot library.' ],
        [ 'title' => 'All Tarot Spreads',            'slug' => 'all-tarot-spreads',     'parent_slug' => 'tarot',    'url' => F4T_BASE_URL . 'DrawTarot/',              'desc' => 'All available tarot spreads.' ],
        [ 'title' => 'Majix Galleries Landing',      'slug' => 'majix-landing',         'parent_slug' => 'tarot',    'url' => F4T_BASE_URL . 'MajixLanding/',           'desc' => 'Majix Tarot galleries landing page.' ],
        [ 'title' => 'Majix Major Arcana',           'slug' => 'majix-major',           'parent_slug' => 'tarot',    'url' => F4T_BASE_URL . 'MajixTarotMajor/',        'desc' => 'Majix Major Arcana gallery.' ],
        [ 'title' => 'Majix Wands',                  'slug' => 'majix-wands',           'parent_slug' => 'tarot',    'url' => F4T_BASE_URL . 'MajixTarotWands/',        'desc' => 'Majix Tarot Wands suit.' ],
        [ 'title' => 'Majix Cups',                   'slug' => 'majix-cups',            'parent_slug' => 'tarot',    'url' => F4T_BASE_URL . 'MajixTarotCups/',         'desc' => 'Majix Tarot Cups suit.' ],
        [ 'title' => 'Majix Swords',                 'slug' => 'majix-swords',          'parent_slug' => 'tarot',    'url' => F4T_BASE_URL . 'MajixTarotSwords/',       'desc' => 'Majix Tarot Swords suit.' ],
        [ 'title' => 'Majix Pentacles',              'slug' => 'majix-pentacles',       'parent_slug' => 'tarot',    'url' => F4T_BASE_URL . 'MajixTarotPentacles/',    'desc' => 'Majix Tarot Pentacles suit.' ],
        [ 'title' => 'Majix All Cards',              'slug' => 'majix-all',             'parent_slug' => 'tarot',    'url' => F4T_BASE_URL . 'MajixTarotAll/',          'desc' => 'Complete Majix Tarot deck.' ],
        [ 'title' => 'I Ching Simple',               'slug' => 'i-ching',              'parent_slug' => 'tarot',    'url' => F4T_BASE_URL . 'Iching/',                 'desc' => 'Simple I Ching oracle.' ],
        [ 'title' => 'I Ching Fractal',              'slug' => 'i-ching-fractal',       'parent_slug' => 'tarot',    'url' => F4T_BASE_URL . 'IchingFractal/',           'desc' => 'I Ching with fractal visuals.' ],
        [ 'title' => 'I Ching Fractal/Photo',        'slug' => 'i-ching-photo',         'parent_slug' => 'tarot',    'url' => F4T_BASE_URL . 'IchingPhoto/',             'desc' => 'I Ching with fractal and photo visuals.' ],
        [ 'title' => 'Quick Reference Flip Gallery', 'slug' => 'tarot-flip-gallery',   'parent_slug' => 'tarot',    'url' => F4T_BASE_URL . 'TarotFlipCardGallery/',   'desc' => 'Quick flip-card tarot reference gallery.' ],
        [ 'title' => 'All Tarot Resources',          'slug' => 'tarot-resources',       'parent_slug' => 'tarot',    'url' => F4T_BASE_URL . 'TarotAllResources/',       'desc' => 'All tarot resources in one place.' ],
        // MUSIC
        [ 'title' => 'Loop Station',                 'slug' => 'loop-station',          'parent_slug' => 'music',    'url' => F4T_BASE_URL . 'LoopStation/',            'desc' => 'Multi-track web loop recorder.' ],
        [ 'title' => 'Loop Station HiFi',            'slug' => 'loop-station-hifi',     'parent_slug' => 'music',    'url' => F4T_BASE_URL . 'LoopStationHiFi/',        'desc' => 'Advanced loop station with effects.' ],
        [ 'title' => 'ARP Synth (High-Fi)',           'slug' => 'arp-highfi',            'parent_slug' => 'music',    'url' => F4T_BASE_URL . 'ArpAppNoVisualHighFi/',   'desc' => 'High-fidelity arpeggiator synth.' ],
        [ 'title' => 'ARP Synth (Lo-Fi)',             'slug' => 'arp-lofi',              'parent_slug' => 'music',    'url' => F4T_BASE_URL . 'ArpAppNoVisualLoFi/',     'desc' => 'Lo-fi arpeggiator synthesizer.' ],
        [ 'title' => 'ARP Synth (With Visual)',       'slug' => 'arp-visual',            'parent_slug' => 'music',    'url' => F4T_BASE_URL . 'ArpAppWithVisual/',       'desc' => 'Arp synth with reactive visual display.' ],
        [ 'title' => 'Music Library Lite',            'slug' => 'music-library',         'parent_slug' => 'music',    'url' => F4T_BASE_URL . 'MusicLibrary/',           'desc' => 'Lightweight music listening library.' ],
        [ 'title' => 'Music Library (Visualizer)',    'slug' => 'music-library-vis',     'parent_slug' => 'music',    'url' => F4T_BASE_URL . 'MusicLibraryVis/',        'desc' => 'Music library with audio visualizer.' ],
        [ 'title' => 'NoWhere Man Looper',            'slug' => 'nowhere-man-looper',    'parent_slug' => 'music',    'url' => F4T_BASE_URL . 'Bboy/',                   'desc' => 'Animated music looper – NoWhere Man.' ],
        [ 'title' => 'BJungle Looper',                'slug' => 'bjungle-looper',        'parent_slug' => 'music',    'url' => F4T_BASE_URL . 'BJungle/',                'desc' => 'BJungle animated music looper.' ],
        [ 'title' => 'Voice Activated Visualizer',   'slug' => 'voice-visualizer',      'parent_slug' => 'music',    'url' => F4T_BASE_URL . 'SoundActivatedVisualizor/', 'desc' => 'Visualizer that reacts to your voice.' ],
        [ 'title' => 'Sound Visualizer w/Media',     'slug' => 'sound-visualizer',      'parent_slug' => 'music',    'url' => F4T_BASE_URL . 'SoundVisualizerWmedia/',  'desc' => 'Sound visualizer with media loader.' ],
        // GAMES
        [ 'title' => 'New School Game: Kid Sprite',  'slug' => 'game-kid',              'parent_slug' => 'games',    'url' => F4T_BASE_URL . 'NewSchoolGameKid/',       'desc' => 'New school platformer game.' ],
        [ 'title' => 'New School Game: Wizard',      'slug' => 'game-wizard',           'parent_slug' => 'games',    'url' => F4T_BASE_URL . 'NewSchoolGameWizard/',    'desc' => 'Wizard sprite platformer game.' ],
        [ 'title' => 'Old School Game: Desktop',     'slug' => 'game-old-school',       'parent_slug' => 'games',    'url' => F4T_BASE_URL . 'OldSchoolGameDesktop/',   'desc' => 'Retro style desktop game.' ],
        [ 'title' => 'Old School Game: Mobile',      'slug' => 'game-mobile',           'parent_slug' => 'games',    'url' => F4T_BASE_URL . 'OldSchoolGameMobile/',    'desc' => 'Retro style mobile game.' ],
        [ 'title' => 'Terminal Transition Game',     'slug' => 'game-terminal',         'parent_slug' => 'games',    'url' => F4T_BASE_URL . 'TerminalGameTransition/', 'desc' => 'Terminal-themed game transition.' ],
        [ 'title' => 'Bergs of Life',                'slug' => 'bergs-of-life',         'parent_slug' => 'games',    'url' => F4T_BASE_URL . 'bergs-of-life/',          'desc' => 'Conway\'s Game of Life variant.' ],
        [ 'title' => 'Claw Machine OG',              'slug' => 'claw-machine',          'parent_slug' => 'games',    'url' => F4T_BASE_URL . 'claw-machine/',           'desc' => 'Original claw machine game.' ],
        [ 'title' => 'Claw Machine Enhanced',        'slug' => 'claw-machine-enhanced', 'parent_slug' => 'games',    'url' => F4T_BASE_URL . 'claw-machineGame/',       'desc' => 'Enhanced claw machine with prizes.' ],
        [ 'title' => 'Choose Your Own Adventure',    'slug' => 'choose-adventure',      'parent_slug' => 'games',    'url' => F4T_BASE_URL . 'ChooseYourOwnAdventure/prologue.html', 'desc' => 'Interactive choose-your-path story.' ],
        [ 'title' => 'Eye Spy Game (1st Ed)',         'slug' => 'eye-spy-1',             'parent_slug' => 'games',    'url' => F4T_BASE_URL . 'EyeSPY1/',               'desc' => 'Eye spy game – 20 items 1st edition.' ],
        [ 'title' => 'Eye Spy Game (2nd Ed)',         'slug' => 'eye-spy-2',             'parent_slug' => 'games',    'url' => F4T_BASE_URL . 'EyeSPY2/',               'desc' => 'Eye spy game – 46 items 2nd edition.' ],
        [ 'title' => 'Eye Spy Game (3rd Ed)',         'slug' => 'eye-spy-3',             'parent_slug' => 'games',    'url' => F4T_BASE_URL . 'EyeSPY3/',               'desc' => 'Eye spy game – 66 items 3rd edition.' ],
        // FRACTALS & VISUALS
        [ 'title' => 'Draw w/Fractals',              'slug' => 'drawing-fractals',      'parent_slug' => 'visuals',  'url' => F4T_BASE_URL . 'DrawingFractals/',        'desc' => 'Draw using mathematical fractal tools.' ],
        [ 'title' => 'Fractal Trees',                'slug' => 'fractal-trees',         'parent_slug' => 'visuals',  'url' => F4T_BASE_URL . 'FractalTrees/',           'desc' => 'Generate beautiful fractal tree patterns.' ],
        [ 'title' => 'Rainbow Fractal Generator',   'slug' => 'rainbow-fractal',        'parent_slug' => 'visuals',  'url' => F4T_BASE_URL . 'RainbowFracGenerator/',  'desc' => 'Generate rainbow-colored fractals.' ],
        [ 'title' => 'WebGL Fluid Simulation',       'slug' => 'webgl-fluid',           'parent_slug' => 'visuals',  'url' => F4T_BASE_URL . 'webgl-fluid-simulation/', 'desc' => 'Interactive WebGL fluid dynamics.' ],
        [ 'title' => 'Psychedelic Waves',            'slug' => 'psychedelic-waves',     'parent_slug' => 'visuals',  'url' => F4T_BASE_URL . 'psychedelic-waves/',      'desc' => 'CSS-animated psychedelic wave patterns.' ],
        [ 'title' => 'Neuro Noise',                  'slug' => 'neuro-noise',           'parent_slug' => 'visuals',  'url' => F4T_BASE_URL . 'neuro-noise/',            'desc' => 'GLSL-powered neuro-noise shader.' ],
        [ 'title' => 'Dragon Curve',                 'slug' => 'dragon-curve',          'parent_slug' => 'visuals',  'url' => F4T_BASE_URL . 'dragon-curve/',           'desc' => 'Animated dragon curve fractal.' ],
        [ 'title' => 'Spiral',                       'slug' => 'spiral',                'parent_slug' => 'visuals',  'url' => F4T_BASE_URL . 'spiral/',                 'desc' => 'Animated spiral fractal generator.' ],
        [ 'title' => 'Snowflake Generator',          'slug' => 'snowflake',             'parent_slug' => 'visuals',  'url' => F4T_BASE_URL . 'snowflake/',              'desc' => 'Generate Koch snowflake fractals.' ],
        [ 'title' => 'Not Hopalong',                 'slug' => 'not-hopalong',          'parent_slug' => 'visuals',  'url' => F4T_BASE_URL . 'not-hopalong/',           'desc' => 'Hopalong attractor visualization.' ],
        [ 'title' => 'Rainbow Reveal 1',             'slug' => 'rainbow-reveal-1',      'parent_slug' => 'visuals',  'url' => F4T_BASE_URL . 'Rainbows4Thoth/Reveal1.html', 'desc' => 'First rainbow reveal animation.' ],
        [ 'title' => 'Rainbow Reveal 2',             'slug' => 'rainbow-reveal-2',      'parent_slug' => 'visuals',  'url' => F4T_BASE_URL . 'Rainbows4Thoth/Reveal2.html', 'desc' => 'Second rainbow reveal animation.' ],
        [ 'title' => 'Mescalito Reveal',             'slug' => 'mescalito',             'parent_slug' => 'visuals',  'url' => F4T_BASE_URL . 'Mescalito/Reveal1.html', 'desc' => 'Mescalito themed reveal animation.' ],
        [ 'title' => 'MindMelt',                     'slug' => 'mindmelt',              'parent_slug' => 'visuals',  'url' => F4T_BASE_URL . 'MindMelt/',               'desc' => 'Mind-melting psychedelic visuals.' ],
        [ 'title' => 'Behind the Fold',              'slug' => 'behind-the-fold',       'parent_slug' => 'visuals',  'url' => F4T_BASE_URL . 'behind-the-fold/',        'desc' => 'Exploration behind the fold of reality.' ],
        // AKASHIC RECORDS
        [ 'title' => 'Akashic Records Landing',      'slug' => 'akashic-landing',       'parent_slug' => 'akashic',  'url' => F4T_BASE_URL . 'css-only-3d-image-carousel/', 'desc' => '3D carousel landing for Akashic Records.' ],
        [ 'title' => 'Akashic Asclepius Deep',       'slug' => 'akashic-asclepius',     'parent_slug' => 'akashic',  'url' => F4T_BASE_URL . 'AkashicAsclepiusDeep/',  'desc' => 'Deep exploration of Asclepius texts.' ],
        [ 'title' => 'Akashic Emerald (As Above)',   'slug' => 'akashic-emerald-above', 'parent_slug' => 'akashic',  'url' => F4T_BASE_URL . 'AkashicEmeraldAsAbove/', 'desc' => 'Emerald Tablet – As Above So Below.' ],
        [ 'title' => 'Akashic Emerald Deep',         'slug' => 'akashic-emerald-deep',  'parent_slug' => 'akashic',  'url' => F4T_BASE_URL . 'AkashicEmeraldDeep/',    'desc' => 'Deep dive into Emerald Tablet teachings.' ],
        [ 'title' => 'Akashic Emerald Lite',         'slug' => 'akashic-emerald-lite',  'parent_slug' => 'akashic',  'url' => F4T_BASE_URL . 'AkashicEmeraldLite/',    'desc' => 'Lite version of Emerald Tablet content.' ],
        [ 'title' => 'Akashic Hermiticum',           'slug' => 'akashic-hermiticum',    'parent_slug' => 'akashic',  'url' => F4T_BASE_URL . 'AkashicHermiticum/',     'desc' => 'Corpus Hermeticum – Hermetic philosophy.' ],
        [ 'title' => 'Akashic Hymn Lite',            'slug' => 'akashic-hymn',          'parent_slug' => 'akashic',  'url' => F4T_BASE_URL . 'AkashicHymnLite/',       'desc' => 'Gnostic hymns from the Akashic library.' ],
        [ 'title' => 'Akashic Nag Hammadi',          'slug' => 'akashic-nag',           'parent_slug' => 'akashic',  'url' => F4T_BASE_URL . 'AkashicNag/',            'desc' => 'Nag Hammadi texts – Gnostic gospels.' ],
        [ 'title' => 'Akashic Nag 13 Codex',         'slug' => 'akashic-nag-codex',     'parent_slug' => 'akashic',  'url' => F4T_BASE_URL . 'AkashicNag13Codex/',     'desc' => 'The 13th Codex of the Nag Hammadi library.' ],
        [ 'title' => 'Akashic Thoth Deep',           'slug' => 'akashic-thoth-deep',    'parent_slug' => 'akashic',  'url' => F4T_BASE_URL . 'AkashicThothDeep/',      'desc' => 'Deep Thoth texts and wisdom.' ],
        [ 'title' => 'Akashic Thoth Lite',           'slug' => 'akashic-thoth-lite',    'parent_slug' => 'akashic',  'url' => F4T_BASE_URL . 'AkashicThothLite/',      'desc' => 'Lite version of Thoth text content.' ],
        // ESOTERIC
        [ 'title' => 'Hakim Bey Anarchy Page',       'slug' => 'hakim-bey',             'parent_slug' => 'esoteric', 'url' => F4T_BASE_URL . 'HakimBey/',              'desc' => 'Hakim Bey\'s anarchist philosophy.' ],
        [ 'title' => 'Anarchy Comic: Break Free',    'slug' => 'anarchy-break-free',    'parent_slug' => 'esoteric', 'url' => F4T_BASE_URL . 'AnarchyComicBreakFree/', 'desc' => 'An anarchy-themed comic – Break Free.' ],
        [ 'title' => 'Anarchy Comic: Cocoon',        'slug' => 'anarchy-cocoon',        'parent_slug' => 'esoteric', 'url' => F4T_BASE_URL . 'AnarchyComicCocoon/',    'desc' => 'Anarchy comic – Cocoon transformation.' ],
        [ 'title' => 'Anarchy Depth',                'slug' => 'anarchy-depth',         'parent_slug' => 'esoteric', 'url' => F4T_BASE_URL . 'AnarchyDepth/',          'desc' => 'In-depth anarchist writings.' ],
        [ 'title' => 'Anarchy Poetics',              'slug' => 'anarchy-poetics',       'parent_slug' => 'esoteric', 'url' => F4T_BASE_URL . 'AnarchyPoetics/',        'desc' => 'Anarchist poetry and poetics.' ],
        [ 'title' => 'Anarchy TAZ',                  'slug' => 'anarchy-taz',           'parent_slug' => 'esoteric', 'url' => F4T_BASE_URL . 'AnarchyTAZ/',            'desc' => 'Temporary Autonomous Zone by Hakim Bey.' ],
        [ 'title' => 'Haudenosaunee Thanksgiving',   'slug' => 'haudenosaunee',         'parent_slug' => 'esoteric', 'url' => F4T_BASE_URL . 'Haudenosaunee/',         'desc' => 'Haudenosaunee Thanksgiving Address.' ],
        [ 'title' => 'Prayer For Love',              'slug' => 'prayer-for-love',       'parent_slug' => 'esoteric', 'url' => F4T_BASE_URL . 'PrayerForLove/',         'desc' => 'A digital prayer for love and connection.' ],
        [ 'title' => 'Thanks & Gratitude',           'slug' => 'prayer-thanks',         'parent_slug' => 'esoteric', 'url' => F4T_BASE_URL . 'PrayerThanks/',          'desc' => 'Prayer of thanks and gratitude.' ],
        [ 'title' => 'Hashisheen Album Reviews',     'slug' => 'hashisheen',            'parent_slug' => 'esoteric', 'url' => F4T_BASE_URL . 'EndOfLawHASHISHEEN/AllHashineenReviews.html', 'desc' => 'Full Hashisheen: End of Law album reviews.' ],
        // COMMUNITY
        [ 'title' => 'Community Garden List',        'slug' => 'garden-list',           'parent_slug' => 'community','url' => F4T_BASE_URL . 'CommunityGardensLists/', 'desc' => 'Full list of community gardens.' ],
        [ 'title' => 'Eugene Garden Map',            'slug' => 'eugene-garden-map',     'parent_slug' => 'community','url' => F4T_BASE_URL . 'CommunityGardensMaps/indexEugeneMap.html', 'desc' => 'Interactive map of Eugene gardens.' ],
        [ 'title' => 'Portland Garden Map',          'slug' => 'portland-garden-map',   'parent_slug' => 'community','url' => F4T_BASE_URL . 'CommunityGardensMaps/indexPortlandMap.html', 'desc' => 'Interactive map of Portland gardens.' ],
        [ 'title' => 'Community Garden Info',        'slug' => 'garden-info',           'parent_slug' => 'community','url' => F4T_BASE_URL . 'CommunityGardensInfo/',  'desc' => 'Community garden how-to and resources.' ],
        [ 'title' => 'Black Business Directory',     'slug' => 'black-business',        'parent_slug' => 'community','url' => F4T_BASE_URL . 'BlackBuisnessEugene/',   'desc' => 'Directory of Black-owned businesses in Eugene.' ],
        [ 'title' => 'Tide Walk USA',                'slug' => 'tide-walk',             'parent_slug' => 'community','url' => F4T_BASE_URL . 'TideApp/',               'desc' => 'Tidal charts and walk planner.' ],
        [ 'title' => 'Rainbow Recordings',           'slug' => 'rainbow-recordings',    'parent_slug' => 'community','url' => F4T_BASE_URL . 'RainbowGathering/',      'desc' => 'Rainbow Gathering recordings and archives.' ],
        [ 'title' => 'Glo-Calculato',                'slug' => 'glo-calculato',         'parent_slug' => 'community','url' => F4T_BASE_URL . 'GloCalculato/',          'desc' => 'Rainbow glowing calculator app.' ],
        [ 'title' => 'Trent of the Day',             'slug' => 'trent',                 'parent_slug' => 'community','url' => F4T_BASE_URL . 'TrentOfTheDay/',         'desc' => 'Daily Trent the dog feature.' ],
    ];
}

/* =============================================
   ADMIN PAGE: Food4Thoth Tools Dashboard
   ============================================= */
function f4t_admin_menu() {
    add_menu_page(
        __( 'Food4Thoth Tools', 'food4thoth' ),
        __( 'Food4Thoth', 'food4thoth' ),
        'manage_options',
        'food4thoth',
        'f4t_admin_page_html',
        'dashicons-portfolio',
        30
    );
}
add_action( 'admin_menu', 'f4t_admin_menu' );

function f4t_admin_page_html() {
    if ( ! current_user_can( 'manage_options' ) ) return;

    // Handle re-run setup
    if ( isset( $_POST['f4t_run_setup'] ) && wp_verify_nonce( $_POST['_wpnonce'], 'f4t_setup' ) ) {
        f4t_create_default_pages();
        echo '<div class="notice notice-success"><p>✓ Food4Thoth pages have been created/updated!</p></div>';
    }
    ?>
    <div class="wrap">
        <h1>🌀 Food4Thoth Dashboard</h1>
        <p>Welcome to the Food4Thoth WordPress setup. This plugin manages tool pages, categories, and iframes.</p>

        <div class="card" style="max-width:700px;">
            <h2>Setup Pages</h2>
            <p>Run the setup to create all hub pages and 80+ tool embed pages automatically.</p>
            <form method="post">
                <?php wp_nonce_field( 'f4t_setup' ); ?>
                <input type="hidden" name="f4t_run_setup" value="1">
                <button type="submit" class="button button-primary">Create / Refresh All Pages</button>
            </form>
        </div>

        <div class="card" style="max-width:700px;margin-top:20px;">
            <h2>How to Use the Tool Embed Template</h2>
            <ol>
                <li>Go to <strong>Pages → Add New</strong></li>
                <li>Set the <strong>Page Template</strong> to "Tool Embed (iframe)"</li>
                <li>In the <strong>Tool Settings</strong> panel, paste the food4thoth.com URL</li>
                <li>Publish the page</li>
            </ol>
        </div>

        <div class="card" style="max-width:700px;margin-top:20px;">
            <h2>Shortcodes</h2>
            <ul>
                <li><code>[f4t_tool url="https://www.food4thoth.com/TarotLanding/" height="85vh" title="Tarot"]</code> — Embed any tool</li>
                <li><code>[f4t_category_hub]</code> — Auto card-grid of all child pages</li>
            </ul>
        </div>

        <div class="card" style="max-width:700px;margin-top:20px;">
            <h2>Quick Links to food4thoth.com</h2>
            <a href="https://food4thoth.com" target="_blank" class="button">food4thoth.com</a>
            <a href="https://www.food4thoth.com/TarotLanding/" target="_blank" class="button">Tarot Landing</a>
            <a href="https://www.food4thoth.com/LoopStation/" target="_blank" class="button">Loop Station</a>
            <a href="https://www.food4thoth.com/GloCalculato/" target="_blank" class="button">Glo-Calculato</a>
        </div>
    </div>
    <?php
}

/* =============================================
   BODY CLASS: add theme identifier
   ============================================= */
add_filter( 'body_class', function( $classes ) {
    $classes[] = 'food4thoth-wp';
    return $classes;
} );
