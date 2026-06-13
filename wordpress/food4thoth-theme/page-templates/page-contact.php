<?php
/**
 * Template Name: Contact Page
 * Template Post Type: page
 */
get_header();

// Simple contact form handler
$sent    = false;
$error   = '';
if ( $_SERVER['REQUEST_METHOD'] === 'POST' && isset( $_POST['f4t_contact_nonce'] ) ) {
    if ( wp_verify_nonce( sanitize_text_field( $_POST['f4t_contact_nonce'] ), 'f4t_contact_form' ) ) {
        $name    = sanitize_text_field( $_POST['contact_name']    ?? '' );
        $email   = sanitize_email(      $_POST['contact_email']   ?? '' );
        $subject = sanitize_text_field( $_POST['contact_subject'] ?? '' );
        $message = sanitize_textarea_field( $_POST['contact_message'] ?? '' );

        if ( ! $name || ! $email || ! $message ) {
            $error = 'Please fill in all required fields.';
        } elseif ( ! is_email( $email ) ) {
            $error = 'Please enter a valid email address.';
        } else {
            $to      = get_option( 'admin_email' );
            $headers = [ "Reply-To: $name <$email>", 'Content-Type: text/plain; charset=UTF-8' ];
            $body    = "From: $name ($email)\n\nSubject: $subject\n\n$message";
            wp_mail( $to, '[Food4Thoth Contact] ' . $subject, $body, $headers );
            $sent = true;
        }
    }
}
?>

<main id="main" class="content-area" role="main">

    <section class="content-section">
        <h1><?php the_title(); ?></h1>
        <p>Reach out anytime — we'd love to hear from you.</p>
    </section>

    <div class="content-section">
        <!-- DIRECT LINKS -->
        <h2>Connect With Us</h2>
        <div class="donation-grid" style="max-width:800px;">
            <div class="donation-btn">
                <a href="mailto:food4thoth@proton.me">food4thoth@proton.me</a>
            </div>
            <div class="donation-btn">
                <a href="https://www.instagram.com/emerald_path_food4th0th/" target="_blank">Instagram</a>
            </div>
            <div class="donation-btn">
                <a href="https://www.facebook.com/share/W8VnfAM2NHBAMTUb/" target="_blank">Facebook</a>
            </div>
            <div class="donation-btn">
                <a href="https://www.artabillies.com/contact-us" target="_blank">Artabillies Contact</a>
            </div>
        </div>
    </div>

    <!-- CONTACT FORM -->
    <div class="content-section">
        <h2>Send a Message</h2>

        <?php if ( $sent ) : ?>
        <p style="color:#00ff99;font-weight:bold;text-align:center;font-size:1.1rem;">
            ✓ Message sent! We'll get back to you soon.
        </p>
        <?php elseif ( $error ) : ?>
        <p style="color:#ff4545;text-align:center;"><?php echo esc_html( $error ); ?></p>
        <?php endif; ?>

        <?php if ( ! $sent ) : ?>
        <div class="contact-form-wrapper">
            <form method="post" action="">
                <?php wp_nonce_field( 'f4t_contact_form', 'f4t_contact_nonce' ); ?>

                <label for="contact_name">Name *</label>
                <input type="text" id="contact_name" name="contact_name" required
                       value="<?php echo esc_attr( $_POST['contact_name'] ?? '' ); ?>">

                <label for="contact_email">Email *</label>
                <input type="email" id="contact_email" name="contact_email" required
                       value="<?php echo esc_attr( $_POST['contact_email'] ?? '' ); ?>">

                <label for="contact_subject">Subject</label>
                <input type="text" id="contact_subject" name="contact_subject"
                       value="<?php echo esc_attr( $_POST['contact_subject'] ?? '' ); ?>">

                <label for="contact_message">Message *</label>
                <textarea id="contact_message" name="contact_message" required><?php echo esc_textarea( $_POST['contact_message'] ?? '' ); ?></textarea>

                <button type="submit" class="submit-btn">Send Message ✦</button>
            </form>
        </div>
        <?php endif; ?>
    </div>

    <!-- CONTENT FROM PAGE EDITOR -->
    <?php while ( have_posts() ) : the_post(); ?>
    <?php if ( get_the_content() ) : ?>
    <div class="single-post-content">
        <?php the_content(); ?>
    </div>
    <?php endif; ?>
    <?php endwhile; ?>

</main>

<?php get_footer(); ?>
