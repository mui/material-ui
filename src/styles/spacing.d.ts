import { DeepPartial } from '../index';

export interface Spacing { 
  unit: number
}

export type SpacingOptions = DeepPartial<Spacing>;

declare const spacing: Spacing;

export default spacing;
