import React from 'react';
import { OverrideProps } from '@mui/types';
import { Grid2BaseProps } from '@mui/system/Unstable_Grid2';
import { SxProps, SystemProps } from '../styles/types';

export type GridSlot = 'root';

export interface GridTypeMap<P = {}, D extends React.ElementType = 'div'> {
  props: P & Grid2BaseProps & { sx?: SxProps } & SystemProps;
  defaultComponent: D;
}

export type GridProps<
  D extends React.ElementType = GridTypeMap['defaultComponent'],
  P = {
    component?: React.ElementType;
  },
> = OverrideProps<GridTypeMap<P, D>, D>;
