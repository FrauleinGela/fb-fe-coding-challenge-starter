import { api } from "@/core/api/api"
import { queryClient } from "@/main"
import { useMutation } from "@tanstack/react-query"

type CreateIncidentOptions = {
  onSuccess: () => void
  onError?: (error: Error) => void
}

export const useCreateIncident = (options: CreateIncidentOptions) => {
  const { mutate, error, status, isPending } = useMutation({
    mutationFn: api.incident.createIncident,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["incidents"] })
      options.onSuccess()
    },
    onError: options?.onError
  })

  return { create: mutate, error, status, isPending }
}