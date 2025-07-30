export type SubMenuItem = {
  id: number;
  lable: string; // API typo preserved
  navigateTo: string;
  externalLink: string | null;
};

export type MenuItem = {
  id: number;
  label: string;
  iconUrl: string | null;
  hoverLabel: string | null;
  navigateTo: string;
  externalUrl: string | null;
  icon: string | null;
  subMenu: SubMenuItem[];
};

export type Logo = {
  id: number;
  iconUrl: string;
  position: {
    id: number;
    position: "top-left" | string;
  };
};

export type HeaderStyles = {
  underlineColor?: string;
};

export type HeaderProps = {
  logo: Logo;
  leftMenu: MenuItem[];
  rightMenu: MenuItem[];
  styles?: HeaderStyles;
};
