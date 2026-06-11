"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import axios from "axios";

type SendFn = (event: string, data: Record<string, unknown>) => void;

const REST_BASE = "https://vr-demo-api-production.up.railway.app";

export function useSession(send: SendFn) {
  const [isRunning, setIsRunning] = useState(false);
  const [sessionStart, setSessionStart] = useState("00:00");

  const [seconds, setSeconds] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [lastResult, setLastResult] = useState<number>(0);
  const [lastResultTime, setLastResultTime] = useState("00:00");
  const [isLoadingEnd, setIsLoadingEnd] = useState(false);
  const [endError, setEndError] = useState<string | null>(null);
  const [isLoadingAnxietyTest, setIsLoadingAnxietyTest] = useState(false);
  const [anxietyTestError, setAnxietyTestError] = useState<string | null>(null);
  const [isLoadingLevelSelect, setIsLoadingLevelSelect] = useState(false);
  const [levelSelectError, setLevelSelectError] = useState<string | null>(null);

  const startTimeRef = useRef<string | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const testNameRef = useRef<string | null>(null);
  const testCreatedAtRef = useRef<string | null>(null);
  const pollingIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const lastPolledResultRef = useRef<number | null>(null);
  const isRunningRef = useRef(false);
  const levelSelectInFlightRef = useRef(false);


  const startSession = useCallback(() => {
    if (isRunningRef.current) {
      console.log("[Session] Already running — ignoring duplicate create_session");
      return;
    }
    isRunningRef.current = true;

    const now = new Date();
    const iso = now.toISOString();
    startTimeRef.current = iso;

    const hh = now.getHours().toString().padStart(2, "0");
    const mm = now.getMinutes().toString().padStart(2, "0");

    setIsRunning(true);
    setSeconds(0);
    setAttempts(0);
    setEndError(null);
    setSessionStart(`${hh}:${mm}`);

    lastPolledResultRef.current = null;

    timerRef.current = setInterval(() => setSeconds((s) => s + 1), 1000);

    console.log("[Session] Started at:", `${hh}:${mm}`, "ISO:", iso);
  }, []);

  const selectLevel = useCallback(async (levelNumber: number) => {
    if (levelSelectInFlightRef.current) {
      console.log("[Level Select] Request already in flight — skipping");
      return;
    }
    levelSelectInFlightRef.current = true;

    const levelName = `START LEVEL ${String(levelNumber).padStart(2, "0")}`;

    setIsLoadingLevelSelect(true);
    setLevelSelectError(null);

    try {
      const apiUrl = `${REST_BASE}/demo/test`;
      const requestBody = { name: levelName };

      console.log(`[Level Select] Requesting level ${levelNumber}...`);

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error(`Failed to select level: ${response.status}`);
      }

      await response.json();
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Error selecting level";
      console.error("[REST] Error selecting level:", errorMessage);
      setLevelSelectError(errorMessage);
    } finally {
      levelSelectInFlightRef.current = false;
      setIsLoadingLevelSelect(false);
    }
  }, []);

  const endSession = useCallback(async () => {
    isRunningRef.current = false;

    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    if (pollingIntervalRef.current) {
      clearInterval(pollingIntervalRef.current);
      pollingIntervalRef.current = null;
    }
    setIsRunning(false);

    const endTime = new Date().toISOString();

    try {
      setIsLoadingEnd(true);
      setEndError(null);
      const apiUrl = `${REST_BASE}/demo/session/end`;
      console.log("==> Sending request to API:", apiUrl);

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ endTime }),
      });

      if (!response.ok) {
        throw new Error("Failed to end session");
      }

      const data = await response.json();
      console.log("==> Received response from API:", data);
    } catch (err) {
      setEndError(
        err instanceof Error ? err.message : "Error ending session"
      );
    } finally {
      setIsLoadingEnd(false);
      startTimeRef.current = null;
    }
  }, []);

  const startAnxietyTest = useCallback(async () => {
    const now = new Date();
    const iso = now.toISOString();
    testCreatedAtRef.current = iso;

    setIsLoadingAnxietyTest(true);
    setAnxietyTestError(null);

    send("start_anxiety_test", {
      createdAt: iso,
    });

    try {
      const apiUrl = `${REST_BASE}/demo/anxiety-test`;
      const requestBody = { show: true };

      console.log("Starting anxiety test");
      console.log("Sending to /demo/anxiety-test:", requestBody);

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error("Failed to start anxiety test");
      }

      const data = await response.json();
      console.log("Anxiety test response status:", response.status);
      console.log("Anxiety test response body:", data);

      send("anxiety_test_response", data);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Error starting anxiety test";
      console.error("[REST] Error during anxiety test:", errorMessage);
      console.error("Error details:", err);
      setAnxietyTestError(errorMessage);
    } finally {
      setIsLoadingAnxietyTest(false);
    }
  }, [send]);

  const submitAnxietyResult = useCallback(
    async (anxietyValue: number) => {
      const now = new Date();
      const iso = now.toISOString();
      const hh = now.getHours().toString().padStart(2, "0");
      const mm = now.getMinutes().toString().padStart(2, "0");

      const nextAttempts = attempts + 1;
      setAttempts(nextAttempts);

      setLastResult(anxietyValue);
      setLastResultTime(`${hh}:${mm}`);

      send("update_test", {
        name: testNameRef.current ?? null,
        startTime: testCreatedAtRef.current ?? null,
        attempts: nextAttempts,
        result: anxietyValue,
        createdAt: iso,
      });

      try {
        await axios.post(`${REST_BASE}/demo/anxiety-test`, { show: false });
      } catch (err) {
        console.error("[REST] Failed to hide anxiety test UI:", err);
      }

      testNameRef.current = null;
      testCreatedAtRef.current = null;
    },
    [attempts, send]
  );

  // useEffect(() => {
  //   startSession();
  // }, [startSession])

  useEffect(() => {
    if (!isRunning) return;

    const pollForResults = async () => {
      try {
        const response = await fetch(`${REST_BASE}/demo/test`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({}),
        });

        if (!response.ok) return;

        const data = await response.json();
        const newResult =
          data.result !== undefined ? data.result : data.lastResult;

        if (
          newResult !== null &&
          newResult !== undefined &&
          newResult !== lastPolledResultRef.current
        ) {
          lastPolledResultRef.current = newResult;

          const resultDate = data.createdAt ? new Date(data.createdAt) : new Date();
          const hh = resultDate.getHours().toString().padStart(2, "0");
          const mm = resultDate.getMinutes().toString().padStart(2, "0");

          setLastResult(newResult);
          setLastResultTime(`${hh}:${mm}`);

          setAttempts((prevAttempts) => {
            const nextAttempts = prevAttempts + 1;
            send("result_update", {
              result: newResult,
              attempts: nextAttempts,
              createdAt: data.createdAt || resultDate.toISOString(),
            });
            return nextAttempts;
          });
        }
      } catch (err) {
        console.error("[REST] Error polling for result:", err);
      }
    };

    pollingIntervalRef.current = setInterval(pollForResults, 3000);

    return () => {
      if (pollingIntervalRef.current) {
        clearInterval(pollingIntervalRef.current);
        pollingIntervalRef.current = null;
      }
    };
  }, [isRunning, send]);

  return {
    isRunning,
    sessionStart,
    seconds,
    attempts,
    lastResult,
    lastResultTime,
    startSession,   
    endSession,
    selectLevel,
    startAnxietyTest,
    submitAnxietyResult,
    isLoadingEnd,
    endError,
    isLoadingAnxietyTest,
    anxietyTestError,
    isLoadingLevelSelect,
    levelSelectError,
  };
}