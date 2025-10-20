import { useMemo } from "react";
import type {
  PokemonV2PokemonType,
  PokemonV2PokemonStat,
  PokemonV2EvolutionChainSpecies,
  PokemonV2PokemonMove,
  GetPokemonDetailsResponse,
} from "@/graphql/types";
import type { PokemonTypeName } from "@/types/pokemon";
import type { TransformedPokemonData, SpriteUrls } from "./Pokemon.types";

const getImageUrl = (pokemonId: number, spritesData?: string): string => {
  const fallbackUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonId}.png`;
  if (!spritesData) return fallbackUrl;
  try {
    const sprites = JSON.parse(spritesData) as SpriteUrls;
    return (
      sprites?.other?.["official-artwork"]?.front_default ||
      sprites?.other?.home?.front_default ||
      sprites?.front_default ||
      fallbackUrl
    );
  } catch {
    return fallbackUrl;
  }
};

export const usePokemonTransform = (
  rawData?: GetPokemonDetailsResponse
): TransformedPokemonData | null => {
  return useMemo(() => {
    const pokemonData = rawData?.pokemon_v2_pokemon?.[0];

    if (!pokemonData) return null;

    const spritesJson = pokemonData.pokemon_v2_pokemonsprites?.[0]?.sprites;
    const imageUrl = getImageUrl(pokemonData.id, spritesJson);

    return {
      id: pokemonData.id,
      name: pokemonData.name,
      types: pokemonData.pokemon_v2_pokemontypes.map(
        (t: PokemonV2PokemonType) => t.pokemon_v2_type.name as PokemonTypeName
      ),
      imageUrl,
      description:
        pokemonData.pokemon_v2_pokemonspecy?.pokemon_v2_pokemonspeciesflavortexts?.[0]?.flavor_text
          ?.replace(/\s+/g, " ")
          .trim() || undefined,
      stats: pokemonData.pokemon_v2_pokemonstats.map(
        (s: PokemonV2PokemonStat) => ({
          name: s.pokemon_v2_stat.name,
          value: s.base_stat,
        })
      ),
      evolutions:
        pokemonData.pokemon_v2_pokemonspecy?.pokemon_v2_evolutionchain?.pokemon_v2_pokemonspecies.map(
          (species: PokemonV2EvolutionChainSpecies) => species.name
        ) || [],
      moves: pokemonData.pokemon_v2_pokemonmoves.map(
        (m: PokemonV2PokemonMove) => ({
          name: m.pokemon_v2_move.name,
          level: m.level,
        })
      ),
    };
  }, [rawData]);
};
