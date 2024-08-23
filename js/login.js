function showError(input) {
    const inputBox = input.closest('.input-box');
    inputBox.classList.add('error'); // agrego la clase eror al contenedor
    document.getElementById("error").style.display = "block";
}

function hideError(input) {
    const inputBox = input.closest('.input-box');
    inputBox.classList.remove('error'); // remuevo la clase error del contenedor
}

let inputArray = document.querySelectorAll("input");
const signBtn = document.getElementById("signBtn");

// Valida que los inputs no estén vacíos y que tengan más de 2 caracteres
function inputValidation() {
    let isValid = true;

    inputArray.forEach(input => {
        if (input.value === "" || input.value.length < 3) {
            showError(input); // muestra el error si el campo no es valido
            isValid = false;
        } else {
            hideError(input); // oculta si el campo es valido
        }
    });

    return isValid;
}

// al apretar ingresar, te lleva a la página principal si es válido
signBtn.addEventListener("click", function () {
    if (inputValidation()) {
        // Session storage
        let token = password.value;
        let userName = user.value;
        console.log(token, userName);
        loginUser(userName, token);
        // Redirige a la página principal
        window.location.href = "index.html";
    }
});

// oobtengo el input contraseña y usuario
let password = document.getElementById("password-input");
let user = document.getElementById("user-input");

// evento que me muestra u oculta contraseña
document.getElementById("password-icon").addEventListener("click", function () {
    if (password.type == "password") {
        password.type = "text";
    } else {
        password.type = "password";
    }
});

// función que crea un objeto con los datos de log-in usuario y lo guarda en el session storage
function loginUser(username, token) {
    const userSession = {
        username: username,
        token: token,
        loggedIn: true
    };

    // usamos localStorage para guardar los datos de la sesión del usuario
    localStorage.setItem('userSession', JSON.stringify(userSession));
    console.log('Log in correcto y sesión guardada.');
}

//prueba