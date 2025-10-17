import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PokemonIcon } from "@/assets";
import { SearchPageProps } from "./SearchPage.type";
import {
  generateRandomPokemonId,
  normalizeSearchQuery,
  isValidSearchQuery,
} from "./SearchPage.utils";
import pokemonBg from "@/assets/pokemonBg.png";
import { Input } from "components/common/Input";
import { Button } from "components/common/Button";

export const SearchPage = ({}: SearchPageProps) => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    const normalizedQuery = normalizeSearchQuery(query);
    if (isValidSearchQuery(normalizedQuery)) {
      navigate(`/pokemon/${normalizedQuery}`);
    }
  };

  const handleRandom = () => {
    const randomId = generateRandomPokemonId();
    navigate(`/pokemon/${randomId}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div
      className="relative overflow-hidden flex items-center justify-center min-h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${pokemonBg})` }}
    >
      <div className="w-[427px] bg-white p-8 flex flex-col items-center justify-between z-10 relative border-2 border-pokemon-gray rounded-2xl gap-6">
        <PokemonIcon />
        <div className="w-full flex flex-col items-center gap-2">
          <Input
            value={query}
            onChange={setQuery}
            placeholder="e.g. pikachu or 25"
            onKeyDown={handleKeyDown}
            data-testid="pokemon-search-input"
            label="Pokemon Name or Id"
            height={60}
          />
        </div>
        <div className="flex gap-2 w-full justify-center items-center">
          <Button
            onClick={handleSearch}
            variant="primary"
            data-testid="search-button"
            className="w-[116px]"
          >
            Search
          </Button>
          <Button
            onClick={handleRandom}
            variant="primary"
            data-testid="random-button"
            className="w-[116px]"
          >
            Random
          </Button>
        </div>
      </div>
    </div>
  );
};
