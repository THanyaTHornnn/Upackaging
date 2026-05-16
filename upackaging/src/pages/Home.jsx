import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

/* ── Slides ── เพิ่ม/แก้รูปตรงนี้ได้เลย */
const slides = [
  {
    badge:    "โรงพิมพ์ครบวงจร · กว่า 20 ปีประสบการณ์",
    title:    "บรรจุภัณฑ์คุณภาพ\nที่คุณไว้วางใจได้",
    desc:     "กล่อง สติ๊กเกอร์ ถุงกระดาษ และงานพิมพ์ทุกชนิด\nรับออกแบบและผลิตตามสั่ง ส่งตรงถึงมือคุณ",
    bg:       "linear-gradient(135deg,#053D31 0%,#1D9E75 60%,#5DCAA5 100%)",
    icon:     "📦",
    imgLabel: "กล่องบรรจุภัณฑ์",
    cta:      { label: "ดูกล่องทั้งหมด →", to: "/products" },
  },
  {
    badge:    "พิมพ์ตรงสี Pantone · ทนน้ำ ทนความร้อน",
    title:    "สติ๊กเกอร์และฉลาก\nคมชัดทุกรายละเอียด",
    desc:     "ม้วนและแผ่น Die-cut ทุกรูปทรง\nพิมพ์ดิจิทัลความละเอียดสูง",
    bg:       "linear-gradient(135deg,#03302A 0%,#0F6E56 55%,#1D9E75 100%)",
    icon:     "🏷️",
    imgLabel: "สติ๊กเกอร์และฉลาก",
    cta:      { label: "ดูสติ๊กเกอร์ →", to: "/products" },
  },
  {
    badge:    "ถุงกระดาษ Kraft · Duplex · Art",
    title:    "ถุงกระดาษพรีเมียม\nสะท้อนแบรนด์คุณ",
    desc:     "หูเชือก หูแบน เคลือบ PP ด้าน/มัน\nพิมพ์โลโก้ทุกขนาด MOQ 500 ใบ",
    bg:       "linear-gradient(135deg,#042B24 0%,#085041 55%,#1D9E75 100%)",
    icon:     "🛍️",
    imgLabel: "ถุงกระดาษ",
    cta:      { label: "ดูถุงกระดาษ →", to: "/products" },
  },
];

/* ── data คงที่ ── */
const products = [
  { id:"box",      icon:"📦", name:"กล่องบรรจุภัณฑ์",   desc:"กล่องพิมพ์สีออฟเซ็ท ครบทุกขนาด ทุกรูปทรง" },
  { id:"sticker",  icon:"🏷️", name:"สติ๊กเกอร์และฉลาก", desc:"ม้วนและแผ่น ทนน้ำ ทนความร้อน พิมพ์คมชัด"  },
  { id:"bag",      icon:"🛍️", name:"ถุงกระดาษ",          desc:"ถุงกระดาษพิมพ์โลโก้ทุกขนาด หูหิ้วครบแบบ" },
  { id:"brochure", icon:"📄", name:"แผ่นพับ / โบรชัวร์",  desc:"งานพิมพ์ตลาด แค็ตตาล็อก Hangtag ครบจบ"   },
];
const portfolio = [
  { bg:"#1D9E75", icon:"📦", label:"กล่องเครื่องสำอาง"  },
  { bg:"#085041", icon:"🛍️", label:"ถุงกระดาษแบรนด์ดัง" },
  { bg:"#5DCAA5", icon:"🏷️", label:"ฉลากสินค้าอาหาร"    },
];
const trust = [
  { icon:"🚚", text:"ส่งทั่วประเทศ"            },
  { icon:"🏅", text:"รับประกันคุณภาพ"          },
  { icon:"🎨", text:"พิมพ์ตรงสี Pantone"       },
  { icon:"🎧", text:"ทีมงานพร้อมให้คำปรึกษา"   },
];
const inputStyle = {
  display:"block", width:"100%",
  background:"rgba(255,255,255,0.15)",
  border:"1px solid rgba(255,255,255,0.25)",
  borderRadius:"8px", padding:"9px 12px",
  color:"#fff", fontSize:"13px",
  marginBottom:"10px", outline:"none", boxSizing:"border-box",
};

/* ══════════════════════════════════════════
   Hero Banner Component
══════════════════════════════════════════ */
function HeroBanner() {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);

  /* auto-slide ทุก 5 วินาที */
  useEffect(() => {
    const t = setInterval(() => goTo((current + 1) % slides.length), 3000);
    return () => clearInterval(t);
  }, [current]);

  function goTo(idx) {
    if (idx === current || animating) return;
    setAnimating(true);
    setTimeout(() => { setCurrent(idx); setAnimating(false); }, 300);
  }

  const s = slides[current];

  return (
    <section style={{ position:"relative", overflow:"hidden" }}>

      {/* Slide content */}
      <div style={{
        background: s.bg,
        padding: "64px 40px",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "40px",
        alignItems: "center",
        transition: "background .6s ease",
        opacity: animating ? 0 : 1,
        transform: animating ? "translateY(6px)" : "translateY(0)",
        transition: "opacity .3s, transform .3s",
      }}>

        {/* Text */}
        <div>
          <span style={{
            display:"inline-block", background:"rgba(255,255,255,0.18)",
            color:"#fff", fontSize:"12px", padding:"4px 14px",
            borderRadius:"20px", marginBottom:"16px", letterSpacing:"0.04em",
          }}>{s.badge}</span>

          <h1 style={{ color:"#fff", fontSize:"36px", fontWeight:600, lineHeight:1.35, marginBottom:"16px", whiteSpace:"pre-line" }}>
            {s.title}
          </h1>
          <p style={{ color:"rgba(255,255,255,0.8)", fontSize:"15px", lineHeight:1.8, marginBottom:"28px", whiteSpace:"pre-line" }}>
            {s.desc}
          </p>
          <div style={{ display:"flex", gap:"12px" }}>
            <Link to={s.cta.to} style={{
              background:"#fff", color:"#0F6E56",
              padding:"12px 28px", borderRadius:"28px",
              fontWeight:600, fontSize:"14px", textDecoration:"none",
            }}>{s.cta.label}</Link>
            <Link to="/contact" style={{
              background:"transparent", color:"#fff",
              padding:"12px 28px", borderRadius:"28px",
              fontSize:"14px", textDecoration:"none",
              border:"1.5px solid rgba(255,255,255,0.55)",
            }}>ขอใบเสนอราคา</Link>
          </div>
        </div>

        {/* Image placeholder — แทนด้วย <img src="..."> ได้เลย */}
        <div style={{
          background:"rgba(255,255,255,0.12)", borderRadius:"20px", height:"260px",
          display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center",
          gap:"10px", border:"1px solid rgba(255,255,255,0.2)",
        }}>
          <span style={{ fontSize:"72px", transition:"all .3s" }}>{s.icon}</span>
          <span style={{ color:"rgba(255,255,255,0.55)", fontSize:"13px" }}>{s.imgLabel}</span>
        </div>

      </div>

      {/* ── Controls ── */}
      <div style={{
        position:"absolute", bottom:"20px", left:"50%",
        transform:"translateX(-50%)",
        display:"flex", alignItems:"center", gap:"10px",
      }}>

        {/* Prev */}
        <button onClick={() => goTo((current - 1 + slides.length) % slides.length)} style={{
          width:"28px", height:"28px", borderRadius:"50%",
          background:"rgba(255,255,255,0.2)", border:"1px solid rgba(255,255,255,0.4)",
          color:"#fff", fontSize:"14px", cursor:"pointer",
          display:"flex", alignItems:"center", justifyContent:"center",
        }}>‹</button>

        {/* Dots */}
        {slides.map((_, i) => (
          <button key={i} onClick={() => goTo(i)} style={{
            width: i === current ? "24px" : "8px",
            height:"8px",
            borderRadius:"4px",
            background: i === current ? "#fff" : "rgba(255,255,255,0.4)",
            border:"none", cursor:"pointer", padding:0,
            transition:"all .3s ease",
          }}/>
        ))}

        {/* Next */}
        <button onClick={() => goTo((current + 1) % slides.length)} style={{
          width:"28px", height:"28px", borderRadius:"50%",
          background:"rgba(255,255,255,0.2)", border:"1px solid rgba(255,255,255,0.4)",
          color:"#fff", fontSize:"14px", cursor:"pointer",
          display:"flex", alignItems:"center", justifyContent:"center",
        }}>›</button>

      </div>

      {/* Slide counter */}
      <div style={{
        position:"absolute", top:"20px", right:"40px",
        background:"rgba(0,0,0,0.25)", color:"#fff",
        fontSize:"12px", padding:"3px 10px", borderRadius:"10px",
      }}>
        {current + 1} / {slides.length}
      </div>

    </section>
  );
}

/* ══════════════════════════════════════════
   Home Page
══════════════════════════════════════════ */
export default function Home() {
  return (
    <main style={{ fontFamily:"'Sarabun', sans-serif" }}>

      <HeroBanner />

      {/* TRUST BAR */}
      <section style={{
        background:"#E1F5EE", padding:"18px 40px",
        display:"flex", justifyContent:"space-around",
        borderBottom:"1px solid #9FE1CB",
      }}>
        {trust.map(({ icon, text }) => (
          <div key={text} style={{ display:"flex", alignItems:"center", gap:"8px", fontSize:"14px", color:"#085041" }}>
            <span style={{ fontSize:"20px" }}>{icon}</span>{text}
          </div>
        ))}
      </section>

      {/* PRODUCTS */}
      <section style={{ padding:"48px 40px" }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"baseline", marginBottom:"28px" }}>
          <h2 style={{ fontSize:"22px", fontWeight:600, color:"#1a1a1a" }}>สินค้าและบริการ</h2>
          <Link to="/products" style={{ fontSize:"14px", color:"#1D9E75", textDecoration:"none" }}>ดูทั้งหมด →</Link>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:"16px" }}>
          {products.map(({ id, icon, name, desc }) => (
            <Link to={`/products/${id}`} key={id} style={{ textDecoration:"none" }}>
              <div
                style={{ background:"#fff", border:"1px solid #e5e7eb", borderRadius:"14px", overflow:"hidden", transition:"box-shadow .2s,transform .2s", cursor:"pointer" }}
                onMouseEnter={e => { e.currentTarget.style.boxShadow="0 8px 24px rgba(29,158,117,0.15)"; e.currentTarget.style.transform="translateY(-3px)"; }}
                onMouseLeave={e => { e.currentTarget.style.boxShadow="none"; e.currentTarget.style.transform="translateY(0)"; }}
              >
                <div style={{ background:"#E1F5EE", height:"100px", display:"flex", alignItems:"center", justifyContent:"center" }}>
                  <span style={{ fontSize:"44px" }}>{icon}</span>
                </div>
                <div style={{ padding:"14px" }}>
                  <div style={{ fontSize:"14px", fontWeight:600, color:"#1a1a1a", marginBottom:"4px" }}>{name}</div>
                  <div style={{ fontSize:"12px", color:"#6b7280", lineHeight:1.6 }}>{desc}</div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ORDER CTA */}
      <section style={{
        background:"#085041", margin:"0 40px 48px", borderRadius:"20px",
        padding:"36px 40px", display:"grid",
        gridTemplateColumns:"1fr auto", gap:"32px", alignItems:"center",
      }}>
        <div>
          <h2 style={{ color:"#fff", fontSize:"22px", fontWeight:600, marginBottom:"8px" }}>สั่งซื้อได้ง่ายๆ ไม่ต้องโทร</h2>
          <p style={{ color:"rgba(255,255,255,0.7)", fontSize:"14px", marginBottom:"20px" }}>แค่กรอกรายละเอียด เราติดต่อกลับภายใน 1 ชั่วโมง</p>
          <div style={{ display:"flex", alignItems:"center", flexWrap:"wrap" }}>
            {["เลือกสินค้า","ส่งไฟล์งาน","อนุมัติ proof","รับของ"].map((step,i) => (
              <div key={step} style={{ display:"flex", alignItems:"center" }}>
                <div style={{ display:"flex", alignItems:"center", gap:"6px" }}>
                  <div style={{ width:"24px",height:"24px",borderRadius:"50%",background:"rgba(255,255,255,0.15)",color:"#fff",fontSize:"12px",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:600 }}>{i+1}</div>
                  <span style={{ color:"rgba(255,255,255,0.8)", fontSize:"13px" }}>{step}</span>
                </div>
                {i<3 && <span style={{ color:"rgba(255,255,255,0.3)", margin:"0 10px" }}>→</span>}
              </div>
            ))}
          </div>
        </div>
        <div style={{ background:"rgba(255,255,255,0.1)", borderRadius:"14px", padding:"22px", minWidth:"220px" }}>
          <p style={{ color:"rgba(255,255,255,0.85)", fontSize:"13px", marginBottom:"12px", fontWeight:500 }}>ขอใบเสนอราคาด่วน</p>
          <input type="text" placeholder="ชื่อบริษัท / ลูกค้า" style={inputStyle}/>
          <input type="tel"  placeholder="เบอร์โทรติดต่อ"      style={inputStyle}/>
          <select style={{ ...inputStyle, color:"rgba(255,255,255,0.75)", marginBottom:"12px" }}>
            <option value="">เลือกประเภทสินค้า</option>
            <option>กล่องบรรจุภัณฑ์</option>
            <option>สติ๊กเกอร์และฉลาก</option>
            <option>ถุงกระดาษ</option>
            <option>แผ่นพับ / โบรชัวร์</option>
          </select>
          <Link to="/contact" style={{ display:"block", textAlign:"center", background:"#fff", color:"#085041", fontWeight:600, fontSize:"13px", padding:"10px", borderRadius:"8px", textDecoration:"none" }}>
            ส่งข้อมูล →
          </Link>
        </div>
      </section>

      {/* PORTFOLIO */}
      <section style={{ padding:"0 40px 48px" }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"baseline", marginBottom:"24px" }}>
          <h2 style={{ fontSize:"22px", fontWeight:600, color:"#1a1a1a" }}>ผลงานของเรา</h2>
          <Link to="/portfolio" style={{ fontSize:"14px", color:"#1D9E75", textDecoration:"none" }}>ดูทั้งหมด →</Link>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:"16px" }}>
          {portfolio.map(({ bg, icon, label }) => (
            <div key={label} style={{ borderRadius:"14px", overflow:"hidden", border:"1px solid #e5e7eb" }}>
              <div style={{ background:bg, height:"120px", display:"flex", alignItems:"center", justifyContent:"center" }}>
                <span style={{ fontSize:"52px" }}>{icon}</span>
              </div>
              <div style={{ background:"#fff", padding:"12px 14px", fontSize:"13px", fontWeight:500, color:"#1a1a1a" }}>{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CONTACT BAR */}
      <section style={{ background:"#F5F3EE", padding:"24px 40px", display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:"20px" }}>
        {[
          { icon:"📞", label:"โทรศัพท์",     value:"02-408-5680"  },
          { icon:"💬", label:"Line Official", value:"@udppackaging" },
          { icon:"👍", label:"Facebook",      value:"udp159"        },
        ].map(({ icon, label, value }) => (
          <div key={label} style={{ display:"flex", alignItems:"center", gap:"14px" }}>
            <div style={{ width:"44px",height:"44px",borderRadius:"12px",background:"#1D9E75",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"20px",flexShrink:0 }}>{icon}</div>
            <div>
              <div style={{ fontSize:"11px", color:"#6b7280" }}>{label}</div>
              <div style={{ fontSize:"14px", fontWeight:600, color:"#1a1a1a" }}>{value}</div>
            </div>
          </div>
        ))}
      </section>

    </main>
  );
}