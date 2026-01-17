import { z } from 'zod';
import { IncidentSeverity } from '@/api';
import { useForm } from '@tanstack/react-form';

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

type IncidentFormData = z.infer<typeof incidentSchema>;

const defaultValues: IncidentFormData = {
  title: '',
  description: '',
  severity: '' as IncidentSeverity,
  assigneeId: '',
};

export const useIncidentCreateForm = (onSubmit: (value: IncidentFormData) => void) => {
  return useForm({
    defaultValues,
    validators: {
      onBlur: incidentSchema, 
    },
    onSubmit: ({ value }) => {
      onSubmit(value);
    },
  });
};
