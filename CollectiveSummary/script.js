
			
    const navToggle = document.getElementById('navToggle');
    const navigation = document.getElementById('navigation');
    const navLinks = navigation.querySelectorAll('a');
    const headerHeight = document.querySelector('header').offsetHeight; // Get header height

		// Scroll to the top of the page
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth' // Smooth scrolling effect
    });
}

// Scroll to the bottom of the page
function scrollToBottom() {
    window.scrollTo({
        top: document.body.scrollHeight, // Scroll to the full height of the page
        behavior: 'smooth' // Smooth scrolling effect
    });
}
		
    // Toggle the navigation menu on button click
    navToggle.addEventListener('click', () => {
        navigation.classList.toggle('open');
    });

    // Close navigation and scroll to the selected section with an offset
    navLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault(); // Prevent default anchor behavior
            const targetId = link.getAttribute('href').substring(1); // Get target section ID
            const targetSection = document.getElementById(targetId); // Find the section element

            // Calculate offset position to account for header height
            const targetPosition = targetSection.offsetTop - headerHeight + 950; // Add extra padding if needed (20px here)

            // Scroll to the position with smooth behavior
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });

            // Close the navigation menu
            navigation.classList.remove('open');
        });
    });