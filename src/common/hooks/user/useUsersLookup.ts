import { User } from "@/api/types";
import { useFetchUsers } from "./useFetchUsers";

export const useUsersLookup = () => {
  const { users, isLoading, error } = useFetchUsers();
  
  const getUserById = (id: string): User | undefined => {
    return users?.find((user: User) => user.id === id);
  }

  return { getUserById, users, isLoading, error };
};