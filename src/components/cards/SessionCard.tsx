interface SessionCardProps {
  sessionStart: string;
  startLevel: number;
  attempts: number;
  seconds: number;
  isLoadingEnd: boolean;
  endError: string | null;
}

export function SessionCard({
  sessionStart,
  startLevel,
  attempts,
  seconds,
  isLoadingEnd,
  endError,
}: SessionCardProps) {
  const sessionTime = new Date(seconds * 1000).toISOString().substring(11, 19);

  return (
    <div
      className="absolute left-[1250px] top-[555px] w-[270px] h-[220px] border border-[#1f355a] rounded-sm select-none flex flex-col"
      style={{
        background: 'linear-gradient(135deg, #0b1525 0%, #050b13 100%)',
        boxShadow: '0 0 20px rgba(0, 100, 255, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.05)',
      }}
    >
      <h3
        className="w-full text-center py-2.5 border-b border-[#1f355a] text-white text-[16px] font-bold tracking-wide"
        style={{
          background: 'linear-gradient(180deg, #0e1a2d 0%, #07101d 100%)',
          fontFamily: '"Open Sans", sans-serif',
        }}
      >
        Session Notes
      </h3>

      <div className="p-3.5 flex flex-col flex-1 justify-between">
        <div
          className="flex flex-col gap-1.5 text-[14px] font-semibold"
          style={{ fontFamily: '"Open Sans", sans-serif' }}
        >
          <div className="flex justify-between items-center">
            <span className="text-[#a0b8d8]">Session Start</span>
            <span className="text-white font-bold text-right text-[14px]">
              {sessionStart}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-[#a0b8d8]">Start Level</span>
            <span className="text-white font-bold text-right text-[14px]">{String(startLevel).padStart(2, '0')}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-[#a0b8d8]">Attempts</span>
            <span className="text-white font-bold">{attempts.toString().padStart(2, '0')}</span>
          </div>
        </div>

        <div className="flex flex-col">
          <div
            className="w-full text-center py-1 border-t border-b border-[#1e3050] text-white text-[15px] font-bold tracking-wide uppercase mb-2"
            style={{
              background: 'linear-gradient(180deg, rgba(14,24,40,0.5) 0%, rgba(7,16,30,0.5) 100%)',
              fontFamily: '"Open Sans", sans-serif',
            }}
          >
            Session Time
          </div>
          <div
            className="text-center font-bold text-white text-[20px] tracking-[0.1em]"
            style={{ fontFamily: '"Share Tech Mono", monospace' }}
          >
            {isLoadingEnd ? (
              <span className="text-yellow-400 text-[18px]">Ending...</span>
            ) : endError ? (
              <span className="text-red-400 text-[18px]" title={endError}>Error</span>
            ) : (
              sessionTime
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
