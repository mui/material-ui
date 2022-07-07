import React from 'react';
import { OverrideProps } from '@mui/types';
import { GridBaseProps } from '@mui/system/Grid';
import { SxProps, SystemProps } from '../styles/types';

export type GridSlot = 'root';

export interface GridTypeMap<P = {}, D extends React.ElementType = 'div'> {
  props: P & GridBaseProps & { sx?: SxProps } & SystemProps;
  defaultComponent: D;
}

export type GridProps<
  D extends React.ElementType = GridTypeMap['defaultComponent'],
  P = {
    component?: React.ElementType;
  },
> = OverrideProps<GridTypeMap<P, D>, D>;
