'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { FileSignature, Sparkles, Utensils, Eye, EyeOff } from 'lucide-react';

const timelineItems = [
  {
    time: '10h00',
    title: 'Casamento no Cartório',
    subtitle: 'Cerimônia Civil',
    description:
      'A presença de vocês será muito especial, mas não é obrigatória.',
    icon: FileSignature,
    accent: 'from-[#1E3A5F] to-[#3B6998]',
  },
  {
    time: '14h00',
    title: 'Começa a Nossa Celebração',
    subtitle: 'Recepção, Votos e Homenagens',
    description:
      'Chegada dos demais convidados. É quando começaremos oficialmente a nossa comemoração, com homenagens, votos e alguns momentos especiais que preparamos com muito carinho.',
    icon: Sparkles,
    accent: 'from-[#D4AF37] to-[#B68D24]',
  },
  {
    time: '16h00',
    title: 'Hora de Comemorar!',
    subtitle: 'Buffet Liberado & Festa',
    description:
      'Depois de tantos preparativos, chegou a hora de simplesmente aproveitar, comer, conversar, tirar muitas fotos e celebrar com a gente.',
    icon: Utensils,
    accent: 'from-[#1E3A5F] to-[#2C5282]',
  },
];

export default function Schedule() {
  const [showArtCards, setShowArtCards] = useState(true);

  return (
    <section
      id="cronograma"
      className="relative w-full py-16 md:py-24 px-4 sm:px-6 lg:px-8 flex flex-col items-center"
    >
      <div className="w-full max-w-5xl flex flex-col items-center">
        {/* Cabeçalho da Seção */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="liquid-pill inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[11px] font-bold tracking-[0.28em] uppercase text-[#1E3A5F] mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
            Programação do Grande Dia
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#1E3A5F] tracking-wide uppercase">
            Cronograma do Casamento
          </h2>
          <p className="text-sm sm:text-base text-[#1E3A5F]/75 mt-3 max-w-xl mx-auto">
            Preparamos cada momento do dia 09 de Janeiro de 2027 com muito amor para viver essa alegria ao lado de vocês.
          </p>
        </motion.div>

        {/* Cards Interativos em Liquid Glass (Responsivo: 1 coluna no celular, 3 colunas no PC) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mb-10">
          {timelineItems.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.time}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.12 }}
                className="liquid-glass rounded-3xl p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden group hover:-translate-y-1.5 transition-all duration-300"
              >
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-6">
                    <span className="liquid-pill px-4 py-1.5 rounded-full font-serif text-lg sm:text-xl font-bold text-[#1E3A5F]">
                      {item.time}
                    </span>
                    <div
                      className={`w-11 h-11 rounded-2xl bg-gradient-to-br ${item.accent} text-white flex items-center justify-center shadow-md`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <p className="text-[11px] uppercase tracking-[0.2em] text-[#D4AF37] font-bold mb-1">
                    {item.subtitle}
                  </p>
                  <h3 className="font-serif text-xl sm:text-2xl text-[#1E3A5F] mb-3">
                    {item.title}
                  </h3>
                  <p className="text-sm text-[#1E3A5F]/80 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="relative z-10 mt-6 pt-4 border-t border-white/60 flex items-center justify-between text-[11px] text-[#1E3A5F]/60 uppercase tracking-widest">
                  <span>09.01.2027</span>
                  <span>Etapa 0{idx + 1}</span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Botão para alternar visualização dos cartões ilustrados originais */}
        <button
          type="button"
          onClick={() => setShowArtCards(!showArtCards)}
          className="liquid-pill px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-[0.2em] text-[#1E3A5F] flex items-center gap-2 hover:bg-white/80 transition mb-8"
        >
          {showArtCards ? (
            <>
              <EyeOff className="w-4 h-4 text-[#D4AF37]" />
              Ocultar Cartões Ilustrados
            </>
          ) : (
            <>
              <Eye className="w-4 h-4 text-[#D4AF37]" />
              Ver Cartões Ilustrados do Cronograma
            </>
          )}
        </button>

        {/* Galeria dos Cartões Ilustrados Originais (Lado a lado no PC, empilhados no celular) */}
        <AnimatePresence>
          {showArtCards && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 w-full max-w-4xl overflow-hidden"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="liquid-glass p-3 sm:p-4 rounded-[32px] overflow-hidden shadow-xl"
              >
                <div className="rounded-2xl overflow-hidden">
                  <Image
                    src="/images/cronograma-1.jpg"
                    alt="Cronograma da Manhã - 10h Casamento no Cartório"
                    width={800}
                    height={1600}
                    className="w-full h-auto object-cover"
                  />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.15 }}
                className="liquid-glass p-3 sm:p-4 rounded-[32px] overflow-hidden shadow-xl"
              >
                <div className="rounded-2xl overflow-hidden">
                  <Image
                    src="/images/cronograma-2.jpg"
                    alt="Cronograma da Tarde - 14h Celebração e 16h Buffet"
                    width={800}
                    height={1600}
                    className="w-full h-auto object-cover"
                  />
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
