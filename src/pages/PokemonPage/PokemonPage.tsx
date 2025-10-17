import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useCallback, useState } from "react";
import { getPokemonDetails, firstTypeColor } from "@/services";
import type { PokemonTypeName } from "@/types";
import { PokedexCard } from "components/feature/PokedexCard";
import type { TabType } from "components/feature/PokedexCard/PokedexCard.type";
import { StatsDisplay } from "./components/StatsDisplay";

export function PokemonPage() {
  const { idOrName = "" } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TabType>("STATS");

  const { data, isLoading, isError } = useQuery({
    queryKey: ["pokemon", idOrName],
    queryFn: () => getPokemonDetails(idOrName!),
  });

  const renderTabContent = useCallback(() => {
    if (!data) return null;

    const bg = firstTypeColor(data?.types[0] as PokemonTypeName);

    switch (activeTab) {
      case "STATS":
        return <StatsDisplay stats={data.stats} color={bg} />;
      case "EVOLUTIONS":
        return (
          <div className="text-center text-gray-600">
            Evolutions coming soon...
          </div>
        );
      case "MOVES":
        return (
          <div className="text-center text-gray-600">Moves coming soon...</div>
        );
      default:
        return <StatsDisplay stats={data.stats} color={bg} />;
    }
  }, [activeTab, data]);

  if (isLoading) return <div className="p-6">Loading…</div>;
  if (isError || !data) return <div className="p-6">Pokemon not found</div>;

  const bg = firstTypeColor(data?.types[0] as PokemonTypeName);

  const handleBackClick = () => navigate(-1);
  const handleTabChange = (tab: TabType) => setActiveTab(tab);

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
