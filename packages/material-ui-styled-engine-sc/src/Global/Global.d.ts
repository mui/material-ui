import * as React from 'react';
import { CSSObject, InterpolationFunction } from 'styled-components';

type StringTemplate = (strings: TemplateStringsArray, ...interpolations: any[]) => string;

export interface GlobalProps {
  styles: StringTemplate | string | CSSObject | InterpolationFunction<any>;
}

export default function Global(props: GlobalProps): React.ReactElement;
