import { useState } from "react";
import { Link } from "react-router-dom";

const categories = ["ทั้งหมด", "กล่อง", "สติ๊กเกอร์", "ถุงกระดาษ", "แผ่นพับ"];

const products = [
  { id: "box-cosmetic",   cat: "กล่อง",      icon: "📦", name: "กล่องเครื่องสำอาง",    desc: "กล่องพิมพ์ 4 สี เคลือบ UV ได้", moq: "500 ใบ", price: "เริ่มต้น ฿8/ใบ"  },
  { id: "box-food",       cat: "กล่อง",      icon: "🍱", name: "กล่องอาหาร",           desc: "กระดาษ food grade ปลอดภัย",    moq: "1,000 ใบ", price: "เริ่มต้น ฿5/ใบ" },
  { id: "box-shipping",   cat: "กล่อง",      icon: "📫", name: "กล่องไปรษณีย์",        desc: "ลูกฟูก 3/5 ชั้น แข็งแรง",      moq: "200 ใบ", price: "เริ่มต้น ฿12/ใบ" },
  { id: "sticker-roll",   cat: "สติ๊กเกอร์", icon: "🏷️", name: "สติ๊กเกอร์ม้วน",      desc: "พิมพ์ดิจิทัล ทนน้ำ ทนความร้อน", moq: "1,000 ดวง", price: "เริ่มต้น ฿0.5/ดวง" },
  { id: "sticker-cut",    cat: "สติ๊กเกอร์", icon: "✂️", name: "สติ๊กเกอร์ตัดรูป",    desc: "ตัดตามแบบ Die-cut ทุกรูปทรง",  moq: "500 ดวง", price: "เริ่มต้น ฿1.5/ดวง" },
  { id: "bag-paper",      cat: "ถุงกระดาษ",  icon: "🛍️", name: "ถุงกระดาษหูเชือก",    desc: "กระดาษ kraft พิมพ์โลโก้",      moq: "500 ใบ", price: "เริ่มต้น ฿9/ใบ"  },
  { id: "bag-duplex",     cat: "ถุงกระดาษ",  icon: "🧴", name: "ถุงกระดาษ Duplex",    desc: "ผิวมันเคลือบ PP ดูพรีเมียม",   moq: "500 ใบ", price: "เริ่มต้น ฿14/ใบ" },
  { id: "brochure-tri",   cat: "แผ่นพับ",    icon: "📄", name: "แผ่นพับ 3 ตอน",       desc: "A4 พับ 3 พิมพ์ 4 สี เคลือบ",   moq: "500 แผ่น", price: "เริ่มต้น ฿4/แผ่น" },
  { id: "catalog",        cat: "แผ่นพับ",    icon: "📒", name: "แค็ตตาล็อกสินค้า",    desc: "เข้าเล่มไสกาว พิมพ์สีครบ",    moq: "200 เล่ม", price: "เริ่มต้น ฿35/เล่ม" },
];

export default function Products() {
  const [active, setActive] = useState("ทั้งหมด");

  const filtered = active === "ทั้งหมด"
    ? products
    : products.filter(p => p.cat === active);

  return (
    <main style={{ fontFamily: "'Sarabun', sans-serif", padding: "40px" }}>

      {/* Header */}
      <div style={{ marginBottom: "32px" }}>
        <h1 style={{ fontSize: "26px", fontWeight: 600, color: "#1a1a1a", marginBottom: "6px" }}>สินค้าและบริการ</h1>
        <p style={{ color: "#6b7280", fontSize: "14px" }}>เลือกประเภทสินค้าที่ต้องการ หรือขอใบเสนอราคาได้เลย</p>
      </div>

      {/* Category filter */}
      <div style={{ display: "flex", gap: "8px", marginBottom: "28px", flexWrap: "wrap" }}>
        {categories.map(cat => (
          <button key={cat} onClick={() => setActive(cat)} style={{
            padding: "8px 20px", borderRadius: "20px", fontSize: "13px", fontWeight: 500,
            border: "1.5px solid",
            borderColor: active === cat ? "#1D9E75" : "#e5e7eb",
            background: active === cat ? "#1D9E75" : "#fff",
            color: active === cat ? "#fff" : "#374151",
            cursor: "pointer", transition: "all .15s",
          }}>
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "18px" }}>
        {filtered.map(({ id, icon, name, desc, moq, price }) => (
          <div key={id} style={{
            background: "#fff", border: "1px solid #e5e7eb",
            borderRadius: "14px", overflow: "hidden",
            transition: "box-shadow .2s, transform .2s",
          }}
            onMouseEnter={e => { e.currentTarget.style.boxShadow = "0 8px 24px rgba(29,158,117,0.12)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
            onMouseLeave={e => { e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.transform = "translateY(0)"; }}
          >
            <div style={{ background: "#E1F5EE", height: "90px", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ fontSize: "42px" }}>{icon}</span>
            </div>
            <div style={{ padding: "16px" }}>
              <div style={{ fontSize: "15px", fontWeight: 600, color: "#1a1a1a", marginBottom: "4px" }}>{name}</div>
              <div style={{ fontSize: "12px", color: "#6b7280", lineHeight: 1.6, marginBottom: "12px" }}>{desc}</div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                <span style={{ fontSize: "11px", color: "#9ca3af" }}>MOQ: {moq}</span>
                <span style={{ fontSize: "13px", fontWeight: 600, color: "#1D9E75" }}>{price}</span>
              </div>
              <div style={{ display: "flex", gap: "8px" }}>
                <Link to={`/products/${id}`} style={{
                  flex: 1, textAlign: "center", background: "#1D9E75", color: "#fff",
                  padding: "8px", borderRadius: "8px", fontSize: "12px",
                  fontWeight: 500, textDecoration: "none",
                }}>ดูรายละเอียด</Link>
                <Link to="/contact" style={{
                  flex: 1, textAlign: "center", background: "#E1F5EE", color: "#085041",
                  padding: "8px", borderRadius: "8px", fontSize: "12px",
                  fontWeight: 500, textDecoration: "none",
                }}>ขอ Quote</Link>
              </div>
            </div>
          </div>
        ))}
      </div>

    </main>
  );
}