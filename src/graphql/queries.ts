import { gql } from '@apollo/client';

const POKEMON_FIELDS = gql`
  fragment PokemonFields on pokemon_v2_pokemon {
    id
    name
    pokemon_v2_pokemontypes {
      pokemon_v2_type {
        name
      }
    }
    pokemon_v2_pokemonstats {
      base_stat
      pokemon_v2_stat {
        name
      }
    }
    pokemon_v2_pokemonmoves(
      where: {
        pokemon_v2_movelearnmethod: {
          name: { _eq: "level-up" }
        }
      }
      order_by: { level: asc }
    ) {
      level
      pokemon_v2_move {
        name
      }
    }
    pokemon_v2_pokemonsprites {
      sprites
    }
    pokemon_v2_pokemonspecy {
      pokemon_v2_pokemonspeciesflavortexts(
        where: {
          pokemon_v2_language: {
            name: { _eq: "en" }
          }
        }
        limit: 1
      ) {
        flavor_text
      }
      pokemon_v2_evolutionchain {
        pokemon_v2_pokemonspecies(order_by: { order: asc }) {
          name
        }
      }
    }
  }
`;

export const GET_POKEMON_BY_NAME = gql`
  ${POKEMON_FIELDS}
  query GetPokemonByName($name: String!) {
    pokemon_v2_pokemon(where: { name: { _eq: $name } }, limit: 1) {
      ...PokemonFields
    }
  }
`;

export const GET_POKEMON_BY_ID = gql`
  ${POKEMON_FIELDS}
  query GetPokemonById($id: Int!) {
    pokemon_v2_pokemon(where: { id: { _eq: $id } }, limit: 1) {
      ...PokemonFields
    }
  }
`;
