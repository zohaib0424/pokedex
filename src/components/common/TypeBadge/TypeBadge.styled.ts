import styled from 'styled-components';
import { PokemonTypeName } from '../../../types';

interface TypeBadgeContainerProps {
  type: PokemonTypeName;
}

export const TypeBadgeContainer = styled.span<TypeBadgeContainerProps>`
  display: inline-block;
  padding: 4px 12px;
  margin: 0 4px;
  border-radius: 16px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  color: white;
  background-color: ${({ type }) => {
    const typeColors: Record<PokemonTypeName, string> = {
      normal: '#A8A878',
      fire: '#F08030',
      water: '#6890F0',
      electric: '#F8D030',
      grass: '#78C850',
      ice: '#98D8D8',
      fighting: '#C03028',
      poison: '#A040A0',
      ground: '#E0C068',
      flying: '#A890F0',
      psychic: '#F85888',
      bug: '#A8B820',
      rock: '#B8A038',
      ghost: '#705898',
      dragon: '#7038F8',
      dark: '#705848',
      steel: '#B8B8D0',
      fairy: '#EE99AC',
    };
    return typeColors[type] || '#A8A878';
  }};
`;
