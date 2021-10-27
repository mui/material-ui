import { CSSInterpolation } from '@mui/system';
import { ButtonProps } from '../Button/ButtonProps';

export type OverridesStyleRules<ClassKey extends string = string> = Record<
  ClassKey,
  CSSInterpolation
>;

export interface Components {
  MuiButton?: {
    defaultProps?: Partial<ButtonProps>;
    styleOverrides?: Partial<OverridesStyleRules<''>>;
    variants?: Array<{
      props: Partial<ButtonProps>;
      style: CSSInterpolation;
    }>;
  };
}
