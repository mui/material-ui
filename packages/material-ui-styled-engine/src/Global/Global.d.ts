import * as React from 'react';
import { Interpolation } from '@emotion/styled';

type GlobalStyles = Interpolation<any>;

export interface GlobalProps {
  styles: GlobalStyles;
  defaultTheme?: object;
}

export default function Global(props: GlobalProps): React.ReactElement;
