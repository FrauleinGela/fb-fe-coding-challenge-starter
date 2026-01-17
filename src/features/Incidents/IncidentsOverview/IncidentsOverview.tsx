import { useFetchIncidents } from "./hooks/useFetchIncidents";
import IncidentList from "./components/IncidentList/IncidentList";
import IncidentFilter from "./components/IncidentFilter/IncidentFilter";
import { IncidentFilterBy } from "./models/models";
import { useState } from "react";
import { incidentHelper } from "./helpers/incidentHelper";
import { Button } from "@/common/ui/shadcn/ui/button";
import { Link } from "react-router";

const IncidentsOverview = () => {
  const {
    incidents,
    isLoading: isIncidentsLoading,
    error: incidentsError,
  } = useFetchIncidents();

  const [filter, setFilter] = useState<IncidentFilterBy>({
    title: '',
  });
  const filteredIncidents = incidentHelper.filter(incidents || [], filter);

  return (
    <div>
      <h1>Incidents</h1>
      <div className="flex flex-col gap-4">
        <div>
          <IncidentFilter filter={filter} onFilterChange={(filter) => {setFilter(filter)}} />
        </div>
        <Button variant="default" className="self-end" asChild>
          <Link to={`/incidents/new`}>
            + Create New Incident
          </Link>
        </Button>
        {isIncidentsLoading && <div>Loading incidents...</div>}
        {incidentsError && <div>Failed to load incidents. Please try again later.</div>}
        {incidents && (
          <IncidentList incidents={filteredIncidents} />
        )}
      </div>
    </div>
  );
};

export default IncidentsOverview;
