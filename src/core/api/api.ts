import { incidentApi } from "./incident/incidentApi";
import { userApi } from "./user/userApi";

export const api = {
  user: userApi,
  incident: incidentApi,
};