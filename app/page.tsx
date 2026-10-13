'use client';

import { useState, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import {
  Volume2,
  VolumeX,
  Calendar,
  MapPin,
  Gift,
  CheckCircle2,
  Heart,
  Shirt,
  Sparkles,
  Lock,
} from 'lucide-react';
import SplashScreen from '../components/SplashScreen';
import Countdown from '../components/Countdown';
import Schedule from '../components/Schedule';
import OurStory from '../components/OurStory';
import DressCode from '../components/DressCode';
import GiftList from '../components/GiftList';
import RSVP from '../components/RSVP';
import LocationSection from '../components/LocationSection';
import Petals from '../components/Petals';

const navLinks = [
  { href: '#inicio', label: 'Início', icon: Sparkles },
  { href: '#cronograma', label: 'Cronograma', icon: Calendar },
  { href: '#historia', label: 'O Pedido', icon: Heart },
  { href: '#traje', label: 'Traje', icon: Shirt },
  { href: '#presentes', label: 'Presentes', icon: Gift },
  { href: '#rsvp', label: 'Confirmar', icon: CheckCircle2 },
  { href: '#local', label: 'Local', icon: MapPin },
];

export default function Home() {
  const [showIntro, setShowIntro] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (window.location.hash) {
      const target = window.location.hash;
      setShowIntro(false);
      setTimeout(() => {
        document.querySelector(target)?.scrollIntoView({ behavior: 'smooth' });
      }, 350);
    } else {
      window.scrollTo(0, 0);
    }
  }, []);

  const handleOpenInvitation = (targetSection?: string) => {
    setShowIntro(false);
    if (audioRef.current) {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch((err) => console.log('Música aguardando interação:', err));
    }
    if (targetSection) {
      setTimeout(() => {
        document
          .querySelector(targetSection)
          ?.scrollIntoView({ behavior: 'smooth' });
      }, 300);
    }
  };

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  return (
    <main
      className={`relative w-full flex flex-col ${
        showIntro ? 'h-[100dvh] overflow-hidden' : 'min-h-screen'
      }`}
    >
      <audio ref={audioRef} src="/musica.mp3" loop />
      {!showIntro && <Petals />}

      {/* Barra de Navegação Flutuante em Liquid Glass (Adaptada para PC e Celular) */}
      {!showIntro && (
        <motion.header
          initial={{ y: -40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="fixed top-3 sm:top-5 inset-x-0 z-40 flex justify-center px-3 pointer-events-none"
        >
          <nav className="liquid-pill pointer-events-auto rounded-full px-2 sm:px-4 py-1.5 sm:py-2 flex items-center gap-1 sm:gap-2 max-w-full overflow-x-auto no-scrollbar shadow-lg">
            {navLinks.map((item) => {
              const Icon = item.icon;
              return (
                <a
                  key={item.href}
                  href={item.href}
                  className="px-2.5 sm:px-3.5 py-1.5 rounded-full text-[11px] sm:text-xs font-semibold text-[#1E3A5F] hover:bg-white/70 active:scale-95 transition flex items-center gap-1.5 whitespace-nowrap"
                >
                  <Icon className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                  <span>{item.label}</span>
                </a>
              );
            })}
          </nav>
        </motion.header>
      )}

      {/* Botão Flutuante de Música em Liquid Glass */}
      {!showIntro && (
        <motion.button
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6 }}
          onClick={toggleMusic}
          title={isPlaying ? 'Pausar música' : 'Tocar música'}
          className="fixed bottom-5 right-5 z-50 liquid-pill w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center text-[#1E3A5F] hover:scale-105 active:scale-95 transition cursor-pointer shadow-xl"
        >
          {isPlaying ? (
            <Volume2 className="w-5 h-5 text-[#D4AF37] animate-pulse" />
          ) : (
            <VolumeX className="w-5 h-5 text-[#1E3A5F]/60" />
          )}
        </motion.button>
      )}

      <AnimatePresence>
        {showIntro && <SplashScreen onComplete={handleOpenInvitation} />}
      </AnimatePresence>

      {/* Conteúdo Principal */}
      <motion.div className="flex-1 flex flex-col w-full relative z-10">
        {/* HERO SECTION — Responsiva para Celular e PC com moldura Liquid Glass */}
        <section
          id="inicio"
          className="relative min-h-[100dvh] w-full flex flex-col items-center justify-center pt-24 pb-16 px-4 sm:px-6 lg:px-8"
        >
          <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Moldura Clássica do Convite com Laço Azul */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-6 flex justify-center"
            >
              <div
                className="relative w-full max-w-[420px] min-h-[590px] sm:min-h-[640px] rounded-[40px] overflow-hidden shadow-[0_24px_60px_rgba(30,58,95,0.16)] border-2 border-white/85 flex flex-col items-center justify-center p-8 text-center"
                style={{
                  backgroundImage: "url('/images/fundo-convite.jpg')",
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',
                }}
              >
                <div className="mt-28 sm:mt-32 flex flex-col items-center">
                  <p className="text-[10px] sm:text-[11px] tracking-[0.28em] text-[#1E3A5F]/70 mb-4 uppercase font-semibold">
                    Você está convidado para celebrar com
                  </p>
                  <h1 className="font-serif text-3xl sm:text-4xl text-[#1E3A5F] mb-5 tracking-wide">
                    THYAGO &amp; JASMIM
                  </h1>
                  <p className="text-[10px] tracking-[0.3em] text-[#1E3A5F]/65 mb-1 uppercase font-semibold">
                    No dia
                  </p>
                  <h2 className="font-serif text-2xl sm:text-3xl text-[#D4AF37] font-bold mb-6 tracking-widest">
                    09 . 01 . 2027
                  </h2>
                  <p className="text-xs text-[#1E3A5F]/75 max-w-[240px] leading-relaxed">
                    Às 14h00 • Éden Espaço de Eventos
                    <br />
                    Anápolis — Goiás
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Painel Editorial Liquid Glass (Ao lado no PC, logo abaixo no celular) */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="lg:col-span-6 flex flex-col items-center lg:items-start text-center lg:text-left"
            >
              <div className="liquid-glass rounded-[36px] p-6 sm:p-10 w-full flex flex-col items-center lg:items-start">
                <span className="liquid-pill inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[11px] font-bold tracking-[0.25em] uppercase text-[#1E3A5F] mb-5">
                  <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                  Save The Date
                </span>

                <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#1E3A5F] leading-tight mb-4">
                  Nosso para sempre começa em...
                </h2>

                <p className="text-sm sm:text-base text-[#1E3A5F]/80 leading-relaxed mb-6">
                  Com a bênção de Deus e de nossos pais, convidamos você para testemunhar e celebrar o início da nossa família.
                </p>

                <div className="w-full flex justify-center lg:justify-start mb-8">
                  <Countdown />
                </div>

                {/* Botões de Ação Rápida em Liquid Glass */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full">
                  <a
                    href="#rsvp"
                    className="liquid-btn-navy py-4 px-6 rounded-2xl font-bold uppercase tracking-[0.2em] text-xs flex items-center justify-center gap-2"
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#D4AF37]" />
                    <span>Confirmar Presença</span>
                  </a>

                  <Link
                    href="/presentes"
                    className="liquid-btn-gold py-4 px-6 rounded-2xl font-bold uppercase tracking-[0.2em] text-xs flex items-center justify-center gap-2"
                  >
                    <Gift className="w-4 h-4" />
                    <span>Lista de Presentes</span>
                  </Link>
                </div>

                <a
                  href="#local"
                  className="mt-3 w-full liquid-pill py-3.5 px-6 rounded-2xl font-semibold uppercase tracking-[0.2em] text-[11px] text-[#1E3A5F] hover:bg-white/80 transition flex items-center justify-center gap-2"
                >
                  <MapPin className="w-4 h-4 text-[#1E3A5F]" />
                  <span>Ver Localização e Mapa</span>
                </a>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Seções do Casamento */}
        <Schedule />
        <OurStory />
        <DressCode />
        <GiftList />
        <RSVP />
        <LocationSection />

        {/* Rodapé em Liquid Glass */}
        <footer className="w-full py-12 px-4 sm:px-6 flex justify-center mt-8">
          <div className="w-full max-w-5xl liquid-glass rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
            <div>
              <p className="font-serif text-xl text-[#1E3A5F] font-semibold">
                Thyago &amp; Jasmim
              </p>
              <p className="text-xs text-[#1E3A5F]/70 mt-1">
                09 de Janeiro de 2027 • Anápolis, GO
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/presentes"
                className="liquid-pill px-4 py-2 rounded-full text-xs font-semibold text-[#1E3A5F] hover:bg-white/80 transition"
              >
                🎁 Lista de Presentes
              </Link>
              <Link
                href="/admin"
                className="liquid-pill px-4 py-2 rounded-full text-xs font-semibold text-[#1E3A5F]/75 hover:text-[#1E3A5F] transition inline-flex items-center gap-1.5"
              >
                <Lock className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>Área dos Noivos</span>
              </Link>
            </div>
          </div>
        </footer>
      </motion.div>
    </main>
  );
}
