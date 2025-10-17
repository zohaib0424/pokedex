import React from 'react';
import { PokemonTypeName } from '../../../types';
import { TypeBadgeContainer } from './TypeBadge.styled';

interface TypeBadgeProps {
  type: PokemonTypeName;
}

export const TypeBadge: React.FC<TypeBadgeProps> = ({ type }) => {
  return (
    <TypeBadgeContainer type={type}>
      {type.toUpperCase()}
    </TypeBadgeContainer>
  );
};
