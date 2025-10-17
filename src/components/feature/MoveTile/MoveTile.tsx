import React from "react";
import type { MoveTileProps } from "./MoveTile.type";

const formatMoveName = (name: string): string => {
  return name
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

export const MoveTile: React.FC<MoveTileProps> = ({ name, level }) => {
  return (
    <div className="flex flex-col gap-1 pb-3 sm:pb-4 border-b border-gray-200 last:border-b-0">
      <span className="text-[16px] sm:text-[17px] md:text-[19px] font-[400] text-[#4F4F4F]">
        {formatMoveName(name)}
      </span>
      <span className="text-[13px] sm:text-[14px] md:text-[15px] font-[400] text-[#A4A4A4]">
        Level {level}
      </span>
    </div>
  );
};
