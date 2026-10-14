// Sample Product Data
const products = [
    { id: 1, name: "Tata Soulfull Millet Muesli, 0% Added Sugar, Naturally Cholestrol Free, Breakfast Cereal Pouch  (700 g)", price: 399, brand: "TATA Products", rating: 4.5, image: "https://rukminim2.flixcart.com/image/280/280/xif0q/cereal-flake/k/s/r/-original-imah5mpsnnpu7duv.jpeg?q=70" },
    { id: 2, name: "Saffola Muesli Choco Crunch with Flavour Pops | 15 in 1 Fruit and Nuts, Seeds, Millet Pouch  (450 g)", price: 209, brand: "SAFFOLA", rating: 4.2, image: "https://rukminim2.flixcart.com/image/280/280/xif0q/cereal-flake/d/c/c/-original-imahyyx7ehdnax4s.jpeg?q=70" },
    { id: 3, name: "Bagrry's crunchy Nutty Fruity with Seeds & Berries muesli Pouch  (1 kg)", price: 123, brand: "Braggy", rating: 3.8, image:"https://rukminim2.flixcart.com/image/280/280/xif0q/cereal-flake/h/j/8/-original-imah2df7bg8cykhr.jpeg?q=70" },
    { id: 4, name: "Kwality Crunchy Muesli Almonds & Raisins, 76% Multigrains, High in Fiber & Protein Plastic Bottle  (1 kg)", price: 301, brand: "Kwality", rating: 4.7, image: "https://rukminim2.flixcart.com/image/280/280/xif0q/cereal-flake/x/1/b/-original-imah3855mquukgmq.jpeg?q=70" },
    { id: 5, name: "Bikano Navratan Mixture  (1 kg)", price: 243, brand: "Bikaner", rating: 4.8, image: "https://rukminim2.flixcart.com/image/280/280/xif0q/snack-savourie/o/y/b/-original-imah5h8zkpapqzvh.jpeg?q=70" },
    { id: 6, name: "Too Yumm! Dahi Papdi Chaat Multigrain", price: 50, brand: "Too Yumm", rating: 3.9, image: "https://rukminim2.flixcart.com/image/280/280/xif0q/chips/g/0/m/-original-imah4a8fgxxys5vw.jpeg?q=70" },
    { id: 7, name: "Bingo Mad Angles Tomato Madness Chips  (60 g)", price: 40, brand: "BINGO", rating: 4.3, image: "https://rukminim2.flixcart.com/image/280/280/xif0q/chips/w/s/h/-original-imah4u5axxfvcp2j.jpeg?q=70" },
    { id: 8, name: "Kwality Extra lightness for Cakes, Biscuits, Pastries & Cooking Baking Powder Baking Powder ", price: 299, brand: "Kwality", rating: 4.9, image: "https://rukminim2.flixcart.com/image/280/280/xif0q/baking-ingredient/e/o/s/-original-imaguh62nhf5qfth.jpeg?q=70" },
    { id: 9, name: "Slurrp Farm Healthy Pancake Lovers Combo", price: 199, brand: "Pancake", rating: 3.5, image: "https://rukminim2.flixcart.com/image/280/280/xif0q/ready-mix/x/o/r/-original-imah4twsjhy8jvnm.jpeg?q=70" },
    { id: 10, name:"HORLICKS", price: 499, brand: "HORLICKS Nutrition Drink Jar ", rating: 4.0, image: "https://rukminim2.flixcart.com/image/280/280/xif0q/milk-drink-mix/d/l/w/-original-imah3zwvjwmrvh8g.jpeg?q=70" }
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
  