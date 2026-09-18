/* Doostride — standalone live storefront. Reads STORE_PRODUCTS and the
   search engine from ../js/*.js. The Doofinder Layer is always live here. */

const CART_KEY = "dfa_store_cart_v1";

const IS_ES_SITE = location.pathname.includes("/store/es/");
const CURRENCY_SYMBOL = "€";
const OTHER_SITE_URL = IS_ES_SITE ? "../" : "es/";

function formatPrice(price) {
  return `${price.toFixed(2)} €`;
}

const STRINGS = {
  en: {
    promo: "FREE SHIPPING ON ORDERS OVER €50 · NEW ARRIVALS EVERY WEEK",
    navBrands: "Brands ▾",
    searchPlaceholder: "Search products…",
    tileShoes: "Shoes",
    catalogAll: "All products",
    addToCart: "Add to cart",
    noResults: "No matches — but a real store would still catch typos & synonyms like this."
  },
  es: {
    promo: "ENVÍO GRATIS EN PEDIDOS SUPERIORES A 50 € · NOVEDADES CADA SEMANA",
    navBrands: "Marcas ▾",
    searchPlaceholder: "Buscar productos…",
    tileShoes: "Zapatillas",
    catalogAll: "Todos los productos",
    addToCart: "Añadir al carrito",
    noResults: "Sin resultados — pero una tienda real también detectaría erratas y sinónimos así."
  }
};

const state = {
  lang: IS_ES_SITE ? "es" : "en",
  cart: parseInt(localStorage.getItem(CART_KEY) || "0", 10) || 0
};

function t(key) { return STRINGS[state.lang][key] || key; }

function categoryLabel(cat) { return cat === "Shoes" ? t("tileShoes") : cat; }

function parseRoute() {
  const hash = location.hash.replace(/^#\/?/, "");
  const parts = hash.split("/").filter(Boolean);
  if (parts[0] === "category" && parts[1]) return { type: "category", value: decodeURIComponent(parts[1]) };
  if (parts[0] === "brand" && parts[1]) return { type: "brand", value: decodeURIComponent(parts[1]) };
  return { type: "home" };
}

function addToCart() {
  state.cart++;
  localStorage.setItem(CART_KEY, String(state.cart));
  document.getElementById("cart-count").textContent = state.cart;
}

/* ---------- Header / nav / i18n ---------- */
function renderChrome() {
  document.getElementById("html-root").lang = state.lang;
  document.getElementById("lang-current").textContent = state.lang === "es" ? "Español" : "English";
  document.querySelectorAll("[data-i18n]").forEach(el => { el.textContent = t(el.dataset.i18n); });
  document.getElementById("doostride-search").placeholder = t("searchPlaceholder");
  document.getElementById("cart-count").textContent = state.cart;

  const brands = Array.from(new Set(STORE_PRODUCTS.map(p => p.brand))).sort();
  document.getElementById("brand-menu").innerHTML = brands
    .map(b => `<a href="#/brand/${encodeURIComponent(b)}">${b}</a>`).join("");
}

function renderTiles() {
  const cats = Array.from(new Set(STORE_PRODUCTS.map(p => p.category))).sort();
  const html = cats.map(c => {
    const items = STORE_PRODUCTS.filter(p => p.category === c);
    return `
      <div class="cat-tile" style="background-image:url('${items[0].image}')">
        <div>
          <div class="cat-tile-label">${categoryLabel(c)}</div>
        </div>
      </div>`;
  }).join("");
  document.getElementById("cat-tiles").innerHTML = html;
}

/* ---------- Catalog ---------- */
function productCardHTML(p) {
  return `
    <div class="product-card">
      <a class="pimg-link" href="${p.link}" target="_blank" rel="noopener">
        <div class="pimg" style="background-image:url('${p.image}')"></div>
      </a>
      <div class="pinfo">
        <div class="pbrand">${p.brand}${p.color ? ` · ${p.color}` : ""}${p.size ? ` · ${p.size}` : ""}</div>
        <a class="pname" href="${p.link}" target="_blank" rel="noopener">${p.title}</a>
        <div class="pfoot">
          <span class="pprice">${formatPrice(p.price)}</span>
          <button class="btn-add" data-action="add-to-cart">${t("addToCart")}</button>
        </div>
      </div>
    </div>`;
}

function renderCatalog(route) {
  const grid = document.getElementById("product-grid");
  const titleEl = document.getElementById("catalog-title");
  const chipsEl = document.getElementById("brand-chips");
  const brands = Array.from(new Set(STORE_PRODUCTS.map(p => p.brand))).sort();

  let filtered = STORE_PRODUCTS;
  if (route.type === "category") { filtered = STORE_PRODUCTS.filter(p => p.category === route.value); titleEl.textContent = categoryLabel(route.value); }
  else if (route.type === "brand") { filtered = STORE_PRODUCTS.filter(p => p.brand === route.value); titleEl.textContent = route.value; }
  else { titleEl.textContent = t("catalogAll"); }

  chipsEl.innerHTML = brands.map(b => `
    <a class="brand-chip ${route.type === "brand" && route.value === b ? "active" : ""}" href="#/brand/${encodeURIComponent(b)}">${b}</a>`).join("");

  grid.innerHTML = filtered.map(productCardHTML).join("");
}

/* ---------- Search / Layer ---------- */
function renderSearchDropdown() {
  const mount = document.getElementById("df-results-mount");
  const input = document.getElementById("doostride-search");
  const query = input.value;

  if (!query.trim()) { mount.innerHTML = ""; return; }

  const results = doofinderSearch(query);
  const items = results.length
    ? results.map(p => `
        <a class="df-result-item" href="${p.link}" target="_blank" rel="noopener">
          <span class="thumb" style="background-image:url('${p.image}')"></span>
          <span class="info">
            <div class="pname">${p.title}</div>
            <div class="pmeta">${p.brand} · ${categoryLabel(p.category)}</div>
          </span>
          <span class="pprice">${formatPrice(p.price)}</span>
        </a>`).join("")
    : `<div class="df-results-empty">${t("noResults")}</div>`;

  mount.innerHTML = `<div class="df-results">${items}</div>`;
}

/* ---------- Router / render ---------- */
function renderAll() {
  renderChrome();
  renderTiles();
  renderCatalog(parseRoute());
}

function handleRoute() {
  renderCatalog(parseRoute());
  if (location.hash && location.hash !== "#/") {
    document.getElementById("catalog").scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

/* ---------- Events ---------- */
window.addEventListener("hashchange", handleRoute);

document.addEventListener("input", e => {
  if (e.target.id === "doostride-search") renderSearchDropdown();
});

document.addEventListener("click", e => {
  if (e.target.closest("[data-action='add-to-cart']")) { addToCart(); return; }

  if (e.target.closest("[data-action='toggle-lang-menu']")) {
    document.getElementById("lang-menu").classList.toggle("open");
    return;
  }
  if (e.target.closest("[data-action='toggle-mobile-search']")) {
    const headerMain = document.querySelector(".header-main");
    headerMain.classList.toggle("mobile-search-open");
    if (headerMain.classList.contains("mobile-search-open")) document.getElementById("doostride-search").focus();
    return;
  }
  const langOpt = e.target.closest("[data-action='set-lang']");
  if (langOpt) {
    if (langOpt.dataset.lang !== state.lang) location.href = OTHER_SITE_URL;
    document.getElementById("lang-menu").classList.remove("open");
    return;
  }
  if (!e.target.closest(".lang-switch")) document.getElementById("lang-menu").classList.remove("open");
  if (!e.target.closest(".search-wrap")) document.getElementById("df-results-mount").innerHTML = "";
  if (!e.target.closest(".search-wrap") && !e.target.closest("[data-action='toggle-mobile-search']")) {
    document.querySelector(".header-main").classList.remove("mobile-search-open");
  }
});

/* ---------- Doofinder installation script ---------- */
function injectDoofinderScript() {
  const storeId = (localStorage.getItem("dfa_demo_store_id") || "").trim();
  if (!storeId) return;
  const script = document.createElement("script");
  script.src = `https://eu1-config.doofinder.com/2.x/${storeId}.js`;
  script.async = true;
  document.head.appendChild(script);
}

/* ---------- Init ---------- */
injectDoofinderScript();
renderAll();
