import React from "react";
import "./ButtonCustom.scss";
import Loader from "../Loader/Loader";

interface ButtonCustomProps {
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  loading?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "danger";
  fullWidth?: boolean;
  className?: string;
  border?: boolean;
  size?: number
}

const ButtonCustom: React.FC<ButtonCustomProps> = ({
  type = "button",
  disabled = false,
  loading = false,
  onClick,
  children,
  variant = "primary",
  fullWidth = false,
  className = "",
  border = false,
  size = 16
}) => {
  return (
    <button
      style={{fontSize: size}}
      type={type}
      className={`custom-button custom-button--${variant} ${fullWidth ? "full-width" : ""} ${
        disabled || loading ? "disabled" : ""
      } ${className} ${border ? "bordered" : ""}` }
      disabled={disabled || loading}
      onClick={onClick}
    >
      {loading ? <Loader /> : children}
    </button>
  );
};

export default ButtonCustom;
