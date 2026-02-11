import type { VercelRequest, VercelResponse } from '@vercel/node';
import { connectToDatabase } from '../../_lib/mongodb';
import { ObjectId } from 'mongodb';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Headers CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Méthode non autorisée' });
  }

  const { id } = req.query;

  if (!id || typeof id !== 'string') {
    return res.status(400).json({ error: 'ID équipe manquant' });
  }

  // Convertir l'ID string en ObjectId MongoDB
  let objectId: ObjectId;
  try {
    objectId = new ObjectId(id);
  } catch {
    return res.status(400).json({ error: 'ID invalide' });
  }

  try {
    const { db } = await connectToDatabase();
    const teamsCollection = db.collection('Game_team');

    const member = req.body;

    if (!member.firstname || !member.lastname || !member.email) {
      return res.status(400).json({ error: 'Données membre invalides' });
    }

    // Vérifier que l'équipe existe et n'est pas complète
    const team = await teamsCollection.findOne({ _id: objectId });

    if (!team) {
      return res.status(404).json({ error: 'Équipe non trouvée' });
    }

    if (team.members && team.members.length >= 4) {
      return res.status(400).json({ error: 'L\'équipe est déjà complète' });
    }

    // Ajouter le nouveau membre avec un ID généré
    const newMember = {
      id: new ObjectId().toString(),
      ...member,
      paid: "false",
      date_paid: null
    };

    // Ajouter le membre à l'équipe
    const updateData: any = {
      $push: { members: newMember }
    };

    // Si l'équipe atteint 4 membres, la marquer comme complète
    if (team.members && team.members.length === 3) {
      updateData.$set = { complete: "true" };
    }

    await teamsCollection.updateOne(
      { _id: objectId },
      updateData
    );

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Erreur API join:', error);
    return res.status(500).json({ error: 'Erreur serveur' });
  }
}
