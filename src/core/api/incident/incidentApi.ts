import { Incident, IncidentSeverity } from "@/api/types";

const getIncidents = async (): Promise<Incident[]> => {
  const res = await fetch("/api/incidents");
  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Failed to fetch incidents");
  }

  return data;
};

const getIncident = async (id: string): Promise<Incident> => {
  const res = await fetch(`/api/incidents/${id}`);
  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || `Failed to fetch incident with id ${id}`);
  }

  return data;
};

const createIncident = async (incidentPayload: {
  title: string;
  description?: string;
  severity: IncidentSeverity;
  assigneeId?: string;
}): Promise<Incident> => {
  const res = await fetch("/api/incidents", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(incidentPayload),
  });
  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Failed to create incident");
  }

  return data;
};

export const incidentApi = {
  getIncidents,
  getIncident,
  createIncident,
};
