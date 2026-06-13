<?php get_header(); ?>

<main id="main" class="content-area" role="main">

    <section class="content-section">
        <?php the_archive_title( '<h1>', '</h1>' ); ?>
        <?php the_archive_description( '<p>', '</p>' ); ?>
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
            <p class="post-meta"><?php echo get_the_date(); ?> &mdash; <?php the_author(); ?></p>
            <div class="post-excerpt"><?php the_excerpt(); ?></div>
            <a href="<?php the_permalink(); ?>" class="read-more">Read More →</a>
        </article>
        <?php endwhile; ?>
    </div>

    <div style="text-align:center;margin:30px 0;">
        <?php the_posts_pagination( [ 'mid_size' => 2, 'prev_text' => '← Previous', 'next_text' => 'Next →' ] ); ?>
    </div>

    <?php else : ?>
    <section class="content-section">
        <h2><?php esc_html_e( 'Nothing Found', 'food4thoth' ); ?></h2>
    </section>
    <?php endif; ?>

</main>

<?php get_footer(); ?>
