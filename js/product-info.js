document.addEventListener("DOMContentLoaded", function() {
    // const productID = localStorage.getItem("productID");
    // if (!productID) {
    //     console.error("No productID found in localStorage.");
    //     return;
    // }

    let productInfo = PRODUCT_INFO_URL + localStorage.getItem("productID") + EXT_TYPE;

    fetch(productInfo)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok.');
            }
            return response.json();
        })
        .then(product => {
            console.log(product); // Verificar la estructura del objeto
            
            // Verificar si `product` es el objeto del producto
            if (product && typeof product === 'object') {
                showProductDetails(product);
            } else {
                console.error("The data is not in the expected format.");
            }
        })
        .catch(error => {
            console.error('Error fetching product data:', error);
        });
});

function showProductDetails(product) {
    const container = document.getElementById('product-container');
    
    // Limpia el contenido actual del contenedor
    container.innerHTML = '';

    // Verifica si product.images es una URL válida
    console.log("Image URL:", product.images); // Verifica la URL de la imagen

    // Crea el HTML dinámico con la estructura proporcionada
    const html = `
<div class="product-details-container">
    <div class="product-images-container">
        <img class="big-product-image" src="${product.images[0]}" alt="${product.name}" />
        <div class="miniaturas-container">
            <img class="miniatura-img" src="${product.images[1]}" alt="${product.name}" />
            <img class="miniatura-img" src="${product.images[2]}" alt="${product.name}" />
            <img class="miniatura-img" src="${product.images[3]}" alt="${product.name}" />
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


