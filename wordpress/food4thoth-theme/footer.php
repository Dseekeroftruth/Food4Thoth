    <!-- ===== SITE FOOTER ===== -->
    <footer class="site-footer" role="contentinfo">
        <div class="footer-inner">

            <?php if ( is_active_sidebar( 'footer-widgets' ) ) : ?>
            <div class="footer-widgets">
                <?php dynamic_sidebar( 'footer-widgets' ); ?>
            </div>
            <?php endif; ?>

            <div class="footer-links">
                <?php
                wp_nav_menu( [
                    'theme_location' => 'footer',
                    'menu_class'     => 'footer-nav',
                    'fallback_cb'    => false,
                    'depth'          => 1,
                ] );
                ?>
            </div>

            <p>
                &copy; <?php echo date( 'Y' ); ?>
                <a href="<?php echo esc_url( home_url( '/' ) ); ?>"><?php bloginfo( 'name' ); ?></a>
                &mdash; Created by DeJahn / Artabillies.
                Interactive tools powered by <a href="https://food4thoth.com" target="_blank">food4thoth.com</a>.
            </p>

            <p style="font-size:0.8rem;margin-top:8px;">
                <a href="<?php echo esc_url( home_url( '/contact/' ) ); ?>">Contact</a>
                &nbsp;|&nbsp;
                <a href="<?php echo esc_url( home_url( '/portfolio/' ) ); ?>">Portfolio</a>
                &nbsp;|&nbsp;
                <a href="<?php echo esc_url( home_url( '/blog/' ) ); ?>">Blog</a>
                &nbsp;|&nbsp;
                <a href="mailto:food4thoth@proton.me">food4thoth@proton.me</a>
            </p>

        </div>
    </footer>

</div><!-- .site-wrapper -->

<?php wp_footer(); ?>

</body>
</html>
