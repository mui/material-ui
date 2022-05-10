import * as React from 'react';
import { CreateStyledComponent } from '@mui/styled-engine';
import { MUIStyledCommonProps } from '../createStyled';
import Container, { ContainerProps } from './Container';
import { Theme as DefaultTheme } from '../createTheme';

export default function createContainer<Theme extends object = DefaultTheme>(options?: {
  createStyledComponent?: CreateStyledComponent<
    MUIStyledCommonProps<Theme>,
    ContainerProps,
    JSX.IntrinsicElements['div'],
    Theme
  >;
  useThemeProps?: (inProps: ContainerProps) => ContainerProps & { component?: React.ElementType };
  componentName?: string;
}): typeof Container;
