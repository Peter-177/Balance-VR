"use client";

import { useRef, useState } from "react";
import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { ViewportPanel } from "@/components/ViewportPanel";
import { VitalsCard } from "@/components/cards/VitalsCard";
import { AnxietyCard } from "@/components/cards/AnxietyCard";
import { SessionCard } from "@/components/cards/SessionCard";
import { BottomBar } from "@/components/BottomBar";
import { ScaleContainer } from "@/components/ScaleContainer";
import SudsChart from "@/components/suds-chart/SudsChart";
import { useWebSocket } from "@/hooks/useWebSocket";
import { useSession } from "@/hooks/useSession";

export default function App() {
  const [patientId] = useState("ID-201");
  const [patientName] = useState("Peter");
  const [selectedLevel, setSelectedLevel] = useState(1);
  const [exposureActive] = useState(true);
  const [showGraph, setShowGraph] = useState(false);
  const [chartHistory, setChartHistory] = useState<
    { test: number; anxiety: number }[]
  >([]);
  const [activeChartButton, setActiveChartButton] = useState<number | null>(
    null
  );

  const startSessionRef = useRef<() => void>(() => {});
  const startAnxietyTestRef = useRef<() => void>(() => {});

  const { send } = useWebSocket({
    onSessionCreated: () => startSessionRef.current(),
    onAnxietyTestReceived: () => startAnxietyTestRef.current(),
  });

  const {
    sessionStart,
    seconds,
    attempts,
    lastResult,
    lastResultTime,

    endSession,
    selectLevel,
    startAnxietyTest,
    submitAnxietyResult,

    isLoadingEnd,
    endError,
    isLoadingAnxietyTest,
    anxietyTestError,
    startSession,
  } = useSession(send);

  startSessionRef.current = startSession;
  startAnxietyTestRef.current = startAnxietyTest;

  const startLevel = selectedLevel;

  function handleStartSession() {
    // Session is started automatically via socket event
  }

  function handleEndSession() {
    endSession();
  }

  function handleSelectLevel(level: number) {
    setSelectedLevel(level);
    selectLevel(level);
  }

  function handleCloseGraph() {
    setShowGraph(false);
  }

  function handleToggleGraph() {
    setShowGraph((prev) => !prev);
  }

  function handleStartTest() {
    console.log("Starting anxiety test");
    startAnxietyTest();
  }

  function handleUpdateChartHistory(
    newHistory: { test: number; anxiety: number }[]
  ) {
    setChartHistory(newHistory);
  }

  function handleUpdateActiveChartButton(buttonValue: number | null) {
    setActiveChartButton(buttonValue);
  }

  async function handleSubmitResult(anxietyValue: number) {
    await submitAnxietyResult(anxietyValue);
  }

  return (
    <ScaleContainer>
      <div className="relative w-[1578px] h-[867px] bg-[#070b12] text-white overflow-hidden">
        <Header patientId={patientId} patientName={patientName} />

        <Sidebar
          selectedLevel={selectedLevel}
          onSelectLevel={handleSelectLevel}
          onStartSession={handleStartSession}
          onEndSession={handleEndSession}
        />

        <ViewportPanel exposureActive={exposureActive} />

        <VitalsCard selectedLevel={selectedLevel} />

        <AnxietyCard
          lastResult={lastResult}
          lastResultTime={lastResultTime}
          onStartTest={handleStartTest}
          onShowGraph={handleToggleGraph}
          isLoadingTest={isLoadingAnxietyTest}
          testError={anxietyTestError}
        />

        <SessionCard
          sessionStart={sessionStart}
          startLevel={startLevel}
          attempts={attempts}
          seconds={seconds}

          isLoadingEnd={isLoadingEnd}
          endError={endError}
        />

        <BottomBar />

        {showGraph && (
          <div className="absolute inset-0 z-50 flex flex-col bg-[#e5e7eb]">
            <div className="w-full h-[56px] flex items-center justify-center border-b border-gray-300 flex-shrink-0 bg-[#e5e7eb]">
              <span
                className="text-[18px] font-bold text-gray-500 tracking-wide"
                style={{ fontFamily: '"Open Sans", sans-serif' }}
              >
                SUDS
              </span>
              <button
                onClick={handleCloseGraph}
                className="absolute right-8 w-9 h-9 flex items-center justify-center rounded border border-gray-300 text-gray-500 hover:bg-gray-200 hover:text-gray-800 transition-all text-xl font-bold"
                title="Close"
              >
                ✕
              </button>
            </div>

            <div className="flex-1 p-6 overflow-hidden bg-[#e5e7eb]">
              <SudsChart
                onSubmitResult={handleSubmitResult}
                history={chartHistory}
                activeButton={activeChartButton}
                onUpdateHistory={handleUpdateChartHistory}
                onUpdateActiveButton={handleUpdateActiveChartButton}
              />
            </div>
          </div>
        )}
      </div>
    </ScaleContainer>
  );
}

