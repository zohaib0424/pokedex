import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@apollo/client/react";
import { useCallback, useState } from "react";
import { GET_POKEMON_BY_NAME, GET_POKEMON_BY_ID } from "@/graphql/queries";
import type { GetPokemonDetailsResponse } from "@/graphql/types";
import type { PokemonTypeName } from "@/types/pokemon";
import { getPokemonTypeColor } from "@/constants";
import { PokedexCard } from "@/components/feature/PokedexCard";
import { TabType } from "@/components/feature/PokedexCard/PokedexCard.type";
import { Stats } from "./components/Stats";
import { Evolutions } from "./components/Evolutions";
import { Moves } from "./components/Moves";
import { PokemonNotFound } from "../PokemonNotFound";
import { Loading } from "@/components/feature/Loading";
import { usePokemonTransform } from "./usePokemonTransform.hook";

export function Pokemon() {
  const navigate = useNavigate();
  const { idOrName = "" } = useParams();
  const [activeTab, setActiveTab] = useState<TabType>(TabType.STATS);

  const isNumeric = !isNaN(Number(idOrName));

  const {
    data: rawData,
    loading: isLoading,
    error,
  } = useQuery<GetPokemonDetailsResponse>(
    isNumeric ? GET_POKEMON_BY_ID : GET_POKEMON_BY_NAME,
    {
      variables: isNumeric
        ? { id: Number(idOrName) }
        : { name: idOrName.toLowerCase() },
      skip: !idOrName,
    }
  );

  const isError = !!error;
  const data = usePokemonTransform(rawData);

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

  const handleBackClick = () => navigate(-1) || navigate("/");
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
