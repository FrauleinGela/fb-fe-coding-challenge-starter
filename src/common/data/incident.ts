import { IncidentSeverity, IncidentStatus } from '@/api/types';

export const incidentSeverities = [
  'Low',
  'Medium',
  'High',
  'Critical',
] as const satisfies IncidentSeverity[];

export const incidentStatuses = [
  'Open',
  'In Progress',
  'Resolved',
] as const satisfies IncidentStatus[];
