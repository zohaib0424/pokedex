import { useEffect, useState } from "react";
import { getPokemon } from "@/services/pokeapi";
import type { Evolution } from "./Evolutions.type";

export const useEvolutions = (evolutions: string[]) => {
  const [evolutionData, setEvolutionData] = useState<Evolution[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvolutionData = async () => {
      try {
        setLoading(true);
        const data = await Promise.all(
          evolutions.map(async (name) => {
            const pokemon = await getPokemon(name);
            return {
              name: pokemon.name,
              imageUrl:
                pokemon.sprites.other?.["official-artwork"]?.front_default ??
                null,
              id: pokemon.id,
            };
          })
        );
        setEvolutionData(data);
      } catch (error) {
        console.error("Error fetching evolution data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (evolutions.length > 0) {
      fetchEvolutionData();
    } else {
      setLoading(false);
    }
  }, [evolutions]);

  return { evolutionData, loading };
};

