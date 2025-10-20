import { MIN_POKEMON_ID, MAX_POKEMON_ID } from "./Search.constants";

export const generateRandomPokemonId = (
  min: number = MIN_POKEMON_ID,
  max: number = MAX_POKEMON_ID
): number => Math.floor(Math.random() * (max - min + 1)) + min;

export const normalizeSearchQuery = (query: string): string =>
  query.trim().toLowerCase();

export const isValidSearchQuery = (query: string): boolean =>
  normalizeSearchQuery(query).length > 0;
