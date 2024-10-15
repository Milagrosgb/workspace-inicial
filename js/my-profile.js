document.addEventListener("DOMContentLoaded", function() {
    // Obtener el email del usuario desde el almacenamiento local
    const userEmail = localStorage.getItem("userEmail");
    if (userEmail) {
        document.getElementById("email").value = userEmail;
    }

    // Manejar el evento de envío del formulario
    document.getElementById("profile-form").addEventListener("submit", function(event) {
        event.preventDefault(); // Prevenir el envío del formulario

        // Validar campos obligatorios
        const firstName = document.getElementById("first-name").value.trim();
        const lastName = document.getElementById("last-name").value.trim();
        if (!firstName || !lastName) {
            alert("Por favor, completa todos los campos obligatorios.");
            return;
        }

        // Guardar datos en el almacenamiento local
        const profileData = {
            firstName,
            secondName: document.getElementById("second-name").value.trim(),
            lastName,
            secondLastName: document.getElementById("second-last-name").value.trim(),
            email: userEmail,
            phone: document.getElementById("phone").value.trim(),
            mode: document.getElementById("mode-switch").checked
        };

        localStorage.setItem("profileData", JSON.stringify(profileData));
        alert("Cambios guardados con éxito.");
    });
});
