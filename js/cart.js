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
    document.querySelector(".product-list").innerHTML = '';
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
                        <button class="menos" type="button">-</button>
                        <input type="text" class="form-control contador" value="1" min="1"/>        
                        <button class="mas" type="button">+</button>
                        <button type="button" class="btn remove-btn" onclick="removeProduct(${product.id})">Eliminar</button>
                    </div>
                    
                    <div class="final-price">USD 100</div>

                </div>
            </div>
        </div>

    `;     
    });

    document.querySelector(".total").innerHTML = ` <h5 class="total-price-text">Aca va el precio total de todos los productos romi</h5>`

}


//Funcion que elimina producto del carrito
function removeProduct(productID){
    let carrito = JSON.parse(localStorage.getItem("carrito"))
    let productIndex = carrito.findIndex((element)=> element.id == productID)
    carrito.splice(productIndex, 1);
    localStorage.setItem("carrito", JSON.stringify(carrito));
    showCartProducts();
    

}




