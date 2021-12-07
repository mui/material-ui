import { CSSInterpolation } from '@mui/system';
import { GlobalStateSlot } from '@mui/base';
import { ButtonProps } from '../../Button/ButtonProps';
import { ButtonClassKey } from '../../Button/buttonClasses';

export type OverridesStyleRules<ClassKey extends string = string> = Record<
  ClassKey,
  CSSInterpolation
>;

export interface Components {
  MuiButton?: {
    defaultProps?: Partial<ButtonProps>;
    styleOverrides?: Partial<OverridesStyleRules<Exclude<ButtonClassKey, GlobalStateSlot>>>;
    variants?: Array<{
      props: Partial<ButtonProps>;
      style: CSSInterpolation;
    }>;
  };
}
