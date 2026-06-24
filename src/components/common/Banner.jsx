import { useEffect, useLayoutEffect, useRef, useState } from "react";

import "../../styles/custom.scss";
import "../../styles/banner.scss";

const legends = [
  "Arrancamos en Julio",
  "Tomamos pedidos hasta el 03/jul a las 20hs.",
  "Compra mínima $ 10.000.-",
  "Estamos ubicados en José León Suarez",
  "Envíos a domicilio sin cargo dentro de los 5 km",
];

const SPEED = 35;
const NEXT_TEXT_EARLY = 5500; // ms antes del final de la animación

export const Banner = () => {
  const [currentLegend, setCurrentLegend] = useState(0);
  const [duration, setDuration] = useState(10);
  const [distance, setDistance] = useState(0);
  const [startX, setStartX] = useState(0);

  const bannerRef = useRef(null);
  const textRef = useRef(null);

  const updateAnimationValues = () => {
    if (!bannerRef.current || !textRef.current) return;

    const containerWidth = bannerRef.current.offsetWidth;
    const textWidth = textRef.current.offsetWidth;
    const totalDistance = containerWidth + textWidth;

    setStartX(containerWidth);
    setDistance(totalDistance);
    setDuration(totalDistance / SPEED);
  };

  useLayoutEffect(() => {
    updateAnimationValues();
  }, [currentLegend]);

  useEffect(() => {
    window.addEventListener("resize", updateAnimationValues);
    return () => window.removeEventListener("resize", updateAnimationValues);
  }, []);

  useEffect(() => {
    const nextDelay = Math.max(1000, duration * 1000 - NEXT_TEXT_EARLY);

    const timer = setTimeout(() => {
      setCurrentLegend((prev) => (prev + 1) % legends.length);
    }, nextDelay);

    return () => clearTimeout(timer);
  }, [currentLegend, duration]);

  return (
    <div className="banner" ref={bannerRef}>
      <p
        key={currentLegend}
        ref={textRef}
        className="legend font-primary bold text-on-dark"
        style={{
          animationDuration: `${duration}s`,
          "--banner-start": `${startX}px`,
          "--banner-distance": `${distance}px`,
        }}
      >
        {legends[currentLegend]}
      </p>
    </div>
  );
};
