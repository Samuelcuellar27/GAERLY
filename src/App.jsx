import { useState } from "react";

const WA = "573189582115";
const waLink = (msg) => `https://wa.me/${WA}?text=${encodeURIComponent(msg)}`;

const products = [
  {
    id: 1,
    name: "Soporte Celular para Manillar",
    price: 45000,
    originalPrice: 65000,
    category: "Tecnología",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=600&fit=crop",
    description: "Navega seguro sin soltar el manillar. Compatible con todos los smartphones. Rotación 360°, resistente al agua y vibraciones. Instalación en segundos sin herramientas.",
    badge: "⭐ Más vendido",
  },
  {
    id: 2,
    name: "Guantes de Conducción",
    price: 70000,
    originalPrice: 95000,
    category: "Seguridad",
    image: "https://images.unsplash.com/photo-1594938298603-c8148c4b5ba0?w=600&h=600&fit=crop",
    description: "Protege tus manos en cada trayecto. Cuero sintético de alta resistencia con relleno de gel en las palmas. Comodidad y agarre profesional en cualquier clima.",
    badge: "🔥 Trending",
  },
  {
    id: 3,
    name: "Cubierta Impermeable para Moto",
    price: 45000,
    originalPrice: 60000,
    category: "Protección",
    image: "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=600&h=600&fit=crop",
    description: "Protege tu moto del sol, la lluvia y el polvo donde sea. Material Oxford 210D, costuras reforzadas, elástico en la parte inferior para ajuste perfecto en cualquier modelo.",
    badge: null,
  },
  {
    id: 4,
    name: "Chaleco Reflectivo de Seguridad",
    price: 50000,
    originalPrice: 70000,
    category: "Seguridad",
    image: "https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=600&h=600&fit=crop",
    description: "Hazte ver en la noche y en condiciones de poca visibilidad. Franjas reflectivas de alta intensidad, talla ajustable, certificado para uso vial en Colombia.",
    badge: "🛡️ Esencial",
  },
  {
    id: 5,
    name: "Luces LED Decorativas",
    price: 35000,
    originalPrice: 50000,
    category: "Accesorios",
    image: "https://images.unsplash.com/photo-1609630875171-b1321377ee65?w=600&h=600&fit=crop",
    description: "Dale personalidad a tu moto con luces LED de 16 millones de colores. Control por app, resistentes al agua, fácil instalación sin modificar el cableado original.",
    badge: "💡 Nuevo",
  },
  {
    id: 6,
    name: "Kit de Herramientas Compacto",
    price: 55000,
    originalPrice: 75000,
    category: "Herramientas",
    image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=600&h=600&fit=crop",
    description: "Todo lo que necesitas para emergencias en la vía. 16 piezas esenciales en estuche compacto. Llaves hexagonales, destornilladores, alicates y más.",
    badge: null,
  },
  {
    id: 7,
    name: "Intercomunicador para Casco",
    price: 185000,
    originalPrice: 250000,
    category: "Tecnología",
    image: "https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?w=600&h=600&fit=crop",
    description: "Comunicación cristalina hasta 1.2km. Conexión Bluetooth 5.0, batería para 12 horas, resistente al agua IPX5. Compatible con todos los cascos del mercado.",
    badge: "⚠️ Premium",
  },
  {
    id: 8,
    name: "Cámara de Acción para Casco",
    price: 115000,
    originalPrice: 150000,
    category: "Tecnología",
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=600&h=600&fit=crop",
    description: "Captura cada aventura en 4K. Estabilización de imagen avanzada, resistente al agua hasta 30m, batería de 2 horas. Incluye kit completo de montaje para casco.",
    badge: null,
  },
];

const fmt = (n) => "$" + n.toLocaleString("es-CO");
const disc = (p, o) => Math.round((1 - p / o) * 100);

const globalStyles = `
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { background: #0a0a0a; color: #f0f0f0; font-family: 'Barlow', sans-serif; }
  ::-webkit-scrollbar { width: 4px; }
  ::-webkit-scrollbar-track { background: #111; }
  ::-webkit-scrollbar-thumb { background: #e63946; border-radius: 2px; }
  .btn-red { background: #e63946; color: #fff; border: none; padding: 13px 28px; font-family: 'Barlow Condensed', sans-serif; font-weight: 700; font-size: 15px; letter-spacing: 1px; text-transform: uppercase; cursor: pointer; transition: all 0.2s; display: inline-block; text-align: center; }
  .btn-red:hover { background: #c1121f; transform: translateY(-1px); }
  .btn-ghost { background: transparent; color: #f0f0f0; border: 1px solid #444; padding: 12px 28px; font-family: 'Barlow Condensed', sans-serif; font-weight: 600; font-size: 14px; letter-spacing: 1px; text-transform: uppercase; cursor: pointer; transition: all 0.2s; }
  .btn-ghost:hover { border-color: #e63946; color: #e63946; }
  .nav-link { background: none; border: none; color: #aaa; font-family: 'Barlow Condensed', sans-serif; font-size: 13px; letter-spacing: 2px; text-transform: uppercase; cursor: pointer; padding: 4px 0; transition: color 0.2s; }
  .nav-link:hover, .nav-link.active { color: #e63946; }
  .card { background: #111; border: 1px solid #1e1e1e; overflow: hidden; cursor: pointer; transition: transform 0.2s, border-color 0.2s; }
  .card:hover { transform: translateY(-4px); border-color: #333; }
  .tag { display: inline-block; background: #e63946; color: #fff; font-size: 11px; font-weight: 700; letter-spacing: 1px; padding: 3px 8px; text-transform: uppercase; }
  select { appearance: none; background: #1a1a1a; border: 1px solid #2a2a2a; color: #ccc; padding: 10px 36px 10px 14px; font-family: 'Barlow', sans-serif; font-size: 13px; cursor: pointer; background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%23888' stroke-width='1.5' fill='none'/%3E%3C/svg%3E"); background-repeat: no-repeat; background-position: right 12px center; }
  select:focus { outline: none; border-color: #e63946; }
  @media (max-width: 768px) {
    .products-grid { grid-template-columns: repeat(2, 1fr) !important; }
    .product-detail { grid-template-columns: 1fr !important; }
    .cart-layout { grid-template-columns: 1fr !important; }
    .hero-title { font-size: 48px !important; }
    .nav-desktop { display: none !important; }
  }
  @media (max-width: 480px) {
    .products-grid { grid-template-columns: 1fr !important; }
  }
`;

export default function App() {
  const [page, setPage] = useState("home");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cart, setCart] = useState([]);
  const [sortBy, setSortBy] = useState("default");
  const [filterCategory, setFilterCategory] = useState("Todos");
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  const categories = ["Todos", ...new Set(products.map((p) => p.category))];
  const sorted = [...products]
    .filter((p) => filterCategory === "Todos" || p.category === filterCategory)
    .sort((a, b) => {
      if (sortBy === "price-asc") return a.price - b.price;
      if (sortBy === "price-desc") return b.price - a.price;
      if (sortBy === "name") return a.name.localeCompare(b.name);
      return a.id - b.id;
    });

  const cartTotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const cartCount = cart.reduce((s, i) => s + i.qty, 0);
  const shipping = cartTotal >= 150000 ? 0 : 10000;

  const addToCart = (product, quantity = 1) => {
    setCart((prev) => {
      const ex = prev.find((i) => i.id === product.id);
      if (ex) return prev.map((i) => i.id === product.id ? { ...i, qty: i.qty + quantity } : i);
      return [...prev, { ...product, qty: quantity }];
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const removeFromCart = (id) => setCart((prev) => prev.filter((i) => i.id !== id));
  const updateQty = (id, q) => {
    if (q < 1) return removeFromCart(id);
    setCart((prev) => prev.map((i) => i.id === id ? { ...i, qty: q } : i));
  };

  const openProduct = (p) => { setSelectedProduct(p); setQty(1); setAdded(false); setPage("product"); window.scrollTo(0, 0); };
  const goTo = (p) => { setPage(p); setMobileMenu(false); window.scrollTo(0, 0); };

  const cartWaMessage = cart.map(i => `• ${i.name} x${i.qty} — ${fmt(i.price * i.qty)}`).join("\n") + `\n\nTotal: ${fmt(cartTotal + shipping)}`;

  return (
    <>
      <style>{globalStyles}</style>

      {/* HEADER */}
      <header style={{ background: "#111", borderBottom: "1px solid #1e1e1e", position: "sticky", top: 0, zIndex: 100 }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 20px", height: 60, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <button onClick={() => goTo("home")} style={{ background: "none", border: "none", cursor: "pointer" }}>
            <span style={{ fontFamily: "'Barlow Condensed'", fontWeight: 900, fontSize: 26, letterSpacing: 3, color: "#fff" }}>
              GEAR<span style={{ color: "#e63946" }}>LY</span>
            </span>
          </button>

          <nav className="nav-desktop" style={{ display: "flex", gap: 28 }}>
            <button className={`nav-link ${page === "home" ? "active" : ""}`} onClick={() => goTo("home")}>Inicio</button>
            <button className={`nav-link ${page === "products" ? "active" : ""}`} onClick={() => goTo("products")}>Productos</button>
            <button className="nav-link" onClick={() => goTo("about")}>Nosotros</button>
            <button className="nav-link" onClick={() => window.open(waLink("Hola Gearly, quiero más información 🏍️"), "_blank")}>Contacto</button>
          </nav>

          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <button onClick={() => goTo("cart")} style={{ background: "none", border: "none", cursor: "pointer", position: "relative", padding: 8 }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#f0f0f0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
              </svg>
              {cartCount > 0 && (
                <span style={{ position: "absolute", top: 0, right: 0, background: "#e63946", color: "#fff", borderRadius: "50%", width: 18, height: 18, fontSize: 10, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center" }}>{cartCount}</span>
              )}
            </button>
            <button onClick={() => setMobileMenu(!mobileMenu)} style={{ background: "none", border: "none", cursor: "pointer", display: "none", padding: 8 }} className="mobile-menu-btn">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#f0f0f0" strokeWidth="2"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
            </button>
          </div>
        </div>
        {mobileMenu && (
          <div style={{ background: "#111", borderTop: "1px solid #1e1e1e", padding: "16px 20px", display: "flex", flexDirection: "column", gap: 16 }}>
            {["home","products","about"].map(p => (
              <button key={p} className="nav-link" onClick={() => goTo(p)} style={{ textAlign: "left" }}>
                {p === "home" ? "Inicio" : p === "products" ? "Productos" : "Nosotros"}
              </button>
            ))}
            <button className="nav-link" style={{ textAlign: "left" }} onClick={() => window.open(waLink("Hola Gearly 🏍️"), "_blank")}>Contacto</button>
          </div>
        )}
      </header>

      {/* HOME PAGE */}
      {page === "home" && (
        <main>
          {/* Hero */}
          <section style={{ position: "relative", minHeight: "90vh", display: "flex", alignItems: "center", overflow: "hidden" }}>
            <div style={{ position: "absolute", inset: 0, backgroundImage: "url('https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1400&fit=crop')", backgroundSize: "cover", backgroundPosition: "center", filter: "brightness(0.25)" }} />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(10,10,10,0.9) 0%, rgba(230,57,70,0.1) 100%)" }} />
            <div style={{ position: "relative", maxWidth: 1200, margin: "0 auto", padding: "80px 20px" }}>
              <p style={{ color: "#e63946", fontSize: 12, letterSpacing: 4, textTransform: "uppercase", marginBottom: 16 }}>🏍️ Colombia — Gearly</p>
              <h1 className="hero-title" style={{ fontFamily: "'Barlow Condensed'", fontWeight: 900, fontSize: 72, lineHeight: 0.95, letterSpacing: 1, marginBottom: 24, maxWidth: 700 }}>
                EQUIPA TU MOTO.<br /><span style={{ color: "#e63946" }}>DOMINA</span> LA CALLE.
              </h1>
              <p style={{ fontSize: 18, color: "#aaa", maxWidth: 500, lineHeight: 1.6, marginBottom: 40 }}>
                Accesorios esenciales para motociclistas en Colombia. Más seguridad, más estilo y mejor experiencia en cada viaje.
              </p>
              <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
                <button className="btn-red" style={{ fontSize: 16, padding: "16px 36px" }} onClick={() => goTo("products")}>Ver productos</button>
                <button className="btn-ghost" style={{ fontSize: 15 }} onClick={() => window.open(waLink("Hola Gearly, quiero más información 🏍️"), "_blank")}>
                  💬 Escríbenos por WhatsApp
                </button>
              </div>
            </div>
          </section>

          {/* Beneficios */}
          <section style={{ background: "#111", borderTop: "1px solid #1e1e1e", borderBottom: "1px solid #1e1e1e" }}>
            <div style={{ maxWidth: 1200, margin: "0 auto", padding: "32px 20px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 24 }}>
              {[["🚚","Envío a toda Colombia","En 1–3 días hábiles"],["✅","Calidad garantizada","Productos probados"],["💰","Precios accesibles","Desde $25.000 COP"],["💬","Atención por WhatsApp","Respuesta inmediata"]].map(([icon, title, sub]) => (
                <div key={title} style={{ textAlign: "center", padding: "8px 0" }}>
                  <div style={{ fontSize: 28, marginBottom: 8 }}>{icon}</div>
                  <p style={{ fontFamily: "'Barlow Condensed'", fontWeight: 700, fontSize: 16, letterSpacing: 1, textTransform: "uppercase" }}>{title}</p>
                  <p style={{ color: "#666", fontSize: 13, marginTop: 4 }}>{sub}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Productos destacados */}
          <section style={{ maxWidth: 1200, margin: "0 auto", padding: "64px 20px" }}>
            <div style={{ marginBottom: 40 }}>
              <p style={{ color: "#e63946", fontSize: 12, letterSpacing: 3, textTransform: "uppercase", marginBottom: 8 }}>Lo más vendido</p>
              <h2 style={{ fontFamily: "'Barlow Condensed'", fontWeight: 900, fontSize: 38, letterSpacing: 1 }}>PRODUCTOS <span style={{ color: "#e63946" }}>ESTRELLA</span></h2>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 20, marginBottom: 40 }}>
              {products.slice(0, 4).map((p) => (
                <div key={p.id} className="card" onClick={() => openProduct(p)}>
                  <div style={{ position: "relative", aspectRatio: "1", overflow: "hidden", background: "#1a1a1a" }}>
                    <img src={p.image} alt={p.name} style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.4s" }} onMouseEnter={e => e.target.style.transform = "scale(1.06)"} onMouseLeave={e => e.target.style.transform = "scale(1)"} />
                    {p.badge && <span className="tag" style={{ position: "absolute", top: 12, left: 12 }}>{p.badge}</span>}
                    <span style={{ position: "absolute", top: 12, right: 12, background: "#0a0a0a", color: "#e63946", fontSize: 11, fontWeight: 700, padding: "3px 8px", border: "1px solid #e63946" }}>-{disc(p.price, p.originalPrice)}%</span>
                  </div>
                  <div style={{ padding: 16 }}>
                    <p style={{ color: "#666", fontSize: 11, letterSpacing: 2, textTransform: "uppercase", marginBottom: 4 }}>{p.category}</p>
                    <h3 style={{ fontFamily: "'Barlow Condensed'", fontWeight: 700, fontSize: 17, marginBottom: 10, lineHeight: 1.2 }}>{p.name}</h3>
                    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
                      <span style={{ fontFamily: "'Barlow Condensed'", fontWeight: 800, fontSize: 22 }}>{fmt(p.price)}</span>
                      <span style={{ fontSize: 13, color: "#555", textDecoration: "line-through" }}>{fmt(p.originalPrice)}</span>
                    </div>
                    <button className="btn-red" style={{ width: "100%" }} onClick={e => { e.stopPropagation(); addToCart(p); }}>+ Agregar al carrito</button>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ textAlign: "center" }}>
              <button className="btn-ghost" style={{ fontSize: 15, padding: "14px 40px" }} onClick={() => goTo("products")}>Ver todos los productos →</button>
            </div>
          </section>

          {/* Como funciona */}
          <section style={{ background: "#111", borderTop: "1px solid #1e1e1e", borderBottom: "1px solid #1e1e1e" }}>
            <div style={{ maxWidth: 1200, margin: "0 auto", padding: "64px 20px" }}>
              <div style={{ textAlign: "center", marginBottom: 48 }}>
                <p style={{ color: "#e63946", fontSize: 12, letterSpacing: 3, textTransform: "uppercase", marginBottom: 8 }}>Simple y rápido</p>
                <h2 style={{ fontFamily: "'Barlow Condensed'", fontWeight: 900, fontSize: 38 }}>¿CÓMO <span style={{ color: "#e63946" }}>FUNCIONA?</span></h2>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 32 }}>
                {[["01","Elige tu producto","Navega el catálogo y encuentra lo que necesitas para tu moto"],["02","Haz tu pedido","Por WhatsApp o directo en la tienda — fácil y seguro"],["03","Recíbelo en casa","Entrega en 1–3 días hábiles a toda Colombia"]].map(([num, title, desc]) => (
                  <div key={num} style={{ textAlign: "center" }}>
                    <div style={{ fontFamily: "'Barlow Condensed'", fontWeight: 900, fontSize: 56, color: "#1e1e1e", lineHeight: 1, marginBottom: 12 }}>{num}</div>
                    <h3 style={{ fontFamily: "'Barlow Condensed'", fontWeight: 700, fontSize: 20, letterSpacing: 1, textTransform: "uppercase", marginBottom: 8, color: "#e63946" }}>{title}</h3>
                    <p style={{ color: "#888", fontSize: 14, lineHeight: 1.6 }}>{desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Testimonios */}
          <section style={{ maxWidth: 1200, margin: "0 auto", padding: "64px 20px" }}>
            <div style={{ textAlign: "center", marginBottom: 40 }}>
              <p style={{ color: "#e63946", fontSize: 12, letterSpacing: 3, textTransform: "uppercase", marginBottom: 8 }}>Lo que dicen los riders</p>
              <h2 style={{ fontFamily: "'Barlow Condensed'", fontWeight: 900, fontSize: 38 }}>TESTIMONIOS</h2>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 20 }}>
              {[["Juan D.","Medellín","El soporte para celular llegó en 2 días, excelente calidad. Lo recomiendo a todos los riders."],["Camila R.","Bogotá","Los guantes son súper cómodos y el precio es muy bueno. Ya pedí el chaleco también."],["Andrés M.","Cali","La cubierta protege perfectamente mi moto. Material resistente y llegó bien empacada."]].map(([name, city, text]) => (
                <div key={name} style={{ background: "#111", border: "1px solid #1e1e1e", padding: 24 }}>
                  <p style={{ color: "#e63946", fontSize: 16, marginBottom: 12 }}>⭐⭐⭐⭐⭐</p>
                  <p style={{ color: "#ccc", fontSize: 14, lineHeight: 1.7, marginBottom: 16, fontStyle: "italic" }}>"{text}"</p>
                  <p style={{ fontFamily: "'Barlow Condensed'", fontWeight: 700, fontSize: 15 }}>{name}</p>
                  <p style={{ color: "#666", fontSize: 12 }}>{city}</p>
                </div>
              ))}
            </div>
          </section>

          {/* CTA Final */}
          <section style={{ background: "#e63946", padding: "64px 20px", textAlign: "center" }}>
            <h2 style={{ fontFamily: "'Barlow Condensed'", fontWeight: 900, fontSize: 42, color: "#fff", marginBottom: 12 }}>¿LISTO PARA EQUIPARTE?</h2>
            <p style={{ color: "rgba(255,255,255,0.8)", fontSize: 16, marginBottom: 32 }}>Escríbenos y te asesoramos gratis por WhatsApp</p>
            <button onClick={() => window.open(waLink("Hola Gearly! Quiero información sobre sus productos 🏍️"), "_blank")} style={{ background: "#fff", color: "#e63946", border: "none", padding: "16px 40px", fontFamily: "'Barlow Condensed'", fontWeight: 900, fontSize: 18, letterSpacing: 1, textTransform: "uppercase", cursor: "pointer" }}>
              💬 Escríbenos ahora
            </button>
          </section>
        </main>
      )}

      {/* PRODUCTS PAGE */}
      {page === "products" && (
        <main style={{ maxWidth: 1200, margin: "0 auto", padding: "40px 20px" }}>
          <div style={{ marginBottom: 32 }}>
            <p style={{ color: "#e63946", fontSize: 12, letterSpacing: 3, textTransform: "uppercase", marginBottom: 8 }}>Catálogo completo</p>
            <h1 style={{ fontFamily: "'Barlow Condensed'", fontWeight: 900, fontSize: 42, letterSpacing: 1 }}>TODOS LOS <span style={{ color: "#e63946" }}>PRODUCTOS</span></h1>
          </div>

          <div style={{ display: "flex", gap: 12, marginBottom: 28, flexWrap: "wrap", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {categories.map((cat) => (
                <button key={cat} onClick={() => setFilterCategory(cat)} style={{ background: filterCategory === cat ? "#e63946" : "#1a1a1a", color: filterCategory === cat ? "#fff" : "#aaa", border: "1px solid", borderColor: filterCategory === cat ? "#e63946" : "#2a2a2a", padding: "7px 16px", fontFamily: "'Barlow Condensed'", fontSize: 13, letterSpacing: 1, textTransform: "uppercase", cursor: "pointer", transition: "all 0.2s" }}>
                  {cat}
                </button>
              ))}
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ color: "#555", fontSize: 13 }}>{sorted.length} productos</span>
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                <option value="default">Ordenar: Destacados</option>
                <option value="price-asc">Precio: Menor a Mayor</option>
                <option value="price-desc">Precio: Mayor a Menor</option>
                <option value="name">Nombre: A–Z</option>
              </select>
            </div>
          </div>

          <div className="products-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
            {sorted.map((p) => (
              <div key={p.id} className="card" onClick={() => openProduct(p)}>
                <div style={{ position: "relative", aspectRatio: "1", overflow: "hidden", background: "#1a1a1a" }}>
                  <img src={p.image} alt={p.name} style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.4s" }} onMouseEnter={e => e.target.style.transform = "scale(1.06)"} onMouseLeave={e => e.target.style.transform = "scale(1)"} />
                  {p.badge && <span className="tag" style={{ position: "absolute", top: 12, left: 12 }}>{p.badge}</span>}
                  <span style={{ position: "absolute", top: 12, right: 12, background: "#0a0a0a", color: "#e63946", fontSize: 11, fontWeight: 700, padding: "3px 8px", border: "1px solid #e63946" }}>-{disc(p.price, p.originalPrice)}%</span>
                </div>
                <div style={{ padding: 16 }}>
                  <p style={{ color: "#666", fontSize: 11, letterSpacing: 2, textTransform: "uppercase", marginBottom: 4 }}>{p.category}</p>
                  <h3 style={{ fontFamily: "'Barlow Condensed'", fontWeight: 700, fontSize: 17, marginBottom: 8, lineHeight: 1.2 }}>{p.name}</h3>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
                    <span style={{ fontFamily: "'Barlow Condensed'", fontWeight: 800, fontSize: 22 }}>{fmt(p.price)}</span>
                    <span style={{ fontSize: 13, color: "#555", textDecoration: "line-through" }}>{fmt(p.originalPrice)}</span>
                  </div>
                  <button className="btn-red" style={{ width: "100%" }} onClick={e => { e.stopPropagation(); addToCart(p); }}>+ Agregar al carrito</button>
                </div>
              </div>
            ))}
          </div>
        </main>
      )}

      {/* PRODUCT DETAIL */}
      {page === "product" && selectedProduct && (
        <main style={{ maxWidth: 1100, margin: "0 auto", padding: "40px 20px" }}>
          <button onClick={() => goTo("products")} style={{ background: "none", border: "none", color: "#666", cursor: "pointer", fontFamily: "'Barlow Condensed'", fontSize: 13, letterSpacing: 2, textTransform: "uppercase", marginBottom: 32 }}>← Volver</button>
          <div className="product-detail" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48 }}>
            <div style={{ position: "relative", background: "#111", aspectRatio: "1", overflow: "hidden" }}>
              <img src={selectedProduct.image} alt={selectedProduct.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              {selectedProduct.badge && <span className="tag" style={{ position: "absolute", top: 16, left: 16 }}>{selectedProduct.badge}</span>}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              <div>
                <p style={{ color: "#e63946", fontSize: 11, letterSpacing: 3, textTransform: "uppercase", marginBottom: 8 }}>{selectedProduct.category}</p>
                <h1 style={{ fontFamily: "'Barlow Condensed'", fontWeight: 900, fontSize: 36, lineHeight: 1.1, marginBottom: 16 }}>{selectedProduct.name}</h1>
                <div style={{ display: "flex", alignItems: "baseline", gap: 12, marginBottom: 6 }}>
                  <span style={{ fontFamily: "'Barlow Condensed'", fontWeight: 800, fontSize: 36 }}>{fmt(selectedProduct.price)}</span>
                  <span style={{ fontSize: 16, color: "#555", textDecoration: "line-through" }}>{fmt(selectedProduct.originalPrice)}</span>
                  <span className="tag">-{disc(selectedProduct.price, selectedProduct.originalPrice)}% OFF</span>
                </div>
                <p style={{ color: "#4ade80", fontSize: 13 }}>✓ En stock — Envío 1–3 días hábiles a toda Colombia</p>
              </div>
              <div style={{ height: 1, background: "#1e1e1e" }} />
              <p style={{ color: "#aaa", fontSize: 15, lineHeight: 1.7 }}>{selectedProduct.description}</p>
              <div style={{ height: 1, background: "#1e1e1e" }} />
              <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                <span style={{ color: "#666", fontSize: 12, letterSpacing: 1, textTransform: "uppercase" }}>Cantidad</span>
                <div style={{ display: "flex", border: "1px solid #2a2a2a" }}>
                  <button onClick={() => setQty(Math.max(1, qty - 1))} style={{ background: "#1a1a1a", border: "none", color: "#fff", width: 36, height: 36, cursor: "pointer", fontSize: 18 }}>−</button>
                  <span style={{ width: 40, textAlign: "center", fontFamily: "'Barlow Condensed'", fontWeight: 700, fontSize: 16, lineHeight: "36px" }}>{qty}</span>
                  <button onClick={() => setQty(qty + 1)} style={{ background: "#1a1a1a", border: "none", color: "#fff", width: 36, height: 36, cursor: "pointer", fontSize: 18 }}>+</button>
                </div>
              </div>
              <div style={{ display: "flex", gap: 12 }}>
                <button className="btn-red" style={{ flex: 1, padding: 14 }} onClick={() => addToCart(selectedProduct, qty)}>
                  {added ? "✓ Agregado" : "+ Agregar al carrito"}
                </button>
                <button className="btn-ghost" style={{ flex: 1, padding: 14 }} onClick={() => window.open(waLink(`Hola Gearly! Quiero comprar: ${selectedProduct.name} x${qty} — ${fmt(selectedProduct.price * qty)} 🏍️`), "_blank")}>
                  💬 Comprar por WhatsApp
                </button>
              </div>
              <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
                {["🚚 Envío gratis +$150k", "🔄 Devolución fácil", "🔒 Pago seguro"].map(b => (
                  <span key={b} style={{ fontSize: 12, color: "#666" }}>{b}</span>
                ))}
              </div>
            </div>
          </div>
        </main>
      )}

      {/* CART */}
      {page === "cart" && (
        <main style={{ maxWidth: 900, margin: "0 auto", padding: "40px 20px" }}>
          <h1 style={{ fontFamily: "'Barlow Condensed'", fontWeight: 900, fontSize: 38, marginBottom: 32 }}>
            MI <span style={{ color: "#e63946" }}>CARRITO</span>
            {cartCount > 0 && <span style={{ fontSize: 18, color: "#666", marginLeft: 12 }}>({cartCount} {cartCount === 1 ? "artículo" : "artículos"})</span>}
          </h1>
          {cart.length === 0 ? (
            <div style={{ textAlign: "center", padding: "80px 0" }}>
              <div style={{ fontSize: 64, marginBottom: 16 }}>🏍️</div>
              <p style={{ color: "#666", fontSize: 18, marginBottom: 24 }}>Tu carrito está vacío</p>
              <button className="btn-red" onClick={() => goTo("products")}>Ver productos</button>
            </div>
          ) : (
            <div className="cart-layout" style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 32 }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                {cart.map((item) => (
                  <div key={item.id} style={{ background: "#111", border: "1px solid #1e1e1e", padding: 20, display: "flex", gap: 16, alignItems: "center" }}>
                    <img src={item.image} alt={item.name} style={{ width: 72, height: 72, objectFit: "cover", background: "#1a1a1a", flexShrink: 0 }} />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p style={{ color: "#666", fontSize: 11, letterSpacing: 2, textTransform: "uppercase" }}>{item.category}</p>
                      <p style={{ fontFamily: "'Barlow Condensed'", fontWeight: 700, fontSize: 16, marginBottom: 8 }}>{item.name}</p>
                      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <div style={{ display: "flex", border: "1px solid #2a2a2a" }}>
                          <button onClick={() => updateQty(item.id, item.qty - 1)} style={{ background: "#1a1a1a", border: "none", color: "#fff", width: 28, height: 28, cursor: "pointer" }}>−</button>
                          <span style={{ width: 30, textAlign: "center", fontSize: 13, fontWeight: 700, lineHeight: "28px" }}>{item.qty}</span>
                          <button onClick={() => updateQty(item.id, item.qty + 1)} style={{ background: "#1a1a1a", border: "none", color: "#fff", width: 28, height: 28, cursor: "pointer" }}>+</button>
                        </div>
                        <button onClick={() => removeFromCart(item.id)} style={{ background: "none", border: "none", color: "#555", cursor: "pointer", fontSize: 12, textDecoration: "underline" }}>Eliminar</button>
                      </div>
                    </div>
                    <div style={{ textAlign: "right", flexShrink: 0 }}>
                      <p style={{ fontFamily: "'Barlow Condensed'", fontWeight: 800, fontSize: 19 }}>{fmt(item.price * item.qty)}</p>
                      <p style={{ color: "#555", fontSize: 12 }}>{fmt(item.price)} c/u</p>
                    </div>
                  </div>
                ))}
              </div>
              <div>
                <div style={{ background: "#111", border: "1px solid #1e1e1e", padding: 24, position: "sticky", top: 80 }}>
                  <h3 style={{ fontFamily: "'Barlow Condensed'", fontWeight: 800, fontSize: 20, marginBottom: 20, letterSpacing: 1 }}>RESUMEN DEL PEDIDO</h3>
                  {cartTotal < 150000 && (
                    <div style={{ background: "#1a1a1a", border: "1px solid #2a2a2a", padding: "10px 12px", marginBottom: 16 }}>
                      <p style={{ fontSize: 12, color: "#aaa" }}>Agrega <strong style={{ color: "#fff" }}>{fmt(150000 - cartTotal)}</strong> más para envío gratis 🎉</p>
                      <div style={{ height: 4, background: "#2a2a2a", marginTop: 8, borderRadius: 2 }}>
                        <div style={{ height: "100%", background: "#e63946", width: `${Math.min(100, (cartTotal / 150000) * 100)}%`, borderRadius: 2, transition: "width 0.3s" }} />
                      </div>
                    </div>
                  )}
                  <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 20 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", color: "#aaa", fontSize: 14 }}>
                      <span>Subtotal</span><span>{fmt(cartTotal)}</span>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 14 }}>
                      <span style={{ color: "#aaa" }}>Envío</span>
                      <span style={{ color: shipping === 0 ? "#4ade80" : "#fff" }}>{shipping === 0 ? "GRATIS 🎉" : fmt(shipping)}</span>
                    </div>
                    <div style={{ height: 1, background: "#1e1e1e" }} />
                    <div style={{ display: "flex", justifyContent: "space-between", fontFamily: "'Barlow Condensed'", fontWeight: 800, fontSize: 22 }}>
                      <span>TOTAL</span><span>{fmt(cartTotal + shipping)}</span>
                    </div>
                  </div>
                  <button className="btn-red" style={{ width: "100%", padding: 14, fontSize: 15, marginBottom: 10 }} onClick={() => window.open(waLink(`Hola Gearly! Quiero hacer este pedido:\n\n${cartWaMessage}`), "_blank")}>
                    💬 Finalizar por WhatsApp
                  </button>
                  <button className="btn-ghost" style={{ width: "100%", padding: 12 }} onClick={() => goTo("products")}>Seguir comprando</button>
                  <p style={{ textAlign: "center", color: "#444", fontSize: 11, marginTop: 12 }}>🔒 Pago seguro · 🚚 Entrega rápida</p>
                </div>
              </div>
            </div>
          )}
        </main>
      )}

      {/* ABOUT */}
      {page === "about" && (
        <main style={{ maxWidth: 800, margin: "0 auto", padding: "80px 20px", textAlign: "center" }}>
          <p style={{ color: "#e63946", fontSize: 12, letterSpacing: 3, textTransform: "uppercase", marginBottom: 16 }}>Nuestra historia</p>
          <h1 style={{ fontFamily: "'Barlow Condensed'", fontWeight: 900, fontSize: 48, marginBottom: 32 }}>SOBRE <span style={{ color: "#e63946" }}>GEARLY</span></h1>
          <p style={{ color: "#aaa", fontSize: 17, lineHeight: 1.9, marginBottom: 40 }}>
            Gearly nace para los motociclistas que viven la calle todos los días. En Colombia, la moto no es un lujo, es una necesidad. Por eso ofrecemos accesorios funcionales, accesibles y confiables que realmente hacen la diferencia.
            <br /><br />
            No somos solo una tienda, estamos construyendo una comunidad de riders.
          </p>
          <button className="btn-red" style={{ fontSize: 16, padding: "14px 40px" }} onClick={() => goTo("products")}>Ver productos</button>
        </main>
      )}

      {/* WhatsApp flotante */}
      <a href={waLink("Hola Gearly! 🏍️")} target="_blank" rel="noreferrer" style={{ position: "fixed", bottom: 24, right: 24, background: "#25D366", borderRadius: "50%", width: 56, height: 56, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 20px rgba(37,211,102,0.4)", zIndex: 999, textDecoration: "none", transition: "transform 0.2s" }} onMouseEnter={e => e.currentTarget.style.transform = "scale(1.1)"} onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}>
        <svg width="28" height="28" viewBox="0 0 24 24" fill="#fff"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
      </a>

      {/* Footer */}
      <footer style={{ borderTop: "1px solid #1a1a1a", padding: "40px 20px", textAlign: "center", marginTop: 80 }}>
        <p style={{ fontFamily: "'Barlow Condensed'", fontWeight: 900, fontSize: 22, letterSpacing: 3, marginBottom: 8 }}>GEAR<span style={{ color: "#e63946" }}>LY</span></p>
        <p style={{ color: "#444", fontSize: 13, marginBottom: 16 }}>Equipa tu moto. Domina la calle. · Colombia 🇨🇴</p>
        <div style={{ display: "flex", gap: 20, justifyContent: "center" }}>
          <a href="https://instagram.com/gearly" target="_blank" rel="noreferrer" style={{ color: "#555", fontSize: 13, textDecoration: "none" }}>Instagram</a>
          <a href="https://tiktok.com/@gearly" target="_blank" rel="noreferrer" style={{ color: "#555", fontSize: 13, textDecoration: "none" }}>TikTok</a>
          <a href={waLink("Hola Gearly! 🏍️")} target="_blank" rel="noreferrer" style={{ color: "#555", fontSize: 13, textDecoration: "none" }}>WhatsApp</a>
        </div>
      </footer>
    </>
  );
}
