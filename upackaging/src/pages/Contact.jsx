import { useState } from "react";
import { Link } from "react-router-dom";
import { sendEmail } from "../utils/sendEmail";

const productTypes = [
  "กล่องบรรจุภัณฑ์", "สติ๊กเกอร์และฉลาก",
  "ถุงกระดาษ", "แผ่นพับ / โบรชัวร์", "อื่นๆ",
];

export default function Contact() {
  const [form, setForm] = useState({ name:"", company:"", tel:"", email:"", product:"", qty:"", detail:"" });
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
    try {
      await sendEmail({ ...form });
      setSubmitted(true);
    } catch(err) {
      setError("เกิดข้อผิดพลาดในการส่งข้อมูล กรุณาลองใหม่อีกครั้งหรือโทร 02-408-5680");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="font-['Sarabun'] bg-[#FAFAF8] min-h-screen text-left">
      {/* Hero Banner */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0A3828] via-[#0D5C44] to-[#1A8A6A] py-12 md:py-16 px-6 text-center">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute -top-12 -right-12 w-72 h-72 rounded-full bg-[#7EC8C8] blur-2xl" />
        </div>
        <div className="relative">
          <h1 className="text-white text-2xl md:text-4xl font-extrabold mb-3 tracking-tight">ติดต่อสอบถามและขอใบเสนอราคา</h1>
          <p className="text-white/80 text-xs md:text-sm max-w-md mx-auto">กรอกรายละเอียดสเปคบรรจุภัณฑ์ที่ต้องการ เจ้าหน้าที่จะติดต่อกลับภายใน 1 ชั่วโมงในเวลาทำการ</p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Form Container */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 p-6 md:p-8 shadow-sm">
          {submitted ? (
            <div className="text-center py-12">
              <div className="text-5xl mb-4 animate-bounce">✅</div>
              <h2 className="text-xl font-bold text-[#0D5C44] mb-2">ส่งข้อมูลคำขอเรียบร้อยแล้ว!</h2>
              <p className="text-xs md:text-sm text-gray-500 mb-6">ทีมงานฝ่ายขายจะติดต่อกลับที่เบอร์ <strong className="text-gray-800">{form.tel}</strong> เพื่อเสนอราคาพิเศษ</p>
              <button 
                onClick={() => { setSubmitted(false); setForm({ name:"", company:"", tel:"", email:"", product:"", qty:"", detail:"" }); }}
                className="bg-[#0D5C44] text-white px-6 py-2.5 rounded-full font-bold text-xs md:text-sm hover:bg-[#0A3828] transition-colors"
              >
                ส่งคำขออื่นเพิ่มเติม
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <h2 className="text-base md:text-lg font-bold text-gray-900 border-b border-gray-50 pb-3 mb-4">ฟอร์มรายละเอียดสินค้าสั่งผลิต</h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-gray-700 block mb-1.5">ชื่อ-นามสกุลผู้ติดต่อ <span className="text-red-500">*</span></label>
                  <input type="text" name="name" required value={form.name} onChange={handleChange} placeholder="สมชาย ใจดี" className="w-full text-xs md:text-sm border border-gray-200 rounded-lg p-3 outline-none focus:border-[#0D5C44] focus:ring-2 focus:ring-[#0D5C44]/10 transition-all font-['Sarabun']" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-700 block mb-1.5">ชื่อบริษัท / แบรนด์สินค้า</label>
                  <input type="text" name="company" value={form.company} onChange={handleChange} placeholder="บริษัท หรือชื่อแบรนด์ของคุณ" className="w-full text-xs md:text-sm border border-gray-200 rounded-lg p-3 outline-none focus:border-[#0D5C44] focus:ring-2 focus:ring-[#0D5C44]/10 transition-all font-['Sarabun']" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-gray-700 block mb-1.5">เบอร์โทรศัพท์ <span className="text-red-500">*</span></label>
                  <input type="tel" name="tel" required value={form.tel} onChange={handleChange} placeholder="08XXXXXXXX" className="w-full text-xs md:text-sm border border-gray-200 rounded-lg p-3 outline-none focus:border-[#0D5C44] focus:ring-2 focus:ring-[#0D5C44]/10 transition-all font-['Sarabun']" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-700 block mb-1.5">อีเมล (ถ้ามี)</label>
                  <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="example@brand.com" className="w-full text-xs md:text-sm border border-gray-200 rounded-lg p-3 outline-none focus:border-[#0D5C44] focus:ring-2 focus:ring-[#0D5C44]/10 transition-all font-['Sarabun']" />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-700 block mb-1.5">ประเภทผลิตภัณฑ์บรรจุภัณฑ์ <span className="text-red-500">*</span></label>
                <select name="product" required value={form.product} onChange={handleChange} className="w-full text-xs md:text-sm border border-gray-200 rounded-lg p-3 outline-none bg-white text-gray-700 focus:border-[#0D5C44] font-['Sarabun']">
                  <option value="" disabled>คลิกเพื่อเลือกประเภทบรรจุภัณฑ์</option>
                  {productTypes.map(p => <option key={p} value={p}>{p}</option>)}
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-700 block mb-1.5">ปริมาณการผลิตที่ต้องการ (ตามขั้นต่ำ MOQ)</label>
                <input type="text" name="qty" value={form.qty} onChange={handleChange} placeholder="เช่น 500 ใบ, 1,000 ชิ้น เป็นต้น" className="w-full text-xs md:text-sm border border-gray-200 rounded-lg p-3 outline-none focus:border-[#0D5C44] transition-all font-['Sarabun']" />
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-700 block mb-1.5">รายละเอียดขนาด / สี / ข้อกำหนดงานเทคนิคเพิ่มเติม</label>
                <textarea name="detail" rows={4} value={form.detail} onChange={handleChange} placeholder="ระบุขนาด กว้าง x ยาว x สูง, สีที่พิมพ์ หรือเทคนิคฟอยล์ปั๊มนูน เพื่อความรวดเร็วในการคำนวณราคา..." className="w-full text-xs md:text-sm border border-gray-200 rounded-lg p-3 outline-none focus:border-[#0D5C44] transition-all font-['Sarabun'] resize-none leading-relaxed" />
              </div>

              {error && <div className="bg-red-50 border border-red-100 text-red-600 rounded-xl p-4 text-xs">{error}</div>}

              <button type="submit" disabled={loading} className={`w-full py-3.5 rounded-xl font-bold text-white text-xs md:text-sm shadow-md transition-colors ${loading ? "bg-gray-300 cursor-not-allowed" : "bg-[#0D5C44] hover:bg-[#0A3828]"}`}>
                {loading ? "กำลังส่งไฟล์ข้อมูล..." : "ส่งข้อมูลติดต่อขอใบเสนอราคา →"}
              </button>
            </form>
          )}
        </div>

        {/* Sidebar Info */}
        <div className="space-y-6">
          {/* Quick Contacts */}
          <div className="bg-[#F5EFE6] rounded-2xl p-6 border border-[#C8A882]/20">
            <h3 className="text-sm font-bold text-gray-900 mb-4 uppercase tracking-wider">ช่องทางการติดต่อตรง</h3>
            <div className="space-y-3.5">
              {[
                { icon:"📞", label:"สายด่วนฝ่ายขาย", value:"02-408-5680", href:"tel:024085680" },
                { icon:"💬", label:"Line Official Account", value:"@udppackaging", href:"https://line.me/R/ti/p/@udppackaging" },
                { icon:"👍", label:"Facebook Fanpage", value:"UDP Packaging", href:"https://facebook.com/udp159" },
                { icon:"📧", label:"อีเมลกลางติดต่อ", value:"info@udppackaging.com", href:"mailto:info@udppackaging.com" },
                { icon:"🕐", label:"เวลาทำการเปิดออฟฟิศ", value:"จันทร์ – ศุกร์ 8:00 – 17:00 น." },
              ].map((c, i) => (
                <div key={i} className="flex gap-3 items-start">
                  <div className="w-8 h-8 rounded-lg bg-[#0D5C44] text-white flex items-center justify-center text-sm shrink-0 shadow-sm">{c.icon}</div>
                  <div>
                    <div className="text-[10px] text-gray-500 font-medium">{c.label}</div>
                    {c.href ? (
                      <a href={c.href} className="text-xs md:text-sm font-bold text-[#0D5C44] no-underline hover:underline truncate block max-w-[200px] sm:max-w-none">{c.value}</a>
                    ) : (
                      <div className="text-xs md:text-sm font-bold text-gray-800">{c.value}</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Plant Location */}
          <div className="bg-[#E1F5EE] rounded-2xl p-6 border border-[#9FE1CB]/20">
            <h3 className="text-sm font-bold text-[#085041] mb-2">📍 ที่ตั้งสำนักงานใหญ่</h3>
            <p className="text-xs text-gray-600 leading-relaxed mb-4">
              <strong>บริษัท ยูดีพี แพ็คเกจจิ้ง จำกัด</strong><br />
              โรงงานและศูนย์ผลิตบรรจุภัณฑ์ครบวงจร กรุงเทพมหานคร ประเทศไทย
            </p>
            <a href="https://maps.google.com" target="_blank" rel="noreferrer" className="inline-flex text-xs font-bold text-[#0D5C44] no-underline bg-white px-4 py-2 rounded-lg border border-gray-100 hover:bg-gray-50">
              เปิดใน Google Maps →
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}