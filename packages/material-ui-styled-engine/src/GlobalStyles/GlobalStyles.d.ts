import * as React from 'react';
import { Interpolation } from '@emotion/styled';

export interface GlobalStylesProps {
  defaultTheme?: object;
  styles: Interpolation<any>;
}

export default function GlobalStyles(props: GlobalStylesProps): React.ReactElement;
