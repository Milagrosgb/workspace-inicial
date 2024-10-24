document.addEventListener("DOMContentLoaded", function() {
    const darkModeToggle = document.querySelector(".dark-mode");
    if (darkModeToggle) {
        const body = document.body;

        // Verificar si el modo oscuro estaba habilitado antes
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
    } else {
        console.error("No se encontró el elemento con la clase 'dark-mode'");
    }
});
