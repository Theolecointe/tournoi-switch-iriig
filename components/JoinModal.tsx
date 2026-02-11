import React, { useState, useEffect } from 'react';
import { getTeams, joinTeam } from '../services/db';
import { Team } from '../types';
import { X, Users, UserPlus } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const JoinModal: React.FC<Props> = ({ isOpen, onClose, onSuccess }) => {
  const [teams, setTeams] = useState<Team[]>([]);
  const [selectedTeamId, setSelectedTeamId] = useState<string | null>(null);
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    if (isOpen) {
      // Filter only incomplete teams
      const allTeams = getTeams();
      setTeams(allTeams.filter(t => t.complete === "false" && t.members.length < 4));
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTeamId) return;

    const success = joinTeam(selectedTeamId, { firstname, lastname, email });
    if (success) {
      onSuccess();
      onClose();
    } else {
      alert("Erreur: Impossible de rejoindre cette équipe (peut-être pleine).");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="bg-gray-900 rounded-3xl w-full max-w-md overflow-hidden shadow-2xl transform transition-all border-4 border-n-blue">
        <div className="bg-n-blue p-4 flex justify-between items-center text-white">
          <h3 className="font-pixel text-sm md:text-base flex items-center gap-2">
            <Users size={20} /> Rejoindre une équipe
          </h3>
          <button onClick={onClose} className="hover:bg-white/20 p-1 rounded-full transition-colors">
            <X size={24} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          
          <div>
            <label className="block text-gray-300 font-bold mb-2 text-sm">Choisir une équipe incomplète</label>
            {teams.length === 0 ? (
              <div className="text-center py-4 text-gray-500 bg-gray-800 rounded-xl border border-gray-700 border-dashed">
                Aucune équipe ne cherche de joueurs actuellement.
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-2 max-h-40 overflow-y-auto">
                {teams.map(team => (
                  <div 
                    key={team.id}
                    onClick={() => setSelectedTeamId(team.id)}
                    className={`p-3 rounded-xl border-2 cursor-pointer transition-all flex justify-between items-center ${selectedTeamId === team.id ? 'border-n-blue bg-blue-900/30' : 'border-gray-700 bg-gray-800 hover:border-blue-400'}`}
                  >
                    <span className="font-bold text-gray-200">{team.name}</span>
                    <span className="text-xs bg-gray-700 px-2 py-1 rounded-full text-gray-300">
                      {team.members.length}/4
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {selectedTeamId && (
            <div className="pt-2 border-t border-gray-800 animate-fade-in">
              <p className="text-sm text-n-blue font-bold mb-3 flex items-center gap-2">
                <UserPlus size={16}/> Vos informations
              </p>
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <input
                    required
                    type="text"
                    value={firstname}
                    onChange={(e) => setFirstname(e.target.value)}
                    placeholder="Prénom"
                    className="w-full bg-gray-800 border-2 border-gray-700 text-white rounded-xl px-4 py-2 focus:border-n-blue focus:outline-none placeholder-gray-500"
                  />
                  <input
                    required
                    type="text"
                    value={lastname}
                    onChange={(e) => setLastname(e.target.value)}
                    placeholder="Nom"
                    className="w-full bg-gray-800 border-2 border-gray-700 text-white rounded-xl px-4 py-2 focus:border-n-blue focus:outline-none placeholder-gray-500"
                  />
                </div>
                <input
                  required
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Votre Email"
                  className="w-full bg-gray-800 border-2 border-gray-700 text-white rounded-xl px-4 py-2 focus:border-n-blue focus:outline-none placeholder-gray-500"
                />
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full bg-n-blue hover:bg-cyan-600 text-white font-bold py-3 rounded-xl shadow-[0_4px_0_rgb(8,145,178)] active:shadow-[0_0px_0_rgb(8,145,178)] active:translate-y-[4px] transition-all"
                >
                  Valider l'inscription
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default JoinModal;