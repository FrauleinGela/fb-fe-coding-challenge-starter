import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { initMockApi } from "./api";
import { RouterProvider } from "react-router";
import router from "./core/router/router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Initialize mock API to intercept fetch requests
initMockApi();

// Create a client
export const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>,
);
