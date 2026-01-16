import { Incident } from "@/common/models/incident";
import { IncidentFilterBy } from "../models/models";

const filter = (incidents: Incident[], filterBy: IncidentFilterBy): Incident[] => {
  return incidents.filter((incident: Incident) => {
    const matchTitle = incident.title.toLowerCase().trim().includes(filterBy.title.toLowerCase());
    const matchesSeverity = !filterBy.severity || incident.severity === filterBy.severity;
    const matchesStatus = !filterBy.status || incident.status === filterBy.status;
    const matchesAssignee = !filterBy.assigneeId || incident.assigneeId === filterBy.assigneeId;

    return matchTitle && matchesSeverity && matchesStatus && matchesAssignee;
  });
};

export const incidentHelper = {
  filter,
};  