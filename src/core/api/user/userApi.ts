import { User } from "@/api/types";

const getUsers = async (): Promise<User[]> => {
  const res = await fetch('/api/users');
  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || 'Failed to fetch users');
  }
  
  return data;
};

export const userApi = {
 getUsers,  
}
