

export function BottomBar() {
  const actions = [
    { icon: '/icons/mic.png', label: 'Voice Guide', width: '210px' },
    { icon: '/icons/mic.png', label: 'Doctor Mic', width: '180px' },
    { icon: '/icons/settings.png', label: 'Setting', width: '180px' },
    { icon: '/icons/report_icon.svg', label: 'Report', width: '180px' },
  ];

  return (
    <footer
      className="absolute left-0 top-[787px] w-[1578px] h-[80px] flex items-center justify-center gap-6 border-t border-[#1f355a] select-none"
      style={{
        background: 'linear-gradient(180deg, #0a1422 0%, #060e1a 100%)',
        boxShadow: '0 -4px 20px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.05)',
      }}
    >
      {actions.map(a => (
        <button
          key={a.label}
          className="vr-btn btn-indigo flex items-center justify-center gap-3 font-semibold text-[14px] text-white tracking-wide opacity-50 cursor-not-allowed"
          style={{
            width: a.width,
            height: '55px',
            padding: 0,
            textTransform: 'none',
          }}
          disabled
        >
          <img
            src={a.icon}
            alt={a.label}
            className="w-5 h-5 object-contain opacity-80"
          />
          {a.label}
        </button>
      ))}
    </footer>
  );
}
