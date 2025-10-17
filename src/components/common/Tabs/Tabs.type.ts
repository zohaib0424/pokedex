export interface TabsProps<T extends string = string> {
  tabs: readonly [T, ...(readonly T[])];
  defaultTab?: T;
  activeTab?: T;
  onTabChange?: (tab: T) => void;
  backgroundColor?: string;
  className?: string;
  'data-testid'?: string;
}

