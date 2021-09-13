import * as React from 'react';
import { CSSObject, InterpolationFunction } from 'styled-components';

export interface GlobalStylesProps {
  defaultTheme?: object;
  styles: string | CSSObject | InterpolationFunction<any>;
}

export default function Global(props: GlobalStylesProps): React.ReactElement;
