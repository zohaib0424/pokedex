import {
  PokemonAPI,
  PokemonSpeciesAPI,
  EvolutionChainAPI,
  PokemonTypeName,
  PokemonDetails,
} from "@/types/pokemon";

export function extractPokemonTypes(pokemon: PokemonAPI): PokemonTypeName[] {
  return pokemon.types
    .sort((a, b) => a.slot - b.slot)
    .map((t) => t.type.name as PokemonTypeName);
}

export function extractImageUrl(pokemon: PokemonAPI): string | null {
  return pokemon.sprites.other?.["official-artwork"]?.front_default ?? null;
}

export function transformStats(
  pokemon: PokemonAPI
): { name: string; value: number }[] {
  return pokemon.stats.map((s) => ({
    name: s.stat.name,
    value: s.base_stat,
  }));
}

export function extractDescription(species: PokemonSpeciesAPI): string | undefined {
  return species.flavor_text_entries
    .find((e) => e.language.name === "en")
    ?.flavor_text.replace(/\s+/g, " ")
    ?.trim();
}

export function extractEvolutionChain(chain: EvolutionChainAPI): string[] {
  const evolutions: string[] = [];

  function traverse(node: EvolutionChainAPI["chain"]) {
    evolutions.push(node.species.name);
    node.evolves_to.forEach(traverse);
  }

  traverse(chain.chain);
  return evolutions;
}

export function extractLevelUpMoves(
  pokemon: PokemonAPI
): { name: string; level: number }[] {
  return pokemon.moves
    .flatMap((m) =>
      m.version_group_details
        .filter((vg) => vg.move_learn_method.name === "level-up")
        .map((vg) => ({
          name: m.move.name,
          level: vg.level_learned_at,
        }))
    )
    .sort((a, b) => a.level - b.level || a.name.localeCompare(b.name));
}

export function transformPokemonDetails(
  pokemon: PokemonAPI,
  species: PokemonSpeciesAPI,
  evolutionChain: EvolutionChainAPI
): PokemonDetails {
  return {
    id: pokemon.id,
    name: pokemon.name,
    types: extractPokemonTypes(pokemon),
    imageUrl: extractImageUrl(pokemon),
    description: extractDescription(species),
    stats: transformStats(pokemon),
    evolutions: extractEvolutionChain(evolutionChain),
    moves: extractLevelUpMoves(pokemon),
  };
}

