import { useState, useRef, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { useCart } from "../store/cartStore";

const productCategories = [
  { label: "กล่องบรรจุภัณฑ์",           slug: "กล่องบรรจุภัณฑ์",  icon: "📦" },
  { label: "เมทัลลิค (ฟอยล์)",           slug: "เมทัลลิค",         icon: "✨" },
  { label: "ออฟเซ็ทประกบลูกฟูก",        slug: "ออฟเซ็ทประกบลูกฟูก", icon: "🗂️" },
  { label: "กล่องลูกฟูก",                slug: "กล่องลูกฟูก",      icon: "📮" },
  { label: "สติ๊กเกอร์ (ม้วนและแผ่น)",  slug: "สติ๊กเกอร์",       icon: "🏷️" },
  { label: "ฉลากสินค้า",                 slug: "ฉลากสินค้า",       icon: "🔖" },
  { label: "Hangtag",                    slug: "Hangtag",           icon: "🪧" },
  { label: "แผ่นพับ โบรชัวร์",           slug: "แผ่นพับ",           icon: "📄" },
  { label: "Blister Card & Screen pack", slug: "Blister",           icon: "💊" },
  { label: "แค็ตตาล็อก",                slug: "แค็ตตาล็อก",       icon: "📒" },
  { label: "ถุงกระดาษ",                  slug: "ถุงกระดาษ",         icon: "🛍️" },
  { label: "ปฏิทินและอื่นๆ",             slug: "ปฏิทิน",            icon: "📅" },
];

export default function Navbar() {
  const { totalItems } = useCart();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClick(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  useEffect(() => {
    function onScroll() { setScrolled(window.scrollY > 8); }
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav style={{
      background: scrolled ? "rgba(13, 138, 111, 0.97)" : "#0f987a",
      backdropFilter: scrolled ? "blur(12px)" : "none",
      padding: "0 40px",
      height: "64px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      position: "sticky",
      top: 0,
      zIndex: 1000,
      boxShadow: scrolled ? "0 2px 24px rgba(0,0,0,0.2)" : "none",
      transition: "all .3s ease",
      fontFamily: "'Sarabun', sans-serif",
    }}>
      {/* Logo */}
      <Link to="/" style={{ color: "#fff", textDecoration: "none", display: "flex", alignItems: "center", gap: "10px" }}>
        <div style={{
          width: "36px", height: "36px", borderRadius: "10px",
          background: "linear-gradient(135deg,#1D9E75,#9FE1CB)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: "18px", fontWeight: 800, color: "#053D31",
          flexShrink: 0,
        }}>U</div>
        <div style={{ lineHeight: 1.1 }}>
          <div style={{ fontSize: "16px", fontWeight: 700, letterSpacing: "0.3px" }}>UDP <span style={{ color: "#9FE1CB" }}>Packaging</span></div>
          <div style={{ fontSize: "10px", color: "rgba(255,255,255,0.5)", letterSpacing: "1px" }}>PRINT & PACKAGING</div>
        </div>
      </Link>

      {/* Nav Links */}
      <ul style={{ display: "flex", gap: "4px", listStyle: "none", margin: 0, padding: 0, alignItems: "center" }}>
        <li>
          <NavLink to="/" end style={({ isActive }) => ({
            color: isActive ? "#fff" : "rgba(255,255,255,0.7)",
            fontWeight: isActive ? 600 : 400,
            fontSize: "14px", textDecoration: "none",
            padding: "6px 14px", borderRadius: "8px",
            background: isActive ? "rgba(255,255,255,0.1)" : "transparent",
            transition: "all .15s",
            display: "block",
          })}>หน้าแรก</NavLink>
        </li>

        {/* สินค้า Dropdown */}
        <li ref={dropdownRef} style={{ position: "relative" }}>
          <button onClick={() => setOpen(v => !v)} style={{
            background: open ? "rgba(255,255,255,0.1)" : "transparent",
            border: "none", cursor: "pointer", padding: "6px 14px",
            color: open ? "#fff" : "rgba(255,255,255,0.7)",
            fontWeight: open ? 600 : 400,
            fontSize: "14px", display: "flex", alignItems: "center", gap: "5px",
            borderRadius: "8px", fontFamily: "'Sarabun', sans-serif",
            transition: "all .15s",
          }}>
            สินค้า
            <span style={{
              fontSize: "9px", display: "inline-block",
              transition: "transform .2s",
              transform: open ? "rotate(180deg)" : "rotate(0deg)",
            }}>▼</span>
          </button>

          {open && (
            <div style={{
              position: "absolute", top: "calc(100% + 12px)", left: "50%",
              transform: "translateX(-50%)",
              background: "#fff", borderRadius: "16px",
              boxShadow: "0 20px 60px rgba(0,0,0,0.15), 0 0 0 1px rgba(0,0,0,0.05)",
              width: "260px", overflow: "hidden", zIndex: 200,
              animation: "dropIn .15s ease",
            }}>
              <style>{`@keyframes dropIn { from { opacity:0; transform:translateX(-50%) translateY(-6px); } to { opacity:1; transform:translateX(-50%) translateY(0); } }`}</style>
              <Link to="/products" onClick={() => setOpen(false)} style={{
                display: "flex", alignItems: "center", gap: "10px",
                padding: "14px 16px", fontSize: "13px", fontWeight: 700,
                color: "#1D9E75", textDecoration: "none",
                borderBottom: "1px solid #f3f4f6", background: "#f9fffe",
              }}>
                <span style={{ fontSize: "16px" }}>🛒</span>
                ดูสินค้าทั้งหมด
              </Link>

              <div style={{ padding: "6px 0" }}>
                {productCategories.map(({ label, slug, icon }) => (
                  <Link key={slug} to={`/products?cat=${encodeURIComponent(slug)}`} onClick={() => setOpen(false)} style={{
                    display: "flex", alignItems: "center", gap: "10px",
                    padding: "9px 16px", fontSize: "13px", color: "#374151",
                    textDecoration: "none", transition: "background .1s",
                  }}
                    onMouseEnter={e => { e.currentTarget.style.background = "#E1F5EE"; e.currentTarget.style.color = "#053D31"; }}
                    onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#374151"; }}>
                    <span style={{ fontSize: "14px", width: "20px", textAlign: "center" }}>{icon}</span>
                    {label}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </li>

        {[
          { to: "/portfolio", label: "ผลงาน" },
          { to: "/about",     label: "เกี่ยวกับเรา" },
          { to: "/contact",   label: "ติดต่อ" },
        ].map(({ to, label }) => (
          <li key={to}>
            <NavLink to={to} style={({ isActive }) => ({
              color: isActive ? "#fff" : "rgba(255,255,255,0.7)",
              fontWeight: isActive ? 600 : 400,
              fontSize: "14px", textDecoration: "none",
              padding: "6px 14px", borderRadius: "8px",
              background: isActive ? "rgba(255,255,255,0.1)" : "transparent",
              transition: "all .15s", display: "block",
            })}>{label}</NavLink>
          </li>
        ))}
      </ul>

      {/* Cart Button */}
      <Link to="/cart" style={{
        background: totalItems > 0 ? "#158561" : "rgba(255,255,255,0.15)",
        color: "#fff", fontSize: "13px", fontWeight: 600,
        padding: "8px 20px", borderRadius: "24px", textDecoration: "none",
        display: "flex", alignItems: "center", gap: "7px",
        border: "1.5px solid",
        borderColor: totalItems > 0 ? "#1D9E75" : "rgba(255,255,255,0.3)",
        transition: "all .2s",
      }}
        onMouseEnter={e => { e.currentTarget.style.background = "#16876300"; e.currentTarget.style.borderColor = "#fff"; }}
        onMouseLeave={e => { e.currentTarget.style.background = totalItems > 0 ? "#1D9E75" : "rgba(255,255,255,0.15)"; e.currentTarget.style.borderColor = totalItems > 0 ? "#1D9E75" : "rgba(255,255,255,0.3)"; }}>
        🛒
        {totalItems > 0 ? (
          <>
            ตะกร้า
            <span style={{
              background: "#fff", color: "#053D31", fontSize: "11px",
              fontWeight: 800, width: "20px", height: "20px",
              borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
            }}>{totalItems}</span>
          </>
        ) : "ตะกร้า"}
      </Link>
    </nav>
  );
}