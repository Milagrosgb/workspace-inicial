document.addEventListener('DOMContentLoaded', function() {
    const listEl = document.querySelector('.products');
    
    fetch('https://japceibal.github.io/emercado-api/cats_products/101.json')
      .then(res => res.json())
      .then(data => {
        // Asegúrate de que data.products sea un array
        if (Array.isArray(data.products)) {
          data.products.forEach(post => {
            const productElement = document.createElement('div');
            productElement.className = 'product';
            productElement.innerHTML = `
              <p>${post.name}</p> 
              <p>${post.description}</p>
              <p>${post.soldCount} art.</p>
              <p>$${post.cost}</p>
              <p><img src='${post.image}' alt='${post.name}'></p>
            `;
            listEl.appendChild(productElement);
          });
        } else {
          console.error('Data.products is not an array:', data.products);
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
  });