import app from "./app.js";
import { env } from "./config/env.js";

const PORT = env.PORT || 3000;

const server = app.listen(PORT, () => {
  console.log(`Social media API is running on port ${PORT} on ${env.NODE_ENV} mode.`);
});

function shutdown(signal: string) {
  console.log(`${signal} received. Closing HTTP server....`);

  server.close((error) => {
    console.error("Error while closing server:", error);

    process.exitCode = 1;
    return;
  });
  console.log("HTTP Server closed succssfully.");
}

process.on("SIGINT", () => shutdown("SIGUINT"))
process.on("SIGTERM", ()=> shutdown("SIGTERM"))