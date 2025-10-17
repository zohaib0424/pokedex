import { ReactNode } from "react";

export interface PokedexCardProps {
  icon: ReactNode;
  children: ReactNode;
  backgroundColor?: string;
  className?: string;
  onBackClick?: () => void;
}
