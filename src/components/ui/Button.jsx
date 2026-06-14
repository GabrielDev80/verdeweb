import "../../styles/custom.scss";
import "../../styles/buttons.scss";
export const Button = ({
  className,
  text,
  type = "button",
  onClick,
  disabled,
}) => {
  if (!className || !text) {
    console.warn("Faltan argumentos");
    return null;
  }

  return (
    <button
      type={type}
      className={className}
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </button>
  );
};
