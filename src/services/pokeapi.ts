import { PokemonAPI, PokemonDetails, PokemonSpeciesAPI, EvolutionChainAPI, PokemonTypeName } from '../types'
import { getPokemonTypeColor } from '@/constants'

const BASE_URL = import.meta.env.VITE_POKEMON_API_BASE_URL || 'https://pokeapi.co/api/v2'

async function fetchJson<T>(url: string): Promise<T> {
  const res = await fetch(url)
  if (!res.ok) throw new Error(`Request failed: ${res.status}`)
  return res.json() as Promise<T>
}

export async function getPokemon(idOrName: string | number): Promise<PokemonAPI> {
  return fetchJson<PokemonAPI>(`${BASE_URL}/pokemon/${idOrName}`)
}

export async function getSpecies(id: number): Promise<PokemonSpeciesAPI> {
  return fetchJson<PokemonSpeciesAPI>(`${BASE_URL}/pokemon-species/${id}`)
}

export async function getEvolutionChainByUrl(url: string): Promise<EvolutionChainAPI> {
  return fetchJson<EvolutionChainAPI>(url)
}

export function firstTypeColor(type: PokemonTypeName): string {
  return getPokemonTypeColor(type)
}

export async function getPokemonDetails(idOrName: string | number): Promise<PokemonDetails> {
  const p = await getPokemon(idOrName)
  const id = p.id
  const types = p.types.sort((a, b) => a.slot - b.slot).map(t => t.type.name as PokemonTypeName)
  const imageUrl = p.sprites.other?.['official-artwork']?.front_default ?? null
  const stats = p.stats.map(s => ({ name: s.stat.name, value: s.base_stat }))

  const species = await getSpecies(id)
  const description = species.flavor_text_entries.find(e => e.language.name === 'en')?.flavor_text.replace(/\s+/g, ' ')?.trim()

  const evoChain = await getEvolutionChainByUrl(species.evolution_chain.url)
  const evolutions: string[] = []
  function traverse(node: EvolutionChainAPI['chain']) {
    evolutions.push(node.species.name)
    node.evolves_to.forEach(traverse)
  }
  traverse(evoChain.chain)

  return { id, name: p.name, types, imageUrl, description, stats, evolutions }
}


