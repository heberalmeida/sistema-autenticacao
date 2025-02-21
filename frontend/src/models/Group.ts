import type { User } from "./User";

export interface Group {
    id: number;
    name: string;
    users?: User[];
    created_at?: string;
    updated_at?: string;
  }
  