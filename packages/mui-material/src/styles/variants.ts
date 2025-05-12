import { VariantsPropsAndStyle } from '@mui/system';
import { ComponentsPropsList } from './props';

export type ComponentsVariants<Theme = unknown> = {
  [Name in keyof ComponentsPropsList]?: Array<{
    props: VariantsPropsAndStyle<ComponentsPropsList[Name]>['props'];
    style: VariantsPropsAndStyle<{ theme: Theme }>['style'];
  }>;
};
