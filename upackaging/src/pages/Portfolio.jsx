import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";

const categories = ["ทั้งหมด", "กล่องบรรจุภัณฑ์", "เมทัลลิค (ฟอยล์)", "ออฟเซ็ทประกบลูกฟูก", "กล่องลูกฟูก", "สติ๊กเกอร์ม้วน/แผ่น", "ฉลากสินค้า", "ถุงกระดาษ", "แผ่นพับ/โบรชัวร์", "Hangtag", "Blister", "แค็ตตาล็อก","ปฏิทินและอื่นๆ"];

const works = [
  // กล่องบรรจุภัณฑ์
  { id: 1,  cat: "กล่องบรรจุภัณฑ์",      icon: "📦", bg: "#1D9E75", name: "กล่องเครื่องสำอาง แบรนด์ A",       client: "แบรนด์ความงาม",        detail: "กล่องพิมพ์ 4 สี เคลือบ UV ทั้งใบ" },
  { id: 4,  cat: "กล่องบรรจุภัณฑ์",      icon: "🍱", bg: "#0F6E56", name: "กล่องอาหาร Food Grade",             client: "ร้านอาหาร",             detail: "กระดาษ food grade พิมพ์โลโก้" },
  // เมทัลลิค (ฟอยล์)
  { id: 10, cat: "เมทัลลิค (ฟอยล์)",     icon: "✨", bg: "#B8860B", name: "กล่องเมทัลลิคฟอยล์ทอง แบรนด์ G",   client: "แบรนด์เครื่องประดับ",  detail: "ฟอยล์ทอง + ปั๊มนูน บนอาร์ตการ์ด 350 แกรม" },
  // ออฟเซ็ทประกบลูกฟูก
  { id: 11, cat: "ออฟเซ็ทประกบลูกฟูก",   icon: "🧱", bg: "#3A86C8", name: "กล่องออฟเซ็ทประกบลูกฟูก แบรนด์ H", client: "โรงงานอิเล็กทรอนิกส์", detail: "พิมพ์ออฟเซ็ท 4 สี ประกบลูกฟูก 5 ชั้น" },
  // กล่องลูกฟูก
  { id: 8,  cat: "กล่องลูกฟูก",          icon: "📫", bg: "#085041", name: "กล่องไปรษณีย์ e-Commerce",          client: "ร้านค้าออนไลน์",       detail: "ลูกฟูก 3 ชั้น พิมพ์โลโก้" },
  // สติ๊กเกอร์ม้วน/แผ่น
  { id: 6,  cat: "สติ๊กเกอร์ม้วน/แผ่น", icon: "✂️", bg: "#E07A5F", name: "สติ๊กเกอร์ Die-cut แบรนด์ E",       client: "FMCG",                  detail: "ตัดรูปทรงพิเศษ พิมพ์ดิจิทัล" },
  // ฉลากสินค้า
  { id: 3,  cat: "ฉลากสินค้า",           icon: "🏷️", bg: "#5DCAA5", name: "ฉลากสินค้าอาหาร แบรนด์ C",         client: "โรงงานอาหาร",          detail: "สติ๊กเกอร์ม้วน กันน้ำ 100%" },
  { id: 12, cat: "ฉลากสินค้า",           icon: "🥛", bg: "#8338EC", name: "ฉลากสลีปกล่องเครื่องดื่ม แบรนด์ I", client: "โรงงานเครื่องดื่ม",   detail: "สติ๊กเกอร์สลีป PP กันน้ำ คมชัดสูง" },
  // ถุงกระดาษ
  { id: 2,  cat: "ถุงกระดาษ",            icon: "🛍️", bg: "#085041", name: "ถุงกระดาษ Luxury แบรนด์ B",         client: "แบรนด์แฟชั่น",        detail: "กระดาษ kraft พิมพ์ foil ทอง" },
  { id: 7,  cat: "ถุงกระดาษ",            icon: "🧴", bg: "#1D9E75", name: "ถุงกระดาษ Duplex แบรนด์ F",         client: "แบรนด์สกินแคร์",      detail: "เคลือบ PP ด้าน มีริบบิ้น" },
  // แผ่นพับ/โบรชัวร์
  { id: 13, cat: "แผ่นพับ/โบรชัวร์",    icon: "📄", bg: "#FB5607", name: "โบรชัวร์เมนูร้านอาหาร แบรนด์ J",    client: "เชนร้านอาหาร",        detail: "พับ 3 ตอน อาร์ตการ์ด 150 แกรม 4 สี" },
  // Hangtag
  { id: 9,  cat: "Hangtag",              icon: "📒", bg: "#5DCAA5", name: "Hangtag แบรนด์เสื้อผ้า",            client: "แบรนด์เสื้อผ้า",      detail: "อาร์ตการ์ด 350 แกรม เจาะรู" },
  // Blister
  { id: 14, cat: "Blister",              icon: "💳", bg: "#FFB703", name: "Blister Card แบรนด์ K",             client: "บริษัทยา",             detail: "การ์ดรองบลิสเตอร์ พิมพ์ 4 สี" },
  // แค็ตตาล็อก
  { id: 5,  cat: "แค็ตตาล็อก",          icon: "📄", bg: "#9FE1CB", name: "แค็ตตาล็อก แบรนด์ D",               client: "บริษัทนำเข้า",        detail: "เข้าเล่มไสกาว 24 หน้า 4 สี" },
 // ปฏิทินและอื่นๆ
  { id: 15, cat: "ปฏิทินและอื่นๆ",      icon: "📅", bg: "#0F6E56", name: "ปฏิทินตั้งโต๊ะ แบรนด์ L",            client: "บริษัทโฆษณา",         detail: "ปฏิทินตั้งโต๊ะ พิมพ์ 4 สี เข้าเล่ม" },

];

export default function Portfolio() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [active, setActive] = useState(() => {
    const cat = searchParams.get("cat");
    return categories.includes(cat) ? cat : "ทั้งหมด";
  });

  // sync active filter กับ URL เมื่อผู้ใช้กด filter เอง
  function handleFilter(cat) {
    setActive(cat);
    if (cat === "ทั้งหมด") {
      setSearchParams({});
    } else {
      setSearchParams({ cat });
    }
  }

  // ถ้า URL เปลี่ยน (เช่น กด back/forward) ให้ sync กลับ
  useEffect(() => {
    const cat = searchParams.get("cat");
    setActive(categories.includes(cat) ? cat : "ทั้งหมด");
  }, [searchParams]);

  const filtered = active === "ทั้งหมด"
    ? works
    : works.filter(w => w.cat === active);

  return (
    <main style={{ fontFamily: "'Sarabun', sans-serif" }}>

      {/* Hero banner */}
      <section style={{
        background: "linear-gradient(135deg, #053D31 0%, #1D9E75 100%)",
        padding: "48px 40px", textAlign: "center",
      }}>
        <h1 style={{ color: "#fff", fontSize: "28px", fontWeight: 600, marginBottom: "8px" }}>ผลงานของเรา</h1>
        <p style={{ color: "rgba(255,255,255,0.75)", fontSize: "14px" }}>
          ตัวอย่างงานพิมพ์และบรรจุภัณฑ์ที่เราภูมิใจส่งมอบให้ลูกค้า
        </p>
      </section>

      <section style={{ padding: "40px" }}>

        {/* Filter */}
        <div style={{ display: "flex", gap: "8px", marginBottom: "28px", flexWrap: "wrap" }}>
          {categories.map(cat => (
            <button key={cat} onClick={() => handleFilter(cat)} style={{
              padding: "8px 20px", borderRadius: "20px", fontSize: "13px", fontWeight: 500,
              border: "1.5px solid",
              borderColor: active === cat ? "#1D9E75" : "#e5e7eb",
              background: active === cat ? "#1D9E75" : "#fff",
              color: active === cat ? "#fff" : "#374151",
              cursor: "pointer", transition: "all .15s",
            }}>{cat}</button>
          ))}
        </div>

        {/* Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "18px" }}>
          {filtered.map(({ id, icon, bg, name, client, detail }) => (
            <div key={id} style={{
              borderRadius: "14px", overflow: "hidden",
              border: "1px solid #e5e7eb",
              transition: "box-shadow .2s, transform .2s",
            }}
              onMouseEnter={e => { e.currentTarget.style.boxShadow = "0 8px 24px rgba(29,158,117,0.15)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
              onMouseLeave={e => { e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.transform = "translateY(0)"; }}
            >
              {/* ภาพ — ใส่ <img> จริงแทน div นี้ได้เลย */}
              <div style={{ background: bg, height: "140px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ fontSize: "52px" }}>{icon}</span>
              </div>
              <div style={{ background: "#fff", padding: "14px 16px" }}>
                <div style={{ fontSize: "14px", fontWeight: 600, color: "#1a1a1a", marginBottom: "2px" }}>{name}</div>
                <div style={{ fontSize: "11px", color: "#9ca3af", marginBottom: "6px" }}>ลูกค้า: {client}</div>
                <div style={{ fontSize: "12px", color: "#6b7280" }}>{detail}</div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div style={{
          marginTop: "48px", background: "#E1F5EE",
          borderRadius: "16px", padding: "32px",
          textAlign: "center",
        }}>
          <h2 style={{ fontSize: "20px", fontWeight: 600, color: "#085041", marginBottom: "8px" }}>
            อยากได้งานแบบนี้บ้าง?
          </h2>
          <p style={{ color: "#374151", fontSize: "14px", marginBottom: "20px" }}>
            ติดต่อเราเพื่อขอใบเสนอราคา หรือส่งตัวอย่างงานที่ต้องการ
          </p>
          <Link to="/contact" style={{
            display: "inline-block", background: "#1D9E75", color: "#fff",
            padding: "12px 32px", borderRadius: "28px",
            fontSize: "14px", fontWeight: 600, textDecoration: "none",
          }}>ติดต่อเราเลย →</Link>
        </div>

      </section>
    </main>
  );
}