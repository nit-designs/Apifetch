var formSearch = document.querySelector('.search');
var productGrid = document.querySelector('.product-grid');

//if the button is submit invoke the addEventListner
formSearch.addEventListener('submit', (e) => {
  e.preventDefault();  
  var itemSearch = document.querySelector('.inp_srh');
  var searchValue = itemSearch.value;
  if (searchValue) {
    products(searchValue);
    itemSearch.value = '';
  }
});

//Convert by using fetch promises to response and promises
async function urlshort(url) {
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

async function products(value) {
  try {
    const product = await urlshort(`https://makeup-api.herokuapp.com/api/v1/products.json?brand=${value}`);
    console.log(product);
    productGrid.innerHTML = '';
    for (let i of product) {
      var productEl = document.createElement('div');
      productEl.className = 'product';
      var productImage = document.createElement('img');
      productImage.setAttribute('src', i.image_link);
      productEl.append(productImage);
      var productBrand = document.createElement('p');
      productBrand.style.fontWeight = 'bold';
      productBrand.innerText = `Brand: ${i.brand}`;
      productEl.append(productBrand);
      var productName = document.createElement('p');
      productName.innerText =`Name:${i.name}`;
      productEl.append(productName);
      var productPrice = document.createElement('p');
      productPrice.innerText = `Price:${i.price}`;
      productEl.append(productPrice);
      var productDescription = document.createElement('p');
      productDescription.innerText = `Description: ${i.description}`;
      productEl.append(productDescription);
      var productLink = document.createElement('a');
      productLink.setAttribute('href',i.product_link);
      productLink.setAttribute('target', '_blank');
      productLink.innerText = 'View Product';
      productEl.append(productLink);
      productGrid.append(productEl);
      
    }
  } catch (error) {
    console.log(error.message);
  }
}

