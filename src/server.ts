// startServer.ts
import mongoose from "mongoose";
import app from "./app";
import config from "./app/config";

async function startServer() {
  try {
    await mongoose.connect(config.database_url as string, {
      dbName: "library-management",
    });
    console.log("🔋 Database connection established");

    app.listen(config.port, () => {
      console.log(`🚀 Server is running on port ${config.port}`);
    });
  } catch (error) {
    console.error("❌ Failed to connect to database", error);
  }
}

startServer();
