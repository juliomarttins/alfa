'use client';

import ReactCountdown from 'react-countdown';

const TimeBlock = ({ value, label }: { value: number; label: string }) => (
  <div className="liquid-pill rounded-2xl px-3 py-3 sm:px-4 sm:py-3.5 min-w-[64px] sm:min-w-[78px] flex flex-col items-center justify-center transition-transform duration-300 hover:-translate-y-1">
    <span className="font-serif text-2xl sm:text-3xl md:text-4xl font-semibold text-[#1E3A5F] tabular-nums">
      {String(value).padStart(2, '0')}
    </span>
    <span className="text-[9px] sm:text-[10px] uppercase font-sans font-semibold tracking-[0.22em] text-[#1E3A5F]/75 mt-1">
      {label}
    </span>
  </div>
);

const Separator = () => (
  <span className="font-serif text-xl sm:text-2xl text-[#D4AF37] font-bold mx-0.5 sm:mx-1 select-none">
    :
  </span>
);

export default function Countdown() {
  const targetDate = new Date('2027-01-09T14:00:00');

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const renderer = ({ days, hours, minutes, seconds, completed }: any) => {
    if (completed) {
      return (
        <div className="liquid-pill px-6 py-4 rounded-2xl inline-block">
          <span className="font-serif text-xl sm:text-2xl text-[#1E3A5F]">
            ✨ O grande dia chegou! ✨
          </span>
        </div>
      );
    }
    return (
      <div className="flex items-center justify-center gap-1 sm:gap-2">
        <TimeBlock value={days} label="Dias" />
        <Separator />
        <TimeBlock value={hours} label="Horas" />
        <Separator />
        <TimeBlock value={minutes} label="Min" />
        <Separator />
        <TimeBlock value={seconds} label="Seg" />
      </div>
    );
  };

  return (
    <div suppressHydrationWarning className="my-2">
      <ReactCountdown date={targetDate} renderer={renderer} />
    </div>
  );
}
