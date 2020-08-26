import { CSSProperties, CreateCSSProperties, PropsFunc } from '@material-ui/styles/withStyles';
import { ComponentsPropsList } from './props';

export type ComponentsVariants = {
  [Name in keyof ComponentsPropsList]?: Array<{
    props: Partial<ComponentsPropsList[Name]>;
    styles: // JSS property bag
    | CSSProperties
      // JSS property bag where values are based on props
      | CreateCSSProperties<Partial<ComponentsPropsList[Name]>>
      // JSS property bag based on props
      | PropsFunc<
          Partial<ComponentsPropsList[Name]>,
          CreateCSSProperties<Partial<ComponentsPropsList[Name]>>
        >;
  }>;
};
