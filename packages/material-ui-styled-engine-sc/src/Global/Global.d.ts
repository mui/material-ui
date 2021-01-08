import * as React from 'react';
import { CSSObject, InterpolationFunction } from 'styled-components';

type StringTemplate = (strings: TemplateStringsArray, ...interpolations: any[]) => string;

type GlobalStyles = StringTemplate | string | CSSObject | InterpolationFunction<any>;

export interface GlobalProps {
  styles: GlobalStyles;
  defaultTheme?: object;
}

export default function Global(props: GlobalProps): React.ReactElement;
