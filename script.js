
// Mobile Navigation
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");
});

document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", () => {
        navLinks.classList.remove("active");
    });
});

// Shopping Cart
let cart = [];

const products = {
    "Italian Pizza": 12,
    "Classic Burger": 10,
    "Grilled Special": 15
};

// Create Cart Section
const cartSection = document.createElement("div");
cartSection.className = "cart-box container";

cartSection.innerHTML = `
    <h2>Your Shopping Cart</h2>
    <div id="cartItems">Your cart is empty.</div>
    <h3 id="cartTotal">Total: $0.00</h3>

    <button id="checkoutBtn" class="primary-btn">
        Proceed to Checkout
    </button>

    <form id="checkoutForm" class="checkout-form" style="display:none">
        <h2>Delivery Details</h2>
        <input type="text" id="customerName" placeholder="Your Name" required>
        <input type="tel" id="customerPhone" placeholder="Phone Number" required>
        <textarea id="customerAddress" placeholder="Delivery Address" required></textarea>
        <button type="submit" class="primary-btn">Confirm Order</button>
    </form>

    <p id="orderMessage" aria-live="polite"></p>
`;

document.querySelector(".menu-grid").after(cartSection);

const cartItems = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal");

// Add Items to Cart
document.querySelectorAll(".add-btn").forEach(button => {
    button.addEventListener("click", () => {
        const name = button.dataset.name;
        const existing = cart.find(item => item.name === name);

        if (existing) {
            existing.quantity++;
        } else {
            cart.push({
                name: name,
                price: products[name],
                quantity: 1
            });
        }

        updateCart();
    });
});

// Update Cart
function updateCart() {
    if (cart.length === 0) {
        cartItems.textContent = "Your cart is empty.";
    } else {
        cartItems.innerHTML = cart.map((item, index) => `
            <div class="cart-item">
                <strong>${item.name}</strong>
                <span>$${(item.price * item.quantity).toFixed(2)}</span>
                <button onclick="changeQuantity(${index}, -1)">−</button>
                <span>${item.quantity}</span>
                <button onclick="changeQuantity(${index}, 1)">+</button>
                <button onclick="removeItem(${index})">Remove</button>
            </div>
        `).join("");
    }

    const total = cart.reduce(
        (sum, item) => sum + item.price * item.quantity, 0
    );

    cartTotal.textContent = `Total: $${total.toFixed(2)}`;
}

// Change Quantity
function changeQuantity(index, amount) {
    cart[index].quantity += amount;

    if (cart[index].quantity <= 0) {
        cart.splice(index, 1);
    }

    updateCart();
}

// Remove Item
function removeItem(index) {
    cart.splice(index, 1);
    updateCart();
}

// Checkout
const checkoutBtn = document.getElementById("checkoutBtn");
const checkoutForm = document.getElementById("checkoutForm");

checkoutBtn.addEventListener("click", () => {
    if (cart.length === 0) {
        alert("Please add food to your cart first!");
        return;
    }

    checkoutForm.style.display = "grid";
    checkoutForm.scrollIntoView({ behavior: "smooth" });
});

// Confirm Order (Demo Only)
checkoutForm.addEventListener("submit", (event) => {
    event.preventDefault();

    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    const name = document.getElementById("customerName").value;
    const total = cart.reduce(
        (sum, item) => sum + item.price * item.quantity, 0
    );

    document.getElementById("orderMessage").textContent =
        `Thank you ${name}! Your demo order total is $${total.toFixed(2)}.`;

    cart = [];
    updateCart();

    checkoutForm.reset();
    checkoutForm.style.display = "none";
});

// Scroll Animations
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("show");
        }
    });
}, { threshold: 0.15 });

document.querySelectorAll(
    ".food-card, .about-text, .about-image"
).forEach(item => {
    item.classList.add("reveal");
    observer.observe(item);
});
// Customer Reviews
const reviewForm = document.getElementById("reviewForm");
const reviewsGrid = document.getElementById("reviewsGrid");

reviewForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = document.getElementById("reviewName").value.trim();
    const rating = Number(document.getElementById("reviewRating").value);
    const message = document.getElementById("reviewText").value.trim();

    if (!name || !message) return;

    const reviewCard = document.createElement("article");
    reviewCard.className = "review-card";

    const stars = "★".repeat(rating) + "☆".repeat(5 - rating);

    const starElement = document.createElement("div");
    starElement.className = "stars";
    starElement.textContent = stars;

    const messageElement = document.createElement("p");
    messageElement.textContent = message;

    const nameElement = document.createElement("h3");
    nameElement.textContent = name;

    const labelElement = document.createElement("small");
    labelElement.textContent = "Customer Review";

    reviewCard.append(starElement, messageElement, nameElement, labelElement);
    reviewsGrid.prepend(reviewCard);

    reviewForm.reset();
    reviewCard.scrollIntoView({ behavior: "smooth", block: "center" });
});
// Table Reservation
const reservationForm = document.getElementById("reservationForm");

if (reservationForm) {
    const bookingDate = document.getElementById("bookingDate");
    const reservationMessage = document.getElementById("reservationMessage");

    // Past dates disable karo
    const today = new Date();
    const localDate = new Date(
        today.getTime() - today.getTimezoneOffset() * 60000
    ).toISOString().split("T")[0];

    bookingDate.min = localDate;

    reservationForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const name = document.getElementById("guestName").value.trim();
        const date = bookingDate.value;
        const time = document.getElementById("bookingTime").value;
        const guests = document.getElementById("guestCount").value;

        if (date < localDate) {
            reservationMessage.textContent =
                "Please select today or a future date.";
            return;
        }

        reservationMessage.textContent =
            `Thank you ${name}! Your demo reservation request is for ${guests} guests on ${date} at ${time}.`;

        reservationForm.reset();
        bookingDate.min = localDate;
    });
}
// Newsletter Subscription (Demo)
const newsletterForm = document.getElementById("newsletterForm");

if (newsletterForm) {
    newsletterForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const email = document.getElementById("newsletterEmail").value;
        const message = document.getElementById("newsletterMessage");

        message.textContent = "Thank you! Your demo subscription is successful.";

        newsletterForm.reset();
    });
}// Back To Top Button
const backToTop = document.getElementById("backToTop");

if (backToTop) {
    window.addEventListener("scroll", () => {
        if (window.scrollY > 300) {
            backToTop.classList.add("show-btn");
        } else {
            backToTop.classList.remove("show-btn");
        }
    });

    backToTop.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
}