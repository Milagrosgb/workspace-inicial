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
    let totalCost=0
    document.querySelector(".product-list").innerHTML =""
    let products = JSON.parse(localStorage.getItem("carrito"))
    if (products===null || products.length=== 0){
        document.querySelector(".product-list").innerHTML = `<h3>Carrito vacio, encontra lo que buscas en el siguiente enlace </h3><a class="primary-button button-font" href="categories.html">DESCUBRIR MÁS</a>`
        document.querySelector("#finalizar-compra").innerHTML = ""
        document.querySelector("#cart-total").innerHTML = ""
        return 
    }
    document.querySelector("#finalizar-compra").innerHTML = `<button class="btn-text buy-btn">FINALIZAR COMPRA</button>`
    document.querySelector("#cart-total").innerHTML = `<h5 class="total-text">Total:</h5>`
    products.forEach(product => {
        let productCostInUYU = product.currency === "USD" ? product.cost * 42 : product.cost;
        totalCost += productCostInUYU * product.quantity;
        productTotal = (product.cost* product.quantity)
        //aca sumo la cantidad de productos de cada uno
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
                        <button class="menos" type="button"  onclick="decreaseQuantity(${product.id})">-</button>
                        <input type="text" class="form-control contador" value="${product.quantity}" min="1"/>        
                        <button class="mas" type="button"  onclick="increaseQuantity(${product.id})">+</button>
                        <button type="button" class="btn remove-btn" onclick="removeProduct(${product.id})">Eliminar</button>
                    </div>
                    
                    <div id=" class="final-price">${product.currency} ${productTotal}</div>

                </div>
            </div>
        </div>

    `;     
    });
    document.querySelector("#cart-total").innerHTML=`TOTAL UYU ${totalCost}`
   

}

// Funcion para aumentar la cantidad de un producto
function increaseQuantity(productID) {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || []
    let product = carrito.find(element => element.id === productID)
 
 
    if (product) {
        localStorage.removeItem("carrito")
        product.quantity += 1
        localStorage.setItem("carrito", JSON.stringify(carrito));
        showCartProducts();
    }
 }
 
 // Función para disminuir la cantidad
function decreaseQuantity(productID) {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    let product = carrito.find(element => element.id === productID);

 
    if (product) {
        
        if (product.quantity > 1) {
            product.quantity -= 1;
        } else {
            carrito = carrito.filter(element => element.id !== productID);
        }
       
        localStorage.setItem("carrito", JSON.stringify(carrito));
        showCartProducts()
    }
 }
 


//Funcion que elimina producto del carrito
function removeProduct(productID){
    let carrito = JSON.parse(localStorage.getItem("carrito"))
    let productIndex = carrito.findIndex((element)=> element.id == productID)
    carrito.splice(productIndex, 1);
    localStorage.setItem("carrito", JSON.stringify(carrito));
    showCartProducts();
    

}




