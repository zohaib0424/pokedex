export interface Stat {
  name: string;
  value: number;
}

export interface StatsDisplayProps {
  stats: Stat[];
  color: string;
}
