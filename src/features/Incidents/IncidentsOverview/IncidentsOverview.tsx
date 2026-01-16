import { useFetchIncidents } from "./hooks/useFetchIncidents";
import IncidentList from "./components/IncidentList/IncidentList";

const IncidentsOverview = () => {
  const {
    incidents,
    isLoading: isIncidentsLoading,
    error: incidentsError,
  } = useFetchIncidents();

  return (
    <div>
      <h1>Incidents</h1>
      {isIncidentsLoading && <div>Loading incidents...</div>}
      {incidentsError && (
        <div>Failed to load incidents. Please try again later.</div>
      )}
      {incidents && <IncidentList incidents={incidents} />}
    </div>
  );
};

export default IncidentsOverview;
