function copyToClipboard(text) {
  navigator.clipboard.writeText(text).then(
    function () {
      alert('Address copied to clipboard');
    },
    function (err) {
      alert('Could not copy text: ' + err);
    }
  );
}

document.addEventListener('DOMContentLoaded', () => {
  const toggleButton = document.getElementById('toggle-nav');
  const navigation = document.getElementById('navigation');
  const navLinks = document.querySelectorAll('.neumorphic-tab');

  if (!toggleButton || !navigation) {
    console.warn('Missing navigation or toggle button in DOM');
    return;
  }

  toggleButton.addEventListener('click', (event) => {
    event.stopPropagation();
    const isHidden = navigation.classList.toggle('hidden');
    toggleButton.textContent = isHidden ? '☰ Nav' : '✖ Close';
  });

  navLinks.forEach((link) => {
    link.addEventListener('click', (event) => {
      const submenuId = link.getAttribute('data-expand');
      if (submenuId) {
        event.preventDefault();
        const submenu = document.getElementById(submenuId);
        submenu?.classList.toggle('hidden');
      } else {
        navigation.classList.add('hidden');
        toggleButton.textContent = '☰ Nav';
      }
    });
  });

  document.addEventListener('click', (event) => {
    if (
      event.target instanceof Element &&
      !navigation.contains(event.target) &&
      !toggleButton.contains(event.target)
    ) {
      if (!navigation.classList.contains('hidden')) {
        navigation.classList.add('hidden');
        toggleButton.textContent = '☰ Nav';
      }
    }
  });
});
