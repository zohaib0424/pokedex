import styled from "styled-components";

export const SearchHero = styled.div`
  min-height: 100vh;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;

export const SearchHeroBg = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;

  svg {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const SearchCard = styled.div`
  width: 427px;
  height: 362px;
  max-width: calc(100vw - 40px);
  background: #ffffff;
  border-radius: 16px;
  border: none;
  padding: 40px 32px 32px 32px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  z-index: 1;
  position: relative;
  border: 2px solid #595854;
`;

export const SearchCardLabel = styled.label`
  font-size: 16px;
  color: #374151;
  font-weight: 500;
  text-align: center;
  margin-bottom: 4px;
`;

export const SearchCardActions = styled.div`
  display: flex;
  gap: 8px;
  width: 100%;
  justify-content: center;
  align-items: center;
  button {
    width: 116px;
  }
`;

export const InputContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
`;
