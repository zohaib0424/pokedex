import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { getPokemonDetails, firstTypeColor } from "../../api";
import { PokemonTypeName } from "../../types";
import { PokedexCard, StatsDisplay } from "../../components";
import { TabType } from "../../components/feature/PokedexCard/PokedexCard.type";

export function PokemonPage() {
  const { idOrName = "" } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TabType>("STATS");

  const { data, isLoading, isError } = useQuery({
    queryKey: ["pokemon", idOrName],
    queryFn: () => getPokemonDetails(idOrName!),
  });

  if (isLoading) return <div style={{ padding: 24 }}>Loading…</div>;
  if (isError || !data)
    return <div style={{ padding: 24 }}>Pokemon not found</div>;

  const bg = firstTypeColor(data?.types[0] as PokemonTypeName);

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "STATS":
        return <div> Stats coming soon...</div>;
      case "EVOLUTIONS":
        return <div>Evolutions coming soon...</div>;
      case "MOVES":
        return <div>Moves coming soon...</div>;
      default:
        return <div> Stats coming soon...</div>;
    }
  };

  return (
    <PokedexCard
      pokemonName={data.name}
      pokemonId={data.id}
      pokemonImageUrl={data.imageUrl || undefined}
      pokemonTypes={data.types}
      pokemonDescription={data.description}
      backgroundColor={bg}
      activeTab={activeTab}
      onBackClick={handleBackClick}
      onTabChange={handleTabChange}
    >
      {renderTabContent()}
    </PokedexCard>
  );
}
