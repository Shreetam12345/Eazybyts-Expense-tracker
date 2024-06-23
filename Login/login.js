document.addEventListener('DOMContentLoaded', (event) => {
    console.log('DOM fully loaded and parsed'); // Debugging: Ensure this is logged

    const passwordInput = document.getElementById('password');
    const togglePassword = document.getElementById('togglePassword');

    console.log('passwordInput:', passwordInput); // Debugging: should log the input element or null
    console.log('togglePassword:', togglePassword); // Debugging: should log the icon element or null

    if (!passwordInput || !togglePassword) {
        console.error('Required elements not found');
        return;
    }

    togglePassword.addEventListener('click', function () {
        console.log('Toggle password clicked'); // Debugging: check if click event is detected

        // Toggle the type attribute
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);

        // Animate the eye / eye-slash icon using GSAP
        gsap.to(togglePassword, {rotation: 180, duration: 0.5});

        // Toggle the eye / eye-slash icon
        this.classList.toggle('fa-eye');
        this.classList.toggle('fa-eye-slash');
    });
});

function circleMouseFollower() {
    const minicircle = document.querySelector("#minicircle");
    const loginContainer = document.querySelector("#login-container");

    // Function to follow the mouse
    function followMouse(dets) {
        const offsetX = minicircle.offsetWidth / 2;
        const offsetY = minicircle.offsetHeight / 2;
        minicircle.style.left = `${dets.clientX - offsetX}px`;
        minicircle.style.top = `${dets.clientY - offsetY}px`;
    }

    // Add mousemove listener to follow the mouse
    window.addEventListener("mousemove", followMouse);
}

// Initialize the circle mouse follower
circleMouseFollower();