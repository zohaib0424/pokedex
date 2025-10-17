import React from "react";
import { ArrowLeft } from "lucide-react";
import { PokedexCardProps } from "./PokedexCard.type";
import {
  PokedexCardContainer,
  BackButton,
  IconContainer,
  ContentCard,
  CardContent,
} from "./PokedexCard.styled";
import { BackIcon } from "../../../assets";

export const PokedexCard: React.FC<PokedexCardProps> = ({
  icon,
  children,
  backgroundColor = "#7AC74C",
  className,
  onBackClick,
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

      <IconContainer>{icon}</IconContainer>

      <ContentCard>
        <CardContent>{children}</CardContent>
      </ContentCard>
    </PokedexCardContainer>
  );
};
