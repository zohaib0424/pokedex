export type PokemonTypeName =
  | 'normal' | 'fire' | 'water' | 'electric' | 'grass' | 'ice'
  | 'fighting' | 'poison' | 'ground' | 'flying' | 'psychic'
  | 'bug' | 'rock' | 'ghost' | 'dragon' | 'dark' | 'street' | 'fairy';

export interface NamedAPIResource<T = unknown> {
  name: string;
  url: string;
}

export interface PokemonAPI {
  id: number;
  name: string;
  types: { slot: number; type: NamedAPIResource<{ name: PokemonTypeName }> }[];
  sprites: {
    other?: {
      ['official-artwork']?: { front_default?: string | null };
    };
  };
  stats: { base_stat: number; stat: NamedAPIResource }[];
}

export interface PokemonSpeciesAPI {
  color?: NamedAPIResource;
  flavor_text_entries: { flavor_text: string; language: NamedAPIResource }[];
  evolution_chain: { url: string };
}

export interface EvolutionChainAPI {
  id: number;
  chain: EvolutionChainLink;
}

export interface EvolutionChainLink {
  species: NamedAPIResource;
  evolves_to: EvolutionChainLink[];
}

export interface PokemonDetails {
  id: number;
  name: string;
  types: PokemonTypeName[];
  imageUrl: string | null;
  description?: string;
  stats: { name: string; value: number }[];
  evolutions?: string[]; // array of pokemon names in chain order
}


