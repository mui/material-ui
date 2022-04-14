import { OverrideProps } from '@mui/types';
import * as React from 'react';

export type ChipDeleteSlot = 'root';

export interface ChipDeleteTypeMap<P = {}, D extends React.ElementType = 'button'> {
  props: P & {};
  defaultComponent: D;
}

export type ChipDeleteProps<
  D extends React.ElementType = ChipDeleteTypeMap['defaultComponent'],
  P = { component?: React.ElementType },
> = OverrideProps<ChipDeleteTypeMap<P, D>, D>;
