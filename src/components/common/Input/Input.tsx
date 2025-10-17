import { InputProps } from './Input.type';
import { StyledInput, InputContainer, InputLabel } from './Input.styled';

export const Input = ({ 
  value, 
  onChange, 
  placeholder, 
  onKeyDown, 
  className,
  'data-testid': testId,
  label,
  height
}: InputProps) => {
  return (
    <InputContainer>
      {label && <InputLabel>{label}</InputLabel>}
      <StyledInput
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        onKeyDown={onKeyDown}
        className={className}
        data-testid={testId}
        hasLabel={!!label}
        height={height}
      />
    </InputContainer>
  );
};
