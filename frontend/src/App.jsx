import React, { useEffect, useMemo, useState } from "react";
import {
  Routes,
  Route,
  Link,
  useNavigate,
  useParams,
  useSearchParams,
  Navigate,
  useLocation,
} from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Heart,
  Minus,
  Plus,
  Trash2,
  Check,
  ShoppingBag,
  Instagram,
  ShieldCheck,
  Sparkles,
  MapPin,
  MessageCircle,
  Gem,
  Package,
  Users,
  IndianRupee,
  ChartNoAxesCombined,
  LogOut,
  Tag,
  Boxes,
  ClipboardList,
  Eye,
  EyeOff,
} from "lucide-react";
import { QRCodeCanvas } from "qrcode.react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ProductCard, { money } from "./components/ProductCard";
import { statusPillClass } from "./utils/status";
import Chatbot from "./components/Chatbot";
import AdminLayout from "./components/AdminLayout";
import {
  AdminCategories,
  AdminCustomers,
  AdminDiscounts,
  AdminInventory,
  AdminOrders,
  AdminPayments,
  AdminReportsLive,
} from "./components/AdminFeatures";
import {
  AdminAttendanceAnalysis,
  AdminEmployeePerformance,
  AdminEmployeeReports,
  AdminEmployees,
  AdminSalesAnalysis,
  EmployeeDashboard,
} from "./components/EmployeeFeatures";
import { useStore } from "./context/StoreContext";
import { useToast } from "./context/ToastContext";
import { api } from "./config/api";
import { categories as defaultCategories } from "./data/categories";
import { BRAND, CHANNEL_URL } from "./config/brand";
import { categoryImage, fashionImages } from "./config/images";
const salePrice = (p) => Number(p.customerPrice ?? ((p.sellingPrice || p.price) * (1 - p.discount / 100)));
const localToday = () => {
  const date = new Date();
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
};
function SectionTitle({ eyebrow, title, link, to }) {
  return (
    <div className="section-title">
      <div>
        <span className="eyebrow">{eyebrow}</span>
        <h2>{title}</h2>
      </div>
      {link && (
        <Link className="text-link" to={to}>
          {link}
          <ArrowRight size={16} />
        </Link>
      )}
    </div>
  );
}
function Home() {
  const { products } = useStore();
  const hot = products.filter((p) => p.hotSale).slice(0, 8),
    fresh = products.filter((p) => p.isNew).slice(0, 4),
    best = [...products].sort((a, b) => b.sold - a.sold).slice(0, 4);
  const benefits = [
    {
      Icon: Sparkles,
      title: "Thoughtfully curated",
      description: "Indian wear for every occasion",
    },
    {
      Icon: MapPin,
      title: "Visit us in Vizag",
      description: "A local boutique, here to help",
    },
    {
      Icon: MessageCircle,
      title: "Easy to get in touch",
      description: "Chat or call our studio team",
    },
    {
      Icon: Gem,
      title: "Wholesale welcome",
      description: "Minimum order ₹5,000",
    },
  ];

  return (
    <>
      <div className="hero">
        <div className="hero-copy">
          <span className="eyebrow">THE NEW SEASON EDIT · 2026</span>
          <h1>
            Style that
            <br />
            <em>feels like you.</em>
          </h1>
          <p>
            Thoughtfully chosen pieces. A little everyday magic. Discover the
            looks that feel like they were made just for you.
          </p>
          <div className="hero-actions">
            <Link to="/shop" className="button dark">
              Discover the collection <ArrowRight size={16} />
            </Link>
            <Link to="/about" className="under-link">
              A little about us
            </Link>
          </div>
          <div className="hero-note">
            <span>✳</span> Curated with love, worn your way
          </div>
        </div>
        <div className="hero-visual">
          <img
            src={fashionImages.hero}
            alt="Model wearing a soft green embroidered outfit"
          />
        </div>
      </div>
      <main>
        <section className="section warm-section">
          <div className="container">
            <SectionTitle
              eyebrow="A LITTLE SOMETHING SPECIAL"
              title="The hot list"
              link="Shop hot sales"
              to="/hot-sales"
            />
            <div className="product-grid">
              {hot.slice(0, 4).map((p) => (
                <ProductCard product={p} key={p.id} />
              ))}
            </div>
          </div>
        </section>
        <section className="promise-strip" aria-label="Studio benefits">
          <div className="promise-track">
            {[false, true].map((duplicate) => (
              <div className="promise-group" key={String(duplicate)} aria-hidden={duplicate || undefined}>
                {benefits.map(({ Icon, title, description }) => (
                  <div className="promise-benefit" key={title}>
                    <span className="promise-icon"><Icon size={17} /></span>
                    <span>
                      <b>{title}</b>
                      <small>{description}</small>
                    </span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </section>
        <section className="section container">
          <SectionTitle
            eyebrow="JUST ARRIVED"
            title="New things to love"
            link="See new arrivals"
            to="/new-arrivals"
          />
          <div className="product-grid">
            {fresh.map((p) => (
              <ProductCard product={p} key={p.id} />
            ))}
          </div>
        </section>
        <section className="collection-banner">
          <img
            src={fashionImages.collection}
            alt="Festive fashion collection"
          />
          <div>
            <span className="eyebrow">MADE FOR YOUR MOMENTS</span>
            <h2>
              Dress up for
              <br />
              <em>your kind of magic.</em>
            </h2>
            <p>From everyday ease to the celebrations you’ll remember.</p>
          </div>
        </section>
        <section className="section container">
          <SectionTitle
            eyebrow="LOVED A LITTLE MORE"
            title="The community favourites"
            link="Shop best sellers"
            to="/shop"
          />
          <div className="product-grid">
            {best.map((p) => (
              <ProductCard product={p} key={p.id} />
            ))}
          </div>
        </section>
        <section className="instagram-section">
          <div className="insta-copy">
            <span className="eyebrow">A LITTLE MORE H Y N I</span>
            <h2>
              Meet us where
              <br />
              <em>the inspiration lives.</em>
            </h2>
            <p>
              Fresh looks, little details and a behind-the-scenes peek at our
              world. Come say hello.
            </p>
            <a
              className="button dark"
              href={BRAND.instagram}
              target="_blank"
              rel="noreferrer"
            >
              <Instagram size={17} /> Follow on Instagram{" "}
              <ArrowUpRight size={16} />
            </a>
            <small>@hynifashionstudio</small>
          </div>
          <a
            className="insta-preview"
            href={BRAND.instagram}
            target="_blank"
            rel="noreferrer"
          >
            <img
              src={fashionImages.community}
              alt="Fashion inspiration from Hyni"
            />
            <span>
              <Instagram /> View our latest edits <ArrowUpRight />
            </span>
          </a>
        </section>
        <section className="section container qr-section">
          <SectionTitle
            eyebrow="LET'S STAY IN TOUCH"
            title="A little Hyni in your day"
          />
          <p className="section-intro">
            Scan, say hello, and be first to know when something lovely arrives.
          </p>
          <div className="qr-grid">
            <div className="qr-card">
              <div className="qr-code">
                <QRCodeCanvas
                  value={CHANNEL_URL}
                  size={140}
                  bgColor="#fffdf9"
                  fgColor="#6e1f2c"
                  level="H"
                />
              </div>
              <div>
                <span className="eyebrow">01 · STAY IN THE LOOP</span>
                <h3>Join our updates channel</h3>
                <p>
                  Get the latest collections, new arrivals, offers and boutique
                  updates.
                </p>
                <a
                  href={CHANNEL_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="text-link"
                >
                  Join channel <ArrowUpRight size={15} />
                </a>
                <small>
                  Configure the real channel URL in src/config/brand.js.
                </small>
              </div>
            </div>
            <div className="qr-card">
              <div className="qr-code">
                <QRCodeCanvas
                  value={BRAND.instagram}
                  size={140}
                  bgColor="#fffdf9"
                  fgColor="#6e1f2c"
                  level="H"
                />
              </div>
              <div>
                <span className="eyebrow">02 · FOLLOW THE FEELING</span>
                <h3>Follow us on Instagram</h3>
                <p>
                  Discover latest styles, videos, collections and fashion
                  inspiration.
                </p>
                <a
                  href={BRAND.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="text-link"
                >
                  Follow on Instagram <ArrowUpRight size={15} />
                </a>
              </div>
            </div>
          </div>
        </section>
        <section className="studio-note">
          <span className="eyebrow">A NOTE FROM THE STUDIO</span>
          <blockquote>
            “Clothes that don't just dress you up.
            <br />
            <em>They bring you back to yourself.</em>”
          </blockquote>
          <p>With love, Hyni</p>
        </section>
      </main>
    </>
  );
}
function Shop({ mode = "all" }) {
  const { products, categories } = useStore();
  const categoryOptions = categories.length ? categories : defaultCategories;
  const [params, setParams] = useSearchParams();
  const [category, setCategory] = useState("All"),
    [sort, setSort] = useState("featured"),
    [max, setMax] = useState("5000");
  const q = params.get("q") || "";
  const query = q.trim().toLowerCase();
  const matchingCategoryNames = useMemo(
    () =>
      categoryOptions
        .filter((c) => {
          const text = `${c.name || ""} ${c.slug || ""}`.toLowerCase();
          return text.includes(query) || (query && query.includes(String(c.name || "").toLowerCase()));
        })
        .map((c) => String(c.name || "").toLowerCase()),
    [categoryOptions, query],
  );
  const list = useMemo(
    () =>
      products
        .filter((p) => {
          const searchable = [p.name, p.category, p.subcategory, p.code, p.slug]
            .filter(Boolean)
            .join(" ")
            .toLowerCase();
          return (
            (mode === "hot" ? p.hotSale : mode === "new" ? p.isNew : true) &&
            (category === "All" || p.category === category) &&
            (!query ||
              searchable.includes(query) ||
              matchingCategoryNames.includes(String(p.category || "").toLowerCase())) &&
            salePrice(p) <= Number(max)
          );
        })
        .sort((a, b) =>
          sort === "low"
            ? salePrice(a) - salePrice(b)
            : sort === "high"
              ? salePrice(b) - salePrice(a)
              : sort === "discount"
                ? b.discount - a.discount
                : 0,
        ),
    [products, mode, category, query, sort, max, matchingCategoryNames],
  );
  const editorialHeading =
    mode === "hot"
      ? {
          eyebrow: "A LITTLE SOMETHING SPECIAL",
          title: "Good finds, lovely prices.",
          description:
            "Meet studio favourites at special prices. Thoughtful pieces, ready for their next outing.",
        }
      : {
          eyebrow: "THE HYNI EDIT",
          title: "Shop your kind of beautiful.",
          description:
            "Thoughtful Indian wear for everyday rituals, little celebrations and all the moments in between.",
        };
  return (
    <>
      {mode !== "new" && (
        <section className="shop-editorial-heading">
          <div>
            <span
              className="eyebrow"
              id={mode === "all" ? "categories" : undefined}
            >
              {editorialHeading.eyebrow}
            </span>
            <h1>{editorialHeading.title}</h1>
            <p>{editorialHeading.description}</p>
          </div>
        </section>
      )}
      <main
        className={`page container shop-page ${mode !== "new" ? "shop-page-editorial" : ""}`}
      >
        {mode === "new" && (
          <div className="page-heading">
            <span className="eyebrow">FRESH OFF THE RACK</span>
            <h1>New arrivals</h1>
            <p>
              Considered pieces for your everyday, and the days that call for a
              little extra.
            </p>
          </div>
        )}
      <div className="shop-toolbar">
        <span>{list.length} pieces to discover</span>
        <div className="filter-controls">
          <select
            aria-label="Filter category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option>All</option>
            {categoryOptions.map((c) => (
              <option key={c.name}>{c.name}</option>
            ))}
          </select>
          <select
            aria-label="Filter price"
            value={max}
            onChange={(e) => setMax(e.target.value)}
          >
            <option value="5000">Any price</option>
            <option value="1500">Under ₹1,500</option>
            <option value="2500">Under ₹2,500</option>
            <option value="3500">Under ₹3,500</option>
          </select>
          <select
            aria-label="Sort products"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="featured">Featured</option>
            <option value="low">Price: low to high</option>
            <option value="high">Price: high to low</option>
            <option value="discount">Biggest discount</option>
          </select>
        </div>
      </div>
      {list.length ? (
        <div className="product-grid">
          {list.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <ShoppingBag size={35} />
          <h2>No pieces found</h2>
          <p>{query ? `Nothing matches “${q}”. Try another category or search term.` : "Try another filter to find your style."}</p>
          <button
            className="button dark"
            onClick={() => {
              setCategory("All");
              setMax("5000");
              setParams({});
            }}
          >
            Reset filters
          </button>
        </div>
      )}
      </main>
    </>
  );
}
function ProductDetail() {
  const { id } = useParams();
  const { products, addToCart, toggleWishlist, wishlist } = useStore();
  const toast = useToast();
  const navigate = useNavigate();
  const p = products.find((x) => x.id === id);
  const [qty, setQty] = useState(1);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [imageDirection, setImageDirection] = useState("next");

  useEffect(() => {
    setQty(1);
    setSelectedSize("");
    setSelectedColor("");
    setActiveImageIndex(0);
    setImageDirection("next");
  }, [id]);

  if (!p)
    return (
      <main className="page container">
        <h1>Piece not found</h1>
        <Link to="/shop">Back to shop</Link>
      </main>
    );
  const gallery = [p.image, ...(p.images || [])].filter(Boolean);
  const shownImageIndex = Math.max(
    0,
    Math.min(activeImageIndex, gallery.length - 1),
  );
  const shownImage = gallery[shownImageIndex];
  return (
    <main className="detail-page container">
      <div className="detail-gallery">
        <div className="detail-gallery-item">
          {shownImage && (
            <img
              key={shownImageIndex}
              src={shownImage}
              className={`detail-gallery-photo slide-${imageDirection}`}
              alt={`${p.name} view ${shownImageIndex + 1} of ${gallery.length}`}
            />
          )}
          {shownImageIndex === 0 && p.discount > 0 && (
            <span className="sale-badge">{p.discount}% OFF</span>
          )}
          {shownImageIndex > 0 && (
            <button
              type="button"
              className="detail-gallery-arrow previous"
              aria-label="Previous product image"
              onClick={() => {
                setImageDirection("previous");
                setActiveImageIndex(shownImageIndex - 1);
              }}
            >
              <ArrowLeft size={20} />
            </button>
          )}
          {shownImageIndex < gallery.length - 1 && (
            <button
              type="button"
              className="detail-gallery-arrow next"
              aria-label="Next product image"
              onClick={() => {
                setImageDirection("next");
                setActiveImageIndex(shownImageIndex + 1);
              }}
            >
              <ArrowRight size={20} />
            </button>
          )}
        </div>
      </div>
      <div className="detail-copy">
        <span className="eyebrow">
          {p.category} / {p.code}
        </span>
        <h1>{p.name}</h1>
        <div className="detail-price">
          <b>{money(salePrice(p))}</b>
          {p.discount > 0 && <del>{money(p.price)}</del>}
          <span>
            {p.discount > 0 ? "You save " + money(p.price - salePrice(p)) : ""}
          </span>
        </div>
        <p className="detail-desc">
          A thoughtfully selected piece with a lovely finish, made to bring a
          little more feeling to your wardrobe. Pair it your way, and make it
          yours.
        </p>
        <div className="size-selector">
          <span>Choose your size</span>
          <div role="group" aria-label="Available sizes">
            {p.sizes.map((size) => (
              <button
                key={size}
                type="button"
                className={selectedSize === size ? "selected" : ""}
                aria-pressed={selectedSize === size}
                onClick={() => setSelectedSize(size)}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
        {p.colors?.length > 0 && (
          <div className="size-selector">
            <span>Choose your colour</span>
            <div role="group" aria-label="Available colours">
              {p.colors.map((color) => (
                <button
                  key={color}
                  type="button"
                  className={selectedColor === color ? "selected" : ""}
                  aria-pressed={selectedColor === color}
                  onClick={() => setSelectedColor(color)}
                >
                  {color}
                </button>
              ))}
            </div>
          </div>
        )}
        <div className="detail-facts">
          <div>
            <small>FABRIC</small>
            <b>{p.fabric}</b>
          </div>
          <div>
            <small>AVAILABILITY</small>
            <b className={p.stock > 0 && p.stock <= 5 ? "stock-note low-stock" : p.stock <= 0 ? "stock-note out-of-stock" : ""}>
              {p.stock > 5
                ? "In stock"
                : p.stock > 0
                  ? `Only ${p.stock} ${p.stock === 1 ? "piece" : "pieces"} left!`
                  : "Out of stock"}
            </b>
          </div>
        </div>
        <div className="quantity-control">
          <button onClick={() => setQty(Math.max(1, qty - 1))}>
            <Minus />
          </button>
          <span>{qty}</span>
          <button onClick={() => setQty(Math.min(p.stock, qty + 1))}>
            <Plus />
          </button>
        </div>
        <div className="detail-actions">
          <button
            className="button dark"
            disabled={!p.stock || (p.sizes.length > 0 && !selectedSize) || (p.colors.length > 0 && !selectedColor)}
            onClick={async () => { try { await addToCart(p, qty, selectedSize, selectedColor); toast.success(`${p.name} added to your bag.`); } catch (e) { toast.error(e.message); if (!localStorage.getItem("hyni_token")) navigate("/login"); } }}
          >
            Add to bag · {money(salePrice(p) * qty)} <ShoppingBag size={17} />
          </button>
          <button className="button outline" onClick={async () => { try { await toggleWishlist(p); } catch (e) { toast.error(e.message); if (!localStorage.getItem("hyni_token")) navigate("/login"); } }}>
            <Heart size={17} />{" "}
            {wishlist.some((x) => x.id === p.id) ? "Saved" : "Save piece"}
          </button>
        </div>
        <div className="detail-help">
          <ShieldCheck />{" "}
          <span>
            <b>A little note</b>
            <br />
            Product availability and pricing are loaded from our live catalogue.
          </span>
        </div>
      </div>
    </main>
  );
}
function Cart({ wholesale = false }) {
  const { cart, updateQty, removeCart, subtotal } = useStore();
  const nav = useNavigate();
  const [preview, setPreview] = useState(null);
  const cartSignature = cart
    .map((item) => `${item.id}-${item.quantity}-${item.size || ""}-${item.color || ""}`)
    .join("|");
  useEffect(() => {
    let active = true;
    if (!cart.length) { setPreview(null); return undefined; }
    api.checkoutPreview()
      .then((result) => { if (active) setPreview(result.checkout); })
      .catch(() => { if (active) setPreview(null); });
    return () => { active = false; };
  }, [cartSignature]);
  const pricing = preview?.summary;
  const minimum = 5000,
    remaining = Math.max(0, minimum - (pricing?.subtotal ?? subtotal));
  return (
    <main className="page container">
      <div className="page-heading">
        <span className="eyebrow">YOUR LITTLE EDIT</span>
        <h1>{wholesale ? "Wholesale bag" : "Your shopping bag"}</h1>
        <p>
          {wholesale
            ? "A minimum merchandise subtotal of ₹5,000 is required for wholesale checkout."
            : "The pieces you picked, all in one place."}
        </p>
      </div>
      {wholesale && (
        <div className="wholesale-banner">
          <b>Minimum wholesale order: ₹5,000</b>
          <span>
            {remaining
              ? `Add ${money(remaining)} more to unlock checkout.`
              : "Lovely! Your minimum has been reached."}
          </span>
          <div className="progress">
            <i
              style={{ width: `${Math.min(100, (subtotal / minimum) * 100)}%` }}
            />
          </div>
        </div>
      )}
      {!cart.length ? (
        <div className="empty-state">
          <ShoppingBag size={35} />
          <h2>Your bag is waiting for something lovely.</h2>
          <Link className="button dark" to="/shop">
            Explore the collection <ArrowRight size={16} />
          </Link>
        </div>
      ) : (
        <div className="cart-layout">
          <div className="cart-items">
            {cart.map((p) => (
              <article className="cart-item" key={`${p.id}-${p.size || ""}-${p.color || ""}`}>
                <Link to={`/product/${p.id}`}>
                  <img src={p.image} alt={p.name} />
                </Link>
                <div className="cart-item-info">
                  <span className="eyebrow">{p.code}</span>
                  <Link to={`/product/${p.id}`}>
                    <h3>{p.name}</h3>
                  </Link>
                  <div className="cart-item-meta">
                    <span>{money(salePrice(p))} each</span>
                    {p.size && <span>Size: {p.size}</span>}
                    {p.color && <span>Colour: {p.color}</span>}
                  </div>
                  <div className="quantity-control small">
                    <button
                      onClick={() =>
                        updateQty(p.id, p.quantity - 1, p.size, p.color)
                      }
                    >
                      <Minus size={13} />
                    </button>
                    <span>{p.quantity}</span>
                    <button
                      disabled={p.quantity >= p.stock}
                      title={p.quantity >= p.stock ? "Maximum available quantity reached" : "Increase quantity"}
                      onClick={() =>
                        updateQty(p.id, p.quantity + 1, p.size, p.color)
                      }
                    >
                      <Plus size={13} />
                    </button>
                  </div>
                  {p.stock <= 5 && p.stock > 0 && (
                    <small className="stock-note low-stock">Only {p.stock} {p.stock === 1 ? "piece" : "pieces"} left!</small>
                  )}
                </div>
                <div className="cart-item-end">
                  <b>{money(salePrice(p) * p.quantity)}</b>
                  <button
                    onClick={() => removeCart(p.id, p.size, p.color)}
                    aria-label="Remove item"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </article>
            ))}
          </div>
          <aside className="order-summary">
            <span className="eyebrow">THE TOTAL</span>
            <h2>Order summary</h2>
            <div>
              <span>Merchandise subtotal</span>
              <b>{money(pricing?.subtotal ?? subtotal)}</b>
            </div>
            {pricing && (
              <div>
                <span>Packing</span>
                <b>{money(pricing.packingCost)}</b>
              </div>
            )}
            {pricing && (
              <div>
                <span>Total weight</span>
                <b>{pricing.totalWeightKg} kg ({pricing.chargeableWeightKg} kg chargeable)</b>
              </div>
            )}
            {/* <div>
              <span>Delivery estimate</span>
              <b>
                {pricing
                  ? money(pricing.shippingCharge)
                  : subtotal >= 2500
                    ? "Complimentary"
                    : money(99)}
              </b>
            </div> */}
            <div>
              <span>Discounts included</span>
              <b className="saving">Applied</b>
            </div>
            <hr />
            <div className="summary-total">
              <span>Estimated total</span>
              <b>{money(pricing?.finalAmount ?? subtotal + (subtotal >= 2500 ? 0 : 99))}</b>
            </div>
            <small>Final delivery and packing charges are confirmed by the backend at checkout.</small>
            <button
              className="button dark full"
              disabled={wholesale && remaining > 0}
              onClick={() =>
                nav(wholesale ? "/wholesale/checkout" : "/checkout")
              }
            >
              {wholesale && remaining > 0
                ? "Minimum not reached"
                : "Continue to checkout"}{" "}
              <ArrowRight size={16} />
            </button>
            <Link className="continue-link" to="/shop">
              ← Continue shopping
            </Link>
          </aside>
        </div>
      )}
    </main>
  );
}
function CartRoute() {
  const { user } = useStore();
  return <Cart wholesale={user?.role === "Wholesale Customer"} />;
}
function Wishlist() {
  const { wishlist, toggleWishlist, addToCart } = useStore();
  return (
    <main className="page container">
      <div className="page-heading">
        <span className="eyebrow">SAVED FOR LATER</span>
        <h1>Your little wish list</h1>
        <p>Keep the pieces you love close.</p>
      </div>
      {wishlist.length ? (
        <div className="product-grid">
          {wishlist.map((p) => (
            <div key={p.id} className="wish-card">
              <ProductCard product={p} />
              <button
                className="button outline full"
                onClick={() => {
                  addToCart(p);
                  toggleWishlist(p);
                }}
              >
                Move to bag <ShoppingBag size={16} />
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <Heart size={35} />
          <h2>Nothing saved just yet.</h2>
          <p>When a piece catches your eye, tap the heart to save it here.</p>
          <Link className="button dark" to="/shop">
            Find your favourites
          </Link>
        </div>
      )}
    </main>
  );
}
function Login() {
  const { authenticateUser } = useStore();
  const [submitting, setSubmitting] = useState(false);
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const nav = useNavigate();
  return (
    <main className="login-page">
      <form
        className="login-form"
        autoComplete="off"
        onSubmit={async (e) => {
          e.preventDefault();
          setError("");
          setSubmitting(true);
          try {
            const user = await authenticateUser(identifier, password);
            nav(user.role === "Admin" ? "/admin" : user.role === "Employee" ? "/employee/dashboard" : user.role === "Wholesale Customer" ? "/wholesale" : "/customer");
          } catch (error) {
            setError(error.message || "Email or password is incorrect, or this account is unavailable.");
          } finally { setSubmitting(false); }
        }}
      >
        <h1>Welcome To Our Little World</h1>
        <label htmlFor="identifier">Email</label>
        <input
          id="identifier"
          type="email"
          placeholder="Your email address"
          value={identifier}
          onChange={(e) => setIdentifier(e.target.value)}
          autoComplete="off"
          required
        />
        <label htmlFor="password">Password</label>
        <div className="password-field">
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="new-password"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword((current) => !current)}
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>
        <div className="login-links">
          <Link to="/contact">Forgot password?</Link>
        </div>
        {error && <p className="employee-error" role="alert">{error}</p>}
        <button className="button dark full" disabled={submitting}>
          {submitting ? "Signing in…" : "Sign in"} <ArrowRight size={16} />
        </button>
        <small className="login-register">New To Hyni? <Link to="/register">Create account</Link></small>
      </form>
    </main>
  );
}
function Checkout({ wholesale = false }) {
  const { cart, subtotal, user, refreshCart, refreshOrders, refreshAddresses, addresses } = useStore();
  const toast = useToast();
  const [done, setDone] = useState(null);
  const [busy, setBusy] = useState(false);
  const [submittingProof, setSubmittingProof] = useState(false);
  const [error, setError] = useState("");
  const [proof, setProof] = useState(null);
  const [utrNumber, setUtrNumber] = useState("");
  const [proofMessage, setProofMessage] = useState("");
  const [addressId, setAddressId] = useState("");
  const [preview, setPreview] = useState(null);
  const [previewError, setPreviewError] = useState("");
  const [support, setSupport] = useState(null);
  const nav = useNavigate();
  const cartSignature = cart
    .map((item) => `${item.id}-${item.quantity}-${item.size || ""}-${item.color || ""}`)
    .join("|");

  useEffect(() => {
    let active = true;
    api.addresses()
      .then((r) => {
        if (!active) return;
        const list = r.addresses || [];
        setAddressId(list.find((a) => a.isDefault)?._id || list[0]?._id || "new");
      })
      .catch(() => { if (active) setAddressId("new"); });
    api.paymentSupport()
      .then((r) => { if (active) setSupport(r.support); })
      .catch(() => {});
    return () => { active = false; };
  }, []);

  useEffect(() => {
    let active = true;
    api.checkoutPreview()
      .then((r) => { if (active) { setPreview(r.checkout); setPreviewError(""); } })
      .catch((e) => { if (active) setPreviewError(e.message); });
    return () => { active = false; };
  }, [cartSignature]);

  const pricing = preview?.summary;
  const minimum = wholesale && ((pricing?.subtotal ?? subtotal) < 5000);

  if (done) return (
    <main className="page container success-page">
      <div className="success-icon"><Check size={35} /></div>
      <span className="eyebrow">ORDER CREATED</span>
      <h1>Your order is almost ready.</h1>
      <p>Order <b>{done.orderId}</b> was created. Complete the UPI payment and submit its screenshot for verification.</p>
      {done.payment?.qrCode && <div className="payment-qr"><img src={done.payment.qrCode} alt="UPI payment QR code" style={{ width: 240, maxWidth: "100%" }} /><p>Pay {money(done.payment.amount)} to {done.payment.receiverUpiId || done.payment.receiverName}</p></div>}
      <form className="checkout-form" onSubmit={async (e) => {
        e.preventDefault();
        if (!proof || utrNumber.trim().length < 6 || submittingProof) return;
        setProofMessage("");
        setSubmittingProof(true);
        try {
          await api.submitPayment(done.orderId, proof, utrNumber.trim());
          toast.success("Payment proof submitted. Taking you to your orders…");
          await refreshOrders();
          nav(wholesale ? "/wholesale/orders" : "/customer/orders");
        } catch (err) {
          setProofMessage(err.message);
          toast.error(err.message);
        } finally {
          setSubmittingProof(false);
        }
      }}>
        <label>UPI transaction reference / UTR<input value={utrNumber} onChange={(e) => setUtrNumber(e.target.value)} minLength={6} maxLength={22} required placeholder="Enter UTR number" /></label>
        <label>Upload payment screenshot<input type="file" accept="image/*" required onChange={(e) => setProof(e.target.files?.[0] || null)} /></label>
        <button className="button dark" disabled={!proof || utrNumber.trim().length < 6 || submittingProof}>
          {submittingProof ? "Submitting…" : "Submit payment proof"}
        </button>
        {proofMessage && <p role="status">{proofMessage}</p>}
        {support?.mobile && <p className="checkout-note">Paid but forgot the screenshot? Contact our team on <a href={`tel:${support.mobile}`}>{support.mobile}</a> with order {done.orderId}.</p>}
      </form>
      <Link className="button outline" to={wholesale ? "/wholesale/orders" : "/customer/orders"}>View my orders</Link>
      <Link className="button outline" to={`/track-order/${encodeURIComponent(done.orderId)}`}>Track this order</Link>
    </main>
  );
  return (
    <main className="page container">
      <div className="page-heading"><span className="eyebrow">THE LAST LITTLE STEP</span><h1>Checkout</h1><p>Your order and payment are securely processed by Hyni.</p></div>
      <div className="checkout-layout">
        <form className="checkout-form" onSubmit={async (e) => {
          e.preventDefault(); if (minimum || busy) return; setBusy(true); setError("");
          try {
            const form = new FormData(e.currentTarget);
            let selectedAddressId = addressId;
            if (!selectedAddressId || selectedAddressId === "new") {
              const createdAddress = await api.addAddress({
                label: "Home",
                fullName: form.get("fullName"),
                mobile: form.get("mobile"),
                addressLine1: form.get("addressLine1"),
                addressLine2: form.get("addressLine2") || "",
                landmark: form.get("landmark") || "",
                city: form.get("city"),
                state: form.get("state"),
                pincode: form.get("pincode"),
                country: "India",
                isDefault: true,
              });
              selectedAddressId = createdAddress.address._id;
            }
            const created = await api.createOrder(selectedAddressId);
            setDone({ ...created.order, payment: created.payment });
            await Promise.all([refreshCart(), refreshOrders(), refreshAddresses()]);
          } catch (err) { setError(err.message || "Unable to place your order."); }
          finally { setBusy(false); }
        }}>
          <h2>Delivery details</h2>
          {addresses.length > 0 && (
            <label>
              Saved delivery address
              <select value={addressId} onChange={(e) => setAddressId(e.target.value)}>
                {addresses.map((address) => (
                  <option key={address._id} value={address._id}>
                    {address.label} · {address.fullName} · {address.addressLine1}, {address.city} {address.pincode}
                  </option>
                ))}
                <option value="new">Use a new address</option>
              </select>
            </label>
          )}
          {(!addressId || addressId === "new" || addresses.length === 0) && (
            <div className="form-grid">
              <label>Full name<input name="fullName" required defaultValue={user?.name || ""} placeholder="Your name" /></label>
              <label>Email address<input type="email" required value={user?.email || ""} readOnly /></label>
              <label>Phone number<input name="mobile" required pattern="[0-9]{10,15}" placeholder="10-digit mobile number" defaultValue={user?.mobile || ""} /></label>
              <label>PIN code<input name="pincode" required pattern="[0-9]{6}" inputMode="numeric" placeholder="6-digit PIN" /></label>
              <label className="span-2">Address line<input name="addressLine1" required placeholder="House no., street, area" /></label>
              <label className="span-2">Landmark / additional address<input name="addressLine2" placeholder="Optional" /></label>
              <label>City<input name="city" required placeholder="City" /></label>
              <label>State<input name="state" required placeholder="State" /></label>
            </div>
          )}
          <h2>Payment</h2><p>UPI payment QR is generated after your order is created. Inventory is reserved for 30 minutes.</p>
          {previewError && <p className="checkout-note">{previewError}</p>}
          {error && <p className="form-error" role="alert">{error}</p>}
          {support?.message && <p className="checkout-note">{support.message}</p>}
          <button className="button dark full" disabled={!cart.length || minimum || busy || !addressId}>{busy ? "Creating order…" : "Place order & generate UPI QR"} <ArrowRight size={16} /></button>
          {minimum && <p className="form-error">Wholesale merchandise subtotal must be at least ₹5,000.</p>}
        </form>
        <aside className="order-summary">
          <h2>Your edit</h2>
          {cart.map((p) => <div key={`${p.id}-${p.size || ""}-${p.color || ""}`}><span>{p.name}{p.size ? ` (${p.size})` : ""}{p.color ? ` · ${p.color}` : ""} × {p.quantity}</span><b>{money(salePrice(p) * p.quantity)}</b></div>)}
          <hr />
          <div><span>Merchandise subtotal</span><b>{money(pricing?.subtotal ?? subtotal)}</b></div>
          {pricing && <div><span>Packing</span><b>{money(pricing.packingCost)}</b></div>}
          {pricing && <div><span>Shipping ({pricing.chargeableWeightKg} kg)</span><b>{money(pricing.shippingCharge)}</b></div>}
          <div className="summary-total"><span>Payable total</span><b>{money(pricing?.finalAmount ?? subtotal)}</b></div>
          {wholesale && <p className="checkout-note">Wholesale minimum order: ₹5,000. {minimum ? `Add ${money(5000 - (pricing?.subtotal ?? subtotal))} more.` : "Minimum reached."}</p>}
        </aside>
      </div>
    </main>
  );
}
function Register() {
  const [form, setForm] = useState({ name: "", email: "", mobile: "", password: "" });
  const [accountType, setAccountType] = useState("customer");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);
  const nav = useNavigate();
  return (
    <main className="login-page">
      <div className="login-image">
        <img src={fashionImages.login} alt="Hyni boutique fashion" />
        <div><span className="eyebrow">WELCOME TO OUR WORLD</span><h2>Make room for<br /><em>something lovely.</em></h2></div>
      </div>
      <form className="login-form register-form" onSubmit={async (e) => {
        e.preventDefault(); setBusy(true); setError(""); setMessage("");
        try {
          const result = accountType === "wholesale" ? await api.registerWholesale(form) : await api.register(form);
          if (accountType === "wholesale") {
            setMessage(result.message || "Wholesale application submitted. An administrator must approve it before you can sign in.");
          } else {
            setMessage(result.message || "Account created. Please sign in.");
            setTimeout(() => nav('/login'), 900);
          }
        } catch (err) { setError(err.message); }
        finally { setBusy(false); }
      }}>
        <Link to="/" className="back-link">← Back to Hyni</Link>
        <span className="eyebrow">YOUR H Y N I SPACE</span>
        <h1>Create account.</h1>
        <p className="register-intro">A few details to make your next visit feel like yours.</p>
        <div className="register-fields">
          <label className="register-account-type" htmlFor="register-account-type">Account type
          <select id="register-account-type" value={accountType} onChange={(e) => setAccountType(e.target.value)}>
            <option value="customer">Customer</option>
            <option value="wholesale">Wholesale customer</option>
          </select>
          </label>
          <label htmlFor="register-name">Full name
            <input id="register-name" required minLength={2} autoComplete="name" placeholder="How should we address you?" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
          </label>
          <label htmlFor="register-email">Email
            <input id="register-email" required type="email" autoComplete="email" placeholder="you@example.com" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
          </label>
          <label htmlFor="register-mobile"><span>Mobile number <span className="register-optional">Optional</span></span>
            <input id="register-mobile" type="tel" inputMode="numeric" autoComplete="tel" value={form.mobile} onChange={e => setForm({ ...form, mobile: e.target.value })} pattern="[0-9]{10,15}" placeholder="10-digit mobile" />
          </label>
          <label htmlFor="register-password">Password
            <span className="password-field register-password-field">
              <input id="register-password" required type={showPassword ? "text" : "password"} minLength={8} autoComplete="new-password" placeholder="At least 8 characters" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} />
              <button type="button" onClick={() => setShowPassword((current) => !current)} aria-label={showPassword ? "Hide password" : "Show password"}>
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </span>
          </label>
        </div>
        {accountType === "wholesale" && <p className="checkout-note">Wholesale accounts are reviewed by the studio admin before login. The minimum wholesale order is ₹5,000.</p>}
        {error && <p className="employee-error" role="alert">{error}</p>}
        {message && <p className="register-feedback" role="status">{message}</p>}
        <button className="button dark full" disabled={busy}>{busy ? "Creating…" : "Create account"}<ArrowRight size={16} /></button>
        <small className="register-signin">Already have an account? <Link to="/login">Sign in</Link></small>
      </form>
    </main>
  );
}
function TrackOrder() {
  const toast = useToast();
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [error, setError] = useState("");
  const [qr, setQr] = useState(null);
  const [proof, setProof] = useState(null);
  const [utrNumber, setUtrNumber] = useState("");
  const [paymentMessage, setPaymentMessage] = useState("");
  const [support, setSupport] = useState(null);

  const load = async () => {
    try {
      const result = await api.order(orderId);
      setOrder(result.order);
      setError("");
      const paymentStatus = result.order?.payment?.status;
      if (["pending", "rejected", "expired"].includes(paymentStatus) && result.order?.status === "pending_payment") {
        api.paymentQR(orderId).then((qrResult) => setQr(qrResult.payment || qrResult)).catch(() => setQr(null));
      } else {
        setQr(null);
      }
    } catch (loadError) {
      setError(loadError.message);
    }
  };
  useEffect(() => {
    load();
    api.paymentSupport().then((result) => setSupport(result.support)).catch(() => {});
  }, [orderId]);

  const submitProof = async (event) => {
    event.preventDefault();
    setPaymentMessage("");
    if (!proof || utrNumber.trim().length < 6) return;
    try {
      await api.submitPayment(orderId, proof, utrNumber.trim());
      setPaymentMessage("Payment screenshot submitted. The admin will verify it shortly.");
      toast.success("Payment screenshot submitted successfully.");
      setProof(null);
      setUtrNumber("");
      await load();
    } catch (submitError) {
      setPaymentMessage(submitError.message);
      toast.error(submitError.message);
    }
  };

  return (
    <main className="page container">
      <div className="page-heading">
        <span className="eyebrow">ORDER TRACKING</span>
        <h1>{orderId}</h1>
        <p>Latest order, payment and delivery status from Hyni.</p>
      </div>
      {error ? <p className="form-error">{error}</p> : !order ? <p>Loading order details…</p> : (
        <>
          <div className="profile-panel">
            <div>
              <h2>Order status</h2>
              <p><span className={statusPillClass(order.status)}>{order.status}</span></p>
              <h2>Payment</h2>
              <p><span className={statusPillClass(order.payment?.status)}>{order.payment?.status || "—"}</span>{order.payment?.utrNumber ? ` · UTR ${order.payment.utrNumber}` : ""}</p>
              {order.payment?.rejectionReason && <p className="form-error">Rejected: {order.payment.rejectionReason}</p>}
            </div>
            <div>
              <h2>Delivery tracking</h2>
              <p>Courier: {order.courierName || "Not assigned yet"}</p>
              <p>Tracking ID: {order.trackingId || "Not available yet"}</p>
              {order.trackingUrl && <a href={order.trackingUrl} target="_blank" rel="noreferrer">Open courier tracking</a>}
            </div>
          </div>
          {qr && (
            <div className="profile-panel">
              <div>
                <h2>Complete your UPI payment</h2>
                {qr.qrCode && <div className="payment-qr"><img src={qr.qrCode} alt="UPI payment QR code" style={{ width: 240, maxWidth: "100%" }} /><p>Pay {money(qr.amount)} to {qr.receiverUpiId || qr.receiverName}</p></div>}
              </div>
              <div>
                <form className="checkout-form" onSubmit={submitProof}>
                  <label>UPI transaction reference / UTR<input value={utrNumber} onChange={(event) => setUtrNumber(event.target.value)} minLength={6} maxLength={22} required placeholder="Enter UTR number" /></label>
                  <label>Upload payment screenshot<input type="file" accept="image/*" required onChange={(event) => setProof(event.target.files?.[0] || null)} /></label>
                  <button className="button dark" disabled={!proof || utrNumber.trim().length < 6}>Submit payment proof</button>
                  {paymentMessage && <p role="status">{paymentMessage}</p>}
                  {support?.mobile && <p className="checkout-note">Need help? Contact us on <a href={`tel:${support.mobile}`}>{support.mobile}</a> with order {orderId}.</p>}
                </form>
              </div>
            </div>
          )}
        </>
      )}
    </main>
  );
}
function Profile() {
  const { user, orders, logout, addresses, refreshAddresses, updateProfile } = useStore();
  const toast = useToast();
  const [name, setName] = useState(user?.name || "");
  const [mobile, setMobile] = useState(user?.mobile || "");
  const [accountMessage, setAccountMessage] = useState("");
  const [accountError, setAccountError] = useState("");
  const [editingAddress, setEditingAddress] = useState("");
  const [addressForm, setAddressForm] = useState({ label: "Home", fullName: "", mobile: "", addressLine1: "", addressLine2: "", landmark: "", city: "", state: "", pincode: "", country: "India" });
  const [addressMessage, setAddressMessage] = useState("");
  const [addressError, setAddressError] = useState("");
  const navigate = useNavigate();
  if (!user) return <Navigate to="/login" />;

  const saveProfile = async (event) => {
    event.preventDefault(); setAccountError(""); setAccountMessage("");
    try {
      await updateProfile({ name: name.trim(), ...(mobile.trim() ? { mobile: mobile.trim() } : {}) });
      setAccountMessage("Account details updated.");
    } catch (error) { setAccountError(error.message); }
  };
  const saveAddress = async (event) => {
    event.preventDefault(); setAddressError(""); setAddressMessage("");
    try {
      if (editingAddress) await api.updateAddress(editingAddress, addressForm);
      else await api.addAddress(addressForm);
      setAddressForm({ label: "Home", fullName: "", mobile: "", addressLine1: "", addressLine2: "", landmark: "", city: "", state: "", pincode: "", country: "India" });
      setEditingAddress("");
      await refreshAddresses();
      setAddressMessage(editingAddress ? "Address updated." : "Address added.");
    } catch (error) { setAddressError(error.message); }
  };
  const editAddress = (address) => {
    setEditingAddress(address._id);
    setAddressForm({
      label: address.label || "Home", fullName: address.fullName || "", mobile: address.mobile || "",
      addressLine1: address.addressLine1 || "", addressLine2: address.addressLine2 || "",
      landmark: address.landmark || "", city: address.city || "", state: address.state || "",
      pincode: address.pincode || "", country: address.country || "India",
    });
  };
  const removeAddress = async (address) => {
    const ok = await toast.confirm({
      title: "Delete address",
      message: `Delete the ${address.label} address?`,
      confirmText: "Delete address",
      danger: true,
    });
    if (!ok) return;
    setAddressError(""); setAddressMessage("");
    try {
      await api.deleteAddress(address._id);
      await refreshAddresses();
      setAddressMessage("Address deleted.");
      toast.success("Address deleted.");
    }
    catch (error) { setAddressError(error.message); toast.error(error.message); }
  };
  const makeDefault = async (address) => {
    setAddressError(""); setAddressMessage("");
    try { await api.setDefaultAddress(address._id); await refreshAddresses(); setAddressMessage("Default address updated."); }
    catch (error) { setAddressError(error.message); }
  };

  return (
    <main className="page container">
      <div className="page-heading">
        <span className="eyebrow">YOUR H Y N I SPACE</span>
        <h1>Hello, {user.name}.</h1>
        <p>Signed in as {user.role} · {user.email}</p>
      </div>
      <div className="profile-panel">
        <div>
          <h2>Your orders</h2>
          {orders.length ? (
            orders.map((o) => (
              <div className="order-row" key={o.id}>
                <div>
                  <b>{o.id}</b>
                  <small>
                    {o.date ? new Date(o.date).toLocaleDateString("en-IN") : "Order placed"} · {(o.items || []).length} product line(s)
                  </small>
                </div>
                <div>
                  <b>{money(o.total)}</b>
                  <small><span className={statusPillClass(o.status)}>{o.status}</span> · payment {o.payment || "—"}</small>
                  <Link className="text-link" to={`/track-order/${encodeURIComponent(o.id)}`}>Track order →</Link>
                </div>
              </div>
            ))
          ) : (
            <p>No orders yet.</p>
          )}
        </div>
        <div>
          <h2>Your account</h2>
          <form className="checkout-form" onSubmit={saveProfile}>
            <label>Full name<input value={name} onChange={(e) => setName(e.target.value)} required minLength={2} /></label>
            <label>Mobile number<input value={mobile} onChange={(e) => setMobile(e.target.value)} pattern="[0-9]{10,15}" placeholder="10-15 digit mobile" /></label>
            <p>Email: {user.email}<br />Role: {user.role}</p>
            {accountError && <p className="form-error" role="alert">{accountError}</p>}
            {accountMessage && <p role="status">{accountMessage}</p>}
            <button className="button dark">Save account details</button>
          </form>
          <button
            className="button outline"
            onClick={() => {
  logout();
  navigate("/", { replace: true });
}}
          >
            Sign out <LogOut size={16} />
          </button>
        </div>
      </div>
      <div className="profile-panel">
        <div>
          <h2>Delivery addresses</h2>
          {addresses.length ? addresses.map((address) => (
            <div className="order-row" key={address._id}>
              <div>
                <b>{address.label}{address.isDefault ? " · Default" : ""}</b>
                <small>{address.fullName}, {address.addressLine1}{address.addressLine2 ? `, ${address.addressLine2}` : ""}, {address.city}, {address.state} {address.pincode}</small>
                <small>Mobile: {address.mobile}</small>
              </div>
              <div className="table-actions">
                <button onClick={() => editAddress(address)}>Edit</button>
                {!address.isDefault && <button onClick={() => makeDefault(address)}>Make default</button>}
                <button className="delete-action" onClick={() => removeAddress(address)}>Delete</button>
              </div>
            </div>
          )) : <p>No saved addresses yet.</p>}
        </div>
        <div>
          <h2>{editingAddress ? "Edit address" : "Add an address"}</h2>
          <form className="checkout-form" onSubmit={saveAddress}>
            <div className="form-grid">
              <label>Label<select value={addressForm.label} onChange={(e) => setAddressForm({ ...addressForm, label: e.target.value })}><option>Home</option><option>Work</option><option>Other</option></select></label>
              <label>Full name<input required value={addressForm.fullName} onChange={(e) => setAddressForm({ ...addressForm, fullName: e.target.value })} /></label>
              <label>Mobile<input required pattern="[0-9]{10,15}" value={addressForm.mobile} onChange={(e) => setAddressForm({ ...addressForm, mobile: e.target.value })} /></label>
              <label>PIN code<input required pattern="[0-9]{6}" value={addressForm.pincode} onChange={(e) => setAddressForm({ ...addressForm, pincode: e.target.value })} /></label>
              <label className="span-2">Address line<input required value={addressForm.addressLine1} onChange={(e) => setAddressForm({ ...addressForm, addressLine1: e.target.value })} /></label>
              <label className="span-2">Landmark / additional address<input value={addressForm.addressLine2} onChange={(e) => setAddressForm({ ...addressForm, addressLine2: e.target.value })} /></label>
              <label>City<input required value={addressForm.city} onChange={(e) => setAddressForm({ ...addressForm, city: e.target.value })} /></label>
              <label>State<input required value={addressForm.state} onChange={(e) => setAddressForm({ ...addressForm, state: e.target.value })} /></label>
            </div>
            {addressError && <p className="form-error" role="alert">{addressError}</p>}
            {addressMessage && <p role="status">{addressMessage}</p>}
            <div className="form-actions">
              <button className="button dark">{editingAddress ? "Save address" : "Add address"}</button>
              {editingAddress && <button type="button" className="button outline" onClick={() => { setEditingAddress(""); setAddressForm({ label: "Home", fullName: "", mobile: "", addressLine1: "", addressLine2: "", landmark: "", city: "", state: "", pincode: "", country: "India" }); }}>Cancel</button>}
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
function About() {
  return (
    <main className="editorial-page container">
      <span className="eyebrow">A LITTLE ABOUT US</span>
      <div className="editorial-grid">
        <img
          src={fashionImages.about}
          alt="Woman smiling in a blue printed traditional outfit"
        />
        <div>
          <span className="eyebrow">THE H Y N I STORY</span>
          <h2>Thoughtful style, made personal.</h2>
          <p>
            Hyni Fashion Studio is a boutique for the many ways you show up:
            unhurried mornings, family celebrations, and all the little moments
            in between. We bring together traditional Indian style and the
            ease of pieces you can make your own.
          </p>
          <p>
            Every edit is chosen with comfort, detail and versatility in mind.
            We want getting dressed to feel less like a search for the right
            thing and more like finding something that already feels like you.
          </p>
          <p>
            From expressive prints to graceful occasionwear, our collection
            celebrates personal style without asking you to choose between
            feeling beautiful and feeling comfortable.
          </p>
          <Link to="/shop" className="button dark">
            Explore the collection <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </main>
  );
}
function Contact() {
  return (
    <main className="page container contact-page">
      <div className="page-heading contact-page-heading">
        <span className="eyebrow">COME SAY HELLO</span>
        <h1>We’d love to hear from you.</h1>
        <p>
          Questions about a style, a visit or finding the right fit? Our studio
          team is happy to help.
        </p>
      </div>
      <section className="contact-grid" aria-label="Contact details">
        <article className="contact-card">
          <span className="eyebrow">VISIT OUR STUDIO</span>
          <h2>Find us in Vizag</h2>
          <p>
            Ground Floor, Gupta Villa, 9-29-19/A, Balaji Nagar,
            <br />
             Asilmetta, Visakhapatnam,
            <br />
            Andhra Pradesh 530003
          </p>
          <p>Open daily · Closes 9 pm</p>
          <a
            className="contact-link"
            href="https://www.google.com/maps/search/?api=1&query=Door+No.+10%2C+160%2F1%2C+opposite+BVK+School+bus+stop%2C+Vishalakshi+Nagar%2C+Visakhapatnam%2C+Andhra+Pradesh+530043"
            target="_blank"
            rel="noreferrer"
          >
            Get directions <ArrowUpRight size={14} />
          </a>
        </article>
        <article className="contact-card">
          <span className="eyebrow">LET’S TALK</span>
          <h2>Reach our team</h2>
          <p>
            Call us with questions about the collection, availability or your
            next visit.
          </p>
          <div className="contact-links">
            <a className="contact-link" href="tel:09347398872">
              093473 98872 <ArrowUpRight size={14} />
            </a>
            <a
              className="contact-link"
              href={`https://wa.me/919347398872?text=${encodeURIComponent("Hi Hyni Fashion Studios, I want to enquire about your services and other things.")}`}
              target="_blank"
              rel="noreferrer"
            >
              Chat on WhatsApp <ArrowUpRight size={14} />
            </a>
          </div>
        </article>
      </section>
    </main>
  );
}
function CustomerHome() {
  const { user } = useStore();
  return (
    <main className="page container">
      <div className="page-heading">
        <span className="eyebrow">YOUR H Y N I SPACE</span>
        <h1>Welcome to your edit.</h1>
        <p>
          {user?.name || "Lovely to have you here."} — browse the collection and
          find your next favourite.
        </p>
      </div>
      <div className="dashboard-shortcuts">
        <Link to="/shop">
          <ShoppingBag />
          <b>Shop all pieces</b>
          <span>Browse the full collection</span>
        </Link>
        <Link to="/wishlist">
          <Heart />
          <b>Your wishlist</b>
          <span>Saved pieces, all together</span>
        </Link>
        <Link to="/cart">
          <Package />
          <b>Your shopping bag</b>
          <span>Review your picks</span>
        </Link>
        <Link to="/profile">
          <Users />
          <b>Your account</b>
          <span>Orders and account details</span>
        </Link>
      </div>
      <Shop />
    </main>
  );
}
function AdminDashboard() {
  const { products, orders, employees, employeeSales } = useStore();
  const [summary, setSummary] = useState(null);
  const [summaryError, setSummaryError] = useState("");
  const [trend, setTrend] = useState([]);
  useEffect(() => {
    api.dashboard().then((r) => setSummary(r.data)).catch((e) => setSummaryError(e.message));
    api.salesTrend(30).then((r) => setTrend(r.data?.trend || [])).catch((e) => setSummaryError(e.message));
  }, []);
  const low = summary?.inventory?.lowStockProducts ?? products.filter((p) => p.stock < 6).length;
  const date = localToday();
  const todaySales = employeeSales.filter((sale) => sale.soldAt && sale.soldAt.slice(0, 10) === date);
  const chartData = trend.map((row) => ({ name: row.date.slice(5), sales: row.totalRevenue, online: row.onlineRevenue, offline: row.offlineRevenue }));
  const kpis = [
    ["Total revenue", money(summary?.sales?.totalRevenue || 0), IndianRupee],
    ["Orders", summary?.orders?.total ?? orders.length, ClipboardList],
    ["Products", summary?.products?.total ?? products.length, ShoppingBag],
    ["Total pieces", summary?.inventory?.totalPieces ?? "—", Boxes],
    ["Low stock", low, Boxes],
    ["Total employees", summary?.employees?.total ?? employees.length, Users],
    ["Employee sales", money(employeeSales.reduce((sum, sale) => sum + sale.totalAmount, 0)), IndianRupee],
    ["Today's employee sales", money(todaySales.reduce((sum, sale) => sum + sale.totalAmount, 0)), IndianRupee],
    ["Products sold today", todaySales.reduce((sum, sale) => sum + sale.quantity, 0), ShoppingBag],
    ["Payments awaiting verification", summary?.payments?.underVerification ?? 0, ClipboardList],
    ["Pending wholesale approvals", summary?.wholesale?.pending ?? 0, Users],
  ];
  return (
    <AdminLayout>
      <div className="admin-content">
        <div className="admin-welcome">
          <div>
            <span className="eyebrow">{new Date().toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long", year: "numeric" }).toUpperCase()}</span>
            <h1>A good day to grow something lovely.</h1>
            <p>{summaryError || (summary ? "Live business summary from MongoDB." : "Loading live business summary…")}</p>
          </div>
          <Link to="/admin/orders" className="button dark">
            Manage orders <ArrowRight size={16} />
          </Link>
        </div>
        <div className="kpi-grid">
          {kpis.map(([label, val, Icon]) => (
            <div className="kpi-card" key={label}>
              <span>{label}</span>
              <Icon />
              <b>{val}</b>
              {/* <small>{summary ? "Live backend data" : "Awaiting backend"}</small> */}
            </div>
          ))}
        </div>
        <div className="admin-chart-grid">
          <div className="admin-card">
            <div className="admin-card-heading">
              <div>
                <span className="eyebrow">PERFORMANCE</span>
                <h3>Sales overview</h3>
              </div>
              <span>Last 30 days</span>
            </div>
            <ResponsiveContainer width="100%" height={260}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#eee7df" />
                <XAxis dataKey="name" />
                <YAxis tickFormatter={(v) => `₹${v / 1000}k`} />
                <Tooltip formatter={(v) => money(v)} />
                <Line
                  type="monotone"
                  dataKey="sales"
                  name="Total revenue"
                  stroke="#915ba4"
                  strokeWidth={3}
                  dot={{ r: 3 }}
                />
              </LineChart>
            </ResponsiveContainer>
            {!chartData.length && <p className="employee-empty">No sales trend data yet.</p>}
          </div>
          <div className="admin-card">
            <span className="eyebrow">THE FAVOURITES</span>
            <h3>Top pieces</h3>
            {[...products]
              .sort((a, b) => b.sold - a.sold)
              .slice(0, 5)
              .map((p) => (
                <div className="top-product" key={p.id}>
                  <img src={p.image} alt="" />
                  <div>
                    <b>{p.name}</b>
                    <small>
                      {p.sold} units sold · {p.code}
                    </small>
                  </div>
                  <strong>{money(salePrice(p))}</strong>
                </div>
              ))}
          </div>
        </div>
        <div className="admin-card">
          <div className="admin-card-heading">
            <div>
              <span className="eyebrow">QUICK ACCESS</span>
              <h3>What would you like to do?</h3>
            </div>
          </div>
          <div className="admin-quick-links">
            <Link to="/admin/products">
              <ShoppingBag />
              Manage products
            </Link>
            <Link to="/admin/inventory">
              <Boxes />
              Review inventory
            </Link>
            <Link to="/admin/reports">
              <ChartNoAxesCombined />
              View reports
            </Link>
            <Link to="/admin/orders">
              <ClipboardList />
              Manage orders
            </Link>
            <Link to="/admin/payments">
              <ShieldCheck />
              Verify payments
            </Link>
            <Link to="/admin/customers">
              <Users />
              Customers & approvals
            </Link>
            <Link to="/admin/discounts">
              <Tag />
              Offers & discounts
            </Link>
            <Link to="/admin/employees">
              <Users />
              Manage employees
            </Link>
            <Link to="/admin/attendance">
              <ClipboardList />
              Attendance analysis
            </Link>
            <Link to="/admin/employee-sales">
              <IndianRupee />
              Employee sales
            </Link>
            <Link to="/admin/performance">
              <ChartNoAxesCombined />
              Employee performance
            </Link>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
const SIZE_OPTIONS = ["XS", "S", "M", "L", "XL", "XXL"];

const emptyProductForm = {
  name: "",
  categoryId: "",
  subcategory: "",
  price: "",
  discount: "0",
  stock: "10",
  lowStockThreshold: "5",
  weight: "0.5",
  weightUnit: "kg",
  deliveryCost: "0",
  packingCost: "0",
  fabric: "",
  sizes: ["S", "M", "L", "XL"],
  colors: "",
  status: "Active",
  isNew: true,
  hotSale: false,
  featured: false,
};
function AdminProducts() {
  const { products, refreshProducts, refreshCategories } = useStore();
  const toast = useToast();
  const [adminCategories, setAdminCategories] = useState([]);
  const [editing, setEditing] = useState(null);
  const [search, setSearch] = useState("");
  const [form, setForm] = useState(emptyProductForm);
  const [mainImage, setMainImage] = useState(null);
  const [additionalImages, setAdditionalImages] = useState([]);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [saving, setSaving] = useState(false);
  const loadCategories = () =>
    api
      .adminCategories()
      .then((r) => setAdminCategories(r.categories || []))
      .catch((e) => setError(e.message));
  useEffect(() => {
    loadCategories();
  }, []);
  const filtered = products.filter((p) =>
    `${p.name} ${p.code} ${p.category}`.toLowerCase().includes(search.toLowerCase()),
  );
  const resetForm = () => {
    setEditing(null);
    setForm(emptyProductForm);
    setMainImage(null);
    setAdditionalImages([]);
  };
  const save = async (e) => {
    e.preventDefault();
    setError("");
    setNotice("");
    if (
      !form.name.trim() ||
      !form.categoryId ||
      Number(form.price) <= 0 ||
      Number(form.stock) < 0 ||
      Number(form.weight) <= 0
    ) {
      setError("Enter a name, category, valid price, stock and product weight.");
      return;
    }
    const category = adminCategories.find(
      (c) => c._id === form.categoryId || c.categoryId === form.categoryId,
    );
    if (!category) {
      setError("Choose a category from the backend list. Create one under Categories if needed.");
      return;
    }
    setSaving(true);
    const payload = {
      name: form.name.trim(),
      categoryId: category._id || category.categoryId,
      subcategory: form.subcategory.trim(),
      price: Number(form.price),
      discount: Number(form.discount),
      weight: Number(form.weight),
      weightUnit: form.weightUnit,
      deliveryCost: Number(form.deliveryCost) || 0,
      packingCost: Number(form.packingCost) || 0,
      lowStockThreshold: Number(form.lowStockThreshold) || 0,
      fabric: form.fabric.trim(),
      sizes: JSON.stringify(Array.isArray(form.sizes) ? form.sizes : []),
      colors: JSON.stringify(
        form.colors.split(",").map((s) => s.trim()).filter(Boolean),
      ),
      status: form.status,
      isNew: String(Boolean(form.isNew)),
      hotSale: String(Boolean(form.hotSale)),
      featured: String(Boolean(form.featured)),
      ...(editing ? {} : { stock: Number(form.stock) }),
    };
    const hasUploads = mainImage || additionalImages.length > 0;
    let body = payload;
    if (hasUploads) {
      body = new FormData();
      Object.entries(payload).forEach(([key, value]) => body.append(key, value));
      if (mainImage) body.append("mainImage", mainImage);
      additionalImages.forEach((file) => body.append("additionalImages", file));
    }
    try {
      if (editing) {
        await api.updateProduct(editing.id, body);
        const stockDelta = Number(form.stock) - Number(editing.stock || 0);
        if (stockDelta !== 0)
          await api.adjustInventory(
            editing.mongoId,
            stockDelta,
            "Admin product stock adjustment",
          );
      } else {
        await api.createProduct(body);
      }
      await Promise.all([refreshProducts(), refreshCategories(), loadCategories()]);
      setNotice(editing ? "Product updated." : "Product added to the catalogue.");
      toast.success(editing ? "Product updated." : "Product added to the catalogue.");
      resetForm();
    } catch (err) {
      setError(err.message);
      toast.error(err.message);
    } finally {
      setSaving(false);
    }
  };
  const startEdit = (p) => {
    setEditing(p);
    setError("");
    setNotice("");
    setMainImage(null);
    setAdditionalImages([]);
    setForm({
      name: p.name || "",
      categoryId: p.categoryId || "",
      subcategory: p.subcategory || "",
      price: String(p.price ?? ""),
      discount: String(p.discount ?? 0),
      stock: String(p.stock ?? 0),
      lowStockThreshold: String(p.lowStockThreshold ?? 5),
      weight: String(p.weight || 0.5),
      weightUnit: p.weightUnit || "kg",
      deliveryCost: String(p.deliveryCost ?? 0),
      packingCost: String(p.packingCost ?? 0),
      fabric: p.fabric || "",
      sizes: Array.isArray(p.sizes) ? p.sizes : [],
      colors: (p.colors || []).join(", "),
      status: p.status || "Active",
      isNew: Boolean(p.isNew),
      hotSale: Boolean(p.hotSale),
      featured: Boolean(p.featured),
    });
  };
  const remove = async (p) => {
    const ok = await toast.confirm({
      title: "Delete product",
      message: `Delete ${p.name} from the catalogue?`,
      confirmText: "Delete product",
      danger: true,
    });
    if (!ok) return;
    setError("");
    setNotice("");
    try {
      await api.deleteProduct(p.id);
      await refreshProducts();
      setNotice(`${p.name} deleted.`);
      toast.success(`${p.name} deleted.`);
    } catch (err) {
      setError(err.message);
      toast.error(err.message);
    }
  };
  return (
    <AdminLayout>
      <div className="admin-content">
        <div className="admin-welcome">
          <div>
            <span className="eyebrow">CATALOGUE</span>
            <h1>Product management</h1>
            <p>
              Add, edit and manage products stored in your backend, including
              images, variants and storefront badges.
            </p>
          </div>
        </div>
        <div className="admin-card">
          <form className="admin-product-form" onSubmit={save}>
            <h3>{editing ? `Edit ${editing.name}` : "Add a new product"}</h3>
            <div className="admin-form-grid">
              <label>
                Product name
                <input
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="e.g. Floral everyday kurti"
                  required
                />
              </label>
              <label>
                Category
                <select
                  value={form.categoryId}
                  onChange={(e) =>
                    setForm({ ...form, categoryId: e.target.value })
                  }
                  required
                >
                  <option value="">Select a category</option>
                  {adminCategories.map((c) => (
                    <option key={c._id || c.categoryId} value={c._id || c.categoryId}>
                      {c.name}
                      {c.status && c.status !== "active" ? ` (${c.status})` : ""}
                    </option>
                  ))}
                </select>
              </label>
              <label>
                Subcategory
                <input
                  value={form.subcategory}
                  onChange={(e) =>
                    setForm({ ...form, subcategory: e.target.value })
                  }
                  placeholder="e.g. Anarkalis"
                />
              </label>
              <label>
                Original price (₹)
                <input
                  type="number"
                  min="1"
                  value={form.price}
                  onChange={(e) => setForm({ ...form, price: e.target.value })}
                  required
                />
              </label>
              <label>
                Discount (%)
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={form.discount}
                  onChange={(e) =>
                    setForm({ ...form, discount: e.target.value })
                  }
                />
              </label>
              <label>
                Stock quantity
                <input
                  type="number"
                  min="0"
                  value={form.stock}
                  onChange={(e) => setForm({ ...form, stock: e.target.value })}
                />
              </label>
              <label>
                Low stock threshold
                <input
                  type="number"
                  min="0"
                  value={form.lowStockThreshold}
                  onChange={(e) =>
                    setForm({ ...form, lowStockThreshold: e.target.value })
                  }
                />
              </label>
              <label>
                Weight
                <span className="inline-pair">
                  <input
                    type="number"
                    min="0.001"
                    step="0.001"
                    required
                    value={form.weight}
                    onChange={(e) =>
                      setForm({ ...form, weight: e.target.value })
                    }
                  />
                  <select
                    value={form.weightUnit}
                    onChange={(e) =>
                      setForm({ ...form, weightUnit: e.target.value })
                    }
                  >
                    <option value="kg">kg</option>
                    <option value="g">g</option>
                  </select>
                </span>
              </label>
              <label>
                Delivery cost (₹)
                <input
                  type="number"
                  min="0"
                  value={form.deliveryCost}
                  onChange={(e) =>
                    setForm({ ...form, deliveryCost: e.target.value })
                  }
                />
              </label>
              <label>
                Packing cost (₹)
                <input
                  type="number"
                  min="0"
                  value={form.packingCost}
                  onChange={(e) =>
                    setForm({ ...form, packingCost: e.target.value })
                  }
                />
              </label>
              <label>
                Fabric
                <input
                  value={form.fabric}
                  onChange={(e) => setForm({ ...form, fabric: e.target.value })}
                  placeholder="e.g. Cotton blend"
                />
              </label>
              <label className="span-2">
                Sizes
                <div className="size-selector size-selector-inline" role="group" aria-label="Product sizes">
                  <div>
                    {SIZE_OPTIONS.map((size) => {
                      const selected = form.sizes.includes(size);
                      return (
                        <button
                          key={size}
                          type="button"
                          className={selected ? "selected" : ""}
                          aria-pressed={selected}
                          onClick={() =>
                            setForm({
                              ...form,
                              sizes: selected
                                ? form.sizes.filter((item) => item !== size)
                                : [...form.sizes, size],
                            })
                          }
                        >
                          {size}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </label>
              <label>
                Colours (comma separated)
                <input
                  value={form.colors}
                  onChange={(e) => setForm({ ...form, colors: e.target.value })}
                  placeholder="Ivory, Maroon, Sage"
                />
              </label>
              <label>
                Status
                <select
                  value={form.status}
                  onChange={(e) => setForm({ ...form, status: e.target.value })}
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </label>
              <label>
                Main image
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setMainImage(e.target.files?.[0] || null)}
                />
              </label>
              <label>
                Additional images (max 5)
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={(e) =>
                    setAdditionalImages(Array.from(e.target.files || []).slice(0, 5))
                  }
                />
              </label>
            </div>
            <div className="checkbox-row">
              <label>
                <input
                  type="checkbox"
                  checked={form.isNew}
                  onChange={(e) => setForm({ ...form, isNew: e.target.checked })}
                />
                New arrival
              </label>
              <label>
                <input
                  type="checkbox"
                  checked={form.hotSale}
                  onChange={(e) => setForm({ ...form, hotSale: e.target.checked })}
                />
                Hot sale
              </label>
              <label>
                <input
                  type="checkbox"
                  checked={form.featured}
                  onChange={(e) =>
                    setForm({ ...form, featured: e.target.checked })
                  }
                />
                Featured
              </label>
            </div>
            {editing && (editing.images || []).length > 0 && (
              <p className="generated-code">
                Existing additional images: {editing.images.length}. Upload new
                files to replace them.
              </p>
            )}
            {form.price && (
              <p className="generated-code">
                Selling price:{" "}
                <b>
                  {money(
                    (Number(form.price) * (1 - Number(form.discount) / 100)) +
                      Number(form.deliveryCost || 0) +
                      Number(form.packingCost || 0),
                  )}
                </b>{" "}
                ·{" "}
                {editing
                  ? `Product code: ${editing.code}`
                  : "A product code is generated automatically."}
              </p>
            )}
            {error && <p className="form-error">{error}</p>}
            {notice && <p className="employee-success">{notice}</p>}
            <div className="form-actions">
              <button className="button dark" disabled={saving}>
                {saving
                  ? "Saving…"
                  : editing
                    ? "Save changes"
                    : "Add product"}
              </button>
              {editing && (
                <button
                  type="button"
                  className="button outline"
                  onClick={resetForm}
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>
        <div className="admin-card table-card">
          <div className="admin-card-heading">
            <div>
              <span className="eyebrow">YOUR CATALOGUE</span>
              <h3>All products ({filtered.length})</h3>
            </div>
            <input
              className="table-search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search products..."
            />
          </div>
          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Code</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Discount</th>
                  <th>Stock</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((p) => (
                  <tr key={p.id}>
                    <td>
                      <div className="table-product">
                        {p.image ? <img src={p.image} alt="" /> : null}
                        <b>{p.name}</b>
                      </div>
                    </td>
                    <td>{p.code}</td>
                    <td>
                      {p.category}
                      <small>{p.subcategory}</small>
                    </td>
                    <td>{money(p.price)}</td>
                    <td>{p.discount}%</td>
                    <td>
                      <span className={p.stock < 6 ? "stock-low" : "stock-ok"}>
                        {p.stock}
                      </span>
                    </td>
                    <td>
                      <span className={statusPillClass(p.status || "Active")}>
                        {p.status || "Active"}
                      </span>
                    </td>
                    <td>
                      <div className="table-actions">
                        <button
                          onClick={() => {
                            startEdit(p);
                            window.scrollTo({ top: 0, behavior: "smooth" });
                          }}
                        >
                          Edit
                        </button>
                        <button
                          className="delete-action"
                          onClick={() => remove(p)}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {!filtered.length && (
              <p className="employee-empty">No products match this search.</p>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

function Protected({ children, role, roles }) {
  const { user, employees } = useStore();
  if (!user) return <Navigate to="/login" />;
  if (user.role === "Employee") {
    const employee = employees.find((item) => item.id === user.employeeId) || { status: user.status === "active" ? "Active" : "Disabled" };
    if (employee.status !== "Active") return <Navigate to="/login" />;
    if (role !== "Employee" && !roles?.includes("Employee")) {
      return <Navigate to="/employee/dashboard" />;
    }
  }
  const allowed = role ? user.role === role : roles ? roles.includes(user.role) : true;
  if (!allowed)
    return (
      <Navigate
        to={
          user.role === "Admin"
            ? "/admin"
            : user.role === "Employee"
              ? "/employee/dashboard"
            : user.role === "Wholesale Customer"
              ? "/wholesale"
              : "/customer"
        }
      />
    );
  return children;
}
function EmployeeStorefrontGuard({ children }) {
  const { user } = useStore();
  return user?.role === "Employee" ? <Navigate to="/employee/dashboard" /> : children;
}
export default function App() {
  const { user } = useStore();
  const location = useLocation();
  const { pathname, search } = location;
  const isEmployeeRoute = pathname.startsWith("/employee");
  const isChatbotHidden = pathname === "/login" || pathname.startsWith("/admin") || isEmployeeRoute;

  useEffect(() => {
    const elements = document.querySelectorAll(
      ".section-title, .category-card, .product-card, .collection-banner, .instagram-section > *, .page-heading, .detail-page > *, .cart-layout > *, .checkout-layout > *, .editorial-grid > *, .contact-card, .admin-welcome, .admin-card, .kpi-card, .dashboard-shortcuts > a, .profile-panel > div, .footer-top > div",
    );
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion || !("IntersectionObserver" in window)) {
      elements.forEach((element) => element.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          } else {
            entry.target.classList.remove("is-visible");
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -32px 0px" },
    );

    elements.forEach((element) => {
      const siblingIndex = Array.from(element.parentElement.children).indexOf(
        element,
      );
      element.style.setProperty(
        "--reveal-delay",
        `${(siblingIndex % 4) * 65}ms`,
      );
      element.classList.add("scroll-reveal");
      observer.observe(element);
    });

    return () => observer.disconnect();
  }, [pathname, search]);

  useEffect(() => {
    if (location.hash) {
      const target = document.getElementById(
        decodeURIComponent(location.hash.slice(1)),
      );
      if (target) {
        target.scrollIntoView({ behavior: "auto", block: "start" });
        return;
      }
    }
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [location.pathname, location.search, location.hash]);

  return (
    <>
      {!isEmployeeRoute && <Header />}
      <PageSEO />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/hot-sales" element={<Shop mode="hot" />} />
        <Route path="/new-arrivals" element={<Shop mode="new" />} />
        <Route path="/category/:categorySlug" element={<CategoryRoute />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/wishlist" element={<EmployeeStorefrontGuard><Wishlist /></EmployeeStorefrontGuard>} />
        <Route path="/cart" element={<EmployeeStorefrontGuard><CartRoute /></EmployeeStorefrontGuard>} />
        <Route path="/checkout" element={<EmployeeStorefrontGuard><Protected role="Customer"><Checkout /></Protected></EmployeeStorefrontGuard>} />
        <Route path="/wholesale/checkout" element={<EmployeeStorefrontGuard><Protected role="Wholesale Customer"><Checkout wholesale /></Protected></EmployeeStorefrontGuard>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/track-order/:orderId" element={<Protected roles={["Customer", "Wholesale Customer"]}><TrackOrder /></Protected>} />
        <Route path="/employee/login" element={<Navigate to="/login" replace />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route
          path="/customer"
          element={
            <Protected role="Customer">
              <CustomerHome />
            </Protected>
          }
        />
        <Route
          path="/wholesale"
          element={
            <Protected role="Wholesale Customer">
              <CustomerHome />
            </Protected>
          }
        />
        <Route path="/profile" element={<Protected roles={["Customer", "Wholesale Customer"]}><Profile /></Protected>} />
        <Route path="/customer/orders" element={<Protected role="Customer"><Profile /></Protected>} />
        <Route path="/wholesale/orders" element={<Protected role="Wholesale Customer"><Profile /></Protected>} />
        <Route
          path="/admin"
          element={
            <Protected role="Admin">
              <AdminDashboard />
            </Protected>
          }
        />
        <Route
          path="/admin/reports"
          element={
            <Protected role="Admin">
              <AdminReportsLive />
            </Protected>
          }
        />
        <Route
          path="/admin/employees"
          element={
            <Protected role="Admin">
              <AdminEmployees />
            </Protected>
          }
        />
        <Route
          path="/admin/attendance"
          element={
            <Protected role="Admin">
              <AdminAttendanceAnalysis />
            </Protected>
          }
        />
        <Route
          path="/admin/employee-sales"
          element={
            <Protected role="Admin">
              <AdminSalesAnalysis />
            </Protected>
          }
        />
        <Route
          path="/admin/performance"
          element={
            <Protected role="Admin">
              <AdminEmployeePerformance />
            </Protected>
          }
        />
        <Route
          path="/admin/employee-reports"
          element={
            <Protected role="Admin">
              <AdminEmployeeReports />
            </Protected>
          }
        />
        <Route
          path="/employee/dashboard"
          element={
            <Protected role="Employee">
              <EmployeeDashboard />
            </Protected>
          }
        />
        <Route
          path="/admin/products"
          element={
            <Protected role="Admin">
              <AdminProducts />
            </Protected>
          }
        />
        <Route
          path="/admin/categories"
          element={
            <Protected role="Admin">
              <AdminCategories />
            </Protected>
          }
        />
        <Route
          path="/admin/inventory"
          element={
            <Protected role="Admin">
              <AdminInventory />
            </Protected>
          }
        />
        <Route
          path="/admin/orders"
          element={
            <Protected role="Admin">
              <AdminOrders />
            </Protected>
          }
        />
        <Route
          path="/admin/payments"
          element={
            <Protected role="Admin">
              <AdminPayments />
            </Protected>
          }
        />
        <Route
          path="/admin/customers"
          element={
            <Protected role="Admin">
              <AdminCustomers />
            </Protected>
          }
        />
        <Route
          path="/admin/discounts"
          element={
            <Protected role="Admin">
              <AdminDiscounts />
            </Protected>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
      {!isEmployeeRoute && <Footer />}
      {!isChatbotHidden && (
        <Chatbot key={`${user?.id || "guest"}:${user?.apiRole || "guest"}`} />
      )}
    </>
  );
}

function PageSEO() {
  const { pathname, search } = useLocation();
  const { products, categories } = useStore();
  const productId = pathname.match(/^\/product\/([^/]+)$/)?.[1];
  const product = productId ? products.find((item) => String(item.id) === productId) : null;
  const categorySlug = pathname.match(/^\/category\/([^/]+)$/)?.[1];
  const category = categorySlug
    ? (categories.length ? categories : defaultCategories).find((item) => item.slug === categorySlug)
    : null;
  const isPublicRoute = ["/", "/shop", "/hot-sales", "/new-arrivals", "/about", "/contact"].includes(pathname)
    || Boolean(product)
    || Boolean(category);
  const noIndex = !isPublicRoute
    || (pathname === "/shop" && Boolean(search));

  useEffect(() => {
    const siteUrl = (import.meta.env.VITE_SITE_URL || "https://www.hynifashionstudio.com").replace(/\/+$/, "");
    const pages = {
      "/": {
        title: "Hyni Fashion Studio | Boutique Indian Wear & Ethnic Fashion",
        description: "Shop thoughtfully curated Indian wear, kurtis, sarees and occasion styles at Hyni Fashion Studio in Visakhapatnam.",
      },
      "/shop": {
        title: "Shop Indian Wear & Boutique Fashion | Hyni Fashion Studio",
        description: "Explore the Hyni Fashion Studio collection of thoughtfully selected Indian wear, everyday styles and occasion outfits.",
      },
      "/hot-sales": {
        title: "Hot Sales & Fashion Offers | Hyni Fashion Studio",
        description: "Discover current offers on boutique Indian wear and favourite Hyni Fashion Studio styles.",
      },
      "/new-arrivals": {
        title: "New Arrivals | Hyni Fashion Studio",
        description: "Explore the latest arrivals in Indian wear and boutique fashion at Hyni Fashion Studio.",
      },
      "/about": {
        title: "Our Story | Hyni Fashion Studio",
        description: "Get to know Hyni Fashion Studio and our thoughtfully curated boutique fashion in Visakhapatnam.",
      },
      "/contact": {
        title: "Contact & Visit Our Vizag Boutique | Hyni Fashion Studio",
        description: "Contact Hyni Fashion Studio or visit our boutique in Asilmetta, Visakhapatnam, Andhra Pradesh.",
      },
    };
    const page = pages[pathname]
      || (product
        ? {
          title: `${product.name} | Hyni Fashion Studio`,
          description: product.description || `Shop ${product.name} at Hyni Fashion Studio. Explore boutique Indian wear with convenient online ordering.`,
        }
        : category
          ? {
            title: `${category.name} | Shop Indian Wear | Hyni Fashion Studio`,
            description: `Explore ${category.name.toLowerCase()} and thoughtfully curated Indian wear at Hyni Fashion Studio.`,
          }
          : {
            title: "Hyni Fashion Studio | Boutique Indian Wear",
            description: "Discover thoughtfully curated Indian wear and boutique fashion at Hyni Fashion Studio.",
          });
    const canonicalUrl = `${siteUrl}${pathname}`;
    const imageUrl = product?.image ? new URL(product.image, `${siteUrl}/`).href : `${siteUrl}/images/hyni-logo.png`;
    const setMeta = (attribute, key, content) => {
      let element = document.head.querySelector(`meta[${attribute}="${key}"]`);
      if (!element) {
        element = document.createElement("meta");
        element.setAttribute(attribute, key);
        document.head.appendChild(element);
      }
      element.setAttribute("content", content);
    };

    document.title = page.title;
    setMeta("name", "description", page.description);
    setMeta("name", "robots", noIndex ? "noindex, nofollow" : "index, follow");
    setMeta("property", "og:type", product ? "product" : "website");
    setMeta("property", "og:site_name", "Hyni Fashion Studio");
    setMeta("property", "og:title", page.title);
    setMeta("property", "og:description", page.description);
    setMeta("property", "og:url", canonicalUrl);
    setMeta("property", "og:image", imageUrl);
    setMeta("name", "twitter:card", "summary_large_image");
    setMeta("name", "twitter:title", page.title);
    setMeta("name", "twitter:description", page.description);
    setMeta("name", "twitter:image", imageUrl);

    let canonical = document.head.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.href = canonicalUrl;

    const structuredData = [
      {
        "@context": "https://schema.org",
        "@type": "ClothingStore",
        name: "Hyni Fashion Studio",
        url: `${siteUrl}/`,
        image: `${siteUrl}/images/hyni-logo.png`,
        telephone: "+91-93473-98872",
        address: {
          "@type": "PostalAddress",
          streetAddress: "Ground Floor, Gupta Villa, 9-29-19/A, Balaji Nagar, Asilmetta",
          addressLocality: "Visakhapatnam",
          addressRegion: "Andhra Pradesh",
          postalCode: "530003",
          addressCountry: "IN",
        },
      },
      {
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: "Hyni Fashion Studio",
        url: `${siteUrl}/`,
      },
    ];
    if (product) {
      structuredData.push({
        "@context": "https://schema.org",
        "@type": "Product",
        name: product.name,
        description: page.description,
        image: imageUrl,
        sku: product.code || product.sku,
        brand: { "@type": "Brand", name: "Hyni Fashion Studio" },
        offers: {
          "@type": "Offer",
          priceCurrency: "INR",
          price: Number(product.customerPrice ?? ((product.sellingPrice || product.price) * (1 - (product.discount || 0) / 100))),
          availability: Number(product.stock) > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
          url: canonicalUrl,
        },
      });
    }
    let jsonLd = document.getElementById("hyni-structured-data");
    if (!jsonLd) {
      jsonLd = document.createElement("script");
      jsonLd.id = "hyni-structured-data";
      jsonLd.type = "application/ld+json";
      document.head.appendChild(jsonLd);
    }
    jsonLd.textContent = JSON.stringify(structuredData);
  }, [pathname, product, category, noIndex]);

  return null;
}

function CategoryRoute() {
  const { categorySlug } = useParams();
  const { categories } = useStore();
  const options = categories.length ? categories : defaultCategories;
  const name = options.find((c) => c.slug === categorySlug)?.name || "All";
  return <ShopCategory name={name} />;
}
function ShopCategory({ name }) {
  const { products } = useStore();
  const list = products.filter((p) => p.category === name);
  return (
    <main className="page container">
      <div className="page-heading">
        <span className="eyebrow">SHOP BY CATEGORY</span>
        <h1>{name}</h1>
        <p>Pieces selected for your kind of everyday.</p>
      </div>
      {list.length ? (
        <div className="product-grid">
          {list.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <h2>More lovely pieces coming soon.</h2>
          <Link className="button dark" to="/shop">
            Shop all
          </Link>
        </div>
      )}
    </main>
  );
}
function NotFound() {
  return (
    <main className="page container empty-state">
      <span className="eyebrow">A LITTLE DETOUR</span>
      <h1>We can’t find that page.</h1>
      <Link className="button dark" to="/">
        Back home <ArrowRight size={16} />
      </Link>
    </main>
  );
}
