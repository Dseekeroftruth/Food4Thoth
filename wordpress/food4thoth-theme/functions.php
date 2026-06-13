<?php
/**
 * Food4Thoth WordPress Theme Functions
 * Ports the full Food4Thoth static site experience to WordPress.
 */

if ( ! defined( 'ABSPATH' ) ) exit;

/* =============================================
   THEME SETUP
   ============================================= */
function f4t_theme_setup() {
    load_theme_textdomain( 'food4thoth', get_template_directory() . '/languages' );

    add_theme_support( 'title-tag' );
    add_theme_support( 'post-thumbnails' );
    add_theme_support( 'html5', [ 'search-form','comment-form','comment-list','gallery','caption','style','script' ] );
    add_theme_support( 'custom-logo', [
        'height'      => 100,
        'width'       => 300,
        'flex-height' => true,
        'flex-width'  => true,
    ] );
    add_theme_support( 'automatic-feed-links' );
    add_theme_support( 'customize-selective-refresh-widgets' );

    register_nav_menus( [
        'primary'   => __( 'Primary Navigation', 'food4thoth' ),
        'footer'    => __( 'Footer Links', 'food4thoth' ),
    ] );
}
add_action( 'after_setup_theme', 'f4t_theme_setup' );

/* =============================================
   ENQUEUE STYLES & SCRIPTS
   ============================================= */
function f4t_enqueue_assets() {
    // Main theme stylesheet
    wp_enqueue_style( 'f4t-style', get_stylesheet_uri(), [], '1.1.0' );

    // Navigation JS
    wp_enqueue_script(
        'f4t-navigation',
        get_template_directory_uri() . '/assets/js/navigation.js',
        [],
        '1.1.0',
        true
    );

    // Pass AJAX url and nonce to JS
    wp_localize_script( 'f4t-navigation', 'f4tData', [
        'ajaxUrl' => admin_url( 'admin-ajax.php' ),
        'nonce'   => wp_create_nonce( 'f4t_nonce' ),
        'siteUrl' => get_site_url(),
        'baseToolUrl' => 'https://www.food4thoth.com/',
    ] );
}
add_action( 'wp_enqueue_scripts', 'f4t_enqueue_assets' );

/* =============================================
   CUSTOM POST TYPE: TOOL
   ============================================= */
function f4t_register_post_types() {
    register_post_type( 'f4t_tool', [
        'labels' => [
            'name'               => __( 'Tools',            'food4thoth' ),
            'singular_name'      => __( 'Tool',             'food4thoth' ),
            'add_new'            => __( 'Add New Tool',     'food4thoth' ),
            'add_new_item'       => __( 'Add New Tool',     'food4thoth' ),
            'edit_item'          => __( 'Edit Tool',        'food4thoth' ),
            'new_item'           => __( 'New Tool',         'food4thoth' ),
            'view_item'          => __( 'View Tool',        'food4thoth' ),
            'search_items'       => __( 'Search Tools',     'food4thoth' ),
            'not_found'          => __( 'No tools found',   'food4thoth' ),
            'not_found_in_trash' => __( 'No tools in trash','food4thoth' ),
        ],
        'public'       => true,
        'has_archive'  => 'tools',
        'rewrite'      => [ 'slug' => 'tools' ],
        'menu_icon'    => 'dashicons-admin-tools',
        'supports'     => [ 'title', 'editor', 'thumbnail', 'excerpt', 'custom-fields' ],
        'show_in_rest' => true,
    ] );
}
add_action( 'init', 'f4t_register_post_types' );

/* =============================================
   CUSTOM TAXONOMY: TOOL CATEGORY
   ============================================= */
function f4t_register_taxonomies() {
    register_taxonomy( 'tool_category', 'f4t_tool', [
        'labels' => [
            'name'              => __( 'Tool Categories', 'food4thoth' ),
            'singular_name'     => __( 'Tool Category',  'food4thoth' ),
            'search_items'      => __( 'Search Categories', 'food4thoth' ),
            'all_items'         => __( 'All Categories',    'food4thoth' ),
            'parent_item'       => __( 'Parent Category',   'food4thoth' ),
            'parent_item_colon' => __( 'Parent Category:',  'food4thoth' ),
            'edit_item'         => __( 'Edit Category',     'food4thoth' ),
            'update_item'       => __( 'Update Category',   'food4thoth' ),
            'add_new_item'      => __( 'Add New Category',  'food4thoth' ),
            'new_item_name'     => __( 'New Category Name', 'food4thoth' ),
            'menu_name'         => __( 'Categories',        'food4thoth' ),
        ],
        'hierarchical' => true,
        'public'       => true,
        'rewrite'      => [ 'slug' => 'tool-category' ],
        'show_in_rest' => true,
    ] );
}
add_action( 'init', 'f4t_register_taxonomies' );

/* =============================================
   META BOXES: TOOL IFRAME URL
   ============================================= */
function f4t_add_meta_boxes() {
    add_meta_box(
        'f4t_tool_url',
        __( 'Tool Settings', 'food4thoth' ),
        'f4t_tool_meta_box_html',
        [ 'f4t_tool', 'page' ],
        'normal',
        'high'
    );
}
add_action( 'add_meta_boxes', 'f4t_add_meta_boxes' );

function f4t_tool_meta_box_html( $post ) {
    wp_nonce_field( 'f4t_save_tool_meta', 'f4t_tool_nonce' );
    $iframe_url   = get_post_meta( $post->ID, '_f4t_iframe_url',   true );
    $tool_height  = get_post_meta( $post->ID, '_f4t_tool_height',  true ) ?: '85vh';
    $open_new_tab = get_post_meta( $post->ID, '_f4t_open_new_tab', true );
    ?>
    <table class="form-table">
        <tr>
            <th><label for="f4t_iframe_url"><?php _e( 'Tool URL (food4thoth.com path)', 'food4thoth' ); ?></label></th>
            <td>
                <input type="url" id="f4t_iframe_url" name="f4t_iframe_url"
                       value="<?php echo esc_attr( $iframe_url ); ?>"
                       class="regular-text"
                       placeholder="https://www.food4thoth.com/TarotLanding/" />
                <p class="description"><?php _e( 'Full URL of the tool on food4thoth.com to embed via iframe.', 'food4thoth' ); ?></p>
            </td>
        </tr>
        <tr>
            <th><label for="f4t_tool_height"><?php _e( 'iframe Height', 'food4thoth' ); ?></label></th>
            <td>
                <input type="text" id="f4t_tool_height" name="f4t_tool_height"
                       value="<?php echo esc_attr( $tool_height ); ?>"
                       class="small-text" placeholder="85vh" />
                <p class="description"><?php _e( 'e.g. 85vh, 600px, 100%', 'food4thoth' ); ?></p>
            </td>
        </tr>
        <tr>
            <th><?php _e( 'Also link externally?', 'food4thoth' ); ?></th>
            <td>
                <label>
                    <input type="checkbox" name="f4t_open_new_tab" value="1" <?php checked( $open_new_tab, '1' ); ?> />
                    <?php _e( 'Show "Open in full screen" button', 'food4thoth' ); ?>
                </label>
            </td>
        </tr>
    </table>
    <?php
}

function f4t_save_tool_meta( $post_id ) {
    if ( ! isset( $_POST['f4t_tool_nonce'] ) ) return;
    if ( ! wp_verify_nonce( $_POST['f4t_tool_nonce'], 'f4t_save_tool_meta' ) ) return;
    if ( defined( 'DOING_AUTOSAVE' ) && DOING_AUTOSAVE ) return;
    if ( ! current_user_can( 'edit_post', $post_id ) ) return;

    if ( isset( $_POST['f4t_iframe_url'] ) ) {
        update_post_meta( $post_id, '_f4t_iframe_url', esc_url_raw( $_POST['f4t_iframe_url'] ) );
    }
    if ( isset( $_POST['f4t_tool_height'] ) ) {
        update_post_meta( $post_id, '_f4t_tool_height', sanitize_text_field( $_POST['f4t_tool_height'] ) );
    }
    update_post_meta( $post_id, '_f4t_open_new_tab', isset( $_POST['f4t_open_new_tab'] ) ? '1' : '0' );
}
add_action( 'save_post', 'f4t_save_tool_meta' );

/* =============================================
   PAGE TEMPLATE: TOOL EMBED
   Register page-templates folder templates
   ============================================= */
function f4t_register_page_templates( $templates ) {
    $templates['page-templates/page-tool-embed.php'] = __( 'Tool Embed (iframe)', 'food4thoth' );
    $templates['page-templates/page-portfolio.php']  = __( 'Portfolio Hub',       'food4thoth' );
    $templates['page-templates/page-contact.php']    = __( 'Contact Page',        'food4thoth' );
    $templates['page-templates/page-hub.php']        = __( 'Category Hub',        'food4thoth' );
    return $templates;
}
add_filter( 'theme_page_templates', 'f4t_register_page_templates' );

/* =============================================
   WIDGET AREAS
   ============================================= */
function f4t_register_sidebars() {
    register_sidebar( [
        'name'          => __( 'Blog Sidebar', 'food4thoth' ),
        'id'            => 'sidebar-blog',
        'description'   => __( 'Widgets in the blog sidebar.', 'food4thoth' ),
        'before_widget' => '<div class="widget %2$s">',
        'after_widget'  => '</div>',
        'before_title'  => '<h3 class="widget-title">',
        'after_title'   => '</h3>',
    ] );
    register_sidebar( [
        'name'          => __( 'Footer Widgets', 'food4thoth' ),
        'id'            => 'footer-widgets',
        'description'   => __( 'Widgets in the site footer.', 'food4thoth' ),
        'before_widget' => '<div class="footer-widget %2$s">',
        'after_widget'  => '</div>',
        'before_title'  => '<h4 class="footer-widget-title">',
        'after_title'   => '</h4>',
    ] );
}
add_action( 'widgets_init', 'f4t_register_sidebars' );

/* =============================================
   EXCERPT LENGTH
   ============================================= */
add_filter( 'excerpt_length', fn() => 30 );
add_filter( 'excerpt_more',   fn() => '…' );

/* =============================================
   CUSTOM LOGIN PAGE STYLES
   ============================================= */
function f4t_login_styles() {
    echo '<style>
        body.login { background: linear-gradient(to bottom, #2e3b4e, #16222a); }
        .login h1 a { background-image: none; width: auto; }
        #login_error, .message { border-left-color: #00ff99; }
        .wp-core-ui .button-primary { background: #00ff99; border-color: #00cc77; color: #000; }
    </style>';
}
add_action( 'login_enqueue_scripts', 'f4t_login_styles' );

/* =============================================
   HELPER: TOOL IFRAME URL
   ============================================= */
function f4t_get_iframe_url( $post_id = null ) {
    if ( ! $post_id ) $post_id = get_the_ID();
    return get_post_meta( $post_id, '_f4t_iframe_url', true );
}

function f4t_get_tool_height( $post_id = null ) {
    if ( ! $post_id ) $post_id = get_the_ID();
    $h = get_post_meta( $post_id, '_f4t_tool_height', true );
    return $h ?: '85vh';
}

/* =============================================
   SHORTCODE: [f4t_tool url="..." height="..."]
   Lets editors embed any food4thoth tool via shortcode
   ============================================= */
function f4t_tool_shortcode( $atts ) {
    $atts = shortcode_atts( [
        'url'    => '',
        'height' => '85vh',
        'title'  => 'Food4Thoth Tool',
    ], $atts, 'f4t_tool' );

    if ( empty( $atts['url'] ) ) return '<p>' . __( 'No URL provided.', 'food4thoth' ) . '</p>';

    $url    = esc_url( $atts['url'] );
    $height = esc_attr( $atts['height'] );
    $title  = esc_attr( $atts['title'] );

    return sprintf(
        '<div class="tool-iframe-wrapper"><iframe src="%s" style="height:%s;" title="%s" loading="lazy" allowfullscreen></iframe></div>',
        $url, $height, $title
    );
}
add_shortcode( 'f4t_tool', 'f4t_tool_shortcode' );

/* =============================================
   SHORTCODE: [f4t_category_hub]
   Auto-generates grid of child pages / tools
   ============================================= */
function f4t_category_hub_shortcode( $atts ) {
    $atts = shortcode_atts( [ 'parent' => get_the_ID() ], $atts );

    $children = get_pages( [
        'parent'      => intval( $atts['parent'] ),
        'post_status' => 'publish',
        'sort_column' => 'menu_order',
        'sort_order'  => 'ASC',
    ] );

    if ( empty( $children ) ) return '<p>' . __( 'No tools found.', 'food4thoth' ) . '</p>';

    $out = '<div class="category-hub">';
    foreach ( $children as $child ) {
        $url  = get_permalink( $child->ID );
        $desc = get_post_meta( $child->ID, '_f4t_short_desc', true ) ?: wp_trim_words( $child->post_content, 15 );
        $out .= sprintf(
            '<a href="%s" class="category-card"><div class="card-icon">✦</div><h3>%s</h3><p>%s</p></a>',
            esc_url( $url ),
            esc_html( $child->post_title ),
            esc_html( $desc )
        );
    }
    $out .= '</div>';
    return $out;
}
add_shortcode( 'f4t_category_hub', 'f4t_category_hub_shortcode' );

/* =============================================
   SECURITY: REMOVE WP VERSION
   ============================================= */
remove_action( 'wp_head', 'wp_generator' );

/* =============================================
   CONTENT WIDTH
   ============================================= */
if ( ! isset( $content_width ) ) $content_width = 1200;
