

interface AnxietyCardProps {
  lastResult: number;
  lastResultTime: string;
  onStartTest: () => void;
  onShowGraph: () => void;
  isLoadingTest?: boolean;
  testError?: string | null;
}

export function AnxietyCard({ lastResult, lastResultTime, onStartTest, onShowGraph, isLoadingTest = false, testError = null }: AnxietyCardProps) {
  return (
    <div
      className="absolute left-[870px] top-[555px] w-[360px] h-[220px] border border-[#1f355a] rounded-sm select-none flex flex-col"
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
        Anxiety Assessment
      </h3>

      <div className="p-3.5 flex flex-col justify-center gap-2 flex-1">
        <button
          onClick={onStartTest}
          disabled={isLoadingTest}
          className="vr-btn btn-blue-md w-[220px] h-[36px] mx-auto text-[14px] flex items-center justify-center disabled:opacity-60 disabled:cursor-not-allowed"
          style={{ textTransform: 'none', padding: 0 }}
        >
          {isLoadingTest ? 'Loading...' : 'Start Anxiety Test'}
        </button>

        <button
          onClick={onShowGraph}
          className="vr-btn btn-blue-md w-[220px] h-[36px] mx-auto text-[14px] flex items-center justify-center"
          style={{ textTransform: 'none', padding: 0 }}
        >
          Show Graph
        </button>

        <div
          className="text-center text-[#c0d0e8] text-[13px] font-semibold mt-1 tracking-wider leading-relaxed"
          style={{ fontFamily: '"Open Sans", sans-serif' }}
        >
          <div>Last Result : {lastResult}</div>
          <div>At: {lastResultTime}</div>
          {testError && (
            <div className="text-red-400 mt-1 text-[12px]" title={testError}>
              Error: {testError}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
