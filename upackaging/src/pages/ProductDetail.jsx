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
  "sticker-roll": {
    name: "สติ๊กเกอร์ม้วน", cat: "สติ๊กเกอร์", icon: "🏷️",
    price: "เริ่มต้น ฿0.50 / ดวง", moq: "1,000 ดวง", lead: "3–5 วันทำการ",
    desc: "สติ๊กเกอร์ม้วนพิมพ์ดิจิทัลความละเอียดสูง กันน้ำ ทนความร้อน เหมาะสำหรับฉลากสินค้า บาร์โค้ด และ label ทุกประเภท",
    specs: [
      { label: "วัสดุ", value: "กระดาษ / PVC / PET" },
      { label: "การพิมพ์", value: "Digital 4 สี" },
      { label: "กาว", value: "กาวถาวร / กาวถอดได้" },
      { label: "MOQ", value: "1,000 ดวง" },
      { label: "ระยะเวลาผลิต", value: "3–5 วันทำการ" },
    ],
    options: ["กระดาษ", "PVC กันน้ำ", "PET ทนร้อน", "กาวถาวร", "กาวถอดได้"],
    related: ["sticker-cut", "box-cosmetic", "bag-paper"],
  },
  "sticker-cut": {
    name: "สติ๊กเกอร์ตัดรูป", cat: "สติ๊กเกอร์", icon: "✂️",
    price: "เริ่มต้น ฿1.50 / ดวง", moq: "500 ดวง", lead: "5–7 วันทำการ",
    desc: "สติ๊กเกอร์ Die-cut ตัดตามรูปทรงที่กำหนด ทุกรูปทรงและขนาด พิมพ์ดิจิทัลสีสด เหมาะสำหรับงานโปรโมชั่น สินค้า และ branding",
    specs: [
      { label: "วัสดุ", value: "กระดาษ / PVC" },
      { label: "การพิมพ์", value: "Digital 4 สี" },
      { label: "การตัด", value: "Die-cut ตามแบบ" },
      { label: "MOQ", value: "500 ดวง" },
      { label: "ระยะเวลาผลิต", value: "5–7 วันทำการ" },
    ],
    options: ["กระดาษด้าน", "กระดาษมัน", "PVC ใส", "PVC ขาว"],
    related: ["sticker-roll", "bag-paper", "brochure-tri"],
  },
  "bag-paper": {
    name: "ถุงกระดาษหูเชือก", cat: "ถุงกระดาษ", icon: "🛍️",
    price: "เริ่มต้น ฿9 / ใบ", moq: "500 ใบ", lead: "7–10 วันทำการ",
    desc: "ถุงกระดาษ Kraft พิมพ์โลโก้สีสด หูเชือกฝ้ายหรือหูแบนแข็งแรง เหมาะสำหรับร้านค้า แบรนด์แฟชั่น และของขวัญพรีเมียม",
    specs: [
      { label: "วัสดุ", value: "กระดาษ Kraft / อาร์ต" },
      { label: "การพิมพ์", value: "4 สีออฟเซ็ท" },
      { label: "หูถุง", value: "เชือกฝ้าย / หูแบน" },
      { label: "MOQ", value: "500 ใบ" },
      { label: "ระยะเวลาผลิต", value: "7–10 วันทำการ" },
    ],
    options: ["กระดาษ Kraft", "กระดาษอาร์ต", "หูเชือกฝ้าย", "หูแบน"],
    related: ["bag-duplex", "box-cosmetic", "sticker-roll"],
  },
  "bag-duplex": {
    name: "ถุงกระดาษ Duplex", cat: "ถุงกระดาษ", icon: "🧴",
    price: "เริ่มต้น ฿14 / ใบ", moq: "500 ใบ", lead: "10–14 วันทำการ",
    desc: "ถุงกระดาษ Duplex ผิวเคลือบ PP ด้านหรือมัน ดูพรีเมียม หรูหรา เหมาะสำหรับแบรนด์สกินแคร์ เครื่องสำอาง และสินค้า luxury",
    specs: [
      { label: "วัสดุ", value: "กระดาษ Duplex 350 แกรม" },
      { label: "การพิมพ์", value: "4 สีออฟเซ็ท" },
      { label: "เคลือบผิว", value: "PP ด้าน / PP มัน" },
      { label: "MOQ", value: "500 ใบ" },
      { label: "ระยะเวลาผลิต", value: "10–14 วันทำการ" },
    ],
    options: ["เคลือบ PP ด้าน", "เคลือบ PP มัน", "ฟอยล์ทอง", "ริบบิ้น"],
    related: ["bag-paper", "box-cosmetic", "sticker-cut"],
  },
  "brochure-tri": {
    name: "แผ่นพับ 3 ตอน", cat: "แผ่นพับ", icon: "📄",
    price: "เริ่มต้น ฿4 / แผ่น", moq: "500 แผ่น", lead: "3–5 วันทำการ",
    desc: "แผ่นพับ A4 พับ 3 ตอน พิมพ์ 4 สีออฟเซ็ท บนกระดาษอาร์ตมันหรืออาร์ตด้าน เหมาะสำหรับ brochure บริษัท เมนูอาหาร และสื่อโปรโมต",
    specs: [
      { label: "วัสดุ", value: "อาร์ตมัน / อาร์ตด้าน 150 แกรม" },
      { label: "การพิมพ์", value: "4 สีออฟเซ็ท 2 หน้า" },
      { label: "ขนาด", value: "A4 พับ 3 / DL / กำหนดเอง" },
      { label: "MOQ", value: "500 แผ่น" },
      { label: "ระยะเวลาผลิต", value: "3–5 วันทำการ" },
    ],
    options: ["อาร์ตมัน", "อาร์ตด้าน", "เคลือบ UV", "ไม่เคลือบ"],
    related: ["catalog", "sticker-roll", "box-cosmetic"],
  },
  "catalog": {
    name: "แค็ตตาล็อกสินค้า", cat: "แผ่นพับ", icon: "📒",
    price: "เริ่มต้น ฿35 / เล่ม", moq: "200 เล่ม", lead: "7–10 วันทำการ",
    desc: "แค็ตตาล็อกเข้าเล่มไสกาว หรือเย็บมุมลวด พิมพ์ 4 สีทั้งเล่ม ปกแข็งหรือปกอ่อน เหมาะสำหรับนำเสนอสินค้าและบริการอย่างมืออาชีพ",
    specs: [
      { label: "วัสดุเนื้อใน", value: "อาร์ตมัน 130 แกรม" },
      { label: "วัสดุปก", value: "อาร์ตการ์ด 250 แกรม" },
      { label: "การเข้าเล่ม", value: "ไสกาว / เย็บมุมลวด" },
      { label: "MOQ", value: "200 เล่ม" },
      { label: "ระยะเวลาผลิต", value: "7–10 วันทำการ" },
    ],
    options: ["ไสกาว", "เย็บมุมลวด", "ปกเคลือบ UV", "ปกเคลือบ PP"],
    related: ["brochure-tri", "box-cosmetic", "sticker-roll"],
  },
};

const ALL_PRODUCTS = {
  "box-food":     { name:"กล่องอาหาร",        icon:"🍱" },
  "box-shipping": { name:"กล่องไปรษณีย์",     icon:"📫" },
  "sticker-roll": { name:"สติ๊กเกอร์ม้วน",   icon:"🏷️" },
  "bag-paper":    { name:"ถุงกระดาษหูเชือก",  icon:"🛍️" },
  "brochure-tri": { name:"แผ่นพับ 3 ตอน",     icon:"📄" },
  ...PRODUCTS,
};

const highlights = [
  { icon: "⏱️", text: "ส่งใบเสนอราคาใน 1 ชั่วโมง" },
  { icon: "✅", text: "ส่ง proof ก่อนพิมพ์จริง" },
  { icon: "🌿", text: "วัสดุ Eco-Friendly" },
];

export default function ProductDetail() {
  const { id } = useParams();
  const p = PRODUCTS[id];
  const { addItem } = useCart();
  const navigate = useNavigate();
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [qty, setQty] = useState("");
  const [added, setAdded] = useState(false);

  function handleAddToCart() {
    addItem(
      { id, icon: p.icon, name: p.name, price: p.price, moq: p.moq },
      parseInt(qty) || 1,
      selectedOptions
    );
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  function toggleOption(opt) {
    setSelectedOptions(prev =>
      prev.includes(opt) ? prev.filter(o => o !== opt) : [...prev, opt]
    );
  }

  if (!p) return (
    <main style={{ fontFamily: "'Sarabun',sans-serif", padding: "80px 48px", textAlign: "center" }}>
      <div style={{ fontSize: 64, marginBottom: 16 }}>🔍</div>
      <h1 style={{ fontSize: 22, fontWeight: 700, color: "#1a1a1a", marginBottom: 8 }}>ไม่พบสินค้านี้</h1>
      <p style={{ color: "#6b7280", marginBottom: 24 }}>อาจถูกลบหรือ URL ไม่ถูกต้อง</p>
      <Link to="/products" style={{ background: "#1D9E75", color: "#fff", padding: "12px 28px", borderRadius: 28, textDecoration: "none", fontWeight: 700, fontSize: 14 }}>
        กลับหน้าสินค้า
      </Link>
    </main>
  );

  return (
    <main style={{ fontFamily: "'Sarabun',sans-serif", background: "#FAFAF8", minHeight: "100vh" }}>

      {/* Breadcrumb */}
      <div style={{ padding: "14px 48px", background: "#fff", borderBottom: "1px solid #f0f0ee", fontSize: 13, color: "#9ca3af", display: "flex", alignItems: "center", gap: 6 }}>
        <Link to="/" style={{ color: "#9ca3af", textDecoration: "none" }}>หน้าแรก</Link>
        <span>›</span>
        <Link to="/products" style={{ color: "#9ca3af", textDecoration: "none" }}>สินค้า</Link>
        <span>›</span>
        <span style={{ color: "#1a1a1a", fontWeight: 500 }}>{p.name}</span>
      </div>

      <div style={{ padding: "40px 48px", display: "grid", gridTemplateColumns: "1fr 420px", gap: 48, alignItems: "start", maxWidth: 1200, margin: "0 auto" }}>

        {/* Left */}
        <div>
          {/* Product Visual */}
          <div style={{
            background: "linear-gradient(135deg, #E1F5EE 0%, #9FE1CB 100%)",
            borderRadius: 24,
            height: 340,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 32,
            position: "relative",
            overflow: "hidden",
          }}>
            <div style={{ position: "absolute", top: -30, right: -30, width: 140, height: 140, borderRadius: "50%", background: "rgba(255,255,255,0.3)" }} />
            <div style={{ position: "absolute", bottom: -20, left: -20, width: 100, height: 100, borderRadius: "50%", background: "rgba(255,255,255,0.2)" }} />
            <span style={{ fontSize: 110, position: "relative" }}>{p.icon}</span>
            <span style={{
              position: "absolute", top: 16, left: 16,
              background: "#1D9E75", color: "#fff",
              fontSize: 12, padding: "5px 14px", borderRadius: 20, fontWeight: 600,
            }}>{p.cat}</span>
          </div>

          {/* Specs */}
          <div style={{ background: "#fff", borderRadius: 16, border: "1px solid #e5e7eb", overflow: "hidden" }}>
            <div style={{ padding: "16px 24px", background: "#F9F9F7", borderBottom: "1px solid #e5e7eb" }}>
              <h2 style={{ fontSize: 15, fontWeight: 700, color: "#1a1a1a", margin: 0 }}>ข้อมูลจำเพาะ</h2>
            </div>
            <div style={{ padding: "8px 0" }}>
              {p.specs.map(({ label, value }, i) => (
                <div key={label} style={{
                  display: "flex",
                  alignItems: "center",
                  padding: "12px 24px",
                  background: i % 2 === 0 ? "#fff" : "#FAFAF8",
                }}>
                  <span style={{ fontSize: 13, color: "#6b7280", width: "40%", flexShrink: 0 }}>{label}</span>
                  <span style={{ fontSize: 13, color: "#1a1a1a", fontWeight: 600 }}>{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right */}
        <div style={{ position: "sticky", top: 20 }}>
          <div style={{ fontSize: 12, color: "#1D9E75", fontWeight: 600, marginBottom: 6, letterSpacing: "0.5px" }}>{p.cat}</div>
          <h1 style={{ fontSize: 28, fontWeight: 700, color: "#1a1a1a", marginBottom: 10, lineHeight: 1.3 }}>{p.name}</h1>
          <p style={{ fontSize: 14, color: "#6b7280", lineHeight: 1.85, marginBottom: 24 }}>{p.desc}</p>

          {/* Key Metrics */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, marginBottom: 24 }}>
            {[
              { label: "ราคาเริ่มต้น", value: p.price, color: "#1D9E75" },
              { label: "MOQ", value: p.moq, color: "#1a1a1a" },
              { label: "ระยะเวลา", value: p.lead, color: "#1a1a1a" },
            ].map(({ label, value, color }) => (
              <div key={label} style={{ background: "#F9F9F7", borderRadius: 12, padding: "14px 12px", textAlign: "center", border: "1px solid #e5e7eb" }}>
                <div style={{ fontSize: 10, color: "#9ca3af", marginBottom: 4 }}>{label}</div>
                <div style={{ fontSize: 13, fontWeight: 700, color }}>{value}</div>
              </div>
            ))}
          </div>

          {/* Options */}
          <div style={{ marginBottom: 24 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 10 }}>ตัวเลือก / ฟินิช</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {p.options.map(opt => (
                <button key={opt} onClick={() => toggleOption(opt)} style={{
                  padding: "7px 16px",
                  borderRadius: 20,
                  fontSize: 12,
                  fontWeight: 500,
                  border: "2px solid",
                  borderColor: selectedOptions.includes(opt) ? "#1D9E75" : "#e5e7eb",
                  background: selectedOptions.includes(opt) ? "#E1F5EE" : "#fff",
                  color: selectedOptions.includes(opt) ? "#085041" : "#374151",
                  cursor: "pointer",
                  transition: "all .15s",
                  fontFamily: "'Sarabun',sans-serif",
                }}>{opt}</button>
              ))}
            </div>
          </div>

          {/* Order Form */}
          <div style={{ background: "#fff", borderRadius: 16, padding: 20, border: "1px solid #e5e7eb", marginBottom: 16 }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: "#1a1a1a", marginBottom: 14 }}>สั่งซื้อ / ขอใบเสนอราคา</div>
            {[
              { placeholder: "ชื่อ - บริษัท", type: "text" },
              { placeholder: "เบอร์โทรติดต่อ", type: "tel" },
            ].map((inp) => (
              <input key={inp.placeholder} type={inp.type} placeholder={inp.placeholder} style={{
                display: "block", width: "100%",
                border: "1px solid #e5e7eb", borderRadius: 10,
                padding: "11px 14px", fontSize: 14, marginBottom: 10,
                outline: "none", boxSizing: "border-box",
                fontFamily: "'Sarabun',sans-serif", color: "#1a1a1a",
              }} />
            ))}
            <input
              type="text"
              placeholder={`จำนวน (MOQ: ${p.moq})`}
              value={qty}
              onChange={e => setQty(e.target.value)}
              style={{
                display: "block", width: "100%",
                border: "1px solid #e5e7eb", borderRadius: 10,
                padding: "11px 14px", fontSize: 14, marginBottom: 14,
                outline: "none", boxSizing: "border-box",
                fontFamily: "'Sarabun',sans-serif", color: "#1a1a1a",
              }}
            />
            <div style={{ display: "flex", gap: 10 }}>
              <button onClick={handleAddToCart} style={{
                flex: 2,
                background: added ? "#085041" : "#1D9E75",
                color: "#fff", border: "none", padding: "13px",
                borderRadius: 12, fontSize: 14, fontWeight: 700,
                cursor: "pointer", fontFamily: "'Sarabun',sans-serif",
                transition: "background .2s",
              }}>
                {added ? "✅ เพิ่มแล้ว!" : "🛒 เพิ่มลงตะกร้า"}
              </button>
              <Link to="/cart" style={{
                flex: 1, textAlign: "center",
                background: "#F9F9F7", color: "#374151",
                border: "1px solid #e5e7eb", padding: "13px",
                borderRadius: 12, fontSize: 13, fontWeight: 500,
                textDecoration: "none", display: "flex",
                alignItems: "center", justifyContent: "center",
              }}>ดูตะกร้า</Link>
            </div>
          </div>

          {/* Trust Signals */}
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {highlights.map(({ icon, text }) => (
              <div key={text} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 13, color: "#374151" }}>
                <span style={{ fontSize: 16 }}>{icon}</span> {text}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Related Products */}
      <section style={{ padding: "0 48px 56px", maxWidth: 1200, margin: "0 auto" }}>
        <h2 style={{ fontSize: 18, fontWeight: 700, color: "#1a1a1a", marginBottom: 20 }}>สินค้าที่เกี่ยวข้อง</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
          {p.related.map(rid => {
            const r = PRODUCTS[rid] || ALL_PRODUCTS[rid];
            if (!r) return null;
            return (
              <Link to={`/products/${rid}`} key={rid} style={{ textDecoration: "none" }}>
                <div style={{
                  background: "#fff", border: "1px solid #e5e7eb",
                  borderRadius: 16, overflow: "hidden",
                  transition: "all .2s",
                  display: "flex", alignItems: "center", gap: 14, padding: 16,
                }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = "#1D9E75"; e.currentTarget.style.boxShadow = "0 4px 16px rgba(29,158,117,0.12)"; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = "#e5e7eb"; e.currentTarget.style.boxShadow = "none"; }}
                >
                  <div style={{ width: 52, height: 52, background: "#E1F5EE", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, flexShrink: 0 }}>
                    {r.icon}
                  </div>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: "#1a1a1a" }}>{r.name}</div>
                    <div style={{ fontSize: 12, color: "#1D9E75", marginTop: 2 }}>ดูรายละเอียด →</div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </main>
  );
}