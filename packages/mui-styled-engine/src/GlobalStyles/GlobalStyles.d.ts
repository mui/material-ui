import type * as React from 'react';
import type { Interpolation } from '@emotion/react';

export interface GlobalStylesProps<Theme = {}> {
  defaultTheme?: object;
  styles: Interpolation<Theme>;
}

export default function GlobalStyles<Theme = {}>(
  props: GlobalStylesProps<Theme>,
): React.JSX.Element;
