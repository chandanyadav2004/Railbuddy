const features = [
  { icon: "chat", title: "AI Chatbot Logic" },
  { icon: "location_on", title: "Live Train Status" },
  { icon: "confirmation_number", title: "PNR Prediction" },
  { icon: "info", title: "Train Details" },
  { icon: "calendar_month", title: "Date-based Tracking" },
  { icon: "notifications_active", title: "Smart Alerts" },
];

export default function Features() {
  return (
    <section id="features" className="max-w-[1280px] mx-auto py-24 px-6">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <h2 className="text-4xl font-bold mb-4 font-display">Everything you need in one chat</h2>
        <p className="text-slate-400">Interact with railway data through smart visual cards.</p>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((f, i) => (
          <div key={i} className="group p-8 rounded-2xl border border-slate-800 bg-card hover:border-primary/50 transition-all duration-300">
            <span className="material-symbols-outlined text-primary text-4xl mb-6">{f.icon}</span>
            <h3 className="text-xl font-bold mb-2 font-display">{f.title}</h3>
            <p className="text-slate-400 text-sm leading-relaxed">Advanced AI processing to provide the most accurate railway insights instantly.</p>
          </div>
        ))}
      </div>
    </section>
  );
}