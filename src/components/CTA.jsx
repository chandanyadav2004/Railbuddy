export default function CTA() {
  return (
    <section id="contact" className="py-20 px-6">
      <div className="max-w-[1280px] mx-auto rounded-3xl bg-surface border border-slate-800 p-8 md:p-16 flex flex-col md:flex-row gap-12">
        <div className="flex-1">
          <h2 className="text-4xl font-bold mb-6 font-display">Ready to simplify your journey?</h2>
          <p className="text-slate-400 text-lg mb-8">Join thousands of users already saving time.</p>
          <div className="flex items-center gap-3 text-slate-300">
            <span className="material-symbols-outlined text-primary">mail</span>
            support@railbuddy.ai
          </div>
        </div>
        <div className="flex-1 bg-card/50 p-8 rounded-2xl border border-slate-700">
          <form className="space-y-4">
            <input className="w-full bg-surface border border-slate-600 rounded-lg p-3 text-white focus:border-primary outline-none" placeholder="Email Address" />
            <textarea className="w-full bg-surface border border-slate-600 rounded-lg p-3 text-white focus:border-primary outline-none" rows="3" placeholder="Message"></textarea>
            <button className="w-full bg-primary py-3 rounded-xl font-bold text-white transition-opacity hover:opacity-90">Submit</button>
          </form>
        </div>
      </div>
    </section>
  );
}