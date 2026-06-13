<?php get_header(); ?>

<main id="main" class="content-area" role="main">
    <?php while ( have_posts() ) : the_post(); ?>

    <article id="post-<?php the_ID(); ?>" <?php post_class( 'single-post-content' ); ?>>
        <h1><?php the_title(); ?></h1>
        <?php if ( has_post_thumbnail() ) : ?>
        <div style="text-align:center;margin:20px 0;">
            <?php the_post_thumbnail( 'large', [ 'style' => 'max-width:100%;border-radius:10px;' ] ); ?>
        </div>
        <?php endif; ?>
        <div class="entry-content">
            <?php the_content(); ?>
        </div>
    </article>

    <?php endwhile; ?>
</main>

<?php get_footer(); ?>
