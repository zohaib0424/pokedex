import { STAT_ABBREVIATIONS, MAX_STAT_VALUE } from "@/pages/Pokemon/components/Stats/Stats.constants";
import { Stat } from "@/pages/Pokemon/components/Stats/Stats.type";
import { BarChartData } from "./BarChart.type";


export const getStatAbbreviation = (statName: string): string =>
  STAT_ABBREVIATIONS[statName] || statName.toUpperCase();

export const parseStatsForChart = (stats: Stat[]): BarChartData[] => {
  return stats.map((stat) => ({
    stat: getStatAbbreviation(stat.name),
    value: stat.value,
    maxValue: MAX_STAT_VALUE,
  }));
};

