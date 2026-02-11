export interface Member {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  paid: string; // "true" | "false" kept as string based on user template
  date_paid: string | null;
}

export interface Team {
  _id?: string; // ID MongoDB
  id: string;
  name: string;
  members: Member[];
  invitedEmails?: string[];
  date_creation: string;
  complete: string; // "true" | "false" kept as string based on user template
}