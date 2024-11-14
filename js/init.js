const CATEGORIES_URL = "https://japceibal.github.io/emercado-api/cats/cat.json";
const PUBLISH_PRODUCT_URL = "https://japceibal.github.io/emercado-api/sell/publish.json";
const PRODUCTS_URL = "https://japceibal.github.io/emercado-api/cats_products/";
const PRODUCT_INFO_URL = "https://japceibal.github.io/emercado-api/products/";
const PRODUCT_INFO_COMMENTS_URL = "https://japceibal.github.io/emercado-api/products_comments/";
const CART_INFO_URL = "https://japceibal.github.io/emercado-api/user_cart/";
const CART_BUY_URL = "https://japceibal.github.io/emercado-api/cart/buy.json";
const EXT_TYPE = ".json";

document.addEventListener("DOMContentLoaded", cargarMenu)

let showSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "block";
}

let hideSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "none";
}

let getJSONData = function(url){
    let result = {};
    showSpinner();
    return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }else{
        throw Error(response.statusText);
      }
    })
    .then(function(response) {
          result.status = 'ok';
          result.data = response;
          hideSpinner();
          return result;
    })
    .catch(function(error) {
        result.status = 'error';
        result.data = error;
        hideSpinner();
        return result;
    });
}


function cargarMenu(){
  fetch("menu.html")
  .then(response => response.text())
  .then(data => {
      document.getElementById("menu-placeholder").innerHTML = data;
        if (document.getElementById("user-name")) {
          checkLoginStatus();
      }
  })
  .catch(error => console.error("Error al cargar el menú:", error));
}


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
  
      // Desafíate entrega 2, mostrar usuario el parte derecha del navbar
      document.getElementById('user-name').textContent = userSession.username;

}

  