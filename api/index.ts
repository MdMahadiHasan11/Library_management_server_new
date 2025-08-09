// api/index.ts
import serverlessExpress from "@vendia/serverless-express";
import mongoose from "mongoose";
import config from "../app/config";
import app from "../app";
// import config from "../src/app/config";

let isConnected = false;

async function connectDB() {
  if (!isConnected) {
    await mongoose.connect(config.database_url as string, {
      dbName: "library-management",
    });
    isConnected = true;
    console.log("🔋 Database connection established (Vercel)");
  }
}

export default async function handler(req: any, res: any) {
  await connectDB();
  const expressHandler = serverlessExpress({ app });
  return expressHandler(req, res);
}
