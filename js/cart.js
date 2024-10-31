window.addEventListener("DOMContentLoaded", ()=>{
    showCartProducts()
})

function logout() {
    console.log('Función de cerrar sesión llamada'); 
    localStorage.removeItem('userSession');
    localStorage.removeItem("firstName");
    localStorage.removeItem("secondName");
    localStorage.removeItem("lastName");
    localStorage.removeItem("secondLastName");
    localStorage.removeItem("phone");
    console.log('Sesión cerrada y datos eliminados de localStorage.');
    window.location.href = 'index.html';
}


// Funcion que muestra los productos en el carrito de compras
let showCartProducts = ()=>{
    let products = JSON.parse(localStorage.getItem("carrito"))
    
    products.forEach(product => {
        document.querySelector(".product-list").innerHTML += `
        <div class="product pb-4 border-bottom">
            <img src="${product.images[0]}" class="cart-img" alt="${product.name} image" />
            <div class="product-info">
                <div class="price-title">
                    <h4 class="card-title product-title">${product.name}</h4>
                    <p class="subtitle-1 price">${product.currency} ${product.cost}</p>
                </div>
                <div class="price-qty">   
                    <div class="qty">
                        <button id="menos" class="menos" type="button">-</button>
                        <input type="text"  id="contador" class="form-control contador" value="1" min="1"/>        
                        <button id="mas" class="mas" type="button">+</button>
                    </div>
                    <div class="final-price">USD 100</div>

                </div>
            </div>
        </div>

    `;     
    });

    document.querySelector(".total").innerHTML += ` <h5 class="total-price-text">600 USD</h5>`

}



