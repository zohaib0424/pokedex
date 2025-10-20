import { useEffect, useState } from "react";
import type { Evolution } from "./Evolutions.type";

interface PokemonAPIResponse {
  id: number;
  name: string;
}

export const useEvolutions = (evolutions: string[]) => {
  const [evolutionData, setEvolutionData] = useState<Evolution[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvolutionData = async () => {
      try {
        setLoading(true);

        const evolutionPromises = evolutions.map(async (name) => {
          try {
            const response = await fetch(
              `https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`
            );
            const data = (await response.json()) as PokemonAPIResponse;

            return {
              name: data.name,
              imageUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${data.id}.png`,
              id: data.id,
            };
          } catch (error) {
            console.error(`Error fetching ${name}:`, error);
            return {
              name,
              imageUrl: null,
              id: 0,
            };
          }
        });

        const data = await Promise.all(evolutionPromises);
        setEvolutionData(data);
      } catch (error) {
        console.error("Error fetching evolution data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (evolutions.length > 0) {
      void fetchEvolutionData();
    } else {
      setLoading(false);
    }
  }, [evolutions]);

  return { evolutionData, loading };
};
