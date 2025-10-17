import styled from 'styled-components';

export const StatsDisplayContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
`;

export const StatItem = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
`;

export const StatLabel = styled.span`
  font-size: 14px;
  font-weight: 600;
  color: #374151;
  min-width: 40px;
  text-align: left;
`;

export const StatValue = styled.span`
  font-size: 14px;
  font-weight: 600;
  color: #374151;
  min-width: 40px;
  text-align: right;
  font-family: 'Courier New', monospace;
`;

export const StatBar = styled.div`
  flex: 1;
  height: 8px;
  background-color: #E5E7EB;
  border-radius: 4px;
  overflow: hidden;
  position: relative;
`;

export const StatBarFill = styled.div<{ $width: number; $color: string }>`
  height: 100%;
  width: ${({ $width }) => $width}%;
  background-color: ${({ $color }) => $color};
  border-radius: 4px;
  transition: width 0.3s ease;
`;
