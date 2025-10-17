# PokeAPI Service Layer

This directory contains service files for interacting with the PokeAPI.

## Architecture

The service layer follows the **separation of concerns** principle:

- **Service files** (`pokeapi.ts`): Pure API calls only
- **Utils folder** (`../utils/`): Data transformation and parsing logic

### Why This Structure?

1. **Maintainability**: Easy to locate and modify API calls vs data transformations
2. **Testability**: Utils can be tested independently from API calls
3. **Reusability**: Transformation functions can be reused across different services
4. **Single Responsibility**: Each module has one clear purpose

## Current Implementation

### REST API (v2)

Currently using the PokeAPI REST API v2 endpoints:

```typescript
// Pure API calls
getPokemon(idOrName) // Fetch basic Pokemon data
getSpecies(id) // Fetch species information
getEvolutionChain(url) // Fetch evolution chain
getPokemonDetails(idOrName) // Combined API call with transformed data
```

### Data Transformation

All data transformation is handled in `../utils/pokemon.utils.ts`:

- `extractPokemonTypes()` - Extract and sort types
- `extractImageUrl()` - Get official artwork
- `transformStats()` - Transform stats to simpler format
- `extractDescription()` - Get English description
- `extractEvolutionChain()` - Traverse evolution tree
- `extractLevelUpMoves()` - Filter and sort moves
- `transformPokemonDetails()` - Combine all transformations

## Future Enhancements

### GraphQL API Integration

PokeAPI provides a GraphQL endpoint (beta) that could be integrated:

**Pros:**
- Request only needed fields
- Reduce number of network requests
- Better performance

**Cons:**
- API is not complete (missing some data)
- Beta status (may change)

**Recommended Approach:**
1. Create a new file `pokeapi.graphql.ts` for GraphQL queries
2. Use Apollo Client (already installed in package.json)
3. Mix REST and GraphQL as needed:
   - Use GraphQL for basic data (faster)
   - Fall back to REST for missing data

**Example Implementation:**

```typescript
// services/pokeapi.graphql.ts
import { gql } from '@apollo/client';

export const GET_POKEMON = gql`
  query GetPokemon($name: String!) {
    pokemon_v2_pokemon(where: {name: {_eq: $name}}) {
      id
      name
      pokemon_v2_pokemontypes {
        pokemon_v2_type {
          name
        }
      }
    }
  }
`;

// Then in pokeapi.ts, you could:
// 1. Try GraphQL first
// 2. Fall back to REST if needed
// 3. Transform using the same utils functions
```

## Best Practices

1. **Keep services thin** - Only API calls, no business logic
2. **Use utils for transformations** - Keep parsing logic separate
3. **Type everything** - Use TypeScript interfaces from `types/pokemon.ts`
4. **Error handling** - Always handle API errors appropriately
5. **Document functions** - Use JSDoc comments for clarity

## Testing

Service tests focus on:
- API call correctness
- Error handling
- Integration with transformation utils

Utils tests focus on:
- Data transformation logic
- Edge cases
- Input validation

See `pokeapi.test.ts` and `../utils/pokemon.utils.test.ts` for examples.

