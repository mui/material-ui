import * as React from 'react';
import { OverrideProps } from '@mui/types';
import { ApplyColorInversion, SxProps } from '../styles/types';
import { AvatarProps } from '../Avatar/AvatarProps';
import { SlotProps, CreateSlotsAndSlotProps } from '../utils/types';

export type AvatarGroupSlot = 'root';

export interface AvatarGroupSlots {
  /**
   * The component that renders the root.
   * @default 'div'
   */
  root?: React.ElementType;
}

export type AvatarGroupSlotsAndSlotProps = CreateSlotsAndSlotProps<
  AvatarGroupSlots,
  {
    root: SlotProps<'div', {}, AvatarGroupOwnerState>;
  }
>;

export interface AvatarGroupTypeMap<P = {}, D extends React.ElementType = 'div'> {
  props: P &
    Pick<AvatarProps, 'color' | 'size' | 'variant'> & {
      /**
       * The color context for the avatar children.
       * It has no effect on the AvatarGroup.
       * @default 'neutral'
       */
      color?: AvatarProps['color'];
      /**
       * Used to render icon or text elements inside the AvatarGroup if `src` is not set.
       * This can be an element, or just a string.
       */
      children?: React.ReactNode;
      /**
       * The size of the component and the avatar children.
       * @default 'md'
       */
      size?: AvatarProps['size'];
      /**
       * The system prop that allows defining system overrides as well as additional CSS styles.
       */
      sx?: SxProps;
      /**
       * The variant context for the avatar children.
       * It has no effect on the AvatarGroup.
       * @default 'soft'
       */
      variant?: AvatarProps['variant'];
    } & AvatarGroupSlotsAndSlotProps;
  defaultComponent: D;
}

export type AvatarGroupProps<
  D extends React.ElementType = AvatarGroupTypeMap['defaultComponent'],
  P = { component?: React.ElementType },
> = OverrideProps<AvatarGroupTypeMap<P, D>, D>;

export interface AvatarGroupOwnerState extends ApplyColorInversion<AvatarGroupProps> {}
