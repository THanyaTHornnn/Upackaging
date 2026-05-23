import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useCart } from "../store/cartStore";

const PRODUCTS = {
  "box-cosmetic": {
    name: "กล่องเครื่องสำอาง", cat: "กล่อง", icon: "📦",
    price: "เริ่มต้น ฿8 / ใบ", moq: "500 ใบ", lead: "7–10 วันทำการ",
    desc: "กล่องพิมพ์ 4 สีออฟเซ็ท บนกระดาษอาร์ตการ์ดคุณภาพสูง เคลือบ UV เงาหรือด้านได้ตามต้องการ เหมาะสำหรับแบรนด์เครื่องสำอาง สกินแคร์ และผลิตภัณฑ์พรีเมียม",
    specs: [
      { label: "วัสดุ", value: "อาร์ตการ์ด 350 แกรม" },
      { label: "การพิมพ์", value: "4 สีออฟเซ็ท" },
      { label: "เคลือบผิว", value: "UV เงา / UV ด้าน / ไม่เคลือบ" },
      { label: "ฟินิชพิเศษ", value: "ฟอยล์ทอง, ฟอยล์เงิน, ปั๊มนูน" },
      { label: "MOQ", value: "500 ใบ" },
      { label: "ระยะเวลาผลิต", value: "7–10 วันทำการ" },
    ],
    options: ["เคลือบ UV เงา", "เคลือบ UV ด้าน", "ฟอยล์ทอง", "ฟอยล์เงิน", "ปั๊มนูน"],
    related: ["box-food", "box-shipping", "bag-paper"],
  },
  "box-food": {
    name: "กล่องอาหาร", cat: "กล่อง", icon: "🍱",
    price: "เริ่มต้น ฿5 / ใบ", moq: "1,000 ใบ", lead: "5–7 วันทำการ",
    desc: "กล่องกระดาษ food grade ปลอดภัย รับรองมาตรฐาน FDA พิมพ์สีสดใส เหมาะสำหรับร้านอาหาร เบเกอรี่ และธุรกิจ F&B",
    specs: [
      { label: "วัสดุ", value: "กระดาษ Food Grade" },
      { label: "การพิมพ์", value: "4 สีออฟเซ็ท" },
      { label: "มาตรฐาน", value: "FDA อนุมัติ" },
      { label: "MOQ", value: "1,000 ใบ" },
      { label: "ระยะเวลาผลิต", value: "5–7 วันทำการ" },
    ],
    options: ["ขนาด S", "ขนาด M", "ขนาด L", "มีหน้าต่าง PET"],
    related: ["box-cosmetic", "box-shipping", "brochure-tri"],
  },
  "box-shipping": {
    name: "กล่องไปรษณีย์", cat: "กล่อง", icon: "📫",
    price: "เริ่มต้น ฿12 / ใบ", moq: "200 ใบ", lead: "3–5 วันทำการ",
    desc: "กล่องลูกฟูก 3 และ 5 ชั้น แข็งแรงทนทาน รับน้ำหนักได้ดี พิมพ์โลโก้ด้านนอกได้ เหมาะสำหรับธุรกิจ e-Commerce และส่งสินค้าทางไปรษณีย์",
    specs: [
      { label: "วัสดุ", value: "ลูกฟูก 3 ชั้น / 5 ชั้น" },
      { label: "การพิมพ์", value: "1–2 สี Flexo" },
      { label: "MOQ", value: "200 ใบ" },
      { label: "ระยะเวลาผลิต", value: "3–5 วันทำการ" },
    ],
    options: ["ลูกฟูก 3 ชั้น", "ลูกฟูก 5 ชั้น", "พิมพ์โลโก้", "ไม่พิมพ์"],
    related: ["box-cosmetic", "sticker-roll", "bag-paper"],
  },
};

export default function ProductDetail() {
  const { id } = useParams();
  const p = PRODUCTS[id];
  const { addItem } = useCart();
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [qty, setQty] = useState("");
  const [added, setAdded] = useState(false);

  function handleAddToCart() {
    if (!p) return;
    addItem({ id, icon: p.icon, name: p.name, price: p.price, moq: p.moq }, parseInt(qty) || 1, selectedOptions);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  function toggleOption(opt) {
    setSelectedOptions(prev => prev.includes(opt) ? prev.filter(o => o !== opt) : [...prev, opt]);
  }

  if (!p) return (
    <div className="font-['Sarabun'] py-24 text-center max-w-sm mx-auto px-4">
      <div className="text-6xl mb-4">🔍</div>
      <h1 className="text-xl font-bold text-gray-900 mb-2">ไม่พบสินค้าที่คุณต้องการ</h1>
      <p className="text-sm text-gray-500 mb-6">ลิงก์อาจไม่ถูกต้องหรือสินค้านี้ถูกยกเลิกชั่วคราว</p>
      <Link to="/products" className="bg-[#0D5C44] text-white px-6 py-2.5 rounded-full no-underline font-bold text-sm shadow">
        กลับไปหน้าสินค้าทั้งหมด
      </Link>
    </div>
  );

  return (
    <main className="font-['Sarabun'] bg-[#FAFAF8] min-h-screen text-left">
      {/* Breadcrumb Navigation */}
      <div className="bg-white border-b border-gray-100 py-3.5 px-6 md:px-12 text-xs text-gray-400 flex items-center gap-2">
        <Link to="/" className="text-gray-400 no-underline hover:text-[#0D5C44]">หน้าแรก</Link>
        <span>›</span>
        <Link to="/products" className="text-gray-400 no-underline hover:text-[#0D5C44]">สินค้า</Link>
        <span>›</span>
        <span className="text-gray-900 font-medium">{p.name}</span>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-10 items-start">
        {/* Left Column: Visual Area + Specs */}
        <div className="md:col-span-2">
          <div className="bg-gradient-to-br from-[#E1F5EE] to-[#9FE1CB] rounded-2xl h-72 md:h-96 flex items-center justify-center relative overflow-hidden mb-8 shadow-inner">
            <span className="text-8xl md:text-9xl filter drop-shadow-lg">{p.icon}</span>
            <span className="absolute top-4 left-4 bg-[#0D5C44] text-white text-xs font-bold px-4 py-1.5 rounded-full">{p.cat}</span>
          </div>

          {/* Specifications Table */}
          <div className="bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm">
            <div className="bg-gray-50/70 border-b border-gray-100 px-6 py-4">
              <h2 className="text-sm md:text-base font-bold text-gray-900 m-0">ข้อมูลทางเทคนิคและสเปคการผลิต</h2>
            </div>
            <div className="divide-y divide-gray-50">
              {p.specs.map((spec, i) => (
                <div key={i} className="flex px-6 py-3.5 text-xs md:text-sm">
                  <span className="text-gray-500 w-1/3 shrink-0">{spec.label}</span>
                  <span className="text-gray-900 font-semibold">{spec.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Order Panel Sticky */}
        <div className="md:sticky md:top-24 bg-white rounded-2xl border border-gray-100 p-6 shadow-md">
          <span className="text-xs font-bold text-[#1A8A6A] tracking-wider block mb-1 uppercase">{p.cat}</span>
          <h1 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">{p.name}</h1>
          <p className="text-xs md:text-sm text-gray-500 leading-relaxed mb-6">{p.desc}</p>

          {/* Quick Summary Badges */}
          <div className="grid grid-cols-3 gap-2.5 mb-6">
            {[
              { title: "ราคาเริ่มต้น", val: p.price, highlight: true },
              { title: "ขั้นต่ำ (MOQ)", val: p.moq },
              { title: "ระยะเวลาผลิต", val: p.lead },
            ].map((b, i) => (
              <div key={i} className="bg-gray-50 border border-gray-100 rounded-xl p-3 text-center">
                <div className="text-[10px] text-gray-400 mb-1">{b.title}</div>
                <div className={`text-xs font-bold ${b.highlight ? "text-[#0D5C44]" : "text-gray-800"}`}>{b.val}</div>
              </div>
            ))}
          </div>

          {/* Options Selectors */}
          <div className="mb-6">
            <div className="text-xs font-bold text-gray-700 mb-2.5">เลือกออปชัน / เทคนิคพิเศษ</div>
            <div className="flex flex-wrap gap-2">
              {p.options.map((opt) => {
                const isSelected = selectedOptions.includes(opt);
                return (
                  <button
                    key={opt}
                    onClick={() => toggleOption(opt)}
                    className={`text-xs px-3.5 py-1.5 rounded-full border transition-all ${
                      isSelected 
                        ? "border-[#0D5C44] bg-[#E1F5EE] text-[#085041] font-semibold" 
                        : "border-gray-200 bg-white text-gray-600 hover:border-gray-300"
                    }`}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Interactive Form Actions */}
          <div className="bg-gray-50 rounded-xl p-4 border border-gray-100 mb-4">
            <input type="text" placeholder="ชื่อลูกค้า / บริษัท" className="w-full text-xs border border-gray-200 rounded-lg p-2.5 mb-2 outline-none focus:border-[#0D5C44] transition-colors font-['Sarabun']" />
            <input type="tel" placeholder="เบอร์โทรศัพท์ติดต่อ" className="w-full text-xs border border-gray-200 rounded-lg p-2.5 mb-3 outline-none focus:border-[#0D5C44] transition-colors font-['Sarabun']" />
            <input 
              type="text" 
              placeholder={`ระบุจำนวน (ขั้นต่ำ ${p.moq})`} 
              value={qty}
              onChange={e => setQty(e.target.value)}
              className="w-full text-xs border border-gray-200 rounded-lg p-2.5 mb-4 outline-none focus:border-[#0D5C44] transition-colors font-['Sarabun'] font-semibold"
            />
            
            <div className="flex gap-2">
              <button 
                onClick={handleAddToCart}
                className={`flex-[2] py-3 rounded-xl text-xs font-bold text-white transition-colors ${added ? "bg-[#085041]" : "bg-[#0D5C44] hover:bg-[#0A3828]"}`}
              >
                {added ? "✅ เพิ่มลงตะกร้าแล้ว" : "🛒 เพิ่มลงตะกร้า"}
              </button>
              <Link to="/cart" className="flex-[1] text-center text-xs font-medium border border-gray-200 bg-white text-gray-700 py-3 rounded-xl no-underline hover:bg-gray-50 transition-colors flex items-center justify-center">
                ดูตะกร้า
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}