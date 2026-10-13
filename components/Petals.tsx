'use client';

import { useEffect, useState } from 'react';

export default function Petals() {
  const [petals, setPetals] = useState<
    Array<{
      id: number;
      left: string;
      size: string;
      color: string;
      animationDuration: string;
      animationDelay: string;
      drift: number;
    }>
  >([]);

  useEffect(() => {
    const colors = [
      'rgba(251, 207, 232, 0.75)',
      'rgba(249, 168, 212, 0.70)',
      'rgba(219, 234, 254, 0.80)',
      'rgba(252, 228, 236, 0.78)',
      'rgba(245, 230, 196, 0.72)',
    ];

    const newPetals = Array.from({ length: 45 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 94 + 3}%`,
      size: `${Math.floor(Math.random() * 9) + 11}px`,
      color: colors[Math.floor(Math.random() * colors.length)],
      animationDuration: `${Math.random() * 9 + 9}s`,
      animationDelay: `${Math.random() * 10}s`,
      drift: Math.random() * 90 - 45,
    }));
    setPetals(newPetals);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-40 overflow-hidden opacity-85">
      <style>{`
        @keyframes flutterFall {
          0% {
            transform: translate3d(0, -10vh, 0) rotateX(0deg) rotateY(0deg) rotateZ(0deg);
            opacity: 0;
          }
          15% { opacity: 0.9; }
          85% { opacity: 0.9; }
          100% {
            transform: translate3d(var(--drift), 110vh, 0) rotateX(360deg) rotateY(270deg) rotateZ(180deg);
            opacity: 0;
          }
        }
        .petal {
          position: absolute;
          top: -10%;
          border-radius: 50% 0 50% 50%;
          animation-name: flutterFall;
          animation-timing-function: cubic-bezier(0.37, 0, 0.63, 1);
          animation-iteration-count: infinite;
          backdrop-filter: blur(2px);
          border: 1px solid rgba(255, 255, 255, 0.5);
          box-shadow: inset 1px -1px 4px rgba(255, 255, 255, 0.6), 0 4px 10px rgba(30, 58, 95, 0.06);
        }
      `}</style>
      {petals.map((p) => (
        <div
          key={p.id}
          className="petal"
          style={{
            left: p.left,
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
            animationDuration: p.animationDuration,
            animationDelay: p.animationDelay,
            ['--drift' as string]: `${p.drift}px`,
          }}
        />
      ))}
    </div>
  );
}
