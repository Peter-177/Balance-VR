import { useState, useEffect } from "react";

interface VitalsCardProps {
  anxietyLevel: number;
}

export function VitalsCard({anxietyLevel }: VitalsCardProps) {
  const [bpm, setBpm] = useState(100);

  useEffect(() => {
    const interval = setInterval(() => {
      const randomBpm = Math.floor(Math.random() * 21) + 100;
      setBpm(randomBpm);
    }, 800);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="absolute left-[380px] top-[555px] w-[470px] h-[220px] border border-[#1f355a] rounded-sm select-none flex flex-col"
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
        Vitals Monitor
      </h3>

      <div className="p-3.5 flex flex-col gap-2.5 flex-1 justify-center">
        <div className="flex items-center border border-[#1f355a] rounded-sm bg-[#040810]/60 overflow-hidden h-[54px]">
          <div className="flex items-center gap-3.5 flex-1 px-4 h-full border-r border-[#1f355a]">
            <img
              src="/icons/heart.png"
              alt="heart icon"
              className="w-7 h-7 object-contain animate-heartbeat"
            />
            <span
              className="text-[17px] font-bold text-[#a0b8d8]"
              style={{ fontFamily: '"Open Sans", sans-serif' }}
            >
              Heart Rate
            </span>
          </div>
          <div
            className="px-6 font-bold text-white text-[18px] text-center min-w-[140px] tracking-wide"
            style={{ fontFamily: '"Share Tech Mono", monospace' }}
          >
            {bpm} <span className="text-[14px] text-[#a0b8d8] ml-1">BPM</span>
          </div>
        </div>

        <div className="flex items-center border border-[#1f355a] rounded-sm bg-[#040810]/60 overflow-hidden h-[54px]">
          <div className="flex items-center gap-3.5 flex-1 px-4 h-full border-r border-[#1f355a]">
            <img
              src="/icons/anxiety.png"
              alt="anxiety icon"
              className="w-7 h-7 object-contain"
            />
            <span
              className="text-[17px] font-bold text-[#a0b8d8]"
              style={{ fontFamily: '"Open Sans", sans-serif' }}
            >
              Anxiety
            </span>
          </div>
          <div
            className="px-6 font-bold text-white text-[17px] text-center min-w-[140px] tracking-wide"
            style={{ fontFamily: '"Share Tech Mono", monospace' }}
          >
            Level {anxietyLevel.toString().padStart(2, '0')}
          </div>
        </div>
      </div>
    </div>
  );
}

