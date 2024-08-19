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
                <img src='${post.image}' class="card-img-top card-image" alt="'${post.image}'" />
                  <div class="card-content">
                    <div class="title-description">
                      <h5 class="card-title">${post.name}</h5>
                      <p class="card-text card-text-hight">
                      ${post.description}
                      </p>
                    </div>
                    <div class="price-qty">
                      <p>$${post.cost}</p>
                      <p>${post.soldCount} art.</p>
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
