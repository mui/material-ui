export interface SharedProps {
  min: number;
  max: number;
  state: string;
  value: number;
  vertical: boolean;
}

export type SharedClassKey = 'activated' | 'disabled' | 'focused' | 'jumped' | 'vertical';

export type State = 'activated' | 'disabled' | 'focused' | 'jumped';
