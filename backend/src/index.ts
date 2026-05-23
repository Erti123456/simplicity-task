import http from "http";
import { env } from "./lib/env.js";
import { app } from "./app.js";
import { initRealtime } from "./lib/realtime.js";

const httpServer = http.createServer(app);
initRealtime(httpServer);
httpServer.listen(env.PORT, () => {
  console.log("The server is running on port: " + env.PORT);
});
