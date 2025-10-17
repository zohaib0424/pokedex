import React from 'react';
import { StatsDisplayContainer, StatItem, StatLabel, StatValue, StatBar, StatBarFill } from './StatsDisplay.styled';

interface Stat {
  name: string;
  value: number;
}

interface StatsDisplayProps {
  stats: Stat[];
  color: string;
}

const statAbbreviations: Record<string, string> = {
  'hp': 'HP',
  'attack': 'ATK',
  'defense': 'DEF',
  'special-attack': 'SATK',
  'special-defense': 'SDEF',
  'speed': 'SPD'
};

export const StatsDisplay: React.FC<StatsDisplayProps> = ({ stats, color }) => {
  const getStatAbbreviation = (statName: string): string => {
    return statAbbreviations[statName] || statName.toUpperCase();
  };

  const getStatPercentage = (value: number): number => {
    // Pokemon stats typically range from 0-255, but we'll use 0-200 for better visual representation
    return Math.min((value / 200) * 100, 100);
  };

  return (
    <StatsDisplayContainer>
      {stats.map((stat) => (
        <StatItem key={stat.name}>
          <StatLabel>{getStatAbbreviation(stat.name)}</StatLabel>
          <StatValue>{stat.value.toString().padStart(3, '0')}</StatValue>
          <StatBar>
            <StatBarFill 
              $width={getStatPercentage(stat.value)} 
              $color={color}
            />
          </StatBar>
        </StatItem>
      ))}
    </StatsDisplayContainer>
  );
};
