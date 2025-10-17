import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PokemonBgImage, PokemonIcon } from "../../assets";
import { Input } from "../../components/common/Input/Input";
import { Button } from "../../components/common/Button/Button";
import { SearchPageProps } from "./SearchPage.type";
import {
  generateRandomPokemonId,
  normalizeSearchQuery,
  isValidSearchQuery,
} from "./SearchPage.utils";
import {
  SearchHero,
  SearchHeroBg,
  SearchCard,
  SearchCardLabel,
  SearchCardActions,
  InputContainer,
} from "./SearchPage.styled";

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
    <SearchHero>
      <SearchHeroBg>
        <PokemonBgImage />
      </SearchHeroBg>
      <SearchCard>
        <PokemonIcon />
        <InputContainer>
          <Input
            value={query}
            onChange={setQuery}
            placeholder="e.g. pikachu or 25"
            onKeyDown={handleKeyDown}
            data-testid="pokemon-search-input"
            label="Pokemon Name or Id"
            height={60}
          />
        </InputContainer>
        <SearchCardActions>
          <Button
            onClick={handleSearch}
            variant="primary"
            data-testid="search-button"
          >
            Search
          </Button>
          <Button
            onClick={handleRandom}
            variant="primary"
            data-testid="random-button"
          >
            Random
          </Button>
        </SearchCardActions>
      </SearchCard>
    </SearchHero>
  );
};
