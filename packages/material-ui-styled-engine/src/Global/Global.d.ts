import * as React from 'react';
import { Interpolation, Theme } from '@emotion/react';

export interface GlobalProps {
  styles: string;
}

export default function Global(props: GlobalProps): React.ReactElement