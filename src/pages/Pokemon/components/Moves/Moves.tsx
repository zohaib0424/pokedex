import React from "react";
import type { MovesProps } from "./Moves.type";

export const Moves: React.FC<MovesProps> = ({ moves, color }) => {
  if (!moves || moves.length === 0) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="text-gray-600">No moves available</div>
      </div>
    );
  }

  const formatMoveName = (name: string): string => {
    return name
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  return (
    <div className="flex flex-col gap-3 sm:gap-4 w-full max-h-[300px] sm:max-h-[350px] md:max-h-[400px] overflow-y-auto pr-1 sm:pr-2 px-2 sm:px-0">
      {moves.map((move, index) => (
        <div
          key={`${move.name}-${move.level}-${index}`}
          className="flex flex-col gap-1 pb-3 sm:pb-4 border-b border-gray-200 last:border-b-0"
        >
          <span className="text-[16px] sm:text-[17px] md:text-[19px] font-[400] text-[#4F4F4F]">
            {formatMoveName(move.name)}
          </span>
          <span className="text-[13px] sm:text-[14px] md:text-[15px] font-[400] text-[#A4A4A4]">
            Level {move.level}
          </span>
        </div>
      ))}
    </div>
  );
};

