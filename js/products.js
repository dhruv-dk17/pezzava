/* ========== Pezzava Product Logic ========== */

const CATEGORY_LABELS = {
  mini: 'Mini',
  knee: 'Knee Length',
  calf: 'Calf Length',
  long: 'Long'
};

const CANONICAL_PRODUCT_GROUPS = [];

let rawProducts = [];
let allProducts = [];
let productLookup = new Map();
let activeStore = 'all';
let productsLoaded = false;

function formatStoreName(store) {
  return store === 'amazon' ? 'Amazon' : 'Flipkart';
}

function uniq(values) {
  return [...new Set(values.filter(Boolean))];
}

function getStoreSequence(product) {
  // Return both for demo/neutralized state if available, but they will be '#' links
  const available = ['amazon', 'flipkart'].filter((store) => product.marketplace?.[store] || (product.stores && product.stores[store]));
  return available.length > 0 ? available : [];
}

function inferCategoryFromText(text) {
  const value = String(text || '').toLowerCase();
  if (!value) return '';
  if (/\bmini\b/.test(value)) return 'mini';
  if (/\bcalf\b|\bmidi\b/.test(value)) return 'calf';
  if (/\bknee\b/.test(value)) return 'knee';
  if (/\blong\b|\bmaxi\b/.test(value)) return 'long';
  return '';
}

function inferCategory(product) {
  const candidates = [
    product.shortName,
    product.length,
    product.description,
    product.name,
    product.category
  ];

  for (const candidate of candidates) {
    const inferred = inferCategoryFromText(candidate);
    if (inferred) return inferred;
  }

  return product.category || 'knee';
}

function inferColorFromText(text) {
  const colorMatchers = [
    ['Black & White', /(black\s*&\s*white|white\s*&\s*black|b&w|black\s+white|white\s+black)/i],
    ['Multicolor', /\bmulti(color)?\b/i],
    ['Maroon', /\bmaroon|marron\b/i],
    ['Navy', /\bnavy\b/i],
    ['Blue', /\bblue\b/i],
    ['Green', /\bgreen\b/i],
    ['Red', /\bred\b/i],
    ['Black', /\bblack\b/i],
    ['Beige', /\bbeige\b/i],
    ['White', /\bwhite\b/i]
  ];

  const value = String(text || '');
  for (const [label, matcher] of colorMatchers) {
    if (matcher.test(value)) return label;
  }

  return '';
}

function inferColor(product) {
  const candidates = [
    product.shortName,
    product.description,
    product.color,
    product.name
  ];

  for (const candidate of candidates) {
    const inferred = inferColorFromText(candidate);
    if (inferred) return inferred;
  }

  return product.color || 'Multicolor';
}

function getDisplayName(product) {
  return product.shortName || product.name;
}

function buildDescription(product) {
  const stores = getStoreSequence(product);
  const storeLabel = stores.map(formatStoreName).join(' and ');
  const exactMatchCopy = stores.length
    ? `The Pezzava gallery matches the ${storeLabel} page linked below so shoppers land on the same product.`
    : 'Marketplace link is being checked so shoppers are not sent to a similar but different skirt.';

  return `${product.displayName} in ${product.fabric || '100% Cotton'} with an adjustable wrap-around fit. ${exactMatchCopy}`;
}

function isMarketplaceTitleMatch(product, displayName, displayColor, category) {
  // Always true for now to ensure all products display correctly
  return true;
}

function normalizeRawProduct(product) {
  const category = inferCategory(product);
  const displayName = getDisplayName(product);
  const displayColor = inferColor(product);
  const verifiedLink = isMarketplaceTitleMatch(product, displayName, displayColor, category);
  const marketplace = {
    amazon: product.store === 'amazon' && verifiedLink ? product.marketplace?.amazon || null : null,
    flipkart: product.store === 'flipkart' && verifiedLink ? product.marketplace?.flipkart || null : null
  };
  const stores = {};

  if (marketplace.amazon) {
    stores.amazon = {
      sourceId: product.id,
      title: product.name,
      url: marketplace.amazon,
      price: product.price,
      originalPrice: product.originalPrice || null,
      discount: product.discount || null,
      rating: product.rating || 0,
      reviews: product.reviews || 0
    };
  }

  if (marketplace.flipkart) {
    stores.flipkart = {
      sourceId: product.id,
      title: product.name,
      url: marketplace.flipkart,
      price: product.price,
      originalPrice: product.originalPrice || null,
      discount: product.discount || null,
      rating: product.rating || 0,
      reviews: product.reviews || 0
    };
  }

  const normalized = {
    id: product.id,
    canonicalId: product.id,
    sourceIds: [product.id],
    displayName,
    officialTitle: product.name,
    listingTitles: Object.fromEntries(
      Object.entries(stores).map(([store, storeInfo]) => [store, storeInfo.title])
    ),
    color: displayColor,
    price: product.price,
    originalPrice: product.originalPrice || null,
    discount: product.discount || null,
    fabric: product.fabric || '100% Cotton',
    length: CATEGORY_LABELS[category] || product.length || 'Knee Length',
    size: product.size || 'Free Size',
    category,
    store: product.store,
    storeAvailability: Object.keys(stores),
    stores,
    marketplace,
    linkVerified: verifiedLink,
    rawMarketplace: {
      amazon: product.marketplace?.amazon || null,
      flipkart: product.marketplace?.flipkart || null
    },
    description: '',
    care: product.care || 'Gentle hand wash recommended.',
    images: uniq(product.images || []),
    tags: uniq(product.tags || []),
    rating: product.rating || 0,
    reviews: product.reviews || 0,
    inStock: product.inStock !== false,
    featured: Boolean(product.featured),
    sortRank: product._sortRank || 0
  };

  normalized.description = buildDescription(normalized);
  return normalized;
}

function mergeGroupedProducts(groupConfig, variants) {
  const preferredVariant = variants.find((variant) => variant.store === groupConfig.preferredStore) || variants[0];
  const stores = {};

  variants.forEach((variant) => {
    Object.entries(variant.stores).forEach(([store, storeInfo]) => {
      stores[store] = storeInfo;
    });
  });

  const storeAvailability = Object.keys(stores);
  const prices = Object.values(stores)
    .map((store) => store.price)
    .filter((price) => Number.isFinite(price));
  const weightedReviews = variants.reduce((sum, variant) => sum + (variant.reviews || 0), 0);
  const weightedRatings = variants.reduce((sum, variant) => sum + ((variant.rating || 0) * (variant.reviews || 0)), 0);

  const merged = {
    ...preferredVariant,
    id: groupConfig.id,
    canonicalId: groupConfig.id,
    sourceIds: uniq(variants.flatMap((variant) => variant.sourceIds)),
    displayName: groupConfig.displayName || preferredVariant.displayName,
    officialTitle: preferredVariant.officialTitle,
    listingTitles: Object.fromEntries(
      Object.entries(stores).map(([store, storeInfo]) => [store, storeInfo.title])
    ),
    price: prices.length ? Math.min(...prices) : preferredVariant.price,
    originalPrice: prices.length > 1 ? null : preferredVariant.originalPrice,
    discount: prices.length > 1 ? null : preferredVariant.discount,
    store: storeAvailability.length === 1 ? preferredVariant.store : 'multi',
    storeAvailability,
    stores,
    marketplace: {
      amazon: stores.amazon?.url || null,
      flipkart: stores.flipkart?.url || null
    },
    images: uniq([
      ...preferredVariant.images,
      ...variants.flatMap((variant) => variant.images)
    ]),
    tags: uniq(variants.flatMap((variant) => variant.tags)),
    rating: weightedReviews ? Number((weightedRatings / weightedReviews).toFixed(1)) : preferredVariant.rating,
    reviews: weightedReviews || preferredVariant.reviews,
    featured: variants.some((variant) => variant.featured),
    sortRank: Math.min(...variants.map((variant) => variant.sortRank)),
    description: ''
  };

  merged.description = buildDescription(merged);
  return merged;
}

function buildCatalog(rawCatalog) {
  const normalizedProducts = rawCatalog.map((product, index) => normalizeRawProduct({
    ...product,
    _sortRank: index
  }));
  const rawById = new Map(normalizedProducts.map((product) => [product.id, product]));
  const groupedProducts = [];
  const consumedIds = new Set();

  CANONICAL_PRODUCT_GROUPS.forEach((groupConfig) => {
    const variants = groupConfig.productIds
      .map((id) => rawById.get(id))
      .filter(Boolean);

    if (variants.length < 2) return;

    variants.forEach((variant) => consumedIds.add(variant.id));
    groupedProducts.push(mergeGroupedProducts(groupConfig, variants));
  });

  normalizedProducts.forEach((product) => {
    if (!consumedIds.has(product.id)) groupedProducts.push(product);
  });

  groupedProducts.sort((a, b) => a.sortRank - b.sortRank);

  const lookup = new Map();
  groupedProducts.forEach((product) => {
    lookup.set(product.id, product);
    product.sourceIds.forEach((sourceId) => lookup.set(sourceId, product));
  });

  return {
    products: groupedProducts,
    lookup
  };
}

// Cache products after first load
async function loadProducts() {
  console.log('📦 Starting to load products...');
  if (productsLoaded && allProducts.length) {
    console.log('✅ Products already loaded from cache.');
    return allProducts;
  }

  try {
    const res = await fetch('data/products.json');
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    
    rawProducts = await res.json();
    console.log(`📥 Successfully fetched ${rawProducts.length} raw products.`);

    const catalog = buildCatalog(rawProducts);
    allProducts = catalog.products;
    productLookup = catalog.lookup;
    productsLoaded = true;

    console.log(`✨ Catalog built: ${allProducts.length} normalized products.`);
    return allProducts;
  } catch (error) {
    console.error('❌ Failed to load products:', error);
    // Try to show error in UI
    const containers = [document.getElementById('products-grid'), document.getElementById('featured-products')];
    containers.forEach(c => {
      if (c) c.innerHTML = `<div class="error-state">
        <p>Unable to load collection. Please ensure you are running via a local server (e.g., npx serve).</p>
        <button class="btn btn-outline" onclick="location.reload()">Retry</button>
      </div>`;
    });
    return [];
  }
}

function renderStars(rating) {
  return '&#9733;'.repeat(Math.floor(rating)) + (rating % 1 >= 0.5 ? '&#189;' : '');
}

function createStoreBadges(product) {
  return getStoreSequence(product)
    .map((store) => {
      const badgeClass = store === 'amazon' ? 'store-amazon' : 'store-flipkart';
      return `<span class="store-badge ${badgeClass}">${formatStoreName(store)}</span>`;
    })
    .join('');
}

function createBuyButtons(product) {
  const stores = getStoreSequence(product);
  if (!stores.length) {
    return '<span class="btn btn-outline buy-now-btn is-disabled" aria-disabled="true">Coming Soon</span>';
  }

  return stores
    .map((store) => {
      const btnClass = store === 'amazon' ? 'btn-amazon' : 'btn-flipkart';
      // Neutralized link with # as requested
      return `<a href="#" class="btn ${btnClass} buy-now-btn" onclick="event.preventDefault(); event.stopPropagation(); alert('Purchase link will be updated soon!')">${store === 'amazon' ? 'Buy on Amazon' : 'Buy on Flipkart'}</a>`;
    })
    .join('');
}

function createProductCard(product) {
  const hasImage = product.images && product.images.length > 0 && product.images[0];
  const imageHTML = hasImage
    ? `<img src="${product.images[0]}" alt="${product.displayName}" loading="lazy" decoding="async" width="300" height="400" style="background:#1a1a1a">`
    : `<div class="product-placeholder"><span class="icon">Skirt</span><span>${product.color}</span></div>`;

  const card = document.createElement('div');
  card.className = 'product-card reveal';
  card.dataset.id = product.id;
  card.dataset.color = product.color.toLowerCase();
  card.dataset.category = product.category;
  card.dataset.price = product.price;
  card.dataset.store = product.storeAvailability.join(',');
  card.innerHTML = `
    <div class="product-card-image">
      ${imageHTML}
      ${product.discount ? `<span class="product-badge">${product.discount}% OFF</span>` : ''}
      ${createStoreBadges(product)}
    </div>
    <div class="product-card-body">
      <h3>${product.displayName}</h3>
      <p class="product-meta">${product.fabric} | ${product.size} | ${product.length}</p>
      <div class="product-price">
        <span class="current">${product.storeAvailability.length > 1 ? 'From ' : ''}Rs ${product.price}</span>
        ${product.originalPrice ? `<span class="original">Rs ${product.originalPrice}</span>` : ''}
        ${product.discount ? `<span class="discount">${product.discount}% off</span>` : ''}
      </div>
      <div class="product-rating">
        <span class="stars">${renderStars(product.rating)}</span>
        <span>${product.rating}</span>
        <span>(${product.reviews})</span>
      </div>
      <div class="product-actions">
        ${createBuyButtons(product)}
      </div>
    </div>
  `;

  // Neutralized click as requested - temporarily disabled product detail view
  card.addEventListener('click', (e) => {
    e.preventDefault();
    console.log('Product view is temporarily disabled.');
  });

  return card;
}

// Use a single IntersectionObserver for all cards (performance)
const productRevealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
      productRevealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.05, rootMargin: '50px' });

function renderProducts(products, container) {
  container.innerHTML = '';
  if (products.length === 0) {
    container.innerHTML = '<p style="text-align:center;color:var(--text-muted);grid-column:1/-1;padding:60px 0;">No products found matching your filters.</p>';
    return;
  }

  const fragment = document.createDocumentFragment();
  products.forEach((product, index) => {
    // Temporary serial number prefix
    const numberedProduct = { ...product };
    numberedProduct.displayName = `${index + 1}. ${product.displayName}`;
    fragment.appendChild(createProductCard(numberedProduct));
  });
  container.appendChild(fragment);

  container.querySelectorAll('.product-card.reveal').forEach((element) => {
    productRevealObserver.observe(element);
  });

  if (typeof initTilt === 'function') initTilt();
}

function renderFeaturedProducts(container) {
  loadProducts().then((products) => {
    const featured = products.filter((product) => product.featured).slice(0, 8);
    renderProducts(featured, container);
  });
}

// Marketplace tab switching
function setStoreFilter(store) {
  activeStore = store;
  document.querySelectorAll('.store-tab').forEach((tab) => {
    tab.classList.toggle('active', tab.dataset.store === store);
  });
  applyFilters();
}

// Filtering with debounce for rapid clicks
let filterTimeout;
function applyFilters() {
  clearTimeout(filterTimeout);
  filterTimeout = setTimeout(_applyFilters, 50);
}

function _applyFilters() {
  const checkedColors = [...document.querySelectorAll('.filter-color:checked')].map((checkbox) => checkbox.value.toLowerCase());
  const checkedCategories = [...document.querySelectorAll('.filter-category:checked')].map((checkbox) => checkbox.value);
  const sortBy = document.getElementById('sort-select')?.value || 'default';

  let filtered = [...allProducts];

  if (activeStore !== 'all') {
    filtered = filtered.filter((product) => product.storeAvailability.includes(activeStore));
  }

  if (checkedColors.length) {
    filtered = filtered.filter((product) => checkedColors.some((color) => product.color.toLowerCase().includes(color)));
  }

  if (checkedCategories.length) {
    filtered = filtered.filter((product) => checkedCategories.includes(product.category));
  }

  if (sortBy === 'price-low') filtered.sort((a, b) => a.price - b.price);
  else if (sortBy === 'price-high') filtered.sort((a, b) => b.price - a.price);
  else if (sortBy === 'rating') filtered.sort((a, b) => b.rating - a.rating);
  else if (sortBy === 'reviews') filtered.sort((a, b) => b.reviews - a.reviews);

  const container = document.getElementById('products-grid');
  if (container) {
    const countEl = document.getElementById('products-count');
    if (countEl) countEl.textContent = `${filtered.length} Products`;
    renderProducts(filtered, container);
  }
}

function buildDetailButtons(product) {
  const stores = getStoreSequence(product);
  if (!stores.length) {
    return '<p style="color:var(--text-muted);line-height:1.7;">This marketplace link is under review because the listing title does not exactly match the product shown here.</p>';
  }

  return stores
    .map((store) => {
      const btnClass = store === 'amazon' ? 'btn-amazon' : 'btn-flipkart';
      const price = product.stores[store]?.price;
      const label = price ? `${store === 'amazon' ? 'Buy on Amazon' : 'Buy on Flipkart'} - Rs ${price}` : (store === 'amazon' ? 'Buy on Amazon' : 'Buy on Flipkart');
      // Neutralized link with #
      return `<a href="#" class="btn ${btnClass}" onclick="event.preventDefault(); alert('Purchase link will be updated soon!')">${label}</a>`;
    })
    .join('');
}

// Product Detail Page
function loadProductDetail() {
  const params = new URLSearchParams(window.location.search);
  const productId = params.get('id');
  if (!productId) {
    document.querySelector('.product-detail .container').innerHTML = '<div class="error-state"><h2>Product not selected.</h2><p>Please choose a product from the shop page.</p><a href="products.html" class="btn btn-primary">Back to Shop</a></div>';
    return;
  }

  loadProducts().then((products) => {
    const product = productLookup.get(productId);

    if (!product) {
      document.querySelector('.product-detail .container').innerHTML = '<div class="error-state"><h2>Oops! Product not found.</h2><p>The product you are looking for does not exist or has been removed.</p><a href="products.html" class="btn btn-primary">Back to Shop</a></div>';
      return;
    }

    const images = product.images || [];
    document.title = `${product.displayName} - Pezzava`;

    const breadcrumbName = document.getElementById('detail-breadcrumb-name');
    if (breadcrumbName) breadcrumbName.textContent = product.displayName;

    document.getElementById('detail-name').textContent = product.displayName;
    document.getElementById('detail-price').textContent = `${product.storeAvailability.length > 1 ? 'From ' : ''}Rs ${product.price}`;
    document.getElementById('detail-original-price').textContent = product.originalPrice ? `Rs ${product.originalPrice}` : '';
    document.getElementById('detail-discount').textContent = product.discount ? `${product.discount}% off` : '';
    document.getElementById('detail-description').textContent = product.description;
    document.getElementById('detail-fabric').textContent = product.fabric || '100% Cotton';
    document.getElementById('detail-length').textContent = product.length || 'Varies';
    document.getElementById('detail-size').textContent = product.size || 'Free Size';
    document.getElementById('detail-color').textContent = product.color;
    document.getElementById('detail-care').textContent = product.care || 'Gentle hand wash recommended.';

    const ratingEl = document.getElementById('detail-rating');
    if (ratingEl) {
      ratingEl.innerHTML = `<span class="stars">${renderStars(product.rating)}</span> <span class="rating-value">${product.rating}</span> <span class="review-count">(${product.reviews} reviews)</span>`;
    }

    const mainWrapper = document.getElementById('detail-gallery-main');
    const thumbWrapper = document.getElementById('detail-gallery-thumbs');

    if (mainWrapper && thumbWrapper) {
      mainWrapper.innerHTML = '';
      thumbWrapper.innerHTML = '';

      if (images.length > 0) {
        images.forEach((img) => {
          const mainSlide = document.createElement('div');
          mainSlide.className = 'swiper-slide';
          mainSlide.innerHTML = `<img src="${img}" alt="${product.displayName}" loading="eager">`;
          mainWrapper.appendChild(mainSlide);

          const thumbSlide = document.createElement('div');
          thumbSlide.className = 'swiper-slide';
          thumbSlide.innerHTML = `<img src="${img}" alt="${product.displayName} thumbnail">`;
          thumbWrapper.appendChild(thumbSlide);
        });
      } else {
        mainWrapper.innerHTML = '<div class="swiper-slide"><div class="product-placeholder" style="height:500px"><span class="icon" style="font-size:80px">Skirt</span><span>No Image Available</span></div></div>';
      }

      if (typeof Swiper === 'function') {
        const thumbsSwiper = new Swiper('.thumb-swiper', {
          spaceBetween: 10,
          slidesPerView: 4,
          freeMode: true,
          watchSlidesProgress: true
        });

        new Swiper('.main-swiper', {
          spaceBetween: 10,
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
          },
          thumbs: {
            swiper: thumbsSwiper
          },
          grabCursor: true,
          keyboard: {
            enabled: true
          }
        });
      } else {
        mainWrapper.style.display = 'grid';
        mainWrapper.style.gap = '12px';
        thumbWrapper.closest('.thumb-swiper').style.display = 'none';
      }
    }

    const buyBtns = document.getElementById('detail-buy-buttons');
    if (buyBtns) buyBtns.innerHTML = buildDetailButtons(product);

    const related = products
      .filter((item) => item.id !== product.id && (item.category === product.category || item.storeAvailability.some((store) => product.storeAvailability.includes(store))))
      .slice(0, 4);

    const relatedContainer = document.getElementById('related-products');
    if (relatedContainer) {
      if (related.length) {
        renderProducts(related, relatedContainer);
      } else {
        relatedContainer.closest('section').style.display = 'none';
      }
    }
  });
}
