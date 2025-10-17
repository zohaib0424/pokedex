import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PokemonIcon } from "@/assets/SvgComponents";
import {
  generateRandomPokemonId,
  normalizeSearchQuery,
  isValidSearchQuery,
} from "./Search.utils";
import pokemonBg from "@/assets/PokemonBg.png";
import { Input } from "components/common/Input";
import { Button } from "components/common/Button";

export const Search = () => {
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
    if (e.key === "Enter") handleSearch();
  };

  return (
    <div
      className="relative overflow-hidden flex items-center justify-center min-h-screen bg-cover bg-center bg-no-repeat [&_*]:!font-[Roboto,sans-serif] px-4 sm:px-6"
      style={{
        backgroundImage: `url(${pokemonBg})`,
        fontFamily: "Roboto, sans-serif",
      }}
    >
      <div className="w-full max-w-[427px] bg-white p-6 sm:p-8 flex flex-col items-center justify-between z-10 relative border-2 border-pokemon-gray rounded-2xl gap-4 sm:gap-6">
        <div className="flex items-center justify-center w-full">
          <PokemonIcon />
        </div>
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
        <div className="flex flex-row gap-16 w-full justify-center items-center">
          <Button
            onClick={handleSearch}
            variant="primary"
            data-testid="search-button"
            className="w-[116px] pr-8"
            disabled={!query}
          >
            Search
          </Button>
          <Button
            onClick={handleRandom}
            variant="primary"
            data-testid="random-button"
            className="w-[116px] pr-8 "
          >
            Random
          </Button>
        </div>
      </div>
    </div>
  );
};
