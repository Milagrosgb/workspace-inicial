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

    document.querySelector(".product-list").innerHTML += `
        <div class="product pb-4 border-bottom">
           
                <img src="img/car3.jpg" class="cart-img" alt="" />
        
            <div class="product-info">
                <h4 class="card-title">Nombre del producto</h4>
                
                <div class="price-qty">
                    <div class="price-container">
                        <p class="subtitle-1 price">USD 100</p>
                    </div>
                    <div class="qty">
                        <button id="menos" class="menos" type="button">-</button>
                        <input type="text"  id="contador" class="form-control contador" value="1" min="1"/>        
                        <button id="mas" class="mas" type="button">+</button>
                    </div>
                    <div class="final-price">USD 200</div>

                </div>
            </div>
        </div>

         
    
    `;

    document.querySelector(".total").innerHTML += ` <h5 class="total-price-text">600 USD</h5>`
    

}

showCartProducts()