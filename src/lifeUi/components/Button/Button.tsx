import React from "react";
import MuiButton from "@mui/material/Button";
import type { ButtonProps } from "./Button.types";
import { BUTTON_DEFAULTS } from "./constants";

const Button: React.FC<ButtonProps> = ({
  label,
  children,
  variant = BUTTON_DEFAULTS.variant,
  size = BUTTON_DEFAULTS.size,
  disabled = BUTTON_DEFAULTS.disabled,
  onClick,
  className = "",
  isActive = BUTTON_DEFAULTS.isActive,
  styles = {},
}) => {
  // Merge styles with defaults
  const mergedStyles = { ...BUTTON_DEFAULTS.sx, ...styles };

  return (
    <MuiButton
      variant={isActive ? "contained" : variant}
      size={size}
      disabled={disabled}
      onClick={onClick}
      sx={{
        borderRadius:
          mergedStyles.borderRadius || BUTTON_DEFAULTS.sx.borderRadius,
        textTransform:
          mergedStyles.textTransform || BUTTON_DEFAULTS.sx.textTransform,
        fontWeight: mergedStyles.fontWeight || BUTTON_DEFAULTS.sx.fontWeight,
        px: mergedStyles.px ?? BUTTON_DEFAULTS.sx.px,
        py: mergedStyles.py ?? BUTTON_DEFAULTS.sx.py,
        fontSize: mergedStyles.fontSize || BUTTON_DEFAULTS.sx.fontSize,
        backgroundColor: isActive
          ? mergedStyles.backgroundColor || BUTTON_DEFAULTS.sx.backgroundColor
          : "transparent",
        color: isActive
          ? mergedStyles.activeColor || BUTTON_DEFAULTS.sx.activeColor
          : mergedStyles.inactiveColor || BUTTON_DEFAULTS.sx.inactiveColor,
        border: isActive
          ? "none"
          : mergedStyles.inactiveBorder || BUTTON_DEFAULTS.sx.inactiveBorder,
        "&:hover": {
          backgroundColor: isActive
            ? mergedStyles.activeBgHover || BUTTON_DEFAULTS.sx.activeBgHover
            : mergedStyles.inactiveBgHover ||
              BUTTON_DEFAULTS.sx.inactiveBgHover,
          borderColor: isActive
            ? "none"
            : mergedStyles.hoverBorderColor ||
              BUTTON_DEFAULTS.sx.hoverBorderColor,
        },
      }}
      className={className}
    >
      {children ?? label}
    </MuiButton>
  );
};

export default Button;
