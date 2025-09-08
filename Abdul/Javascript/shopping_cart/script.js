// Product Data
const products = [
    { id: 1, name: "Laptop Sleeve", price: 499, img: './images/laptop.avif', quantity: 15 },
    { id: 2, name: "Wireless Mouse", price: 599, img: './Images/mouse.avif', quantity: 20 },
    { id: 3, name: "Bluetooth Device", price: 1199, img: './images/bt.webp', quantity: 15 },
    { id: 4, name: "HDMI Cable", price: 299, img: './images/hdmi.avif', quantity: 10 },
    { id: 5, name: "Smart Watch", price: 1599, img: './images/watch.avif', quantity: 15 },
    { id: 6, name: "Mobile phone", price: 15599, img: './images/phone.avif', quantity: 25 },
    { id: 7, name: "Macbook", price: 111599, img: './images/mac.avif', quantity: 25 },
    { id: 8, name: "Iphone", price: 41599, img: './images/iphne.avif', quantity: 30 }
];

// Restore cart from localStorage if available
let cart = [];
const savedCart = localStorage.getItem("cart");
if (savedCart) {
    cart = JSON.parse(savedCart);
}

// Render all products
function renderProducts() {
    const container = document.getElementById("productList");
    container.innerHTML = "";
    products.forEach((p) => {
        const div = document.createElement("div");
        div.className = "product";
        div.innerHTML = `
            <img class="productImg" src="${p.img}" />
            <h3>${p.name}</h3>
            <p>₹${p.price}</p>
            <button onclick="addToCart(${p.id})">Add to Cart</button>
        `;
        container.appendChild(div);
    });
}

// Add to cart
function addToCart(id) {
    const prod = products.find(p => p.id === id);
    const item = cart.find(i => i.id === id);
    if (item) {
        item.qty += 1;
    } else {
        cart.push({ ...prod, qty: 1 });
    }
    updateCart();
}

// Decrease quantity
function decreaseQty(id) {
    const itemIndex = cart.findIndex(i => i.id === id);
    if (itemIndex === -1) return;
    if (cart[itemIndex].qty > 1) {
        cart[itemIndex].qty -= 1;
    } else {
        cart.splice(itemIndex, 1);
    }
    updateCart();
}

// Increase quantity with stock check
function increaseQty(id) {
    const item = cart.find(i => i.id === id);
    const product = products.find(p => p.id === id);
    if (item && product) {
        if (item.qty < product.quantity) {
            item.qty += 1;
            updateCart();
        } else {
            alert("You can't add more. Stock limit reached.");
        }
    }
}

// Remove item from cart
function removeItem(id) {
    cart = cart.filter(i => i.id !== id);
    updateCart();
}

// Update cart display and save to localStorage
function updateCart() {
    const cartDiv = document.getElementById("cart");
    const totalEl = document.getElementById("total");
    const emptyMsg = document.getElementById("emptyMsg");
    const checkoutBtn = document.getElementById("checkoutBtn");

    cartDiv.innerHTML = "";
    let total = 0;

    cart.forEach((item) => {
        total += item.price * item.qty;
        const row = document.createElement("div");
        row.className = "cart-item";
        row.innerHTML = `
            <div class="cart-item-left">
                <img class="cartImg" src="${item.img}" alt="${item.name}">
                <span style="font-size:16px">${item.name} x ${item.qty} = ₹${item.price * item.qty}</span>
            </div>
            <div class="cart-item-right">
                <button onclick="decreaseQty(${item.id})">-</button>
                <button onclick="removeItem(${item.id})"><i class="fa-solid fa-trash"></i></button>
                <button onclick="increaseQty(${item.id})">+</button>
            </div>
        `;
        cartDiv.appendChild(row);
    });

    totalEl.textContent = total;
    emptyMsg.style.display = cart.length ? "none" : "block";
    cartDiv.style.display = cart.length ? "block" : "none";
    checkoutBtn.disabled = cart.length ? false : true;
    localStorage.setItem("cart", JSON.stringify(cart));

    const cartCountEl = document.getElementById("cart-count");
    const totalQty = cart.length;
    cartCountEl.textContent = totalQty;
    cartCountEl.style.display = totalQty > 0 ? "inline-block" : "none";

}

function showCheckout() {
    if (!cart.length) return;
    const summary = document.getElementById("orderSummary");
    const grand = document.getElementById("grandTotal");
    summary.innerHTML = "";
    let grandTotal = 0;
    cart.forEach((item) => {
        const line = document.createElement("p");
        line.textContent = `${item.name} x ${item.qty} = ₹${item.price * item.qty}`;
        summary.appendChild(line);
        grandTotal += item.price * item.qty;
    });
    grand.textContent = grandTotal;
    document.getElementById("checkout").style.display = "block";
}

function cancelCheckout() {
    document.getElementById("checkout").style.display = "none";
}

function pay() {
    alert("Payment Successful");
    cart = [];
    localStorage.removeItem("cart");
    document.getElementById("checkout").style.display = "none";
    updateCart();
}

renderProducts();
updateCart();
