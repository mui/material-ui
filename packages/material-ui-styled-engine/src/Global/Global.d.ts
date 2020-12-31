import * as React from 'react';
import { Interpolation } from '@emotion/styled';

export interface GlobalProps {
  styles: Interpolation<any>;
}

export default function Global(props: GlobalProps): React.ReactElement;
