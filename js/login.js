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
        window.location.href= "index.html"
    } else {
        showError();
    }
});

//obtengo el input contraseña
let password =  document.getElementById("password-input");

//evento que me muestra u oculta contraseña
document.getElementById("password-icon").addEventListener("click", function(){
    if(password.type == "password"){
        password.type = "text"
    } else {
        password.type = "password"
    }
   
})

