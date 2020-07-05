import { ComponentsPropsList } from './props';

export type Variants = {
  [Name in keyof ComponentsPropsList]?: {
    matcher: Partial<ComponentsPropsList[Name]>,
    styles: string;
  }
};