import type * as React from 'react';
import type { CSSObject, StyleFunction } from 'styled-components';

export interface GlobalStylesProps<Theme extends object = {}> {
  defaultTheme?: object;
  styles: string | CSSObject | StyleFunction<Theme>;
}

export default function Global<Theme extends object = {}>(
  props: GlobalStylesProps<Theme>,
): React.JSX.Element;
