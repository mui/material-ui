import * as React from 'react';
import {
  CreateMUIStyled as CreateMUIStyledStyledEngine,
  CSSInterpolation,
} from '@mui/styled-engine';
import styleFunctionSx, { SxProps } from '../styleFunctionSx';
import { Theme as DefaultTheme } from '../createTheme';

export function shouldForwardProp(propName: PropertyKey): boolean;

export interface MUIStyledCommonProps<Theme extends object = DefaultTheme> {
  theme?: Theme | undefined;
  as?: React.ElementType | undefined;
  sx?: SxProps<Theme> | undefined;
}

export interface MuiStyledOptions {
  name?: string | undefined;
  slot?: string | undefined;
  // The difference between Interpolation and CSSInterpolation is that the former supports functions based on props
  // If we want to support props in the overrides, we will need to change the CSSInterpolation to Interpolation<Props>
  overridesResolver?:
    | ((props: any, styles: Record<string, CSSInterpolation>) => CSSInterpolation)
    | undefined;
  skipVariantsResolver?: boolean | undefined;
  skipSx?: boolean | undefined;
}

export type CreateMUIStyled<Theme extends object = DefaultTheme> = CreateMUIStyledStyledEngine<
  MUIStyledCommonProps<Theme>,
  MuiStyledOptions,
  Theme
>;

export default function createStyled<Theme extends object = DefaultTheme>(options?: {
  themeId?: string | undefined;
  defaultTheme?: Theme | undefined;
  rootShouldForwardProp?: ((prop: PropertyKey) => boolean) | undefined;
  slotShouldForwardProp?: ((prop: PropertyKey) => boolean) | undefined;
  styleFunctionSx?: typeof styleFunctionSx | undefined;
}): CreateMUIStyled<Theme>;
