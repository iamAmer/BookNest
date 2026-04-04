import { Elysia } from "elysia";
import { cors } from "@elysiajs/cors";
import { swagger } from "@elysiajs/swagger";
import { healthRoutes } from "./routes/health";

const app = new Elysia()
  .use(cors())
  .use(
    swagger({
      path: "/docs",
      documentation: {
        info: {
          title: "BookNest API",
          version: "0.1.0",
          description: "Adaptive Reading Platform — Core Backend",
        },
      },
    })
  )
  .use(healthRoutes)
  .listen(3001);

console.log(`🦊 Backend running at http://localhost:${app.server?.port}`);

export type App = typeof app;
