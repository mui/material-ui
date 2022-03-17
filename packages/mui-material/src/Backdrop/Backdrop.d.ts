import * as React from 'react';
import { SxProps } from '@mui/system';
import { ExtendBackdropUnstyledTypeMap } from '@mui/base/BackdropUnstyled';
import { FadeProps } from '../Fade';
import { TransitionProps } from '../transitions/transition';
import { Theme } from '../styles';
import { OverridableComponent, OverrideProps } from '../OverridableComponent';
import { BackdropClasses } from './backdropClasses';

export type BackdropTypeMap<
  D extends React.ElementType = 'span',
  P = {},
> = ExtendBackdropUnstyledTypeMap<{
  props: P &
    Partial<Omit<FadeProps, 'children'>> & {
      /**
       * Override or extend the styles applied to the component.
       */
      classes?: Partial<BackdropClasses>;
      /**
       * If `true`, the backdrop is invisible.
       * It can be used when rendering a popover or a custom select component.
       * @default false
       */
      invisible?: boolean;
      /**
       * If `true`, the component is shown.
       */
      open: boolean;
      /**
       * The system prop that allows defining system overrides as well as additional CSS styles.
       */
      sx?: SxProps<Theme>;
      /**
       * The duration for the transition, in milliseconds.
       * You may specify a single timeout for all transitions, or individually with an object.
       */
      transitionDuration?: TransitionProps['timeout'];
    };
  defaultComponent: D;
}>;

type BackdropRootProps = NonNullable<BackdropTypeMap['props']['componentsProps']>['root'];

export const BackdropRoot: React.FC<BackdropRootProps>;

/**
 *
 * Demos:
 *
 * - [Backdrop](https://mui.com/components/backdrop/)
 *
 * API:
 *
 * - [Backdrop API](https://mui.com/api/backdrop/)
 * - inherits [Fade API](https://mui.com/api/fade/)
 */

declare const Backdrop: OverridableComponent<BackdropTypeMap>;

export type BackdropProps<
  D extends React.ElementType = BackdropTypeMap['defaultComponent'],
  P = {},
> = OverrideProps<BackdropTypeMap<D, P>, D>;

export default Backdrop;
