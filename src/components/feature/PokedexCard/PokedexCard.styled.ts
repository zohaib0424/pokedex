import styled from "styled-components";

export const PokedexCardContainer = styled.div<{ $backgroundColor: string }>`
  min-height: 100vh;
  background: ${({ $backgroundColor }) => $backgroundColor};
  position: relative;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

export const BackButton = styled.button`
  position: absolute;
  top: 20px;
  left: 20px;
  background: none;
  border: none;
  cursor: pointer;
  z-index: 10;
  padding: 8px;
  border-radius: 50%;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }

  svg {
    width: 24px;
    height: 24px;
    color: white;
  }
`;

export const IconContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px 20px 20px 20px;
  z-index: 2;
  position: relative;

  img,
  svg {
    max-width: 200px;
    max-height: 200px;
    object-fit: contain;
  }
`;

export const ContentCard = styled.div`
  background: #ffffff;
  border-radius: 24px 24px 0 0;
  flex: 1;
  padding: 32px 24px;
  margin-top: -20px;
  position: relative;
  z-index: 3;
  box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.1);
  min-height: 60vh;
  display: flex;
  flex-direction: column;
`;

export const CardContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;
