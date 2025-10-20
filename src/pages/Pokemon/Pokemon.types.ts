import type { PokemonTypeName } from "@/types/pokemon";

export interface TransformedPokemonData {
  id: number;
  name: string;
  types: PokemonTypeName[];
  imageUrl: string;
  description?: string;
  stats: Array<{
    name: string;
    value: number;
  }>;
  evolutions: string[];
  moves: Array<{
    name: string;
    level: number;
  }>;
}

export interface SpriteUrls {
  front_default?: string;
  other?: {
    "official-artwork"?: {
      front_default?: string;
    };
    home?: {
      front_default?: string;
    };
  };
}

