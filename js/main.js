// ==========================================================================
// РЕНДЕР КАТАЛОГУ ТА КОРЗИНИ
// ==========================================================================

let currentBrand = "all";

function formatPrice(value) {
  return new Intl.NumberFormat("uk-UA").format(value) + " ₴";
}

function renderBrandTabs() {
  const wrap = document.getElementById("brandTabs");
  BRANDS.forEach((brand) => {
    const btn = document.createElement("button");
    btn.className = "brand-tab";
    btn.dataset.brand = brand;
    btn.textContent = brand;
    wrap.appendChild(btn);
  });

  wrap.addEventListener("click", (e) => {
    const btn = e.target.closest(".brand-tab");
    if (!btn) return;
    currentBrand = btn.dataset.brand;
    document.querySelectorAll(".brand-tab").forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    renderGrid();
  });
}

function renderGrid() {
  const grid = document.getElementById("productGrid");
  const items = currentBrand === "all"
    ? PRODUCTS
    : PRODUCTS.filter((p) => p.brand === currentBrand);

  grid.innerHTML = items.map((p) => `
    <div class="product-card">
      <div class="product-card__img">
        ${p.condition ? `<span class="product-card__badge">${p.condition}</span>` : ""}
        <img src="${p.image}" alt="${p.name}" loading="lazy" />
      </div>
      <div class="product-card__body">
        <div class="product-card__model">${p.brand} · ${p.model}</div>
        <div class="product-card__name">${p.name}</div>
        <div class="product-card__sku">Арт. ${p.sku}</div>
        <div class="product-card__footer">
          <div>
            ${p.oldPrice ? `<span class="price--old">${formatPrice(p.oldPrice)}</span>` : ""}
            <span class="price">${formatPrice(p.price)}</span>
          </div>
          <button
            class="add-btn"
            ${p.inStock ? "" : "disabled"}
            onclick="addToCart('${p.id}')"
            aria-label="Додати в корзину"
          >${p.inStock ? "+" : "×"}</button>
        </div>
        ${!p.inStock ? '<div class="stock-note">Немає в наявності</div>' : ""}
      </div>
    </div>
  `).join("");
}

function renderDrawer() {
  const items = getCartWithDetails();
  const itemsWrap = document.getElementById("drawerItems");
  const footerWrap = document.getElementById("drawerFooter");

  if (items.length === 0) {
    itemsWrap.innerHTML = `<div class="drawer__empty">Корзина порожня</div>`;
    footerWrap.innerHTML = "";
    return;
  }

  itemsWrap.innerHTML = items.map((item) => `
    <div class="cart-item">
      <div class="cart-item__img"><img src="${item.image}" alt="${item.name}" /></div>
      <div class="cart-item__info">
        <div class="cart-item__name">${item.name}</div>
        <div class="cart-item__model">${item.brand} · ${item.model}</div>
        <div class="cart-item__row">
          <div class="qty-control">
            <button onclick="changeQty('${item.id}', ${item.qty - 1})" aria-label="Менше">−</button>
            <span>${item.qty}</span>
            <button onclick="changeQty('${item.id}', ${item.qty + 1})" aria-label="Більше">+</button>
          </div>
          <span class="price">${formatPrice(item.price * item.qty)}</span>
        </div>
        <span class="remove-link" onclick="removeFromCart('${item.id}'); renderAll();">Видалити</span>
      </div>
    </div>
  `).join("");

  const total = getCartTotal();
  footerWrap.innerHTML = `
    <div class="drawer__total"><span>Разом</span><span>${formatPrice(total)}</span></div>
    <a href="checkout.html" class="btn btn--primary btn--full">Оформити замовлення</a>
  `;
}

function changeQty(id, qty) {
  if (qty <= 0) {
    removeFromCart(id);
  } else {
    setQty(id, qty);
  }
  renderAll();
}

function renderAll() {
  renderGrid();
  renderDrawer();
  updateCartBadge();
}

// Drawer open/close
function initDrawer() {
  const drawer = document.getElementById("cartDrawer");
  const overlay = document.getElementById("overlay");
  const open = () => { drawer.classList.add("open"); overlay.classList.add("open"); renderDrawer(); };
  const close = () => { drawer.classList.remove("open"); overlay.classList.remove("open"); };

  document.getElementById("openCart")?.addEventListener("click", open);
  document.getElementById("closeCart")?.addEventListener("click", close);
  overlay?.addEventListener("click", close);
}

document.addEventListener("DOMContentLoaded", () => {
  renderBrandTabs();
  renderGrid();
  initDrawer();
  updateCartBadge();
});
