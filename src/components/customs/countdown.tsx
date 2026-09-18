import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
interface CountdownProps {
  targetDateStr?: string; // ISO format
  hidePrefix?: boolean;
}

const calculateTimeLeft = (targetDateStr: string) => {
  const targetDate = new Date(targetDateStr).getTime();
  const now = new Date().getTime();
  const distance = targetDate - now;

  if (distance <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  return {
    days: Math.floor(distance / (1000 * 60 * 60 * 24)),
    hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((distance % (1000 * 60)) / 1000),
  };
};

export const Countdown = ({ targetDateStr = "2027-05-15T10:00:00+02:00", hidePrefix = false }: CountdownProps) => {
  const [timeLeft, setTimeLeft] = useState(() => calculateTimeLeft(targetDateStr));

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(calculateTimeLeft(targetDateStr));
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDateStr]);

  const { t } = useTranslation();

  const pad = (num: number) => String(num).padStart(2, "0");

  const items = [
    { value: timeLeft.days, label: t("countdown.days_short") },
    { value: pad(timeLeft.hours), label: t("countdown.hours_short") },
    { value: pad(timeLeft.minutes), label: t("countdown.minutes_short") },
    { value: pad(timeLeft.seconds), label: t("countdown.seconds_short") },
  ];

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", flexWrap: "wrap", fontFamily: "'Inter', sans-serif" }}>
      {!hidePrefix && <span style={{ fontWeight: "600", whiteSpace: "nowrap" }}>{t("countdown.depart_dans")}</span>}
      <div style={{ display: "flex", gap: "0.35rem", flexWrap: "wrap", alignItems: "center" }}>
        {items.map((item, index) => (
          <span
            key={index}
            style={{
              background: "rgba(255,255,255,0.1)",
              padding: "0.25rem 0.45rem",
              borderRadius: "0.25rem",
              fontWeight: "700",
              whiteSpace: "nowrap",
              display: "inline-flex",
              alignItems: "center",
              gap: "0.2rem",
              fontSize: "0.85rem",
              lineHeight: 1,
            }}
          >
            <span>{item.value}</span>
            <span style={{ fontSize: "0.75rem", opacity: 0.85 }}>{item.label}</span>
          </span>
        ))}
      </div>
    </div>
  );
};
