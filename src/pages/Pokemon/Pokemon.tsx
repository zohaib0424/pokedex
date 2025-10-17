import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useCallback, useState } from "react";
import { getPokemonDetails } from "@/services/pokeapi";
import type { PokemonTypeName } from "@/types/pokemon";
import { getPokemonTypeColor } from "@/constants";
import { PokedexCard } from "components/feature/PokedexCard";
import { TabType } from "components/feature/PokedexCard/PokedexCard.type";
import { Stats } from "./components/Stats";
import { Evolutions } from "./components/Evolutions";
import { Moves } from "./components/Moves";
import { PokemonNotFound } from "../PokemonNotFound";
import { Loading } from "@/components";

export function Pokemon() {
  const { idOrName = "" } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TabType>(TabType.STATS);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["pokemon", idOrName],
    queryFn: () => getPokemonDetails(idOrName),
  });

  const renderTabContent = useCallback(() => {
    if (!data) return null;

    const bg = getPokemonTypeColor(data?.types[0] as PokemonTypeName);

    switch (activeTab) {
      case TabType.STATS:
        return <Stats stats={data.stats} color={bg} />;
      case TabType.EVOLUTIONS:
        return <Evolutions evolutions={data.evolutions || []} color={bg} />;
      case TabType.MOVES:
        return <Moves moves={data.moves || []} color={bg} />;
      default:
        return <div>No tab selected</div>;
    }
  }, [activeTab, data]);

  const handleBackClick = () => navigate(-1);
  const handleTabChange = (tab: TabType) => setActiveTab(tab);

  if (isLoading) return <Loading />;
  if (isError || !data)
    return <PokemonNotFound onBackClick={handleBackClick} />;

  const bg = getPokemonTypeColor(data.types[0] as PokemonTypeName);

  return (
    <PokedexCard
      pokemonId={data.id}
      backgroundColor={bg}
      activeTab={activeTab}
      pokemonName={data.name}
      pokemonTypes={data.types}
      pokemonDescription={data.description}
      pokemonImageUrl={data.imageUrl || undefined}
      onBackClick={handleBackClick}
      onTabChange={handleTabChange}
    >
      {renderTabContent()}
    </PokedexCard>
  );
}
