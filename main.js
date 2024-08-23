const limit = 50;
const offset = 0;

fetch(`https://dummyjson.com/products?limit=${limit}&skip=${offset}`)
  .then((res) => res.json())
  .then((data) => {
    console.log(data); // Log dos dados completos da API
    const products = data.products;

    // Função para capitalizar a primeira letra
    function capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }

    // Função para retornar ícones de estrelas com base no rating
    function getStarIcons(rating) {
      let starCount = 0;

      if (rating >= 0 && rating <= 1.99) {
        starCount = 1;
      } else if (rating >= 2 && rating <= 2.99) {
        starCount = 2;
      } else if (rating >= 3 && rating <= 3.99) {
        starCount = 3;
      } else if (rating >= 4 && rating <= 4.50) {
        starCount = 4;
      } else if (rating > 4.50) {
        starCount = 5;
      }

      return '<i class="bi bi-star-fill"></i>'.repeat(starCount);
    }

    // Adiciona produtos aos contêineres apropriados
    products.forEach((product) => {
      console.log(product); // Log de cada produto individual

      const dimensions = `Depth: ${product.dimensions.depth}cm, Height: ${product.dimensions.height}cm, Width: ${product.dimensions.width}cm`;
      const category = capitalizeFirstLetter(product.category);
      const ratingIcons = getStarIcons(product.rating);

      const productHTML = `
        <div class="col-12 col-lg-3 cell">
          <div class="card h-100">
            <div class="status">
              ${product.availabilityStatus}
            </div>
            <img src="${product.thumbnail}" class="card-img-top img-fluid" alt="${product.title}">
            <div class="card-body ">
              <h3>${product.title}</h3>
              <div>
                <div class="card-body-info ">
                  <p>$${product.price}</p>
                  <p>${ratingIcons}</p>
                </div>
                <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#modal${product.id}">
                  More
                </button>
              </div>
            </div>
          </div>

          <!-- Modal -->
          <div class="modal fade" id="modal${product.id}" tabindex="-1" aria-labelledby="ModalLabel${product.id}"
            aria-hidden="true">
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <h1 class="modal-title fs-5" id="ModalLabel${product.id}">${product.title} ID:${product.id}</h1>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                  <ul>
                    <li>Category: ${category}</li>
                    <li>Description: ${product.description}</li>
                    <li>Dimensions: ${dimensions}</li>
                    <li>Minimum order quantity: ${product.minimumOrderQuantity}</li>
                    <li>Return policy: ${product.returnPolicy}</li>
                    <li>Warranty: ${product.warrantyInformation}</li>
                    <li>Weight: ${product.weight}</li>
                  </ul>
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      `;

      // Encontra o contêiner da categoria e adiciona o produto
      const categoryContainerId = `#${category.replace(/\s+/g, '-').toLowerCase()}`;
      const categoryContainer = document.querySelector(categoryContainerId);
      if (categoryContainer) {
        categoryContainer.innerHTML += productHTML;
      } else {
        console.warn(`Contêiner para a categoria "${category}" não encontrado.`);
      }
    });
  })
  .catch((error) => console.error("Error:", error));
