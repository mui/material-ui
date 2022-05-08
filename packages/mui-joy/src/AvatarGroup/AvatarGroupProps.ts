import * as React from 'react';
import { OverrideProps } from '@mui/types';
import { SxProps } from '../styles/types';
import { AvatarProps } from '../Avatar/AvatarProps';

export type AvatarGroupSlot = 'root';

export interface AvatarGroupTypeMap<P = {}, D extends React.ElementType = 'div'> {
  props: P &
    Pick<AvatarProps, 'color' | 'size' | 'variant'> & {
      /**
       * Used to render icon or text elements inside the AvatarGroup if `src` is not set.
       * This can be an element, or just a string.
       */
      children?: React.ReactNode;
      /**
       * The system prop that allows defining system overrides as well as additional CSS styles.
       */
      sx?: SxProps;
    };
  defaultComponent: D;
}

export type AvatarGroupProps<
  D extends React.ElementType = AvatarGroupTypeMap['defaultComponent'],
  P = { component?: React.ElementType },
> = OverrideProps<AvatarGroupTypeMap<P, D>, D>;
