import { useEffect, useState } from "react";
import "../../styles/custom.scss";
import "../../styles/banner.scss";

const legends = [
  "Compra mínima $ 10.000.-",
  "Estamos ubicados en José León Suarez",
  "Envíos a domicilio sin cargo dentro de los 5 km",
];

export const Banner = () => {
  const [currentLegend, setCurrentLegend] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    let timeoutId;

    const intervalId = setInterval(() => {
      setVisible(false);

      timeoutId = setTimeout(() => {
        setCurrentLegend((prev) => (prev + 1) % legends.length);
        setVisible(true);
      }, 500);
    }, 3000);

    return () => {
      clearInterval(intervalId);
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <div className="banner">
      <p
        className={`legend font-primary medium upper text-on-dark ${
          visible ? "show" : "hide"
        }`}
      >
        {legends[currentLegend]}
      </p>
    </div>
  );
};
