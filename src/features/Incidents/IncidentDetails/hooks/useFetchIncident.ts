import { Incident } from "@/common/models/incident";
import { api } from "@/core/api/api";
import { Incident as APIIncident } from "@/api/types";
import { useQuery } from "@tanstack/react-query";

export const useFetchIncident = (id: string) => {
  const { data: incident, isLoading, error } = useQuery({
    queryKey: ["incident", id],
    queryFn: () => api.incident.getIncident(id),
    select: (data: APIIncident): Incident => ({
      id: data.id,
      title: data.title,
      description: data.description,
      status: data.status,
      severity: data.severity,
      assigneeId: data.assigneeId,
      createdAt: new Date(data.createdAt),
      updatedAt: new Date(data.updatedAt),
      statusHistory: data.statusHistory.map(entry => ({
        changedAt: new Date(entry.changedAt),
        changedBy: entry.changedBy,
        status: entry.status,
      })),
    }),
  });

  return { incident, isLoading, error };
};