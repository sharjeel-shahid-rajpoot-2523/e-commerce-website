
const products = [
    { id: 0, image: 'img/products/f1.jpg', title: 'Colorful Abstract printed - Half sleeve shirt', price: 120 },
    { id: 1, image: 'img/products/f2.jpg', title: 'Astral Navigator - Half sleeve shirt', price: 60 },
    { id: 2, image: 'img/blog/b5.jpg', title: 'Cosmic Drift - Jersy', price: 230 },
    { id: 3, image: 'img/products/f4.jpg', title: 'Printed Half sleeve collor shirt', price: 100 },
    { id: 4, image: 'img/products/f5.jpg', title: 'Purple Printed Half sleeve collor shirt', price: 120 },
    { id: 5, image: 'img/products/f6.jpg', title: 'Cartoon Astronaut - Hoodie', price: 60 },
    { id: 6, image: 'img/products/f7.jpg', title: 'Cartoon Astronaut - Baggy Pants', price: 230 },
    { id: 7, image: 'img/products/f8.jpg', title: 'Cartoon Astronaut - Skirt', price: 100 },
    { id: 8, image: 'img/products/n1.jpg', title: 'Orbit Odyssey - Dress shirt', price: 120 },
    { id: 9, image: 'img/products/n2.jpg', title: 'Slim Fit check elastic shirt', price: 60 },
    { id: 10, image: 'img/products/n3.jpg', title: 'Self Textured Elastic shirt - Plain white', price: 230 },
    { id: 11, image: 'img/products/n4.jpg', title: 'Cartoon Astronaut - Elastic Half sleeve shirt', price: 100 },
    { id: 12, image: 'img/products/n5.jpg', title: 'Cartoon Astronaut - Full sleeve shirt', price: 120 },
    { id: 13, image: 'img/products/n6.jpg', title: 'Cartoon Astronaut - Formal Jeans', price: 60 },
    { id: 14, image: 'img/products/n7.jpg', title: 'Elastic Full sleeve shirt', price: 230 },
    { id: 15, image: 'img/products/n8.jpg', title: 'Semi Formal Half Sleeve - Gray check', price: 100 },
    { id: 16, image: 'img/products/g1.webp', title: 'IG Rambo Bandna - black', price: 240 },
    { id: 17, image: 'img/products/g2.webp', title: 'Herculean Stringer - Burgundy', price: 160 },
    { id: 18, image: 'img/products/g3.webp', title: 'Dry fit academy trousers - white', price: 175 },
    { id: 19, image: 'img/products/g4.webp', title: 'IRON Traning shorts 2.0 - red', price: 180 },
    { id: 20, image: 'img/products/g5.webp', title: 'Rest Day Hoodie - blue', price: 100 },
    { id: 21, image: 'img/products/g6.webp', title: 'Ozone compression Long sleeve tee - blue', price: 135 },
    { id: 22, image: 'img/products/g7.webp', title: 'IRON Gear sports jacket - red', price: 230 },
    { id: 23, image: 'img/products/g8.webp', title: 'URBAN Oversized Tee - black', price: 100 },
    { id: 24, image: 'img/products/g9.webp', title: 'URBAN Oversized Tee - Spectra Yellow', price: 120 },
    { id: 25, image: 'img/products/g10.webp', title: 'Mensoo New City Oversized T shirt - orange', price: 60 },
    { id: 26, image: 'img/products/g11.webp', title: 'Retro Horn shape - Sunglasses', price: 12 },
    { id: 27, image: 'img/products/g12.webp', title: 'Color-block Billfold Leather Wallet', price: 15 },
    { id: 28, image: 'img/products/g15.webp', title: 'INTEGRITY Fragrances', price: 120 },
    { id: 29, image: 'img/products/g16.webp', title: 'Lattafa Badee AL Oud for glory - 100ml', price: 220 },
    { id: 30, image: 'img/products/g20.jpg', title: 'Jewellery Mens Classic - Wrap Box chain', price: 150 },
    { id: 31, image: 'img/products/g18.jpg', title: 'Fossil Machine Mens Watch', price: 300 }
]

const categories = {
    'Half sleeve shirts': [0, 1, 3, 4, 11, 15],
    'Full sleeve shirts': [8, 9, 10, 12, 14],
    'T shirts': [23, 24, 25],
    'Hoodies': [5, 20, 22],
    'Jeans': [6, 13],
    'Accessories': [26, 27, 30, 31],
    'Perfumes': [28, 29],
    'All': [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18,
        19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31]
}

const cart = [];
let currentProduct = null;
let currentQuantity = 1;

document.addEventListener('DOMContentLoaded', function () {
    const categorySelect = document.getElementById('category-select');
    for (const category in categories) {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category;
        categorySelect.appendChild(option);
    }

    categorySelect.addEventListener('change', function () {
        const selectedCategory = categorySelect.value;
        const productIds = categories[selectedCategory] || [];
        // filter the product arrays and include only those arrays who are in product id's
        const filteredProducts = products.filter(product => productIds.includes(product.id));
        displayProducts(filteredProducts);
    });
    displayProducts(products);
    updateCartCount();
})

function displayProducts(productList) {
    const rootElement = document.getElementById('root');
    rootElement.innerHTML = productList.length > 0
        ? productList.map((item) => {
            const { id, image, title, price } = item;
            return (
                `<div class='box'>
                    <div class='img-box'>
                        <img class='images' src="${image}" alt="${title}">
                    </div>
                    <div class='bottom'>
                        <p>${title}</p>
                        <h2>$ ${price}.00</h2>
                        <button onclick='addToCart(${id})'>Add to cart</button>
                    </div>
                </div>`
            );
        }).join('')
        : "<p>No products found for this category.</p>";
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    currentProduct = product;
    showPopup(currentProduct);
}

function showPopup(product) {
    document.getElementById('popup-image').src = product.image;
    document.getElementById('popup-title').innerText = product.title;
    document.getElementById('popup-price').innerText = `$ ${product.price}.00`;

    currentQuantity = 1;
    document.getElementById('quantity-input').value = currentQuantity;

    const popup = document.getElementById('popup');
    popup.classList.remove('hidden');
    popup.classList.add('visible');
}

function closePopup() {
    const popup = document.getElementById('popup');
    popup.classList.remove('visible');
    popup.classList.add('hidden');
}

function changeQuantity(amount) {
    currentQuantity = Math.max(1, currentQuantity + amount);
    document.getElementById('quantity-input').value = currentQuantity;
}

function confirmAddToCart() {
    const selectedSize = document.getElementById('size-select').value;
    const itemInCart = cart.find(item => item.id === currentProduct.id && item.size === selectedSize);

    if (itemInCart) {
        itemInCart.quantity += currentQuantity;
    } else {
        cart.push({ ...currentProduct, quantity: currentQuantity, size: selectedSize });
    }
    localStorage.setItem('cart', JSON.stringify(cart));

    displayCart();
    closePopup();
}

function displayCart() {
    let total = 0;
    if (cart.length === 0) {
        document.getElementById('cartItem').innerHTML = "Your cart is empty";
        document.getElementById("total").innerHTML = "$ 0.00";
    } else {
        document.getElementById("cartItem").innerHTML = cart.map((item, index) => {
            const { image, title, price, quantity, size } = item;
            total += price * quantity;
            return (
                `<div class='cart-item'>
                    <div class='row-img'>
                        <img class='rowimg' src="${image}" alt="${title}">
                    </div>
                    <p style='font-size:12px;'>${title} (x${quantity}) - Size: ${size}</p>
                    <h2 style='font-size: 15px;'>$ ${price * quantity}.00</h2>
                    <i class='fa-solid fa-trash' onclick='delElement(${index})'></i>
                </div>`
            );
        }).join('');
        document.getElementById("total").innerHTML = "$ " + total + ".00";
    }
    updateCartCount();
}

function delElement(index) {
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCart();
}

function updateCartCount() {
    const cartCount = document.getElementById('cart-count');
    cartCount.textContent = cart.reduce((total, item) => total + item.quantity, 0);
}