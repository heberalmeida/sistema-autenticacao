export interface User {
  id: number | null;
  name: string;
  email: string;
  group_ids: number[];
  password?: string;
  groups?: { id: number; name: string }[];
};