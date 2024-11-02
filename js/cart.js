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
         total += productCost; 
});

document.querySelector(".total").innerHTML += `<h5 class="total-price-text">${products[0]?.currency} ${total}</h5>`;


document.querySelectorAll(".contador").forEach((input, index) => {//funcionalidad paraa cambiar cant
    input.addEventListener("input", () => {
    const priceText = products[index].currency + ' ' + products[index].cost; //obtener precio del producto
        const priceValue = parseFloat(priceText.split(' ')[1]); 
        const quantity = parseInt(input.value); //btener cantidad
        const subtotal = priceValue * quantity; //calcular subtotal
    
        document.querySelectorAll(".subtotal")[index].textContent = subtotal.toFixed(2); //actualiza el subtotal
        updateTotal(); //actualizar el total
    });
});
}

function updateTotal() {
let total = 0; //reinicia el total
const subtotals = document.querySelectorAll(".subtotal");
const currency = subtotals[0]?.textContent.split(' ')[0];

subtotals.forEach(subtotalElement => {
    total += parseFloat(subtotalElement.textContent); //sumasubtotales
});

// Actualizar el total en la interfaz
document.querySelector(".total-price-text").textContent = `${currency} ${total.toFixed(2)}`; //vuelve actualizar total defi
}



