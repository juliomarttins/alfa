'use client';

import Image from 'next/image';
import { MapPin, Navigation } from 'lucide-react';

export default function LocationSection() {
  const openMap = () => {
    window.open('https://maps.app.goo.gl/VdCwDAga1uBwkho39', '_blank');
  };

  return (
    <section
      id="local"
      className="relative w-full py-16 md:py-24 px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center"
    >
      <div className="w-full max-w-5xl liquid-glass p-6 sm:p-10 md:p-14 rounded-[36px] flex flex-col items-center">
        <span className="liquid-pill inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[11px] font-bold tracking-[0.28em] uppercase text-[#1E3A5F] mb-4">
          <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" />
          Cerimônia &amp; Recepção
        </span>

        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#1E3A5F] mb-8 tracking-wide uppercase">
          O Local
        </h2>

        {/* Grid Responsivo: Lado a lado no PC (Foto do Salão + Mapa Interativo), empilhado no Celular */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full mb-8">
          <div className="liquid-card-inner p-3 rounded-3xl overflow-hidden flex flex-col">
            <div className="relative w-full aspect-video rounded-2xl overflow-hidden">
              <Image
                src="/images/entrada.jpg"
                alt="Éden Espaço de Eventos - Anápolis GO"
                fill
                className="object-cover hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#1E3A5F]/90 via-[#1E3A5F]/50 to-transparent p-4 text-white text-left">
                <p className="text-[10px] uppercase tracking-[0.2em] text-[#F5E6C4]">
                  Espaço Oficial
                </p>
                <p className="font-serif text-lg font-semibold">
                  Éden Espaço de Eventos
                </p>
              </div>
            </div>
          </div>

          <div className="liquid-card-inner p-3 rounded-3xl overflow-hidden flex flex-col">
            <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-slate-100">
              <iframe
                src="https://maps.google.com/maps?q=-16.350916,-48.965222&t=&z=16&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Mapa Éden Espaço de Eventos"
              />
            </div>
          </div>
        </div>

        {/* Endereço e Botão de Rota */}
        <div className="liquid-card-inner px-6 py-5 rounded-2xl max-w-2xl w-full mb-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div>
            <p className="font-serif text-lg font-bold text-[#1E3A5F]">
              Éden Espaço de Eventos
            </p>
            <p className="font-sans text-xs sm:text-sm text-[#1E3A5F]/80 mt-0.5">
              Av. Pres. José Sarney — Vila Fabril, Anápolis - GO, 75053-540
            </p>
          </div>

          <button
            type="button"
            onClick={openMap}
            className="liquid-btn-navy px-6 py-3.5 rounded-xl font-bold tracking-[0.18em] text-xs uppercase flex items-center gap-2 shrink-0 cursor-pointer"
          >
            <Navigation className="w-4 h-4 text-[#D4AF37]" />
            <span>Traçar Rota</span>
          </button>
        </div>
      </div>
    </section>
  );
}
