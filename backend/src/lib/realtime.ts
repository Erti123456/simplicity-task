import { Server } from "socket.io";
import type { Server as HttpServer } from "http";
import { env } from "./env.js";

let io: Server | null = null;

export const initRealtime = (httpServer: HttpServer) => {
  io = new Server(httpServer, {
    cors: { origin: env.CORS_ORIGIN },
  });
  return io;
};

export const getIO = () => {
  if (!io) {
    throw new Error(
      "Realtime not initialized. Call initRealtime(httpServer) first.",
    );
  }
  return io;
};
