// Button.types.ts
export interface BorderStyle {
  color?: string;
  width?: number;
  style?: "solid" | "dashed" | "dotted";
  radius?: string;
}

export interface ButtonStyles {
  borderRadius?: string | { xs?: string; sm?: string };
  textTransform?: string;
  fontWeight?: number;
  px?: number | { xs?: number; sm?: number };
  py?: number | { xs?: number; sm?: number };
  fontSize?:
    | string
    | { xs?: string; sm?: string; md?: string; lg?: string; xl?: string };
  backgroundColor?: string;
  activeColor?: string;
  inactiveColor?: string;
  inactiveBorder?: string;
  inactiveBgHover?: string;
  activeBgHover?: string;
  hoverBorderColor?: string;
}

export interface ButtonProps {
  label?: string;
  children?: React.ReactNode;
  variant?: "contained" | "outlined" | "text";
  size?: "small" | "medium" | "large";
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
  isActive?: boolean;
  styles?: ButtonStyles;
}
