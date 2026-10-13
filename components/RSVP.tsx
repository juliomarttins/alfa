'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, CheckCircle2, Users, ArrowLeft, Sparkles } from 'lucide-react';

const guestList = [
  // Noivo
  { id: 1, name: 'Leandro (Pai do Noivo)', details: '1 adulto' },
  { id: 2, name: 'Márcia (Mãe do Noivo)', details: '1 adulto' },
  { id: 3, name: 'Gabriel', details: '1 adulto' },
  { id: 4, name: 'Leandrianho', details: '4 adultos, 1 criança' },
  { id: 5, name: 'Leandra', details: '1 adulto' },
  { id: 6, name: 'Deusa', details: '2 adultos' },
  { id: 7, name: 'Josué', details: '3 adultos' },
  { id: 8, name: 'Vitor', details: '1 adulto' },
  { id: 9, name: 'Gustavo (Puff)', details: '1 adulto' },
  { id: 10, name: 'Marcos (Espetinho)', details: '2 adultos, 2 crianças' },
  { id: 11, name: 'Gustavo e Rita', details: '2 adultos' },
  { id: 12, name: 'Avô', details: '1 adulto' },
  { id: 13, name: 'Vó Nina', details: '1 adulto' },
  { id: 14, name: 'Julio', details: '2 adultos, 1 criança' },
  { id: 15, name: 'Erico', details: '2 adultos' },
  { id: 16, name: 'Tia Cassia (Brasília)', details: '1 adulto' },
  { id: 17, name: 'Mauricio', details: '2 adultos' },
  { id: 18, name: 'Marina', details: '1 adulto' },
  { id: 19, name: 'Denise', details: '1 adulto' },
  { id: 20, name: 'Marcos', details: '5 adultos' },

  // Noiva
  { id: 21, name: 'Geraldo (Pai da noiva)', details: '1 adulto' },
  { id: 22, name: 'Eliselma (Mãe da noiva)', details: '1 adulto' },
  { id: 23, name: 'Davi', details: '1 adulto' },
  { id: 24, name: 'Daniel', details: '1 adulto' },
  { id: 25, name: 'Lara', details: '1 adulto' },
  { id: 26, name: 'Thanya e Anderson', details: '2 adultos, 1 criança' },
  { id: 27, name: 'Eshley', details: '2 adultos' },
  { id: 28, name: 'Keven', details: '2 adultos, 1 criança' },
  { id: 29, name: 'Sthefany', details: '4 adultos, 1 criança' },
  { id: 30, name: 'Celeste', details: '1 adulto' },
  { id: 31, name: 'Jenifer (Clube)', details: '1 adulto' },
  { id: 32, name: 'Joana Dark', details: '1 adulto' },
  { id: 33, name: 'Sandra', details: '1 adulto' },
  { id: 34, name: 'Tota', details: '1 adulto' },
  { id: 35, name: 'Dayane', details: '1 adulto, 1 criança' },
  { id: 36, name: 'Douglas', details: '3 adultos, 1 criança' },

  // Faltam confirmação
  { id: 39, name: 'Maira', details: '4 adultos, 2 crianças' },
  { id: 40, name: 'Uender', details: '5 adultos' },
  { id: 41, name: 'Eduarda', details: '2 adultos' },
  { id: 42, name: 'Ana Flávia', details: '2 adultos, 1 criança' },
  { id: 43, name: 'João Pedro', details: '1 adulto' },
  { id: 44, name: 'Yuri', details: '1 adulto' },
  { id: 45, name: 'Amanda', details: '2 adultos, 1 criança' },
];

export default function RSVP() {
  const [searchTerm, setSearchTerm] = useState('');
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [selectedGuest, setSelectedGuest] = useState<any>(null);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [maxAdults, setMaxAdults] = useState(1);
  const [maxChildren, setMaxChildren] = useState(0);
  const [attendingAll, setAttendingAll] = useState<boolean | null>(null);
  const [confirmedAdults, setConfirmedAdults] = useState(0);
  const [confirmedChildren, setConfirmedChildren] = useState(0);

  const filteredGuests =
    searchTerm.trim().length >= 2
      ? guestList.filter((guest) =>
          guest.name.toLowerCase().includes(searchTerm.trim().toLowerCase())
        )
      : [];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSelectGuest = (guest: any) => {
    setSelectedGuest(guest);

    let numAdults = 1;
    let numChildren = 0;

    if (/\d/.test(guest.details)) {
      const adultMatch = guest.details.match(/(\d+)\s*adulto/i);
      const childrenMatch = guest.details.match(/(\d+)\s*criança/i);

      if (adultMatch) numAdults = parseInt(adultMatch[1]);
      if (childrenMatch) numChildren = parseInt(childrenMatch[1]);
    }

    setMaxAdults(numAdults);
    setMaxChildren(numChildren);
    setConfirmedAdults(numAdults);
    setConfirmedChildren(numChildren);
    setAttendingAll(null);
  };

  const totalAllowed = maxAdults + maxChildren;

  const handleConfirm = async () => {
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/rsvp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nome: selectedGuest.name,
          adultos: confirmedAdults,
          criancas: confirmedChildren,
          detalhesPermitidos: selectedGuest.details,
        }),
      });

      if (response.ok) {
        setIsConfirmed(true);
      } else {
        alert('Ocorreu um erro ao guardar. Por favor, tente novamente.');
      }
    } catch (error) {
      console.error('Erro ao enviar RSVP:', error);
      alert('Erro de conexão. Verifique a sua internet e tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="rsvp"
      className="relative w-full py-16 md:py-24 px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center z-20"
    >
      <div className="relative z-10 w-full max-w-2xl liquid-glass p-6 sm:p-10 md:p-12 rounded-[36px] flex flex-col items-center">
        <span className="liquid-pill inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[11px] font-bold tracking-[0.28em] uppercase text-[#1E3A5F] mb-4">
          <Users className="w-3.5 h-3.5 text-[#D4AF37]" />
          RSVP • Presença
        </span>

        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#1E3A5F] mb-4 tracking-wide uppercase">
          Confirmação de Presença
        </h2>

        {!isConfirmed ? (
          <div className="w-full max-w-lg flex flex-col items-center">
            <p className="font-sans text-sm sm:text-base text-[#1E3A5F]/80 leading-relaxed mb-8">
              Para organizarmos tudo com perfeição, confirme a sua presença até o dia{' '}
              <strong className="text-[#1E3A5F] underline decoration-[#D4AF37]">
                10 de Dezembro de 2026
              </strong>
              .
            </p>

            {!selectedGuest ? (
              <div className="w-full relative">
                <div className="relative flex items-center">
                  <Search className="w-5 h-5 text-[#1E3A5F]/50 absolute left-4 pointer-events-none" />
                  <input
                    type="text"
                    placeholder="Digite seu nome para buscar na lista..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 rounded-2xl liquid-pill text-[#1E3A5F] placeholder-[#1E3A5F]/45 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/60 transition"
                  />
                </div>

                <AnimatePresence>
                  {searchTerm.trim().length > 0 && searchTerm.trim().length < 2 && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="w-full liquid-pill mt-2 rounded-2xl p-4 text-xs text-[#1E3A5F]/70 text-left"
                    >
                      Digite pelo menos 2 letras do seu nome...
                    </motion.div>
                  )}

                  {filteredGuests.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      className="w-full liquid-pill mt-2 rounded-2xl shadow-2xl max-h-64 overflow-y-auto divide-y divide-white/60 text-left"
                    >
                      {filteredGuests.map((guest) => (
                        <button
                          type="button"
                          key={guest.id}
                          onClick={() => handleSelectGuest(guest)}
                          className="w-full px-5 py-3.5 hover:bg-white/70 cursor-pointer flex items-center justify-between transition-colors"
                        >
                          <div>
                            <p className="text-[#1E3A5F] font-bold text-sm sm:text-base">
                              {guest.name}
                            </p>
                            <p className="text-[#1E3A5F]/65 text-xs">{guest.details}</p>
                          </div>
                          <span className="text-xs font-semibold text-[#D4AF37] uppercase tracking-wider">
                            Selecionar →
                          </span>
                        </button>
                      ))}
                    </motion.div>
                  )}

                  {searchTerm.trim().length >= 2 && filteredGuests.length === 0 && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="w-full liquid-pill mt-2 rounded-2xl p-4 text-xs sm:text-sm text-[#1E3A5F]/75 text-center"
                    >
                      Nenhum convidado encontrado com &ldquo;{searchTerm}&rdquo;. Tente buscar pelo primeiro nome.
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <motion.div
                initial={{ scale: 0.96, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="w-full liquid-card-inner p-6 sm:p-8 rounded-3xl flex flex-col items-center"
              >
                <span className="text-[11px] uppercase tracking-[0.2em] text-[#1E3A5F]/60 mb-1">
                  Convidado Selecionado
                </span>
                <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#1E3A5F] mb-1">
                  {selectedGuest.name}
                </h3>
                <p className="text-xs sm:text-sm text-[#D4AF37] font-semibold mb-6 pb-4 border-b border-white/70 w-full">
                  Convite para: {selectedGuest.details}
                </p>

                {totalAllowed > 1 && (
                  <div className="w-full mb-6">
                    <p className="text-sm text-[#1E3A5F] font-bold mb-3">
                      Todos poderão comparecer?
                    </p>

                    <div className="grid grid-cols-2 gap-3 mb-4">
                      <button
                        type="button"
                        onClick={() => {
                          setAttendingAll(true);
                          setConfirmedAdults(maxAdults);
                          setConfirmedChildren(maxChildren);
                        }}
                        className={`py-3 px-4 rounded-xl text-xs font-bold uppercase tracking-wider transition ${
                          attendingAll === true
                            ? 'liquid-btn-navy text-white'
                            : 'liquid-pill text-[#1E3A5F] hover:bg-white/80'
                        }`}
                      >
                        Sim, todos
                      </button>
                      <button
                        type="button"
                        onClick={() => setAttendingAll(false)}
                        className={`py-3 px-4 rounded-xl text-xs font-bold uppercase tracking-wider transition ${
                          attendingAll === false
                            ? 'liquid-btn-navy text-white'
                            : 'liquid-pill text-[#1E3A5F] hover:bg-white/80'
                        }`}
                      >
                        Apenas alguns
                      </button>
                    </div>

                    {attendingAll === false && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 pt-4 border-t border-white/60"
                      >
                        {maxAdults > 0 && (
                          <div className="flex flex-col items-center liquid-pill p-3 rounded-2xl">
                            <label className="text-[10px] uppercase tracking-widest text-[#1E3A5F]/70 font-bold mb-1">
                              Adultos
                            </label>
                            <select
                              value={confirmedAdults}
                              onChange={(e) =>
                                setConfirmedAdults(Number(e.target.value))
                              }
                              className="w-full p-2 text-center font-bold text-[#1E3A5F] bg-transparent focus:outline-none"
                            >
                              {[...Array(maxAdults + 1)].map((_, i) => (
                                <option key={i} value={i}>
                                  {i} {i === 1 ? 'adulto' : 'adultos'}
                                </option>
                              ))}
                            </select>
                          </div>
                        )}

                        {maxChildren > 0 && (
                          <div className="flex flex-col items-center liquid-pill p-3 rounded-2xl">
                            <label className="text-[10px] uppercase tracking-widest text-[#1E3A5F]/70 font-bold mb-1">
                              Crianças
                            </label>
                            <select
                              value={confirmedChildren}
                              onChange={(e) =>
                                setConfirmedChildren(Number(e.target.value))
                              }
                              className="w-full p-2 text-center font-bold text-[#1E3A5F] bg-transparent focus:outline-none"
                            >
                              {[...Array(maxChildren + 1)].map((_, i) => (
                                <option key={i} value={i}>
                                  {i} {i === 1 ? 'criança' : 'crianças'}
                                </option>
                              ))}
                            </select>
                          </div>
                        )}
                      </motion.div>
                    )}
                  </div>
                )}

                {(totalAllowed <= 1 || attendingAll !== null) && (
                  <button
                    type="button"
                    onClick={handleConfirm}
                    disabled={isSubmitting}
                    className={`w-full py-4 rounded-2xl font-bold uppercase tracking-[0.2em] text-xs mb-3 flex items-center justify-center gap-2 ${
                      isSubmitting
                        ? 'bg-gray-400 text-white cursor-not-allowed'
                        : 'liquid-btn-navy cursor-pointer'
                    }`}
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#D4AF37]" />
                    <span>
                      {isSubmitting ? 'Confirmando...' : 'Confirmar Presença'}
                    </span>
                  </button>
                )}

                <button
                  type="button"
                  onClick={() => setSelectedGuest(null)}
                  disabled={isSubmitting}
                  className="inline-flex items-center gap-1.5 text-[#1E3A5F]/70 py-2 text-xs font-semibold uppercase tracking-widest hover:text-[#1E3A5F] transition"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Escolher outro nome</span>
                </button>
              </motion.div>
            )}
          </div>
        ) : (
          <motion.div
            initial={{ scale: 0.92, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-full max-w-md liquid-card-inner p-8 rounded-3xl text-center flex flex-col items-center"
          >
            <div className="w-14 h-14 rounded-full bg-[#D4AF37]/20 flex items-center justify-center mb-4">
              <Sparkles className="w-7 h-7 text-[#D4AF37]" />
            </div>
            <h3 className="text-2xl font-serif text-[#1E3A5F] mb-2">
              Presença Confirmada!
            </h3>
            <p className="text-sm sm:text-base text-[#1E3A5F]/80 leading-relaxed">
              Mal podemos esperar para celebrar este dia inesquecível com você,{' '}
              <strong className="text-[#1E3A5F]">{selectedGuest.name}</strong>!
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
}
