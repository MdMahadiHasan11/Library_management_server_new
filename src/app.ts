import express, { Application, Request, Response } from "express";
import cors from "cors";
import router from "./app/routes";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";

const app: Application = express();

// Middlewares
app.use(express.json());
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://library-management-minimal-web.vercel.app",
    ],
  })
);

app.use("/api", router);

// Default route
app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "Welcome to Library Management API",
  });
});

// Global error handling middleware
app.use(globalErrorHandler);

// Not found route
app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

export default app;
