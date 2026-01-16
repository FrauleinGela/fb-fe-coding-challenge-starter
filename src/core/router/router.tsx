import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router";
import App from "../../App";

const IncidentsOverview = lazy(() => 
  import("@/features/Incidents/IncidentsOverview/IncidentsOverview")
);

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={<div>Loading App...</div>}>
        <App />
      </Suspense>
    ),
    children: [
      { 
        index: true,
        element: <IncidentsOverview />
      },
      {
        path: "*",
        element: <IncidentsOverview />
      },
    ],
  },
]);

export default router;