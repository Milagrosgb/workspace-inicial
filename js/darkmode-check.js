document.addEventListener("DOMContentLoaded", function() {
    const body = document.body;

    // Verificar si el modo oscuro está activado en localStorage
    if (localStorage.getItem('darkMode') === 'enabled') {
        body.classList.add('active');
    }
});

