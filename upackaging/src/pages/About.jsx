import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

const milestones = [
  { year: "2548", label: "ก่อตั้งบริษัท", desc: "เริ่มต้นธุรกิจสิ่งพิมพ์และบรรจุภัณฑ์ในกรุงเทพมหานคร" },
  { year: "2553", label: "ขยายกำลังผลิต", desc: "เพิ่มเครื่องพิมพ์ออฟเซ็ทและสายการผลิตกล่องบรรจุภัณฑ์" },
  { year: "2558", label: "ISO & คุณภาพ", desc: "ยกระดับมาตรฐานการผลิตและระบบควบคุมคุณภาพ" },
  { year: "2563", label: "ดิจิทัล & อีคอมเมิร์ซ", desc: "รองรับลูกค้าออนไลน์และขยายบริการพิมพ์ดิจิทัล" },
  { year: "2568", label: "ปัจจุบัน", desc: "ให้บริการลูกค้ากว่า 500 ราย ทั้งในและต่างประเทศ" },
];

const values = [
  { icon: "🎯", title: "ตรงต่อเวลา", desc: "ส่งมอบงานตามกำหนด ไม่ให้ลูกค้ารอ" },
  { icon: "🎨", title: "คุณภาพสูง", desc: "ตรงสี ตรงแบบ รับประกันทุกชิ้นงาน" },
  { icon: "💬", title: "บริการดีเยี่ยม", desc: "ตอบกลับภายใน 1 ชั่วโมง ดูแลตั้งแต่เริ่มต้นจนส่งมอบ" },
  { icon: "🌱", title: "ใส่ใจสิ่งแวดล้อม", desc: "เลือกใช้วัสดุ eco-friendly และกระบวนการผลิตที่ยั่งยืน" },
];

const stats = [
  { num: "500+", label: "ลูกค้าที่ไว้วางใจ" },
  { num: "20+", label: "ปีประสบการณ์" },
  { num: "1M+", label: "ชิ้นงานที่ผลิต/ปี" },
  { num: "1 ชม.", label: "ตอบกลับใบเสนอราคา" },
];

const team = [
  { name: "ทีมออกแบบ", role: "Graphic & Structural Design", icon: "🎨", desc: "นักออกแบบมืออาชีพ ช่วยพัฒนา artwork และโครงสร้างกล่องให้ตรงแบรนด์" },
  { name: "ทีมการผลิต", role: "Production & Quality Control", icon: "🏭", desc: "ควบคุมคุณภาพทุกขั้นตอน ตั้งแต่ pre-press จนถึงบรรจุภัณฑ์สำเร็จ" },
  { name: "ทีมขายและบริการ", role: "Sales & Customer Service", icon: "🤝", desc: "พร้อมให้คำปรึกษาและส่งใบเสนอราคาภายใน 1 ชั่วโมงในวันทำการ" },
];

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
}

function FadeIn({ children, delay = 0, style = {} }) {
  const [ref, inView] = useInView();
  return (
    <div ref={ref} style={{
      opacity: inView ? 1 : 0,
      transform: inView ? "translateY(0)" : "translateY(28px)",
      transition: `opacity 0.6s ease ${delay}s, transform 0.6s ease ${delay}s`,
      ...style,
    }}>
      {children}
    </div>
  );
}

export default function About() {
  return (
    <main style={{ fontFamily: "'Sarabun', sans-serif", color: "#1a1a1a", overflowX: "hidden" }}>

      {/* ── Hero ── */}
      <section style={{
        background: "linear-gradient(135deg, #053D31 0%, #0F6E56 60%, #1D9E75 100%)",
        padding: "72px 40px 80px",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
      }}>
        {/* decorative circles */}
        <div style={{ position:"absolute", top:"-60px", right:"-60px", width:"280px", height:"280px", borderRadius:"50%", background:"rgba(255,255,255,0.04)", pointerEvents:"none" }} />
        <div style={{ position:"absolute", bottom:"-80px", left:"-40px", width:"220px", height:"220px", borderRadius:"50%", background:"rgba(255,255,255,0.04)", pointerEvents:"none" }} />

        <div style={{ position:"relative" }}>
          <span style={{ display:"inline-block", background:"rgba(255,255,255,0.12)", color:"#9FE1CB", fontSize:"12px", fontWeight:600, padding:"5px 16px", borderRadius:"20px", letterSpacing:"1.5px", marginBottom:"18px" }}>
            ABOUT US
          </span>
          <h1 style={{ color:"#fff", fontSize:"clamp(26px,4vw,40px)", fontWeight:700, lineHeight:1.3, marginBottom:"16px" }}>
            บริษัท ยูดีพี แพ็คเกจจิ้ง จำกัด
          </h1>
          <p style={{ color:"rgba(255,255,255,0.8)", fontSize:"15px", maxWidth:"560px", margin:"0 auto 32px", lineHeight:1.9 }}>
            ผู้เชี่ยวชาญด้านสิ่งพิมพ์และบรรจุภัณฑ์ครบวงจร ด้วยประสบการณ์กว่า 20 ปี
            เราพร้อมช่วยให้แบรนด์ของคุณโดดเด่นด้วยบรรจุภัณฑ์คุณภาพสูง
          </p>
          <div style={{ display:"flex", gap:"12px", justifyContent:"center", flexWrap:"wrap" }}>
            <Link to="/contact" style={{ background:"#fff", color:"#0F6E56", padding:"12px 28px", borderRadius:"28px", textDecoration:"none", fontWeight:700, fontSize:"14px" }}>
              ขอใบเสนอราคา →
            </Link>
            <Link to="/portfolio" style={{ background:"transparent", color:"#fff", padding:"12px 28px", borderRadius:"28px", textDecoration:"none", fontWeight:600, fontSize:"14px", border:"1.5px solid rgba(255,255,255,0.4)" }}>
              ดูผลงาน
            </Link>
          </div>
        </div>
      </section>

      {/* ── Stats bar ── */}
      <section style={{ background:"#fff", borderBottom:"1px solid #f0f0f0" }}>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", maxWidth:"860px", margin:"0 auto" }}>
          {stats.map(({ num, label }, i) => (
            <FadeIn key={label} delay={i * 0.1}>
              <div style={{ padding:"28px 16px", textAlign:"center", borderRight: i < 3 ? "1px solid #f0f0f0" : "none" }}>
                <div style={{ fontSize:"clamp(22px,3vw,32px)", fontWeight:700, color:"#1D9E75", marginBottom:"4px" }}>{num}</div>
                <div style={{ fontSize:"12px", color:"#6b7280" }}>{label}</div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* ── Who we are ── */}
      <section style={{ padding:"64px 40px", maxWidth:"960px", margin:"0 auto" }}>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"56px", alignItems:"center" }}>

          <FadeIn>
            <div>
              <span style={{ fontSize:"12px", fontWeight:600, color:"#1D9E75", letterSpacing:"1.5px" }}>WHO WE ARE</span>
              <h2 style={{ fontSize:"clamp(20px,3vw,28px)", fontWeight:700, color:"#053D31", marginTop:"8px", marginBottom:"20px", lineHeight:1.4 }}>
                พันธมิตรด้านบรรจุภัณฑ์<br/>ที่คุณไว้วางใจได้
              </h2>
              <p style={{ color:"#374151", fontSize:"14px", lineHeight:1.9, marginBottom:"16px" }}>
                UDP Packaging ก่อตั้งขึ้นด้วยความมุ่งมั่นที่จะเป็นผู้ให้บริการด้านสิ่งพิมพ์และบรรจุภัณฑ์
                ที่ครบวงจรและมีคุณภาพสูงสุดสำหรับธุรกิจทุกขนาด ตั้งแต่ SME ไปจนถึงองค์กรขนาดใหญ่
              </p>
              <p style={{ color:"#374151", fontSize:"14px", lineHeight:1.9, marginBottom:"24px" }}>
                เราเชื่อว่าบรรจุภัณฑ์ที่ดีไม่ใช่แค่ "กล่อง" — มันคือประสบการณ์แรกที่ลูกค้าของคุณ
                จะสัมผัสได้กับแบรนด์ของคุณ เราจึงใส่ใจทุกรายละเอียดตั้งแต่การออกแบบ วัสดุ ไปจนถึงการส่งมอบ
              </p>
              <div style={{ display:"flex", gap:"10px", flexWrap:"wrap" }}>
                {["พิมพ์ออฟเซ็ท", "พิมพ์ดิจิทัล", "กล่องบรรจุภัณฑ์", "สติ๊กเกอร์", "ถุงกระดาษ", "แผ่นพับ"].map(tag => (
                  <span key={tag} style={{ background:"#E1F5EE", color:"#085041", fontSize:"12px", fontWeight:500, padding:"5px 12px", borderRadius:"16px" }}>{tag}</span>
                ))}
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            {/* visual block แทนรูปจริง */}
            <div style={{ borderRadius:"20px", overflow:"hidden", background:"linear-gradient(135deg,#E1F5EE,#9FE1CB)", padding:"40px", display:"grid", gridTemplateColumns:"1fr 1fr", gap:"12px" }}>
              {["📦","🏷️","🛍️","📄","🍱","📒"].map((icon, i) => (
                <div key={i} style={{
                  background:"#fff", borderRadius:"14px", padding:"20px",
                  display:"flex", alignItems:"center", justifyContent:"center",
                  fontSize:"32px", aspectRatio:"1",
                  boxShadow:"0 4px 12px rgba(5,61,49,0.08)",
                }}>
                  {icon}
                </div>
              ))}
            </div>
          </FadeIn>

        </div>
      </section>

      {/* ── Values ── */}
      <section style={{ background:"#F9F9F7", padding:"64px 40px" }}>
        <div style={{ maxWidth:"960px", margin:"0 auto" }}>
          <FadeIn>
            <div style={{ textAlign:"center", marginBottom:"40px" }}>
              <span style={{ fontSize:"12px", fontWeight:600, color:"#1D9E75", letterSpacing:"1.5px" }}>OUR VALUES</span>
              <h2 style={{ fontSize:"clamp(20px,3vw,26px)", fontWeight:700, color:"#053D31", marginTop:"8px" }}>สิ่งที่เราให้ความสำคัญ</h2>
            </div>
          </FadeIn>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:"16px" }}>
            {values.map(({ icon, title, desc }, i) => (
              <FadeIn key={title} delay={i * 0.1}>
                <div style={{ background:"#fff", borderRadius:"16px", padding:"28px 20px", border:"1px solid #e5e7eb", textAlign:"center", height:"100%", boxSizing:"border-box" }}>
                  <div style={{ fontSize:"36px", marginBottom:"12px" }}>{icon}</div>
                  <div style={{ fontSize:"15px", fontWeight:700, color:"#053D31", marginBottom:"8px" }}>{title}</div>
                  <div style={{ fontSize:"13px", color:"#6b7280", lineHeight:1.7 }}>{desc}</div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── Timeline ── */}
      <section style={{ padding:"64px 40px", maxWidth:"720px", margin:"0 auto" }}>
        <FadeIn>
          <div style={{ textAlign:"center", marginBottom:"48px" }}>
            <span style={{ fontSize:"12px", fontWeight:600, color:"#1D9E75", letterSpacing:"1.5px" }}>OUR JOURNEY</span>
            <h2 style={{ fontSize:"clamp(20px,3vw,26px)", fontWeight:700, color:"#053D31", marginTop:"8px" }}>เส้นทางของเรา</h2>
          </div>
        </FadeIn>
        <div style={{ position:"relative" }}>
          {/* vertical line */}
          <div style={{ position:"absolute", left:"50%", top:0, bottom:0, width:"2px", background:"#E1F5EE", transform:"translateX(-50%)" }} />
          {milestones.map(({ year, label, desc }, i) => {
            const isLeft = i % 2 === 0;
            return (
              <FadeIn key={year} delay={i * 0.12}>
                <div style={{ display:"flex", justifyContent: isLeft ? "flex-end" : "flex-start", paddingBottom:"36px", position:"relative" }}>
                  {/* dot */}
                  <div style={{ position:"absolute", left:"50%", top:"16px", width:"14px", height:"14px", borderRadius:"50%", background:"#1D9E75", border:"3px solid #ffffff", transform:"translateX(-50%)", zIndex:1, boxShadow:"0 0 0 3px #E1F5EE" }} />
                  <div style={{
                    width:"44%",
                    background:"#fff", border:"1px solid #e5e7eb", borderRadius:"14px",
                    padding:"16px 20px",
                    marginRight: isLeft ? "8%" : 0,
                    marginLeft: isLeft ? 0 : "8%",
                    boxShadow:"0 2px 12px rgba(0,0,0,0.05)",
                  }}>
                    <div style={{ fontSize:"13px", fontWeight:700, color:"#1D9E75", marginBottom:"4px" }}>{year}</div>
                    <div style={{ fontSize:"14px", fontWeight:600, color:"#053D31", marginBottom:"4px" }}>{label}</div>
                    <div style={{ fontSize:"12px", color:"#6b7280", lineHeight:1.7 }}>{desc}</div>
                  </div>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </section>

      {/* ── Team ── */}
      <section style={{ background:"#F9F9F7", padding:"64px 40px" }}>
        <div style={{ maxWidth:"960px", margin:"0 auto" }}>
          <FadeIn>
            <div style={{ textAlign:"center", marginBottom:"40px" }}>
              <span style={{ fontSize:"12px", fontWeight:600, color:"#1D9E75", letterSpacing:"1.5px" }}>OUR TEAM</span>
              <h2 style={{ fontSize:"clamp(20px,3vw,26px)", fontWeight:700, color:"#053D31", marginTop:"8px" }}>ทีมงานมืออาชีพ</h2>
            </div>
          </FadeIn>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:"18px" }}>
            {team.map(({ name, role, icon, desc }, i) => (
              <FadeIn key={name} delay={i * 0.12}>
                <div style={{ background:"#fff", borderRadius:"16px", padding:"28px 24px", border:"1px solid #e5e7eb", textAlign:"center" }}>
                  <div style={{ width:"64px", height:"64px", borderRadius:"50%", background:"linear-gradient(135deg,#053D31,#1D9E75)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:"28px", margin:"0 auto 16px" }}>
                    {icon}
                  </div>
                  <div style={{ fontSize:"15px", fontWeight:700, color:"#053D31", marginBottom:"4px" }}>{name}</div>
                  <div style={{ fontSize:"11px", color:"#1D9E75", fontWeight:600, marginBottom:"12px", letterSpacing:"0.5px" }}>{role}</div>
                  <div style={{ fontSize:"13px", color:"#6b7280", lineHeight:1.7 }}>{desc}</div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why UDP ── */}
      <section style={{ padding:"64px 40px", maxWidth:"960px", margin:"0 auto" }}>
        <FadeIn>
          <div style={{ textAlign:"center", marginBottom:"40px" }}>
            <span style={{ fontSize:"12px", fontWeight:600, color:"#1D9E75", letterSpacing:"1.5px" }}>WHY UDP</span>
            <h2 style={{ fontSize:"clamp(20px,3vw,26px)", fontWeight:700, color:"#053D31", marginTop:"8px" }}>ทำไมต้องเลือก UDP Packaging?</h2>
          </div>
        </FadeIn>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"14px" }}>
          {[
            { icon:"⚡", title:"ตอบกลับรวดเร็ว", desc:"ส่งใบเสนอราคาภายใน 1 ชั่วโมงในวันทำการ ไม่ต้องรอนาน" },
            { icon:"🖨️", title:"ครบทุกบริการในที่เดียว", desc:"ออกแบบ พิมพ์ ตัด เคลือบ และส่งมอบ ดูแลให้ครบจบที่เดียว" },
            { icon:"📐", title:"MOQ ยืดหยุ่น", desc:"รับงานตั้งแต่ล็อตเล็กถึงล็อตใหญ่ เหมาะทั้ง startup และองค์กร" },
            { icon:"✅", title:"รับประกันคุณภาพ", desc:"ส่ง proof ให้อนุมัติก่อนพิมพ์จริง รับประกันตรงสีตรงแบบ 100%" },
            { icon:"🌿", title:"วัสดุ Eco-Friendly", desc:"มีตัวเลือกวัสดุที่เป็นมิตรกับสิ่งแวดล้อม สำหรับแบรนด์ที่ใส่ใจโลก" },
            { icon:"🤝", title:"ดูแลหลังการขาย", desc:"ทีมงานพร้อมให้คำแนะนำและแก้ไขปัญหาตลอดระยะเวลาที่ทำงานร่วมกัน" },
          ].map(({ icon, title, desc }, i) => (
            <FadeIn key={title} delay={i * 0.08}>
              <div style={{ display:"flex", gap:"14px", background:"#fff", border:"1px solid #e5e7eb", borderRadius:"14px", padding:"20px", alignItems:"flex-start" }}>
                <div style={{ width:"40px", height:"40px", borderRadius:"10px", background:"#E1F5EE", display:"flex", alignItems:"center", justifyContent:"center", fontSize:"20px", flexShrink:0 }}>
                  {icon}
                </div>
                <div>
                  <div style={{ fontSize:"14px", fontWeight:700, color:"#053D31", marginBottom:"4px" }}>{title}</div>
                  <div style={{ fontSize:"12px", color:"#6b7280", lineHeight:1.7 }}>{desc}</div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ background:"linear-gradient(135deg,#053D31,#1D9E75)", padding:"56px 40px", textAlign:"center" }}>
        <FadeIn>
          <h2 style={{ color:"#fff", fontSize:"clamp(20px,3vw,28px)", fontWeight:700, marginBottom:"12px" }}>
            พร้อมเริ่มต้นกับเราแล้วหรือยัง?
          </h2>
          <p style={{ color:"rgba(255,255,255,0.8)", fontSize:"14px", marginBottom:"28px" }}>
            ส่งข้อมูลมาให้เรา แล้วทีมงานจะส่งใบเสนอราคาให้ภายใน 1 ชั่วโมง
          </p>
          <div style={{ display:"flex", gap:"12px", justifyContent:"center", flexWrap:"wrap" }}>
            <Link to="/contact" style={{ background:"#fff", color:"#0F6E56", padding:"13px 32px", borderRadius:"28px", textDecoration:"none", fontWeight:700, fontSize:"14px" }}>
              ติดต่อเราเลย →
            </Link>
            <Link to="/products" style={{ background:"transparent", color:"#fff", padding:"13px 32px", borderRadius:"28px", textDecoration:"none", fontWeight:600, fontSize:"14px", border:"1.5px solid rgba(255,255,255,0.4)" }}>
              ดูสินค้าทั้งหมด
            </Link>
          </div>
        </FadeIn>
      </section>

    </main>
  );
}