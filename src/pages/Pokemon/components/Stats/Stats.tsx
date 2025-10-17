import React from "react";
import { STAT_ABBREVIATIONS, MAX_STAT_VALUE } from "./Stats.constants";

interface Stat {
  name: string;
  value: number;
}

interface StatsProps {
  stats: Stat[];
  color: string;
}

export const Stats: React.FC<StatsProps> = ({ stats, color }) => {
  const getStatAbbreviation = (statName: string): string =>
    STAT_ABBREVIATIONS[statName] || statName.toUpperCase();
  const getStatPercentage = (value: number): number =>
    Math.min((value / MAX_STAT_VALUE) * 100, 100);

  return (
    <div className="flex flex-col gap-3 sm:gap-3.5 w-full px-2 sm:px-0">
      {stats.map((stat) => (
        <div key={stat.name} className="flex items-center gap-2 sm:gap-3 md:gap-4 w-full">
          <span
            className="text-[10px] sm:text-xs font-bold min-w-[35px] sm:min-w-[45px] text-left uppercase tracking-wide"
            style={{ color: color }}
          >
            {getStatAbbreviation(stat.name)}
          </span>
          <span className="text-xs sm:text-sm font-semibold text-gray-700 min-w-[35px] sm:min-w-[45px] text-right font-mono">
            {stat.value.toString().padStart(3, "0")}
          </span>
          <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden relative">
            <div
              className="h-full rounded-full transition-all duration-300 ease-in-out"
              style={{
                width: `${getStatPercentage(stat.value)}%`,
                backgroundColor: color,
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

