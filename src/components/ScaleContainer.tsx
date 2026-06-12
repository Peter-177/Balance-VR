import { useEffect, useState, useRef, type ReactNode } from 'react';

export function ScaleContainer({ children }: { children: ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const handleResize = () => {
      if (!containerRef.current) return;
      const width = window.innerWidth;
      const height = window.innerHeight;
      const scaleX = width / 1578;
      const scaleY = height / 867;
      const newScale = Math.min(scaleX, scaleY);
      setScale(newScale);
    };

    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-[#050911] overflow-hidden select-none">
      <div
        ref={containerRef}
        className="relative origin-center shrink-0 shadow-[0_0_50px_rgba(0,0,0,0.8)] overflow-hidden rounded-md border border-[#1a2d4a]"
        style={{
          width: '1578px',
          height: '867px',
          transform: `scale(${scale})`,
        }}
      >
        {children}
      </div>
    </div>
  );
}
