"use strict";

const openCartBtn = document.querySelector('.header__cart-wrp');
const cartEl = document.querySelector('.header__cart');
const cartCounterEl = document.querySelector('.header__cart-counter');
const cartTotalEl = document.querySelector('.header__cart-total');
const cartTotalValueEl = document.querySelector('.header__cart-value');

openCartBtn.addEventListener('click', function () {
    cartEl.classList.toggle('hidden');
});

let cart = {};

function addProductToObject(productId) {
    if (!(productId in cart)) {
        cart[productId] = 1;
    } else {
        cart[productId]++;
    }
}

function renderProductInCart(productId) {
    let productExist = document.querySelector(`.productCount[data-productId="${productId}"]`);
    if (productExist) {
        increaseProductCount(productId);
        recalculateSumForProduct(productId);
    } else {
        renderNewProductInCart(productId);
    }
}

function renderNewProductInCart(productId) {
    let productRow = `
        <div class="header__cart-content">
            <div>${products[productId].name}</div>
            <div>
                <span class="productCount" data-productId="${productId}">1</span> шт.
            </div>
            <div>$${products[productId].price}</div>
            <div>
                $<span class="productTotalRow" data-productId="${productId}">${products[productId].price}</span>
            </div>
        </div>
    `;
    cartTotalEl.insertAdjacentHTML("beforebegin", productRow);
}

function increaseProductCount(productId) {
    const productCountEl = document.querySelector(`.productCount[data-productId="${productId}"]`);
    productCountEl.textContent++;
}

function recalculateSumForProduct(productId) {
    const productTotalRowEl = document.querySelector(`.productTotalRow[data-productId="${productId}"]`);
    let totalPriceForRow = (cart[productId] * products[productId].price).toFixed(2);
    productTotalRowEl.textContent = totalPriceForRow;
}

function calculateAndRenderTotalCartSum() {
    let totalSum = 0;
    for (let productId in cart) {
        totalSum += cart[productId] * products[productId].price;
    }
    cartTotalValueEl.textContent = totalSum.toFixed(2);
}

function increaseProductsCount() {
    cartCounterEl.textContent++;
}

function addProductIntoCart(productId) {
    increaseProductsCount();
    addProductToObject(productId);
    renderProductInCart(productId);
    calculateAndRenderTotalCartSum();
}

