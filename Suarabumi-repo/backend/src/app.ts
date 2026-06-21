import express from "express";
import cors from "cors";
import path from "path";
import authRoutes from "./routes/auth.js";
import profileRoutes from "./routes/profile.js";
import dashboardRoutes from "./routes/dashboard.js";
import climateImpactRoutes from "./routes/climate-impact.js";

export function createApp() {
  const app = express();

  app.use(cors());
  app.use(express.json());

  const uploadDir = process.env.UPLOAD_DIR ?? "./uploads";
  app.use("/uploads", express.static(path.resolve(uploadDir)));

  app.get("/", (_req, res) => {
    res.json({
      service: "Suarabumi API",
      framework: "Express.js",
      status: "running",
      docs: "See README.md in the project root",
      endpoints: {
        health: "GET /health",
        auth: {
          register: "POST /api/auth/register",
          login: "POST /api/auth/login",
        },
        profile: "GET|PATCH /api/profile (Bearer token)",
        dashboard: "GET /api/dashboard (Bearer token)",
        climateImpact: "GET /api/climate-impact (Bearer token)",
      },
      demoLogin: {
        email: "putra.wijaya@email.com",
        password: "password123",
      },
    });
  });

  app.get("/health", (_req, res) => {
    res.json({ status: "ok", service: "suarabumi-api" });
  });

  app.use("/api/auth", authRoutes);
  app.use("/api/profile", profileRoutes);
  app.use("/api/dashboard", dashboardRoutes);
  app.use("/api/climate-impact", climateImpactRoutes);

  app.use(
    (
      err: Error,
      _req: express.Request,
      res: express.Response,
      _next: express.NextFunction
    ) => {
      console.error(err);
      res.status(500).json({ error: err.message ?? "Internal server error" });
    }
  );

  return app;
}
