import { Link, NavLink } from "react-router-dom";
import { useCart } from "../store/cartStore";

export default function Navbar() {
  const { totalItems } = useCart();

  return (
    <nav style={{ background:"#0F6E56", padding:"0 32px", height:"60px", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
      <Link to="/" style={{ color:"#fff", fontSize:"18px", fontWeight:500, textDecoration:"none", letterSpacing:"0.5px" }}>
        UDP <span style={{ color:"#9FE1CB" }}>Packaging</span>
      </Link>

      <ul style={{ display:"flex", gap:"24px", listStyle:"none", margin:0, padding:0 }}>
        {[
          { to:"/",          label:"หน้าแรก"  },
          { to:"/products",  label:"สินค้า"   },
          { to:"/portfolio", label:"ผลงาน"    },
          { to:"/contact",   label:"ติดต่อ"   },
        ].map(({ to, label }) => (
          <li key={to}>
            <NavLink to={to} end={to === "/"} style={({ isActive }) => ({
              color: isActive ? "#fff" : "rgba(255,255,255,0.7)",
              fontWeight: isActive ? 600 : 400,
              fontSize:"14px", textDecoration:"none",
              transition:"color .15s",
            })}>
              {label}
            </NavLink>
          </li>
        ))}
      </ul>

      {/* ปุ่มตะกร้า + badge จำนวนสินค้า */}
      <Link to="/cart" style={{ background:"#fff", color:"#0F6E56", fontSize:"13px", fontWeight:600, padding:"7px 18px", borderRadius:"20px", textDecoration:"none", display:"flex", alignItems:"center", gap:"6px" }}>
        🛒 ตะกร้า
        {totalItems > 0 && (
          <span style={{ background:"#1D9E75", color:"#fff", fontSize:"11px", fontWeight:700, width:"20px", height:"20px", borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center" }}>
            {totalItems}
          </span>
        )}
      </Link>
    </nav>
  );
}