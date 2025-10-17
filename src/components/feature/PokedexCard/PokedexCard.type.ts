import { ReactNode } from "react";
import { PokemonTypeName } from "../../../types/pokemon";

export enum TabType {
  STATS = 'STATS',
  EVOLUTIONS = 'EVOLUTIONS',
  MOVES = 'MOVES',
}

export interface PokedexCardProps {
  pokemonName: string;
  pokemonId: number;
  pokemonImageUrl?: string;
  pokemonTypes: PokemonTypeName[];
  pokemonDescription?: string;
  backgroundColor?: string;
  className?: string;
  activeTab?: TabType;
  children?: ReactNode;
  onBackClick?: () => void;
  onTabChange?: (tab: TabType) => void;
}
