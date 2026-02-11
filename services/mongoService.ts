/// <reference types="vite/client" />
import { Team, Member } from '../types';

// URL de l'API - utilise les Vercel Serverless Functions
const API_URL = '/api';

/**
 * Créer une nouvelle équipe dans MongoDB
 */
export const createTeamInMongo = async (
  teamName: string,
  captain: Omit<Member, 'id' | 'paid' | 'date_paid'>,
  invitedEmails: string[] = []
): Promise<Team> => {
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

  try {
    const response = await fetch(`${API_URL}/teams`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newTeam),
    });

    if (!response.ok) {
      throw new Error(`Erreur HTTP: ${response.status}`);
    }

    const createdTeam = await response.json();
    
    // Log les emails invités
    if (invitedEmails.length > 0) {
      console.log(`Invitations envoyées à: ${invitedEmails.join(', ')} pour rejoindre l'équipe "${teamName}"`);
    }

    return createdTeam;
  } catch (error) {
    console.error('Erreur lors de la création de l\'équipe:', error);
    throw error;
  }
};

/**
 * Récupérer toutes les équipes depuis MongoDB
 */
export const getTeamsFromMongo = async (): Promise<Team[]> => {
  try {
    const response = await fetch(`${API_URL}/teams`);

    if (!response.ok) {
      throw new Error(`Erreur HTTP: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Erreur lors de la récupération des équipes:', error);
    throw error;
  }
};

/**
 * Récupérer une équipe par son ID
 */
export const getTeamById = async (teamId: string): Promise<Team | null> => {
  try {
    const response = await fetch(`${API_URL}/team/${teamId}`);

    if (response.status === 404) {
      return null;
    }

    if (!response.ok) {
      throw new Error(`Erreur HTTP: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Erreur lors de la récupération de l\'équipe:', error);
    throw error;
  }
};

/**
 * Rejoindre une équipe existante
 */
export const joinTeamInMongo = async (
  teamId: string,
  member: Omit<Member, 'id' | 'paid' | 'date_paid'>
): Promise<boolean> => {
  const newMember: Member = {
    id: crypto.randomUUID(),
    ...member,
    paid: "false",
    date_paid: null
  };

  try {
    const response = await fetch(`${API_URL}/team/${teamId}/join`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newMember),
    });

    if (!response.ok) {
      throw new Error(`Erreur HTTP: ${response.status}`);
    }

    return true;
  } catch (error) {
    console.error('Erreur lors de la jonction à l\'équipe:', error);
    return false;
  }
};

/**
 * Mettre à jour le statut de paiement d'un membre
 */
export const updatePaymentStatus = async (
  teamId: string,
  memberId: string,
  paid: boolean
): Promise<boolean> => {
  try {
    const response = await fetch(`${API_URL}/team/${teamId}/members/${memberId}/payment`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        paid: paid ? "true" : "false",
        date_paid: paid ? new Date().toISOString() : null
      }),
    });

    if (!response.ok) {
      throw new Error(`Erreur HTTP: ${response.status}`);
    }

    return true;
  } catch (error) {
    console.error('Erreur lors de la mise à jour du paiement:', error);
    return false;
  }
};

/**
 * Supprimer une équipe
 */
export const deleteTeam = async (teamId: string): Promise<boolean> => {
  try {
    const response = await fetch(`${API_URL}/team/${teamId}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error(`Erreur HTTP: ${response.status}`);
    }

    return true;
  } catch (error) {
    console.error('Erreur lors de la suppression de l\'équipe:', error);
    return false;
  }
};
