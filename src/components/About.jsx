export default function About() {
  return (
    <section id="about" className="bg-[#161e2c] py-20">
      <div className="max-w-[1280px] mx-auto px-6 flex flex-col lg:flex-row items-center gap-12">
        <div className="flex-1 w-full aspect-video rounded-2xl overflow-hidden border border-slate-700">
          <img 
            src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80" 
            className="w-full h-full object-cover opacity-80" 
            alt="Data"
          />
        </div>
        <div className="flex-1">
          <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest">About Us</span>
          <h2 className="text-4xl font-bold mt-4 mb-6 font-display">Why Choose RailBuddy?</h2>
          <p className="text-slate-300 text-lg mb-8 leading-relaxed">
            RailBuddy replaces complex railway forms with a simple natural language interface. Get instant answers about PNR status and seat availability.
          </p>
          <div className="grid grid-cols-2 gap-4">
            {['AI Powered', 'Real-time', 'Secure', 'Responsive'].map(item => (
              <div key={item} className="flex items-center gap-3 font-medium">
                <span className="material-symbols-outlined text-primary">verified</span>
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}