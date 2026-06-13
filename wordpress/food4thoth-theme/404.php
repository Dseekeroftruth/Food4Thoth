<?php get_header(); ?>

<main id="main" class="content-area" role="main">
    <section class="error-404">
        <h1>404</h1>
        <h2><?php esc_html_e( 'Page Not Found', 'food4thoth' ); ?></h2>
        <p><?php esc_html_e( 'The page you seek may have wandered into the Akashic Records. Try a different path.', 'food4thoth' ); ?></p>
        <div class="button-container">
            <a href="<?php echo esc_url( home_url( '/' ) ); ?>" class="neumorphic-button">← Return Home</a>
        </div>
        <div style="max-width:500px;margin:30px auto;">
            <?php get_search_form(); ?>
        </div>
    </section>
</main>

<?php get_footer(); ?>
