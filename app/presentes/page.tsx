'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Gift, Copy, Check, Sparkles, X } from 'lucide-react';

interface Presente {
  id: number;
  title: string;
  price: string;
  numericPrice: number;
}

const listaDePresentes: Presente[] = [
  { id: 1, title: 'COTA PARA SOBREVIVER AO PRIMEIRO ANO DE CASAMENTO', price: 'R$ 150,00', numericPrice: 150 },
  { id: 2, title: 'AJUDA PARA O CASAL DESCOBRIR QUEM MANDA NA CASA', price: 'R$ 80,00', numericPrice: 80 },
  { id: 3, title: 'FUNDO PARA PAGAR A FATURA DO CASAMENTO', price: 'R$ 200,00', numericPrice: 200 },
  { id: 4, title: 'CONTRIBUIÇÃO PARA A PRIMEIRA COMPRA EM 10X SEM JUROS', price: 'R$ 100,00', numericPrice: 100 },
  { id: 5, title: 'FUNDO PARA O PRIMEIRO CAFÉ DA MANHÃ NA CAMA', price: 'R$ 50,00', numericPrice: 50 },
  { id: 6, title: 'AJUDA PARA A LUA DE MEL NÃO VIRAR LUA DE FOME', price: 'R$ 250,00', numericPrice: 250 },
  { id: 7, title: 'COTA PARA O PRIMEIRO "VAMOS SÓ DAR UMA OLHADINHA" NO SHOPPING', price: 'R$ 120,00', numericPrice: 120 },
  { id: 8, title: 'COTA PARA A NOIVA DIZER "EU SABIA"', price: 'R$ 75,00', numericPrice: 75 },
  { id: 9, title: 'PIX PARA A NOIVA COMPRAR "SÓ MAIS UMA COISINHA"', price: 'R$ 90,00', numericPrice: 90 },
  { id: 10, title: 'COTA PARA O NOIVO TER 5 MINUTOS DE PAZ', price: 'R$ 500,00', numericPrice: 500 },
  { id: 11, title: 'FUNDO PARA A NOIVA TER RAZÃO MAIS UMA VEZ', price: 'R$ 100,00', numericPrice: 100 },
  { id: 12, title: 'SÓ PARA NÃO DIZER QUE EU NÃO DEI NADA', price: 'R$ 30,00', numericPrice: 30 },
  { id: 13, title: 'MASSAGEM PARA O NOIVO RELAXAR ANTES DE VER A FATURA DO CARTÃO', price: 'R$ 180,00', numericPrice: 180 },
  { id: 14, title: 'PAU DE MACARRÃO PARA O NOIVO USAR QUANDO FOR NECESSÁRIO', price: 'R$ 45,00', numericPrice: 45 },
  { id: 15, title: 'UM ANO DE CORTE DE CABELO PARA O NOIVO', price: 'R$ 300,00', numericPrice: 300 },
  { id: 16, title: 'COTA PARA A PERGUNTA: "QUANDO VEM O PRIMEIRO FILHO?"', price: 'R$ 150,00', numericPrice: 150 },
  { id: 17, title: 'AJUDE A NOIVA A COMPRAR MAIS UMA PLANTA PARA A CASA', price: 'R$ 60,00', numericPrice: 60 },
  { id: 18, title: 'TAXA PARA A NOIVA NÃO JOGAR O BUQUÊ PARA SUA NAMORADA', price: 'R$ 200,00', numericPrice: 200 },
  { id: 19, title: 'DEUS TOCOU NO SEU CORAÇÃO', price: 'R$ 400,00', numericPrice: 400 },
  { id: 20, title: 'DEI O MELHOR PRESENTE', price: 'R$ 1.000,00', numericPrice: 1000 },
  { id: 21, title: 'PRIMEIRO LUGAR NA FILA DO BUFÊ', price: 'R$ 350,00', numericPrice: 350 },
];

function generatePixPayload(valueString: string) {
  const cleanValue = valueString
    .replace('R$', '')
    .replace(/\./g, '')
    .replace(',', '.')
    .trim();
  const pixKey = '+5563999282633';
  const merchantName = 'JASMIM CHAVES MELO';
  const merchantCity = 'ANAPOLIS';
  const txid = 'CASAMENTO';
  const f = (id: string, val: string) =>
    `${id}${val.length.toString().padStart(2, '0')}${val}`;
  const payloadFormat = '000201';
  const gui = f('00', 'br.gov.bcb.pix');
  const key = f('01', pixKey);
  const merchantAccount = f('26', gui + key);
  const merchantCategory = '52040000';
  const currency = '5303986';
  const amount = f('54', cleanValue);
  const country = '5802BR';
  const name = f('59', merchantName);
  const city = f('60', merchantCity);
  const dataField = f('62', f('05', txid));
  const payload =
    payloadFormat +
    merchantAccount +
    merchantCategory +
    currency +
    amount +
    country +
    name +
    city +
    dataField +
    '6304';
  let crc = 0xffff;
  for (let i = 0; i < payload.length; i++) {
    crc ^= payload.charCodeAt(i) << 8;
    for (let j = 0; j < 8; j++) {
      if ((crc & 0x8000) !== 0) crc = (crc << 1) ^ 0x1021;
      else crc = crc << 1;
    }
  }
  const crcStr = (crc & 0xffff).toString(16).toUpperCase().padStart(4, '0');
  return payload + crcStr;
}

export default function Presentes() {
  const [selectedItem, setSelectedItem] = useState<Presente | null>(null);
  const [copied, setCopied] = useState(false);
  const [pixCode, setPixCode] = useState('');
  const [priceFilter, setPriceFilter] = useState<'all' | 'low' | 'mid' | 'high'>('all');

  const [nomeConvidado, setNomeConvidado] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);

  const filteredItems = listaDePresentes.filter((item) => {
    if (priceFilter === 'low') return item.numericPrice <= 100;
    if (priceFilter === 'mid') return item.numericPrice > 100 && item.numericPrice <= 250;
    if (priceFilter === 'high') return item.numericPrice > 250;
    return true;
  });

  const openModal = (item: Presente) => {
    const payload = generatePixPayload(item.price);
    setPixCode(payload);
    setSelectedItem(item);
    setCopied(false);
    setIsConfirmed(false);
    setNomeConvidado('');
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(pixCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const handleConfirmGift = async () => {
    if (!nomeConvidado.trim()) {
      alert('Por favor, digite o seu nome para os noivos saberem quem deu o presente! 😊');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/presentes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nome: nomeConvidado,
          presenteId: selectedItem?.id,
          presenteTitulo: selectedItem?.title,
          valor: selectedItem?.price,
        }),
      });

      if (response.ok) {
        setIsConfirmed(true);
      } else {
        alert('Ocorreu um erro ao guardar. Por favor, tente novamente.');
      }
    } catch (error) {
      console.error(error);
      alert('Erro de conexão. Verifique a sua internet.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="relative min-h-screen w-full flex flex-col items-center py-10 sm:py-16 px-4 sm:px-6 lg:px-8">
      {/* Topo e Botão Voltar */}
      <div className="w-full max-w-6xl flex justify-between items-center mb-8">
        <Link
          href="/#presentes"
          className="liquid-pill px-5 py-2.5 rounded-full text-[#1E3A5F] text-xs sm:text-sm font-bold flex items-center gap-2 hover:bg-white/80 transition"
        >
          <ArrowLeft className="w-4 h-4 text-[#D4AF37]" />
          <span>Voltar ao Convite</span>
        </Link>

        <span className="liquid-pill px-4 py-2 rounded-full text-[11px] font-semibold uppercase tracking-[0.2em] text-[#1E3A5F]">
          Thyago &amp; Jasmim
        </span>
      </div>

      {/* Cabeçalho */}
      <div className="w-full max-w-6xl flex flex-col items-center text-center mb-10">
        <span className="liquid-pill inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[11px] font-bold tracking-[0.28em] uppercase text-[#1E3A5F] mb-4">
          <Gift className="w-3.5 h-3.5 text-[#D4AF37]" />
          Nossa Brincadeira
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl text-[#1E3A5F] mb-3 tracking-wide uppercase">
          Lista de Presentes
        </h1>
        <p className="text-sm sm:text-base text-[#1E3A5F]/80 max-w-xl mb-8">
          Escolha uma cota divertida abaixo para nos presentear e clique no botão para gerar o QR Code ou copiar a chave PIX!
        </p>

        {/* Filtros de Valor em Liquid Glass */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
          {[
            { id: 'all', label: 'Todos (21)' },
            { id: 'low', label: 'Até R$ 100' },
            { id: 'mid', label: 'R$ 101 a R$ 250' },
            { id: 'high', label: 'Acima de R$ 250' },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setPriceFilter(tab.id as 'all' | 'low' | 'mid' | 'high')}
              className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition cursor-pointer ${
                priceFilter === tab.id
                  ? 'liquid-btn-navy text-white'
                  : 'liquid-pill text-[#1E3A5F] hover:bg-white/80'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid Responsivo: 2 colunas no celular, 3 no tablet, 4 no PC */}
      <div className="w-full max-w-6xl grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {filteredItems.map((item) => (
          <motion.div
            key={item.id}
            layout
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="liquid-glass rounded-3xl p-4 sm:p-5 flex flex-col items-center text-center justify-between group hover:-translate-y-1.5 transition-all duration-300"
          >
            <div className="relative z-10 w-full flex flex-col items-center">
              <div className="w-full aspect-square relative rounded-2xl overflow-hidden bg-white/70 border border-white/80 mb-4 p-2 shadow-inner">
                <Image
                  src={`/images/presentes/${item.id}.jpg`}
                  alt={item.title}
                  fill
                  className="object-contain p-2 group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              <h3 className="text-[11px] sm:text-xs leading-snug text-[#1E3A5F] font-bold uppercase mb-3 min-h-[42px] flex items-center justify-center px-1">
                {item.title}
              </h3>
            </div>

            <div className="relative z-10 w-full mt-2">
              <div className="text-base sm:text-lg font-serif font-bold text-[#D4AF37] mb-2.5">
                {item.price}
              </div>
              <button
                type="button"
                onClick={() => openModal(item)}
                className="w-full liquid-btn-navy text-white text-[11px] sm:text-xs py-3 px-4 rounded-xl font-bold uppercase tracking-wider cursor-pointer active:scale-95"
              >
                Presentear
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Modal PIX em Liquid Glass */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedItem(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#132742]/60 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.92, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.92, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="liquid-glass bg-white/85 rounded-[32px] w-full max-w-md max-h-[92vh] overflow-y-auto p-6 sm:p-8 flex flex-col items-center relative shadow-2xl"
            >
              <button
                type="button"
                onClick={() => setSelectedItem(null)}
                className="absolute top-4 right-4 liquid-pill text-[#1E3A5F] hover:bg-white rounded-full w-9 h-9 flex items-center justify-center cursor-pointer z-20"
              >
                <X className="w-4 h-4" />
              </button>

              {!isConfirmed ? (
                <div className="relative z-10 w-full flex flex-col items-center">
                  <span className="text-[10px] tracking-[0.25em] text-[#1E3A5F]/60 uppercase font-bold mb-1">
                    Você escolheu
                  </span>
                  <h3 className="text-[#1E3A5F] font-bold text-center text-sm sm:text-base mb-4 uppercase px-4">
                    {selectedItem.title}
                  </h3>

                  <div className="w-28 h-28 relative rounded-2xl overflow-hidden bg-white/80 border border-white mb-4 p-2 shadow-sm">
                    <Image
                      src={`/images/presentes/${selectedItem.id}.jpg`}
                      alt={selectedItem.title}
                      fill
                      className="object-contain p-1"
                    />
                  </div>

                  <div className="liquid-pill px-5 py-1.5 rounded-full mb-4">
                    <p className="text-[#D4AF37] font-serif font-bold text-xl">
                      {selectedItem.price}
                    </p>
                  </div>

                  <div className="w-40 h-40 relative mb-3 p-3 rounded-2xl bg-white shadow-md border border-white flex items-center justify-center">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={`https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(
                        pixCode
                      )}`}
                      alt="QR Code PIX"
                      className="w-full h-full object-contain"
                    />
                  </div>

                  <p className="text-xs text-[#1E3A5F]/75 mb-4 text-center">
                    Destinatário: <strong>Jasmim Chaves Melo</strong>
                    <br />
                    Escaneie o QR Code ou copie o código PIX abaixo:
                  </p>

                  <button
                    type="button"
                    onClick={handleCopy}
                    className={`w-full py-3.5 px-4 rounded-xl font-bold text-xs uppercase tracking-wider transition flex items-center justify-center gap-2 mb-5 cursor-pointer ${
                      copied
                        ? 'bg-emerald-600 text-white shadow-md'
                        : 'liquid-pill text-[#1E3A5F] hover:bg-white'
                    }`}
                  >
                    {copied ? (
                      <>
                        <Check className="w-4 h-4" />
                        <span>Chave PIX Copiada!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4 text-[#D4AF37]" />
                        <span>Copiar PIX Copia e Cola</span>
                      </>
                    )}
                  </button>

                  <div className="w-full border-t border-[#1E3A5F]/15 pt-5">
                    <p className="text-xs text-[#1E3A5F] font-bold mb-2 text-center uppercase tracking-wider">
                      Já realizou o pagamento?
                    </p>
                    <input
                      type="text"
                      placeholder="Digite seu nome completo..."
                      value={nomeConvidado}
                      onChange={(e) => setNomeConvidado(e.target.value)}
                      className="w-full p-3.5 text-sm rounded-xl liquid-pill text-[#1E3A5F] placeholder-[#1E3A5F]/45 focus:outline-none focus:ring-2 focus:ring-[#D4AF37] mb-3 text-center"
                    />
                    <button
                      type="button"
                      onClick={handleConfirmGift}
                      disabled={isSubmitting}
                      className={`w-full py-3.5 rounded-xl font-bold text-xs uppercase tracking-[0.18em] transition text-white cursor-pointer ${
                        isSubmitting ? 'bg-gray-400' : 'liquid-btn-gold'
                      }`}
                    >
                      {isSubmitting ? 'Registrando...' : 'Confirmar Presente'}
                    </button>
                  </div>
                </div>
              ) : (
                <div className="relative z-10 flex flex-col items-center justify-center py-8 text-center">
                  <div className="w-16 h-16 rounded-full bg-[#D4AF37]/20 flex items-center justify-center mb-4">
                    <Sparkles className="w-8 h-8 text-[#D4AF37]" />
                  </div>
                  <h3 className="text-2xl font-serif text-[#1E3A5F] mb-2">
                    Muito Obrigado!
                  </h3>
                  <p className="text-sm text-[#1E3A5F]/80 mb-6 leading-relaxed">
                    <strong>{nomeConvidado}</strong>, agradecemos imensamente pelo carinho e por fazer parte do nosso sonho!
                  </p>
                  <button
                    type="button"
                    onClick={() => setSelectedItem(null)}
                    className="w-full liquid-btn-navy text-white py-3.5 rounded-xl font-bold text-xs uppercase tracking-widest cursor-pointer"
                  >
                    Voltar aos Presentes
                  </button>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
