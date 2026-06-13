<?php
/**
 * Template Name: Category Hub
 * Template Post Type: page
 *
 * Auto-generates a card grid of all child pages. Great for top-level
 * category pages like Tarot, Music, Games, etc.
 */
get_header(); ?>

<main id="main" class="content-area" role="main">

    <?php while ( have_posts() ) : the_post(); ?>

    <section class="content-section">
        <h1><?php the_title(); ?></h1>
        <?php if ( get_the_content() ) the_content(); ?>
    </section>

    <?php
    // Child pages of this page
    $children = get_pages( [
        'parent'      => get_the_ID(),
        'post_status' => 'publish',
        'sort_column' => 'menu_order',
        'sort_order'  => 'ASC',
    ] );

    if ( $children ) : ?>
    <div class="category-hub">
        <?php foreach ( $children as $child ) :
            $icon = get_post_meta( $child->ID, '_f4t_icon', true ) ?: '✦';
            $desc = get_post_meta( $child->ID, '_f4t_short_desc', true ) ?: wp_trim_words( $child->post_content, 12 );
        ?>
        <a href="<?php echo esc_url( get_permalink( $child->ID ) ); ?>" class="category-card">
            <div class="card-icon"><?php echo esc_html( $icon ); ?></div>
            <h3><?php echo esc_html( $child->post_title ); ?></h3>
            <?php if ( $desc ) : ?>
            <p><?php echo esc_html( $desc ); ?></p>
            <?php endif; ?>
        </a>
        <?php endforeach; ?>
    </div>

    <?php else : ?>

    <!-- Fallback: direct link list if no child pages -->
    <section class="content-section">
        <p style="text-align:center;color:#aaa;">
            No child pages found. Add sub-pages to this page in WordPress Admin to populate the hub grid.
        </p>
        <div class="button-container">
            <a href="https://food4thoth.com" target="_blank" class="neumorphic-button">Explore food4thoth.com</a>
        </div>
    </section>

    <?php endif; ?>

    <?php endwhile; ?>

</main>

<?php get_footer(); ?>
