import { Interpolation } from '@mui/system';
import { ComponentsPropsList } from './props';

export type ComponentsVariants<Theme = unknown> = {
  [Name in keyof ComponentsPropsList]?: Array<{
    props:
      | Partial<ComponentsPropsList[Name]>
      | ((
          props: Partial<ComponentsPropsList[Name]> & {
            ownerState: Partial<ComponentsPropsList[Name]>;
          },
        ) => boolean);
    style: Interpolation<{ theme: Theme }>;
  }>;
};
