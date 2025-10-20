export interface BarChartData {
  stat: string;
  value: number;
  maxValue: number;
}

export interface BarChartProps {
  data: BarChartData[];
  color: string;
  maxValue?: number;
}

