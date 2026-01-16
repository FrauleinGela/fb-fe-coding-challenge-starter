import { api } from "@/core/api/api"
import { useQuery } from "@tanstack/react-query"

export const useFetchUsers = () => {
  const { data: users, isLoading, error } = useQuery({
    queryKey: ['users'],
    queryFn: api.user.getUsers,
  })

  return { users, isLoading, error }
}