// Corroboramos si hay una sesión guardada del usuario, es decir, si está loggeado:

function checkLoginStatus() {
    //Obtenemos los datos guardados de la sesión
    const userSession = JSON.parse(localStorage.getItem('userSession'));

    //Corroboramos si existe una sesión guardada, y si el usuario inició sesión:
    if (userSession && userSession.loggedIn) {
        console.log(`Bienvenido/a, ${userSession.username}`);

        // Si no está loggeado, es redirigido a login-html
    } else {
        window.location.href= "login.html"
        console.log('El usuario no tiene una sesión iniciada. Redirigir al log-in');
    }
}

checkLoginStatus();

// Esta sería la parte de cerrar sesión, queda comentada para usar a futuro:

// function logoutUser() {
//     localStorage.removeItem('userSession');
//     console.log('El usuario cerró sesión y se eliminó la información de la sesión.');
// }

// logoutUser();