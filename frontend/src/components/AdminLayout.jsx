import React, { useLayoutEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import {
  ArrowUpRight,
  Boxes,
  ChartNoAxesCombined,
  ClipboardList,
  CreditCard,
  IndianRupee,
  LayoutDashboard,
  LogOut,
  Menu,
  ShoppingBag,
  Tag,
  Users,
  X,
} from 'lucide-react';
import { useStore } from '../context/StoreContext';

const links = [
  ['/admin', 'Overview', LayoutDashboard],
  ['/admin/reports', 'Sales reports', ChartNoAxesCombined],
  ['/admin/payments', 'Payment verification', CreditCard],
  ['/admin/employee-reports', 'Employee reports', ClipboardList],
  ['/admin/employees', 'Employees', Users],
  ['/admin/attendance', 'Attendance', ClipboardList],
  ['/admin/employee-sales', 'Employee sales', IndianRupee],
  ['/admin/performance', 'Performance', ChartNoAxesCombined],
  ['/admin/products', 'Products', ShoppingBag],
  ['/admin/categories', 'Categories', Tag],
  ['/admin/inventory', 'Inventory', Boxes],
  ['/admin/orders', 'Orders', ClipboardList],
  ['/admin/customers', 'Customers', Users],
  ['/admin/discounts', 'Discounts', IndianRupee],
];

let adminSidebarScrollTop = 0;

export default function AdminLayout({ children, title }) {
  const { logout } = useStore();
  const { pathname } = useLocation();
  const sidebarRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const pageTitle = title || links.find(([to]) => to === pathname)?.[1] || 'Studio dashboard';

  useLayoutEffect(() => {
    if (sidebarRef.current) sidebarRef.current.scrollTop = adminSidebarScrollTop;
  }, [pathname]);

  useLayoutEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useLayoutEffect(() => {
    if (!menuOpen) return undefined;
    const previousOverflow = document.body.style.overflow;
    const previousDocumentOverflow = document.documentElement.style.overflow;
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
    document.body.classList.add('drawer-open');
    return () => {
      document.body.style.overflow = previousOverflow;
      document.documentElement.style.overflow = previousDocumentOverflow;
      document.body.classList.remove('drawer-open');
    };
  }, [menuOpen]);

  return (
    <div className="admin-layout">
      {menuOpen && (
        <button
          className="admin-drawer-backdrop"
          type="button"
          aria-label="Close admin navigation"
          onClick={() => setMenuOpen(false)}
        />
      )}
      <aside
        className={`admin-sidebar${menuOpen ? ' open' : ''}`}
        ref={sidebarRef}
        onScroll={(event) => { adminSidebarScrollTop = event.currentTarget.scrollTop; }}
      >
        <Link to="/admin" className="admin-logo">
          <img src="/images/hyni-logo.png" alt="Hyni Fashion Studio" />
          <span>Studio Admin</span>
        </Link>
        <span className="admin-label">WORKSPACE</span>
        {links.map(([to, label, Icon]) => (
          <NavLink key={to} to={to} end={to === '/admin'} onClick={() => setMenuOpen(false)}>
            <Icon size={17} /> {label}
          </NavLink>
        ))}
        <div className="admin-bottom">
          <Link to="/" onClick={() => setMenuOpen(false)}>
            <ArrowUpRight size={16} /> View storefront
          </Link>
          {/* <button onClick={() => { logout(); window.location.href = '/login'; }}> */}
          <button onClick={() => {
  logout();
  navigate('/login', { replace: true });
}}>
            <LogOut size={16} /> Sign out
          </button>
        </div>
      </aside>
      <section className="admin-main">
        <header className="admin-top">
          <button
            type="button"
            className="admin-menu-toggle"
            aria-label={menuOpen ? 'Close admin menu' : 'Open admin menu'}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((current) => !current)}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          <div>
            <span className="eyebrow">H Y N I / ADMIN</span>
            <h2>{pageTitle}</h2>
          </div>
          {/* <span className="demo-chip">LIVE BACKEND</span> */}
        </header>
        {children}
      </section>
    </div>
  );
}
