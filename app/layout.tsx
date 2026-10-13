import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  title: "Thyago & Jasmim — 09.01.2027 | Convite de Casamento",
  description:
    "Celebre conosco o nosso grande dia em 09 de Janeiro de 2027. Confirme sua presença, confira o cronograma, traje e lista de presentes.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="scroll-smooth">
      <body
        className={`${inter.variable} ${playfair.variable} min-h-screen w-full font-sans antialiased text-[#1E3A5F] relative selection:bg-[#D4AF37]/30 selection:text-[#1E3A5F]`}
      >
        {/* Fundo Atmosférico Liquid Glass (Esferas de luz suaves para refração de vidro no Mobile e PC) */}
        <div
          aria-hidden="true"
          className="fixed inset-0 overflow-hidden pointer-events-none z-0"
        >
          <div className="liquid-orb absolute -top-24 -left-24 w-96 h-96 md:w-[540px] md:h-[540px] rounded-full bg-[#9BC5EA]/45" />
          <div
            className="liquid-orb absolute top-1/3 -right-28 w-80 h-80 md:w-[480px] md:h-[480px] rounded-full bg-[#F3DFB2]/45"
            style={{ animationDelay: "-6s" }}
          />
          <div
            className="liquid-orb absolute bottom-10 left-1/4 w-96 h-96 md:w-[520px] md:h-[520px] rounded-full bg-[#F8C8DC]/35"
            style={{ animationDelay: "-12s" }}
          />
          <div
            className="liquid-orb absolute top-2/3 left-10 w-72 h-72 md:w-[400px] md:h-[400px] rounded-full bg-[#B6D8F2]/40"
            style={{ animationDelay: "-9s" }}
          />
        </div>

        {/* Container principal responsivo (Totalmente adaptado tanto para Celular quanto para PC/Desktop) */}
        <div className="relative z-10 w-full min-h-screen overflow-x-hidden">
          {children}
        </div>
      </body>
    </html>
  );
}