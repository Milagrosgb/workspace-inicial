window.addEventListener("DOMContentLoaded", () => {
    showCartProducts();
});

function showCartProducts() {
    let products = JSON.parse(localStorage.getItem("carrito"));
    
    products.forEach(product => {
        document.querySelector(".product-list").innerHTML += `
        <div class="product pb-4 border-bottom">
            <img src="${product.images[0]}" class="cart-img" alt="${product.name} image" />
            <div class="product-info">
                <h4 class="product-title">${product.name}</h4>
                <p class="price">${product.currency} ${product.cost}</p>
                <div class="qty">
                    <button class="menos" type="button">-</button>
                    <input type="number" class="contador" value="1" min="1"/>
                    <button class="mas" type="button">+</button>
                </div>
                <div class="final-price">${product.currency} ${product.cost}</div>
            </div>
        </div>
        `;
    });

    document.querySelector(".total").innerHTML +=  <h5 class="total-price-text">600 USD</h5>

} 
