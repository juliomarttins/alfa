'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Sparkles, MapPin, CheckCircle2, Shirt } from 'lucide-react';

interface SplashScreenProps {
  onComplete: (targetSection?: string) => void;
}

export default function SplashScreen({ onComplete }: SplashScreenProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = (section?: string) => {
    if (isOpen) return;
    setIsOpen(true);
    setTimeout(() => {
      onComplete(section);
    }, 850);
  };

  return (
    <AnimatePresence>
      {!isOpen && (
        <motion.div
          exit={{ opacity: 0, scale: 1.06, filter: 'blur(16px)' }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-[#89B6DC] via-[#B8D7F0] to-[#E2EFF9] p-0 md:p-6"
        >
          {/* Imagem desfocada de fundo para preencher monitores widescreen no PC com elegância */}
          <div className="hidden md:block absolute inset-0 opacity-45 scale-110 blur-2xl pointer-events-none">
            <Image
              src="/images/envelope.jpg"
              alt=""
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Moldura do Envelope: Tela cheia no celular, Card 3D Liquid Glass no PC */}
          <motion.div
            initial={{ opacity: 0, y: 18, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            onClick={() => handleOpen()}
            className="relative w-full h-[100dvh] md:h-[90vh] max-w-[450px] md:rounded-[38px] overflow-hidden cursor-pointer shadow-[0_25px_70px_rgba(20,45,76,0.32)] md:border-2 md:border-white/80 flex flex-col justify-between select-none group"
          >
            <Image
              src="/images/envelope.jpg"
              alt="Envelope do Convite - Thyago e Jasmim"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-[1.015]"
              priority
            />

            {/* Brilho superior Liquid Glass */}
            <div className="relative z-10 pt-5 px-4 flex justify-center">
              <div className="liquid-pill px-4 py-1.5 rounded-full flex items-center gap-2 text-[11px] font-medium tracking-[0.22em] uppercase text-[#1E3A5F]">
                <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>09 • Janeiro • 2027</span>
                <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
              </div>
            </div>

            {/* Botão Central Flutuante sobre o Selo Dourado */}
            <div className="relative z-10 my-auto flex flex-col items-center pointer-events-none">
              <motion.div
                animate={{
                  scale: [1, 1.06, 1],
                  boxShadow: [
                    '0 10px 30px rgba(30,58,95,0.18)',
                    '0 16px 40px rgba(212,175,55,0.42)',
                    '0 10px 30px rgba(30,58,95,0.18)',
                  ],
                }}
                transition={{ repeat: Infinity, duration: 2.4, ease: 'easeInOut' }}
                className="mt-44 sm:mt-48 liquid-pill px-6 py-2.5 rounded-full border border-white/90 text-[#1E3A5F] font-serif text-xs sm:text-sm tracking-wide flex items-center gap-2"
              >
                <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-ping" />
                <span>Toque no envelope para abrir</span>
              </motion.div>
            </div>

            {/* Barra de Atalhos Rápidos em Liquid Glass na parte inferior */}
            <div
              className="relative z-10 pb-6 pt-3 px-4 bg-gradient-to-t from-[#1E3A5F]/40 via-[#1E3A5F]/15 to-transparent"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="liquid-glass rounded-2xl p-2.5 grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => handleOpen('#local')}
                  className="flex flex-col items-center justify-center py-2 px-1 rounded-xl hover:bg-white/50 active:scale-95 transition text-[#1E3A5F]"
                >
                  <MapPin className="w-4 h-4 text-[#1E3A5F] mb-1" />
                  <span className="text-[10px] font-semibold tracking-wider uppercase leading-tight">
                    Local
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => handleOpen('#rsvp')}
                  className="flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-[#1E3A5F]/10 hover:bg-white/60 active:scale-95 transition text-[#1E3A5F]"
                >
                  <CheckCircle2 className="w-4 h-4 text-[#D4AF37] mb-1" />
                  <span className="text-[10px] font-bold tracking-wider uppercase leading-tight">
                    Confirmar
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => handleOpen('#traje')}
                  className="flex flex-col items-center justify-center py-2 px-1 rounded-xl hover:bg-white/50 active:scale-95 transition text-[#1E3A5F]"
                >
                  <Shirt className="w-4 h-4 text-[#1E3A5F] mb-1" />
                  <span className="text-[10px] font-semibold tracking-wider uppercase leading-tight">
                    Trajes
                  </span>
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
