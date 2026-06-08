

interface ViewportPanelProps {
  exposureActive: boolean;
}

export function ViewportPanel({ exposureActive }: ViewportPanelProps) {
  return (
    <section
      className="absolute left-[380px] top-[85px] w-[1140px] h-[455px] border border-[#1f355a] rounded-sm select-none"
      style={{
        background: 'linear-gradient(135deg, #0b1525 0%, #050b13 100%)',
        boxShadow: '0 0 20px rgba(0, 100, 255, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.05)',
      }}
    >
      <div
        className="w-full h-[50px] border-b border-[#1f355a] flex items-center justify-between px-6"
        style={{
          background: 'linear-gradient(180deg, #0e1a2d 0%, #07101d 100%)',
        }}
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
          Exposure Mode : &nbsp;
          {exposureActive ? (
            <div className="flex items-center">
              <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#22dd66] mr-2 shadow-[0_0_8px_rgba(34,221,102,0.8)]"></span>
              <span className="text-[#22dd66]">Active</span>
            </div>
          ) : (
            <div className="flex items-center">
              <span className="inline-block w-2.5 h-2.5 rounded-full bg-gray-500 mr-2"></span>
              <span className="text-gray-400">Inactive</span>
            </div>
          )}
        </div>
      </div>

      <div
        className="absolute left-[20px] top-[60px] w-[1100px] h-[375px] border-[3px] border-[#1e2d4a] rounded-sm bg-[#040810] overflow-hidden shadow-[0_0_15px_rgba(0,100,255,0.2)]"
      />
    </section>
  );
}
