export default function Hero() {
  return (
    <section className="max-w-[1280px] mx-auto px-6 py-12 lg:py-24 flex flex-col-reverse lg:flex-row gap-10 items-center">
      <div className="flex-1 text-center lg:text-left">
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-black leading-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400 mb-6 font-display">
          Smart Railway Assistant
        </h1>
        <p className="text-slate-300 text-lg md:text-xl leading-relaxed max-w-2xl mb-8">
          Your AI-powered companion for instant railway insights. Just ask about trains, tickets, or status updates in plain English.
        </p>
        <div className="flex flex-col sm:row gap-4 justify-center lg:justify-start">
          <button className="bg-primary hover:bg-primary/90 text-white px-8 h-12 rounded-xl font-bold shadow-lg shadow-primary/25 transition-transform hover:scale-105">
            Get Started
          </button>
          <button className="bg-slate-800 hover:bg-slate-700 text-white px-8 h-12 rounded-xl font-bold transition-colors">
            Learn More
          </button>
        </div>
        <div className="flex items-center justify-center lg:justify-start gap-2 mt-6 text-sm text-slate-400">
          <span className="material-symbols-outlined text-green-500">check_circle</span>
          <span>Free for personal use</span>
        </div>
      </div>

      <div className="flex-1 w-full max-w-[600px]">
        <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border border-slate-700 bg-slate-800">
          <img 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAEtbhEH64tPwcNTPWGtrenC0BaOF3nTqueil_TAnzb_t1U3ljcqnWcI7CC-WvAPnTczNF3jKmUiA3d1awTIxPuetMW0PY0k7UpInE0LtKWwsurpCaYN2BR4JIOJJSgyQnPXSGsZInMZ1Qgq47u3bOqQKwIudLr6TV76MwEHQ4abfv4mjNGDs0heF4WY_PR7qQimh0N0GTMVH61M7Xkslb7J3NNRpuCgAl-V3_5eiHrHmasp0bxiS3UHLGMYzAfybW7hEEUXOi-dOo
" 
            className="w-full h-full object-cover opacity-60" 
            alt="Train"
          />
        </div>
      </div>
    </section>
  );
}