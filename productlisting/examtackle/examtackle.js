// Product Data
const products = [
    { id: 1, name: "Boys & Girls Casual T-shirt Pant  (Beige)", price: 299, BY: "Balder Fashion ", rating: 4.5, image: "https://rukminim2.flixcart.com/image/612/612/xif0q/kids-apparel-combo/c/a/8/5-6-years-baba-suit-bestkid-balder-fashion-original-imah7jj4gxy4sjba.jpeg?q=70" },
    { id: 2, name: "Boys Party(Festive) Jacket Trouser  (NAVY BLUE)", price: 499, BY: "DENJIM FASHION ", rating: 4.2, image: "https://rukminim2.flixcart.com/image/612/612/xif0q/kids-apparel-combo/c/s/s/5-6-years-blz-blue-gunatit-original-imagru5evnzmbtqz.jpeg?q=70" },
    { id: 3, name: "Girls Party(Festive) Sweatshirt Sweatshirt, Sweatpant", price: 499, BY: "PORPY", rating: 3.8, image: "https://rukminim2.flixcart.com/image/612/612/xif0q/kids-apparel-combo/t/o/3/6-9-months-hudyset-avovu-original-imagyujqzk6x9feq.jpeg?q=70" },
    { id: 4, name: "Girls Calf Length Casual Dress  (Pink, Fashion Sleeve)", price: 699, BY: "PORPY", rating: 4.7, image: "https://rukminim2.flixcart.com/image/612/612/xif0q/kids-dress/g/d/d/11-12-years-kids-gowns-dress-ethit-original-imah6rzjwhsegtdg.jpeg?q=70" },
    { id: 5, name: "Boys & Girls Casual T-shirt Pant", price: 999, BY: "Balder Fashion ", rating: 4.8, image: "https://rukminim2.flixcart.com/image/612/612/xif0q/kids-apparel-combo/u/z/f/3-6-months-t-wf03-emerald-under-mars-infiniti-original-imah4f5uac6dy5hr.jpeg?q=70" },
    { id: 6, name: "Boys & Girls Casual T-shirt Pant", price: 699, BY: "Balder Fashion ", rating: 3.9, image: "https://rukminim2.flixcart.com/image/612/612/kvzkosw0/kids-apparel-combo/t/s/p/12-18-months-t-wf03-green-what-round-mars-infiniti-original-imag8rskfqfsx5rs.jpeg?q=70" },
    { id: 7, name: "Boys & Girls Printed Denim Jacket", price: 559, BY: "insha fashion", rating: 4.3, image: "https://rukminim2.flixcart.com/image/612/612/xif0q/jacket/a/7/x/5-6-years-yes-006-fashion-breeze-original-imagxx2th2nnnhgc.jpeg?q=70" },
    { id: 8, name: "Boys & Girls Casual T-shirt Track Pants", price: 699, BY: "PORPY", rating: 4.9, image: "https://rukminim2.flixcart.com/image/612/612/xif0q/kids-apparel-combo/r/q/4/3-4-years-king-bl-elpixie-fashion-original-imah4v53nstjmzam.jpeg?q=70" },
    { id: 9, name: "Boys & Girls Printed Denim Jacket", price: 799, BY: "insha Fashion", rating: 3.5, image: "https://rukminim2.flixcart.com/image/612/612/xif0q/jacket/a/0/m/2-3-years-1-no-black-blast-jacket-moster-insha-fashion-original-imaguv9c6femughg.jpeg?q=70" },
    { id: 10, name: "Track Pant For Boys & Girls", price: 499, BY: "Blary FASHION PLANET", rating: 4.0, image: "https://rukminim2.flixcart.com/image/612/612/xif0q/kids-track-pant/z/g/k/18-24-months-kids-blk-crg-blary-fashion-planet-original-imahyukksku4qmgh.jpeg?q=70" }
  ];
  
  // Variables
  const productGrid = document.getElementById("product-grid");
  const priceFilter = document.getElementById("price-filter");
  const priceValue = document.getElementById("price-value");
  const BYFilters = document.querySelectorAll(".BY-filter");
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
  
    // Filter by BY
    const selectedBYs = Array.from(BYFilters)
      .filter(filter => filter.checked)
      .map(filter => filter.value);
    if (selectedBYs.length > 0) {
      filteredProducts = filteredProducts.filter(product => selectedBYs.includes(product.BY));
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
          <p>BY: ${product.BY}</p>
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
  
  BYFilters.forEach(filter =>
    filter.addEventListener("change", filterAndSortProducts)
  );
  
  ratingFilters.forEach(filter =>
    filter.addEventListener("change", filterAndSortProducts)
  );
  
  sortBy.addEventListener("change", filterAndSortProducts);
  
  searchInput.addEventListener("input", filterAndSortProducts);
  
  // Initial Load
  filterAndSortProducts();
  