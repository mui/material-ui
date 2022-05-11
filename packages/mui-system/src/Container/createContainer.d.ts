import * as React from 'react';
import { Interpolation, StyledComponent } from '@mui/styled-engine';
import Container, { ContainerProps } from './Container';
import { Theme as DefaultTheme } from '../createTheme';

interface StyleFnProps<Theme> extends ContainerProps {
  theme: Theme;
  ownerState: ContainerProps;
}

export default function createContainer<Theme extends object = DefaultTheme>(options?: {
  createStyledComponent?: (
    ...rest: Array<Interpolation<StyleFnProps<Theme>>>
  ) => StyledComponent<ContainerProps>;
  useThemeProps?: (inProps: ContainerProps) => ContainerProps & { component?: React.ElementType };
  componentName?: string;
}): typeof Container;
