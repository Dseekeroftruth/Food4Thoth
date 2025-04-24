// nav-fetch.js
document.addEventListener("DOMContentLoaded", () => {
  const navContainer = document.getElementById("nav-container");
  if (!navContainer) return;

  fetch("./navigation1.html")
    .then(response => response.text())
    .then(html => {
      // Insert the navigation HTML
      navContainer.innerHTML = html;

      // Dispatch a custom event so other scripts know the nav is ready
      document.dispatchEvent(new CustomEvent("navLoaded"));
    })
    .catch(error => {
      console.error("Error loading navigation:", error);
    });
});