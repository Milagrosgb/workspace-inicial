const createProducts = (data) => {

  const listEl = document.querySelector('#product-list');
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
    productElement.addEventListener('click', () => {
      localStorage.setItem('productID', post.id); // Guardar el ID del producto en localStorage
      window.location.href = 'product-info.html'; // Redirigir a la página de detalles
    });
    listEl.appendChild(productElement);
  });
}


document.addEventListener('DOMContentLoaded', function () {

  let productElements = [];
  const getProductsFromDOM = () => {
    const products = document.querySelectorAll('#product-list .product-card');
    return Array.from(products).map(element => ({
      html: element.outerHTML,
      price: parseFloat(((element.querySelector('.price-qty .subtitle-1')).textContent).replace('$', '').replace(/,/g, ''))
    }));
  }

  const catID = localStorage.getItem("catID");
  getJSONData(`${PRODUCTS_URL}${catID}${EXT_TYPE}`).then(function (resultObj) {
    if (resultObj.status === "ok") {
      currentCategoriesArray = resultObj.data
      createProducts(currentCategoriesArray);
      productElements = getProductsFromDOM();
    }
  });

  const displayProducts = (productsToDisplay) => {
    const productList = document.querySelector('#product-list');
    productList.innerHTML = ''; // Limpiar contenido previo
    productsToDisplay.forEach(product => {
      let tempContainer = document.createElement('div');
      // Insertar la cadena HTML en el contenedor
      tempContainer.innerHTML = product.html;
      productList.appendChild(tempContainer.firstChild);
    });
  }

  document.getElementById('rangeFilterCount').addEventListener('click', function (event) {
    event.preventDefault();

    let minPrice = 0;
    let maxPrice = Infinity;
    if (document.getElementById('rangeFilterCountMin').value != "" && document.getElementById('rangeFilterCountMax').value != "") {
      minPrice = Math.max(parseFloat(document.getElementById('rangeFilterCountMin').value), 0);
      maxPrice = Math.min(parseFloat(document.getElementById('rangeFilterCountMax').value), Infinity);
    } else if (document.getElementById('rangeFilterCountMin').value != "") {
      minPrice = Math.max(parseFloat(document.getElementById('rangeFilterCountMin').value), 0);
    } else if (document.getElementById('rangeFilterCountMax').value != "") {
      maxPrice = Math.min(parseFloat(document.getElementById('rangeFilterCountMax').value), Infinity);
    }
    let products = productElements;
    let filteredProducts = products.filter(product => {
      return product.price >= minPrice && product.price <= maxPrice;
    });
    displayProducts(filteredProducts);
  });

  document.getElementById('clearRangeFilter').addEventListener('click', function () {
    document.getElementById('rangeFilterCountMin').value = '';
    document.getElementById('rangeFilterCountMax').value = '';
    let products = productElements;
    displayProducts(products); // Mostrar todos los productos nuevamente
  });
});



const searchInput = document.getElementById('product-search');
// const output = document.getElementById('output');
const productCards = document.getElementsByClassName('product-card');
const noResultMessage = document.getElementById("noResultsMessage");
const searchButton = document.getElementById("search-button");

function filterResults() {
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
}

searchInput.addEventListener("input", filterResults)

searchButton.addEventListener("click", filterResults);
