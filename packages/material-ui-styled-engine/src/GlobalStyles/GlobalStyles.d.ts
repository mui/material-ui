import * as React from 'react';
import { GlobalProps } from '@emotion/react';

export interface GlobalStylesProps {
  defaultTheme?: object;
  styles: GlobalProps['styles'];
}

export default function GlobalStyles(props: GlobalStylesProps): React.ReactElement;
