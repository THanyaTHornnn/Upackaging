import { useState, useRef, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { useCart } from "../store/cartStore";

const productCategories = [
  { label: "กล่องบรรจุภัณฑ์",           slug: "กล่องบรรจุภัณฑ์",       icon: "ti-package" },
  { label: "เมทัลลิค (ฟอยล์)",           slug: "เมทัลลิค",              icon: "ti-sparkles" },
  { label: "ออฟเซ็ทประกบลูกฟูก",         slug: "ออฟเซ็ทประกบลูกฟูก",    icon: "ti-layers-difference" },
  { label: "กล่องลูกฟูก",                slug: "กล่องลูกฟูก",           icon: "ti-box" },
  { label: "สติ๊กเกอร์ (ม้วนและแผ่น)",   slug: "สติ๊กเกอร์",            icon: "ti-tag" },
  { label: "ฉลากสินค้า",                 slug: "ฉลากสินค้า",            icon: "ti-bookmark" },
  { label: "Hangtag",                    slug: "Hangtag",               icon: "ti-label" },
  { label: "แผ่นพับ โบรชัวร์",           slug: "แผ่นพับ",               icon: "ti-file-text" },
  { label: "Blister Card & Screen pack", slug: "Blister",               icon: "ti-layout-grid" },
  { label: "แค็ตตาล็อก",                slug: "แค็ตตาล็อก",            icon: "ti-book" },
  { label: "ถุงกระดาษ",                  slug: "ถุงกระดาษ",              icon: "ti-shopping-bag" },
  { label: "ปฏิทินและอื่นๆ",             slug: "ปฏิทิน",                icon: "ti-calendar" },
];

export default function Navbar() {
  const { totalItems } = useCart();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className={`sticky top-0 z-[1000] h-16 md:h-[72px] px-4 md:px-12 flex items-center justify-between transition-all duration-300 font-['Sarabun'] ${
      scrolled 
        ? "bg-[#0A3828]/95 backdrop-blur-md border-b border-[#7EC8C8]/20 shadow-lg shadow-black/10" 
        : "bg-[#0D5C44]/90 backdrop-blur-md border-b border-white/5 shadow-md"
    }`}>
      {/* Brand Logo */}
      <Link to="/" className="flex items-center gap-3 shrink-0 no-underline group">
        <div className="w-10 h-10 md:w-11 md:h-11 rounded-full overflow-hidden border-2 border-[#7EC8C8]/30 shadow-md transition-transform duration-300 group-hover:scale-105">
          <img src="/logo.png" alt="UDP Packaging" className="w-full h-full object-cover" />
        </div>
        <div className="leading-tight">
          <div className="text-sm md:text-base font-bold text-white tracking-wide">
            UDP <span className="text-[#7EC8C8] transition-colors duration-300 group-hover:text-white">Packaging</span>
          </div>
          <div className="text-[9px] md:text-[10px] text-[#7EC8C8]/70 tracking-[2px] uppercase font-medium">
            Print &amp; Packaging
          </div>
        </div>
      </Link>

      {/* Nav Links - Desktop */}
      <ul className="hidden md:flex items-center gap-1 list-none m-0 p-0">
        <li>
          <NavLink to="/" end className={({ isActive }) => `text-sm px-4 py-2 rounded-lg transition-all duration-200 no-underline ${isActive ? "text-white font-semibold bg-[#7EC8C8]/20" : "text-white/80 hover:text-white hover:bg-[#7EC8C8]/10"}`}>
            หน้าแรก
          </NavLink>
        </li>

        {/* Products Dropdown */}
        <li ref={dropdownRef} className="relative">
          <button
            onClick={() => setOpen(!open)}
            className={`text-sm px-4 py-2 rounded-lg transition-all duration-200 flex items-center gap-1.5 font-['Sarabun'] cursor-pointer ${
              open ? "text-white font-semibold bg-[#7EC8C8]/20" : "text-white/80 hover:text-white hover:bg-[#7EC8C8]/10"
            }`}
          >
            สินค้า
            <span className={`text-[9px] text-[#7EC8C8] transition-transform duration-300 ${open ? "rotate-180" : "rotate-0"}`}>▼</span>
          </button>

          {open && (
            <div className="absolute top-[calc(100%+12px)] left-1/2 -translate-x-1/2 bg-white rounded-2xl shadow-xl shadow-black/10 border border-gray-100 w-72 overflow-hidden z-[200] animate-fadeIn">
              <Link
                to="/products"
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 p-4 text-sm font-bold text-[#0D5C44] no-underline border-b border-gray-50 bg-gradient-to-br from-[#f0faf7] to-[#e8f7f5] hover:opacity-95"
              >
                <span className="w-7 h-7 rounded-lg bg-[#0D5C44] flex items-center justify-center text-white text-xs">🛒</span>
                ดูสินค้าทั้งหมด
              </Link>

              <div className="py-1.5 max-h-[320px] overflow-y-auto scrollbar-thin">
                {productCategories.map(({ label, slug }) => (
                  <Link
                    key={slug}
                    to={`/products?cat=${encodeURIComponent(slug)}`}
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-2.5 px-5 py-2.5 text-xs md:text-sm text-gray-700 no-underline transition-colors hover:bg-[#E8F7F5] hover:text-[#054040]"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#1A8A6A] shrink-0 opacity-60" />
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
            <NavLink to={to} className={({ isActive }) => `text-sm px-4 py-2 rounded-lg transition-all duration-200 no-underline ${isActive ? "text-white font-semibold bg-[#7EC8C8]/20" : "text-white/80 hover:text-white hover:bg-[#7EC8C8]/10"}`}>
              {label}
            </NavLink>
          </li>
        ))}
      </ul>

      {/* Cart Button */}
      <Link
        to="/cart"
        className={`text-xs md:text-sm font-semibold px-4 py-2 md:px-5 md:py-2.5 rounded-full no-underline flex items-center gap-2 border transition-all duration-300 ${
          totalItems > 0 
            ? "bg-[#7EC8C8]/20 text-white border-[#7EC8C8] hover:bg-[#7EC8C8]/30" 
            : "bg-white/10 text-white border-white/20 hover:bg-white/20 hover:border-white/40"
        }`}
      >
        <span>🛒</span>
        <span className="hidden sm:inline">ตะกร้า</span>
        {totalItems > 0 && (
          <span className="bg-[#7EC8C8] text-[#054040] text-[10px] font-extrabold w-5 h-5 rounded-full flex items-center justify-center animate-pulse">
            {totalItems}
          </span>
        )}
      </Link>
    </nav>
  );
}