import type { VercelRequest, VercelResponse } from '@vercel/node';
import { connectToDatabase } from '../_lib/mongodb';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Headers CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const { id } = req.query;

  if (!id || typeof id !== 'string') {
    return res.status(400).json({ error: 'ID équipe manquant' });
  }

  try {
    const { db } = await connectToDatabase();
    const teamsCollection = db.collection('teams');

    // GET - Récupérer une équipe par ID
    if (req.method === 'GET') {
      const team = await teamsCollection.findOne({ id: id });
      
      if (!team) {
        return res.status(404).json({ error: 'Équipe non trouvée' });
      }
      
      return res.status(200).json(team);
    }

    // DELETE - Supprimer une équipe
    if (req.method === 'DELETE') {
      const result = await teamsCollection.deleteOne({ id: id });
      
      if (result.deletedCount === 0) {
        return res.status(404).json({ error: 'Équipe non trouvée' });
      }
      
      return res.status(200).json({ success: true });
    }

    return res.status(405).json({ error: 'Méthode non autorisée' });
  } catch (error) {
    console.error('Erreur API team:', error);
    return res.status(500).json({ error: 'Erreur serveur' });
  }
}
