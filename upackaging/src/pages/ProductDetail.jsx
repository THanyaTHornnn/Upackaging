import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useCart } from "../store/cartStore";

/* ── ข้อมูลสินค้าทั้งหมด ── เพิ่ม/แก้ที่นี่ */
const PRODUCTS = {
  "box-cosmetic": {
    name: "กล่องเครื่องสำอาง",
    cat: "กล่อง",
    icon: "📦",
    price: "เริ่มต้น ฿8 / ใบ",
    moq: "500 ใบ",
    lead: "7–10 วันทำการ",
    desc: "กล่องพิมพ์ 4 สีออฟเซ็ท บนกระดาษอาร์ตการ์ดคุณภาพสูง เคลือบ UV เงาหรือด้านได้ตามต้องการ เหมาะสำหรับแบรนด์เครื่องสำอาง สกินแคร์ และผลิตภัณฑ์พรีเมียม",
    specs: [
      { label: "วัสดุ",       value: "อาร์ตการ์ด 350 แกรม" },
      { label: "การพิมพ์",    value: "4 สีออฟเซ็ท" },
      { label: "เคลือบผิว",   value: "UV เงา / UV ด้าน / ไม่เคลือบ" },
      { label: "ฟินิชพิเศษ",  value: "ฟอยล์ทอง, ฟอยล์เงิน, ปั๊มนูน" },
      { label: "MOQ",          value: "500 ใบ" },
      { label: "ระยะเวลาผลิต", value: "7–10 วันทำการ" },
    ],
    options: ["เคลือบ UV เงา", "เคลือบ UV ด้าน", "ฟอยล์ทอง", "ฟอยล์เงิน", "ปั๊มนูน"],
    related: ["box-food", "box-shipping", "bag-paper"],
  },
  "box-food": {
    name: "กล่องอาหาร",
    cat: "กล่อง",
    icon: "🍱",
    price: "เริ่มต้น ฿5 / ใบ",
    moq: "1,000 ใบ",
    lead: "5–7 วันทำการ",
    desc: "กล่องกระดาษ food grade ปลอดภัย รับรองมาตรฐาน FDA พิมพ์สีสดใส เหมาะสำหรับร้านอาหาร เบเกอรี่ และธุรกิจ F&B",
    specs: [
      { label: "วัสดุ",       value: "กระดาษ Food Grade" },
      { label: "การพิมพ์",    value: "4 สีออฟเซ็ท" },
      { label: "มาตรฐาน",     value: "FDA อนุมัติ" },
      { label: "MOQ",          value: "1,000 ใบ" },
      { label: "ระยะเวลาผลิต", value: "5–7 วันทำการ" },
    ],
    options: ["ขนาด S", "ขนาด M", "ขนาด L", "มีหน้าต่าง PET"],
    related: ["box-cosmetic", "box-shipping", "brochure-tri"],
  },
  "box-shipping": {
    name: "กล่องไปรษณีย์",
    cat: "กล่อง",
    icon: "📫",
    price: "เริ่มต้น ฿12 / ใบ",
    moq: "200 ใบ",
    lead: "3–5 วันทำการ",
    desc: "กล่องลูกฟูก 3 และ 5 ชั้น แข็งแรงทนทาน รับน้ำหนักได้ดี พิมพ์โลโก้ด้านนอกได้ เหมาะสำหรับธุรกิจ e-Commerce และส่งสินค้าทางไปรษณีย์",
    specs: [
      { label: "วัสดุ",       value: "ลูกฟูก 3 ชั้น / 5 ชั้น" },
      { label: "การพิมพ์",    value: "1–2 สี Flexo" },
      { label: "MOQ",          value: "200 ใบ" },
      { label: "ระยะเวลาผลิต", value: "3–5 วันทำการ" },
    ],
    options: ["ลูกฟูก 3 ชั้น", "ลูกฟูก 5 ชั้น", "พิมพ์โลโก้", "ไม่พิมพ์"],
    related: ["box-cosmetic", "sticker-roll", "bag-paper"],
  },
  "sticker-roll": {
    name: "สติ๊กเกอร์ม้วน",
    cat: "สติ๊กเกอร์",
    icon: "🏷️",
    price: "เริ่มต้น ฿0.50 / ดวง",
    moq: "1,000 ดวง",
    lead: "3–5 วันทำการ",
    desc: "สติ๊กเกอร์ม้วนพิมพ์ดิจิทัลความละเอียดสูง กันน้ำ ทนความร้อน เหมาะสำหรับฉลากสินค้า บาร์โค้ด และ label ทุกประเภท",
    specs: [
      { label: "วัสดุ",       value: "กระดาษ / PVC / PET" },
      { label: "การพิมพ์",    value: "Digital 4 สี" },
      { label: "กาว",          value: "กาวถาวร / กาวถอดได้" },
      { label: "MOQ",          value: "1,000 ดวง" },
      { label: "ระยะเวลาผลิต", value: "3–5 วันทำการ" },
    ],
    options: ["กระดาษ", "PVC กันน้ำ", "PET ทนร้อน", "กาวถาวร", "กาวถอดได้"],
    related: ["sticker-cut", "box-cosmetic", "bag-paper"],
  },
  "sticker-cut": {
    name: "สติ๊กเกอร์ตัดรูป",
    cat: "สติ๊กเกอร์",
    icon: "✂️",
    price: "เริ่มต้น ฿1.50 / ดวง",
    moq: "500 ดวง",
    lead: "5–7 วันทำการ",
    desc: "สติ๊กเกอร์ Die-cut ตัดตามรูปทรงที่กำหนด ทุกรูปทรงและขนาด พิมพ์ดิจิทัลสีสด เหมาะสำหรับงานโปรโมชั่น สินค้า และ branding",
    specs: [
      { label: "วัสดุ",       value: "กระดาษ / PVC" },
      { label: "การพิมพ์",    value: "Digital 4 สี" },
      { label: "การตัด",      value: "Die-cut ตามแบบ" },
      { label: "MOQ",          value: "500 ดวง" },
      { label: "ระยะเวลาผลิต", value: "5–7 วันทำการ" },
    ],
    options: ["กระดาษด้าน", "กระดาษมัน", "PVC ใส", "PVC ขาว"],
    related: ["sticker-roll", "bag-paper", "brochure-tri"],
  },
  "bag-paper": {
    name: "ถุงกระดาษหูเชือก",
    cat: "ถุงกระดาษ",
    icon: "🛍️",
    price: "เริ่มต้น ฿9 / ใบ",
    moq: "500 ใบ",
    lead: "7–10 วันทำการ",
    desc: "ถุงกระดาษ Kraft พิมพ์โลโก้สีสด หูเชือกฝ้ายหรือหูแบนแข็งแรง เหมาะสำหรับร้านค้า แบรนด์แฟชั่น และของขวัญพรีเมียม",
    specs: [
      { label: "วัสดุ",       value: "กระดาษ Kraft / อาร์ต" },
      { label: "การพิมพ์",    value: "4 สีออฟเซ็ท" },
      { label: "หูถุง",       value: "เชือกฝ้าย / หูแบน" },
      { label: "MOQ",          value: "500 ใบ" },
      { label: "ระยะเวลาผลิต", value: "7–10 วันทำการ" },
    ],
    options: ["กระดาษ Kraft", "กระดาษอาร์ต", "หูเชือกฝ้าย", "หูแบน"],
    related: ["bag-duplex", "box-cosmetic", "sticker-roll"],
  },
  "bag-duplex": {
    name: "ถุงกระดาษ Duplex",
    cat: "ถุงกระดาษ",
    icon: "🧴",
    price: "เริ่มต้น ฿14 / ใบ",
    moq: "500 ใบ",
    lead: "10–14 วันทำการ",
    desc: "ถุงกระดาษ Duplex ผิวเคลือบ PP ด้านหรือมัน ดูพรีเมียม หรูหรา เหมาะสำหรับแบรนด์สกินแคร์ เครื่องสำอาง และสินค้า luxury",
    specs: [
      { label: "วัสดุ",       value: "กระดาษ Duplex 350 แกรม" },
      { label: "การพิมพ์",    value: "4 สีออฟเซ็ท" },
      { label: "เคลือบผิว",   value: "PP ด้าน / PP มัน" },
      { label: "MOQ",          value: "500 ใบ" },
      { label: "ระยะเวลาผลิต", value: "10–14 วันทำการ" },
    ],
    options: ["เคลือบ PP ด้าน", "เคลือบ PP มัน", "ฟอยล์ทอง", "ริบบิ้น"],
    related: ["bag-paper", "box-cosmetic", "sticker-cut"],
  },
  "brochure-tri": {
    name: "แผ่นพับ 3 ตอน",
    cat: "แผ่นพับ",
    icon: "📄",
    price: "เริ่มต้น ฿4 / แผ่น",
    moq: "500 แผ่น",
    lead: "3–5 วันทำการ",
    desc: "แผ่นพับ A4 พับ 3 ตอน พิมพ์ 4 สีออฟเซ็ท บนกระดาษอาร์ตมันหรืออาร์ตด้าน เหมาะสำหรับ brochure บริษัท เมนูอาหาร และสื่อโปรโมต",
    specs: [
      { label: "วัสดุ",       value: "อาร์ตมัน / อาร์ตด้าน 150 แกรม" },
      { label: "การพิมพ์",    value: "4 สีออฟเซ็ท 2 หน้า" },
      { label: "ขนาด",        value: "A4 พับ 3 / DL / กำหนดเอง" },
      { label: "MOQ",          value: "500 แผ่น" },
      { label: "ระยะเวลาผลิต", value: "3–5 วันทำการ" },
    ],
    options: ["อาร์ตมัน", "อาร์ตด้าน", "เคลือบ UV", "ไม่เคลือบ"],
    related: ["catalog", "sticker-roll", "box-cosmetic"],
  },
  "catalog": {
    name: "แค็ตตาล็อกสินค้า",
    cat: "แผ่นพับ",
    icon: "📒",
    price: "เริ่มต้น ฿35 / เล่ม",
    moq: "200 เล่ม",
    lead: "7–10 วันทำการ",
    desc: "แค็ตตาล็อกเข้าเล่มไสกาว หรือเย็บมุมลวด พิมพ์ 4 สีทั้งเล่ม ปกแข็งหรือปกอ่อน เหมาะสำหรับนำเสนอสินค้าและบริการอย่างมืออาชีพ",
    specs: [
      { label: "วัสดุเนื้อใน",  value: "อาร์ตมัน 130 แกรม" },
      { label: "วัสดุปก",       value: "อาร์ตการ์ด 250 แกรม" },
      { label: "การเข้าเล่ม",   value: "ไสกาว / เย็บมุมลวด" },
      { label: "MOQ",            value: "200 เล่ม" },
      { label: "ระยะเวลาผลิต",  value: "7–10 วันทำการ" },
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

export default function ProductDetail() {
  const { id } = useParams();
  const p = PRODUCTS[id];

  const { addItem } = useCart();
  const navigate = useNavigate();
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [qty, setQty] = useState("");
  const [sent, setSent] = useState(false);
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

  /* สินค้าไม่มีในระบบ */
  if (!p) return (
    <main style={{ fontFamily:"'Sarabun',sans-serif", padding:"80px 40px", textAlign:"center" }}>
      <div style={{ fontSize:"52px", marginBottom:"16px" }}>🔍</div>
      <h1 style={{ fontSize:"22px", fontWeight:600, color:"#1a1a1a", marginBottom:"8px" }}>ไม่พบสินค้านี้</h1>
      <p style={{ color:"#6b7280", marginBottom:"24px" }}>อาจถูกลบหรือ URL ไม่ถูกต้อง</p>
      <Link to="/products" style={{ background:"#1D9E75", color:"#fff", padding:"12px 28px", borderRadius:"28px", textDecoration:"none", fontWeight:600 }}>
        กลับหน้าสินค้า
      </Link>
    </main>
  );

  return (
    <main style={{ fontFamily:"'Sarabun',sans-serif" }}>

      {/* Breadcrumb */}
      <div style={{ padding:"16px 40px", background:"#F9F9F7", borderBottom:"1px solid #e5e7eb", fontSize:"13px", color:"#9ca3af" }}>
        <Link to="/" style={{ color:"#9ca3af", textDecoration:"none" }}>หน้าแรก</Link>
        {" › "}
        <Link to="/products" style={{ color:"#9ca3af", textDecoration:"none" }}>สินค้า</Link>
        {" › "}
        <span style={{ color:"#1a1a1a" }}>{p.name}</span>
      </div>

      <div style={{ padding:"40px", display:"grid", gridTemplateColumns:"1fr 420px", gap:"48px", alignItems:"start" }}>

        {/* ── ซ้าย: รูป + specs ── */}
        <div>
          {/* รูปสินค้า */}
          <div style={{
            background:"linear-gradient(135deg,#E1F5EE,#9FE1CB)",
            borderRadius:"20px", height:"320px",
            display:"flex", alignItems:"center", justifyContent:"center",
            marginBottom:"32px", position:"relative",
          }}>
            <span style={{ fontSize:"96px" }}>{p.icon}</span>
            <span style={{
              position:"absolute", top:"16px", left:"16px",
              background:"#1D9E75", color:"#fff",
              fontSize:"11px", padding:"3px 10px", borderRadius:"10px", fontWeight:500,
            }}>{p.cat}</span>
          </div>

          {/* Specs table */}
          <h2 style={{ fontSize:"17px", fontWeight:600, color:"#1a1a1a", marginBottom:"14px" }}>ข้อมูลจำเพาะ</h2>
          <table style={{ width:"100%", borderCollapse:"collapse" }}>
            <tbody>
              {p.specs.map(({ label, value }) => (
                <tr key={label} style={{ borderBottom:"1px solid #f3f4f6" }}>
                  <td style={{ padding:"10px 0", fontSize:"13px", color:"#6b7280", width:"40%" }}>{label}</td>
                  <td style={{ padding:"10px 0", fontSize:"13px", color:"#1a1a1a", fontWeight:500 }}>{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* ── ขวา: info + order form ── */}
        <div>
          <div style={{ fontSize:"12px", color:"#1D9E75", fontWeight:500, marginBottom:"6px" }}>{p.cat}</div>
          <h1 style={{ fontSize:"26px", fontWeight:600, color:"#1a1a1a", marginBottom:"8px" }}>{p.name}</h1>
          <p style={{ fontSize:"14px", color:"#6b7280", lineHeight:1.8, marginBottom:"20px" }}>{p.desc}</p>

          {/* ราคา + MOQ */}
          <div style={{ display:"flex", gap:"16px", marginBottom:"24px" }}>
            <div style={{ background:"#E1F5EE", borderRadius:"10px", padding:"12px 18px", flex:1, textAlign:"center" }}>
              <div style={{ fontSize:"11px", color:"#6b7280", marginBottom:"2px" }}>ราคาเริ่มต้น</div>
              <div style={{ fontSize:"18px", fontWeight:700, color:"#085041" }}>{p.price}</div>
            </div>
            <div style={{ background:"#F5F3EE", borderRadius:"10px", padding:"12px 18px", flex:1, textAlign:"center" }}>
              <div style={{ fontSize:"11px", color:"#6b7280", marginBottom:"2px" }}>MOQ</div>
              <div style={{ fontSize:"18px", fontWeight:700, color:"#1a1a1a" }}>{p.moq}</div>
            </div>
            <div style={{ background:"#F5F3EE", borderRadius:"10px", padding:"12px 18px", flex:1, textAlign:"center" }}>
              <div style={{ fontSize:"11px", color:"#6b7280", marginBottom:"2px" }}>ระยะเวลาผลิต</div>
              <div style={{ fontSize:"15px", fontWeight:700, color:"#1a1a1a" }}>{p.lead}</div>
            </div>
          </div>

          {/* Options */}
          <div style={{ marginBottom:"24px" }}>
            <div style={{ fontSize:"13px", fontWeight:500, color:"#374151", marginBottom:"10px" }}>ตัวเลือกเพิ่มเติม</div>
            <div style={{ display:"flex", flexWrap:"wrap", gap:"8px" }}>
              {p.options.map(opt => (
                <button key={opt} onClick={() => toggleOption(opt)} style={{
                  padding:"6px 14px", borderRadius:"20px", fontSize:"12px",
                  border:"1.5px solid",
                  borderColor: selectedOptions.includes(opt) ? "#1D9E75" : "#e5e7eb",
                  background: selectedOptions.includes(opt) ? "#E1F5EE" : "#fff",
                  color: selectedOptions.includes(opt) ? "#085041" : "#374151",
                  cursor:"pointer", transition:"all .15s", fontFamily:"'Sarabun',sans-serif",
                }}>{opt}</button>
              ))}
            </div>
          </div>

          {/* Quick order */}
          {sent ? (
            <div style={{ background:"#E1F5EE", borderRadius:"14px", padding:"24px", textAlign:"center" }}>
              <div style={{ fontSize:"36px", marginBottom:"8px" }}>✅</div>
              <div style={{ fontSize:"15px", fontWeight:600, color:"#085041" }}>ส่งข้อมูลเรียบร้อย!</div>
              <div style={{ fontSize:"13px", color:"#374151", marginTop:"4px" }}>เราจะติดต่อกลับภายใน 1 ชั่วโมง</div>
              <button onClick={() => setSent(false)} style={{
                marginTop:"14px", background:"transparent", border:"1.5px solid #1D9E75",
                color:"#1D9E75", padding:"8px 20px", borderRadius:"20px",
                fontSize:"13px", cursor:"pointer", fontFamily:"'Sarabun',sans-serif",
              }}>สั่งใหม่</button>
            </div>
          ) : (
            <div style={{ background:"#F9F9F7", borderRadius:"14px", padding:"20px", border:"1px solid #e5e7eb" }}>
              <div style={{ fontSize:"14px", fontWeight:600, color:"#1a1a1a", marginBottom:"14px" }}>สั่งซื้อ / ขอใบเสนอราคา</div>
              <input
                type="text" placeholder="ชื่อ-บริษัท"
                style={{ display:"block", width:"100%", border:"1px solid #e5e7eb", borderRadius:"8px", padding:"10px 12px", fontSize:"13px", marginBottom:"10px", outline:"none", boxSizing:"border-box", fontFamily:"'Sarabun',sans-serif" }}
              />
              <input
                type="tel" placeholder="เบอร์โทรติดต่อ"
                style={{ display:"block", width:"100%", border:"1px solid #e5e7eb", borderRadius:"8px", padding:"10px 12px", fontSize:"13px", marginBottom:"10px", outline:"none", boxSizing:"border-box", fontFamily:"'Sarabun',sans-serif" }}
              />
              <input
                type="text" placeholder={`จำนวนที่ต้องการ (min. ${p.moq})`}
                value={qty} onChange={e => setQty(e.target.value)}
                style={{ display:"block", width:"100%", border:"1px solid #e5e7eb", borderRadius:"8px", padding:"10px 12px", fontSize:"13px", marginBottom:"14px", outline:"none", boxSizing:"border-box", fontFamily:"'Sarabun',sans-serif" }}
              />
              <div style={{ display:"flex", gap:"10px" }}>
                <button onClick={handleAddToCart} style={{
                  flex:2, background: added ? "#085041" : "#1D9E75",
                  color:"#fff", border:"none", padding:"12px",
                  borderRadius:"10px", fontSize:"14px", fontWeight:600,
                  cursor:"pointer", fontFamily:"'Sarabun',sans-serif",
                  transition:"background .2s",
                }}>
                  {added ? "✅ เพิ่มแล้ว!" : "🛒 เพิ่มลงตะกร้า"}
                </button>
                <Link to="/cart" style={{
                  flex:1, textAlign:"center", background:"#fff", color:"#1D9E75",
                  border:"1.5px solid #1D9E75", padding:"12px", borderRadius:"10px",
                  fontSize:"14px", fontWeight:500, textDecoration:"none",
                  display:"flex", alignItems:"center", justifyContent:"center",
                }}>ดูตะกร้า</Link>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Related products */}
      <section style={{ padding:"0 40px 48px" }}>
        <h2 style={{ fontSize:"18px", fontWeight:600, color:"#1a1a1a", marginBottom:"20px" }}>สินค้าที่เกี่ยวข้อง</h2>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:"16px" }}>
          {p.related.map(rid => {
            const r = PRODUCTS[rid] || ALL_PRODUCTS[rid];
            if (!r) return null;
            return (
              <Link to={`/products/${rid}`} key={rid} style={{ textDecoration:"none" }}>
                <div style={{
                  background:"#fff", border:"1px solid #e5e7eb", borderRadius:"14px",
                  overflow:"hidden", transition:"box-shadow .2s,transform .2s",
                }}
                  onMouseEnter={e => { e.currentTarget.style.boxShadow="0 8px 24px rgba(29,158,117,0.12)"; e.currentTarget.style.transform="translateY(-2px)"; }}
                  onMouseLeave={e => { e.currentTarget.style.boxShadow="none"; e.currentTarget.style.transform="translateY(0)"; }}
                >
                  <div style={{ background:"#E1F5EE", height:"80px", display:"flex", alignItems:"center", justifyContent:"center" }}>
                    <span style={{ fontSize:"36px" }}>{r.icon}</span>
                  </div>
                  <div style={{ padding:"12px 14px", fontSize:"13px", fontWeight:500, color:"#1a1a1a" }}>{r.name}</div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

    </main>
  );
}