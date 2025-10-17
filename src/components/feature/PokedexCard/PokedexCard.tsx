import React from "react";
import { PokedexCardProps, TabType } from "./PokedexCard.type";
import {
  PokedexCardContainer,
  BackButton,
  PokemonIconContainer,
  ContentCard,
  CardContent,
  PokemonName,
  TypeBadgesContainer,
  Description,
  TabsContainer,
  Tab,
  ContentSection,
} from "./PokedexCard.styled";
import { BackIcon } from "../../../assets";
import { TypeBadge } from "../../common";

export const PokedexCard: React.FC<PokedexCardProps> = ({
  pokemonName,
  pokemonId,
  pokemonImageUrl,
  pokemonTypes,
  pokemonDescription,
  backgroundColor = "#7AC74C",
  className,
  onBackClick,
  activeTab = 'STATS',
  onTabChange,
  children,
}) => {
  return (
    <PokedexCardContainer
      $backgroundColor={backgroundColor}
      className={className}
    >
      {onBackClick && (
        <BackButton onClick={onBackClick} aria-label="Go back">
          <BackIcon />
        </BackButton>
      )}

      <PokemonIconContainer>
        {pokemonImageUrl ? (
          <img
            src={pokemonImageUrl}
            alt={pokemonName}
            style={{ 
              width: "200px", 
              height: "200px", 
              objectFit: "contain",
              filter: "drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2))"
            }}
          />
        ) : (
          <div
            style={{
              width: "200px",
              height: "200px",
              backgroundColor: "rgba(255, 255, 255, 0.2)",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              fontSize: "24px",
              fontWeight: "bold",
            }}
          >
            {pokemonName}
          </div>
        )}
      </PokemonIconContainer>

      <ContentCard>
        <CardContent>
          <PokemonName>
            {pokemonName}
          </PokemonName>
          
          <TypeBadgesContainer>
            {pokemonTypes.map((type) => (
              <TypeBadge key={type} type={type} />
            ))}
          </TypeBadgesContainer>
          
          {pokemonDescription && (
            <Description>
              {pokemonDescription}
            </Description>
          )}
          
          <TabsContainer>
            {(['STATS', 'EVOLUTIONS', 'MOVES'] as TabType[]).map((tab) => (
              <Tab 
                key={tab}
                $isActive={activeTab === tab} 
                $color={backgroundColor}
                onClick={() => onTabChange?.(tab)}
              >
                {tab}
              </Tab>
            ))}
          </TabsContainer>

          <ContentSection>
            {children || <div></div>}
          </ContentSection>
        </CardContent>
      </ContentCard>
    </PokedexCardContainer>
  );
};
