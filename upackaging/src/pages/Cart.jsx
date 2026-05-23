import { Link } from "react-router-dom";
import { useCart } from "../store/cartStore";

export default function Cart() {
  const { items, updateQty, removeItem, totalItems } = useCart();

  if (items.length === 0) return (
    <main className="font-['Sarabun'] py-24 text-center max-w-sm mx-auto px-4">
      <div className="text-6xl mb-4">🛒</div>
      <h1 className="text-xl font-bold text-gray-900 mb-2">ตะกร้าของคุณยังคงว่างอยู่</h1>
      <p className="text-xs text-gray-500 mb-6">คุณสามารถคลิกเลือกชมตัวอย่างงานบรรจุภัณฑ์และเพิ่มรายการเพื่อส่งคำขอประเมินราคาฟรี</p>
      <Link to="/products" className="bg-[#0D5C44] text-white px-6 py-2.5 rounded-full no-underline text-xs font-bold shadow hover:bg-[#0A3828] transition-colors">
        เลือกชมแค็ตตาล็อกสินค้า →
      </Link>
    </main>
  );

  return (
    <main className="font-['Sarabun'] bg-[#FAFAF8] min-h-screen text-left px-6 py-10">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-xl md:text-2xl font-extrabold text-gray-900 mb-1">รายการตะกร้าสินค้าสั่งผลิต</h1>
        <p className="text-xs text-gray-400 mb-8">คุณมีรายการบรรจุภัณฑ์ค้างไว้ทั้งหมด <strong className="text-gray-700">{totalItems}</strong> รายการ</p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Cart Items List */}
          <div className="lg:col-span-2 space-y-3">
            {items.map((item) => (
              <div key={item.key} className="bg-white border border-gray-100 rounded-2xl p-4 flex gap-4 items-center shadow-sm">
                <div className="w-14 h-14 bg-[#E1F5EE] rounded-xl flex items-center justify-center text-3xl shrink-0">{item.product.icon}</div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-xs md:text-sm font-bold text-gray-900 truncate m-0">{item.product.name}</h3>
                  {item.options.length > 0 && (
                    <p className="text-[11px] text-gray-400 truncate mt-0.5 mb-1">สเปค: {item.options.join(", ")}</p>
                  )}
                  <span className="text-[11px] font-semibold text-[#0D5C44]">{item.product.price}</span>
                </div>
                
                {/* Quantity Controls */}
                <div className="flex items-center gap-2.5 border border-gray-100 rounded-full px-2 py-1 bg-gray-50">
                  <button onClick={() => updateQty(item.key, item.qty - 1)} className="w-6 h-6 rounded-full bg-white border border-gray-200 text-xs font-bold flex items-center justify-center hover:bg-gray-100">-</button>
                  <span className="text-xs font-bold text-gray-800 min-w-[24px] text-center">{item.qty}</span>
                  <button onClick={() => updateQty(item.key, item.qty + 1)} className="w-6 h-6 rounded-full bg-white border border-gray-200 text-xs font-bold flex items-center justify-center hover:bg-gray-100">+</button>
                </div>

                <button onClick={() => removeItem(item.key)} className="bg-transparent border-none text-gray-300 hover:text-red-500 text-base p-1 cursor-pointer transition-colors">✕</button>
              </div>
            ))}
          </div>

          {/* Checkout Card Summary */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
            <h2 className="text-sm font-bold text-gray-900 mb-4 border-b border-gray-50 pb-2">รายละเอียดสรุปยอดคำขอ</h2>
            <div className="space-y-2 max-h-[160px] overflow-y-auto pr-1">
              {items.map((item) => (
                <div key={item.key} className="flex justify-between text-xs text-gray-600">
                  <span className="truncate max-w-[140px]">{item.product.name} ({item.qty})</span>
                  <span className="text-gray-400 font-medium">รอสรุปราคากลาง</span>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-100 pt-4 mt-4 space-y-3">
              <p className="text-[11px] text-gray-400 leading-relaxed">
                * ราคาสุทธิสุดท้ายขึ้นอยู่กับสเปคกระดาษ สีที่ใช้พิมพ์ และเทคนิคการเคลือบผิว ทีมงานจะออกเอกสารใบเสนอราคาทางการ (Quotation) ส่งให้ทางอีเมล / ไลน์ภายใน 1 ชั่วโมงในวันทำการ
              </p>
              <Link to="/checkout" className="block text-center bg-[#0D5C44] text-white py-3 rounded-xl text-xs md:text-sm font-bold no-underline hover:bg-[#0A3828] transition-colors shadow-sm">
                ดำเนินการกรอกข้อมูลจัดส่ง →
              </Link>
              <Link to="/products" className="block text-center text-xs text-gray-400 no-underline hover:text-[#0D5C44] font-medium pt-1">
                ← เลือกสินค้าเพิ่มเติม
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}