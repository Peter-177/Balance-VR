"use client";

interface ViewportPanelProps {
  exposureActive: boolean;
}

export function ViewportPanel({ exposureActive }: ViewportPanelProps) {
  return (
    <section
      className="absolute left-[380px] top-[85px] w-[1140px] h-[455px] border border-[#1f355a] rounded-sm select-none overflow-hidden"
      style={{ background: 'transparent' }}
    >
      {/* Header */}
      <div
        className="w-full h-[50px] border-b border-[#1f355a] flex items-center justify-between px-6"
        style={{ background: 'transparent' }}
      >
        <span
          className="text-[19px] font-bold text-white tracking-wide"
          style={{ fontFamily: '"Open Sans", sans-serif' }}
        >
          Patient Environment
        </span>

        <div
          className="flex items-center text-[14px] font-bold text-[#a0b8d8] uppercase tracking-wider"
          style={{ fontFamily: '"Open Sans", sans-serif' }}
        >
          Exposure Mode :&nbsp;
          {exposureActive ? (
            <div className="flex items-center gap-2 ml-1">
              <span
                className="w-2.5 h-2.5 rounded-full bg-[#22dd66]"
                style={{ boxShadow: '0 0 8px rgba(34,221,102,0.9)' }}
              />
              <span className="text-[#22dd66]">Active</span>
            </div>
          ) : (
            <div className="flex items-center gap-2 ml-1">
              <span className="w-2.5 h-2.5 rounded-full bg-gray-500" />
              <span className="text-gray-400">Inactive</span>
            </div>
          )}
        </div>
      </div>

      <div
        className="absolute left-[12px] right-[12px] bottom-[12px]"
        style={{ top: '62px', border: '2px solid #1e3050', background: 'transparent' }}
      />
    </section>
  );
}