import "./tailwind.css";
import { hydrateRoot } from "react-dom/client";
import { StrictMode } from "react";
import { RouterProvider } from "react-router-dom";
import { createRouter } from "react-router/server";
import routes from "./routes";

// This assumes you export your route objects from app/routes/index.ts
const router = createRouter({ routes });

hydrateRoot(
  document.getElementById("root"),
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
