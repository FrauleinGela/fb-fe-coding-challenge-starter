import { IncidentSeverity, IncidentStatus } from "@/api";

export interface IncidentFilterBy {
  status?: IncidentStatus;
  severity?: IncidentSeverity;
  assigneeId?: string;
  title: string;
}