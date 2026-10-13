'use client';

import { motion } from 'framer-motion';
import { MapPin, Gift, CheckCircle2 } from 'lucide-react';

export default function ActionButtons() {
  return (
    <section className="py-12 px-6 flex flex-col sm:flex-row gap-4 items-center justify-center w-full max-w-3xl mx-auto">
      <motion.a
        href="#local"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.96 }}
        className="w-full sm:w-auto flex-1 liquid-btn-navy py-4 px-6 rounded-2xl flex items-center justify-center gap-2"
      >
        <MapPin className="w-4 h-4 text-[#D4AF37]" />
        <span className="font-sans text-xs font-bold tracking-[0.2em] uppercase">
          Local da Cerimônia
        </span>
      </motion.a>

      <motion.a
        href="/presentes"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.96 }}
        className="w-full sm:w-auto flex-1 liquid-pill text-[#1E3A5F] py-4 px-6 rounded-2xl flex items-center justify-center gap-2 hover:bg-white/80 transition"
      >
        <Gift className="w-4 h-4 text-[#D4AF37]" />
        <span className="font-sans text-xs font-bold tracking-[0.2em] uppercase">
          Lista de Presentes
        </span>
      </motion.a>

      <motion.a
        href="#rsvp"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.96 }}
        className="w-full sm:w-auto flex-1 liquid-btn-gold py-4 px-6 rounded-2xl flex items-center justify-center gap-2"
      >
        <CheckCircle2 className="w-4 h-4" />
        <span className="font-sans text-xs font-bold tracking-[0.2em] uppercase">
          Confirmar Presença
        </span>
      </motion.a>
    </section>
  );
}
