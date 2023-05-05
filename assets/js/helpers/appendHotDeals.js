//getting all the DOM selector
const hotDealDiv = document.getElementById("hot-deals-product");

export function appendHotDeals(hotDeals) {
  for (const data of hotDeals) {
    hotDealDiv.innerHTML += `
              <div class="mt-5 mb-5 col-md-4 col-sm-6 col-lg-3">
              <a href="products.html" class="card-link d-flex  justify-content-center">
              <div class="card" style="width: 18rem; overflow:hidden">
                  <div class="card-body">
                  <img src="${
                    data.image
                  }" class="w-100 object-fit-cover" alt="${data.title}">
                    
                    <h6 class="card-subtitle mb-2 text-body-secondary">${
                      data.title.substring(0, 20) + "..."
                    }</h6>
                    <h6 class="card-subtitle mb-2 text-body-secondary fw-bold"> EGP : ${
                      data.price
                    }</h6>
                  </div>
                </div>
                </a>
          </div> `;
  }
}
