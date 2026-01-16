import { IncidentSeverity, IncidentStatus } from "@/api/types";

export interface Incident {
  id: string;
  title: string;
  description: string;
  status: IncidentStatus;
  severity: IncidentSeverity;
  assigneeId: string | null;
  createdAt: Date;
  updatedAt: Date;
  statusHistory: {
    changedAt: Date;
    changedBy: string;
    status: IncidentStatus;
  }[]; 
}
