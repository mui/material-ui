import React from 'react';
import { OverrideProps } from '@mui/types';
import { GridBaseProps, GridSize } from '@mui/system/Unstable_Grid';
import { SxProps, SystemProps } from '../styles/types';

export type GridSlot = 'root';

// v6 TODO: Remove this interface, the offset props are extended from the system grid
export interface GridPropsOffsetOverrides {}

type ExtraOffsetProps = {
  [k in keyof GridPropsOffsetOverrides]: true extends GridPropsOffsetOverrides[k] ? k : never;
}[keyof GridPropsOffsetOverrides];

export interface GridTypeMap<P = {}, D extends React.ElementType = 'div'> {
  props: P &
    GridBaseProps & { sx?: SxProps } & SystemProps & { [k in ExtraOffsetProps]?: GridSize };
  defaultComponent: D;
}

export type GridProps<
  D extends React.ElementType = GridTypeMap['defaultComponent'],
  P = {
    component?: React.ElementType;
  },
> = OverrideProps<GridTypeMap<P, D>, D>;
