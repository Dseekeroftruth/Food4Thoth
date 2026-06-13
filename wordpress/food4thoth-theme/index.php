<?php get_header(); ?>

<main id="main" class="content-area" role="main">

    <section class="content-section">
        <h1><?php
            if ( is_home() && ! is_front_page() ) {
                single_post_title();
            } elseif ( is_archive() ) {
                the_archive_title();
            } elseif ( is_search() ) {
                printf( esc_html__( 'Search Results for: %s', 'food4thoth' ), '<span>' . esc_html( get_search_query() ) . '</span>' );
            } else {
                bloginfo( 'name' );
            }
        ?></h1>
    </section>

    <?php if ( have_posts() ) : ?>
    <div class="posts-grid">
        <?php while ( have_posts() ) : the_post(); ?>
        <article id="post-<?php the_ID(); ?>" <?php post_class( 'post-card' ); ?>>
            <?php if ( has_post_thumbnail() ) : ?>
            <a href="<?php the_permalink(); ?>">
                <?php the_post_thumbnail( 'medium', [ 'style' => 'width:100%;border-radius:8px;margin-bottom:12px;' ] ); ?>
            </a>
            <?php endif; ?>
            <h2><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h2>
            <p class="post-meta">
                <?php echo get_the_date(); ?> &mdash; <?php the_author(); ?>
                <?php if ( get_the_category_list( ', ' ) ) : ?>
                 &mdash; <?php the_category( ', ' ); ?>
                <?php endif; ?>
            </p>
            <div class="post-excerpt"><?php the_excerpt(); ?></div>
            <a href="<?php the_permalink(); ?>" class="read-more">Read More →</a>
        </article>
        <?php endwhile; ?>
    </div>

    <div style="text-align:center;margin:30px 0;">
        <?php the_posts_pagination( [
            'mid_size'  => 2,
            'prev_text' => '← Previous',
            'next_text' => 'Next →',
        ] ); ?>
    </div>

    <?php else : ?>
    <section class="content-section">
        <h2><?php esc_html_e( 'Nothing Found', 'food4thoth' ); ?></h2>
        <p><?php esc_html_e( 'No posts match your request. Try searching below.', 'food4thoth' ); ?></p>
        <?php get_search_form(); ?>
    </section>
    <?php endif; ?>

</main>

<?php get_footer(); ?>
