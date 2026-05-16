import { Link } from "react-router-dom";

export default function CheckoutSuccess() {
  return (
    <main style={{ fontFamily:"'Sarabun',sans-serif", padding:"80px 40px", textAlign:"center" }}>
      <div style={{ fontSize:"72px", marginBottom:"16px" }}>✅</div>
      <h1 style={{ fontSize:"26px", fontWeight:600, color:"#085041", marginBottom:"8px" }}>ส่งคำสั่งซื้อเรียบร้อยแล้ว!</h1>
      <p style={{ color:"#6b7280", fontSize:"15px", lineHeight:1.8, marginBottom:"32px" }}>
        ทีมงาน UDP Packaging จะส่งใบเสนอราคาให้คุณ<br/>ภายใน 1 ชั่วโมงในวันทำการ
      </p>
      <div style={{ display:"flex", gap:"12px", justifyContent:"center" }}>
        <Link to="/" style={{ background:"#1D9E75", color:"#fff", padding:"12px 28px", borderRadius:"28px", textDecoration:"none", fontWeight:600, fontSize:"14px" }}>กลับหน้าแรก</Link>
        <Link to="/products" style={{ background:"#E1F5EE", color:"#085041", padding:"12px 28px", borderRadius:"28px", textDecoration:"none", fontWeight:600, fontSize:"14px" }}>ดูสินค้าเพิ่มเติม</Link>
      </div>
    </main>
  );
}