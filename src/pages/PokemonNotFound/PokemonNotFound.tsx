import React from "react";
import NoPokemonIcon from "@/assets/NoPokemonScreenIcon.png";
import { Header } from "components/feature/Header";

interface PokemonNotFoundProps {
  onBackClick: () => void;
}

export const PokemonNotFound: React.FC<PokemonNotFoundProps> = ({ onBackClick }) => {
  return (
    <Header backgroundColor="#FF6B6B" onBackClick={onBackClick}>
      <div className="flex flex-col items-center justify-center flex-1 gap-6 sm:gap-8 p-4 sm:p-8">
        <h1 
          className="text-[32px] sm:text-[48px] md:text-[60px] lg:text-[75px] font-bold text-white text-center px-4"
          style={{ fontFamily: 'Single Day, cursive' }}
        >
          No Pokemon Found!
        </h1>
        <div className="w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 flex items-center justify-center">
          <img
            src={NoPokemonIcon}
            alt="No Pokemon Found"
            className="w-full h-full object-contain"
          />
        </div>
      </div>
    </Header>
  );
};

