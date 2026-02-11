import React, { useState } from 'react';
import { 
  Gamepad2, 
  MapPin, 
  Clock, 
  Utensils, 
  Trophy, 
  Users, 
  Music2, 
  Car,
  ChevronRight,
  Star,
  Medal,
  Heart,
  GraduationCap,
  Goal
} from 'lucide-react';
import RegisterModal from './components/RegisterModal';
import JoinModal from './components/JoinModal';

const App: React.FC = () => {
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isJoinOpen, setIsJoinOpen] = useState(false);

  const handleRegistrationSuccess = () => {
    // Succès géré visuellement dans le modal
  };

  const handleJoinSuccess = () => {
    // Succès géré visuellement dans le modal
  };

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 font-sans selection:bg-n-red selection:text-white">
      
      {/* Navigation */}
      <nav className="fixed w-full z-40 bg-gray-950/90 backdrop-blur-md border-b-4 border-gray-800 py-3 px-4 md:px-8 flex justify-between items-center shadow-sm">
        <div className="flex items-center gap-2">
          <div className="bg-n-red text-white p-2 rounded-lg shadow-sm">
            <Gamepad2 size={24} />
          </div>
          <span className="font-pixel text-xs md:text-sm tracking-tighter font-bold text-white">TOURNOI SWITCH <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500">COUP DE POUCE</span></span>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => setIsJoinOpen(true)}
            className="hidden md:block text-n-blue font-bold hover:bg-gray-800 px-4 py-2 rounded-full transition-colors"
          >
            Rejoindre une équipe
          </button>
          <button 
            onClick={() => setIsRegisterOpen(true)}
            className="bg-n-red text-white font-bold px-4 py-2 rounded-full shadow-[0_3px_0_rgb(153,27,27)] hover:-translate-y-0.5 active:translate-y-1 active:shadow-none transition-all flex items-center gap-2 text-sm md:text-base"
          >
            Inscrire mon équipe <ChevronRight size={16} />
          </button>
        </div>
      </nav>

      {/* New Header Section */}
      <header className="relative pt-32 pb-16 px-4 md:pb-24 bg-gray-950 overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-n-blue/10 rounded-full blur-3xl -z-10 translate-x-1/3 -translate-y-1/3"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-n-red/10 rounded-full blur-3xl -z-10 -translate-x-1/3 translate-y-1/3"></div>

        <div className="max-w-7xl mx-auto">
          {/* Title Area */}
          <div className="text-center max-w-4xl mx-auto mb-16">
            
            <h1 className="text-4xl md:text-6xl font-black mb-4 tracking-tight text-white leading-[1.1]">
              TOURNOI <span className="text-n-red relative inline-block">SWITCH</span>
            </h1>
            
            <div className="flex flex-col md:flex-row gap-2 md:gap-4 justify-center items-center text-2xl md:text-3xl font-bold mb-6 font-pixel">
                <span className="text-n-red">MARIO KART</span> 
                <span className="text-gray-500 hidden md:inline">&</span>
                <span className="text-gray-500 md:hidden">+</span>
                <span className="text-n-blue">JUST DANCE</span>
            </div>
            
            {/* Image placeholders */}
            <div className="flex justify-center gap-4 md:gap-8 mb-8">
              {/* Mario Kart Image Frame */}
              <div className="relative group rotate-[-3deg] hover:rotate-0 transition-transform duration-300">
                <div className="w-32 h-24 md:w-56 md:h-36 bg-gray-800 rounded-xl border-4 border-white shadow-xl overflow-hidden relative">
                   <div className="absolute inset-0 bg-n-red/20 flex items-center justify-center">
                      <Car className="text-n-red opacity-50" size={32} />
                   </div>
                   <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQeQqfl4pdcwK51c4qY5y1B13112lPmNQZZTg&s" alt="Mario Kart Ambiance" className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="absolute -bottom-2 -right-2 bg-n-red text-white text-[10px] md:text-xs font-pixel px-2 py-1 rounded shadow-lg border border-white">RACE</div>
              </div>

              {/* Just Dance Image Frame */}
              <div className="relative group rotate-[3deg] hover:rotate-0 transition-transform duration-300">
                <div className="w-32 h-24 md:w-56 md:h-36 bg-gray-800 rounded-xl border-4 border-white shadow-xl overflow-hidden relative">
                   <div className="absolute inset-0 bg-n-blue/20 flex items-center justify-center">
                      <Music2 className="text-n-blue opacity-50" size={32} />
                   </div>
                   <img src="https://cdn-images.dzcdn.net/images/cover/8309a50fd23a0a080cc584ec7fada9de/0x1900-000000-80-0-0.jpg" alt="Just Dance Ambiance" className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="absolute -bottom-2 -left-2 bg-n-blue text-white text-[10px] md:text-xs font-pixel px-2 py-1 rounded shadow-lg border border-white">DANCE</div>
              </div>
            </div>

            <p className="text-xl md:text-2xl text-gray-400 leading-relaxed max-w-2xl mx-auto">
              Une compétition unique. Deux univers.
              <br/>
              <span className="text-gray-200 font-bold">Votre équipe de 4</span> doit affronter les autres sur les deux jeux.
            </p>
          </div>

          {/* Prize Cards */}
          <h2 className="text-3xl md:text-4xl font-black text-center mb-10 flex items-center justify-center gap-3 text-white">
            <Trophy className="text-yellow-400" />
            LES LOTS GAGNANTS
            <Trophy className="text-yellow-400" />
          </h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto mb-16">
             {/* Champagne - 1ère place */}
             <div className="bg-gradient-to-br from-yellow-500 to-amber-600 text-white p-8 md:p-10 rounded-[2rem] relative overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 group ring-4 ring-transparent hover:ring-yellow-400/50">
                <div className="absolute -right-8 -top-8 opacity-20 transform rotate-12 group-hover:rotate-6 transition-transform duration-500">
                   <Trophy size={200} />
                </div>
                <div className="relative z-10 flex flex-col h-full justify-between gap-6">
                   <div>
                      <div className="bg-white/20 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 backdrop-blur-md shadow-inner border border-white/10">
                          <Trophy size={32} className="text-white" />
                      </div>
                      <h2 className="font-pixel text-xl md:text-2xl mb-3">🍾 CHAMPAGNE</h2>
                      <p className="text-yellow-50 font-medium text-lg leading-relaxed max-w-sm">
                          Une bouteille de champagne pour l'équipe arrivée <strong>première</strong>.
                      </p>
                   </div>
                   <div className="bg-black/20 self-start px-4 py-2 rounded-lg text-sm font-bold backdrop-blur-sm">
                      🥇 1ère place
                   </div>
                </div>
             </div>

             {/* Vin - 2ème place */}
             <div className="bg-gradient-to-br from-purple-600 to-pink-600 text-white p-8 md:p-10 rounded-[2rem] relative overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 group ring-4 ring-transparent hover:ring-purple-400/50">
                 <div className="absolute -right-8 -top-8 opacity-20 transform -rotate-12 group-hover:-rotate-6 transition-transform duration-500">
                   <Medal size={200} />
                </div>
                <div className="relative z-10 flex flex-col h-full justify-between gap-6">
                   <div>
                      <div className="bg-white/20 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 backdrop-blur-md shadow-inner border border-white/10">
                          <Medal size={32} className="text-white" />
                      </div>
                      <h2 className="font-pixel text-xl md:text-2xl mb-3">🍷 VIN</h2>
                      <p className="text-purple-50 font-medium text-lg leading-relaxed max-w-sm">
                          Une bouteille de vin pour l'équipe arrivée <strong>deuxième</strong>.
                      </p>
                   </div>
                   <div className="bg-black/20 self-start px-4 py-2 rounded-lg text-sm font-bold backdrop-blur-sm">
                      🥈 2ème place
                   </div>
                </div>
             </div>

             {/* Bières/Softs - 3ème place */}
             <div className="bg-gradient-to-br from-n-blue to-cyan-600 text-white p-8 md:p-10 rounded-[2rem] relative overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 group ring-4 ring-transparent hover:ring-cyan-400/50">
                 <div className="absolute -right-8 -top-8 opacity-20 transform rotate-6 group-hover:rotate-0 transition-transform duration-500">
                   <Star size={200} />
                </div>
                <div className="relative z-10 flex flex-col h-full justify-between gap-6">
                   <div>
                      <div className="bg-white/20 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 backdrop-blur-md shadow-inner border border-white/10">
                          <Star size={32} className="text-white" />
                      </div>
                      <h2 className="font-pixel text-xl md:text-2xl mb-3">🍺 BIÈRES / SOFTS</h2>
                      <p className="text-cyan-50 font-medium text-lg leading-relaxed max-w-sm">
                          Des bières ou softs offerts pour l'équipe arrivée <strong>troisième</strong>.
                      </p>
                   </div>
                   <div className="bg-black/20 self-start px-4 py-2 rounded-lg text-sm font-bold backdrop-blur-sm">
                      🥉 3ème place
                   </div>
                </div>
             </div>
          </div>

          {/* CTA Section */}
          <div className="flex flex-col items-center justify-center gap-6">
             <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto px-4 md:px-0 z-10">
                 <button 
                  onClick={() => setIsRegisterOpen(true)}
                  className="bg-n-red hover:bg-red-700 text-white text-lg font-bold py-4 px-10 rounded-2xl shadow-xl hover:shadow-red-900/50 hover:-translate-y-1 transition-all flex items-center justify-center gap-3 w-full md:w-auto"
                >
                  <Users size={24} /> Inscrire mon équipe
                </button>
                <button 
                  onClick={() => setIsJoinOpen(true)}
                  className="bg-gray-800 text-white border-2 border-gray-700 hover:border-gray-500 text-lg font-bold py-4 px-10 rounded-2xl transition-all flex items-center justify-center gap-3 w-full md:w-auto hover:bg-gray-700"
                >
                  <UserPlusIcon /> Rejoindre une équipe
                </button>
             </div>
             
             {/* Date & Location Highlighted */}
             <div className="mt-4 flex flex-col items-center gap-3">
                <div className="flex flex-col md:flex-row items-center gap-3 md:gap-6 bg-gray-900/80 px-6 py-4 rounded-2xl border border-n-blue/30 shadow-[0_0_15px_rgba(0,195,227,0.15)] transform hover:scale-105 transition-transform">
                   <div className="flex items-center gap-3">
                      <Clock className="text-n-blue" size={24} />
                      <span className="font-pixel text-lg md:text-2xl text-white">MERCREDI 18 FÉVRIER</span>
                   </div>
                   <div className="flex items-center gap-2 bg-blue-500/10 px-3 py-1 rounded-lg border border-blue-500/20">
                      <span className="font-pixel text-lg md:text-xl text-n-blue">18H - 22H</span>
                   </div>
                </div>
                <div className="flex items-center gap-2 text-gray-300 bg-gray-900/50 px-4 py-2 rounded-xl border border-gray-800">
                   <MapPin className="text-n-red" size={20} />
                   <span className="font-bold text-lg">Lyon 7 - 2 Avenue Tony Garnier</span>
                </div>
             </div>

             <p className="text-gray-500 text-sm font-medium mt-2">
                Places limitées
             </p>
          </div>
        </div>
      </header>

      {/* Info Section */}
      <section className="py-20 px-4 bg-gray-900 border-t border-gray-800">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-black text-center mb-16 flex items-center justify-center gap-3 text-white">
            <Star className="fill-yellow-400 text-yellow-400" />
            DÉTAILS DU TOURNOI
            <Star className="fill-yellow-400 text-yellow-400" />
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard 
              icon={<Users size={32} className="text-purple-400" />}
              title="Équipe de 4"
              desc="Vous devez être 4 pour valider l'inscription. Vous pouvez inviter des amis ou trouver des coéquipiers sur place."
              color="bg-purple-900/30"
            />
            <FeatureCard 
              icon={<Medal size={32} className="text-indigo-400" />}
              title="3 Podiums"
              desc="Un vainqueur Mario Kart, un vainqueur Just Dance, et un grand champion au score cumulé."
              color="bg-indigo-900/30"
            />
            <FeatureCard 
              icon={<Utensils size={32} className="text-orange-400" />}
              title="Restauration"
              desc="Un stand food & drinks sur place pour reprendre des forces entre deux parties."
              color="bg-orange-900/30"
            />
             <FeatureCard 
              icon={<Trophy size={32} className="text-yellow-400" />}
              title="Les Prix"
              desc="Des bouteilles de champagne pour les champions de chaque catégorie !"
              color="bg-yellow-900/30"
            />
          </div>
        </div>
      </section>

      {/* Charity / Mission Section */}
      <section className="py-16 px-4 bg-gradient-to-br from-gray-900 via-gray-950 to-gray-900 border-t border-gray-800 relative overflow-hidden">
        {/* Decorative stripe */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-n-red via-purple-500 to-n-blue"></div>
        
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-10 md:gap-16">
            <div className="flex-1 space-y-6 text-center md:text-left">
                 <div className="inline-flex items-center gap-2 bg-pink-900/30 text-pink-500 px-4 py-2 rounded-full text-xs font-bold border border-pink-900/50 uppercase tracking-wide">
                    <Heart size={14} className="fill-current" /> Tournoi Solidaire
                 </div>
                 
                 <h2 className="text-3xl md:text-4xl font-black text-white leading-tight">
                    JOUER POUR LA <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500">BONNE CAUSE</span>
                 </h2>
                 
                 <div className="space-y-4 text-gray-300 text-lg">
                   <p className="leading-relaxed">
                      Ce tournoi est organisé avec passion par les <strong>étudiants d'IRIIG</strong> qui représentent fièrement la <span className="text-white font-bold">Ligue Handisport Auvergne Rhône Alpes</span>.
                   </p>
                   <p className="leading-relaxed">
                      L'intégralité des fonds récoltés servira à financer une <strong className="text-pink-400">journée sportive inoubliable</strong> destinée aux enfants sourds et malentendants de la région.
                   </p>
                 </div>
            </div>

            {/* Visual Cards */}
            <div className="flex-1 w-full max-w-sm">
                 <div className="bg-gray-800/40 p-6 rounded-3xl border border-gray-700 backdrop-blur-sm relative shadow-2xl">
                    <div className="grid grid-cols-2 gap-4 mb-4">
                        <div className="bg-gray-900 p-4 rounded-2xl text-center border border-gray-700 flex flex-col items-center justify-center gap-2 group hover:border-n-blue transition-colors">
                             <GraduationCap className="text-n-blue group-hover:scale-110 transition-transform" size={28} />
                             <span className="font-bold text-xs text-gray-300">Étudiants IRIIG</span>
                        </div>
                        <div className="bg-gray-900 p-4 rounded-2xl text-center border border-gray-700 flex flex-col items-center justify-center gap-2 group hover:border-n-red transition-colors">
                             <Users className="text-n-red group-hover:scale-110 transition-transform" size={28} />
                             <span className="font-bold text-xs text-gray-300">Ligue Handisport</span>
                        </div>
                    </div>
                    <div className="bg-pink-500/10 p-4 rounded-2xl border border-pink-500/20 text-center">
                        <Goal className="mx-auto text-pink-500 mb-2" size={24} />
                        <p className="text-white font-bold text-sm mb-1">OBJECTIF FINAL</p>
                        <p className="text-pink-300 text-xs leading-snug">Offrir une journée de sport accessible aux enfants</p>
                    </div>
                 </div>
            </div>
        </div>
      </section>

      {/* Practical Info Banner */}
      <section className="py-16 px-4 bg-black text-white relative overflow-hidden border-t border-gray-800">
        <div className="absolute top-0 right-0 w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
        <div className="max-w-4xl mx-auto relative z-10 flex flex-col md:flex-row justify-between items-center gap-8">
          
          <div className="space-y-6 text-center md:text-left">
            <h3 className="text-3xl font-bold font-pixel text-n-blue mb-4">INFOS CLÉS</h3>
            
            <div className="flex flex-col md:flex-row items-center md:items-start gap-4 md:gap-8">
                <div className="flex items-center gap-4">
                  <div className="bg-gray-800 p-3 rounded-xl border border-gray-700">
                    <MapPin className="text-n-red" size={28} />
                  </div>
                  <div className="text-left">
                    <p className="text-sm text-gray-400">Lieu</p>
                    <p className="font-bold text-lg">2 avenue Tony Garnier</p>
                    <p className="text-sm font-semibold text-gray-300">69007, Lyon</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="bg-gray-800 p-3 rounded-xl border border-gray-700">
                    <Clock className="text-n-blue" size={28} />
                  </div>
                  <div className="text-left">
                    <p className="text-sm text-gray-400">Date & Heure</p>
                    <p className="font-bold text-lg">Mercredi 27 Janvier</p>
                    <p className="text-sm font-semibold text-gray-300">18:00 - 22:00</p>
                  </div>
                </div>
            </div>
          </div>

          <div className="bg-gray-900/50 backdrop-blur-md p-8 rounded-3xl border-2 border-gray-800 text-center min-w-[300px]">
            <p className="text-gray-400 mb-2 font-pixel text-xs">FRAIS D'INSCRIPTION</p>
            <p className="text-6xl font-black text-white mb-2">5€</p>
            <p className="text-sm text-gray-400">par personne</p>
            <div className="mt-6 pt-6 border-t border-gray-800">
              <button 
                 onClick={() => setIsRegisterOpen(true)}
                 className="w-full bg-n-blue hover:bg-cyan-400 text-gray-900 font-bold py-3 rounded-xl transition-colors"
              >
                Réserver ma place
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-950 py-10 text-center text-gray-600 text-sm border-t border-gray-900">
        <p>© 2024 Tournoi Lyon Gaming. Not affiliated with Nintendo.</p>
      </footer>

      {/* Modals */}
      <RegisterModal 
        isOpen={isRegisterOpen} 
        onClose={() => setIsRegisterOpen(false)} 
        onSuccess={handleRegistrationSuccess}
      />
      <JoinModal 
        isOpen={isJoinOpen} 
        onClose={() => setIsJoinOpen(false)} 
        onSuccess={handleJoinSuccess}
      />

    </div>
  );
};

// Helper Sub-component for features
const FeatureCard: React.FC<{ icon: React.ReactNode; title: string; desc: string; color: string }> = ({ icon, title, desc, color }) => (
  <div className="bg-gray-800 p-6 rounded-3xl hover:-translate-y-2 transition-transform duration-300 border border-gray-700 shadow-lg hover:shadow-xl hover:border-gray-600">
    <div className={`w-14 h-14 ${color} rounded-2xl flex items-center justify-center mb-4`}>
      {icon}
    </div>
    <h3 className="font-bold text-xl mb-2 text-white">{title}</h3>
    <p className="text-gray-400 leading-relaxed text-sm">
      {desc}
    </p>
  </div>
);

// Helper Icon for button
const UserPlusIcon = () => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
    <circle cx="9" cy="7" r="4"></circle>
    <line x1="19" y1="8" x2="19" y2="14"></line>
    <line x1="22" y1="11" x2="16" y2="11"></line>
  </svg>
)

export default App;