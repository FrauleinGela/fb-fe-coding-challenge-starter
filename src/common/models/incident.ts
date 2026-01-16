import { IncidentSeverity, IncidentStatus, StatusHistoryEntry } from "@/api/types";

export interface Incident {
  id: string;
  title: string;
  description: string;
  status: IncidentStatus;
  severity: IncidentSeverity;
  assigneeId: string | null;
  createdAt: Date;
  updatedAt: Date;
  statusHistory: StatusHistoryEntry[]; 
}
