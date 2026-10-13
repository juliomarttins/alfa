'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Gift, Sparkles, Coffee, HeartHandshake } from 'lucide-react';

export default function GiftList() {
  return (
    <section
      id="presentes"
      className="relative w-full py-16 md:py-24 px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center"
    >
      <div className="relative z-10 w-full max-w-4xl liquid-glass p-6 sm:p-10 md:p-14 rounded-[36px] flex flex-col items-center">
        <span className="liquid-pill inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[11px] font-bold tracking-[0.28em] uppercase text-[#1E3A5F] mb-4">
          <Gift className="w-3.5 h-3.5 text-[#D4AF37]" />
          Mimos &amp; Brincadeira
        </span>

        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#1E3A5F] mb-6 tracking-wide uppercase">
          Lista de Presentes
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full mb-8">
          <div className="liquid-card-inner p-5 rounded-2xl flex flex-col items-center text-center">
            <Sparkles className="w-6 h-6 text-[#D4AF37] mb-2" />
            <h3 className="font-serif font-semibold text-base text-[#1E3A5F] mb-1">
              Enxoval Quase Completo
            </h3>
            <p className="text-xs sm:text-sm text-[#1E3A5F]/80 leading-relaxed">
              Por aqui, o enxoval já está praticamente completo! 🏡✨ O que ainda falta são aqueles itens maiores para nossa casinha.
            </p>
          </div>

          <div className="liquid-card-inner p-5 rounded-2xl flex flex-col items-center text-center">
            <HeartHandshake className="w-6 h-6 text-[#D4AF37] mb-2" />
            <h3 className="font-serif font-semibold text-base text-[#1E3A5F] mb-1">
              Cotas Divertidas em PIX
            </h3>
            <p className="text-xs sm:text-sm text-[#1E3A5F]/80 leading-relaxed">
              Em vez de um item gigante, nossa lista virou uma coleção de memes e valores em PIX 😂. Cada contribuição nos ajuda no nosso lar! 💗
            </p>
          </div>

          <div className="liquid-card-inner p-5 rounded-2xl flex flex-col items-center text-center">
            <Coffee className="w-6 h-6 text-[#D4AF37] mb-2" />
            <h3 className="font-serif font-semibold text-base text-[#1E3A5F] mb-1">
              Presentes Físicos
            </h3>
            <p className="text-xs sm:text-sm text-[#1E3A5F]/80 leading-relaxed">
              Ama dar presente físico? Fique à vontade! Coisinhas charmosas para cozinha, mesa posta e xícaras terão um cantinho especial. ☕🌷
            </p>
          </div>
        </div>

        <Link href="/presentes" className="w-full max-w-xs">
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            className="liquid-btn-gold w-full py-4 px-8 rounded-2xl flex items-center justify-center gap-2.5 font-bold uppercase tracking-[0.2em] text-xs cursor-pointer"
          >
            <Gift className="w-4 h-4" />
            <span>Acessar Lista de Presentes</span>
          </motion.div>
        </Link>
      </div>
    </section>
  );
}
