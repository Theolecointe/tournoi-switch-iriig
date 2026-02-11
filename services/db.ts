import { Team, Member } from '../types';

const STORAGE_KEY = 'TEAMS_DB';

// Initialize DB with some dummy data if empty
const initDB = () => {
  const existing = localStorage.getItem(STORAGE_KEY);
  if (!existing) {
    const initialData: Team[] = [
      {
        id: "team_001",
        name: "Les Karts Violets",
        members: [
          {
            id: "mem_1",
            firstname: "Jean",
            lastname: "Dupont",
            email: "jean@example.com",
            paid: "true",
            date_paid: "2023-12-01"
          }
        ],
        date_creation: new Date().toISOString(),
        complete: "false"
      }
    ];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initialData));
  }
};

export const getTeams = (): Team[] => {
  initDB();
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};

export const createTeam = (teamName: string, captain: Omit<Member, 'id' | 'paid' | 'date_paid'>, invitedEmails: string[] = []): Team => {
  const teams = getTeams();
  
  const newMember: Member = {
    id: crypto.randomUUID(),
    ...captain,
    paid: "false",
    date_paid: null
  };

  const newTeam: Team = {
    id: crypto.randomUUID(),
    name: teamName,
    members: [newMember],
    invitedEmails: invitedEmails,
    date_creation: new Date().toISOString(),
    complete: "false"
  };

  teams.push(newTeam);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(teams));
  
  // Log les emails invités (à remplacer par un vrai service d'envoi d'emails)
  if (invitedEmails.length > 0) {
    console.log(`Invitations envoyées à: ${invitedEmails.join(', ')} pour rejoindre l'équipe "${teamName}"`);
  }
  
  return newTeam;
};

export const joinTeam = (teamId: string, member: Omit<Member, 'id' | 'paid' | 'date_paid'>): boolean => {
  const teams = getTeams();
  const teamIndex = teams.findIndex(t => t.id === teamId);
  
  if (teamIndex === -1) return false;
  
  const team = teams[teamIndex];
  if (team.members.length >= 4) return false;

  const newMember: Member = {
    id: crypto.randomUUID(),
    ...member,
    paid: "false",
    date_paid: null
  };

  team.members.push(newMember);
  
  if (team.members.length === 4) {
    team.complete = "true";
  }

  teams[teamIndex] = team;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(teams));
  return true;
};