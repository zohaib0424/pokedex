import styled from "styled-components";

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100%;
  gap: 8px;
`;

export const StyledInput = styled.input<{
  hasLabel?: boolean;
  height?: number;
}>`
  width: 100%;
  height: ${({ height }) => (height ? `${height}px` : "48px")};
  border-radius: 8px;
  border: 1px solid #e5e7eb;
  padding: 0 16px;
  outline: none;
  font-size: 16px;
  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease;
  background: #ffffff;
  box-sizing: border-box;
  color: black;

  &:focus {
    border-color: #ef4444;
    box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
  }

  &::placeholder {
    color: #9ca3af;
  }
`;

export const InputLabel = styled.span`
  color: #767676;
  font-size: 16px;
  font-weight: 700;
  pointer-events: none;
  white-space: nowrap;
`;
