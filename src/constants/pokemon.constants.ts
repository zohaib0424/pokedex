import { PokemonTypeName } from '../types'

/**
 * Color mapping for Pokemon types
 * Used across the application for consistent type-based coloring
 */
export const POKEMON_TYPE_COLORS: Record<PokemonTypeName, string> = {
  normal: '#A8A77A',
  fire: '#EE8130',
  water: '#6390F0',
  electric: '#F7D02C',
  grass: '#7AC74C',
  ice: '#96D9D6',
  fighting: '#C22E28',
  poison: '#A33EA1',
  ground: '#E2BF65',
  flying: '#A98FF3',
  psychic: '#F95587',
  bug: '#A6B91A',
  rock: '#B6A136',
  ghost: '#735797',
  dragon: '#6F35FC',
  dark: '#705746',
  steel: '#B7B7CE',
  fairy: '#D685AD',
}

/**
 * Returns the color for a given Pokemon type
 * @param type - Pokemon type name
 * @returns Hex color code for the type
 */
export function getPokemonTypeColor(type: PokemonTypeName): string {
  return POKEMON_TYPE_COLORS[type] || POKEMON_TYPE_COLORS.normal
}

