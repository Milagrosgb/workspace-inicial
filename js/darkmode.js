const darkModeToggle = document.querySelector(".dark-mode");
const body = document.body;


if (localStorage.getItem('darkMode') === 'enabled') {
    body.classList.add('active');
}

darkModeToggle.addEventListener("click", () => {
    console.log("Dark mode toggled"); 
    body.classList.toggle("active");

    // Guardar el estado en localStorage
    if (body.classList.contains('active')) {
        localStorage.setItem('darkMode', 'enabled');
    } else {
        localStorage.setItem('darkMode', 'disabled');
    }
});
