import * as React from 'react';
import { CSSObject, InterpolationFunction } from 'styled-components';

export interface GlobalProps {
  styles: string | CSSObject | InterpolationFunction<any>;
  defaultTheme?: object;
}

export default function Global(props: GlobalProps): React.ReactElement;
