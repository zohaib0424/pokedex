import styled, { css } from "styled-components";
import { ButtonVariant } from "./Button.type";

interface StyledButtonProps {
  variant: ButtonVariant;
}

const primaryStyles = css`
  background: #ef4444;
  color: #fff;
  min-width: 120px;
  height: 48px;
  flex: 1;
  border-radius: 12px;
  font-weight: 600;
  font-size: 16px;

  &:hover:not(:disabled) {
    background: #dc2626;
  }
`;

const secondaryStyles = css`
  background: #ffd2d2;
  color: #8a3a3a;

  &:hover:not(:disabled) {
    background: #ffc1c1;
  }
`;

export const StyledButton = styled.button<StyledButtonProps>`
  padding: 0 16px 0 20px;
  border: none;
  cursor: pointer;
  transition: background-color 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;

  ${({ variant }) => (variant === "primary" ? primaryStyles : secondaryStyles)}

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;
