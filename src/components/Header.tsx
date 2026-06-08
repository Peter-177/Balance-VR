

interface HeaderProps {
  patientId: string;
  patientName: string;
}

export function Header({ patientId, patientName }: HeaderProps) {
  return (
    <header
      className="absolute left-0 top-0 w-[1578px] h-[70px] flex items-center justify-between px-8 border-b border-[#1f355a] z-10"
      style={{
        background: 'linear-gradient(180deg, #0e1b2f 0%, #07101d 100%)',
        boxShadow: '0 4px 25px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.05)',
      }}
    >
      <span
        style={{
          fontFamily: '"Orbitron", sans-serif',
          fontWeight: 700,
          fontSize: '25px',
          color: '#ffffff',
          letterSpacing: '0.05em',
          textShadow: '0 0 10px rgba(255, 255, 255, 0.2), 0 0 20px rgba(0, 100, 255, 0.2)',
        }}
      >
        Balance VR ™
      </span>

      <div
        className="flex items-center gap-12 text-[15px] font-semibold text-[#a0b8d8] tracking-wider"
        style={{ fontFamily: '"Open Sans", sans-serif' }}
      >
        <div>
          Patient : <span className="text-white font-bold ml-1">{patientId}</span>
        </div>
        <div>
          Name : <span className="text-white font-bold ml-1">{patientName}</span>
        </div>
      </div>
    </header>
  );
}
