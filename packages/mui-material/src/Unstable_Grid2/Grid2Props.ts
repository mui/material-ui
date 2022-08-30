import React from 'react';
import { OverrideProps } from '@mui/types';
import { SxProps, SystemProps } from '@mui/system';
import { GridBaseProps, GridSize } from '@mui/system/Unstable_Grid';
import { Theme } from '../styles';

export type Grid2Slot = 'root';

// v6 TODO: Remove this interface, the offset props are extended from the system grid
export interface Grid2PropsOffsetOverrides {}

type ExtraOffsetProps = {
  [k in keyof Grid2PropsOffsetOverrides]: true extends Grid2PropsOffsetOverrides[k] ? k : never;
}[keyof Grid2PropsOffsetOverrides];

export interface Grid2TypeMap<P = {}, D extends React.ElementType = 'div'> {
  props: P &
    GridBaseProps & {
      sx?: SxProps<Theme>;
    } & SystemProps<Theme> & { [k in ExtraOffsetProps]?: GridSize };
  defaultComponent: D;
}

export type Grid2Props<
  D extends React.ElementType = Grid2TypeMap['defaultComponent'],
  P = {
    component?: React.ElementType;
  },
> = OverrideProps<Grid2TypeMap<P, D>, D>;
