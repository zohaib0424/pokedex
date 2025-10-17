import {
  PokemonAPI,
  PokemonDetails,
  PokemonSpeciesAPI,
  EvolutionChainAPI,
} from "@/types/pokemon";
import { transformPokemonDetails } from "../utils";

const BASE_URL =
  import.meta.env.VITE_POKEMON_API_BASE_URL || "https://pokeapi.co/api/v2";

async function fetchJson<T>(url: string): Promise<T> {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Request failed: ${res.status} - ${res.statusText}`);
  }
  return res.json() as Promise<T>;
}

export async function getPokemon(
  idOrName: string | number
): Promise<PokemonAPI> {
  return fetchJson<PokemonAPI>(`${BASE_URL}/pokemon/${idOrName}`);
}

export async function getSpecies(id: number): Promise<PokemonSpeciesAPI> {
  return fetchJson<PokemonSpeciesAPI>(`${BASE_URL}/pokemon-species/${id}`);
}

export async function getEvolutionChain(
  url: string
): Promise<EvolutionChainAPI> {
  return fetchJson<EvolutionChainAPI>(url);
}

export async function getPokemonDetails(
  idOrName: string | number
): Promise<PokemonDetails> {
  const pokemon = await getPokemon(idOrName);
  const species = await getSpecies(pokemon.id);
  const evolutionChain = await getEvolutionChain(species.evolution_chain.url);

  return transformPokemonDetails(pokemon, species, evolutionChain);
}
