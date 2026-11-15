import React, { useLayoutEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  BookOpen,
  Flame,
  Heart,
  House,
  Mail,
  Menu,
  Search,
  ShoppingBag,
  Tags,
  UserRound,
  X,
} from "lucide-react";
import { useStore } from "../context/StoreContext";

const navigation = [
  { label: "Home", to: "/", Icon: House },
  { label: "Categories", to: "/shop#categories", Icon: Tags },
  { label: "Hot Sales", to: "/hot-sales", Icon: Flame },
  { label: "Our Story", to: "/about", Icon: BookOpen },
  { label: "Contact", to: "/contact", Icon: Mail },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const { cartCount, wishlist, user } = useStore();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const profileTo = user?.role === "Employee"
    ? "/employee/dashboard"
    : user?.role === "Admin"
      ? "/admin"
      : user
        ? "/profile"
        : "/login";
  const isNavigationActive = (to) => {
    if (to === "/") return pathname === "/";
    if (to === "/shop#categories") return pathname === "/shop" || pathname.startsWith("/category/");
    return pathname === to || pathname.startsWith(`${to}/`);
  };

  const submit = (event) => {
    event.preventDefault();
    navigate(`/shop?q=${encodeURIComponent(search)}`);
    setOpen(false);
  };

  useLayoutEffect(() => {
    if (!open) return undefined;
    const previousOverflow = document.body.style.overflow;
    const previousDocumentOverflow = document.documentElement.style.overflow;
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    document.body.classList.add("drawer-open");
    return () => {
      document.body.style.overflow = previousOverflow;
      document.documentElement.style.overflow = previousDocumentOverflow;
      document.body.classList.remove("drawer-open");
    };
  }, [open]);

  return (
    <>
      <div className="announcement">
        <div className="announcement-track">
          <div className="announcement-message">
            A LITTLE LOVE, A LOT OF STYLE <span aria-hidden="true">✦</span> NEW SEASON COLLECTION NOW LIVE
          </div>
          <div className="announcement-message" aria-hidden="true">
            A LITTLE LOVE, A LOT OF STYLE <span>✦</span> NEW SEASON COLLECTION NOW LIVE
          </div>
        </div>
      </div>
      <header className="site-header">
        <Link
          to="/"
          className="brand"
          aria-label="Hyni Fashion Studio home"
          onClick={() => {
            setOpen(false);
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        >
          <img src="/images/hyni-logo.png" alt="Hyni Fashion Studio" />
        </Link>
        {open && (
          <button
            className="nav-backdrop"
            type="button"
            aria-label="Close navigation menu"
            onClick={() => setOpen(false)}
          />
        )}
        <nav className={open ? "nav open" : "nav"} aria-label="Main navigation">
          {navigation.map(({ label, to, Icon }) => (
            <Link
              key={label}
              to={to}
              className={isNavigationActive(to) ? "active" : undefined}
              aria-current={isNavigationActive(to) ? "page" : undefined}
              onClick={() => setOpen(false)}
            >
              {Icon && <Icon className="nav-icon" size={15} aria-hidden="true" />}
              <span>{label}</span>
            </Link>
          ))}
        </nav>
        <div className="header-actions">
          <form className="search-form" onSubmit={submit}>
            <input
              aria-label="Search products"
              placeholder="Find your style..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
            <button aria-label="Search">
              <Search size={17} />
            </button>
          </form>
          <Link
            className={pathname === "/wishlist" ? "icon-link active" : "icon-link"}
            to="/wishlist"
            aria-label="Wishlist"
            aria-current={pathname === "/wishlist" ? "page" : undefined}
          >
            <Heart size={19} />
            {wishlist.length > 0 && <i>{wishlist.length}</i>}
          </Link>
          <Link
            className={pathname === "/cart" ? "icon-link active" : "icon-link"}
            to="/cart"
            aria-label="Cart"
            aria-current={pathname === "/cart" ? "page" : undefined}
          >
            <ShoppingBag size={19} />
            {cartCount > 0 && <i>{cartCount}</i>}
          </Link>
          <Link
            to={profileTo}
            aria-label="Profile"
            className={`icon-link profile-icon${pathname === profileTo ? " active" : ""}`}
            aria-current={pathname === profileTo ? "page" : undefined}
          >
            <UserRound size={19} />
          </Link>
          <button
            className="mobile-menu"
            onClick={() => setOpen(!open)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </header>
    </>
  );
}
