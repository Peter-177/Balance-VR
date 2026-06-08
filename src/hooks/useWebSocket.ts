"use client";

import { useEffect, useRef, useCallback } from "react";
import { io, Socket } from "socket.io-client";

const SERVER_URL = "wss://vr-demo-api-production.up.railway.app";

export function useWebSocket() {
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    const socket = io(SERVER_URL, {
      transports: ["websocket"],
    });
    socketRef.current = socket;

    socket.on("connect", () => {
      console.log("[Socket.IO] Connected. ID:", socket.id);
    });

    socket.on("disconnect", (reason) => {
      console.log("[Socket.IO] Disconnected. Reason:", reason);
    });

    socket.on("connect_error", (err) => {
      console.warn("[Socket.IO] Connection error:", err.message);
    });

    socket.onAny((eventName, ...args) => {
      console.log("[Socket.IO] Event received:", eventName, args);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const send = useCallback((event: string, data: Record<string, unknown>) => {
    const socket = socketRef.current;
    if (socket && socket.connected) {
      socket.emit(event, data);
    } else {
      console.warn("[Socket.IO] Cannot send — not connected. Event:", event);
    }
  }, []);

  return { send };
}
