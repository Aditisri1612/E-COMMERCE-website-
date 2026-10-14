// Sample Product Data
const products = [
    { id: 1, name: "Women Cotton Blend Kurta Palazzo Dupatta Set", price: 799, brand: "INDO ERA", rating: 4.5, image: "https://rukminim2.flixcart.com/image/612/612/xif0q/ethnic-set/w/m/p/l-kd4gn4028-indo-era-original-imah2hphd6ewhyqf.jpeg?q=70" },
    { id: 2, name: "Women Silk Blend Kurta Pant Dupatta Set", price: 899, brand: "INDO ERA", rating: 4.2, image: "https://rukminim2.flixcart.com/image/612/612/xif0q/ethnic-set/e/u/e/xs-iestr9460-indo-era-original-imah5jhvfanuwr2p.jpeg?q=70" },
    { id: 3, name: "SKDASSORTED8655 Printed Kurta, Churidar & Dupatta Set", price: 1099, brand: "BIBO", rating: 3.8, image: "https://rukminim2.flixcart.com/image/612/612/xif0q/salwar-kurta-dupatta/b/o/v/l-skdassorted8655ss23dul-sea-blu-biba-original-imagmy5epkqm3rmr.jpeg?q=70" },
    { id: 4, name: "Embroidered Kurta, Trouser/Pant & Dupatta Set", price: 999, brand: "BIBO", rating: 4.7, image: "https://rukminim2.flixcart.com/image/612/612/xif0q/salwar-kurta-dupatta/2/1/q/l-skdbnrsi8852aw23mrnblk-biba-original-imagrk4tamwgmzzr.jpeg?q=70" },
    { id: 5, name: "Women Pure Cotton Kurta Set", price: 899, brand: "LIBAS", rating: 4.8, image: "https://rukminim2.flixcart.com/image/612/612/xif0q/ethnic-set/l/y/g/m-27735-libas-original-imahyvhg6cfb9x7m.jpeg?q=70" },
    { id: 6, name: "Women Cotton Blend Kurta Set", price: 999, brand: "LIBAS", rating: 3.9, image: "https://rukminim2.flixcart.com/image/612/612/xif0q/ethnic-set/0/s/w/xl-34540-libas-original-imagqg8hvfdehsak.jpeg?q=70" },
    { id: 7, name: "Women Pure Cotton Kurta Pant Dupatta Set", price: 2499, brand: "LAMBA CREATIONS", rating: 4.3, image: "https://rukminim2.flixcart.com/image/612/612/xif0q/ethnic-set/g/a/j/s-doblf-lamba-creations-original-imahfjhzjvmuf78x.jpeg?q=70" },
    { id: 8, name: "Women Pure Cotton Kurti Pant Dupatta Set ", price: 999, brand: "LAMBA CREATIONS", rating: 4.9, image: "https://rukminim2.flixcart.com/image/612/612/xif0q/ethnic-set/y/g/e/xs-flower-dupatta-set-lamba-creations-original-imah3a9zshnphhjg.jpeg?q=70" },
    { id: 9, name: "Women Cotton Blend Kurta Pant Dupatta Set", price: 1499, brand: "SAMAH", rating: 3.5, image: "https://rukminim2.flixcart.com/image/612/612/xif0q/ethnic-set/v/z/z/xxl-174kbd1865-samah-original-imah48ryd2qvrumd.jpeg?q=70" },
    { id: 10, name: "Women Cotton Blend Kurta Pant Dupatta Set", price: 499, brand: "SAMAH", rating: 4.0, image: "https://rukminim2.flixcart.com/image/612/612/xif0q/ethnic-set/i/v/i/s-190kbd2023-samah-original-imah542vgwku9dxg.jpeg?q=70" }
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
  
  // Add to Cart
  function addToCart(productId) {
    const product = products.find(product => product.id === productId);
    if (!cart.includes(product)) {
      cart.push(product);
      alert(`${product.name} has been added to your cart.`);
    } else {
      alert(`${product.name} is already in your cart.`);
    }
    console.log("Cart:", cart);
  }
  
  // Add to Wishlist
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
  