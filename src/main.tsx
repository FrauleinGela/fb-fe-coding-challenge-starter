import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { initMockApi } from "./api";
import { RouterProvider } from "react-router";
import router from "./core/router/router";

// Initialize mock API to intercept fetch requests
initMockApi();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />,
  </StrictMode>,
);
