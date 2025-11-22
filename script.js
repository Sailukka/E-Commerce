// Simple product data
const products = [
    {
      id: 1,
      name: "Wireless Headphones",
      price: 59.99,
      description: "Comfortable, noise-isolating headphones with 20 hours battery.",
      image: "https://images.pexels.com/photos/3394664/pexels-photo-3394664.jpeg?auto=compress&cs=tinysrgb&w=600"
    },
    {
      id: 2,
      name: "Smart Watch",
      price: 99.99,
      description: "Track your fitness, heart rate, and notifications.",
      image: "https://images.pexels.com/photos/2773940/pexels-photo-2773940.jpeg?auto=compress&cs=tinysrgb&w=600"
    },
    {
      id: 3,
      name: "Laptop Backpack",
      price: 39.99,
      description: "Water-resistant backpack with padded laptop sleeve.",
      image: "https://images.pexels.com/photos/374574/pexels-photo-374574.jpeg?auto=compress&cs=tinysrgb&w=600"
    },
    {
      id: 4,
      name: "Mechanical Keyboard",
      price: 79.99,
      description: "RGB mechanical keyboard with blue switches.",
      image: "https://images.pexels.com/photos/2115257/pexels-photo-2115257.jpeg?auto=compress&cs=tinysrgb&w=600"
    }
  ];
  
  let cart = [];
  
  // DOM elements
  const productsGrid = document.getElementById("products-grid");
  const cartSidebar = document.getElementById("cart-sidebar");
  const cartToggle = document.getElementById("cart-toggle");
  const cartClose = document.getElementById("cart-close");
  const overlay = document.getElementById("overlay");
  const cartItemsContainer = document.getElementById("cart-items");
  const cartTotalEl = document.getElementById("cart-total");
  const cartCountEl = document.getElementById("cart-count");
  const checkoutBtn = document.getElementById("checkout-btn");
  
  // Render products to the grid
  function renderProducts() {
    productsGrid.innerHTML = "";
    products.forEach((product) => {
      const card = document.createElement("div");
      card.className = "product-card";
  
      card.innerHTML = `
        <img src="${product.image}" alt="${product.name}" class="product-image" />
        <div class="product-title">${product.name}</div>
        <div class="product-description">${product.description}</div>
        <div class="product-bottom">
          <span class="product-price">$${product.price.toFixed(2)}</span>
          <button class="btn-primary add-to-cart" data-id="${product.id}">
            Add to Cart
          </button>
        </div>
      `;
  
      productsGrid.appendChild(card);
    });
  
    // Attach event listeners to add-to-cart buttons
    const addButtons = document.querySelectorAll(".add-to-cart");
    addButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        const id = parseInt(btn.getAttribute("data-id"), 10);
        addToCart(id);
      });
    });
  }
  
  // Add product to cart
  function addToCart(productId) {
    const product = products.find((p) => p.id === productId);
    if (!product) return;
  
    const existing = cart.find((item) => item.id === productId);
  
    if (existing) {
      existing.qty += 1;
    } else {
      cart.push({
        id: product.id,
        name: product.name,
        price: product.price,
        qty: 1
      });
    }
  
    updateCartUI();
    openCart();
  }
  
  // Remove item from cart
  function removeFromCart(productId) {
    cart = cart.filter((item) => item.id !== productId);
    updateCartUI();
  }
  
  // Change quantity
  function changeQuantity(productId, delta) {
    const item = cart.find((i) => i.id === productId);
    if (!item) return;
    item.qty += delta;
    if (item.qty <= 0) {
      removeFromCart(productId);
    } else {
      updateCartUI();
    }
  }
  
  // Update cart UI
  function updateCartUI() {
    cartItemsContainer.innerHTML = "";
  
    let total = 0;
    let totalItems = 0;
  
    cart.forEach((item) => {
      const itemTotal = item.price * item.qty;
      total += itemTotal;
      totalItems += item.qty;
  
      const row = document.createElement("div");
      row.className = "cart-item";
  
      row.innerHTML = `
        <div class="cart-item-info">
          <div class="cart-item-title">${item.name}</div>
          <div class="cart-item-price">$${item.price.toFixed(2)}</div>
        </div>
        <div class="cart-item-controls">
          <button class="qty-btn" data-id="${item.id}" data-action="decrease">-</button>
          <span class="cart-item-qty">${item.qty}</span>
          <button class="qty-btn" data-id="${item.id}" data-action="increase">+</button>
        </div>
      `;
  
      cartItemsContainer.appendChild(row);
    });
  
    cartTotalEl.textContent = `$${total.toFixed(2)}`;
    cartCountEl.textContent = totalItems.toString();
  
    // Attach listeners to qty buttons
    const qtyButtons = cartItemsContainer.querySelectorAll(".qty-btn");
    qtyButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        const id = parseInt(btn.getAttribute("data-id"), 10);
        const action = btn.getAttribute("data-action");
        if (action === "increase") {
          changeQuantity(id, 1);
        } else if (action === "decrease") {
          changeQuantity(id, -1);
        }
      });
    });
  }
  
  // Open/close cart
  function openCart() {
    cartSidebar.classList.add("open");
    overlay.classList.add("show");
  }
  
  function closeCart() {
    cartSidebar.classList.remove("open");
    overlay.classList.remove("show");
  }
  
  // Event listeners
  cartToggle.addEventListener("click", openCart);
  cartClose.addEventListener("click", closeCart);
  overlay.addEventListener("click", closeCart);
  
  checkoutBtn.addEventListener("click", () => {
    if (cart.length === 0) {
      alert("Your cart is empty!");
      return;
    }
    alert("This is a demo. Implement checkout here.");
  });
  
  // Initialize
  document.addEventListener("DOMContentLoaded", () => {
    renderProducts();
    updateCartUI();
  });
  