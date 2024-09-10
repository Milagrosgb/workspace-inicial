document.addEventListener("DOMContentLoaded", function() {
    // const productID = localStorage.getItem("productID");
    // if (!productID) {
    //     console.error("No productID found in localStorage.");
    //     return;
    // }

    let productInfo = PRODUCT_INFO_URL + localStorage.getItem("productID") + EXT_TYPE

    fetch(productInfo)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok.');
            }
            return response.json();
        })
        .then(data => {
            console.log(data); // Verificar la estructura del objeto

            // Verificar si `data` es el objeto del producto
            if (data && typeof data === 'object') {
                const productContainer = document.getElementById('product-container');
                productContainer.innerHTML = ''; // Limpiar el contenedor antes de agregar el producto

                // Crear elementos para mostrar la información del producto
                const productDetails = document.createElement('div');
                productDetails.classList.add('product-details');

                const img = document.createElement('img');
                img.src = data.images[0]; // Usar la primera imagen
                img.alt = data.name || "Product image";

                const description = document.createElement('p');
                description.textContent = data.description || "No description available";

                const cost = document.createElement('p');
                cost.textContent = `Precio: $${data.cost.toFixed(2)}`;

                const category = document.createElement('p');
                category.textContent = `Categoría: ${data.category}`;

                const soldCount = document.createElement('p');
                soldCount.textContent = `Vendidos: ${data.soldCount}`;

                // Agregar los elementos al contenedor
                productDetails.appendChild(img);
                productDetails.appendChild(description);
                productDetails.appendChild(cost);
                productDetails.appendChild(category);
                productDetails.appendChild(soldCount);

                // Agregar el contenedor del producto al contenedor principal
                productContainer.appendChild(productDetails);
            } else {
                console.error("The data is not in the expected format.");
            }
        })
        .catch(error => {
            console.error('Error fetching product data:', error);
        });
});



// function showProductInfo(product) {
//     // Obtener el contenedor para los detalles del producto
//     const productDetailsDiv = document.querySelector('.product-details');
    
//     // Limpiar el contenido del div antes de agregar nueva información
//     productDetailsDiv.innerHTML = '';

//     // Crear elementos para mostrar la información del producto
//     const nameElement = document.createElement('h2');
//     nameElement.textContent = product.name;

//     const descriptionElement = document.createElement('p');
//     descriptionElement.textContent = `Descripción: ${product.description}`;

//     const costElement = document.createElement('p');
//     costElement.textContent = `Precio: $${product.cost.toFixed(2)}`;

//     const categoryElement = document.createElement('p');
//     categoryElement.textContent = `Categoría: ${product.category}`;

//     const soldCountElement = document.createElement('p');
//     soldCountElement.textContent = `Vendidos: ${product.soldCount}`;

//     const imageElement = document.createElement('img');
//     imageElement.src = product.image;
//     imageElement.alt = product.name;
//     imageElement.style.maxWidth = '200px'; // Ajustar el tamaño de la imagen si es necesario

//     // Añadir los elementos creados al contenedor
//     productDetailsDiv.appendChild(nameElement);
//     productDetailsDiv.appendChild(descriptionElement);
//     productDetailsDiv.appendChild(costElement);
//     productDetailsDiv.appendChild(categoryElement);
//     productDetailsDiv.appendChild(soldCountElement);
//     productDetailsDiv.appendChild(imageElement);
// }


// document.addEventListener("DOMContentLoaded", function(e){
//     getJSONData(localStorage.PRODUCT_ID).then(function(resultObj){
//         if (resultObj.status === "ok"){
//             // Asegurarse de que 'product' se obtenga correctamente del resultado
//             const product = resultObj.data; // Ajustar según la estructura real de 'resultObj'
//             showProductInfo(product);
//         }
//     }).catch(function(error) {
//         console.error('Error al obtener los datos del producto:', error);
//     });
// });
