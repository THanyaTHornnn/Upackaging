export default function Footer() {
  return (
    <footer className="bg-teal-900 text-white/60 text-sm px-6 py-5 flex justify-between items-center">
      <span>© 2026 UDP Packaging Co., Ltd.</span>
      <div className="flex gap-4">
        <a href="#" className="hover:text-white transition-colors">นโยบายความเป็นส่วนตัว</a>
        <a href="#" className="hover:text-white transition-colors">เงื่อนไขการใช้งาน</a>
      </div>
    </footer>
  );
}