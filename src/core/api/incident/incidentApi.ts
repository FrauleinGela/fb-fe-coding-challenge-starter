import { Incident } from "@/api/types";

const getIncidents = async (): Promise<Incident[]> => {
  const res = await fetch('/api/incidents');
  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || 'Failed to fetch incidents');
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

export const incidentApi = {
  getIncidents,
  getIncident,
};