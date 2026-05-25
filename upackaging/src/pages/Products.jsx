import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { ChevronDown, ChevronRight } from "lucide-react";
import { useCart } from "../store/cartStore";

// ─────────────────────────────────────────────────────────
// READY PRODUCTS
// ─────────────────────────────────────────────────────────
const readyProducts = [
  {
    id: "rice-box-s",
    name: "กล่องข้าว ขนาด S",
    icon: "🍱",
    size: "15×10×6 ซม.",
    packQty: 50,
    pricePerPack: 185,
    pricePerUnit: 3.7,
    badge: "ขายดี",
    badgeColor: "#D85A30",
    bg: "#E8F7F2",
    moq: "1 แพ็ค",
    desc: "กล่องข้าวกระดาษสีขาว Food Grade",
    options: ["ไม่มีหน้าต่าง", "มีหน้าต่าง PET"],
  },
  {
    id: "rice-box-m",
    name: "กล่องข้าว ขนาด M",
    icon: "🍱",
    size: "18×13×7 ซม.",
    packQty: 50,
    pricePerPack: 225,
    pricePerUnit: 4.5,
    bg: "#EAF6F0",
    moq: "1 แพ็ค",
    desc: "กล่องข้าวมาตรฐาน",
    options: ["ไม่มีหน้าต่าง", "มีหน้าต่าง PET"],
  },
  {
    id: "cake-box-1lb",
    name: "กล่องเค้ก 1 ปอนด์",
    icon: "🎂",
    size: "26×26×15 ซม.",
    packQty: 20,
    pricePerPack: 320,
    pricePerUnit: 16,
    badge: "ใหม่",
    badgeColor: "#0D5C44",
    bg: "#F5EAF2",
    moq: "1 แพ็ค",
    desc: "กล่องเค้กพร้อมหน้าต่าง",
    options: ["มีหน้าต่าง PET"],
  },
  {
    id: "cup-carrier-2",
    name: "ถาดถ้วย 2 ช่อง",
    icon: "🥤",
    size: "รองรับแก้ว ∅6–9 ซม.",
    packQty: 100,
    pricePerPack: 290,
    pricePerUnit: 2.9,
    bg: "#EAF5F5",
    moq: "1 แพ็ค",
    desc: "ถาดถือแก้ว 2 ช่อง",
    options: ["สีขาว", "สีน้ำตาล Kraft"],
  },
];

// ─────────────────────────────────────────────────────────
// SERVICE CATEGORIES (เพิ่มสินค้าตามสั่งครบถ้วน 11 หมวดหมู่)
// ─────────────────────────────────────────────────────────
const serviceCategories = [
  {
    id: "กล่องบรรจุภัณฑ์",
    icon: "📦",
    name: "กล่องบรรจุภัณฑ์",
    desc: "กล่องพิมพ์ 4 สีออฟเซ็ท อาร์ตการ์ดพรีเมียม",
    moq: "500 ใบ",
    accent: "#1D9E75",
    bg: "#E1F5EE",
    portfolioUrl: "/portfolio?cat=box",
    products: [{ id: "box-cosmetic", name: "กล่องเครื่องสำอาง", price: "เริ่มต้น ฿8/ใบ" }],
  },
  {
    id: "เมทัลลิค",
    icon: "✨",
    name: "เมทัลลิค (ฟอยล์)",
    desc: "งานพรีเมียม ฟอยล์ทอง ฟอยล์เงินเพิ่มมูลค่า",
    moq: "500 ใบ",
    accent: "#B8860B",
    bg: "#FFF9E6",
    portfolioUrl: "/portfolio?cat=metallic",
    products: [{ id: "metallic-box", name: "กล่องเมทัลลิคพรีเมียม", price: "ขอ Quote" }],
  },
  {
    id: "ออฟเซ็ทประกบลูกฟูก",
    icon: "🧱",
    name: "ออฟเซ็ทประกบลูกฟูก",
    desc: "พิมพ์สีสดสไตล์ออฟเซ็ท เพิ่มโครงสร้างแข็งแรง",
    moq: "300 ใบ",
    accent: "#3A86C8",
    bg: "#EBF3FA",
    portfolioUrl: "/portfolio?cat=offset-corrugated",
    products: [{ id: "offset-corrugated-box", name: "กล่องโครงสร้างแข็งแรงพิเศษ", price: "เริ่มต้น ฿18/ใบ" }],
  },
  {
    id: "กล่องลูกฟูก",
    icon: "📮",
    name: "กล่องลูกฟูก",
    desc: "แข็งแรงสำหรับขนส่งและ e-Commerce",
    moq: "200 ใบ",
    accent: "#5DCAA5",
    bg: "#E5F7F2",
    portfolioUrl: "/portfolio?cat=corrugated",
    products: [{ id: "corrugated", name: "กล่องไปรษณีย์ลูกฟูก", price: "เริ่มต้น ฿12/ใบ" }],
  },
  {
    id: "สติ๊กเกอร์",
    icon: "🏷️",
    name: "สติ๊กเกอร์ (ม้วนและแผ่น)",
    desc: "สติ๊กเกอร์ PP, PVC กันน้ำ คมชัดสูง",
    moq: "500 ดวง",
    accent: "#E07A5F",
    bg: "#FBF0ED",
    portfolioUrl: "/portfolio?cat=sticker",
    products: [{ id: "sticker-roll", name: "สติ๊กเกอร์ม้วน/แผ่นไดคัท", price: "เริ่มต้น ฿0.5/ดวง" }],
  },
  {
    id: "ฉลากสินค้า",
    icon: "🥛",
    name: "ฉลากสินค้า",
    desc: "ฉลากสินค้าสายคาด และสลีปกล่องอาหาร",
    moq: "1,000 ใบ",
    accent: "#8338EC",
    bg: "#F3E9FA",
    portfolioUrl: "/portfolio?cat=label",
    products: [{ id: "product-label", name: "ฉลากสลีปและสายคาดกล่อง", price: "เริ่มต้น ฿2/ใบ" }],
  },
  {
    id: "Hangtag",
    icon: "🏷️",
    name: "Hangtag (ป้ายแท็กสินค้า)",
    desc: "ป้ายห้อยเสื้อผ้า แท็กของชำร่วย เจาะรูพร้อมใช้",
    moq: "1,000 ใบ",
    accent: "#FF006E",
    bg: "#FFE6F1",
    portfolioUrl: "/portfolio?cat=hangtag",
    products: [{ id: "hangtag-brand", name: "ป้ายแท็กสินค้าเจาะรู", price: "เริ่มต้น ฿1.5/ใบ" }],
  },
  {
    id: "แผ่นพับ",
    icon: "📄",
    name: "แผ่นพับ โบรชัวร์",
    desc: "พิมพ์เมนู ใบปลิว แผ่นพับ 2 พับ 3 ตอน",
    moq: "500 ใบ",
    accent: "#FB5607",
    bg: "#FFF0E6",
    portfolioUrl: "/portfolio?cat=brochure",
    products: [{ id: "brochure-menu", name: "แผ่นพับ / ใบปลิวโฆษณา", price: "เริ่มต้น ฿3/ใบ" }],
  },
  {
    id: "Blister",
    icon: "💳",
    name: "Blister Card & Screen pack",
    desc: "การ์ดกระดาษรองแพ็คเกจจิ้งพลาสติกใสขึ้นรูป",
    moq: "2,000 ใบ",
    accent: "#FFB703",
    bg: "#FFFDF0",
    portfolioUrl: "/portfolio?cat=blister",
    products: [{ id: "blister-card", name: "กระดาษการ์ดรองบลิสเตอร์", price: "ขอ Quote" }],
  },
  {
    id: "แค็ตตาล็อก",
    icon: "📖",
    name: "แค็ตตาล็อก",
    desc: "สมุดภาพผลงาน สมุดแนะนำสินค้า เข้าเล่มมุงหลังคา/ไส้กาว",
    moq: "100 เล่ม",
    accent: "#0077B6",
    bg: "#E6F4FA",
    portfolioUrl: "/portfolio?cat=catalog",
    products: [{ id: "catalog-book", name: "แค็ตตาล็อกสินค้าและวารสาร", price: "เริ่มต้น ฿45/เล่ม" }],
  },
  {
    id: "ถุงกระดาษ",
    icon: "🛍️",
    name: "ถุงกระดาษ",
    desc: "ถุงกระดาษคราฟท์ ถุงช้อปปิ้งหูร้อยเชือกสุดหรู",
    moq: "500 ใบ",
    accent: "#70E000",
    bg: "#F2FCE6",
    portfolioUrl: "/portfolio?cat=paper-bag",
    products: [{ id: "paper-bag-luxury", name: "ถุงกระดาษหูหิ้วพิมพ์โลโก้", price: "เริ่มต้น ฿15/ใบ" }],
  },
  {
    id: "ปฏิทิน",
    icon: "📅",
    name: "ปฏิทินและอื่นๆ",
    desc: "ปฏิทินตั้งโต๊ะ ของที่ระลึกองค์กร และงานพิมพ์คัสตอม",
    moq: "200 ชุด",
    accent: "#2F3E46",
    bg: "#F0F2F2",
    portfolioUrl: "/portfolio?cat=calendar",
    products: [{ id: "calendar-desktop", name: "ปฏิทินตั้งโต๊ะ / งานพิมพ์พิเศษ", price: "ขอ Quote" }],
  },
];

function formatPrice(n) {
  return n.toLocaleString("th-TH");
}

// ─────────────────────────────────────────────────────────
// SIDEBAR
// ─────────────────────────────────────────────────────────
function Sidebar({ activeTab, setActiveTab, selectedCategory, setSelectedCategory }) {
  const [openMenus, setOpenMenus] = useState({ ready: true, service: true });
  const toggleMenu = (key) => setOpenMenus((p) => ({ ...p, [key]: !p[key] }));

  return (
    <aside className="hidden lg:block w-[250px] shrink-0">
      <div className="sticky top-[88px] bg-[#F5F5F2] border border-gray-200 rounded-2xl overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-200 bg-white">
          <h3 className="text-sm font-bold text-[#0D5C44]">ฟิลเตอร์สินค้า</h3>
        </div>

        <button
          onClick={() => { setActiveTab("ทั้งหมด"); setSelectedCategory(null); }}
          className={`w-full text-left px-5 py-3 text-sm font-semibold transition-all ${
            !selectedCategory ? "bg-[#E1F5EE] text-[#0D5C44]" : "text-gray-700 hover:bg-gray-100"
          }`}
        >
          ทั้งหมด
        </button>

        {/* Ready Menu */}
        <div className="border-t border-gray-200">
          <button onClick={() => toggleMenu("ready")} className="w-full flex items-center justify-between px-5 py-3 text-sm font-semibold text-gray-800 hover:bg-gray-100">
            <span>🛍️ ซื้อได้เลย</span>
            {openMenus.ready ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
          </button>
          {openMenus.ready && (
            <div className="pb-2">
              {["กล่องข้าว", "กล่องเค้ก", "ถาดถ้วย"].map((cat) => (
                <button
                  key={cat}
                  onClick={() => { setActiveTab("🛍️ ซื้อได้เลย"); setSelectedCategory(cat); }}
                  className={`w-full text-left px-8 py-2.5 text-[13px] transition-all ${
                    selectedCategory === cat ? "text-[#0D5C44] font-semibold bg-[#EAF7F2]" : "text-gray-500 hover:bg-[#EDF8F4]"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Service Menu */}
        <div className="border-t border-gray-200">
          <button onClick={() => toggleMenu("service")} className="w-full flex items-center justify-between px-5 py-3 text-sm font-semibold text-gray-800 hover:bg-gray-100">
            <span>🖨️ พิมพ์ตามสั่ง</span>
            {openMenus.service ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
          </button>
          {openMenus.service && (
            <div className="pb-3 max-h-[380px] overflow-y-auto">
              {serviceCategories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => { setActiveTab("🖨️ พิมพ์ตามสั่ง"); setSelectedCategory(cat.id); }}
                  className={`w-full text-left px-8 py-2.5 text-[13px] transition-all ${
                    selectedCategory === cat.id ? "text-[#0D5C44] font-semibold bg-[#EAF7F2]" : "text-gray-500 hover:bg-[#EDF8F4]"
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}

// ─────────────────────────────────────────────────────────
// CARDS COMPONENTS
// ─────────────────────────────────────────────────────────
function ReadyProductCard({ product }) {
  const { addItem } = useCart();
  return (
    <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
      <div>
        <div className="h-[120px] flex items-center justify-center relative" style={{ background: product.bg }}>
          <span className="text-5xl">{product.icon}</span>
          {product.badge && (
            <span className="absolute top-3 right-3 text-[10px] text-white font-bold px-2 py-1 rounded-full" style={{ background: product.badgeColor }}>
              {product.badge}
            </span>
          )}
        </div>
        <div className="p-4 pb-0">
          <h3 className="text-sm font-bold text-gray-900 mb-1">{product.name}</h3>
          <p className="text-[11px] text-gray-500 mb-4">{product.desc}</p>
          <div className="flex items-end justify-between mb-4">
            <div>
              <div className="text-[10px] text-gray-400">ราคา / แพ็ค</div>
              <div className="text-lg font-extrabold text-[#0D5C44]">฿{formatPrice(product.pricePerPack)}</div>
            </div>
            <div className="text-right">
              <div className="text-[10px] text-gray-400">ต่อใบ</div>
              <div className="text-xs font-semibold text-gray-600">฿{product.pricePerUnit}</div>
            </div>
          </div>
        </div>
      </div>
      <div className="p-4 pt-2 space-y-2">
        <button onClick={() => addItem({ id: product.id, name: product.name, price: product.pricePerPack }, 1)} className="w-full bg-[#0D5C44] hover:bg-[#085041] text-white text-xs font-bold py-2.5 rounded-xl transition-all flex items-center justify-center gap-1">
          <span>🛒</span> หยิบใส่ตะกร้า
        </button>
        <Link to={`/products/${product.id}`} className="block text-center border border-gray-200 text-gray-700 bg-white hover:bg-gray-50 text-xs font-bold py-2.5 rounded-xl transition-all no-underline">
          📄 รายละเอียดสินค้า
        </Link>
      </div>
    </div>
  );
}

function ServiceCategoryCard({ cat }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
      <div>
        <div className="h-1 w-full" style={{ background: cat.accent }} />
        <div className="h-[100px] px-5 flex items-center justify-between" style={{ background: cat.bg }}>
          <span className="text-4xl">{cat.icon}</span>
          <span className="text-[10px] text-white font-bold px-3 py-1 rounded-full" style={{ background: cat.accent }}>MOQ {cat.moq}</span>
        </div>
        <div className="p-4 pb-0">
          <h3 className="text-sm font-bold text-gray-900 mb-1">{cat.name}</h3>
          <p className="text-[11px] text-gray-500 mb-4">{cat.desc}</p>
          <div className="space-y-2 mb-4">
            {cat.products.map((p) => (
              <div key={p.id} className="flex items-center justify-between text-[11px]">
                <Link to={`/products/${p.id}`} className="text-gray-700 no-underline hover:underline font-medium">{p.name} 🔍</Link>
                <span className="font-semibold" style={{ color: cat.accent }}>{p.price}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="p-4 pt-2 space-y-2">
        <Link to={cat.portfolioUrl || "/portfolio"} className="block text-center text-xs font-bold py-2.5 rounded-xl no-underline transition-all" style={{ border: `1px solid ${cat.accent}`, color: cat.accent, backgroundColor: `${cat.bg}40` }}>
          🖼️ ดูรูปผลงานเพิ่มเติม
        </Link>
        <Link to="/contact" className="block text-center text-white text-xs font-bold py-2.5 rounded-xl no-underline hover:opacity-90 transition-all" style={{ background: cat.accent }}>
          ขอใบเสนอราคา →
        </Link>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────
// MAIN MAIN COMPONENT
// ─────────────────────────────────────────────────────────
export default function Products() {
  const [searchParams] = useSearchParams();
  const slugFromUrl = searchParams.get("cat");
  const [activeTab, setActiveTab] = useState("ทั้งหมด");
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    if (slugFromUrl) {
      setSelectedCategory(slugFromUrl);
      if (["กล่องข้าว", "กล่องเค้ก", "ถาดถ้วย"].includes(slugFromUrl)) {
        setActiveTab("🛍️ ซื้อได้เลย");
      } else {
        setActiveTab("🖨️ พิมพ์ตามสั่ง");
      }
    } else {
      setActiveTab("ทั้งหมด");
      setSelectedCategory(null);
    }
    window.scrollTo(0, 0);
  }, [slugFromUrl]);

  const filteredReadyProducts = readyProducts.filter((p) => {
    if (!selectedCategory) return true;
    if (selectedCategory === "กล่องข้าว" && p.id.includes("rice")) return true;
    if (selectedCategory === "กล่องเค้ก" && p.id.includes("cake")) return true;
    if (selectedCategory === "ถาดถ้วย" && p.id.includes("cup")) return true;
    return false;
  });

  const filteredServiceCategories = serviceCategories.filter((cat) => {
    if (!selectedCategory) return true;
    // ป้องกันเคส slug จาก navbar บางตัวแมทช์ย่อย
    if (selectedCategory === "สติ๊กเกอร์" && cat.id === "สติ๊กเกอร์") return true;
    if (selectedCategory === "แผ่นพับ" && cat.id === "แผ่นพับ") return true;
    if (selectedCategory === "แค็ตตาล็อก" && cat.id === "แค็ตตาล็อก") return true;
    if (selectedCategory === "ถุงกระดาษ" && cat.id === "ถุงกระดาษ") return true;
    if (selectedCategory === "ปฏิทิน" && cat.id === "ปฏิทิน") return true;
    if (selectedCategory === "Blister" && cat.id === "Blister") return true;
    return cat.id === selectedCategory;
  });

  const showReady = activeTab === "ทั้งหมด" || activeTab === "🛍️ ซื้อได้เลย";
  const showService = activeTab === "ทั้งหมด" || activeTab === "🖨️ พิมพ์ตามสั่ง";

  return (
    <main className="font-['Sarabun'] bg-[#FAFAF8] min-h-screen text-left">
      <section className="px-6 md:px-12 py-14" style={{ background: "linear-gradient(135deg, #053D31 0%, #1D9E75 100%)" }}>
        <div className="max-w-7xl mx-auto">
          <span className="text-[10px] font-bold tracking-[3px] text-[#7EC8C8] uppercase block mb-2">PRODUCTS & SERVICES</span>
          <h1 className="text-3xl font-bold text-white mb-2">สินค้าและบริการ</h1>
          <p className="text-white/75 text-sm">ซื้อกล่องพร้อมส่ง หรือสั่งพิมพ์ตามแบบสเปคโรงงาน</p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 md:px-12 py-10 flex gap-6">
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
        <div className="flex-1 space-y-14">
          {showReady && filteredReadyProducts.length > 0 && (
            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-6">🛍️ สินค้าพร้อมส่ง</h2>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {filteredReadyProducts.map((p) => <ReadyProductCard key={p.id} product={p} />)}
              </div>
            </section>
          )}

          {showService && filteredServiceCategories.length > 0 && (
            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-6">🖨️ บริการพิมพ์ตามสั่ง</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {filteredServiceCategories.map((cat) => <ServiceCategoryCard key={cat.id} cat={cat} />)}
              </div>
            </section>
          )}

          {filteredReadyProducts.length === 0 && filteredServiceCategories.length === 0 && (
            <div className="text-center py-20 text-gray-400">ไม่พบสินค้าหรือบริการในหมวดหมู่นี้</div>
          )}
        </div>
      </div>
    </main>
  );
}