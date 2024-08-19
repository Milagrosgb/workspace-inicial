function showError(){
    document.getElementById("error").style.display="block";
}



let inputArray = document.querySelectorAll("input");
const signBtn = document.getElementById("signBtn");

//valida que los inputs no esten vacios y que tengan mas de 2 caracteres
function inputValidation(){
    let count = 0;
    for(input of inputArray){
        if(input.value=="" || input.value.length<3){
            count++
        }
    }
    return count ==0;
}

//al apretar ingresar te lleva a la pagina principal(si es valido)
signBtn.addEventListener("click", function(){
    if(inputValidation()){
        // session storage
        let token = password.value;
        let userName = user.value;
        console.log(token, userName);
        loginUser(userName, token)
        // session storage
        window.location.href= "index.html"
    } else {
        showError();
    }
});

//obtengo el input contraseña
let password =  document.getElementById("password-input");
let user =  document.getElementById("user-input");

//evento que me muestra u oculta contraseña
document.getElementById("password-icon").addEventListener("click", function(){
    if(password.type == "password"){
        password.type = "text"
    } else {
        password.type = "password"
    }
   
})


// Session storage (guardado de la sesión):

// función que crea un objeto con los datos de log-in usuario
function loginUser(username, token) {
    const userSession = {
        username: username,
        token: token,
        loggedIn: true
    };

    // Usamos sessionStorage para guardar los datos de la sesión del usuario:
    localStorage.setItem('userSession', JSON.stringify(userSession));
    console.log('Log in correcto y sesión guardada.');
}
