import { ReactNode } from "react";
import { PokemonTypeName } from "../../../types";

export type TabType = 'STATS' | 'EVOLUTIONS' | 'MOVES';

export interface PokedexCardProps {
  // Pokemon data
  pokemonName: string;
  pokemonId: number;
  pokemonImageUrl?: string;
  pokemonTypes: PokemonTypeName[];
  pokemonDescription?: string;
  
  // Layout props
  backgroundColor?: string;
  className?: string;
  onBackClick?: () => void;
  
  // Tab functionality
  activeTab?: TabType;
  onTabChange?: (tab: TabType) => void;
  
  // Content sections
  children?: ReactNode;
}
