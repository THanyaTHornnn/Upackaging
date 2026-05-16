import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../store/cartStore";
import { sendEmail } from "../utils/sendEmail";

const baseInput = { display:"block", width:"100%", border:"1px solid #e5e7eb", borderRadius:"8px", padding:"10px 14px", fontSize:"14px", color:"#1a1a1a", outline:"none", background:"#fff", boxSizing:"border-box", marginBottom:"14px", fontFamily:"'Sarabun',sans-serif", transition:"border-color .15s, box-shadow .15s" };
const focusStyle = { borderColor:"#1D9E75", boxShadow:"0 0 0 3px rgba(29,158,117,0.1)" };

export default function Checkout() {
  const { items, clearCart, totalItems } = useCart();
  const navigate = useNavigate();
  const [focus, setFocus]     = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState("");
  const [form, setForm] = useState({ name:"", company:"", tel:"", email:"", address:"", detail:"" });

  const inp = (name) => ({
    name, value: form[name],
    onChange: e => setForm(p => ({ ...p, [e.target.name]: e.target.value })),
    onFocus: () => setFocus(name), onBlur: () => setFocus(""),
    style: { ...baseInput, ...(focus === name ? focusStyle : {}) },
  });

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true); setError("");
    const itemList = items.map(({ product, qty, options }) =>
      `• ${product.name}${options.length ? ` (${options.join(", ")})` : ""} × ${qty}`
    ).join("\n");
    console.log("กำลังส่ง...", {
    service:  import.meta.env.VITE_EMAILJS_SERVICE_ID,
    template: import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
    key:      import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
  });
    try {
      await sendEmail({ ...form, product: `รายการสั่งซื้อ:\n${itemList}`, qty: `${totalItems} รายการ`, detail: form.detail || form.address });
      clearCart();
      navigate("/checkout/success");
    } catch {
      setError("ส่งข้อมูลไม่สำเร็จ กรุณาลองใหม่หรือโทร 02-408-5680");
    } finally {
      setLoading(false);
    }
  }

  if (items.length === 0) return (
    <main style={{ fontFamily:"'Sarabun',sans-serif", padding:"80px 40px", textAlign:"center" }}>
      <div style={{ fontSize:"52px", marginBottom:"16px" }}>🛒</div>
      <h2 style={{ fontSize:"20px", fontWeight:600, color:"#1a1a1a", marginBottom:"16px" }}>ไม่มีสินค้าในตะกร้า</h2>
      <Link to="/products" style={{ background:"#1D9E75", color:"#fff", padding:"12px 28px", borderRadius:"28px", textDecoration:"none", fontWeight:600, fontSize:"14px" }}>กลับไปเลือกสินค้า</Link>
    </main>
  );

  return (
    <main style={{ fontFamily:"'Sarabun',sans-serif" }}>
      <section style={{ background:"linear-gradient(135deg,#053D31,#1D9E75)", padding:"40px", textAlign:"center" }}>
        <h1 style={{ color:"#fff", fontSize:"26px", fontWeight:600, marginBottom:"6px" }}>ยืนยันการสั่งซื้อ</h1>
        <p style={{ color:"rgba(255,255,255,0.75)", fontSize:"14px" }}>กรอกข้อมูล แล้วเราจะส่งใบเสนอราคาให้ภายใน 1 ชั่วโมง</p>
      </section>

      {/* Steps */}
      <div style={{ background:"#F9F9F7", borderBottom:"1px solid #e5e7eb", padding:"16px 40px", display:"flex", justifyContent:"center", alignItems:"center", gap:"0" }}>
        {[["🛒","ตะกร้า"], ["📋","กรอกข้อมูล"], ["✅","เสร็จสิ้น"]].map(([icon, label], i) => (
          <div key={label} style={{ display:"flex", alignItems:"center" }}>
            <div style={{ display:"flex", alignItems:"center", gap:"6px" }}>
              <div style={{ width:"28px", height:"28px", borderRadius:"50%", background: i === 1 ? "#1D9E75" : i < 1 ? "#9FE1CB" : "#e5e7eb", display:"flex", alignItems:"center", justifyContent:"center", fontSize:"13px" }}>{icon}</div>
              <span style={{ fontSize:"13px", fontWeight: i === 1 ? 600 : 400, color: i === 1 ? "#085041" : "#9ca3af" }}>{label}</span>
            </div>
            {i < 2 && <span style={{ color:"#d1d5db", margin:"0 12px", fontSize:"18px" }}>→</span>}
          </div>
        ))}
      </div>

      <div style={{ padding:"40px", display:"grid", gridTemplateColumns:"1fr 340px", gap:"40px", alignItems:"start" }}>
        <form onSubmit={handleSubmit}>
          <h2 style={{ fontSize:"17px", fontWeight:600, color:"#1a1a1a", marginBottom:"20px" }}>ข้อมูลผู้สั่งซื้อ</h2>

          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"12px" }}>
            <div>
              <label style={{ fontSize:"13px", fontWeight:500, color:"#374151", display:"block", marginBottom:"6px" }}>ชื่อ-นามสกุล <span style={{ color:"#ef4444" }}>*</span></label>
              <input {...inp("name")} required placeholder="สมชาย ใจดี" />
            </div>
            <div>
              <label style={{ fontSize:"13px", fontWeight:500, color:"#374151", display:"block", marginBottom:"6px" }}>ชื่อบริษัท / แบรนด์</label>
              <input {...inp("company")} placeholder="บริษัท ABC จำกัด" />
            </div>
          </div>

          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"12px" }}>
            <div>
              <label style={{ fontSize:"13px", fontWeight:500, color:"#374151", display:"block", marginBottom:"6px" }}>เบอร์โทรศัพท์ <span style={{ color:"#ef4444" }}>*</span></label>
              <input {...inp("tel")} type="tel" required placeholder="08x-xxx-xxxx" />
            </div>
            <div>
              <label style={{ fontSize:"13px", fontWeight:500, color:"#374151", display:"block", marginBottom:"6px" }}>อีเมล</label>
              <input {...inp("email")} type="email" placeholder="example@email.com" />
            </div>
          </div>

          <label style={{ fontSize:"13px", fontWeight:500, color:"#374151", display:"block", marginBottom:"6px" }}>ที่อยู่จัดส่ง</label>
          <textarea {...inp("address")} placeholder="บ้านเลขที่ ถนน แขวง เขต จังหวัด รหัสไปรษณีย์" rows={3} style={{ ...baseInput, ...(focus === "address" ? focusStyle : {}), resize:"vertical", lineHeight:1.6 }} />

          <label style={{ fontSize:"13px", fontWeight:500, color:"#374151", display:"block", marginBottom:"6px" }}>หมายเหตุเพิ่มเติม</label>
          <textarea {...inp("detail")} placeholder="ขนาด สี วัสดุ หรือข้อมูลพิเศษอื่นๆ" rows={3} style={{ ...baseInput, ...(focus === "detail" ? focusStyle : {}), resize:"vertical", lineHeight:1.6 }} />

          {error && (
            <div style={{ background:"#FEE2E2", border:"1px solid #FECACA", borderRadius:"8px", padding:"12px 14px", fontSize:"13px", color:"#DC2626", marginBottom:"14px" }}>
              ⚠️ {error}
            </div>
          )}

          <button type="submit" disabled={loading} style={{ width:"100%", background: loading ? "#9FE1CB" : "#1D9E75", color:"#fff", border:"none", padding:"14px", borderRadius:"10px", fontSize:"15px", fontWeight:600, cursor: loading ? "not-allowed" : "pointer", fontFamily:"'Sarabun',sans-serif" }}>
            {loading ? "⏳ กำลังส่งข้อมูล..." : "ยืนยันการสั่งซื้อ →"}
          </button>
          <p style={{ textAlign:"center", fontSize:"12px", color:"#9ca3af", marginTop:"10px" }}>เราจะส่งใบเสนอราคากลับภายใน 1 ชั่วโมงในวันทำการ</p>
        </form>

        {/* Summary */}
        <div style={{ background:"#F9F9F7", borderRadius:"16px", padding:"24px", border:"1px solid #e5e7eb", position:"sticky", top:"20px" }}>
          <h2 style={{ fontSize:"16px", fontWeight:600, color:"#1a1a1a", marginBottom:"16px" }}>รายการสินค้า ({totalItems} รายการ)</h2>
          {items.map(({ key, product, qty, options }) => (
            <div key={key} style={{ display:"flex", gap:"10px", marginBottom:"14px", alignItems:"center" }}>
              <div style={{ width:"44px", height:"44px", background:"#E1F5EE", borderRadius:"8px", display:"flex", alignItems:"center", justifyContent:"center", fontSize:"22px", flexShrink:0 }}>{product.icon}</div>
              <div style={{ flex:1 }}>
                <div style={{ fontSize:"13px", fontWeight:500, color:"#1a1a1a" }}>{product.name}</div>
                {options.length > 0 && <div style={{ fontSize:"11px", color:"#9ca3af" }}>{options.join(", ")}</div>}
                <div style={{ fontSize:"12px", color:"#6b7280" }}>จำนวน {qty} | {product.price}</div>
              </div>
            </div>
          ))}
          <div style={{ borderTop:"1px solid #e5e7eb", marginTop:"8px", paddingTop:"14px" }}>
            <div style={{ display:"flex", justifyContent:"space-between", fontSize:"13px", color:"#6b7280", marginBottom:"4px" }}>
              <span>จำนวนรายการ</span><span style={{ fontWeight:500, color:"#1a1a1a" }}>{totalItems} รายการ</span>
            </div>
            <div style={{ display:"flex", justifyContent:"space-between", fontSize:"13px", color:"#6b7280" }}>
              <span>ราคา</span><span style={{ fontWeight:600, color:"#1D9E75" }}>รอใบเสนอราคา</span>
            </div>
          </div>
          <div style={{ marginTop:"14px", background:"#E1F5EE", borderRadius:"8px", padding:"10px 12px", fontSize:"12px", color:"#085041" }}>
            📋 เราจะส่งใบเสนอราคาตาม email / เบอร์ที่กรอกไว้ภายใน 1 ชั่วโมง
          </div>
        </div>
      </div>
    </main>
  );
}