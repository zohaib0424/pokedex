import { PokemonAPI, PokemonDetails, PokemonSpeciesAPI, EvolutionChainAPI, PokemonTypeName } from '../types/pokemon'

const BASE_URL = 'https://pokeapi.co/api/v2'

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
  const map: Record<PokemonTypeName, string> = {
    normal: '#A8A77A', fire: '#EE8130', water: '#6390F0', electric: '#F7D02C', grass: '#7AC74C', ice: '#96D9D6',
    fighting: '#C22E28', poison: '#A33EA1', ground: '#E2BF65', flying: '#A98FF3', psychic: '#F95587',
    bug: '#A6B91A', rock: '#B6A136', ghost: '#735797', dragon: '#6F35FC', dark: '#705746', steel: '#B7B7CE', fairy: '#D685AD'
  }
  return map[type]
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


