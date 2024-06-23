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


// function circleMouseFollower() {
//     const minicircle = document.querySelector("#minicircle");

//     window.addEventListener("mousemove", function (dets) {
//         const offsetX = minicircle.offsetWidth / 2;
//         const offsetY = minicircle.offsetHeight / 2;
//         minicircle.style.transform = `translate(${dets.clientX - offsetX}px, ${dets.clientY - offsetY}px)`;
//     });
// }

// circleMouseFollower();
function circleMouseFollower() {
    const minicircle = document.querySelector("#minicircle");

    window.addEventListener("mousemove", function (dets) {
        const offsetX = minicircle.offsetWidth / 2;
        const offsetY = minicircle.offsetHeight / 2;
        const newLeft = dets.clientX - offsetX;
        const newTop = dets.clientY - offsetY;
        console.log(`Left: ${newLeft}, Top: ${newTop}`); // Debugging line
        minicircle.style.left = `${newLeft}px`;
        minicircle.style.top = `${newTop}px`;
    });
}

circleMouseFollower();