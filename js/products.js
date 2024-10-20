const listEl = document.querySelector('#product-list');
const pageTitle = document.querySelector('.h2');
let currentProductsArray = [];
let originalArray = [];
let minCount = undefined;
let maxCount = undefined;
const ORDER_BY_COST = 'cost';
const ORDER_ASC_BY_PRICE = 'PRICE_ASC';
const ORDER_DESC_BY_PRICE = 'PRICE_DESC';
const ORDER_DESC_BY_RELEVANCE = 'RELEVANCE_DESC';

function setCatID(id) {
  localStorage.setItem('productID', id);
  window.location.href = 'product-info.html';
}

const showProductsList = (array) => {
  let HTMLtoAppend = '';

  for (let i = 0; i < array.length; i++) {
    let post = array[i];

    if (
      (minCount == undefined ||
        (minCount != undefined && parseInt(post.cost) >= minCount)) &&
      (maxCount == undefined ||
        (maxCount != undefined && parseInt(post.cost) <= maxCount))
    ) {
      HTMLtoAppend += `
      <div class="product-card" onclick="setCatID(${post.id})">
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
                </div>
              `;
    }
  }
  listEl.innerHTML = HTMLtoAppend;
};

document.addEventListener('DOMContentLoaded', function () {
  const catID = localStorage.getItem('catID');
  getJSONData(`${PRODUCTS_URL}${catID}${EXT_TYPE}`).then(function (resultObj) {
    if (resultObj.status === 'ok') {
      originalArray = resultObj.data.products;
      currentProductsArray = originalArray;

      showProductsList(currentProductsArray);
      pageTitle.innerHTML = resultObj.data.catName.toUpperCase();
    }
  });

  document.getElementById('sortAsc').addEventListener('click', () => {
    sortAndShowProducts(ORDER_DESC_BY_PRICE);
  });
  document.getElementById('sortDesc').addEventListener('click', () => {
    sortAndShowProducts(ORDER_ASC_BY_PRICE);
  });

  document.getElementById('sortByRelevance').addEventListener('click', () => {
    sortAndShowProducts(ORDER_DESC_BY_RELEVANCE);
  });

  document
    .getElementById('clearRangeFilter')
    .addEventListener('click', function () {
      document.getElementById('rangeFilterCountMin').value = '';
      document.getElementById('rangeFilterCountMax').value = '';
      minCount = undefined;
      maxCount = undefined;

      showProductsList(originalArray);
    });

  document.getElementById('sortAsc').addEventListener('click', () => {
    sortAndShowProducts(ORDER_DESC_BY_PRICE);
  });
  document.getElementById('sortDesc').addEventListener('click', () => {
    sortAndShowProducts(ORDER_ASC_BY_PRICE);
  });

  document.getElementById('sortByRelevance').addEventListener('click', () => {
    sortAndShowProducts(ORDER_DESC_BY_RELEVANCE);
  });
});


const searchInput = document.getElementById('product-search');
const noResultMessage = document.getElementById('noResultsMessage');
const searchButton = document.getElementById('search-button');

//Funcion del buscador
function filterResults (){

  let regex = new RegExp(searchInput.value, 'i');
  let matchProducts = [];
  currentProductsArray.forEach(element => {   
      if(regex.test(element.name) || regex.test(element.description)){
          matchProducts.push(element);
          currentProductsArray = matchProducts;
          showProductsList(currentProductsArray);
          noResultMessage.style.display = "none";        
      } else {
          matchProducts= []
          showProductsList(matchProducts)
          noResultMessage.style.display = '';    
      }      
      resetProducts();       
  });  
}

//Funcion que muestra los productos de nuevo si el input esta vacio
function resetProducts (){
  if (searchInput.value == ""){
      currentProductsArray = originalArray;
      showProductsList(currentProductsArray);
      console.log("Reseteado")
  }
}

//Evento del buscador
searchInput.addEventListener('input', filterResults);
searchButton.addEventListener('click', filterResults);

// Sort:
function sortProducts(criteria, array) {
  let result = [];
  if (criteria === ORDER_ASC_BY_PRICE) {
    result = array.sort((a, b) => {
      return a.cost - b.cost;
    });
  } else if (criteria === ORDER_DESC_BY_PRICE) {
    result = array.sort(function (a, b) {
      return b.cost - a.cost;
    });
  } else if (criteria === ORDER_DESC_BY_RELEVANCE) {
    result = array.sort(function (a, b) {
      let aCount = parseInt(a.soldCount);
      let bCount = parseInt(b.soldCount);

      if (aCount > bCount) {
        return -1;
      }
      if (aCount < bCount) {
        return 1;
      }
      return 0;
    });
  } else if (criteria === ORDER_BY_COST) {
    if (minCount != undefined && maxCount != undefined) {
      result = array.filter((product) => {
        return (
          parseInt(product.cost) <= maxCount &&
          parseInt(product.cost) >= minCount
        );
      });
    } else if (minCount != undefined) {
      result = array.filter((product) => {
        return parseInt(product.cost) >= minCount;
      });
    } else if (maxCount != undefined) {
      result = array.filter((product) => {
        return parseInt(product.cost) <= maxCount;
      });
    }
  }
  return result;
}

function sortAndShowProducts(sortCriteria) {
  const sortedProducts = sortProducts(sortCriteria, currentProductsArray);
  showProductsList(sortedProducts);
}


// Filter:

document
  .getElementById('rangeFilterCount')
  .addEventListener('click', function () {
    //Obtengo el mínimo y máximo de los intervalos para filtrar por cantidad
    //de productos por categoría.
    minCount = document.getElementById('rangeFilterCountMin').value;
    maxCount = document.getElementById('rangeFilterCountMax').value;

    if (minCount != undefined && minCount != '' && parseInt(minCount) >= 0) {
      minCount = parseInt(minCount);
    } else {
      minCount = undefined;
    }

    if (maxCount != undefined && maxCount != '' && parseInt(maxCount) >= 0) {
      maxCount = parseInt(maxCount);
    } else {
      maxCount = undefined;
    }
    // currentProductsArray = originalArray;
    sortAndShowProducts(ORDER_BY_COST);
  });

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