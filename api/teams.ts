import type { VercelRequest, VercelResponse } from '@vercel/node';
import { connectToDatabase } from './_lib/mongodb';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Headers CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    const { db } = await connectToDatabase();
    const teamsCollection = db.collection('teams');

    // GET - Récupérer toutes les équipes
    if (req.method === 'GET') {
      const teams = await teamsCollection.find({}).toArray();
      return res.status(200).json(teams);
    }

    // POST - Créer une nouvelle équipe
    if (req.method === 'POST') {
      const team = req.body;
      
      if (!team.name || !team.members || team.members.length === 0) {
        return res.status(400).json({ error: 'Données invalides' });
      }

      const result = await teamsCollection.insertOne(team);
      
      return res.status(201).json({
        ...team,
        _id: result.insertedId
      });
    }

    return res.status(405).json({ error: 'Méthode non autorisée' });
  } catch (error) {
    console.error('Erreur API teams:', error);
    return res.status(500).json({ error: 'Erreur serveur' });
  }
}
