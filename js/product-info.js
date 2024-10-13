const productID = localStorage.getItem("productID");

document.addEventListener("DOMContentLoaded", (e) => {
    
    const url = PRODUCT_INFO_URL + productID + EXT_TYPE;
    const commentsURL = PRODUCT_INFO_COMMENTS_URL + productID + ".json";//esta es la url base que apunta a la api donde se almacenan los comentario de los productos
    let starCal; //crea variable donde se guardara el numero de estrellas seleccionadas al calificar

    getJSONData(url)
        .then(object => {
            if (object.status === 'ok') {
                let product = object.data;
                showProductDetails(product)
                showRelatedProducts(product)
            }
        });

    getJSONData(commentsURL)//carga comentarios del producto
        .then(Response => {
            if (Response.status === "ok") {
                let calification = Response.data;
                showComments(calification);//muestra los comentarios
                console.log("Comentarios cargados correctamente");    
            }
            showComments(commentsStorage);
        });
});


function showComments(comments) {
    const commentsContainer = document.getElementById('comments-container');
    // commentsContainer.innerHTML = ""; // Limpia el contenedor  

    comments.forEach(comment => {
        const commentHTML = `  
                  <div class="comment" style="display: flex; justify-content: space-between; align-items: center;">  
                <div style="display: flex; align-items: center;">  
                    <div class="user-icon">  
                        <i class="fas fa-user"></i>  
                    </div>  
                    <div>  
                        <strong>${comment.user}</strong>  
                        <div class="text-muted">${new Date(comment.dateTime).toLocaleString()}</div>  
                        <p>${comment.description}</p>  
                    </div>  
                </div>  
                <div class="rating">  
                    <div>${getStars(comment.score)}</div>  
                </div>  
            </div>   
        `;
        commentsContainer.innerHTML += commentHTML;
    });
}

function getStars(score) {
    let starsHTML = "";
    for (let i = 1; i <= 5; i++) {
        if (i <= score) {
            starsHTML += '<span class="fa fa-star checked"></span>'; //llena
        } else {
            starsHTML += '<span class="fa fa-star"></span>'; //vacia
        }
    }
    return starsHTML;
}


function showProductDetails(product) {
    const container = document.getElementById('product-container');

    // Limpia el contenido actual del contenedor
    container.innerHTML = '';

    // Verifica si product.images es una URL válida
    console.log("Image URL:", product.images); // Verifica la URL de la imagen
    console.log(product); // Verifica la estructura del producto




    // Crea el HTML dinámico con la estructura proporcionada
    const html = `
<div class="product-details-container">
    <div class="product-images-container">
        <img class="big-product-image" id="bigImg"  src="${product.images[0]}" alt="${product.name}" />
        <div class="miniaturas-container">
            ${addImage(product.images)}
        </div>
    </div>
    <div class="product-detail-card">
        <div class="product-name">
            <h4 class="product-name-title">${product.name}</h4>
        </div>
        <div class="product-description">
            <div class="description-title">Descripción</div>
            <div class="description-text">${product.description}</div>
        </div>
        <div class="product-category">
            <div class="category-title">Categoría</div>
            <div class="category-text">${product.category}</div>
            <div class="product-quantity">
                <div>
                    <span>Cant.</span>
                    <span>${product.soldCount}</span>
                    <span>artículos</span>
                </div>
            </div>
        </div>
        <div class="product-cost">
            <h4 class="cost-text">$${product.cost}</h4>
        </div>
        <div class="buttons-container">
            <button class="button-text buy-button">Comprar</button>
            <button class="button-text add-to-cart-button">Añadir al carrito</button>
        </div>
    </div>
</div>
`;
    // Añade el HTML al contenedor
    container.innerHTML = html;
}

//Funcion que agrega las imagenes 
let addImage = function (array){ 
    let imageToAdd = ""; 
    for (let i = 0; i < array.length; i++) { 
        if (i===0){ 
            imageToAdd += `<img class="miniatura-img active-img all-images" id="img${i}" onclick="changeImg(${i})" src="${array[i]}" />` 
        } else { imageToAdd += `<img class="miniatura-img all-images" id="img${i}" onclick="changeImg(${i})" src="${array[i]}" />`} 
    };
    return imageToAdd; 
}

//Cambia segun que imagen se desea ver
function changeImg(index) {
    let bigImgBox = document.getElementById(`bigImg`);
    let smallImgBox = document.getElementById(`img${index}`);
    const images = document.getElementsByClassName("all-images");

    for (const img of images) {
        if (img.getAttribute("src") === bigImgBox.getAttribute("src")) { img.classList.remove("active-img") }
    }
    smallImgBox.classList.add("active-img")
    bigImgBox.setAttribute("src", smallImgBox.getAttribute("src"));



}


const stars = document.querySelectorAll('.stars');

stars.forEach(star => {
    star.addEventListener('mouseover', () => {
        resetStars();
        star.classList.add('checked');
        let prevSibling = star.previousElementSibling;
        while (prevSibling) {
            prevSibling.classList.add('checked');
            prevSibling = prevSibling.previousElementSibling;
        }
    });

    star.addEventListener('mouseout', () => {
        resetStars();
        setSelectedStars();
    });

    star.addEventListener('click', () => {
        resetStars();
        resetSelected();
        star.classList.add('selected');
        starCal = star.getAttribute("data-value"); //guarda la cantidad de estrellas que se marco
        let prevSibling = star.previousElementSibling;
        while (prevSibling) {
            prevSibling.classList.add('selected');
            prevSibling = prevSibling.previousElementSibling;
        }
    });
});

function resetSelected() {
    stars.forEach(star => {
        star.classList.remove('selected');
    });
}

function resetStars() {
    stars.forEach(star => {
        star.classList.remove('checked');
    });
}

function setSelectedStars() {
    stars.forEach(star => {
        if (star.classList.contains('selected')) {
            star.classList.add('checked');
           
        }
    });
}

function showRelatedProducts(product) {
    const container = document.getElementById('related-products-container');
    
    // Limpia el contenido actual del contenedor
    container.innerHTML = '';

    // Verifica si product.relatedProducts es un array y tiene elementos
    if (Array.isArray(product.relatedProducts) && product.relatedProducts.length > 0) {
        // Crea un título para los productos relacionados
        const title = document.createElement('h4');
        title.textContent = 'Productos Relacionados';
        title.className = 'titlepr';
        container.appendChild(title); // Añade el título al contenedor
     
        // Crea un grupo de tarjetas
        const cardGroup = document.createElement('div');
        cardGroup.className = 'card-group';

        for (let relatedProduct of product.relatedProducts) {
            const card = document.createElement('div');
            card.className = 'card border-0 cursor-active';
            
            card.innerHTML = `
                <img class="product-image" src="${relatedProduct.image}" alt="${relatedProduct.name}" />
                <div class="card-body">
                    <h5 class="card-title">${relatedProduct.name}</h5>
                </div>
            `;
            
            // Añadir evento click a la tarjeta
            card.addEventListener('click', function() {
                localStorage.setItem('productID', relatedProduct.id); // Guardar el ID del producto relacionado
                window.location.href = 'product-info.html'; // Redirige a la página
            });

            // Añade la tarjeta al grupo de tarjetas
            cardGroup.appendChild(card);
        }

        // Añade el grupo de tarjetas al contenedor
        container.appendChild(cardGroup);
    } else {
        // Manejar el caso donde no hay productos relacionados
        container.innerHTML = '<p>No hay productos relacionados.</p>';
    }
}

//Desafiate (agregar calificacion) 

let commentsStorage =[]; //crea una lista vacia donde luego se cargaran los comentarios que realicemos
const sendBtn = document.querySelector(".send-calification"); //boton de enviar comentario
// let starsCount = 

//Guarda en un array el contenido de localStorage (comentarios realizados)
if (localStorage.getItem(`califications${productID}`) !== null){
    commentsStorage = JSON.parse(localStorage.getItem(`califications${productID}`));
  };

//Funcion que guarda un nuevo comentario realizado en localStorage y ademas lo muestra
let setComment = function (){
    //Crea un objeto para almacenar los datos de un nuevo comentario
    let newComment = {product:"", score:"", description:"", user:"", dateTime: ""  }
    //Si los campos del formulario no estan vacios procede
    if((starCal !== undefined) && (document.getElementById("textArea").value !== "")){
      newComment.product = localStorage.getItem("productID"); //GUARDA EL ID DEL PRDUCTO
      newComment.score = starCal; //GUARDA LA PUNTUACION EN ESTRELLAS
      newComment.description = document.getElementById("textArea").value; //GUARDA EL MENSAJE
      newComment.user = localStorage.getItem("user"); //GUARDA EL USUARIO
      newComment.dateTime =  `${new Date().getFullYear()}-${new Date().getMonth()+1}-${new Date().getDate()} ${new Date().getHours()}:${new Date().getMinutes()+1}:${new Date().getSeconds()} ` //GUARDA LA FECHA Y HORA
      commentsStorage.push(newComment);  //AGREGA EL NUEVO COMENTARIO A LA LISTA DE LOS COMOENTARIOS ANTERIORES
  
      
      //Limpia los campos luego de enviar el comentario
      document.getElementById("textArea").value = "";
      let stars = document.querySelectorAll(".stars");
      for (let i = 0; i < stars.length; i++) {
        stars[i].classList.remove("checked") 
      }
      
      //Muestra el comentario realizado
      document.getElementById("comments-container").innerHTML += `  
                  <div class="comment" style="display: flex; justify-content: space-between; align-items: center;">  
                <div style="display: flex; align-items: center;">  
                    <div class="user-icon">  
                        <i class="fas fa-user"></i>  
                    </div>  
                    <div>  
                        <strong>${newComment.user}</strong>  
                        <div class="text-muted">${new Date(newComment.dateTime).toLocaleString()}</div>  
                        <p>${newComment.description}</p>  
                    </div>  
                </div>  
                <div class="rating">  
                    <div>${getStars(newComment.score)}</div>  
                </div>  
            </div>   
        `
  
  
    };
    //Actualiza el localStorage
    localStorage.setItem(`califications${productID}`, JSON.stringify(commentsStorage))
  }

  //Evento que agrega un comentario
sendBtn.addEventListener("click", ()=>{
    setComment();
    document.getElementById("message").style.display = "block"
  })




  const darkMode = document.querySelector(".dark-mode");
const body = document.body;
  darkMode.addEventListener("click",()=>{
body.classList.toggle("active");
  });