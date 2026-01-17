import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router";
import App from "../../App";
import { IncidentCreate } from "@/features/Incidents/IncidentCreate/IncidentCreate";

const IncidentsOverview = lazy(() => 
  import("@/features/Incidents/IncidentsOverview/IncidentsOverview")
);

const IncidentDetail = lazy(() =>
  import("@/features/Incidents/IncidentDetails/IncidentDetails")
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
        path: "incidents/:id",
        element: <IncidentDetail />
      },
      {
        path: "incidents/new",
        element: <IncidentCreate />
      },
      {
        path: "*",
        element: <IncidentsOverview />
      },
    ],
  },
]);

export default router;