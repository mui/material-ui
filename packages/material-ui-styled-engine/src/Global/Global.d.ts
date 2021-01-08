import * as React from 'react';
import { Interpolation } from '@emotion/styled';

export interface GlobalProps {
  styles: Interpolation<any>;
  defaultTheme?: object;
}

export default function Global(props: GlobalProps): React.ReactElement;
