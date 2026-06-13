<?php
/**
 * Template Name: Portfolio Hub
 * Template Post Type: page
 */
get_header();

$tools = [
    // Tarot
    [ 'icon' => '🃏', 'name' => 'Tarot Orientation Landing',   'url' => 'https://food4thoth.com/TarotLanding/',           'cat' => 'Tarot' ],
    [ 'icon' => '🃏', 'name' => 'Celtic Cross Reading',        'url' => 'https://food4thoth.com/CelticCrossTarot/',       'cat' => 'Tarot' ],
    [ 'icon' => '🃏', 'name' => 'Three-Card Tarot',            'url' => 'https://food4thoth.com/ThreeCardTarot/',         'cat' => 'Tarot' ],
    [ 'icon' => '🃏', 'name' => 'Sacred Geometry Tarot',       'url' => 'https://food4thoth.com/TarotSacredGeometry/',    'cat' => 'Tarot' ],
    [ 'icon' => '🃏', 'name' => 'CyberPunk Dark Tarot',        'url' => 'https://food4thoth.com/TarotCyberPunkDark/',     'cat' => 'Tarot' ],
    [ 'icon' => '🃏', 'name' => 'OG Tarot w/Voice Commands',   'url' => 'https://food4thoth.com/TarotOG/',                'cat' => 'Tarot' ],
    [ 'icon' => '🃏', 'name' => 'Egyptian Major Arcana',       'url' => 'https://food4thoth.com/EgyptianTarot/',          'cat' => 'Tarot' ],
    [ 'icon' => '🃏', 'name' => 'Majix Tarot (All Cards)',     'url' => 'https://food4thoth.com/MajixTarotAll/',          'cat' => 'Tarot' ],
    [ 'icon' => '🃏', 'name' => 'Jungian Thoth Tarot Spread',  'url' => 'https://food4thoth.com/TarotJungian/',           'cat' => 'Tarot' ],
    // Divination
    [ 'icon' => '☯️', 'name' => 'I Ching Simple',              'url' => 'https://food4thoth.com/Iching/',                 'cat' => 'Divination' ],
    [ 'icon' => '☯️', 'name' => 'I Ching Fractal',             'url' => 'https://food4thoth.com/IchingFractal/',          'cat' => 'Divination' ],
    // Music
    [ 'icon' => '🎵', 'name' => 'Loop Station',                'url' => 'https://food4thoth.com/LoopStation/',            'cat' => 'Music' ],
    [ 'icon' => '🎵', 'name' => 'Loop Station HiFi',           'url' => 'https://food4thoth.com/LoopStationHiFi/',        'cat' => 'Music' ],
    [ 'icon' => '🎵', 'name' => 'ARP Synth (High-Fi)',         'url' => 'https://food4thoth.com/ArpAppNoVisualHighFi/',   'cat' => 'Music' ],
    [ 'icon' => '🎵', 'name' => 'ARP Synth (With Visual)',     'url' => 'https://food4thoth.com/ArpAppWithVisual/',       'cat' => 'Music' ],
    [ 'icon' => '🎵', 'name' => 'Music Library (Visualizer)',  'url' => 'https://food4thoth.com/MusicLibraryVis/',        'cat' => 'Music' ],
    [ 'icon' => '🎵', 'name' => 'NoWhere Man Looper',          'url' => 'https://food4thoth.com/Bboy/',                   'cat' => 'Music' ],
    [ 'icon' => '🎵', 'name' => 'BJungle Looper',              'url' => 'https://food4thoth.com/BJungle/',                'cat' => 'Music' ],
    // Games
    [ 'icon' => '🎮', 'name' => 'New School Game: Kid',        'url' => 'https://food4thoth.com/NewSchoolGameKid/',       'cat' => 'Games' ],
    [ 'icon' => '🎮', 'name' => 'New School Game: Wizard',     'url' => 'https://food4thoth.com/NewSchoolGameWizard/',    'cat' => 'Games' ],
    [ 'icon' => '🎮', 'name' => 'Old School Game Desktop',     'url' => 'https://food4thoth.com/OldSchoolGameDesktop/',   'cat' => 'Games' ],
    [ 'icon' => '🎮', 'name' => 'Terminal Transition Game',    'url' => 'https://food4thoth.com/TerminalGameTransition/', 'cat' => 'Games' ],
    [ 'icon' => '🎮', 'name' => 'Bergs of Life',               'url' => 'https://food4thoth.com/bergs-of-life/',          'cat' => 'Games' ],
    [ 'icon' => '🎮', 'name' => 'Claw Machine OG',             'url' => 'https://food4thoth.com/claw-machine/',           'cat' => 'Games' ],
    [ 'icon' => '🎮', 'name' => 'Choose Your Own Adventure',   'url' => 'https://food4thoth.com/ChooseYourOwnAdventure/prologue.html', 'cat' => 'Games' ],
    // Fractals & Visuals
    [ 'icon' => '🌀', 'name' => 'Draw w/Fractals',             'url' => 'https://food4thoth.com/DrawingFractals/',        'cat' => 'Visuals' ],
    [ 'icon' => '🌀', 'name' => 'Fractal Trees',               'url' => 'https://food4thoth.com/FractalTrees/',           'cat' => 'Visuals' ],
    [ 'icon' => '🌀', 'name' => 'Rainbow Fractal Generator',   'url' => 'https://food4thoth.com/RainbowFracGenerator/',   'cat' => 'Visuals' ],
    [ 'icon' => '🌀', 'name' => 'WebGL Fluid Simulation',      'url' => 'https://food4thoth.com/webgl-fluid-simulation/', 'cat' => 'Visuals' ],
    [ 'icon' => '🌀', 'name' => 'Psychedelic Waves',           'url' => 'https://food4thoth.com/psychedelic-waves/',      'cat' => 'Visuals' ],
    [ 'icon' => '🌀', 'name' => 'Neuro Noise',                 'url' => 'https://food4thoth.com/neuro-noise/',            'cat' => 'Visuals' ],
    // Esoteric
    [ 'icon' => '📜', 'name' => 'Akashic Records Landing',     'url' => 'https://food4thoth.com/css-only-3d-image-carousel/', 'cat' => 'Esoteric' ],
    [ 'icon' => '📜', 'name' => 'Akashic Emerald Deep',        'url' => 'https://food4thoth.com/AkashicEmeraldDeep/',     'cat' => 'Esoteric' ],
    [ 'icon' => '📜', 'name' => 'Akashic Thoth Deep',          'url' => 'https://food4thoth.com/AkashicThothDeep/',       'cat' => 'Esoteric' ],
    [ 'icon' => '📜', 'name' => 'Hakim Bey Anarchy Page',      'url' => 'https://food4thoth.com/HakimBey/',               'cat' => 'Esoteric' ],
    [ 'icon' => '📜', 'name' => 'Anarchy TAZ',                 'url' => 'https://food4thoth.com/AnarchyTAZ/',             'cat' => 'Esoteric' ],
    // Community
    [ 'icon' => '🌱', 'name' => 'Community Garden Lists',      'url' => 'https://food4thoth.com/CommunityGardensLists/',  'cat' => 'Community' ],
    [ 'icon' => '🌱', 'name' => 'Black Business Directory',    'url' => 'https://food4thoth.com/BlackBuisnessEugene/',    'cat' => 'Community' ],
    [ 'icon' => '🌱', 'name' => 'Eugene Garden Map',           'url' => 'https://food4thoth.com/CommunityGardensMaps/indexEugeneMap.html', 'cat' => 'Community' ],
    // Tools
    [ 'icon' => '🌈', 'name' => 'Glo-Calculato',               'url' => 'https://food4thoth.com/GloCalculato/',           'cat' => 'Tools' ],
    [ 'icon' => '🌈', 'name' => 'Tariff Calculator',           'url' => 'https://food4thoth.com/tariff-calculator/',      'cat' => 'Tools' ],
    [ 'icon' => '🌊', 'name' => 'Tide Walk USA',               'url' => 'https://food4thoth.com/TideApp/',                'cat' => 'Tools' ],
];

$categories = array_unique( array_column( $tools, 'cat' ) );
?>

<main id="main" class="content-area" role="main">

    <section class="content-section">
        <h1><?php the_title(); ?></h1>
        <?php the_content(); ?>
    </section>

    <!-- CATEGORY FILTER TABS -->
    <div style="text-align:center;margin:20px 0;display:flex;flex-wrap:wrap;justify-content:center;gap:8px;">
        <button class="neumorphic-button" style="padding:6px 16px;font-size:0.9rem;" onclick="filterPortfolio('all')">All</button>
        <?php foreach ( $categories as $cat ) : ?>
        <button class="neumorphic-button" style="padding:6px 16px;font-size:0.9rem;" onclick="filterPortfolio('<?php echo esc_js( $cat ); ?>')"><?php echo esc_html( $cat ); ?></button>
        <?php endforeach; ?>
    </div>

    <!-- PORTFOLIO GRID -->
    <div class="portfolio-grid" id="portfolio-grid">
        <?php foreach ( $tools as $tool ) : ?>
        <div class="portfolio-item" data-cat="<?php echo esc_attr( $tool['cat'] ); ?>">
            <div style="font-size:2rem;margin-bottom:8px;"><?php echo $tool['icon']; ?></div>
            <h3><?php echo esc_html( $tool['name'] ); ?></h3>
            <span style="font-size:0.75rem;color:#00ff99;background:rgba(0,255,153,0.1);padding:2px 8px;border-radius:20px;"><?php echo esc_html( $tool['cat'] ); ?></span>
            <br>
            <a href="<?php echo esc_url( $tool['url'] ); ?>" target="_blank" rel="noopener" class="visit-btn">Open Tool →</a>
        </div>
        <?php endforeach; ?>
    </div>

</main>

<script>
function filterPortfolio(cat) {
    document.querySelectorAll('#portfolio-grid .portfolio-item').forEach(function(el) {
        el.style.display = (cat === 'all' || el.dataset.cat === cat) ? '' : 'none';
    });
}
</script>

<?php get_footer(); ?>
