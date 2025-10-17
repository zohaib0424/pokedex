import React from 'react';
import { PokemonTypeName } from '@/types/pokemon';
import { getPokemonTypeColor } from '@/constants';

interface TypeBadgeProps {
  type: PokemonTypeName;
}

export const TypeBadge: React.FC<TypeBadgeProps> = ({ type }) => {
  return (
    <span
      className="w-[100px] sm:w-[120px] md:w-[140px] lg:w-[162px] inline-block px-3 sm:px-4 md:px-5 lg:px-6 py-1.5 sm:py-2 rounded-full text-[14px] sm:text-[15px] md:text-[16px] lg:text-[18px] font-[400] uppercase text-white text-center tracking-wide"
      style={{ backgroundColor: getPokemonTypeColor(type) }}
    >
      {type}
    </span>
  );
};
