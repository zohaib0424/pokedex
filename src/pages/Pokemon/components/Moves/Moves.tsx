import React from "react";
import { MoveTile } from "@/components/feature/MoveTile";
import type { MovesProps } from "./Moves.type";

export const Moves: React.FC<MovesProps> = ({ moves, color: _color }) => {
  if (!moves || moves.length === 0) {
    return (
      <div
        className="text-[24px] sm:text-[32px] md:text-[40px] font-bold text-gray-600 text-center px-4"
        style={{ fontFamily: "Single Day, cursive" }}
      >
        <div className="text-gray-600">No moves available</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3 sm:gap-4 w-full max-h-[calc(100vh-780px)] overflow-y-auto pr-1 sm:pr-2">
      {moves.map((move, index) => (
        <MoveTile
          key={`${move.name}-${move.level}-${index}`}
          name={move.name}
          level={move.level}
        />
      ))}
    </div>
  );
};
