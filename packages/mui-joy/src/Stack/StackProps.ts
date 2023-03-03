import * as React from 'react';
import { OverrideProps } from '@mui/types';
import { StackBaseProps } from '@mui/system';
import { SxProps, SystemProps } from '../styles/types';

export type StackSlot = 'root';

export interface StackTypeMap<P = {}, D extends React.ElementType = 'div'> {
  props: P &
    StackBaseProps & {
      /**
       * The system prop, which allows defining system overrides as well as additional CSS styles.
       */
      sx?: SxProps;
    } & SystemProps;
  defaultComponent: D;
}

export type StackProps<
  D extends React.ElementType = StackTypeMap['defaultComponent'],
  P = {},
> = OverrideProps<StackTypeMap<P, D>, D>;
