<?php get_header(); ?>

<main id="main" class="content-area" role="main">
    <?php while ( have_posts() ) : the_post(); ?>

    <article id="post-<?php the_ID(); ?>" <?php post_class( 'single-post-content' ); ?>>
        <h1><?php the_title(); ?></h1>
        <p class="post-meta" style="text-align:center;color:#aaa;font-size:0.9rem;">
            <?php echo get_the_date(); ?> &mdash; <?php the_author(); ?>
            <?php if ( has_category() ) : ?> &mdash; <?php the_category( ', ' ); ?><?php endif; ?>
        </p>

        <?php if ( has_post_thumbnail() ) : ?>
        <div style="text-align:center;margin:20px 0;">
            <?php the_post_thumbnail( 'large', [ 'style' => 'max-width:100%;border-radius:10px;' ] ); ?>
        </div>
        <?php endif; ?>

        <div class="entry-content">
            <?php the_content(); ?>
        </div>

        <?php if ( has_tag() ) : ?>
        <div style="margin-top:20px;text-align:center;">
            <strong style="color:#00ff99;">Tags:</strong> <?php the_tags( '', ', ' ); ?>
        </div>
        <?php endif; ?>
    </article>

    <nav class="post-navigation" aria-label="Post navigation">
        <?php
        previous_post_link( '<span class="nav-previous">← %link</span>' );
        next_post_link( '<span class="nav-next">%link →</span>' );
        ?>
    </nav>

    <?php
    if ( comments_open() || get_comments_number() ) {
        comments_template();
    }
    endwhile;
    ?>
</main>

<?php get_footer(); ?>
