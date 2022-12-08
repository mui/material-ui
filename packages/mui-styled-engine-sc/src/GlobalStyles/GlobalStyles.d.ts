import * as React from 'react';
import { CSSObject, InterpolationFunction } from 'styled-components';

export interface GlobalStylesProps<Theme = {}> {
  defaultTheme?: object;
  styles: string | CSSObject | InterpolationFunction<Theme>;
}

export default function Global<Theme = {}>(props: GlobalStylesProps<Theme>): React.ReactElement;
