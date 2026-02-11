import React, { useState } from 'react';
import { createTeamInMongo } from '../services/mongoService';
import { X, Trophy, Gamepad2, Mail, UserPlus, Loader2 } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const RegisterModal: React.FC<Props> = ({ isOpen, onClose, onSuccess }) => {
  const [teamName, setTeamName] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [teammateEmails, setTeammateEmails] = useState(['', '', '']);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateTeammateEmail = (index: number, value: string) => {
    const newEmails = [...teammateEmails];
    newEmails[index] = value;
    setTeammateEmails(newEmails);
  };

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const validEmails = teammateEmails.filter(email => email.trim() !== '');
      await createTeamInMongo(teamName, { firstname, lastname, email }, validEmails);
      onSuccess();
      onClose();
    } catch (err) {
      setError('Une erreur est survenue lors de la création de l\'équipe. Veuillez réessayer.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="bg-gray-900 rounded-3xl w-full max-w-md overflow-hidden shadow-2xl transform transition-all border-4 border-n-red">
        <div className="bg-n-red p-4 flex justify-between items-center text-white">
          <h3 className="font-pixel text-sm md:text-base flex items-center gap-2">
            <Trophy size={20} /> Nouvelle Équipe
          </h3>
          <button onClick={onClose} className="hover:bg-white/20 p-1 rounded-full transition-colors">
            <X size={24} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-gray-300 font-bold mb-1 text-sm">Nom de l'équipe</label>
            <input
              required
              type="text"
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
              className="w-full bg-gray-800 border-2 border-gray-700 text-white rounded-xl px-4 py-2 focus:border-n-red focus:outline-none transition-colors placeholder-gray-500"
              placeholder="ex: Les Champignons Rapides"
            />
          </div>

          <div className="pt-2 border-t border-gray-800">
            <p className="text-sm text-n-red font-bold mb-3 flex items-center gap-2">
              <Gamepad2 size={16}/> Capitaine (Joueur 1)
            </p>
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <input
                  required
                  type="text"
                  value={firstname}
                  onChange={(e) => setFirstname(e.target.value)}
                  placeholder="Prénom"
                  className="w-full bg-gray-800 border-2 border-gray-700 text-white rounded-xl px-4 py-2 focus:border-n-red focus:outline-none placeholder-gray-500"
                />
                <input
                  required
                  type="text"
                  value={lastname}
                  onChange={(e) => setLastname(e.target.value)}
                  placeholder="Nom"
                  className="w-full bg-gray-800 border-2 border-gray-700 text-white rounded-xl px-4 py-2 focus:border-n-red focus:outline-none placeholder-gray-500"
                />
              </div>
              <input
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email du capitaine"
                className="w-full bg-gray-800 border-2 border-gray-700 text-white rounded-xl px-4 py-2 focus:border-n-red focus:outline-none placeholder-gray-500"
              />
            </div>
          </div>

          <div className="pt-2 border-t border-gray-800">
            <p className="text-sm text-n-blue font-bold mb-3 flex items-center gap-2">
              <UserPlus size={16}/> Inviter des coéquipiers (optionnel)
            </p>
            <p className="text-xs text-gray-500 mb-3">
              Ajoutez les emails de vos coéquipiers pour qu'ils reçoivent une invitation.
            </p>
            <div className="space-y-2">
              {teammateEmails.map((teammateEmail, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Mail size={16} className="text-gray-500 flex-shrink-0" />
                  <input
                    type="email"
                    value={teammateEmail}
                    onChange={(e) => updateTeammateEmail(index, e.target.value)}
                    placeholder={`Email joueur ${index + 2}`}
                    className="w-full bg-gray-800 border-2 border-gray-700 text-white rounded-xl px-4 py-2 focus:border-n-blue focus:outline-none placeholder-gray-500 text-sm"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4">
            {error && (
              <div className="bg-red-900/50 border border-red-500 text-red-200 px-4 py-2 rounded-xl mb-3 text-sm">
                {error}
              </div>
            )}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-n-red hover:bg-red-700 text-white font-bold py-3 rounded-xl shadow-[0_4px_0_rgb(153,27,27)] active:shadow-[0_0px_0_rgb(153,27,27)] active:translate-y-[4px] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <Loader2 size={20} className="animate-spin" />
                  Création en cours...
                </>
              ) : (
                'Créer l\'équipe !'
              )}
            </button>
            <p className="text-center text-xs text-gray-500 mt-2">
              Paiement de 5€ à régler sur place.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterModal;