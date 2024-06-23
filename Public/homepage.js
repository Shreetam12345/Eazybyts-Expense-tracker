function circleMouseFollower() {
    const minicircle = document.querySelector("#minicircle");

    window.addEventListener("mousemove", function (event) {
        // Calculate the position of the cursor relative to the document
        const mouseX = event.clientX;
        const mouseY = event.clientY;

        // Account for scroll position to get accurate cursor position
        const scrollX = window.scrollX || window.pageXOffset;
        const scrollY = window.scrollY || window.pageYOffset;

        // Set the position of the minicircle to the cursor position including scroll
        minicircle.style.left = `${mouseX + scrollX}px`;
        minicircle.style.top = `${mouseY + scrollY}px`;
    });

    // Optionally, adjust the minicircle's CSS to ensure it appears correctly
    minicircle.style.position = "absolute";
    minicircle.style.transform = "translate(-50%, -50%)"; // Center the circle on the cursor
}

// Call the function to activate the mouse follower
circleMouseFollower();


document.addEventListener("DOMContentLoaded", function () {
    // Header animation
    gsap.from("#header", { opacity: 0, duration: 1, y: -50, ease:"power0.out" });

    // Container animation
    gsap.from("#planpage", { opacity: 0, duration: 1, y: -100,ease: "power0.out",delay:0.5});
});
