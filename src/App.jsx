import { useState, useMemo } from "react";
import { products, categories, fmt, disc, waLink } from "./data/products";

export default function App() {
  const [page, setPage] = useState("home");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cart, setCart] = useState([]);
  const [sortBy, setSortBy] = useState("default");
  const [filterCategory, setFilterCategory] = useState("Todos");
  const [searchQuery, setSearchQuery] = useState("");
  const [qty, setQty] = useState(1);
  const [toast, setToast] = useState(null);
  const [mobileMenu, setMobileMenu] = useState(false);

  // Search, filter, and sort products
  const filteredAndSortedProducts = useMemo(() => {
    return [...products]
      .filter((p) => {
        const matchesCategory = filterCategory === "Todos" || p.category === filterCategory;
        const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                              p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                              p.category.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
      })
      .sort((a, b) => {
        if (sortBy === "price-asc") return a.price - b.price;
        if (sortBy === "price-desc") return b.price - a.price;
        if (sortBy === "name") return a.name.localeCompare(b.name);
        return a.id - b.id;
      });
  }, [filterCategory, searchQuery, sortBy]);

  const cartTotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const cartCount = cart.reduce((s, i) => s + i.qty, 0);
  const shipping = cartTotal >= 150000 ? 0 : 10000;

  const showToast = (message) => {
    setToast(message);
    setTimeout(() => setToast(null), 1800);
  };

  const addToCart = (product, quantity = 1) => {
    setCart((prev) => {
      const ex = prev.find((i) => i.id === product.id);
      if (ex) return prev.map((i) => i.id === product.id ? { ...i, qty: i.qty + quantity } : i);
      return [...prev, { ...product, qty: quantity }];
    });
    showToast(`🛍️ ¡${product.name} agregado al carrito!`);
  };

  const removeFromCart = (id) => {
    const item = cart.find((i) => i.id === id);
    setCart((prev) => prev.filter((i) => i.id !== id));
    if (item) showToast(`🗑️ ${item.name} eliminado.`);
  };

  const updateQty = (id, q) => {
    if (q < 1) return removeFromCart(id);
    setCart((prev) => prev.map((i) => i.id === id ? { ...i, qty: q } : i));
  };

  const openProduct = (p) => {
    setSelectedProduct(p);
    setQty(1);
    setPage("product");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const goTo = (p) => {
    setPage(p);
    setMobileMenu(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const cartWaMessage = cart
    .map((i) => `• *${i.name}* (x${i.qty}) — ${fmt(i.price * i.qty)}`)
    .join("\n") + `\n\n*Envío:* ${shipping === 0 ? "GRATIS" : fmt(shipping)}\n*Total del Pedido:* ${fmt(cartTotal + shipping)}`;

  return (
    <>
      {/* Toast Notification */}
      {toast && <div className="toast">{toast}</div>}

      {/* HEADER */}
      <header className="header">
        <div className="header-inner">
          <button onClick={() => goTo("home")} className="logo">
            GEAR<span className="logo-accent">LY</span>
          </button>

          <nav className="nav-desktop">
            <button className={`nav-link ${page === "home" ? "active" : ""}`} onClick={() => goTo("home")}>
              Inicio
            </button>
            <button className={`nav-link ${page === "products" ? "active" : ""}`} onClick={() => goTo("products")}>
              Productos
            </button>
            <button className={`nav-link ${page === "about" ? "active" : ""}`} onClick={() => goTo("about")}>
              Nosotros
            </button>
            <button className="nav-link" onClick={() => window.open(waLink("Hola Gearly, quiero consultar sobre accesorios de moto 🏍️"), "_blank")}>
              Contacto
            </button>
          </nav>

          <div className="header-actions">
            <button onClick={() => goTo("cart")} className="cart-btn" aria-label="Carrito de compras">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="9" cy="21" r="1" />
                <circle cx="20" cy="21" r="1" />
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
              </svg>
              {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
            </button>
            <button onClick={() => setMobileMenu(!mobileMenu)} className="mobile-menu-btn" aria-label="Menú móvil">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round">
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenu && (
          <div className="mobile-nav">
            <button className={`nav-link ${page === "home" ? "active" : ""}`} onClick={() => goTo("home")}>
              Inicio
            </button>
            <button className={`nav-link ${page === "products" ? "active" : ""}`} onClick={() => goTo("products")}>
              Productos
            </button>
            <button className={`nav-link ${page === "about" ? "active" : ""}`} onClick={() => goTo("about")}>
              Nosotros
            </button>
            <button className="nav-link" onClick={() => window.open(waLink("Hola Gearly! 🏍️"), "_blank")}>
              Contacto
            </button>
          </div>
        )}
      </header>

      {/* HOME PAGE */}
      {page === "home" && (
        <main className="page-enter">
          {/* Hero Section */}
          <section className="hero">
            <div className="hero-bg" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=1600&fit=crop')" }} />
            <div className="hero-overlay" />
            <div className="hero-content">
              <p className="hero-tag">🏍️ Colombia — Premium Gear</p>
              <h1 className="hero-title">
                EQUIPA TU MOTO.<br />
                <span className="accent">DOMINA</span> LA CALLE.
              </h1>
              <p className="hero-desc">
                Accesorios de alto rendimiento y seguridad extrema para motociclistas exigentes. Rodar seguro es rodar con estilo.
              </p>
              <div className="hero-actions">
                <button className="btn-primary" onClick={() => goTo("products")}>
                  Explorar Catálogo
                </button>
                <button className="btn-ghost" onClick={() => window.open(waLink("Hola Gearly, quiero asesoramiento experto para equipar mi moto 🏍️"), "_blank")}>
                  💬 Hablar con un Rider
                </button>
              </div>
            </div>
          </section>

          {/* Benefits Bar */}
          <section className="benefits">
            <div className="benefits-inner">
              {[
                { icon: "🚚", title: "Envío a toda Colombia", sub: "En 1 a 3 días hábiles" },
                { icon: "🛡️", title: "Calidad Certificada", sub: "Productos altamente testeados" },
                { icon: "💎", title: "Estilo & Seguridad", sub: "Accesorios premium seleccionados" },
                { icon: "💬", title: "Soporte Vía WhatsApp", sub: "Asesoría experta e inmediata" }
              ].map((b, idx) => (
                <div className="benefit" key={idx}>
                  <div className="benefit-icon">{b.icon}</div>
                  <h3 className="benefit-title">{b.title}</h3>
                  <p className="benefit-sub">{b.sub}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Featured Products */}
          <section className="section">
            <div style={{ marginBottom: 40, textAlign: "center" }}>
              <p className="section-tag">Destacados de la Temporada</p>
              <h2 className="section-title">
                PRODUCTOS <span className="accent">ESTRELLA</span>
              </h2>
            </div>

            <div className="products-grid">
              {products.slice(0, 4).map((p) => (
                <div key={p.id} className="product-card" onClick={() => openProduct(p)}>
                  <div className="product-card-img">
                    <img src={p.image} alt={p.name} loading="lazy" />
                    <div className="product-card-badges-right">
                      {p.badge && <span className="product-badge">{p.badge}</span>}
                      <span className="product-discount">-{disc(p.price, p.originalPrice)}%</span>
                    </div>
                  </div>
                  <div className="product-card-body">
                    <p className="product-card-category">{p.category}</p>
                    <h3 className="product-card-name">{p.name}</h3>
                    <div className="product-card-prices">
                      <span className="product-card-price">{fmt(p.price)}</span>
                      <span className="product-card-original">{fmt(p.originalPrice)}</span>
                    </div>
                    <button
                      className="btn-primary"
                      onClick={(e) => {
                        e.stopPropagation();
                        addToCart(p);
                      }}
                    >
                      + Agregar al carrito
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ textAlign: "center", marginTop: 48 }}>
              <button className="btn-ghost" onClick={() => goTo("products")}>
                Ver Todos los Productos →
              </button>
            </div>
          </section>

          {/* How It Works */}
          <section className="how-section">
            <div className="section">
              <div style={{ textAlign: "center", marginBottom: 56 }}>
                <p className="section-tag">Proceso Simplificado</p>
                <h2 className="section-title">
                  ¿CÓMO <span className="accent">FUNCIONA?</span>
                </h2>
              </div>
              <div className="how-grid">
                {[
                  { num: "01", title: "Selecciona tu Gear", desc: "Explora el catálogo premium de accesorios seleccionados por y para moteros." },
                  { num: "02", title: "Pide por WhatsApp", desc: "Tu carrito se empaqueta en un mensaje directo. Te atendemos y confirmamos al instante." },
                  { num: "03", title: "Recibe & Domina", desc: "Entrega express con empaque protegido en la puerta de tu casa a nivel nacional." }
                ].map((s, idx) => (
                  <div className="how-step" key={idx}>
                    <div className="how-number">{s.num}</div>
                    <h3 className="how-title">{s.title}</h3>
                    <p className="how-desc">{s.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Testimonials */}
          <section className="section">
            <div style={{ textAlign: "center", marginBottom: 48 }}>
              <p className="section-tag">La voz de la comunidad</p>
              <h2 className="section-title">TESTIMONIOS</h2>
            </div>
            <div className="testimonials-grid">
              {[
                { name: "Juan D.", city: "Medellín", text: "El soporte para celular aguanta los baches más duros de la ciudad sin moverse un milímetro. Envío súper rápido." },
                { name: "Camila R.", city: "Bogotá", text: "Los guantes tienen un agarre excelente y el material se siente súper resistente y fino. Sin duda volveré a comprar." },
                { name: "Andrés M.", city: "Cali", text: "La cubierta impermeable protegió mi moto de las tormentas más densas. Calidad premium asegurada." }
              ].map((t, idx) => (
                <div className="testimonial-card" key={idx}>
                  <div className="testimonial-stars">★★★★★</div>
                  <p className="testimonial-text">"{t.text}"</p>
                  <h4 className="testimonial-author">{t.name}</h4>
                  <p className="testimonial-city">{t.city}</p>
                </div>
              ))}
            </div>
          </section>

          {/* CTA Banner */}
          <section className="cta-banner">
            <h2 className="cta-title">¿LISTO PARA LLEVAR TU RUTA AL SIGUIENTE NIVEL?</h2>
            <p className="cta-desc">Chatea con nosotros y recibe asesoría experta personalizada.</p>
            <button className="cta-btn" onClick={() => window.open(waLink("Hola Gearly! Quiero asesoramiento experto sobre sus productos premium 🏍️"), "_blank")}>
              💬 Escríbenos por WhatsApp
            </button>
          </section>
        </main>
      )}

      {/* PRODUCTS PAGE */}
      {page === "products" && (
        <main className="section page-enter">
          <div className="page-header">
            <p className="section-tag">Colección Completa</p>
            <h1 className="section-title">
              EQUIPAMIENTO <span className="accent">PROFESIONAL</span>
            </h1>
          </div>

          {/* Search bar */}
          <div className="search-bar">
            <svg className="search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <input
              type="text"
              placeholder="Buscar por nombre, categoría o descripción..."
              className="search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="filters-bar">
            <div className="filter-tags">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilterCategory(cat)}
                  className={`filter-tag ${filterCategory === cat ? "active" : ""}`}
                >
                  {cat}
                </button>
              ))}
            </div>
            <div className="filters-right">
              <span className="product-count">{filteredAndSortedProducts.length} productos</span>
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="sort-select" aria-label="Ordenar productos">
                <option value="default">Ordenar: Destacados</option>
                <option value="price-asc">Precio: Menor a Mayor</option>
                <option value="price-desc">Precio: Mayor a Menor</option>
                <option value="name">Nombre: A–Z</option>
              </select>
            </div>
          </div>

          {filteredAndSortedProducts.length === 0 ? (
            <div style={{ textAlign: "center", padding: "80px 20px" }}>
              <div style={{ fontSize: 48, marginBottom: 16 }}>🔍</div>
              <h3>No se encontraron productos</h3>
              <p style={{ color: "var(--text-secondary)", marginTop: 8 }}>Prueba a buscar con otros términos o cambia el filtro de categoría.</p>
            </div>
          ) : (
            <div className="products-grid">
              {filteredAndSortedProducts.map((p) => (
                <div key={p.id} className="product-card" onClick={() => openProduct(p)}>
                  <div className="product-card-img">
                    <img src={p.image} alt={p.name} loading="lazy" />
                    <div className="product-card-badges-right">
                      {p.badge && <span className="product-badge">{p.badge}</span>}
                      <span className="product-discount">-{disc(p.price, p.originalPrice)}%</span>
                    </div>
                  </div>
                  <div className="product-card-body">
                    <p className="product-card-category">{p.category}</p>
                    <h3 className="product-card-name">{p.name}</h3>
                    <div className="product-card-prices">
                      <span className="product-card-price">{fmt(p.price)}</span>
                      <span className="product-card-original">{fmt(p.originalPrice)}</span>
                    </div>
                    <button
                      className="btn-primary"
                      onClick={(e) => {
                        e.stopPropagation();
                        addToCart(p);
                      }}
                    >
                      + Agregar al carrito
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      )}

      {/* PRODUCT DETAIL */}
      {page === "product" && selectedProduct && (
        <main className="section page-enter">
          <button onClick={() => goTo("products")} className="back-btn">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12"></line>
              <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
            Volver al catálogo
          </button>

          <div className="detail-grid">
            <div className="detail-img">
              <img src={selectedProduct.image} alt={selectedProduct.name} />
              {selectedProduct.badge && <span className="product-badge">{selectedProduct.badge}</span>}
            </div>
            <div className="detail-info">
              <div>
                <p className="detail-category">{selectedProduct.category}</p>
                <h1 className="detail-name">{selectedProduct.name}</h1>
              </div>

              <div className="detail-price-row">
                <span className="detail-price">{fmt(selectedProduct.price)}</span>
                <span className="detail-original">{fmt(selectedProduct.originalPrice)}</span>
                <span className="detail-discount-tag">-{disc(selectedProduct.price, selectedProduct.originalPrice)}% OFF</span>
              </div>

              <p className="detail-stock">● En stock — Despacho inmediato de 1 a 3 días hábiles</p>

              <div className="divider" />

              <p className="detail-description">{selectedProduct.description}</p>

              <div className="divider" />

              <div className="qty-row">
                <span className="qty-label">Cantidad</span>
                <div className="qty-control">
                  <button onClick={() => setQty(Math.max(1, qty - 1))} className="qty-btn" aria-label="Disminuir cantidad">−</button>
                  <span className="qty-value">{qty}</span>
                  <button onClick={() => setQty(qty + 1)} className="qty-btn" aria-label="Aumentar cantidad">+</button>
                </div>
              </div>

              <div className="detail-actions">
                <button className="btn-primary" onClick={() => addToCart(selectedProduct, qty)}>
                  Agregar al carrito
                </button>
                <button
                  className="btn-ghost"
                  onClick={() =>
                    window.open(
                      waLink(`Hola Gearly! Deseo ordenar el producto: *${selectedProduct.name}* (x${qty}) — Total: ${fmt(selectedProduct.price * qty)} 🏍️`),
                      "_blank"
                    )
                  }
                >
                  Comprar directo por WhatsApp
                </button>
              </div>

              <div className="detail-perks">
                <span>🚚 Envío Gratis en compras superiores a $150.000</span>
                <span>🔒 Compra Segura</span>
                <span>🔄 Garantía Directa</span>
              </div>
            </div>
          </div>
        </main>
      )}

      {/* CART PAGE */}
      {page === "cart" && (
        <main className="section page-enter">
          <h1 className="section-title" style={{ marginBottom: 36 }}>
            MI <span className="accent">CARRITO</span>
          </h1>

          {cart.length === 0 ? (
            <div className="empty-cart">
              <div className="empty-cart-icon">🛒</div>
              <p>Tu carrito de compras está vacío</p>
              <button className="btn-primary" onClick={() => goTo("products")}>
                Explorar Productos
              </button>
            </div>
          ) : (
            <div className="cart-layout">
              <div className="cart-items">
                {cart.map((item) => (
                  <div key={item.id} className="cart-item">
                    <img src={item.image} alt={item.name} className="cart-item-img" />
                    <div className="cart-item-info">
                      <p className="cart-item-cat">{item.category}</p>
                      <h3 className="cart-item-name">{item.name}</h3>
                      <div className="cart-item-controls">
                        <div className="qty-control">
                          <button onClick={() => updateQty(item.id, item.qty - 1)} className="qty-btn">−</button>
                          <span className="qty-value">{item.qty}</span>
                          <button onClick={() => updateQty(item.id, item.qty + 1)} className="qty-btn">+</button>
                        </div>
                        <button onClick={() => removeFromCart(item.id)} className="remove-btn">
                          Eliminar
                        </button>
                      </div>
                    </div>
                    <div className="cart-item-price">
                      <span className="cart-item-total">{fmt(item.price * item.qty)}</span>
                      <p className="cart-item-unit">{fmt(item.price)} c/u</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="cart-summary">
                <h3 className="cart-summary-title">Resumen del Pedido</h3>

                {cartTotal < 150000 && (
                  <div className="shipping-bar">
                    <p>
                      Agrega <strong>{fmt(150000 - cartTotal)}</strong> adicionales para obtener <strong>Envío Gratis 🎉</strong>
                    </p>
                    <div className="progress-track">
                      <div className="progress-fill" style={{ width: `${Math.min(100, (cartTotal / 150000) * 100)}%` }} />
                    </div>
                  </div>
                )}

                <div className="summary-rows">
                  <div className="summary-row">
                    <span>Subtotal</span>
                    <span>{fmt(cartTotal)}</span>
                  </div>
                  <div className="summary-row">
                    <span>Costo de Envío</span>
                    <span className={shipping === 0 ? "free-shipping" : ""}>
                      {shipping === 0 ? "¡GRATIS!" : fmt(shipping)}
                    </span>
                  </div>
                  <div className="summary-row total">
                    <span>Total</span>
                    <span>{fmt(cartTotal + shipping)}</span>
                  </div>
                </div>

                <button
                  className="btn-primary"
                  onClick={() =>
                    window.open(
                      waLink(`¡Hola Gearly! Quisiera procesar mi pedido de inmediato:\n\n${cartWaMessage}\n\nQuedo atento a las instrucciones de pago y despacho 🏍️`),
                      "_blank"
                    )
                  }
                >
                  Finalizar Compra por WhatsApp
                </button>
                <button className="btn-ghost" onClick={() => goTo("products")}>
                  Seguir Comprando
                </button>
                <p className="cart-trust">🔒 Tus compras en Gearly son seguras y garantizadas</p>
              </div>
            </div>
          )}
        </main>
      )}

      {/* ABOUT PAGE */}
      {page === "about" && (
        <main className="about-page page-enter">
          <p className="section-tag">Nuestra Ruta & Propósito</p>
          <h1 className="section-title" style={{ marginBottom: 32 }}>
            SOBRE <span className="accent">GEARLY</span>
          </h1>
          <p className="about-text">
            Gearly nació con una misión simple pero poderosa: equipar a los motociclistas colombianos con accesorios de nivel superior que fusionen una seguridad excepcional con un estilo sin concesiones.
            <br /><br />
            Entendemos que en la calle, cada milisegundo y cada accesorio cuentan. Por eso investigamos, probamos y seleccionamos solo el equipamiento que resiste las exigencias del asfalto diario y las aventuras de larga distancia.
            <br /><br />
            No nos conformamos con lo estándar. Buscamos superar las expectativas de la comunidad motera en toda Colombia, brindando una experiencia rápida, transparente y confiable.
          </p>
          <button className="btn-primary" onClick={() => goTo("products")}>
            Explorar Catálogo Premium
          </button>
        </main>
      )}

      {/* FLOATING WHATSAPP BUTTON */}
      <button
        onClick={() => window.open(waLink("Hola Gearly! 🏍️"), "_blank")}
        className="wa-float"
        aria-label="Contactar por WhatsApp"
      >
        <svg width="28" height="28" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      </button>

      {/* FOOTER */}
      <footer className="footer">
        <h3 className="footer-brand">
          GEAR<span style={{ color: "var(--accent)" }}>LY</span>
        </h3>
        <p className="footer-desc">Equipa tu moto. Domina la calle. · Colombia 🇨🇴</p>
        <div className="footer-links">
          <a href="https://instagram.com/gearly" target="_blank" rel="noreferrer" className="footer-link">
            Instagram
          </a>
          <a href="https://tiktok.com/@gearly" target="_blank" rel="noreferrer" className="footer-link">
            TikTok
          </a>
          <a href={waLink("Hola Gearly! 🏍️")} target="_blank" rel="noreferrer" className="footer-link">
            WhatsApp
          </a>
        </div>
      </footer>
    </>
  );
}
