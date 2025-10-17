import React from "react";
import { PokedexCardProps } from "./PokedexCard.type";
import { BackIcon } from "@/assets";
import { TypeBadge } from "components/common/TypeBadge";
import { Button } from "components/common/Button";
import { Tabs } from "components/common/Tabs";

export const PokedexCard: React.FC<PokedexCardProps> = ({
  pokemonName,
  pokemonId,
  pokemonImageUrl,
  pokemonTypes,
  pokemonDescription,
  backgroundColor = "#7AC74C",
  className,
  onBackClick,
  activeTab = "STATS",
  onTabChange,
  children,
}) => {
  return (
    <div
      className="min-h-screen relative flex flex-col overflow-hidden"
      style={{ background: backgroundColor }}
    >
      {onBackClick && (
        <Button
          variant="icon"
          onClick={onBackClick}
          aria-label="Go back"
          className="absolute top-4 left-4 sm:top-8 sm:left-8 md:top-12 md:left-16 lg:top-15 lg:left-30 z-10"
        >
          <BackIcon className="transition-opacity duration-200" />
        </Button>
      )}

      <div className="bg-white rounded-t-3xl flex-1 px-4 py-6 mt-[180px] mx-4 sm:px-6 sm:py-8 sm:mt-[200px] sm:mx-8 md:mt-[220px] md:mx-16 lg:mt-[250px] lg:ml-[150px] lg:mr-[150px] relative z-[3] min-h-[60vh] flex flex-col">
        <div className="flex justify-center items-center">
          {pokemonImageUrl && (
            <img
              src={pokemonImageUrl}
              alt={pokemonName}
              className="max-w-[140px] max-h-[140px] sm:max-w-[160px] sm:max-h-[160px] md:max-w-[180px] md:max-h-[180px] lg:max-w-[200px] lg:max-h-[200px] object-contain drop-shadow-[0_4px_8px_rgba(0,0,0,0.2)] -mt-[100px] sm:-mt-[110px] md:-mt-[125px] lg:-mt-[139px]"
            />
          )}
        </div>
        <div className="flex-1 flex flex-col">
          <h1 className="text-[28px] sm:text-[32px] md:text-[36px] lg:text-[40px] font-[400] mb-3 sm:mb-4 text-center text-gray-800 capitalize">
            {pokemonName}
          </h1>

          <div className="flex gap-3 sm:gap-6 md:gap-10 lg:gap-16 justify-center mb-4 sm:mb-5 flex-wrap">
            {pokemonTypes.map((type) => (
              <TypeBadge key={type} type={type} />
            ))}
          </div>

          {pokemonDescription && (
            <p className="text-[14px] sm:text-[16px] md:text-[17px] lg:text-[18px] font-[400] leading-relaxed text-center my-4 sm:my-5 md:my-6 text-gray-600 max-w-2xl mx-auto px-2">
              {pokemonDescription}
            </p>
          )}
          <div className="flex justify-center py-4 sm:py-6 md:py-8">
            <Tabs
              tabs={["STATS", "EVOLUTIONS", "MOVES"] as const}
              activeTab={activeTab}
              onTabChange={onTabChange}
              backgroundColor={backgroundColor}
            />
          </div>

          <div className="flex-1 px-2 pb-4 sm:px-4 max-w-2xl mx-auto w-full">
            {children || (
              <div className="text-center text-gray-600 text-sm sm:text-base">
                No content available
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
