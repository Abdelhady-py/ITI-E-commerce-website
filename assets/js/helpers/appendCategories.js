//getting all the DOM selector
const categoriesDiv = document.getElementById("categories-products");
export function appendCategories(categories) {
  for (const data of categories) {
    categoriesDiv.innerHTML += `
    <div class="mt-5 mb-5 col-md-4 col-sm-6 col-lg-3">
    <a href="products.html" class="card-link d-flex  justify-content-center">
        <div class="card" style="width:16rem;">
            <div class="card-body">
                <h5 class="card-title text-center">${data.title}</h5>

                <img src="${data.image}"
                    class="card-img-top" alt="${data.title}" />
            </div>
        </div>
    </a>
</div>
              `;
  }
}
