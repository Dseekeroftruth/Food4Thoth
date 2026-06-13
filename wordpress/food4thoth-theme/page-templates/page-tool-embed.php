<?php
/**
 * Template Name: Tool Embed (iframe)
 * Template Post Type: page
 *
 * Embeds any food4thoth.com interactive tool via full-screen iframe.
 * Set the "Tool URL" meta field in the page editor to the food4thoth.com URL.
 */
get_header();

while ( have_posts() ) : the_post();
    $iframe_url   = f4t_get_iframe_url();
    $tool_height  = f4t_get_tool_height();
    $show_btn     = get_post_meta( get_the_ID(), '_f4t_open_new_tab', true );
?>

<main id="main" class="content-area" role="main">

    <div class="tool-section">
        <h1><?php the_title(); ?></h1>

        <?php if ( get_the_content() ) : ?>
        <div class="tool-description">
            <?php the_content(); ?>
        </div>
        <?php endif; ?>

        <?php if ( $show_btn && $iframe_url ) : ?>
        <div class="button-container">
            <a href="<?php echo esc_url( $iframe_url ); ?>" target="_blank" rel="noopener" class="neumorphic-button">
                ⬡ Open Full Screen
            </a>
        </div>
        <?php endif; ?>
    </div>

    <?php if ( $iframe_url ) : ?>
    <div class="tool-iframe-wrapper">
        <iframe
            src="<?php echo esc_url( $iframe_url ); ?>"
            style="height:<?php echo esc_attr( $tool_height ); ?>;"
            title="<?php echo esc_attr( get_the_title() ); ?>"
            loading="lazy"
            allowfullscreen
            allow="autoplay; microphone; camera; fullscreen; web-share"
        ></iframe>
    </div>
    <?php else : ?>
    <section class="content-section">
        <p style="text-align:center;color:#ff0095;">
            ⚠️ No tool URL configured. Please set the <strong>Tool URL</strong> in this page's settings panel.
        </p>
        <div class="button-container">
            <a href="https://food4thoth.com" target="_blank" class="neumorphic-button">Visit food4thoth.com</a>
        </div>
    </section>
    <?php endif; ?>

</main>

<?php
endwhile;
get_footer();
?>
