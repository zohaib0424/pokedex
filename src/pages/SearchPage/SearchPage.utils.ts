/**
 * Generates a random Pokemon ID within the specified range
 * @param min - Minimum ID (default: 1)
 * @param max - Maximum ID (default: 898 for Gen 1-8)
 * @returns Random Pokemon ID
 */
export const generateRandomPokemonId = (min: number = 1, max: number = 898): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

/**
 * Normalizes search query by trimming and converting to lowercase
 * @param query - Raw search query
 * @returns Normalized query string
 */
export const normalizeSearchQuery = (query: string): string => {
  return query.trim().toLowerCase();
};

/**
 * Validates if a search query is not empty
 * @param query - Search query to validate
 * @returns True if query is valid (not empty after normalization)
 */
export const isValidSearchQuery = (query: string): boolean => {
  return normalizeSearchQuery(query).length > 0;
};
