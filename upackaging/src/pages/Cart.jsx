import { Link } from "react-router-dom";
import { useCart } from "../store/cartStore";

export default function Cart() {
  const { items, updateQty, removeItem, totalItems } = useCart();

  if (items.length === 0) return (
    <main style={{ fontFamily:"'Sarabun',sans-serif", padding:"80px 40px", textAlign:"center" }}>
      <div style={{ fontSize:"56px", marginBottom:"16px" }}>🛒</div>
      <h1 style={{ fontSize:"22px", fontWeight:600, color:"#1a1a1a", marginBottom:"8px" }}>ตะกร้าว่างอยู่</h1>
      <p style={{ color:"#6b7280", marginBottom:"24px", fontSize:"14px" }}>เพิ่มสินค้าเพื่อขอใบเสนอราคา</p>
      <Link to="/products" style={{ background:"#1D9E75", color:"#fff", padding:"12px 28px", borderRadius:"28px", textDecoration:"none", fontWeight:600, fontSize:"14px" }}>
        ดูสินค้าทั้งหมด →
      </Link>
    </main>
  );

  return (
    <main style={{ fontFamily:"'Sarabun',sans-serif", padding:"40px" }}>
      <h1 style={{ fontSize:"24px", fontWeight:600, color:"#1a1a1a", marginBottom:"8px" }}>ตะกร้าสินค้า</h1>
      <p style={{ color:"#6b7280", fontSize:"14px", marginBottom:"32px" }}>{totalItems} รายการ</p>

      <div style={{ display:"grid", gridTemplateColumns:"1fr 320px", gap:"32px", alignItems:"start" }}>
        <div>
          {items.map(({ key, product, qty, options }) => (
            <div key={key} style={{ display:"flex", gap:"16px", alignItems:"center", background:"#fff", border:"1px solid #e5e7eb", borderRadius:"14px", padding:"16px", marginBottom:"12px" }}>
              <div style={{ width:"72px", height:"72px", background:"#E1F5EE", borderRadius:"10px", display:"flex", alignItems:"center", justifyContent:"center", fontSize:"36px", flexShrink:0 }}>
                {product.icon}
              </div>
              <div style={{ flex:1 }}>
                <div style={{ fontSize:"15px", fontWeight:600, color:"#1a1a1a" }}>{product.name}</div>
                {options.length > 0 && <div style={{ fontSize:"12px", color:"#9ca3af", marginTop:"3px" }}>{options.join(", ")}</div>}
                <div style={{ fontSize:"13px", color:"#1D9E75", fontWeight:500, marginTop:"4px" }}>{product.price}</div>
              </div>
              <div style={{ display:"flex", alignItems:"center", gap:"8px" }}>
                <button onClick={() => updateQty(key, qty - 1)} style={{ width:"28px", height:"28px", borderRadius:"50%", border:"1px solid #e5e7eb", background:"#fff", fontSize:"16px", cursor:"pointer" }}>−</button>
                <span style={{ fontSize:"14px", fontWeight:500, minWidth:"32px", textAlign:"center" }}>{qty}</span>
                <button onClick={() => updateQty(key, qty + 1)} style={{ width:"28px", height:"28px", borderRadius:"50%", border:"1px solid #e5e7eb", background:"#fff", fontSize:"16px", cursor:"pointer" }}>+</button>
              </div>
              <button onClick={() => removeItem(key)} style={{ background:"none", border:"none", color:"#d1d5db", fontSize:"18px", cursor:"pointer", padding:"4px" }}>✕</button>
            </div>
          ))}
        </div>

        <div style={{ background:"#F9F9F7", borderRadius:"16px", padding:"24px", border:"1px solid #e5e7eb" }}>
          <h2 style={{ fontSize:"16px", fontWeight:600, color:"#1a1a1a", marginBottom:"16px" }}>สรุปรายการ</h2>
          {items.map(({ key, product, qty, options }) => (
            <div key={key} style={{ display:"flex", justifyContent:"space-between", fontSize:"13px", marginBottom:"8px", color:"#374151" }}>
              <span>{product.name}{options.length > 0 ? ` (${options[0]})` : ""} × {qty}</span>
              <span style={{ color:"#6b7280" }}>ขอ quote</span>
            </div>
          ))}
          <div style={{ borderTop:"1px solid #e5e7eb", marginTop:"16px", paddingTop:"16px" }}>
            <p style={{ fontSize:"13px", color:"#6b7280", marginBottom:"14px", lineHeight:1.6 }}>
              * ราคาจะถูกคำนวณตามจำนวนและสเปคจริง ทีมงานจะส่งใบเสนอราคาให้ภายใน 1 ชั่วโมง
            </p>
            <Link to="/checkout" style={{ display:"block", textAlign:"center", background:"#1D9E75", color:"#fff", padding:"13px", borderRadius:"10px", fontSize:"14px", fontWeight:600, textDecoration:"none" }}>
              ดำเนินการต่อ →
            </Link>
            <Link to="/products" style={{ display:"block", textAlign:"center", color:"#6b7280", fontSize:"13px", textDecoration:"none", marginTop:"12px" }}>
              ← เพิ่มสินค้าอีก
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}