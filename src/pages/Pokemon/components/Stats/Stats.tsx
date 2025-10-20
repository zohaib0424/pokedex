import React from "react";
import { BarChart } from "@/components/feature/Charts/BarChart";
import { parseStatsForChart } from "@/components/feature/Charts/BarChart/BarChart.utils";
import { MAX_STAT_VALUE } from "./Stats.constants";
import { StatsProps } from "./Stats.type";

export const Stats: React.FC<StatsProps> = ({ stats, color }) => {
  const chartData = parseStatsForChart(stats);
  return (
    <BarChart 
      data={chartData} 
      color={color} 
      maxValue={MAX_STAT_VALUE} 
    />
  );
};
