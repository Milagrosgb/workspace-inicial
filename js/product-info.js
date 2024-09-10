document.addEventListener("DOMContentLoaded", function() {
    const productsURL = "https://japceibal.github.io/emercado.api/cats_products/" + localStorage.getItem("productID") + ".json";
    fetch(productsURL, {
        mode: 'no-cors'
    }) 
    .then(response => response.json())
    .then(data => {
        // Asumir que tienes un contenedor con id 'product-container' en tu HTML
        const productContainer = document.getElementById('product-container');
        
        // Iterar sobre cada producto
        data.products.forEach(product => {
            // Crear elementos
            const productDetails = document.createElement('div');
            productDetails.classList.add('product-details');
            
            const img = document.createElement('img');
            img.src = product.image;
            
            const description = document.createElement('p');
            description.textContent = product.description;
            
            // Agregar los elementos al contenedor
            productDetails.appendChild(img);
            productDetails.appendChild(description);
            
            // Agregar el contenedor del producto al contenedor principal
            productContainer.appendChild(productDetails);
        });
    })
    .catch(error => {
        console.error('Error fetching product data:', error);
    });
});
