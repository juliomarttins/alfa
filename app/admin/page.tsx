'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Lock, Users, Gift, Trash2, ArrowLeft, DollarSign, Baby } from 'lucide-react';

interface Convidado {
  _id: string;
  nome: string;
  adultos: number;
  criancas: number;
  dataConfirmacao: string;
}

interface Presente {
  _id: string;
  nome: string;
  presenteTitulo: string;
  valor: string;
  dataEscolha: string;
}

export default function AdminPage() {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const [convidados, setConvidados] = useState<Convidado[]>([]);
  const [presentes, setPresentes] = useState<Presente[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isAuthenticated) {
      setIsLoading(true);
      Promise.all([
        fetch('/api/rsvp', { cache: 'no-store' }).then((res) => res.json()),
        fetch('/api/presentes', { cache: 'no-store' }).then((res) => res.json()),
      ])
        .then(([dadosRsvp, dadosPresentes]) => {
          setConvidados(Array.isArray(dadosRsvp) ? dadosRsvp : []);
          setPresentes(Array.isArray(dadosPresentes) ? dadosPresentes : []);
          setIsLoading(false);
        })
        .catch((err) => {
          console.error('Erro ao buscar dados:', err);
          setIsLoading(false);
        });
    }
  }, [isAuthenticated]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'JasmimThyago2027') {
      setIsAuthenticated(true);
    } else {
      alert('Acesso Negado! Senha incorreta.');
    }
  };

  const apagarRsvp = async (id: string) => {
    if (window.confirm('Tem certeza que deseja apagar esta confirmação?')) {
      try {
        await fetch(`/api/rsvp?id=${id}`, { method: 'DELETE' });
        setConvidados(convidados.filter((c) => c._id !== id));
      } catch {
        alert('Erro ao apagar.');
      }
    }
  };

  const apagarPresente = async (id: string) => {
    if (window.confirm('Tem certeza que deseja apagar este presente?')) {
      try {
        await fetch(`/api/presentes?id=${id}`, { method: 'DELETE' });
        setPresentes(presentes.filter((p) => p._id !== id));
      } catch {
        alert('Erro ao apagar.');
      }
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <form
          onSubmit={handleLogin}
          className="liquid-glass p-8 sm:p-10 rounded-[32px] text-center max-w-md w-full flex flex-col items-center"
        >
          <div className="w-14 h-14 rounded-2xl liquid-pill flex items-center justify-center mb-4">
            <Lock className="w-6 h-6 text-[#D4AF37]" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif text-[#1E3A5F] mb-2">
            Área dos Noivos
          </h2>
          <p className="text-xs sm:text-sm text-[#1E3A5F]/75 mb-6">
            Acesso restrito à gestão de convidados e presentes de Thyago &amp; Jasmim.
          </p>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Digite a senha dos noivos..."
            className="liquid-pill p-4 rounded-2xl w-full mb-5 text-center text-[#1E3A5F] outline-none focus:ring-2 focus:ring-[#D4AF37]"
          />
          <button
            type="submit"
            className="liquid-btn-gold text-white px-6 py-4 rounded-2xl font-bold w-full uppercase tracking-[0.2em] text-xs cursor-pointer"
          >
            Entrar no Painel
          </button>

          <Link
            href="/"
            className="mt-6 text-xs text-[#1E3A5F]/70 hover:text-[#1E3A5F] flex items-center gap-1.5"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Voltar ao Convite</span>
          </Link>
        </form>
      </div>
    );
  }

  const totalAdultos = Array.isArray(convidados)
    ? convidados.reduce((acc, curr) => acc + (Number(curr.adultos) || 0), 0)
    : 0;
  const totalCriancas = Array.isArray(convidados)
    ? convidados.reduce((acc, curr) => acc + (Number(curr.criancas) || 0), 0)
    : 0;
  const totalPresentes = Array.isArray(presentes) ? presentes.length : 0;
  const valorTotalPresentes = Array.isArray(presentes)
    ? presentes.reduce((acc, curr) => {
        const num = parseFloat(
          (curr.valor || '0')
            .replace('R$', '')
            .replace(/\./g, '')
            .replace(',', '.')
            .trim()
        );
        return acc + (isNaN(num) ? 0 : num);
      }, 0)
    : 0;

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
          <Link
            href="/"
            className="liquid-pill px-4 py-2 rounded-full text-xs font-bold text-[#1E3A5F] flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4 text-[#D4AF37]" />
            <span>Voltar ao Site</span>
          </Link>

          <h1 className="text-2xl sm:text-4xl font-serif text-[#1E3A5F] text-center uppercase tracking-wide">
            Painel dos Noivos • Thyago &amp; Jasmim
          </h1>

          <div className="w-28 hidden sm:block" />
        </div>

        {/* Cartões de Resumo (KPIs) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="liquid-glass p-5 rounded-3xl flex flex-col">
            <span className="text-[11px] uppercase tracking-wider text-[#1E3A5F]/70 font-bold flex items-center gap-1.5">
              <Users className="w-4 h-4 text-[#D4AF37]" /> Adultos Confirmados
            </span>
            <span className="font-serif text-3xl font-bold text-[#1E3A5F] mt-2">
              {totalAdultos}
            </span>
          </div>

          <div className="liquid-glass p-5 rounded-3xl flex flex-col">
            <span className="text-[11px] uppercase tracking-wider text-[#1E3A5F]/70 font-bold flex items-center gap-1.5">
              <Baby className="w-4 h-4 text-[#D4AF37]" /> Crianças Confirmadas
            </span>
            <span className="font-serif text-3xl font-bold text-[#1E3A5F] mt-2">
              {totalCriancas}
            </span>
          </div>

          <div className="liquid-glass p-5 rounded-3xl flex flex-col">
            <span className="text-[11px] uppercase tracking-wider text-[#1E3A5F]/70 font-bold flex items-center gap-1.5">
              <Gift className="w-4 h-4 text-[#D4AF37]" /> Presentes Recebidos
            </span>
            <span className="font-serif text-3xl font-bold text-[#1E3A5F] mt-2">
              {totalPresentes}
            </span>
          </div>

          <div className="liquid-glass p-5 rounded-3xl flex flex-col">
            <span className="text-[11px] uppercase tracking-wider text-[#1E3A5F]/70 font-bold flex items-center gap-1.5">
              <DollarSign className="w-4 h-4 text-[#D4AF37]" /> Total em Presentes
            </span>
            <span className="font-serif text-2xl sm:text-3xl font-bold text-[#D4AF37] mt-2">
              {valorTotalPresentes.toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              })}
            </span>
          </div>
        </div>

        {/* Colunas de Gestão */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          {/* Coluna RSVP */}
          <div className="liquid-glass p-6 sm:p-8 rounded-[32px]">
            <div className="relative z-10">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg sm:text-xl font-serif font-bold text-[#1E3A5F] uppercase">
                  Confirmações de Presença
                </h2>
                <span className="liquid-pill px-3 py-1 rounded-full text-xs font-bold text-[#1E3A5F]">
                  {convidados.length} registros
                </span>
              </div>

              {isLoading ? (
                <div className="p-6 liquid-card-inner rounded-2xl text-center text-sm text-[#1E3A5F]/60">
                  Carregando confirmações...
                </div>
              ) : convidados.length === 0 ? (
                <div className="p-6 liquid-card-inner rounded-2xl text-center text-sm text-[#1E3A5F]/60">
                  Ninguém confirmou presença ainda.
                </div>
              ) : (
                <div className="space-y-3 max-h-[520px] overflow-y-auto pr-1">
                  {convidados.map((convidado) => (
                    <div
                      key={convidado._id}
                      className="liquid-card-inner p-4 rounded-2xl flex flex-col sm:flex-row justify-between sm:items-center gap-3"
                    >
                      <div className="flex-1">
                        <p className="font-bold text-[#1E3A5F]">
                          {convidado.nome}
                        </p>
                        <p className="text-xs text-[#1E3A5F]/60 mt-0.5">
                          {new Date(convidado.dataConfirmacao).toLocaleDateString('pt-BR')}{' '}
                          às{' '}
                          {new Date(convidado.dataConfirmacao).toLocaleTimeString('pt-BR', {
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        <div className="liquid-pill px-3.5 py-2 rounded-xl text-center min-w-[110px]">
                          <p className="text-xs font-bold text-[#1E3A5F]">
                            {convidado.adultos} Adulto(s)
                          </p>
                          {convidado.criancas > 0 && (
                            <p className="text-[11px] text-[#1E3A5F]/75">
                              {convidado.criancas} Criança(s)
                            </p>
                          )}
                        </div>

                        <button
                          type="button"
                          onClick={() => apagarRsvp(convidado._id)}
                          className="p-2.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-600 transition cursor-pointer"
                          title="Apagar confirmação"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Coluna Presentes */}
          <div className="liquid-glass p-6 sm:p-8 rounded-[32px]">
            <div className="relative z-10">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg sm:text-xl font-serif font-bold text-[#1E3A5F] uppercase">
                  Presentes Recebidos
                </h2>
                <span className="liquid-pill px-3 py-1 rounded-full text-xs font-bold text-[#D4AF37]">
                  {totalPresentes} escolhidos
                </span>
              </div>

              {isLoading ? (
                <div className="p-6 liquid-card-inner rounded-2xl text-center text-sm text-[#1E3A5F]/60">
                  Carregando presentes...
                </div>
              ) : presentes.length === 0 ? (
                <div className="p-6 liquid-card-inner rounded-2xl text-center text-sm text-[#1E3A5F]/60">
                  Nenhum presente foi registrado ainda.
                </div>
              ) : (
                <div className="space-y-3 max-h-[520px] overflow-y-auto pr-1">
                  {presentes.map((presente) => (
                    <div
                      key={presente._id}
                      className="liquid-card-inner p-4 rounded-2xl flex flex-col sm:flex-row justify-between sm:items-center gap-3"
                    >
                      <div className="flex-1">
                        <p className="font-bold text-[#1E3A5F]">
                          {presente.nome}
                        </p>
                        <p className="text-xs text-[#1E3A5F]/80 mt-1 uppercase font-semibold leading-snug">
                          {presente.presenteTitulo}
                        </p>
                        <p className="text-[11px] text-[#1E3A5F]/55 mt-1">
                          {new Date(presente.dataEscolha).toLocaleDateString('pt-BR')}{' '}
                          às{' '}
                          {new Date(presente.dataEscolha).toLocaleTimeString('pt-BR', {
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        <div className="liquid-pill px-3.5 py-2 rounded-xl text-center min-w-[95px]">
                          <p className="text-sm font-bold text-[#D4AF37]">
                            {presente.valor}
                          </p>
                        </div>

                        <button
                          type="button"
                          onClick={() => apagarPresente(presente._id)}
                          className="p-2.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-600 transition cursor-pointer"
                          title="Apagar presente"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
