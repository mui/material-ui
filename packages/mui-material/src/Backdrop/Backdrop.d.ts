import * as React from 'react';
import { SxProps } from '@mui/system';
import { FadeProps } from '../Fade';
import { TransitionProps } from '../transitions/transition';
import { Theme } from '../styles';
import { BackdropClasses } from './backdropClasses';
import { OverridableComponent, OverrideProps } from '../OverridableComponent';
import { CreateSlotsAndSlotProps, SlotComponentProps, SlotProps } from '../utils/types';

export interface BackdropSlots {
  /**
   * The component that renders the root.
   * @default 'div'
   */
  root: React.ElementType;
  /**
   * The component that renders the transition.
   * [Follow this guide](https://mui.com/material-ui/transitions/#transitioncomponent-prop) to learn more about the requirements for this component.
   * @default Fade
   */
  transition: React.ElementType;
}
export interface BackdropComponentsPropsOverrides {}

export interface BackdropTransitionSlotPropsOverrides {}

export type BackdropSlotsAndSlotProps = CreateSlotsAndSlotProps<
  BackdropSlots,
  {
    /**
     * Props forwarded to the transition slot.
     * By default, the avaible props are based on the div element.
     */
    root: SlotProps<'div', BackdropComponentsPropsOverrides, BackdropOwnerState>;
    /**
     * Props forwarded to the transition slot.
     * By default, the avaible props are based on the [Fade](https://mui.com/material-ui/api/fade/#props) component.
     */
    transition: SlotComponentProps<
      React.ElementType,
      TransitionProps & BackdropTransitionSlotPropsOverrides,
      BackdropOwnerState
    >;
  }
>;

export interface BackdropOwnProps
  extends Partial<Omit<FadeProps, 'children'>>,
    BackdropSlotsAndSlotProps {
  /**
   * The content of the component.
   */
  children?: React.ReactNode;
  /**
   * The components used for each slot inside.
   *
   * @deprecated Use the `slots` prop instead. This prop will be removed in v7. See [Migrating from deprecated APIs](https://mui.com/material-ui/migration/migrating-from-deprecated-apis/) for more details.
   *
   * @default {}
   */
  components?: {
    Root?: React.ElementType;
  };
  /**
   * The extra props for the slot components.
   * You can override the existing props or add new ones.
   *
   * @deprecated Use the `slotProps` prop instead. This prop will be removed in v7. See [Migrating from deprecated APIs](https://mui.com/material-ui/migration/migrating-from-deprecated-apis/) for more details.
   *
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
  /**
   * The component used for the transition.
   * [Follow this guide](https://mui.com/material-ui/transitions/#transitioncomponent-prop) to learn more about the requirements for this component.
   * @default Fade
   * @deprecated Use `slots.transition` instead. This prop will be removed in v7. See [Migrating from deprecated APIs](/material-ui/migration/migrating-from-deprecated-apis/) for more details.
   */
  TransitionComponent?: React.JSXElementConstructor<
    TransitionProps & {
      children: React.ReactElement<unknown, any>;
    }
  >;
}

export interface BackdropTypeMap<
  AdditionalProps = {},
  RootComponent extends React.ElementType = 'div',
> {
  props: AdditionalProps & BackdropOwnProps;
  defaultComponent: RootComponent;
}

type BackdropRootProps = NonNullable<BackdropTypeMap['props']['componentsProps']>['root'];

export declare const BackdropRoot: React.FC<BackdropRootProps>;

/**
 *
 * Demos:
 *
 * - [Backdrop](https://v6.mui.com/material-ui/react-backdrop/)
 *
 * API:
 *
 * - [Backdrop API](https://v6.mui.com/material-ui/api/backdrop/)
 * - inherits [Fade API](https://v6.mui.com/material-ui/api/fade/)
 */
declare const Backdrop: OverridableComponent<BackdropTypeMap>;

export type BackdropProps<
  RootComponent extends React.ElementType = BackdropTypeMap['defaultComponent'],
  AdditionalProps = {},
> = OverrideProps<BackdropTypeMap<AdditionalProps, RootComponent>, RootComponent> & {
  component?: React.ElementType;
};

export interface BackdropOwnerState extends BackdropProps {}

export default Backdrop;
