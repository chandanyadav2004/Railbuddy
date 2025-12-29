export default function TrainBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-[0.03] dark:opacity-[0.05]">
      {/* Upper track train */}
      <div className="absolute top-1/4 w-full animate-train">
        <span className="material-symbols-outlined text-[120px]">train</span>
      </div>
      
      {/* Lower track train (slower and delayed) */}
      <div className="absolute bottom-1/4 w-full animate-train [animation-duration:35s] [animation-delay:5s]">
        <span className="material-symbols-outlined text-[180px]">train</span>
      </div>

      {/* Subtle Horizontal Lines (Tracks) */}
      <div className="absolute top-1/4 w-full border-t border-slate-500/20 mt-16" />
      <div className="absolute bottom-1/4 w-full border-t border-slate-500/20 mt-24" />
    </div>
  );
}