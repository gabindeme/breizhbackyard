import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
interface CountdownProps {
  targetDateStr?: string; // ISO format
  hidePrefix?: boolean;
}

export const Countdown = ({ targetDateStr = "2027-05-15T10:00:00+02:00", hidePrefix = false }: CountdownProps) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const targetDate = new Date(targetDateStr).getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance < 0) {
        clearInterval(interval);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDateStr]);

  const { t } = useTranslation();

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontFamily: "'Inter', sans-serif" }}>
      {!hidePrefix && <span style={{ fontWeight: "600" }}>{t("countdown.depart_dans")}</span>}
      <div style={{ display: "flex", gap: "0.3rem" }}>
        <span style={{ background: "rgba(255,255,255,0.1)", padding: "0.2rem 0.4rem", borderRadius: "0.25rem", fontWeight: "700" }}>
          {timeLeft.days} {t("countdown.days_short")}
        </span>
        <span style={{ background: "rgba(255,255,255,0.1)", padding: "0.2rem 0.4rem", borderRadius: "0.25rem", fontWeight: "700" }}>
          {timeLeft.hours} {t("countdown.hours_short")}
        </span>
        <span style={{ background: "rgba(255,255,255,0.1)", padding: "0.2rem 0.4rem", borderRadius: "0.25rem", fontWeight: "700" }}>
          {timeLeft.minutes} {t("countdown.minutes_short")}
        </span>
        <span style={{ background: "rgba(255,255,255,0.1)", padding: "0.2rem 0.4rem", borderRadius: "0.25rem", fontWeight: "700" }}>
          {timeLeft.seconds} {t("countdown.seconds_short")}
        </span>
      </div>
    </div>
  );
};
