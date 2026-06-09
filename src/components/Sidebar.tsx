

interface SidebarProps {
  selectedLevel: number;
  onSelectLevel: (level: number) => void;
  onStartSession: () => void;
  onEndSession: () => void;
}

export function Sidebar({ selectedLevel, onSelectLevel, onStartSession, onEndSession }: SidebarProps) {
  return (
    <aside
      className="absolute left-[20px] top-[85px] w-[320px] h-[690px] border border-[#1c2e50] rounded-sm select-none"
      style={{
        background: 'linear-gradient(160deg, #0c1828 0%, #060c18 100%)',
        boxShadow: '2px 0 16px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.04)',
      }}
    >
      <button
        className="absolute left-[30px] top-[25px] w-[260px] h-[50px] vr-btn btn-green text-[15px] opacity-50 cursor-not-allowed"
        onClick={onStartSession}
        disabled
      >
        START TRAINING
      </button>

      <button
        className="absolute left-[30px] top-[110px] w-[260px] h-[50px] vr-btn btn-red text-[15px]"
        onClick={onEndSession}
      >
        END SESSION
      </button>

      <div
        className="absolute left-0 top-[205px] w-[320px] h-[390px] border-t border-[#1c2e50] flex flex-col items-center"
      >
        <div
          className="w-full text-center py-3.5 border-b border-[#1c2e50] text-[#7ea8cc] text-[13px] font-extrabold tracking-[0.18em] uppercase"
        >
          THERAPY LEVELS
        </div>

        <div className="flex flex-col gap-[12px] mt-[16px] w-[255px]">
          {[1, 2, 3, 4, 5, 6].map(n => (
            <button
              key={n}
              className={`vr-btn ${selectedLevel === n ? 'btn-level-active' : 'btn-level-default'} ${n >= 4 ? 'opacity-50 cursor-not-allowed' : ''}`}
              style={{ width: '255px', height: '42px', padding: 0 }}
              onClick={() => onSelectLevel(n)}
              disabled={n >= 4}
            >
              START LEVEL&nbsp;{String(n).padStart(2, '0')}
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
}
