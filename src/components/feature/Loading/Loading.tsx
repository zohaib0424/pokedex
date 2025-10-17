import React from "react";
import { Header } from "components/feature/Header";

interface LoadingProps {
  onBackClick?: () => void;
}

export const Loading: React.FC<LoadingProps> = ({ onBackClick }) => {
  return (
    <Header backgroundColor="#FF6B6B" onBackClick={onBackClick}>
      <div className="flex flex-col items-center justify-center flex-1 gap-6 sm:gap-8 p-4 sm:p-8">
        <div className="w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 flex items-center justify-center">
          <img
            src="/images/pokeball.svg"
            alt="Loading"
            className="w-full h-full object-contain animate-spin"
            style={{ animationDuration: '2s' }}
          />
        </div>
        <h1 
          className="text-[32px] sm:text-[48px] md:text-[60px] lg:text-[75px] font-bold text-white text-center px-4"
          style={{ fontFamily: 'Single Day, cursive' }}
        >
          Loading...
        </h1>
      </div>
    </Header>
  );
};

