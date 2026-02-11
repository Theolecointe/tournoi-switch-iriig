import React, { useState } from 'react';
import { Team, Member } from '../types';
import { X, Users, UserPlus, Search, Loader2, User, CheckCircle, Ticket } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  initialTeamId?: string;
}

const API_URL = '/api';

const JoinModal: React.FC<Props> = ({ isOpen, onClose, onSuccess, initialTeamId = '' }) => {
  // État pour la recherche d'équipe
  const [teamId, setTeamId] = useState(initialTeamId);
  const [team, setTeam] = useState<Team | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState<string | null>(null);

  // État pour le formulaire de rejoindre
  const [showJoinForm, setShowJoinForm] = useState(false);
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [isJoining, setIsJoining] = useState(false);
  const [joinError, setJoinError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleClose = () => {
    setIsSuccess(false);
    setTeamId('');
    setTeam(null);
    setShowJoinForm(false);
    setFirstname('');
    setLastname('');
    setEmail('');
    setSearchError(null);
    setJoinError(null);
    onClose();
  };

  if (!isOpen) return null;

  // Rechercher l'équipe par ID
  const handleSearch = async () => {
    if (!teamId.trim()) {
      setSearchError('Veuillez entrer un ID d\'équipe');
      return;
    }

    setIsSearching(true);
    setSearchError(null);
    setTeam(null);
    setShowJoinForm(false);

    try {
      const response = await fetch(`${API_URL}/team/${teamId.trim()}`);
      
      if (!response.ok) {
        if (response.status === 404) {
          setSearchError('Aucune équipe trouvée avec cet ID');
        } else if (response.status === 400) {
          setSearchError('ID invalide');
        } else {
          setSearchError('Erreur lors de la recherche');
        }
        return;
      }

      const teamData = await response.json();
      setTeam(teamData);
    } catch (error) {
      setSearchError('Erreur de connexion au serveur');
      console.error(error);
    } finally {
      setIsSearching(false);
    }
  };

  // Rejoindre l'équipe
  const handleJoin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!team) return;

    setIsJoining(true);
    setJoinError(null);

    try {
      const response = await fetch(`${API_URL}/team/${team._id}/join`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ firstname, lastname, email })
      });

      if (!response.ok) {
        const error = await response.json();
        setJoinError(error.error || 'Erreur lors de l\'inscription');
        return;
      }

      setIsSuccess(true);
      onSuccess();
    } catch (error) {
      setJoinError('Erreur de connexion au serveur');
      console.error(error);
    } finally {
      setIsJoining(false);
    }
  };

  const isTeamFull = team && team.members && team.members.length >= 4;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="bg-gray-900 rounded-3xl w-full max-w-md overflow-hidden shadow-2xl transform transition-all border-4 border-n-blue">
        <div className="bg-n-blue p-4 flex justify-between items-center text-white">
          <h3 className="font-pixel text-sm md:text-base flex items-center gap-2">
            <Users size={20} /> {isSuccess ? 'Inscription réussie !' : 'Rejoindre une équipe'}
          </h3>
          <button onClick={handleClose} className="hover:bg-white/20 p-1 rounded-full transition-colors">
            <X size={24} />
          </button>
        </div>
        
        {isSuccess ? (
          <div className="p-6 text-center space-y-6">
            <div className="flex justify-center">
              <div className="bg-green-500/20 p-4 rounded-full">
                <CheckCircle size={64} className="text-green-500" />
              </div>
            </div>
            <div>
              <h4 className="text-xl font-bold text-white mb-2">Bienvenue dans l'équipe !</h4>
              <p className="text-gray-400">
                Vous avez rejoint l'équipe <span className="text-n-blue font-bold">"{team?.name}"</span> avec succès.
              </p>
            </div>

            <div className="bg-yellow-500/10 border-2 border-yellow-500 rounded-xl p-4 text-left">
              <p className="text-yellow-400 font-bold text-sm mb-2 flex items-center gap-2">
                ⚠️ ÉTAPE OBLIGATOIRE
              </p>
              <p className="text-gray-300 text-sm mb-3">
                Pour finaliser votre inscription, vous devez prendre votre billet sur HelloAsso.
              </p>
              <a
                href="https://www.helloasso.com/associations/handisport-ligue-auvergne-rhone-alpes/evenements/billet-mario-kart"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold py-3 rounded-xl shadow-[0_4px_0_rgb(161,98,7)] active:shadow-[0_0px_0_rgb(161,98,7)] active:translate-y-[4px] transition-all flex items-center justify-center gap-2"
              >
                <Ticket size={20} /> Prendre mon ticket
              </a>
            </div>

            <button
              onClick={handleClose}
              className="w-full text-gray-500 hover:text-gray-300 font-medium py-2 transition-all text-sm"
            >
              Fermer
            </button>
          </div>
        ) : (
        <div className="p-6 space-y-4">
          {/* Recherche par ID */}
          <div>
            <label className="block text-gray-300 font-bold mb-2 text-sm">ID de l'équipe</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={teamId}
                onChange={(e) => setTeamId(e.target.value)}
                placeholder="Entrez l'ID reçu par email"
                className="flex-1 bg-gray-800 border-2 border-gray-700 text-white rounded-xl px-4 py-2 focus:border-n-blue focus:outline-none placeholder-gray-500"
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              />
              <button
                type="button"
                onClick={handleSearch}
                disabled={isSearching}
                className="bg-n-blue hover:bg-cyan-600 text-white px-4 py-2 rounded-xl transition-colors disabled:opacity-50 flex items-center gap-2"
              >
                {isSearching ? <Loader2 size={20} className="animate-spin" /> : <Search size={20} />}
              </button>
            </div>
            {searchError && (
              <p className="text-red-400 text-sm mt-2">{searchError}</p>
            )}
          </div>

          {/* Affichage de l'équipe trouvée */}
          {team && (
            <div className="bg-gray-800 rounded-xl p-4 border-2 border-gray-700">
              <h4 className="text-lg font-bold text-white mb-3">{team.name}</h4>
              
              <div className="space-y-2 mb-4">
                <p className="text-sm text-gray-400 flex items-center gap-2">
                  <Users size={16} /> Membres ({team.members?.length || 0}/4)
                </p>
                <div className="space-y-1">
                  {team.members?.map((member: Member, index: number) => (
                    <div key={member.id || index} className="flex items-center gap-2 text-gray-300 text-sm bg-gray-700/50 px-3 py-1.5 rounded-lg">
                      <User size={14} />
                      <span>{member.firstname} {member.lastname}</span>
                      {index === 0 && <span className="text-xs bg-n-red px-2 py-0.5 rounded-full ml-auto">Capitaine</span>}
                    </div>
                  ))}
                </div>
              </div>

              {isTeamFull ? (
                <div className="bg-red-900/30 border border-red-500 text-red-300 px-4 py-2 rounded-xl text-sm text-center">
                  Cette équipe est complète (4/4 joueurs)
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => setShowJoinForm(true)}
                  className="w-full bg-n-blue hover:bg-cyan-600 text-white font-bold py-2 rounded-xl transition-colors flex items-center justify-center gap-2"
                >
                  <UserPlus size={18} /> Rejoindre cette équipe
                </button>
              )}
            </div>
          )}

          {/* Formulaire pour rejoindre */}
          {showJoinForm && team && !isTeamFull && (
            <form onSubmit={handleJoin} className="pt-2 border-t border-gray-800 space-y-3">
              <p className="text-sm text-n-blue font-bold flex items-center gap-2">
                <UserPlus size={16} /> Vos informations
              </p>
              
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

              {joinError && (
                <div className="bg-red-900/50 border border-red-500 text-red-200 px-4 py-2 rounded-xl text-sm">
                  {joinError}
                </div>
              )}

              <button
                type="submit"
                disabled={isJoining}
                className="w-full bg-n-blue hover:bg-cyan-600 text-white font-bold py-3 rounded-xl shadow-[0_4px_0_rgb(8,145,178)] active:shadow-[0_0px_0_rgb(8,145,178)] active:translate-y-[4px] transition-all disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isJoining ? (
                  <>
                    <Loader2 size={20} className="animate-spin" />
                    Inscription en cours...
                  </>
                ) : (
                  'Valider l\'inscription'
                )}
              </button>
            </form>
          )}
        </div>
        )}
      </div>
    </div>
  );
};

export default JoinModal;