import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const slides = [
  {
    badge: "กล่องบรรจุภัณฑ์ ทุกรูปแลล ครบวงจร",
    title: "บรรจุภัณฑ์คุณภาพ\nที่คุณไว้วางใจได้",
    desc: "กล่อง สติ๊กเกอร์ ถุงกระดาษ และงานพิมพ์ทุกชนิด\nรับออกแบบและผลิตตามสั่ง ส่งตรงถึงมือคุณ",
    bg: "linear-gradient(135deg,#053D31 0%,#0F6E56 55%,#1D9E75 100%)",
    icon: "📦", imgLabel: "กล่องบรรจุภัณฑ์",
    cta: { label: "ดูกล่องทั้งหมด →", to: "/products" },
    accent: "#9FE1CB",
  },
  {
    badge: "อกกแบบฟรี ไม่มีขั้นต่ำ",
    title: "สติ๊กเกอร์และฉลาก\nคมชัดทุกรายละเอียด",
    desc: "ม้วนและแผ่น Die-cut ทุกรูปทรง\nพิมพ์ดิจิทัลความละเอียดสูง",
    bg: "linear-gradient(135deg,#03302A 0%,#0F6E56 55%,#1D9E75 100%)",
    icon: "🏷️", imgLabel: "สติ๊กเกอร์และฉลาก",
    cta: { label: "ดูสติ๊กเกอร์ →", to: "/products" },
    accent: "#5DCAA5",
  },
  {
    badge: "ปลอดภัย ใส่ใจ ป้องกัน ยั่งยืน",
    title: "ถุงกระดาษพรีเมียม\nสะท้อนแบรนด์คุณ",
    desc: "หูเชือก หูแบน เคลือบ PP ด้าน/มัน\nพิมพ์โลโก้ทุกขนาด",
    bg: "linear-gradient(135deg,#042B24 0%,#085041 55%,#1D9E75 100%)",
    icon: "🛍️", imgLabel: "ถุงกระดาษ",
    cta: { label: "ดูถุงกระดาษ →", to: "/products" },
    accent: "#E1F5EE",
  },
];

const productCategories = [
  { id: "box",      icon: "📦", name: "กล่องบรรจุภัณฑ์",   desc: "กล่องพิมพ์สีออฟเซ็ท ครบทุกขนาด ทุกรูปทรง", cat: "กล่องบรรจุภัณฑ์" },
  { id: "sticker",  icon: "🏷️", name: "สติ๊กเกอร์และฉลาก", desc: "ม้วนและแผ่น ทนน้ำ ทนความร้อน พิมพ์คมชัด",   cat: "สติ๊กเกอร์" },
  { id: "bag",      icon: "🛍️", name: "ถุงกระดาษ",          desc: "ถุงกระดาษพิมพ์โลโก้ทุกขนาด หูหิ้วครบแบบ",  cat: "ถุงกระดาษ" },
  { id: "brochure", icon: "📄", name: "แผ่นพับ / โบรชัวร์",  desc: "งานพิมพ์ตลาด แค็ตตาล็อก Hangtag ครบจบ",   cat: "แผ่นพับ" },
];

const portfolio = [
  { bg: "linear-gradient(135deg,#1D9E75,#085041)", icon: "📦", label: "กล่องเครื่องสำอาง", sub: "Luxury Cosmetic Box" },
  { bg: "linear-gradient(135deg,#085041,#053D31)", icon: "🛍️", label: "ถุงกระดาษแบรนด์ดัง", sub: "Premium Paper Bag" },
  { bg: "linear-gradient(135deg,#5DCAA5,#1D9E75)", icon: "🏷️", label: "ฉลากสินค้าอาหาร", sub: "Food Label Sticker" },
];

const trust = [
  { icon: "🚚", text: "ส่งทั่วประเทศ" },
  { icon: "🏅", text: "รับประกันคุณภาพ" },
  { icon: "🎨", text: "พิมพ์ตรงสี Pantone" },
  { icon: "🎧", text: "ทีมงานพร้อมให้คำปรึกษา" },
];

const steps = ["เลือกสินค้า", "ส่งไฟล์งาน", "อนุมัติ proof", "รับของ"];

function HeroBanner() {
  const [current, setCurrent] = useState(0);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const t = setInterval(() => {
      setFading(true);
      setTimeout(() => { setCurrent(c => (c + 1) % slides.length); setFading(false); }, 350);
    }, 5000);
    return () => clearInterval(t);
  }, []);

  function goTo(idx) {
    if (idx === current) return;
    setFading(true);
    setTimeout(() => { setCurrent(idx); setFading(false); }, 350);
  }

  const s = slides[current];

  return (
    <section style={{ position: "relative", overflow: "hidden", background: s.bg, transition: "background .6s ease" }}>
      {/* Decorative shapes */}
      <div style={{ position: "absolute", top: "-80px", right: "-80px", width: "360px", height: "360px", borderRadius: "50%", background: "rgba(255,255,255,0.04)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: "-60px", left: "30%", width: "240px", height: "240px", borderRadius: "50%", background: "rgba(255,255,255,0.03)", pointerEvents: "none" }} />

      <div style={{
        padding: "72px 48px 80px",
        display: "grid", gridTemplateColumns: "1fr 1fr",
        gap: "48px", alignItems: "center",
        maxWidth: "1200px", margin: "0 auto",
        opacity: fading ? 0 : 1,
        transform: fading ? "translateY(8px)" : "translateY(0)",
        transition: "opacity .35s ease, transform .35s ease",
      }}>
        {/* Text */}
        <div>
          <span style={{
            display: "inline-flex", alignItems: "center", gap: "6px",
            background: "rgba(255,255,255,0.15)", backdropFilter: "blur(6px)",
            color: "#fff", fontSize: "12px", padding: "5px 14px",
            borderRadius: "20px", marginBottom: "20px",
            border: "1px solid rgba(255,255,255,0.2)",
          }}>✦ {s.badge}</span>

          <h1 style={{
            color: "#fff", fontSize: "clamp(28px,4vw,46px)",
            fontWeight: 700, lineHeight: 1.3, marginBottom: "18px",
            whiteSpace: "pre-line", letterSpacing: "-0.5px",
          }}>{s.title}</h1>

          <p style={{
            color: "rgba(255,255,255,0.8)", fontSize: "15px",
            lineHeight: 1.9, marginBottom: "32px", whiteSpace: "pre-line",
          }}>{s.desc}</p>

          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            <Link to={s.cta.to} style={{
              background: "#fff", color: "#0F6E56",
              padding: "13px 30px", borderRadius: "30px",
              fontWeight: 700, fontSize: "14px", textDecoration: "none",
              boxShadow: "0 4px 16px rgba(0,0,0,0.15)",
              transition: "transform .15s, box-shadow .15s",
              display: "inline-block",
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.2)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 4px 16px rgba(0,0,0,0.15)"; }}
            >{s.cta.label}</Link>
            <Link to="/contact" style={{
              background: "rgba(255,255,255,0.15)", color: "#fff",
              padding: "13px 30px", borderRadius: "30px",
              fontSize: "14px", fontWeight: 600, textDecoration: "none",
              border: "1.5px solid rgba(255,255,255,0.4)",
              backdropFilter: "blur(6px)", transition: "background .15s",
              display: "inline-block",
            }}
              onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.25)"}
              onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.15)"}
            >ขอใบเสนอราคา</Link>
          </div>
        </div>

        {/* Visual */}
        <div style={{
          background: "rgba(255,255,255,0.1)", borderRadius: "24px",
          height: "280px", display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center",
          border: "1px solid rgba(255,255,255,0.18)",
          backdropFilter: "blur(6px)", gap: "12px",
          boxShadow: "inset 0 1px 0 rgba(255,255,255,0.2)",
        }}>
          <span style={{ fontSize: "88px", filter: "drop-shadow(0 8px 24px rgba(0,0,0,0.2))" }}>{s.icon}</span>
          <span style={{
            background: "rgba(255,255,255,0.15)", color: "#fff",
            fontSize: "12px", padding: "4px 14px", borderRadius: "16px",
          }}>{s.imgLabel}</span>
        </div>
      </div>

      {/* Controls */}
      <div style={{
        position: "absolute", bottom: "24px", left: "50%",
        transform: "translateX(-50%)",
        display: "flex", alignItems: "center", gap: "10px",
      }}>
        <button onClick={() => goTo((current - 1 + slides.length) % slides.length)} style={{
          width: "32px", height: "32px", borderRadius: "50%",
          background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.3)",
          color: "#fff", fontSize: "14px", cursor: "pointer",
          display: "flex", alignItems: "center", justifyContent: "center",
          backdropFilter: "blur(4px)",
        }}>‹</button>
        {slides.map((_, i) => (
          <button key={i} onClick={() => goTo(i)} style={{
            width: i === current ? "28px" : "8px", height: "8px",
            borderRadius: "4px", background: i === current ? "#fff" : "rgba(255,255,255,0.4)",
            border: "none", cursor: "pointer", padding: 0, transition: "all .35s ease",
          }} />
        ))}
        <button onClick={() => goTo((current + 1) % slides.length)} style={{
          width: "32px", height: "32px", borderRadius: "50%",
          background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.3)",
          color: "#fff", fontSize: "14px", cursor: "pointer",
          display: "flex", alignItems: "center", justifyContent: "center",
          backdropFilter: "blur(4px)",
        }}>›</button>
      </div>

      {/* Slide counter */}
      <div style={{
        position: "absolute", top: "20px", right: "48px",
        background: "rgba(0,0,0,0.2)", backdropFilter: "blur(4px)",
        color: "#fff", fontSize: "11px", padding: "4px 12px",
        borderRadius: "12px", border: "1px solid rgba(255,255,255,0.15)",
      }}>{current + 1} / {slides.length}</div>
    </section>
  );
}

export default function Home() {
  return (
    <main style={{ fontFamily: "'Sarabun', sans-serif" }}>
      <HeroBanner />

      {/* Trust Bar */}
      <section style={{
        background: "#fff", borderBottom: "1px solid #f0f0f0",
        padding: "0 40px",
      }}>
        <div style={{
          maxWidth: "960px", margin: "0 auto",
          display: "grid", gridTemplateColumns: "repeat(4,1fr)",
        }}>
          {trust.map(({ icon, text }, i) => (
            <div key={text} style={{
              display: "flex", alignItems: "center", gap: "10px",
              padding: "20px 16px", fontSize: "13px", fontWeight: 500,
              color: "#374151",
              borderRight: i < 3 ? "1px solid #f0f0f0" : "none",
            }}>
              <span style={{
                width: "36px", height: "36px", borderRadius: "10px",
                background: "#E1F5EE", display: "flex",
                alignItems: "center", justifyContent: "center", fontSize: "18px",
                flexShrink: 0,
              }}>{icon}</span>
              {text}
            </div>
          ))}
        </div>
      </section>

      {/* Products Section */}
      <section style={{ padding: "60px 40px", maxWidth: "1200px", margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "32px" }}>
          <div>
            <div style={{ fontSize: "12px", fontWeight: 700, color: "#1D9E75", letterSpacing: "1.5px", marginBottom: "6px" }}>PRODUCTS</div>
            <h2 style={{ fontSize: "clamp(20px,3vw,26px)", fontWeight: 700, color: "#1a1a1a", margin: 0 }}>สินค้าและบริการ</h2>
          </div>
          <Link to="/products" style={{ fontSize: "13px", color: "#1D9E75", textDecoration: "none", fontWeight: 600, display: "flex", alignItems: "center", gap: "4px" }}>
            ดูทั้งหมด →
          </Link>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "18px" }}>
          {productCategories.map(({ id, icon, name, desc, cat }) => (
            <Link to={`/products?cat=${encodeURIComponent(cat)}`} key={id} style={{ textDecoration: "none" }}>
              <div style={{
                background: "#fff", border: "1.5px solid #f0f0f0",
                borderRadius: "18px", overflow: "hidden",
                transition: "all .2s ease", cursor: "pointer",
              }}
                onMouseEnter={e => {
                  e.currentTarget.style.boxShadow = "0 12px 32px rgba(29,158,117,0.12)";
                  e.currentTarget.style.transform = "translateY(-4px)";
                  e.currentTarget.style.borderColor = "#9FE1CB";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.boxShadow = "none";
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.borderColor = "#f0f0f0";
                }}>
                <div style={{
                  background: "linear-gradient(135deg,#E1F5EE,#c8f0e0)",
                  height: "110px", display: "flex",
                  alignItems: "center", justifyContent: "center",
                }}>
                  <span style={{ fontSize: "48px" }}>{icon}</span>
                </div>
                <div style={{ padding: "16px" }}>
                  <div style={{ fontSize: "14px", fontWeight: 700, color: "#1a1a1a", marginBottom: "5px" }}>{name}</div>
                  <div style={{ fontSize: "12px", color: "#6b7280", lineHeight: 1.7 }}>{desc}</div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* How it Works + Quick Quote */}
      <section style={{ padding: "0 40px 60px", maxWidth: "1200px", margin: "0 auto" }}>
        <div style={{
          background: "linear-gradient(135deg,#053D31,#0F6E56)",
          borderRadius: "24px", padding: "48px",
          display: "grid", gridTemplateColumns: "1fr 300px", gap: "48px", alignItems: "center",
        }}>
          {/* Steps */}
          <div>
            <div style={{ fontSize: "12px", fontWeight: 700, color: "#9FE1CB", letterSpacing: "1.5px", marginBottom: "8px" }}>HOW IT WORKS</div>
            <h2 style={{ color: "#fff", fontSize: "clamp(18px,2.5vw,24px)", fontWeight: 700, marginBottom: "8px" }}>
              สั่งซื้อได้ง่ายๆ ไม่ต้องโทร
            </h2>
            <p style={{ color: "rgba(255,255,255,0.65)", fontSize: "13px", marginBottom: "28px" }}>
              แค่กรอกรายละเอียด เราติดต่อกลับภายใน 1 ชั่วโมง
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: "0", flexWrap: "wrap" }}>
              {steps.map((step, i) => (
                <div key={step} style={{ display: "flex", alignItems: "center" }}>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "6px" }}>
                    <div style={{
                      width: "40px", height: "40px", borderRadius: "50%",
                      background: "rgba(159,225,203,0.2)",
                      border: "2px solid rgba(159,225,203,0.5)",
                      color: "#9FE1CB", fontSize: "14px", fontWeight: 700,
                      display: "flex", alignItems: "center", justifyContent: "center",
                    }}>{i + 1}</div>
                    <span style={{ color: "rgba(255,255,255,0.8)", fontSize: "12px", fontWeight: 500 }}>{step}</span>
                  </div>
                  {i < 3 && <div style={{ width: "32px", height: "1px", background: "rgba(255,255,255,0.2)", margin: "0 4px", marginBottom: "18px" }} />}
                </div>
              ))}
            </div>
          </div>

          {/* Quick Quote */}
          <div style={{
            background: "rgba(255,255,255,0.07)",
            borderRadius: "16px", padding: "24px",
            border: "1px solid rgba(255,255,255,0.12)",
            backdropFilter: "blur(8px)",
          }}>
            <p style={{ color: "#9FE1CB", fontSize: "12px", fontWeight: 700, letterSpacing: "1px", marginBottom: "16px" }}>
              ขอใบเสนอราคาด่วน
            </p>
            {[
              { type: "text", placeholder: "ชื่อบริษัท / ลูกค้า" },
              { type: "tel",  placeholder: "เบอร์โทรติดต่อ" },
            ].map(({ type, placeholder }) => (
              <input key={placeholder} type={type} placeholder={placeholder} style={{
                display: "block", width: "100%", boxSizing: "border-box",
                background: "rgba(255,255,255,0.1)",
                border: "1px solid rgba(255,255,255,0.15)",
                borderRadius: "10px", padding: "10px 14px",
                color: "#fff", fontSize: "13px", marginBottom: "10px",
                outline: "none", fontFamily: "'Sarabun', sans-serif",
              }} />
            ))}
            <select style={{
              display: "block", width: "100%", boxSizing: "border-box",
              background: "rgba(255,255,255,0.1)",
              border: "1px solid rgba(255,255,255,0.15)",
              borderRadius: "10px", padding: "10px 14px",
              color: "rgba(255,255,255,0.7)", fontSize: "13px", marginBottom: "14px",
              outline: "none", fontFamily: "'Sarabun', sans-serif",
            }}>
              <option value="">เลือกประเภทสินค้า</option>
              <option>กล่องบรรจุภัณฑ์</option>
              <option>สติ๊กเกอร์และฉลาก</option>
              <option>ถุงกระดาษ</option>
              <option>แผ่นพับ / โบรชัวร์</option>
            </select>
            <Link to="/contact" style={{
              display: "block", textAlign: "center",
              background: "#1D9E75", color: "#fff",
              fontWeight: 700, fontSize: "13px",
              padding: "11px", borderRadius: "10px",
              textDecoration: "none", transition: "background .15s",
            }}
              onMouseEnter={e => e.currentTarget.style.background = "#16876400"}
              onMouseLeave={e => e.currentTarget.style.background = "#1D9E75"}
            >ส่งข้อมูล →</Link>
          </div>
        </div>
      </section>

      {/* Portfolio Preview */}
      <section style={{ padding: "0 40px 60px", maxWidth: "1200px", margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "28px" }}>
          <div>
            <div style={{ fontSize: "12px", fontWeight: 700, color: "#1D9E75", letterSpacing: "1.5px", marginBottom: "6px" }}>PORTFOLIO</div>
            <h2 style={{ fontSize: "clamp(20px,3vw,26px)", fontWeight: 700, color: "#1a1a1a", margin: 0 }}>ผลงานของเรา</h2>
          </div>
          <Link to="/portfolio" style={{ fontSize: "13px", color: "#1D9E75", textDecoration: "none", fontWeight: 600 }}>ดูทั้งหมด →</Link>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "18px" }}>
          {portfolio.map(({ bg, icon, label, sub }) => (
            <Link to="/portfolio" key={label} style={{ textDecoration: "none" }}>
              <div style={{ borderRadius: "18px", overflow: "hidden", border: "1.5px solid #f0f0f0", transition: "all .2s" }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 12px 32px rgba(0,0,0,0.1)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}>
                <div style={{ background: bg, height: "140px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <span style={{ fontSize: "56px", filter: "drop-shadow(0 4px 12px rgba(0,0,0,0.2))" }}>{icon}</span>
                </div>
                <div style={{ background: "#fff", padding: "14px 18px" }}>
                  <div style={{ fontSize: "14px", fontWeight: 700, color: "#1a1a1a", marginBottom: "2px" }}>{label}</div>
                  <div style={{ fontSize: "11px", color: "#9ca3af" }}>{sub}</div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Contact Bar */}
      <section style={{ background: "#F5F3EE", padding: "32px 40px", borderTop: "1px solid #e5e7eb" }}>
        <div style={{ maxWidth: "800px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "24px" }}>
          {[
            { icon: "📞", label: "โทรศัพท์", value: "02-408-5680", href: "tel:024085680" },
            { icon: "💬", label: "Line Official", value: "@udppackaging", href: "https://line.me/R/ti/p/@udppackaging" },
            { icon: "👍", label: "Facebook", value: "udp159", href: "https://facebook.com/udp159" },
          ].map(({ icon, label, value, href }) => (
            <a key={label} href={href} style={{ display: "flex", alignItems: "center", gap: "14px", textDecoration: "none" }}>
              <div style={{
                width: "46px", height: "46px", borderRadius: "13px",
                background: "#1D9E75", display: "flex",
                alignItems: "center", justifyContent: "center",
                fontSize: "20px", flexShrink: 0,
              }}>{icon}</div>
              <div>
                <div style={{ fontSize: "11px", color: "#6b7280", marginBottom: "2px" }}>{label}</div>
                <div style={{ fontSize: "14px", fontWeight: 700, color: "#053D31" }}>{value}</div>
              </div>
            </a>
          ))}
        </div>
      </section>
    </main>
  );
}