import * as React from 'react';
import { SxProps } from '@mui/system';
import { FadeProps } from '../Fade';
import { TransitionProps } from '../transitions/transition';
import { Theme } from '../styles';
import { BackdropClasses } from './backdropClasses';
import { OverridableComponent, OverrideProps } from '../OverridableComponent';

export interface BackdropComponentsPropsOverrides {}

export interface BackdropTypeMap<P = {}, D extends React.ElementType = 'div'> {
  props: P &
    Partial<Omit<FadeProps, 'children'>> & {
      /**
       * The content of the component.
       */
      children?: React.ReactNode;
      /**
       * The components used for each slot inside the Backdrop.
       * Either a string to use a HTML element or a component.
       * @default {}
       */
      components?: {
        Root?: React.ElementType;
      };
      /**
       * The props used for each slot inside the Backdrop.
       * @default {}
       */
      componentsProps?: {
        root?: React.HTMLAttributes<HTMLDivElement> & BackdropComponentsPropsOverrides;
      };
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
}

type BackdropRootProps = NonNullable<BackdropTypeMap['props']['componentsProps']>['root'];

export const BackdropRoot: React.FC<BackdropRootProps>;

/**
 *
 * Demos:
 *
 * - [Backdrop](https://mui.com/material-ui/react-backdrop/)
 *
 * API:
 *
 * - [Backdrop API](https://mui.com/material-ui/api/backdrop/)
 * - inherits [Fade API](https://mui.com/material-ui/api/fade/)
 */
declare const Backdrop: OverridableComponent<BackdropTypeMap>;

export type BackdropProps<
  D extends React.ElementType = BackdropTypeMap['defaultComponent'],
  P = {},
> = OverrideProps<BackdropTypeMap<P, D>, D>;

export default Backdrop;
