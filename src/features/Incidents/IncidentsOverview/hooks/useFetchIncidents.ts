import { Incident as APIIncident } from "@/api"
import { Incident } from "@/common/models/incident"
import { api } from "@/core/api/api"
import { useQuery } from "@tanstack/react-query"

export const useFetchIncidents = () => {
  const { data: incidents, isLoading, error } = useQuery({
    queryKey: ['incidents'],
    queryFn: api.incident.getIncidents,
    select: (incidents: APIIncident[]) => incidents.map((incident: APIIncident): Incident => ({
      id: incident.id,
      title: incident.title,
      description: incident.description,
      status: incident.status,
      severity: incident.severity,
      assigneeId: incident.assigneeId,
      createdAt: new Date(incident.createdAt),
      updatedAt: new Date(incident.updatedAt),
      statusHistory: incident.statusHistory,
    })),
  })
  return { incidents, isLoading, error };
}