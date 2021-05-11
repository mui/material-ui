import { CSSInterpolation } from './experimentalStyled';
import { ComponentsPropsList } from './props';

export type ComponentsVariants = {
  [Name in keyof ComponentsPropsList]?: Array<{
    props: Partial<ComponentsPropsList[Name]>;
    style: CSSInterpolation;
  }>;
};
