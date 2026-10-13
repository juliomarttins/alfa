'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

export default function OurStory() {
  return (
    <section
      id="historia"
      className="relative w-full py-16 md:py-24 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center"
    >
      <div className="w-full max-w-5xl liquid-glass rounded-[36px] p-6 sm:p-10 md:p-14">
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-center">
          {/* Coluna da Foto com Moldura em Arco Liquid Glass */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5 flex flex-col items-center"
          >
            <div className="liquid-pill p-3 rounded-t-[180px] rounded-b-[32px] shadow-2xl">
              <div className="relative w-64 h-80 sm:w-72 sm:h-96 rounded-t-[168px] rounded-b-[24px] overflow-hidden">
                <Image
                  src="/images/pedido.jpg"
                  alt="O Pedido de Casamento - Thyago e Jasmim"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>
          </motion.div>

          {/* Coluna do Texto Editorial */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left"
          >
            <span className="liquid-pill inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[11px] font-bold tracking-[0.28em] uppercase text-[#1E3A5F] mb-4">
              <Heart className="w-3.5 h-3.5 text-[#D4AF37] fill-[#D4AF37]" />
              Nossa História
            </span>

            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#1E3A5F] mb-6 tracking-wide uppercase">
              O Pedido
            </h2>

            <div className="liquid-card-inner p-6 sm:p-8 rounded-3xl relative">
              <span className="font-serif text-5xl text-[#D4AF37]/40 leading-none select-none block mb-2">
                “
              </span>
              <p className="font-sans text-sm sm:text-base md:text-lg text-[#1E3A5F]/90 leading-relaxed italic">
                Foi um momento inesquecível. Decidimos dar o passo mais importante das nossas vidas e dissemos &lsquo;sim&rsquo; para um futuro juntos. Cada detalhe desse dia ficou guardado no coração e agora queremos compartilhar a alegria do nosso felizes para sempre com vocês.
              </p>
              <div className="mt-6 pt-4 border-t border-white/60 flex items-center justify-center lg:justify-start gap-3">
                <span className="font-serif text-base sm:text-lg text-[#1E3A5F] font-semibold">
                  Thyago &amp; Jasmim
                </span>
                <span className="text-[#D4AF37]">•</span>
                <span className="text-xs uppercase tracking-[0.22em] text-[#1E3A5F]/70">
                  Para Sempre
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
