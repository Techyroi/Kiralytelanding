import React, { useEffect, useState } from 'react';
import { Clock } from 'lucide-react';
import { useLanguage } from '../i18n/translations';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function getMonthEndTimeLeft(): TimeLeft {
  const now = new Date();
  const nextMonthStart = new Date(now.getFullYear(), now.getMonth() + 1, 1, 0, 0, 0);
  const diffMs = Math.max(0, nextMonthStart.getTime() - now.getTime());

  const totalSeconds = Math.floor(diffMs / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return { days, hours, minutes, seconds };
}

export const OfferCountdown: React.FC = () => {
  const { t } = useLanguage();
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(() => getMonthEndTimeLeft());

  useEffect(() => {
    const interval = window.setInterval(() => {
      setTimeLeft(getMonthEndTimeLeft());
    }, 1000);

    return () => window.clearInterval(interval);
  }, []);

  const units = t.hero.countdownUnits;
  const pad = (n: number) => String(n).padStart(2, '0');

  return (
    <div
      aria-live="off"
      className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-[#4B5563]"
    >
      <span className="inline-flex items-center gap-1.5 text-[#4B5563]">
        <Clock className="w-3.5 h-3.5 text-[#C2410C] shrink-0" aria-hidden="true" />
        <span>{t.hero.countdownLabel}</span>
      </span>
      <span className="font-mono tabular-nums font-semibold text-[#181C20] tracking-tight">
        {timeLeft.days}
        {units.days} {pad(timeLeft.hours)}
        {units.hours} {pad(timeLeft.minutes)}
        {units.minutes} {pad(timeLeft.seconds)}
        {units.seconds}
      </span>
    </div>
  );
};
