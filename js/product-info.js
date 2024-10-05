document.addEventListener("DOMContentLoaded", (e) => {
    const productID = localStorage.getItem("productID");
    const url = PRODUCT_INFO_URL + productID + EXT_TYPE;
    const commentsURL = PRODUCT_INFO_COMMENTS_URL  + productID + ".json";//esta es la url base que apunta a la api donde se almacenan los comentario de los productos

    getJSONData(url)
    .then(object=>{
        if(object.status === 'ok'){
            let product = object.data;
            showProductDetails(product)
        }
    });

    getJSONData(commentsURL)//carga comentarios del producto
    .then(Response => {
    if(Response.status === "ok"){
        let calification = Response.data;
        showComments(calification);//muestra los comentarios
        console.log("Comentarios cargados correctamente");
    
         // showComments(commentsStorage);
        }
    });
});


function showComments(comments) {
    const commentsContainer = document.getElementById('comments-container');
    commentsContainer.innerHTML = ""; // Limpia el contenedor

    comments.forEach(comment => {
        const commentHTML = `
            <div class="col-12 mb-3"> <!-- Hace que el comentario ocupe todo el ancho -->
                <div class="list-group-item">
                    <div>
                        <strong>${comment.user}</strong> - <span class="text-muted">${comment.dateTime}</span>
                    </div>
                    <p>${comment.description}</p>
                    <div class="rating">
                        <div>Calificación: ${getStars(comment.score)}</div>
                    </div>
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
            <img class="miniatura-img active-img all-images" id="img1" onclick="changeImg(1)" src="${product.images[0]}" alt="${product.name}" />
            <img class="miniatura-img all-images" id="img2" onclick="changeImg(2)" src="${product.images[1]}" alt="${product.name}" />
            <img class="miniatura-img all-images" id="img3" onclick="changeImg(3)" src="${product.images[2]}" alt="${product.name}" />
            <img class="miniatura-img all-images" id="img4" onclick="changeImg(4)" src="${product.images[3]}" alt="${product.name}" />
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


//Cambia segun que imagen se desea ver
 function changeImg(index){
        let bigImgBox = document.getElementById(`bigImg`);
        let smallImgBox = document.getElementById(`img${index}`);
        const images = document.getElementsByClassName("all-images");
      
        for (const img of images) {
          if(img.getAttribute("src") === bigImgBox.getAttribute("src") ){img.classList.remove("active-img")}
        } 
        smallImgBox.classList.add("active-img")
        bigImgBox.setAttribute("src", smallImgBox.getAttribute("src"));
       
      
        
      }

