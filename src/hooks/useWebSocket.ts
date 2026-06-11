"use client";

import { useEffect, useRef, useCallback } from "react";
import { io, Socket } from "socket.io-client";

const SERVER_URL = "wss://vr-demo-api-production.up.railway.app";

type WebSocketOptions = {
  onSessionCreated?: () => void;
};

export function useWebSocket(options?: WebSocketOptions) {
  const socketRef = useRef<Socket | null>(null);
  const optionsRef = useRef(options);
  optionsRef.current = options;

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

  
    socket.on("create_session", () => {
      console.log("[Socket.IO] create_session received from backend");

      const now = new Date();
      const hh = now.getHours().toString().padStart(2, "0");
      const mm = now.getMinutes().toString().padStart(2, "0");
      console.log("[Socket.IO] Frontend time:", `${hh}:${mm}`);

      
      optionsRef.current?.onSessionCreated?.();
    });

    let updateTestLogged = false;

    socket.onAny((eventName) => {
      if (eventName === "update_test") {
        if (updateTestLogged) return;
        updateTestLogged = true;
      }
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

