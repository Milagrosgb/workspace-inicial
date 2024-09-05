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

const searchInput = document.getElementById("product-search");
const output = document.getElementById('output');
const productCards = document.getElementsByClassName("product-card");
// const productTitles = document.getElementsByClassName("card-title")
// const productDescriptions =  document.getElementsByClassName("card-text")


searchInput.addEventListener('input', () => {
  let searchValue = searchInput.value;
  output.textContent = `You typed: ${searchValue}`;
  
  let regex = new RegExp(searchValue, 'i');
  console.log(regex);

  for (let card of productCards) {
    const cardTitle = card.querySelector(".card-title");
    const cardDescription = card.querySelector(".card-text")
    if (regex.test(cardTitle.textContent)) {
      card.style.display = ''; // Show matching items
  } else if (regex.test(cardDescription.textContent)) {
    card.style.display = ''; // Show matching items

  } else {
      card.style.display = 'none'; // Hide non-matching items
      // const noResults = document.createElement('div');
      // document.getElementById("product-list").appendChild(noResults);
      // // output.appendChild(noResults);
      // // console.log(listEl);
      // // listEl.appendChild(noResults);
      // noResults.innerHTML = "<p> No se encontraron resultados para tu búsqueda.</p>";
  // }
}
  }
  // for (let title of productTitles) {
  //   if (regex.test(title.textContent)) {
  //       title.style.display = ''; // Show matching items
  //   } else {
  //       title.style.display = 'none'; // Hide non-matching items
  //   }


  // for (let a of products) {
  //   console.log(a.textContent);
  // }

});

