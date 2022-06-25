import app from "./app";

process.on("uncaughtException", (err) => {
  // uncaught exceptions are meant to stop the server
  console.log("UNCAUGHT EXCEPTION! 💥 Shutting down...");
  console.log(err.name, err.message);
  process.exit(1);
});

const port = process.env.PORT || 5200;
const server = app.listen(port, () => {
  console.log(`Server Running on Port: http://localhost:${port}\n`);
});

process.on(
  "unhandledRejection",
  (reason: unknown, promise: Promise<unknown>) => {
    console.log("UNHANDLED REJECTION! 💥 Shutting down...");
    console.log(reason, promise);
    server.close(() => {
      process.exit(1);
    });
  }
);

process.on("SIGTERM", () => {
  console.log("👋 SIGTERM RECEIVED. Shutting down gracefully");
  server.close(() => {
    console.log("💥 Process terminated!");
  });
});
