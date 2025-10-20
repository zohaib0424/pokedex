export interface PokemonV2Type {
  name: string;
}

export interface PokemonV2PokemonType {
  pokemon_v2_type: PokemonV2Type;
}

export interface PokemonV2Stat {
  name: string;
}

export interface PokemonV2PokemonStat {
  base_stat: number;
  pokemon_v2_stat: PokemonV2Stat;
}

export interface PokemonV2Move {
  name: string;
}

export interface PokemonV2PokemonMove {
  level: number;
  pokemon_v2_move: PokemonV2Move;
}

export interface PokemonV2PokemonSpeciesFlavorText {
  flavor_text: string;
}

export interface PokemonV2EvolutionChainSpecies {
  name: string;
}

export interface PokemonV2EvolutionChain {
  pokemon_v2_pokemonspecies: PokemonV2EvolutionChainSpecies[];
}

export interface PokemonV2PokemonSpecies {
  pokemon_v2_pokemonspeciesflavortexts: PokemonV2PokemonSpeciesFlavorText[];
  pokemon_v2_evolutionchain: PokemonV2EvolutionChain;
}

export interface PokemonV2Pokemon {
  id: number;
  name: string;
  pokemon_v2_pokemontypes: PokemonV2PokemonType[];
  pokemon_v2_pokemonstats: PokemonV2PokemonStat[];
  pokemon_v2_pokemonmoves: PokemonV2PokemonMove[];
  pokemon_v2_pokemonsprites: PokemonV2Sprites[];
  pokemon_v2_pokemonspecy: PokemonV2PokemonSpecies;
}

export interface GetPokemonDetailsResponse {
  pokemon_v2_pokemon: PokemonV2Pokemon[];
}

export interface PokemonV2Sprites {
  sprites: string;
}
