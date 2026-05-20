import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";

const slugToCat = {
  "กล่องบรรจุภัณฑ์":    "กล่อง",
  "เมทัลลิค":           "เมทัลลิค",
  "ออฟเซ็ทประกบลูกฟูก": "ออฟเซ็ทประกบลูกฟูก",
  "กล่องลูกฟูก":        "กล่องลูกฟูก",
  "สติ๊กเกอร์":         "สติ๊กเกอร์",
  "ฉลากสินค้า":         "ฉลากสินค้า",
  "Hangtag":            "Hangtag",
  "แผ่นพับ":            "แผ่นพับ",
  "Blister":            "Blister",
  "แค็ตตาล็อก":         "แผ่นพับ",
  "ถุงกระดาษ":          "ถุงกระดาษ",
  "ปฏิทิน":             "ปฏิทิน",
};

const filterTabs = [
  "ทั้งหมด", "กล่อง", "เมทัลลิค", "ออฟเซ็ทประกบลูกฟูก", "กล่องลูกฟูก",
  "สติ๊กเกอร์", "ฉลากสินค้า", "Hangtag", "แผ่นพับ", "Blister",
  "ถุงกระดาษ", "ปฏิทิน",
];

const catColors = {
  "กล่อง": "#1D9E75", "เมทัลลิค": "#B8860B", "ออฟเซ็ทประกบลูกฟูก": "#0F6E56",
  "กล่องลูกฟูก": "#5DCAA5", "สติ๊กเกอร์": "#E07A5F", "ฉลากสินค้า": "#3D405B",
  "Hangtag": "#9FE1CB", "แผ่นพับ": "#085041", "Blister": "#6B7280",
  "ถุงกระดาษ": "#1D9E75", "ปฏิทิน": "#374151",
};

const products = [
  { id:"box-cosmetic",  cat:"กล่อง",            icon:"📦", name:"กล่องเครื่องสำอาง",    desc:"กล่องพิมพ์ 4 สี เคลือบ UV ได้",       moq:"500 ใบ",    price:"เริ่มต้น ฿8/ใบ"     },
  { id:"box-food",      cat:"กล่อง",            icon:"🍱", name:"กล่องอาหาร",           desc:"กระดาษ food grade ปลอดภัย",           moq:"1,000 ใบ",  price:"เริ่มต้น ฿5/ใบ"    },
  { id:"box-shipping",  cat:"กล่อง",            icon:"📫", name:"กล่องไปรษณีย์",        desc:"ลูกฟูก 3/5 ชั้น แข็งแรง",             moq:"200 ใบ",    price:"เริ่มต้น ฿12/ใบ"   },
  { id:"metallic-box",  cat:"เมทัลลิค",         icon:"✨", name:"กล่องเมทัลลิค ฟอยล์",  desc:"ผิวฟอยล์สีทอง/เงิน พิมพ์ 4 สี",      moq:"500 ใบ",    price:"ขอ Quote"           },
  { id:"offset-corrugated", cat:"ออฟเซ็ทประกบลูกฟูก", icon:"🗂️", name:"ออฟเซ็ทประกบลูกฟูก", desc:"พิมพ์ออฟเซ็ทประกบกระดาษลูกฟูก",  moq:"500 ใบ",    price:"ขอ Quote"           },
  { id:"corrugated",    cat:"กล่องลูกฟูก",      icon:"📮", name:"กล่องลูกฟูก",          desc:"3/5 ชั้น แข็งแรง เหมาะ shipping",     moq:"200 ใบ",    price:"เริ่มต้น ฿15/ใบ"   },
  { id:"sticker-roll",  cat:"สติ๊กเกอร์",       icon:"🏷️", name:"สติ๊กเกอร์ม้วน",      desc:"พิมพ์ดิจิทัล ทนน้ำ ทนความร้อน",      moq:"1,000 ดวง", price:"เริ่มต้น ฿0.5/ดวง" },
  { id:"sticker-cut",   cat:"สติ๊กเกอร์",       icon:"✂️", name:"สติ๊กเกอร์ตัดรูป",    desc:"ตัดตามแบบ Die-cut ทุกรูปทรง",         moq:"500 ดวง",   price:"เริ่มต้น ฿1.5/ดวง" },
  { id:"label",         cat:"ฉลากสินค้า",       icon:"🔖", name:"ฉลากสินค้า",           desc:"พิมพ์บาร์โค้ด โลโก้ ข้อมูลสินค้า",   moq:"1,000 ดวง", price:"ขอ Quote"           },
  { id:"hangtag",       cat:"Hangtag",          icon:"🪧", name:"Hangtag",              desc:"อาร์ตการ์ด 350 แกรม เจาะรู ห้อยเชือก", moq:"500 ชิ้น",  price:"ขอ Quote"           },
  { id:"brochure-tri",  cat:"แผ่นพับ",          icon:"📄", name:"แผ่นพับ 3 ตอน",       desc:"A4 พับ 3 พิมพ์ 4 สี เคลือบ",          moq:"500 แผ่น",  price:"เริ่มต้น ฿4/แผ่น"  },
  { id:"catalog",       cat:"แผ่นพับ",          icon:"📒", name:"แค็ตตาล็อกสินค้า",    desc:"เข้าเล่มไสกาว พิมพ์สีครบ",            moq:"200 เล่ม",  price:"เริ่มต้น ฿35/เล่ม" },
  { id:"blister",       cat:"Blister",          icon:"💊", name:"Blister Card & Screen pack", desc:"บรรจุภัณฑ์พลาสติกใสติดแผ่นพิมพ์",moq:"500 ชิ้น",  price:"ขอ Quote"           },
  { id:"bag-paper",     cat:"ถุงกระดาษ",        icon:"🛍️", name:"ถุงกระดาษหูเชือก",    desc:"กระดาษ kraft พิมพ์โลโก้",             moq:"500 ใบ",    price:"เริ่มต้น ฿9/ใบ"   },
  { id:"bag-duplex",    cat:"ถุงกระดาษ",        icon:"🧴", name:"ถุงกระดาษ Duplex",    desc:"ผิวมันเคลือบ PP ดูพรีเมียม",           moq:"500 ใบ",    price:"เริ่มต้น ฿14/ใบ"  },
  { id:"calendar",      cat:"ปฏิทิน",           icon:"📅", name:"ปฏิทินและอื่นๆ",       desc:"ปฏิทินตั้งโต๊ะ แขวนผนัง พิมพ์โลโก้", moq:"100 เล่ม",  price:"ขอ Quote"           },
];

export default function Products() {
  const [searchParams] = useSearchParams();
  const slugFromUrl = searchParams.get("cat");
  const initialCat = slugFromUrl ? (slugToCat[slugFromUrl] ?? "ทั้งหมด") : "ทั้งหมด";
  const [active, setActive] = useState(initialCat);
  const [hoveredId, setHoveredId] = useState(null);

  useEffect(() => {
    const cat = slugFromUrl ? (slugToCat[slugFromUrl] ?? "ทั้งหมด") : "ทั้งหมด";
    setActive(cat);
  }, [slugFromUrl]);

  const filtered = active === "ทั้งหมด" ? products : products.filter(p => p.cat === active);

  return (
    <main style={{ fontFamily: "'Sarabun', sans-serif", background: "#FAFAF8", minHeight: "100vh" }}>

      {/* Hero Header */}
      <section style={{
        background: "linear-gradient(135deg, #053D31 0%, #1D9E75 100%)",
        padding: "52px 48px 44px",
        position: "relative",
        overflow: "hidden",
      }}>
        <div style={{ position: "absolute", top: -40, right: -40, width: 200, height: 200, borderRadius: "50%", background: "rgba(255,255,255,0.04)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: -60, left: -20, width: 160, height: 160, borderRadius: "50%", background: "rgba(255,255,255,0.04)", pointerEvents: "none" }} />
        <div style={{ position: "relative" }}>
          <h1 style={{ color: "#fff", fontSize: "clamp(22px,3vw,32px)", fontWeight: 700, marginBottom: 8 }}>
            สินค้าและบริการ
          </h1>
          <p style={{ color: "rgba(255,255,255,0.75)", fontSize: 15, maxWidth: 480 }}>
            บรรจุภัณฑ์และสิ่งพิมพ์คุณภาพสูง ครบทุกประเภท ตอบโจทย์ทุกธุรกิจ
          </p>
        </div>
      </section>

      {/* Sticky Filter Bar */}
      <div style={{
        background: "#fff",
        borderBottom: "1px solid #e5e7eb",
        padding: "0 48px",
        position: "sticky",
        top: 0,
        zIndex: 10,
        boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
      }}>
        <div style={{
          display: "flex",
          gap: 4,
          overflowX: "auto",
          paddingTop: 12,
          paddingBottom: 12,
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}>
          {filterTabs.map(cat => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              style={{
                padding: "8px 18px",
                borderRadius: 24,
                fontSize: 13,
                fontWeight: active === cat ? 600 : 400,
                border: "none",
                background: active === cat ? "#1D9E75" : "transparent",
                color: active === cat ? "#fff" : "#6b7280",
                cursor: "pointer",
                transition: "all .2s",
                whiteSpace: "nowrap",
                fontFamily: "'Sarabun', sans-serif",
                flexShrink: 0,
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div style={{ padding: "36px 48px 64px" }}>

        {/* Results Count */}
        <div style={{ marginBottom: 24, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <p style={{ fontSize: 14, color: "#6b7280" }}>
            แสดง <strong style={{ color: "#1a1a1a" }}>{filtered.length}</strong> รายการ
            {active !== "ทั้งหมด" && <> ในหมวด <strong style={{ color: "#1D9E75" }}>{active}</strong></>}
          </p>
        </div>

        {filtered.length === 0 ? (
          <div style={{ textAlign: "center", padding: "80px 0", color: "#9ca3af" }}>
            <div style={{ fontSize: 56, marginBottom: 16 }}>🔍</div>
            <p style={{ fontSize: 16, fontWeight: 500, color: "#374151" }}>ยังไม่มีสินค้าในหมวดนี้</p>
            <p style={{ fontSize: 14, marginTop: 8 }}>ติดต่อเราเพื่อสอบถามข้อมูลเพิ่มเติม</p>
          </div>
        ) : (
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: 20,
          }}>
            {filtered.map(({ id, icon, cat, name, desc, moq, price }) => (
              <div
                key={id}
                onMouseEnter={() => setHoveredId(id)}
                onMouseLeave={() => setHoveredId(null)}
                style={{
                  background: "#fff",
                  border: "1px solid",
                  borderColor: hoveredId === id ? "#1D9E75" : "#e5e7eb",
                  borderRadius: 18,
                  overflow: "hidden",
                  transition: "all .25s ease",
                  boxShadow: hoveredId === id ? "0 12px 32px rgba(29,158,117,0.15)" : "0 2px 8px rgba(0,0,0,0.04)",
                  transform: hoveredId === id ? "translateY(-4px)" : "translateY(0)",
                }}
              >
                {/* Card Image Area */}
                <div style={{
                  height: 110,
                  background: `linear-gradient(135deg, ${catColors[cat] || "#1D9E75"}18, ${catColors[cat] || "#1D9E75"}30)`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "0 20px",
                  position: "relative",
                }}>
                  <span style={{ fontSize: 52 }}>{icon}</span>
                  <span style={{
                    fontSize: 11,
                    fontWeight: 600,
                    background: catColors[cat] || "#1D9E75",
                    color: "#fff",
                    padding: "4px 12px",
                    borderRadius: 20,
                  }}>{cat}</span>
                </div>

                {/* Card Body */}
                <div style={{ padding: "18px 20px 20px" }}>
                  <h3 style={{ fontSize: 16, fontWeight: 700, color: "#1a1a1a", marginBottom: 6 }}>{name}</h3>
                  <p style={{ fontSize: 13, color: "#6b7280", lineHeight: 1.65, marginBottom: 16, minHeight: 42 }}>{desc}</p>

                  {/* MOQ + Price Row */}
                  <div style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    background: "#F9F9F7",
                    borderRadius: 10,
                    padding: "10px 14px",
                    marginBottom: 16,
                  }}>
                    <div>
                      <div style={{ fontSize: 10, color: "#9ca3af", marginBottom: 2 }}>MOQ</div>
                      <div style={{ fontSize: 13, fontWeight: 600, color: "#374151" }}>{moq}</div>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <div style={{ fontSize: 10, color: "#9ca3af", marginBottom: 2 }}>ราคา</div>
                      <div style={{ fontSize: 14, fontWeight: 700, color: "#1D9E75" }}>{price}</div>
                    </div>
                  </div>

                  {/* CTA Buttons */}
                  <div style={{ display: "flex", gap: 8 }}>
                    <Link to={`/products/${id}`} style={{
                      flex: 1,
                      textAlign: "center",
                      background: "#1D9E75",
                      color: "#fff",
                      padding: "10px 0",
                      borderRadius: 10,
                      fontSize: 13,
                      fontWeight: 600,
                      textDecoration: "none",
                      transition: "background .2s",
                    }}>ดูรายละเอียด</Link>
                    <Link to="/contact" style={{
                      flex: 1,
                      textAlign: "center",
                      background: "#E1F5EE",
                      color: "#085041",
                      padding: "10px 0",
                      borderRadius: 10,
                      fontSize: 13,
                      fontWeight: 600,
                      textDecoration: "none",
                    }}>ขอใบเสนอราคา</Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Bottom CTA */}
        <div style={{
          marginTop: 56,
          background: "linear-gradient(135deg, #053D31, #1D9E75)",
          borderRadius: 20,
          padding: "40px 48px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 24,
        }}>
          <div>
            <h2 style={{ color: "#fff", fontSize: 20, fontWeight: 700, marginBottom: 6 }}>ไม่เจอสินค้าที่ต้องการ?</h2>
            <p style={{ color: "rgba(255,255,255,0.75)", fontSize: 14 }}>เราผลิตบรรจุภัณฑ์ตามแบบที่คุณออกแบบเอง ติดต่อมาได้เลย</p>
          </div>
          <Link to="/contact" style={{
            background: "#fff",
            color: "#085041",
            padding: "13px 32px",
            borderRadius: 28,
            fontSize: 14,
            fontWeight: 700,
            textDecoration: "none",
            whiteSpace: "nowrap",
          }}>ติดต่อเราเลย →</Link>
        </div>
      </div>
    </main>
  );
}