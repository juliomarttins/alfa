'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Sparkles, AlertCircle } from 'lucide-react';

const paletteColors = [
  { name: 'Azul Serenity', hex: '#B8D4EE' },
  { name: 'Lavanda Pastel', hex: '#D8C8E8' },
  { name: 'Pêssego Suave', hex: '#F7D1BA' },
  { name: 'Verde Sálvia', hex: '#C5DEC9' },
  { name: 'Amarelo Manteiga', hex: '#F7E7B4' },
  { name: 'Rosa Blush', hex: '#F5C6D6' },
];

export default function DressCode() {
  return (
    <section
      id="traje"
      className="relative w-full py-16 md:py-24 px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center"
    >
      <div className="w-full max-w-5xl liquid-glass p-6 sm:p-10 md:p-14 rounded-[36px]">
        <div className="relative z-10 flex flex-col items-center">
          <span className="liquid-pill inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[11px] font-bold tracking-[0.28em] uppercase text-[#1E3A5F] mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
            Sugestão de Traje
          </span>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#1E3A5F] mb-2 tracking-wide uppercase">
            Dress Code
          </h2>

          <p className="text-[#C29B27] font-serif italic text-lg sm:text-xl mb-8">
            Inspirações leves e elegantes para o nosso grande dia
          </p>

          <div className="max-w-3xl mx-auto space-y-4 text-sm sm:text-base text-[#1E3A5F]/85 leading-relaxed mb-8">
            <p>
              Como nosso encontro acontecerá durante a tarde, escolhemos um dress code leve, elegante e confortável, que combina com a atmosfera do nosso dia.
            </p>
            <p>
              Pensamos em <strong>tons claros, pastéis e florais</strong>, com tecidos leves e modelos que permitam aproveitar a celebração com conforto. As inspirações abaixo são sugestões para ajudar vocês a encontrarem um visual que combine com a ocasião, sempre respeitando o seu próprio estilo.
            </p>
          </div>

          {/* Paleta de Cores Sugerida em Cápsulas Liquid Glass */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
            {paletteColors.map((c) => (
              <div
                key={c.name}
                className="liquid-pill px-3.5 py-2 rounded-full flex items-center gap-2.5 text-xs font-medium text-[#1E3A5F]"
              >
                <span
                  className="w-4 h-4 rounded-full border border-white shadow-xs"
                  style={{ backgroundColor: c.hex }}
                />
                <span>{c.name}</span>
              </div>
            ))}
          </div>

          {/* Aviso sobre Preto e Branco */}
          <div className="liquid-card-inner border border-[#D4AF37]/40 px-6 py-4 rounded-2xl mb-12 max-w-2xl flex items-center justify-center gap-3">
            <AlertCircle className="w-5 h-5 text-[#D4AF37] shrink-0" />
            <p className="font-sans text-xs sm:text-sm text-[#1E3A5F] leading-relaxed">
              Para manter a harmonia da nossa paleta, pedimos apenas que{' '}
              <strong className="text-[#1E3A5F] underline decoration-[#D4AF37]">
                preto e branco
              </strong>{' '}
              sejam reservados aos noivos.
            </p>
          </div>

          {/* Grid Responsivo Damas & Cavalheiros (1 coluna no celular, 2 colunas lado a lado no PC) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="liquid-card-inner p-5 sm:p-6 rounded-3xl flex flex-col items-center"
            >
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#D4AF37] font-bold mb-1">
                Inspiração Feminina
              </span>
              <h3 className="font-serif text-2xl text-[#1E3A5F] mb-4">
                Damas
              </h3>
              <div className="w-full overflow-hidden rounded-2xl border border-white/80 shadow-md">
                <Image
                  src="/images/dress-code-mulheres.jpg"
                  alt="Dress Code Mulheres - Tons pastéis e florais"
                  width={800}
                  height={600}
                  className="w-full h-auto object-cover hover:scale-[1.02] transition-transform duration-500"
                />
              </div>
              <p className="text-xs text-[#1E3A5F]/75 mt-4">
                Vestidos fluidos, conjuntos em alfaiataria leve, tons pastéis e estampas florais suaves.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
              className="liquid-card-inner p-5 sm:p-6 rounded-3xl flex flex-col items-center"
            >
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#D4AF37] font-bold mb-1">
                Inspiração Masculina
              </span>
              <h3 className="font-serif text-2xl text-[#1E3A5F] mb-4">
                Cavalheiros
              </h3>
              <div className="w-full overflow-hidden rounded-2xl border border-white/80 shadow-md">
                <Image
                  src="/images/dress-code-homens.jpg"
                  alt="Dress Code Homens - Esporte fino leve e tons claros"
                  width={800}
                  height={600}
                  className="w-full h-auto object-cover hover:scale-[1.02] transition-transform duration-500"
                />
              </div>
              <p className="text-xs text-[#1E3A5F]/75 mt-4">
                Camisas em tons claros ou pastéis, linho, calças de sarja/alfaiataria clara e visual leve de tarde.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
