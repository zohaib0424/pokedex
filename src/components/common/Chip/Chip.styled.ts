import styled, { css } from "styled-components";
import { ChipProps } from "./Chip.type";

interface StyledChipProps {
  $backgroundColor: string;
  $textColor: string;
  $size: 'small' | 'medium' | 'large';
}

const sizeStyles = {
  small: css`
    padding: 4px 8px;
    font-size: 12px;
    border-radius: 6px;
  `,
  medium: css`
    padding: 6px 12px;
    font-size: 14px;
    border-radius: 8px;
  `,
  large: css`
    padding: 8px 16px;
    font-size: 16px;
    border-radius: 10px;
  `,
};

export const StyledChip = styled.span<StyledChipProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ $backgroundColor }) => $backgroundColor};
  color: ${({ $textColor }) => $textColor};
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  border: none;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: all 0.2s ease;
  white-space: nowrap;
  user-select: none;

  ${({ $size }) => sizeStyles[$size]}
`;
