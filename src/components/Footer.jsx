export default function Footer() {
  return (
    <footer className="w-full border-t border-[#232f48] py-8 bg-bg-dark">
      <div className="max-w-[1280px] mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4 text-slate-500 text-sm">
        <span>© 2023 RailBuddy AI. All rights reserved.</span>
        <div className="flex gap-6">
          <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
}