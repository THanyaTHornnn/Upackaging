import { useState, useRef, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useCart } from "../store/cartStore";

// 🛍️ กลุ่มที่ 1: สินค้าสำเร็จรูป (ซื้อได้เลย)
const readyCategoryLinks = [
  { label: "กล่องข้าวสำเร็จรูป", slug: "กล่องข้าว" },
  { label: "กล่องเค้กสำเร็จรูป", slug: "กล่องเค้ก" },
  { label: "ถาดถ้วยสำเร็จรูป", slug: "ถาดถ้วย" },
];

// 🖨️ กลุ่มที่ 2: บริการพิมพ์ตามสั่ง (อัปเดตครบถ้วน 11 หมวดหมู่ให้ลิ้งก์ตรงระบบ Filter)
const serviceCategoryLinks = [
  { label: "กล่องบรรจุภัณฑ์", slug: "กล่องบรรจุภัณฑ์" },
  { label: "เมทัลลิค (ฟอยล์)", slug: "เมทัลลิค" },
  { label: "ออฟเซ็ทประกบลูกฟูก", slug: "ออฟเซ็ทประกบลูกฟูก" },
  { label: "กล่องลูกฟูก", slug: "กล่องลูกฟูก" },
  { label: "สติ๊กเกอร์ (ม้วน/แผ่น)", slug: "สติ๊กเกอร์" },
  { label: "ฉลากสินค้า", slug: "ฉลากสินค้า" },
  { label: "Hangtag (ป้ายแท็ก)", slug: "Hangtag" },
  { label: "แผ่นพับ โบรชัวร์", slug: "แผ่นพับ" },
  { label: "Blister Card Pack", slug: "Blister" },
  { label: "แค็ตตาล็อก", slug: "แค็ตตาล็อก" },
  { label: "ถุงกระดาษ", slug: "ถุงกระดาษ" },
  { label: "ปฏิทินและอื่นๆ", slug: "ปฏิทิน" },
];

const navLinks = [
  { to: "/portfolio", label: "ผลงาน" },
  { to: "/about",     label: "เกี่ยวกับเรา" },
  { to: "/contact",   label: "ติดต่อ" },
];

// ── Hamburger Icon ──
function HamburgerIcon({ open }) {
  return (
    <div className="w-5 h-4 flex flex-col justify-between">
      <span className={`block h-0.5 bg-white rounded-full transition-all duration-300 origin-center ${open ? "rotate-45 translate-y-[7px]" : ""}`} />
      <span className={`block h-0.5 bg-white rounded-full transition-all duration-300 ${open ? "opacity-0 scale-x-0" : ""}`} />
      <span className={`block h-0.5 bg-white rounded-full transition-all duration-300 origin-center ${open ? "-rotate-45 -translate-y-[9px]" : ""}`} />
    </div>
  );
}

export default function Navbar() {
  const { totalItems } = useCart();
  const location = useLocation();

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const dropdownRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) setDropdownOpen(false);
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  // Scroll detection
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
    setDropdownOpen(false);
  }, [location]);

  // Lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <>
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

        {/* ── Desktop Nav Links ── */}
        <ul className="hidden md:flex items-center gap-1 list-none m-0 p-0">
          <li>
            <NavLink to="/" end className={({ isActive }) =>
              `text-sm px-4 py-2 rounded-lg transition-all duration-200 no-underline ${isActive ? "text-white font-semibold bg-[#7EC8C8]/20" : "text-white/80 hover:text-white hover:bg-[#7EC8C8]/10"}`
            }>
              หน้าแรก
            </NavLink>
          </li>

          {/* Desktop Products Dropdown */}
          <li ref={dropdownRef} className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className={`text-sm px-4 py-2 rounded-lg transition-all duration-200 flex items-center gap-1.5 font-['Sarabun'] cursor-pointer ${
                dropdownOpen ? "text-white font-semibold bg-[#7EC8C8]/20" : "text-white/80 hover:text-white hover:bg-[#7EC8C8]/10"
              }`}
            >
              สินค้าและบริการ
              <span className={`text-[9px] text-[#7EC8C8] transition-transform duration-300 ${dropdownOpen ? "rotate-180" : "rotate-0"}`}>▼</span>
            </button>

            {dropdownOpen && (
              <div className="absolute top-[calc(100%+12px)] left-1/2 -translate-x-1/2 bg-white rounded-2xl shadow-xl border border-gray-100 w-[340px] overflow-hidden z-[200]">
                {/* ลิงก์ดูทั้งหมด */}
                <Link
                  to="/products"
                  onClick={() => setDropdownOpen(false)}
                  className="flex items-center gap-3 p-4 text-sm font-bold text-[#0D5C44] no-underline border-b border-gray-50 bg-gradient-to-br from-[#f0faf7] to-[#e8f7f5] hover:opacity-95"
                >
                  <span className="w-7 h-7 rounded-lg bg-[#0D5C44] flex items-center justify-center text-white text-xs">🛍️</span>
                  ดูสินค้าและบริการทั้งหมด
                </Link>

                <div className="p-4 grid grid-cols-1 gap-4 max-h-[440px] overflow-y-auto text-left">
                  
                  {/* กลุ่มที่ 1: สินค้าพร้อมส่ง (ซื้อได้เลย) */}
                  <div>
                    <div className="text-[11px] font-extrabold text-gray-400 uppercase tracking-wider mb-1.5 px-2 flex items-center gap-1">
                      <span>🛍️</span> ซื้อได้เลย ไม่ต้องรอออกแบบ
                    </div>
                    <div className="space-y-0.5">
                      {readyCategoryLinks.map(({ label, slug }) => (
                        <Link
                          key={slug}
                          to={`/products?cat=${encodeURIComponent(slug)}`}
                          onClick={() => setDropdownOpen(false)}
                          className="flex items-center gap-2 px-2 py-1.5 text-xs md:text-sm text-gray-700 no-underline rounded-lg transition-colors hover:bg-[#EAF7F2] hover:text-[#0D5C44]"
                        >
                          <span className="w-1 h-1 rounded-full bg-[#1A8A6A] shrink-0 opacity-60" />
                          {label}
                        </Link>
                      ))}
                    </div>
                  </div>

                  {/* กลุ่มที่ 2: งานบริการพิมพ์ตามสั่ง */}
                  <div className="border-t border-gray-50 pt-3">
                    <div className="text-[11px] font-extrabold text-gray-400 uppercase tracking-wider mb-1.5 px-2 flex items-center gap-1">
                      <span>🖨️</span> พิมพ์ตามสั่ง (สั่งออกแบบ)
                    </div>
                    <div className="space-y-0.5">
                      {serviceCategoryLinks.map(({ label, slug }) => (
                        <Link
                          key={slug}
                          to={`/products?cat=${encodeURIComponent(slug)}`}
                          onClick={() => setDropdownOpen(false)}
                          className="flex items-center gap-2 px-2 py-1.5 text-xs md:text-sm text-gray-700 no-underline rounded-lg transition-colors hover:bg-[#EAF7F2] hover:text-[#0D5C44]"
                        >
                          <span className="w-1 h-1 rounded-full bg-[#1A8A6A] shrink-0 opacity-60" />
                          {label}
                        </Link>
                      ))}
                    </div>
                  </div>

                </div>
              </div>
            )}
          </li>

          {navLinks.map(({ to, label }) => (
            <li key={to}>
              <NavLink to={to} className={({ isActive }) =>
                `text-sm px-4 py-2 rounded-lg transition-all duration-200 no-underline ${isActive ? "text-white font-semibold bg-[#7EC8C8]/20" : "text-white/80 hover:text-white hover:bg-[#7EC8C8]/10"}`
              }>
                {label}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* ── Right Side: Cart + Hamburger ── */}
        <div className="flex items-center gap-2">
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

          {/* Hamburger Button — mobile only */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
            className="md:hidden w-10 h-10 flex items-center justify-center rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 transition-all duration-200 active:scale-95"
          >
            <HamburgerIcon open={mobileOpen} />
          </button>
        </div>
      </nav>

      {/* ── Mobile Drawer Overlay ── */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-[999] bg-black/40 backdrop-blur-sm md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* ── Mobile Drawer Panel ── */}
      <div className={`fixed top-0 right-0 z-[1000] h-full w-[280px] bg-[#0A3828] shadow-2xl transition-transform duration-300 ease-in-out md:hidden flex flex-col text-left ${
        mobileOpen ? "translate-x-0" : "translate-x-full"
      }`}>

        {/* Drawer Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
          <div className="text-white font-bold text-sm tracking-wide">
            UDP <span className="text-[#7EC8C8]">Packaging</span>
          </div>
          <button
            onClick={() => setMobileOpen(false)}
            className="w-8 h-8 flex items-center justify-center rounded-lg bg-white/10 hover:bg-white/20 transition-colors text-white text-lg leading-none"
          >
            ✕
          </button>
        </div>

        {/* Drawer Links */}
        <nav className="flex-1 overflow-y-auto py-3 px-3">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium no-underline transition-colors mb-1 ${
                isActive ? "bg-[#7EC8C8]/20 text-white font-semibold" : "text-white/80 hover:bg-white/10 hover:text-white"
              }`
            }
          >
            🏠 หน้าแรก
          </NavLink>

          {/* Mobile Products Accordion */}
          <div className="mb-1">
            <button
              onClick={() => setMobileProductsOpen(!mobileProductsOpen)}
              className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium text-white/80 hover:bg-white/10 hover:text-white transition-colors"
            >
              <span>🛍️ สินค้าและบริการ</span>
              <span className={`text-[#7EC8C8] text-[10px] transition-transform duration-300 ${mobileProductsOpen ? "rotate-180" : ""}`}>▼</span>
            </button>

            {mobileProductsOpen && (
              <div className="mt-1 mx-2 bg-white/5 rounded-xl border border-white/10 overflow-hidden">
                <Link
                  to="/products"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-2 px-4 py-3 text-xs font-bold text-[#7EC8C8] no-underline border-b border-white/10 hover:bg-white/10"
                >
                  ดูสินค้าทั้งหมด →
                </Link>
                <div className="max-h-[340px] overflow-y-auto p-2 space-y-3">
                  
                  {/* ย่อยกลุ่ม 1 ในเมนูมือถือ */}
                  <div>
                    <div className="text-[10px] font-bold text-[#7EC8C8]/60 px-2 mb-1">🛍️ ซื้อได้เลย ไม่ต้องรอออกแบบ</div>
                    {readyCategoryLinks.map(({ label, slug }) => (
                      <Link
                        key={slug}
                        to={`/products?cat=${encodeURIComponent(slug)}`}
                        onClick={() => setMobileOpen(false)}
                        className="flex items-center gap-2 px-3 py-2 text-xs text-white/70 no-underline rounded-lg hover:bg-white/10 hover:text-white transition-colors"
                      >
                        <span className="w-1 h-1 rounded-full bg-[#7EC8C8] shrink-0 opacity-50" />
                        {label}
                      </Link>
                    ))}
                  </div>

                  {/* ย่อยกลุ่ม 2 ในเมนูมือถือ */}
                  <div className="border-t border-white/5 pt-2">
                    <div className="text-[10px] font-bold text-[#7EC8C8]/60 px-2 mb-1">🖨️ พิมพ์ตามสั่ง (สั่งออกแบบ)</div>
                    {serviceCategoryLinks.map(({ label, slug }) => (
                      <Link
                        key={slug}
                        to={`/products?cat=${encodeURIComponent(slug)}`}
                        onClick={() => setMobileOpen(false)}
                        className="flex items-center gap-2 px-3 py-2 text-xs text-white/70 no-underline rounded-lg hover:bg-white/10 hover:text-white transition-colors"
                      >
                        <span className="w-1 h-1 rounded-full bg-[#7EC8C8] shrink-0 opacity-50" />
                        {label}
                      </Link>
                    ))}
                  </div>

                </div>
              </div>
            )}
          </div>

          {[
            { to: "/portfolio", label: "🖼️ ผลงาน" },
            { to: "/about",     label: "🏢 เกี่ยวกับเรา" },
            { to: "/contact",   label: "📞 ติดต่อ" },
          ].map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium no-underline transition-colors mb-1 ${
                  isActive ? "bg-[#7EC8C8]/20 text-white font-semibold" : "text-white/80 hover:bg-white/10 hover:text-white"
                }`
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>

        {/* Drawer Footer */}
        <div className="px-4 py-5 border-t border-white/10">
          <Link
            to="/contact"
            onClick={() => setMobileOpen(false)}
            className="block text-center bg-[#7EC8C8] text-[#0A3828] font-extrabold text-sm py-3 rounded-xl no-underline hover:brightness-105 transition-all shadow-lg"
          >
            ขอใบเสนอราคาฟรี ✉️
          </Link>
          <p className="text-center text-[10px] text-white/35 mt-3">ตอบกลับภายใน 1 ชั่วโมง</p>
        </div>
      </div>
    </>
  );
}