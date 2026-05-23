import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";

const slides = [
  { src: "/onestop.webp", alt: "One Stop Service" },
  { src: "/design.webp", alt: "ออกแบบฟรี · MOQ ต่ำ" },
  { src: "/organic.jpg", alt: "บรรจุภัณฑ์อินทรีย์" },
  { src: "/company.jpg", alt: "บริษัทของเรา" },
];

const productCategories = [
  { id: "box",      icon: "📦", name: "กล่องบรรจุภัณฑ์",    desc: "กล่องพิมพ์สีออฟเซ็ท ครบทุกขนาด ทุกรูปทรง", cat: "กล่องบรรจุภัณฑ์", accent: "#0D5C44" },
  { id: "sticker",  icon: "🏷️", name: "สติ๊กเกอร์และฉลาก",  desc: "ม้วนและแผ่น ทนน้ำ ทนความร้อน พิมพ์คมชัด",   cat: "สติ๊กเกอร์",       accent: "#5AACAC" },
  { id: "bag",      icon: "🛍️", name: "ถุงกระดาษ",           desc: "ถุงกระดาษพิมพ์โลโก้ทุกขนาด หูหิ้วครบแบบ",  cat: "ถุงกระดาษ",        accent: "#C8A882" },
  { id: "brochure", icon: "📄", name: "แผ่นพับ / โบรชัวร์",  desc: "งานพิมพ์ตลาด แค็ตตาล็อก Hangtag ครบจบ",   cat: "แผ่นพับ",          accent: "#8FAF78" },
];

const trustItems = [
  { icon: "🚚", title: "ส่งทั่วประเทศ", desc: "ทุกจังหวัด ครบทุกช่องทาง" },
  { icon: "🏅", title: "รับประกันคุณภาพ", desc: "ตรงสี ตรงแบบ 100%" },
  { icon: "🎨", title: "Pantone Matching", desc: "พิมพ์ตรงสีแม่นยำ" },
  { icon: "🎧", title: "ตอบใน 1 ชั่วโมง", desc: "วันทำการ จ–ศ 8–17 น." },
];

const services = [
  {
    icon: "💬",
    title: "ให้คำปรึกษาเรื่องการพิมพ์",
    desc: "ตอบทุกข้อสงสัยเกี่ยวกับการพิมพ์ ด้วยทีมงานผู้เชี่ยวชาญที่พร้อมให้คำแนะนำตั้งแต่เริ่มต้นจนจบงาน",
    accent: "#0D5C44",
    gradient: "from-[#E8F5F0] to-[#C8EBE0]",
  },
  {
    icon: "🎨",
    title: "ออกแบบและผลิตสื่อสิ่งพิมพ์",
    desc: "เรามีทีมงานที่ช่วยให้การออกแบบของคุณเป็นเรื่องง่าย ครอบคลุมทุกประเภทงานพิมพ์ด้วยมาตรฐานระดับมืออาชีพ",
    accent: "#5AACAC",
    gradient: "from-[#E4F4F4] to-[#C2E8E8]",
  },
  {
    icon: "🚚",
    title: "บริการจัดส่งทั่วประเทศ",
    desc: "ไม่ว่าจะใกล้หรือไกล เราพร้อมส่งทุกที่ทั่วประเทศ รวดเร็ว ปลอดภัย ตรงเวลา",
    accent: "#C8A882",
    gradient: "from-[#FAF3EB] to-[#F0E0C8]",
  },
];

const steps = [
  { step: "01", name: "เลือกสินค้า", icon: "🛒" },
  { step: "02", name: "ส่งไฟล์งาน", icon: "📤" },
  { step: "03", name: "อนุมัติ Proof", icon: "✅" },
  { step: "04", name: "รอรับสินค้า", icon: "📦" },
];

// ── Arrow Icon Components ──
function ChevronLeft() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <polyline points="15 18 9 12 15 6" />
    </svg>
  );
}
function ChevronRight() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <polyline points="9 18 15 12 9 6" />
    </svg>
  );
}

export default function Home() {
  const [current, setCurrent] = useState(0);
  const [fading, setFading] = useState(false);
  const [hoveredCat, setHoveredCat] = useState(null);
  const [isPaused, setIsPaused] = useState(false);

  const goTo = useCallback((index) => {
    setFading(true);
    setTimeout(() => {
      setCurrent((index + slides.length) % slides.length);
      setFading(false);
    }, 300);
  }, []);

  const goPrev = useCallback(() => goTo(current - 1), [current, goTo]);
  const goNext = useCallback(() => goTo(current + 1), [current, goTo]);

  useEffect(() => {
    if (isPaused) return;
    const t = setInterval(() => goNext(), 6000);
    return () => clearInterval(t);
  }, [isPaused, goNext]);

  return (
    <main className="font-['Sarabun'] bg-[#F8F9F7] text-[#1C2B25] min-h-screen">

      {/* ── Hero Banner Slideshow ── */}
      <section
        className="relative w-full overflow-hidden bg-black group"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Banner Image */}
        <div className={`transition-opacity duration-500 ${fading ? "opacity-0" : "opacity-100"}`}>
          <img
            src={slides[current].src}
            alt={slides[current].alt}
            className="w-full object-cover block"
            style={{ maxHeight: "520px", width: "100%", objectPosition: "center" }}
          />
        </div>

        {/* Left Arrow */}
        <button
          onClick={goPrev}
          aria-label="Previous slide"
          className="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 z-10
            w-10 h-10 md:w-12 md:h-12 rounded-full
            bg-white/20 backdrop-blur-md border border-white/30 text-white
            flex items-center justify-center
            opacity-0 group-hover:opacity-100
            transition-all duration-300
            hover:bg-white/40 hover:scale-110 active:scale-95
            shadow-lg"
        >
          <ChevronLeft />
        </button>

        {/* Right Arrow */}
        <button
          onClick={goNext}
          aria-label="Next slide"
          className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 z-10
            w-10 h-10 md:w-12 md:h-12 rounded-full
            bg-white/20 backdrop-blur-md border border-white/30 text-white
            flex items-center justify-center
            opacity-0 group-hover:opacity-100
            transition-all duration-300
            hover:bg-white/40 hover:scale-110 active:scale-95
            shadow-lg"
        >
          <ChevronRight />
        </button>

        {/* Bottom Gradient + Dots */}
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 z-10">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`rounded-full transition-all duration-300 ${
                i === current
                  ? "w-8 h-2.5 bg-white shadow-md"
                  : "w-2.5 h-2.5 bg-white/50 hover:bg-white/80"
              }`}
            />
          ))}
        </div>

        {/* Slide counter */}
        <div className="absolute top-4 right-4 bg-black/30 backdrop-blur-sm text-white text-xs font-bold px-3 py-1 rounded-full border border-white/20 z-10">
          {current + 1} / {slides.length}
        </div>
      </section>

      {/* ── Trust Bar ── */}
      <section className="bg-[#0A3828] border-b border-white/10 py-5 px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {trustItems.map((item, i) => (
            <div key={i} className="flex items-center gap-3">
              <span className="text-xl md:text-2xl">{item.icon}</span>
              <div>
                <div className="text-xs md:text-sm font-bold text-[#7EC8C8] leading-snug">{item.title}</div>
                <div className="text-[10px] md:text-xs text-white/45 mt-0.5">{item.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── About / Mission ── */}
      <section className="py-16 md:py-20 px-6 max-w-6xl mx-auto">
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 items-stretch">

            {/* Left accent */}
            <div className="bg-gradient-to-br from-[#0A3828] to-[#0D5C44] p-10 md:p-14 flex flex-col justify-center relative overflow-hidden">
              <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-white/5 pointer-events-none" />
              <div className="absolute -bottom-10 -left-10 w-48 h-48 rounded-full bg-[#7EC8C8]/10 pointer-events-none" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-white/[0.02] pointer-events-none" />

              <span className="text-[10px] font-bold text-[#7EC8C8] tracking-[3px] uppercase block mb-4">ABOUT US</span>
              <h2 className="text-2xl md:text-3xl font-extrabold text-white leading-snug mb-6">
                งานพิมพ์คุณภาพ<br />
                <span className="text-[#7EC8C8]">ราคายุติธรรม</span><br />
                ระยะเวลารวดเร็ว
              </h2>

              <div className="flex flex-wrap gap-3 mt-2">
                {[
                  { num: "20+", label: "ปีประสบการณ์" },
                  { num: "5,000+", label: "ลูกค้าที่ไว้ใจ" },
                  { num: "100%", label: "รับประกันคุณภาพ" },
                ].map((stat, i) => (
                  <div key={i} className="bg-white/10 border border-white/15 backdrop-blur-sm rounded-xl px-4 py-2.5 text-center min-w-[80px]">
                    <div className="text-lg font-extrabold text-[#7EC8C8]">{stat.num}</div>
                    <div className="text-[10px] text-white/55 mt-0.5 whitespace-nowrap">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right body text */}
            <div className="p-10 md:p-14 flex flex-col justify-center">
              <p className="text-[#1C2B25] text-sm md:text-base leading-[1.9] font-['Sarabun'] mb-5">
                <span className="font-bold text-[#0D5C44]">บจก.อุดมโภคทรัพย์ แพ็คเก็จจิ้ง</span> มุ่งมั่นพัฒนางานพิมพ์อย่างต่อเนื่อง จากการนำความต้องการของลูกค้าและตลาดมาปรับปรุง เพื่อเพิ่มประสิทธิภาพงานพิมพ์ให้สามารถตอบสนองความต้องการของลูกค้าให้ครอบคลุมทุกกลุ่มเป้าหมาย
              </p>
              <p className="text-gray-500 text-xs md:text-sm leading-[1.85] font-['Sarabun'] mb-8">
                ด้วยเครื่องจักรที่ทันสมัยและทีมงานผู้เชี่ยวชาญ เราพร้อมส่งมอบบรรจุภัณฑ์ที่ตอบโจทย์ทุกความต้องการ ตั้งแต่ออกแบบจนถึงการผลิต ด้วยมาตรฐานสากลที่คุณไว้วางใจได้
              </p>
              <Link
                to="/About"
                className="self-start inline-flex items-center gap-2 bg-[#0D5C44] text-white text-xs md:text-sm font-bold px-7 py-3 rounded-full no-underline hover:bg-[#0A3828] hover:-translate-y-0.5 transition-all shadow-md shadow-[#0D5C44]/20"
              >
                เกี่ยวกับเรา <span>→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Divider ── */}
      <div className="max-w-6xl mx-auto px-6">
        <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
      </div>

      {/* ── Product Categories ── */}
      <section className="py-16 md:py-24 px-6 max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12 gap-4">
          <div>
            <span className="text-[10px] font-bold text-[#5AACAC] tracking-[3px] uppercase block mb-2">OUR PRODUCTS</span>
            <h2 className="text-2xl md:text-4xl font-extrabold text-[#1C2B25]">สินค้าและบริการของเรา</h2>
          </div>
          <Link to="/products" className="self-start md:self-auto text-xs font-bold text-[#0D5C44] border border-[#0D5C44] px-5 py-2.5 rounded-full no-underline hover:bg-[#0D5C44] hover:text-white transition-all">
            ดูสินค้าทั้งหมด →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
          {productCategories.map((cat) => (
            <Link key={cat.id} to={`/products?cat=${encodeURIComponent(cat.cat)}`} className="no-underline group">
              <div
                className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:border-transparent"
                style={{ boxShadow: hoveredCat === cat.id ? `0 24px 48px ${cat.accent}18` : "" }}
                onMouseEnter={() => setHoveredCat(cat.id)}
                onMouseLeave={() => setHoveredCat(null)}
              >
                {/* Color top bar */}
                <div className="h-1 w-full transition-all duration-300" style={{ background: hoveredCat === cat.id ? cat.accent : "#e5e7eb" }} />
                <div className="h-28 flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 group-hover:from-[#E1F5EE] group-hover:to-[#9FE1CB]/30 transition-all duration-300">
                  <span className="text-5xl filter drop-shadow-md transform group-hover:scale-110 transition-transform duration-300">{cat.icon}</span>
                </div>
                <div className="p-5 text-left">
                  <h3 className="text-sm font-bold text-gray-900 mb-1.5 group-hover:text-[#0D5C44] transition-colors">{cat.name}</h3>
                  <p className="text-xs text-gray-400 leading-relaxed min-h-[36px]">{cat.desc}</p>
                  <div className="mt-4 text-xs font-bold flex items-center gap-1 transition-all duration-200" style={{ color: cat.accent }}>
                    ดูรายละเอียด <span className="transform group-hover:translate-x-1.5 transition-transform">→</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── One-Stop Service ── */}
      <section className="py-16 md:py-20 px-6 bg-[#F2F5F3]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-[10px] font-bold text-[#5AACAC] tracking-[3px] uppercase block mb-2">ONE-STOP SERVICE</span>
            <h2 className="text-2xl md:text-4xl font-extrabold text-[#1C2B25]">บริการครบจบในที่เดียว</h2>
            <p className="text-gray-500 text-sm mt-3 max-w-xl mx-auto">ตั้งแต่ออกแบบ ผลิต จนถึงส่งถึงมือคุณ เราดูแลทุกขั้นตอน</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {services.map((item, i) => (
              <div key={i} className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 overflow-hidden">
                <div className="h-1.5 w-full" style={{ background: item.accent }} />
                <div className="p-8">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${item.gradient} flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    {item.icon}
                  </div>
                  <h3 className="text-sm md:text-base font-extrabold text-[#1C2B25] mb-3 leading-snug">{item.title}</h3>
                  <p className="text-xs md:text-sm text-gray-500 leading-[1.85]">{item.desc}</p>
                  <div className="mt-6 flex items-center gap-1.5 text-xs font-bold" style={{ color: item.accent }}>
                    <span>เรียนรู้เพิ่มเติม</span>
                    <span className="transform group-hover:translate-x-1 transition-transform">→</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Quick Quote & Process ── */}
      <section className="py-16 md:py-24 px-6 max-w-6xl mx-auto">
        <div className="bg-gradient-to-br from-[#0A3828] via-[#0D5C44] to-[#0F6B4F] rounded-3xl p-8 md:p-12 grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12 items-center relative overflow-hidden">

          {/* Decorative blobs */}
          <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-white/5 pointer-events-none" />
          <div className="absolute -bottom-16 left-1/4 w-56 h-56 rounded-full bg-[#7EC8C8]/10 pointer-events-none" />

          {/* Steps */}
          <div className="md:col-span-2 text-left text-white relative z-10">
            <span className="text-[10px] font-bold text-[#7EC8C8] tracking-[3px] block mb-2">PRODUCTION PROCESS</span>
            <h2 className="text-xl md:text-3xl font-bold mb-8">สั่งผลิตบรรจุภัณฑ์ง่ายๆ ใน 4 ขั้นตอน</h2>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {steps.map((proc, idx) => (
                <div key={idx} className="flex flex-col items-center text-center bg-white/5 border border-white/10 rounded-2xl p-4 backdrop-blur-sm hover:bg-white/10 transition-colors">
                  <span className="text-2xl mb-3">{proc.icon}</span>
                  <div className="text-[10px] text-[#7EC8C8] font-extrabold tracking-widest mb-1">{proc.step}</div>
                  <div className="text-xs text-white/85 font-medium">{proc.name}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Quote Form */}
          <div className="bg-white rounded-2xl p-6 shadow-2xl border border-gray-100 text-left relative z-10">
            <div className="flex items-center gap-2 mb-5">
              <div className="w-1.5 h-5 bg-[#0D5C44] rounded-full" />
              <h3 className="text-sm font-extrabold text-[#0D5C44] tracking-wide uppercase">ขอใบเสนอราคาด่วน</h3>
            </div>
            <input
              type="text"
              placeholder="ชื่อบริษัท / ชื่อผู้ติดต่อ"
              className="w-full text-xs md:text-sm border border-gray-200 rounded-xl p-3 mb-3 outline-none focus:border-[#0D5C44] focus:ring-2 focus:ring-[#0D5C44]/10 transition-all font-['Sarabun'] bg-gray-50 focus:bg-white"
            />
            <input
              type="tel"
              placeholder="เบอร์โทรศัพท์"
              className="w-full text-xs md:text-sm border border-gray-200 rounded-xl p-3 mb-3 outline-none focus:border-[#0D5C44] focus:ring-2 focus:ring-[#0D5C44]/10 transition-all font-['Sarabun'] bg-gray-50 focus:bg-white"
            />
            <select className="w-full text-xs md:text-sm border border-gray-200 rounded-xl p-3 mb-5 outline-none bg-gray-50 focus:bg-white focus:border-[#0D5C44] focus:ring-2 focus:ring-[#0D5C44]/10 transition-all text-gray-600 font-['Sarabun']">
              <option>เลือกประเภทสินค้า</option>
              <option>กล่องบรรจุภัณฑ์</option>
              <option>สติ๊กเกอร์และฉลากสินค้า</option>
              <option>ถุงกระดาษ</option>
            </select>
            <Link
              to="/contact"
              className="block text-center bg-[#0D5C44] text-white font-bold text-xs md:text-sm py-3.5 rounded-xl no-underline hover:bg-[#0A3828] transition-all shadow-lg shadow-[#0D5C44]/30 hover:-translate-y-0.5"
            >
              ส่งข้อมูลปรึกษาฟรี ✉️
            </Link>
            <p className="text-center text-[10px] text-gray-400 mt-3">ทีมงานติดต่อกลับภายใน 1 ชั่วโมง</p>
          </div>
        </div>
      </section>

    </main>
  );
}