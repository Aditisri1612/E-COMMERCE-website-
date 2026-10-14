// Sample Product Data
const products = [
    { id: 1, name: "Men Printed Crew Neck Cotton Blend Black T-Shirt", price: 599, brand: "PUMA", rating: 4.5, image: "https://rukminim2.flixcart.com/image/312/312/xif0q/t-shirt/c/q/a/5xl-68709201-puma-original-imah64swwzkqg42k.jpeg?q=70" },
    { id: 2, name: "Men Solid Round Neck Polyester Black T-Shirt", price: 809, brand: "ADIDAS", rating: 4.2, image: "https://rukminim2.flixcart.com/image/312/312/xif0q/t-shirt/n/l/j/m-jn3551-adidas-original-imah4qtvfsg7hh2y.jpeg?q=70" },
    { id: 3, name: "Men Slim Fit Solid Casual Shirt", price: 923, brand: "WROGN", rating: 3.8, image:"https://rukminim2.flixcart.com/image/312/312/kgfg2vk0-0/shirt/p/t/y/44-12275210-wrogn-original-imafwnwuvs3atkff.jpeg?q=70" },
    { id: 4, name: "Men Printed Round Neck Pure Cotton Dark Green T-Shirt", price: 301, brand: "ROADESTER", rating: 4.7, image: "https://rukminim2.flixcart.com/image/612/612/kevpwnk0-0/t-shirt/h/z/j/xxl-11999564-hrx-by-hrithik-roshan-original-imafvggfvmhbhzbt.jpeg?q=70" },
    { id: 5, name: "Men Printed Cotton Blend T-Shirt", price: 899, brand: "WROGN", rating: 4.8, image: "https://rukminim2.flixcart.com/image/612/612/xif0q/t-shirt/6/a/g/m-wsts0008f-wrogn-original-imah3yeyaj9afhza.jpeg?q=70" },
    { id: 6, name: "Men Printed Crew Cotton Blend T-Shirt", price: 999, brand: "ADIDAS", rating: 3.9, image: "https://rukminim2.flixcart.com/image/612/612/xif0q/t-shirt/g/d/r/-original-imah77hccc3e8ykr.jpeg?q=70" },
    { id: 7, name: "Men Printed Crew Neck Blend White T-Shirt", price: 1099, brand: "PUMA", rating: 4.3, image: "https://rukminim2.flixcart.com/image/612/612/xif0q/t-shirt/y/v/s/xxs-68709202-puma-original-imah64sw2ysmczhh.jpeg?q=70" },
    { id: 8, name: "Men Printed Crew Neck Blend T-Shirt", price: 1299, brand: "ROADESTER", rating: 4.9, image: "https://rukminim2.flixcart.com/image/612/612/xif0q/t-shirt/p/s/x/s-30162643-roadster-original-imah4ztzqsp5my7f.jpeg?q=70" },
    { id: 9, name: "Men Printed Crew Neck Cotton Blend T-Shirt", price: 899, brand: "ADIDAS", rating: 3.5, image: "https://rukminim2.flixcart.com/image/612/612/xif0q/t-shirt/6/g/h/-original-imahywr4kdzqgkja.jpeg?q=70" },
    { id: 10, name:"Men Printed Crew Neck Cotton Blend T-Shirt", price: 1499, brand: "ROADESTER", rating: 4.0, image: "https://rukminim2.flixcart.com/image/612/612/kod858w0/t-shirt/s/t/8/l-12816870-here-now-original-imag2uyqqwzsqakb.jpeg?q=70" }
  ];
  
  // Variables
  const productGrid = document.getElementById("product-grid");
  const priceFilter = document.getElementById("price-filter");
  const priceValue = document.getElementById("price-value");
  const brandFilters = document.querySelectorAll(".brand-filter");
  const ratingFilters = document.getElementsByName("rating-filter");
  const sortBy = document.getElementById("sort-by");
  const searchInput = document.getElementById("search-bar");
  
  // Cart and Wishlist
  let cart = [];
  let wishlist = [];
  
  // Filter and Sort Products
  function filterAndSortProducts() {
    let filteredProducts = products;
  
    // Filter by price
    const maxPrice = parseInt(priceFilter.value);
    filteredProducts = filteredProducts.filter(product => product.price <= maxPrice);
  
    // Filter by brand
    const selectedBrands = Array.from(brandFilters)
      .filter(filter => filter.checked)
      .map(filter => filter.value);
    if (selectedBrands.length > 0) {
      filteredProducts = filteredProducts.filter(product => selectedBrands.includes(product.brand));
    }
  
    // Filter by rating
    const selectedRating = Array.from(ratingFilters).find(filter => filter.checked)?.value;
    if (selectedRating) {
      filteredProducts = filteredProducts.filter(product => product.rating >= selectedRating);
    }
  
    // Search filter
    const searchTerm = searchInput.value.toLowerCase();
    if (searchTerm) {
      filteredProducts = filteredProducts.filter(product =>
        product.name.toLowerCase().includes(searchTerm)
      );
    }
  
    // Sort products
    const sortValue = sortBy.value;
    if (sortValue === "price-low-high") {
      filteredProducts.sort((a, b) => a.price - b.price);
    } else if (sortValue === "price-high-low") {
      filteredProducts.sort((a, b) => b.price - a.price);
    } else if (sortValue === "rating-high-low") {
      filteredProducts.sort((a, b) => b.rating - a.rating);
    }
  
    displayProducts(filteredProducts);
  }
  
  // Display Products
  function displayProducts(products) {
    productGrid.innerHTML = "";
    products.forEach(product => {
      productGrid.innerHTML += `
        <div class="product-card">
          <img src="${product.image}" alt="${product.name}">
          <h3>${product.name}</h3>
          <p>Price: ₹${product.price}</p>
          <p class="product-rating">★ ${product.rating}</p>
          <p>Brand: ${product.brand}</p>
          <div class="product-actions">
            <button onclick="addToCart(${product.id})">Add to Cart</button>
            <button onclick="addToWishlist(${product.id})">Wishlist</button>
          </div>
        </div>
      `;
    });
  }
  
// Add to Cart ----- SHOP NOW
function addToCart(productId) {
  const product = products.find(product => product.id === productId);
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  
  if (!cart.some(item => item.id === productId)) {
    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`${product.name} has been added to your cart.`);
  } else {
    alert(`${product.name} is already in your cart.`);
  }
  console.log("Cart:", cart);
}

  // Add to Wishlist----- SHOP NOW
  function addToWishlist(productId) {
    const product = products.find(product => product.id === productId);
    if (!wishlist.includes(product)) {
      wishlist.push(product);
      alert(`${product.name} has been added to your wishlist.`);
    } else {
      alert(`${product.name} is already in your wishlist.`);
    }
    console.log("Wishlist:", wishlist);
  }
  
  // Event Listeners
  priceFilter.addEventListener("input", () => {
    priceValue.textContent = priceFilter.value;
    filterAndSortProducts();
  });
  
  brandFilters.forEach(filter =>
    filter.addEventListener("change", filterAndSortProducts)
  );
  
  ratingFilters.forEach(filter =>
    filter.addEventListener("change", filterAndSortProducts)
  );
  
  sortBy.addEventListener("change", filterAndSortProducts);
  
  searchInput.addEventListener("input", filterAndSortProducts);
  
  // Initial Load
  filterAndSortProducts();
  