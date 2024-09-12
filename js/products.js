document.addEventListener('DOMContentLoaded', function () {
  const listEl = document.querySelector('#product-list');
  const catID = localStorage.getItem("catID");

  fetch(`${PRODUCTS_URL}${catID}${EXT_TYPE}`)
    .then((res) => res.json())
    .then((data) => {
      // Asegúrate de que data.products sea un array
      if (Array.isArray(data.products)) {
        const pageTitle = document.querySelector(".h2");
        pageTitle.innerHTML = data.catName.toUpperCase();
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



const searchInput = document.getElementById('product-search');
const output = document.getElementById('output');
const productCards = document.getElementsByClassName('product-card');
const noResultMessage = document.getElementById("noResultsMessage");

searchInput.addEventListener('input', () => {
  let searchValue = searchInput.value;
  let regex = new RegExp(searchValue, 'i');
  let counter = 0;

  for (let card of productCards) {
    const cardTitle = card.querySelector('.card-title');
    const cardDescription = card.querySelector('.card-text');
    if (regex.test(cardTitle.textContent)) {
      card.style.display = ''; 
      counter++;
    } else if (regex.test(cardDescription.textContent)) {
      card.style.display = ''; 
      counter++;
    } else {
      card.style.display = 'none'; 
    }
  }
  if (counter === 0) {
    noResultMessage.style.display = "";
  } else if (searchValue.length == 0) {
    noResultMessage.style.display = "none";
  }
  counter = 0;
});


document.getElementById('filter-button').addEventListener('click', function(event) {
  event.preventDefault();
  
  const minPrice = parseFloat(document.getElementById('min-price').value) || 0;
  const maxPrice = parseFloat(document.getElementById('max-price').value) || Infinity;

  const filteredProducts = products.filter(product => {
    return product.price >= minPrice && product.price <= maxPrice;
  });

  displayProducts(filteredProducts);
});

document.getElementById('clear-button').addEventListener('click', function() {
  document.getElementById('min-price').value = '';
  document.getElementById('max-price').value = '';
  
  displayProducts(products); // Mostrar todos los productos nuevamente
});