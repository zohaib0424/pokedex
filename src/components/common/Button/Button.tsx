import { ButtonProps } from "./Button.type";
import { StyledButton } from "./Button.styled";

export const Button = ({
  children,
  onClick,
  variant = "primary",
  className,
  disabled = false,
  "data-testid": testId,
}: ButtonProps) => {
  return (
    <StyledButton
      onClick={onClick}
      variant={variant}
      className={className}
      disabled={disabled}
      data-testid={testId}
    >
      {children}
    </StyledButton>
  );
};
