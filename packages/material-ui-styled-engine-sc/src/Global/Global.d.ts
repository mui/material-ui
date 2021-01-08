import * as React from 'react';
import { CSSObject, InterpolationFunction } from 'styled-components';

export interface GlobalProps {
  defaultTheme?: object;
  styles: string | CSSObject | InterpolationFunction<any>;
}

export default function Global(props: GlobalProps): React.ReactElement;
