import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer style={{ background: "#053D31", fontFamily: "'Sarabun', sans-serif", color: "rgba(255,255,255,0.6)" }}>
      {/* Top section */}
      <div style={{ padding: "48px 40px 32px", display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: "40px", maxWidth: "1200px", margin: "0 auto" }}>
        {/* Brand */}
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
            <img
              src="/logo.png"
              alt="U Packaging Logo"
              style={{ width: "48px", height: "48px", borderRadius: "50%", objectFit: "cover" }}
            />
            <div style={{ color: "#fff", fontSize: "16px", fontWeight: 700 }}>UDP <span style={{ color: "#9FE1CB" }}>Packaging</span></div>
          </div>
          <p style={{ fontSize: "13px", lineHeight: 1.9, marginBottom: "20px", maxWidth: "260px" }}>
            ผู้เชี่ยวชาญด้านสิ่งพิมพ์และบรรจุภัณฑ์ครบวงจร ประสบการณ์กว่า 20 ปี
          </p>
          <div style={{ display: "flex", gap: "10px" }}>
            {[
              { icon: "📞", href: "tel:024085680",        label: "โทร" },
              { icon: "💬", href: "https://line.me/R/ti/p/@udppackaging", label: "Line" },
              { icon: "👍", href: "https://facebook.com/udp159", label: "FB" },
            ].map(({ icon, href, label }) => (
              <a key={label} href={href} title={label} style={{
                width: "36px", height: "36px", borderRadius: "8px",
                background: "rgba(255,255,255,0.08)", display: "flex",
                alignItems: "center", justifyContent: "center", fontSize: "16px",
                textDecoration: "none", transition: "background .15s",
              }}
                onMouseEnter={e => e.currentTarget.style.background = "rgba(29,158,117,0.4)"}
                onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.08)"}
              >{icon}</a>
            ))}
          </div>
        </div>

        {/* Links */}
        <div>
          <h4 style={{ color: "#fff", fontSize: "13px", fontWeight: 700, marginBottom: "16px", letterSpacing: "0.5px" }}>สินค้า</h4>
          {["กล่องบรรจุภัณฑ์", "สติ๊กเกอร์", "ถุงกระดาษ", "แผ่นพับ", "Hangtag", "Blister"].map(cat => (
            <Link key={cat} to={`/products?cat=${encodeURIComponent(cat)}`} style={{ display: "block", color: "rgba(255,255,255,0.55)", fontSize: "13px", textDecoration: "none", marginBottom: "9px", transition: "color .15s" }}
              onMouseEnter={e => e.currentTarget.style.color = "#9FE1CB"}
              onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.55)"}
            >{cat}</Link>
          ))}
        </div>

        <div>
          <h4 style={{ color: "#fff", fontSize: "13px", fontWeight: 700, marginBottom: "16px", letterSpacing: "0.5px" }}>บริษัท</h4>
          {[
            { label: "เกี่ยวกับเรา", to: "/about" },
            { label: "ผลงาน", to: "/portfolio" },
            { label: "ติดต่อ", to: "/contact" },
          ].map(({ label, to }) => (
            <Link key={to} to={to} style={{ display: "block", color: "rgba(255,255,255,0.55)", fontSize: "13px", textDecoration: "none", marginBottom: "9px", transition: "color .15s" }}
              onMouseEnter={e => e.currentTarget.style.color = "#9FE1CB"}
              onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.55)"}
            >{label}</Link>
          ))}
        </div>

        <div>
          <h4 style={{ color: "#fff", fontSize: "13px", fontWeight: 700, marginBottom: "16px", letterSpacing: "0.5px" }}>ติดต่อ</h4>
          {[
            { icon: "📞", text: "02-408-5680" },
            { icon: "💬", text: "@udppackaging" },
            { icon: "📧", text: "info@udppackaging.com" },
            { icon: "🕐", text: "จ–ศ 8:00–17:00 น." },
          ].map(({ icon, text }) => (
            <div key={text} style={{ display: "flex", alignItems: "flex-start", gap: "8px", marginBottom: "10px", fontSize: "13px" }}>
              <span>{icon}</span>
              <span>{text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", padding: "16px 40px", display: "flex", justifyContent: "space-between", alignItems: "center", maxWidth: "1200px", margin: "0 auto", fontSize: "12px" }}>
        <span>© 2026 UDP Packaging Co., Ltd. — บริษัท ยูดีพี แพ็คเกจจิ้ง จำกัด</span>
        <div style={{ display: "flex", gap: "20px" }}>
          <a href="#" style={{ color: "rgba(255,255,255,0.5)", textDecoration: "none", transition: "color .15s" }}
            onMouseEnter={e => e.currentTarget.style.color = "#9FE1CB"}
            onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.5)"}
          >นโยบายความเป็นส่วนตัว</a>
          <a href="#" style={{ color: "rgba(255,255,255,0.5)", textDecoration: "none", transition: "color .15s" }}
            onMouseEnter={e => e.currentTarget.style.color = "#9FE1CB"}
            onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.5)"}
          >เงื่อนไขการใช้งาน</a>
        </div>
      </div>
    </footer>
  );
}