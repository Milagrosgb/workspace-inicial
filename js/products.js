document.addEventListener('DOMContentLoaded', function () {
  const listEl = document.querySelector('#product-list');
console.log(listEl)
  fetch('https://japceibal.github.io/emercado-api/cats_products/101.json')
    .then((res) => res.json())
    .then((data) => {
      // Asegúrate de que data.products sea un array
      if (Array.isArray(data.products)) {
        data.products.forEach((post) => {
          const productElement = document.createElement('div');
          productElement.className = 'product-card';
          productElement.innerHTML = `
                <div class='card-image'>
                  <img src='${post.image}' class="card-img-top card-image" alt="'${post.image}'" />
                </div>
                  <div class="card-content">
                    <div class="title-description subtitle-2">
                      <h5 class="card-title">${post.name}</h5>
                      <p class="card-text card-text-hight body-light">
                      ${post.description}
                      </p>
                    </div>
                    <div class="price-qty">
                      <p class="subtitle-1">$${post.cost}</p>
                      <p class="body-light">${post.soldCount} art.</p>
                  </div>
              </div>
            `;
          listEl.appendChild(productElement);
        });
      } else {
        console.error('Data.products is not an array:', data.products);
      }
    })
    .catch((error) => {
      console.error('Error:', error);
    });
});





// Criterios de ordenación
const ORDER_ASC_BY_PRICE = "PriceAsc";
const ORDER_DESC_BY_PRICE = "PriceDesc";
const ORDER_DESC_BY_SOLD_COUNT = "SoldCountDesc";

// Variables para el rango de filtros
let minCount = undefined;
let maxCount = undefined;

// Función para ordenar productos
function sortProducts(criteria, array) {
    if (criteria === ORDER_ASC_BY_PRICE) {
        return array.sort((a, b) => a.cost - b.cost);
    } else if (criteria === ORDER_DESC_BY_PRICE) {
        return array.sort((a, b) => b.cost - a.cost);
    } else if (criteria === ORDER_DESC_BY_SOLD_COUNT) {
        return array.sort((a, b) => b.soldCount - a.soldCount);
    }
    return array;
}

// filtro por cantidad
function filterProducts(array) {
    return array.filter(product => 
        (minCount === undefined || product.soldCount >= minCount) &&
        (maxCount === undefined || product.soldCount <= maxCount)
    );
}

