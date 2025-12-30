const LiveStatusCard = ({ data }) => {
  const { train, route, currentStatus, nextStop, meta } = data;

  const isDelayed =
    currentStatus.delayMinutes &&
    currentStatus.delayMinutes !== "On Time";

  return (
    <div className="mt-3 w-full max-w-md bg-[#1c2433] border border-white/10 rounded-2xl p-4 shadow-xl animate-in zoom-in-95">

      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-primary/20 rounded-lg">
          <span className="material-symbols-outlined text-primary">
            location_on
          </span>
        </div>

        <div className="flex-1">
          <h4 className="font-bold text-sm text-white">
            Live Train Status
          </h4>

          <div className="flex items-center gap-2 mt-0.5">
            <span
              className={`text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full
                ${
                  isDelayed
                    ? "bg-orange-500/20 text-orange-400"
                    : "bg-green-500/20 text-green-400"
                }`}
            >
              {isDelayed
                ? `Delayed by ${currentStatus.delayMinutes}m`
                : "On Time"}
            </span>

            {meta?.lastUpdated && (
              <span className="text-[10px] text-gray-400">
                Updated {meta.lastUpdated}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Route */}
      <div className="mb-4 rounded-xl bg-white/5 p-3">
        <div className="flex items-center justify-between text-sm font-semibold text-white">
          <span>
            {route.from.name} ({route.from.code})
          </span>
          <span className="opacity-60">→</span>
          <span>
            {route.to.name} ({route.to.code})
          </span>
        </div>

        <div className="mt-2 text-center text-xs text-gray-300 font-medium">
          🚆 {train.name} ({train.number})
        </div>
      </div>

      {/* Current Location */}
      <div className="space-y-4 relative before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-px before:bg-white/10">

        <div className="relative pl-7">
          <div className="absolute left-0 top-1 w-2.5 h-2.5 rounded-full bg-primary shadow-[0_0_10px_#135bec]" />

          <p className="text-sm font-semibold text-white">
            Current Location
          </p>

          <p className="text-xs text-gray-300 mt-0.5">
            {currentStatus.station
              ? `${currentStatus.station.name} (${currentStatus.station.code})`
              : "En route / Recently departed"}
          </p>

          {meta?.statusNote && (
            <p className="text-[10px] text-gray-400 mt-1">
              {meta.statusNote}
            </p>
          )}
        </div>

        {/* Next Stop */}
        {nextStop && (
          <div className="relative pl-7">
            <div className="absolute left-0 top-1 w-2 h-2 rounded-full bg-white/40" />

            <p className="text-xs font-semibold text-white">
              Next Stop
            </p>

            <p className="text-xs text-gray-300">
              {nextStop.name} ({nextStop.code})
            </p>
          </div>
        )}
      </div>

      {/* Journey Progress */}
      <div className="mt-5">
        <div className="flex justify-between text-[11px] text-gray-400 mb-1">
          <span>Journey Progress</span>
          <span>{currentStatus.journeyCompletedPercent}% completed</span>
        </div>

        <div className="h-2 w-full rounded-full bg-white/10 overflow-hidden">
          <div
            className="h-full rounded-full bg-primary transition-all"
            style={{
              width: `${currentStatus.journeyCompletedPercent}%`,
            }}
          />
        </div>
      </div>

      {/* Footer */}
      <div className="mt-4 pt-3 border-t border-white/10 flex items-center gap-1 text-[10px] text-gray-400">
        <span className="material-symbols-outlined text-[14px]">
          info
        </span>
        Live status may change due to operational conditions
      </div>
    </div>
  );
};

export default LiveStatusCard;
