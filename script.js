 function copyToClipboard(text) {
            navigator.clipboard.writeText(text).then(function() {
                alert('Address copied to clipboard');
            }, function(err) {
                alert('Could not copy text: ', err);
            });
        }

        document.addEventListener('DOMContentLoaded', () => {
    const toggleButton = document.getElementById('toggle-nav');
    const navigation = document.getElementById('navigation');
    const navLinks = document.querySelectorAll('.neumorphic-tab');

    // Toggle main navigation visibility
    toggleButton.addEventListener('click', (event) => {
        event.stopPropagation(); // Prevent the click from triggering the document click listener
        const isHidden = navigation.classList.toggle('hidden');
        toggleButton.textContent = isHidden ? '☰ Nav' : '✖ Close';
    });

    // Handle submenu expansion
    navLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            const submenuId = link.getAttribute('data-expand');
            if (submenuId) {
                event.preventDefault(); // Prevent link navigation
                const submenu = document.getElementById(submenuId);
                submenu.classList.toggle('hidden'); // Toggle submenu visibility
            } else {
                navigation.classList.add('hidden'); // Hide navigation if it's a regular link
                toggleButton.textContent = '☰ Nav';
            }
        });
    });

    // Close navigation when clicking outside of it
    document.addEventListener('click', (event) => {
        if (!navigation.contains(event.target) && !toggleButton.contains(event.target)) {
            if (!navigation.classList.contains('hidden')) {
                navigation.classList.add('hidden');
                toggleButton.textContent = '☰ Nav';
            }
        }
    });
});
