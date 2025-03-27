document.addEventListener("DOMContentLoaded", () => {
    const isInIframe = window.self !== window.top; // Detect if inside iframe

    if (isInIframe) {
        document.body.classList.add("iframe-mode"); // Apply iframe-specific styles
    }
});