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

    addListenersToExistingButtons();
    updateTotal();
}

function addListenersToExistingButtons() {
    document.querySelectorAll(".product").forEach(productElement => {
        const menosBtn = productElement.querySelector(".menos");
        const masBtn = productElement.querySelector(".mas");
        const contadorInput = productElement.querySelector(".contador");
        const finalPriceElement = productElement.querySelector(".final-price");
        const price = parseFloat(finalPriceElement.textContent.replace(/[^0-9.]+/g,"")); // Precio unitario
        const currency = finalPriceElement.textContent.includes("USD") ? "USD" : "$"; 

        // Actualizar subtotal en función de la cantidad
        function updateSubtotal() {
            const cantidad = parseInt(contadorInput.value);
            finalPriceElement.textContent = `${currency} ${(price * cantidad).toFixed(2)}`;
            updateTotal();
        }

        // Se mantienen los botones existentes para actualizar la cantidad
        masBtn.addEventListener("click", () => {
            contadorInput.value = parseInt(contadorInput.value) + 1;
            updateSubtotal();
        });

        menosBtn.addEventListener("click", () => {
            if (parseInt(contadorInput.value) > 1) {
                contadorInput.value = parseInt(contadorInput.value) - 1;
                updateSubtotal();
            }
        });

        contadorInput.addEventListener("input", updateSubtotal);
    });
}

function updateTotal() {
    let total = 0;
    let currency = document.querySelector(".final-price").textContent.includes("USD") ? "USD" : "$"; 

    document.querySelectorAll(".final-price").forEach(finalPriceElement => {
        const amount = parseFloat(finalPriceElement.textContent.replace(/[^0-9.]+/g,""));
        total += amount;
    });

    document.querySelector(".total").innerHTML = `<h5 class="total-price-text">Total: ${currency} ${total.toFixed(2)}</h5>`;
}
