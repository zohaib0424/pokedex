import React from "react";
import type { EvolutionsProps } from "./Evolutions.type";
import { useEvolutions } from "./useEvolutions.hook";
import { EvolutionArrow } from "@/assets/SvgComponents";

export const Evolutions: React.FC<EvolutionsProps> = ({
  evolutions,
  color,
}) => {
  const { evolutionData, loading } = useEvolutions(evolutions);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="text-gray-600">Loading evolutions...</div>
      </div>
    );
  }

  if (evolutionData.length === 0) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="text-gray-600">No evolutions available</div>
      </div>
    );
  }

  if (evolutionData.length === 1) {
    return (
      <div className="flex items-center justify-center py-8">
        <div 
          className="text-[24px] sm:text-[32px] md:text-[40px] font-bold text-gray-600 text-center px-4"
          style={{ fontFamily: "Single Day, cursive" }}
        >
          This Pokémon does not evolve
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-4 sm:gap-6 w-full py-2 sm:py-4 px-2">
      <div className="flex items-center justify-center gap-2 sm:gap-4 flex-wrap">
        {evolutionData.map((evolution, index) => (
          <React.Fragment key={evolution.id}>
            <div className="flex flex-col items-center gap-2 sm:gap-3">
              <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 flex items-center justify-center">
                {evolution.imageUrl ? (
                  <img
                    src={evolution.imageUrl}
                    alt={evolution.name}
                    className="w-full h-full object-contain drop-shadow-md"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200 rounded-full flex items-center justify-center">
                    <span className="text-gray-400 text-[10px] sm:text-xs">
                      No Image
                    </span>
                  </div>
                )}
              </div>
              <span className="text-sm sm:text-base md:text-lg font-semibold text-gray-800 capitalize">
                {evolution.name}
              </span>
            </div>

            {index < evolutionData.length - 1 && (
              <div className="flex items-center justify-center">
                <EvolutionArrow
                  className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10"
                  color={color}
                />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};
