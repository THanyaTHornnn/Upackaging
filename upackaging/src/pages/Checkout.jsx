import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../store/cartStore";
import { sendEmail } from "../utils/sendEmail";

export default function Checkout() {
  const { items, clearCart, totalItems } = useCart();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({ name:"", company:"", tel:"", email:"", address:"", detail:"" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true); 
    setError("");
    
    const itemList = items.map(({ product, qty, options }) =>
      `• ${product.name}${options.length ? ` (${options.join(", ")})` : ""} × ${qty}`
    ).join("\n");

    try {
      await sendEmail({ ...form, product: `รายการคำขอใบเสนอราคา:\n${itemList}`, qty: `${totalItems} รายการ`, detail: form.detail || form.address });
      clearCart();
      navigate("/checkout/success");
    } catch (err) {
      setError("ไม่สามารถส่งข้อมูลได้ชั่วคราว กรุณาลองใหม่อีกครั้ง หรือติดต่อสายด่วน 02-408-5680");
    } finally {
      setLoading(false);
    }
  }

  if (items.length === 0) return (
    <div className="font-['Sarabun'] py-24 text-center max-w-sm mx-auto px-4">
      <div className="text-5xl mb-4">🛒</div>
      <h2 className="text-lg font-bold text-gray-900 mb-2">ตะกร้าของคุณยังไม่มีสินค้า</h2>
      <p className="text-xs text-gray-500 mb-6">กรุณาเลือกสินค้าที่ต้องการขอใบเสนอราคาก่อนทำรายการ</p>
      <Link to="/products" className="bg-[#0D5C44] text-white px-6 py-2.5 rounded-full no-underline text-xs font-bold shadow">ไปที่หน้าสินค้า</Link>
    </div>
  );

  return (
    <main className="font-['Sarabun'] bg-[#FAFAF8] min-h-screen text-left">
      <section className="bg-gradient-to-r from-[#053D31] to-[#1D9E75] py-10 px-6 text-center text-white">
        <h1 className="text-xl md:text-2xl font-bold mb-1.5">ยืนยันข้อมูลคำขอใบเสนอราคา</h1>
        <p className="text-xs md:text-sm text-white/80">เจ้าหน้าที่จะคำนวณราคาพิเศษและติดต่อกลับภายใน 1 ชั่วโมง</p>
      </section>

      {/* Process Bar */}
      <div className="bg-white border-b border-gray-100 py-3 px-6 flex justify-center items-center gap-2">
        {[["🛒", "ตะกร้า"], ["📋", "ระบุข้อมูล"], ["✅", "ส่งข้อมูลเรียบร้อย"]].map((step, i) => (
          <div key={i} className="flex items-center gap-1.5">
            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${i === 1 ? "bg-[#0D5C44] text-white" : i < 1 ? "bg-[#9FE1CB] text-[#054040]" : "bg-gray-100 text-gray-400"}`}>
              {step[0]}
            </div>
            <span className={`text-xs ${i === 1 ? "font-bold text-[#0D5C44]" : "text-gray-400"}`}>{step[1]}</span>
            {i < 2 && <span className="text-gray-300 text-xs mx-1">→</span>}
          </div>
        ))}
      </div>

      <div className="max-w-5xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
        {/* Contact Form Details */}
        <form onSubmit={handleSubmit} className="md:col-span-2 bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-base font-bold text-gray-900 border-b border-gray-50 pb-3 mb-5">ข้อมูลการติดต่อและจัดส่ง</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="text-xs font-semibold text-gray-700 block mb-1.5">ชื่อ-นามสกุลจริง <span className="text-red-500">*</span></label>
              <input type="text" name="name" required value={form.name} onChange={handleChange} placeholder="สมชาย ใจดี" className="w-full text-xs md:text-sm border border-gray-200 rounded-lg p-3 outline-none focus:border-[#0D5C44] transition-colors font-['Sarabun']" />
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-700 block mb-1.5">ชื่อบริษัท / ชื่อแบรนด์ของคุณ</label>
              <input type="text" name="company" value={form.company} onChange={handleChange} placeholder="บริษัท เอบีซี จำกัด (มหาชน)" className="w-full text-xs md:text-sm border border-gray-200 rounded-lg p-3 outline-none focus:border-[#0D5C44] transition-colors font-['Sarabun']" />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="text-xs font-semibold text-gray-700 block mb-1.5">เบอร์โทรศัพท์ที่ติดต่อได้ <span className="text-red-500">*</span></label>
              <input type="tel" name="tel" required value={form.tel} onChange={handleChange} placeholder="08XXXXXXXX" className="w-full text-xs md:text-sm border border-gray-200 rounded-lg p-3 outline-none focus:border-[#0D5C44] transition-colors font-['Sarabun']" />
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-700 block mb-1.5">ที่อยู่อีเมล (Email)</label>
              <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="contact@yourbrand.com" className="w-full text-xs md:text-sm border border-gray-200 rounded-lg p-3 outline-none focus:border-[#0D5C44] transition-colors font-['Sarabun']" />
            </div>
          </div>

          <div className="mb-4">
            <label className="text-xs font-semibold text-gray-700 block mb-1.5">ที่อยู่สำหรับจัดส่งสินค้า</label>
            <textarea name="address" rows={3} value={form.address} onChange={handleChange} placeholder="ระบุ บ้านเลขที่, ถนน, แขวง, เขต, จังหวัด และรหัสไปรษณีย์" className="w-full text-xs md:text-sm border border-gray-200 rounded-lg p-3 outline-none focus:border-[#0D5C44] transition-colors font-['Sarabun'] leading-relaxed resize-none" />
          </div>

          <div className="mb-6">
            <label className="text-xs font-semibold text-gray-700 block mb-1.5">หมายเหตุหรือข้อมูลเทคนิคเพิ่มเติม</label>
            <textarea name="detail" rows={2} value={form.detail} onChange={handleChange} placeholder="เช่น ความหนากระดาษ, สีฟอยล์ที่ต้องการ หรือข้อกำหนดอื่นๆ" className="w-full text-xs md:text-sm border border-gray-200 rounded-lg p-3 outline-none focus:border-[#0D5C44] transition-colors font-['Sarabun'] leading-relaxed resize-none" />
          </div>

          {error && (
            <div className="bg-red-50 border border-red-100 text-red-600 rounded-xl p-4 text-xs md:text-sm mb-4">
              ⚠️ {error}
            </div>
          )}

          <button type="submit" disabled={loading} className={`w-full text-xs md:text-sm font-bold text-white py-3.5 rounded-xl transition-colors shadow ${loading ? "bg-gray-300 cursor-not-allowed" : "bg-[#0D5C44] hover:bg-[#0A3828]"}`}>
            {loading ? "⏳ ระบบกำลังส่งข้อมูลไฟล์..." : "ยืนยันส่งข้อมูลใบเสนอราคา →"}
          </button>
        </form>

        {/* Dynamic Summary Sticky Right */}
        <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm md:sticky md:top-24">
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">สรุปรายการคำขอ ({totalItems})</h3>
          <div className="divide-y divide-gray-50 max-h-[240px] overflow-y-auto pr-1">
            {items.map((item) => (
              <div key={item.key} className="flex gap-3 py-3 items-center">
                <div className="w-10 h-10 bg-[#E1F5EE] rounded-lg flex items-center justify-center text-xl shrink-0">{item.product.icon}</div>
                <div className="min-w-0 flex-1">
                  <div className="text-xs md:text-sm font-semibold text-gray-800 truncate">{item.product.name}</div>
                  <div className="text-[11px] text-gray-400 mt-0.5">จำนวน: {item.qty} ใบ</div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="border-t border-gray-100 pt-4 mt-2">
            <div className="flex justify-between text-xs text-gray-500 mb-2">
              <span>รวมยอดสั่งผลิต</span>
              <span className="font-semibold text-gray-900">{totalItems} รายการ</span>
            </div>
            <div className="flex justify-between text-xs items-center">
              <span>ราคาสรุปท้ายบิล</span>
              <span className="text-sm font-bold text-[#0D5C44] bg-[#E1F5EE] px-3 py-1 rounded-full">รอใบเสนอราคา</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}