import { useState } from "react";
import { Link } from "react-router-dom";
import { sendEmail } from "../utils/sendEmail";

const inputStyle = {
  display: "block", width: "100%",
  border: "1px solid #e5e7eb", borderRadius: "8px",
  padding: "10px 14px", fontSize: "14px",
  color: "#1a1a1a", outline: "none",
  background: "#fff", boxSizing: "border-box",
  marginBottom: "14px",
  fontFamily: "'Sarabun', sans-serif",
  transition: "border-color .15s",
};

const productTypes = [
  "กล่องบรรจุภัณฑ์", "สติ๊กเกอร์และฉลาก",
  "ถุงกระดาษ", "แผ่นพับ / โบรชัวร์", "อื่นๆ",
];

export default function Contact() {
  const [form, setForm]       = useState({ name:"", company:"", tel:"", email:"", product:"", qty:"", detail:"" });
  const [focus, setFocus]     = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function handleChange(e) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try{
      const result = await sendEmail({ ...form });
      console.log("ส่งอีเมลสำเร็จ:", result);
      setSubmitted(true);
    }catch(err){
      console.error("ส่งอีเมลไม่สำเร็จ:", err);
      setError("เกิดข้อผิดพลาดในการส่งข้อมูล กรุณาลองใหม่อีกครั้งหรือโทร 02-408-5680");
    }finally {
      setLoading(false);
    }
    /* TODO: เชื่อม API จริง เช่น EmailJS หรือ backend endpoint */
    // setTimeout(() => { setLoading(false); setSubmitted(true); }, 1200);
    
  }

  const field = (name, placeholder, type = "text") => ({
    name, type, placeholder, value: form[name],
    onChange: handleChange,
    onFocus:  () => setFocus(name),
    onBlur:   () => setFocus(""),
    style: { ...inputStyle, borderColor: focus === name ? "#1D9E75" : "#e5e7eb",
             boxShadow: focus === name ? "0 0 0 3px rgba(29,158,117,0.1)" : "none" },
  });

  return (
    <main style={{ fontFamily: "'Sarabun', sans-serif" }}>

      {/* ── Hero ── */}
      <section style={{
        background: "linear-gradient(135deg,#053D31 0%,#1D9E75 100%)",
        padding: "48px 40px", textAlign: "center",
      }}>
        <h1 style={{ color:"#fff", fontSize:"28px", fontWeight:600, marginBottom:"8px" }}>
          ติดต่อและขอใบเสนอราคา
        </h1>
        <p style={{ color:"rgba(255,255,255,0.75)", fontSize:"14px" }}>
          กรอกรายละเอียด เราติดต่อกลับภายใน 1 ชั่วโมงในวันทำการ
        </p>
      </section>

      <section style={{ padding:"48px 40px", display:"grid", gridTemplateColumns:"1fr 380px", gap:"40px", alignItems:"start" }}>

        {/* ── Form ── */}
        {submitted ? (
          <div style={{ textAlign:"center", padding:"60px 0" }}>
            <div style={{ fontSize:"56px", marginBottom:"16px" }}>✅</div>
            <h2 style={{ fontSize:"22px", fontWeight:600, color:"#085041", marginBottom:"8px" }}>ส่งข้อมูลเรียบร้อยแล้ว!</h2>
            <p style={{ color:"#6b7280", fontSize:"14px", marginBottom:"24px" }}>
              ทีมงานจะติดต่อกลับที่เบอร์ <strong>{form.tel}</strong> ภายใน 1 ชั่วโมง
            </p>
            <button onClick={() => { setSubmitted(false); setForm({ name:"",company:"",tel:"",email:"",product:"",qty:"",detail:"" }); }} style={{
              background:"#1D9E75", color:"#fff", border:"none",
              padding:"12px 28px", borderRadius:"28px",
              fontSize:"14px", fontWeight:600, cursor:"pointer",
            }}>ส่งข้อมูลใหม่</button>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <h2 style={{ fontSize:"18px", fontWeight:600, color:"#1a1a1a", marginBottom:"24px" }}>
              ฟอร์มขอใบเสนอราคา
            </h2>

            {/* Row: ชื่อ + บริษัท */}
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"12px" }}>
              <div>
                <label style={{ fontSize:"13px", fontWeight:500, color:"#374151", display:"block", marginBottom:"6px" }}>
                  ชื่อ-นามสกุล <span style={{ color:"#ef4444" }}>*</span>
                </label>
                <input {...field("name","สมชาย ใจดี")} required />
              </div>
              <div>
                <label style={{ fontSize:"13px", fontWeight:500, color:"#374151", display:"block", marginBottom:"6px" }}>
                  ชื่อบริษัท / แบรนด์
                </label>
                <input {...field("company","บริษัท ABC จำกัด")} />
              </div>
            </div>

            {/* Row: เบอร์ + email */}
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"12px" }}>
              <div>
                <label style={{ fontSize:"13px", fontWeight:500, color:"#374151", display:"block", marginBottom:"6px" }}>
                  เบอร์โทรศัพท์ <span style={{ color:"#ef4444" }}>*</span>
                </label>
                <input {...field("tel","08x-xxx-xxxx","tel")} required />
              </div>
              <div>
                <label style={{ fontSize:"13px", fontWeight:500, color:"#374151", display:"block", marginBottom:"6px" }}>
                  อีเมล
                </label>
                <input {...field("email","example@email.com","email")} />
              </div>
            </div>

            {/* ประเภทสินค้า */}
            <label style={{ fontSize:"13px", fontWeight:500, color:"#374151", display:"block", marginBottom:"6px" }}>
              ประเภทสินค้าที่ต้องการ <span style={{ color:"#ef4444" }}>*</span>
            </label>
            <select name="product" required value={form.product} onChange={handleChange}
              onFocus={() => setFocus("product")} onBlur={() => setFocus("")}
              style={{ ...inputStyle, borderColor: focus==="product" ? "#1D9E75" : "#e5e7eb",
                       boxShadow: focus==="product" ? "0 0 0 3px rgba(29,158,117,0.1)" : "none",
                       color: form.product ? "#1a1a1a" : "#9ca3af" }}>
              <option value="" disabled>เลือกประเภทสินค้า</option>
              {productTypes.map(p => <option key={p} value={p}>{p}</option>)}
            </select>

            {/* จำนวน */}
            <label style={{ fontSize:"13px", fontWeight:500, color:"#374151", display:"block", marginBottom:"6px" }}>
              ปริมาณที่ต้องการ (MOQ)
            </label>
            <input {...field("qty","เช่น 500 ใบ, 1,000 ดวง")} />

            {/* รายละเอียด */}
            <label style={{ fontSize:"13px", fontWeight:500, color:"#374151", display:"block", marginBottom:"6px" }}>
              รายละเอียดเพิ่มเติม
            </label>
            <textarea name="detail" placeholder="ขนาด สี วัสดุ หรือรายละเอียดงานที่ต้องการ..."
              value={form.detail} onChange={handleChange}
              onFocus={() => setFocus("detail")} onBlur={() => setFocus("")}
              rows={4}
              style={{ ...inputStyle, resize:"vertical", lineHeight:1.6,
                       borderColor: focus==="detail" ? "#1D9E75" : "#e5e7eb",
                       boxShadow: focus==="detail" ? "0 0 0 3px rgba(29,158,117,0.1)" : "none" }}
            />

            {/* Submit */}
            <button type="submit" disabled={loading} style={{
              width:"100%", background: loading ? "#9FE1CB" : "#1D9E75",
              color:"#fff", border:"none", padding:"13px",
              borderRadius:"10px", fontSize:"15px", fontWeight:600,
              cursor: loading ? "not-allowed" : "pointer",
              transition:"background .2s",
            }}>
              {loading ? "กำลังส่ง..." : "ส่งข้อมูลขอใบเสนอราคา →"}
            </button>

            <p style={{ fontSize:"12px", color:"#9ca3af", textAlign:"center", marginTop:"12px" }}>
              * เราจะไม่นำข้อมูลของคุณไปใช้เพื่อวัตถุประสงค์อื่น
            </p>
          </form>
        )}

        {/* ── Sidebar ── */}
        <div>

          {/* ข้อมูลติดต่อ */}
          <div style={{ background:"#F5F3EE", borderRadius:"16px", padding:"24px", marginBottom:"16px" }}>
            <h3 style={{ fontSize:"15px", fontWeight:600, color:"#1a1a1a", marginBottom:"16px" }}>ข้อมูลติดต่อ</h3>
            {[
              { icon:"📞", label:"โทรศัพท์",      value:"02-408-5680",    href:"tel:024085680" },
              { icon:"💬", label:"Line Official",  value:"@udppackaging",  href:"https://line.me/R/ti/p/@udppackaging" },
              { icon:"👍", label:"Facebook",       value:"UDP Packaging",  href:"https://facebook.com/udp159" },
              { icon:"📧", label:"อีเมล",          value:"info@udppackaging.com", href:"mailto:info@udppackaging.com" },
              { icon:"🕐", label:"เวลาทำการ",      value:"จ–ศ 8:00–17:00 น." },
            ].map(({ icon, label, value, href }) => (
              <div key={label} style={{ display:"flex", gap:"12px", marginBottom:"14px", alignItems:"flex-start" }}>
                <div style={{ width:"36px", height:"36px", borderRadius:"10px", background:"#1D9E75", display:"flex", alignItems:"center", justifyContent:"center", fontSize:"18px", flexShrink:0 }}>
                  {icon}
                </div>
                <div>
                  <div style={{ fontSize:"11px", color:"#9ca3af" }}>{label}</div>
                  {href
                    ? <a href={href} style={{ fontSize:"13px", fontWeight:500, color:"#1D9E75", textDecoration:"none" }}>{value}</a>
                    : <div style={{ fontSize:"13px", fontWeight:500, color:"#1a1a1a" }}>{value}</div>
                  }
                </div>
              </div>
            ))}
          </div>

          {/* ที่อยู่ */}
          <div style={{ background:"#E1F5EE", borderRadius:"16px", padding:"24px", marginBottom:"16px" }}>
            <h3 style={{ fontSize:"15px", fontWeight:600, color:"#085041", marginBottom:"10px" }}>📍 ที่อยู่บริษัท</h3>
            <p style={{ fontSize:"13px", color:"#374151", lineHeight:1.8 }}>
              บริษัท ยูดีพี แพ็คเกจจิ้ง จำกัด<br/>
              {/* TODO: ใส่ที่อยู่จริงของบริษัท */}
              {/* กรุณาอัปเดตที่อยู่จริงที่นี่ */}
              กรุงเทพมหานคร
            </p>
            <a href="https://maps.google.com" target="_blank" rel="noreferrer" style={{
              display:"inline-block", marginTop:"10px",
              fontSize:"12px", color:"#1D9E75", textDecoration:"none", fontWeight:500,
            }}>ดูแผนที่ Google Maps →</a>
          </div>

          {/* Why us */}
          <div style={{ border:"1px solid #e5e7eb", borderRadius:"16px", padding:"24px" }}>
            <h3 style={{ fontSize:"15px", fontWeight:600, color:"#1a1a1a", marginBottom:"14px" }}>ทำไมต้องเลือก UDP?</h3>
            {[
              "ตอบกลับภายใน 1 ชั่วโมง",
              "ส่ง proof ให้อนุมัติก่อนพิมพ์จริง",
              "MOQ ต่ำ เหมาะทั้งรายเล็กและรายใหญ่",
              "รับประกันตรงสี ตรงแบบ 100%",
            ].map(txt => (
              <div key={txt} style={{ display:"flex", alignItems:"center", gap:"8px", marginBottom:"10px" }}>
                <div style={{ width:"20px", height:"20px", borderRadius:"50%", background:"#E1F5EE", display:"flex", alignItems:"center", justifyContent:"center", fontSize:"11px", flexShrink:0 }}>✓</div>
                <span style={{ fontSize:"13px", color:"#374151" }}>{txt}</span>
              </div>
            ))}
          </div>

        </div>
      </section>
    </main>
  );
}