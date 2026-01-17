import { z } from 'zod';
import { IncidentSeverity } from '@/api';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

const incidentSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional(),
  severity: z.custom<IncidentSeverity>(
    (val) => typeof val === 'string' && val !== '',
    {
      message: 'Severity is required',
    }
  ),
  assigneeId: z.string().optional(),
});

export type IncidentFormData = z.infer<typeof incidentSchema>;

export const useIncidentCreateForm = () => {
  return useForm<IncidentFormData>({
    resolver: zodResolver(incidentSchema),
    mode: 'onChange',
    defaultValues: {
      title: '',
      description: '',
      severity: '' as IncidentSeverity,
      assigneeId: '',
    },
  });
};