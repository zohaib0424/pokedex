import React from "react";
import { ChipProps } from "./Chip.type";
import { StyledChip } from "./Chip.styled";

export const Chip: React.FC<ChipProps> = ({
  title,
  backgroundColor = "#7AC74C",
  textColor = "#FFFFFF",
  className,
  size = "medium",
  "data-testid": testId,
}) => {
  return (
    <StyledChip
      $backgroundColor={backgroundColor}
      $textColor={textColor}
      $size={size}
      className={className}
      data-testid={testId}
    >
      {title}
    </StyledChip>
  );
};
