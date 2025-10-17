export type ButtonVariant = 'primary' | 'secondary' | 'icon';

export interface ButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  variant?: ButtonVariant;
  className?: string;
  disabled?: boolean;
  style?: React.CSSProperties;
  'data-testid'?: string;
  'aria-label'?: string;
}
