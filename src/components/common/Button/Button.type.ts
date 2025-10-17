export type ButtonVariant = 'primary' | 'secondary';

export interface ButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  variant?: ButtonVariant;
  className?: string;
  disabled?: boolean;
  'data-testid'?: string;
}
