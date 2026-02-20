import * as React from 'react';
import { SxProps } from '@mui/system';
import { Theme } from '../styles';
import { TransitionProps } from '../transitions/transition';
import { AccordionClasses } from './accordionClasses';
import { OverridableComponent, OverrideProps } from '../OverridableComponent';
import { ExtendPaperTypeMap, PaperProps } from '../Paper/Paper';
import { CreateSlotsAndSlotProps, SlotComponentProps, SlotProps } from '../utils/types';

export interface AccordionSlots {
  /**
   * The component that renders the root.
   * @default Paper
   */
  root: React.ElementType;
  /**
   * The component that renders the heading.
   * @default 'h3'
   */
  heading: React.ElementType;
  /**
   * The component that renders the transition.
   * [Follow this guide](https://mui.com/material-ui/transitions/#transitioncomponent-prop) to learn more about the requirements for this component.
   * @default Collapse
   */
  transition: React.ElementType;
  /**
   * The component that renders the region.
   * @default 'div'
   */
  region: React.ElementType;
}

export interface AccordionRootSlotPropsOverrides {}
export interface AccordionHeadingSlotPropsOverrides {}
export interface AccordionTransitionSlotPropsOverrides {}
export interface AccordionRegionSlotPropsOverrides {}

export type AccordionSlotsAndSlotProps = CreateSlotsAndSlotProps<
  AccordionSlots,
  {
    /**
     * Props forwarded to the root slot.
     * By default, the available props are based on the Paper element.
     */
    root: SlotProps<
      React.ElementType<PaperProps>,
      AccordionRootSlotPropsOverrides,
      AccordionOwnerState
    >;
    /**
     * Props forwarded to the heading slot.
     * By default, the available props are based on the h3 element.
     */
    heading: SlotProps<'h3', AccordionHeadingSlotPropsOverrides, AccordionOwnerState>;
    /**
     * Props forwarded to the transition slot.
     * By default, the available props are based on the [Collapse](https://mui.com/material-ui/api/collapse/#props) component.
     */
    transition: SlotComponentProps<
      React.ElementType,
      TransitionProps & AccordionTransitionSlotPropsOverrides,
      AccordionOwnerState
    >;
    /**
     * Props forwarded to the region slot.
     * By default, the available props are based on the div element.
     */
    region: SlotProps<'div', AccordionRegionSlotPropsOverrides, AccordionOwnerState>;
  }
>;

export interface AccordionOwnProps {
  /**
   * The content of the component.
   */
  children: NonNullable<React.ReactNode>;
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: Partial<AccordionClasses> | undefined;
  /**
   * If `true`, expands the accordion by default.
   * @default false
   */
  defaultExpanded?: boolean | undefined;
  /**
   * If `true`, the component is disabled.
   * @default false
   */
  disabled?: boolean | undefined;
  /**
   * If `true`, it removes the margin between two expanded accordion items and prevents the increased height when expanded.
   * @default false
   */
  disableGutters?: boolean | undefined;
  /**
   * If `true`, expands the accordion, otherwise collapses it.
   * Setting this prop enables control over the accordion.
   */
  expanded?: boolean | undefined;
  /**
   * Callback fired when the expand/collapse state is changed.
   *
   * @param {React.SyntheticEvent} event The event source of the callback. **Warning**: This is a generic event not a change event.
   * @param {boolean} expanded The `expanded` state of the accordion.
   */
  onChange?: ((event: React.SyntheticEvent, expanded: boolean) => void) | undefined;
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx?: SxProps<Theme> | undefined;
  /**
   * The component used for the transition.
   * [Follow this guide](https://mui.com/material-ui/transitions/#transitioncomponent-prop) to learn more about the requirements for this component.
   * @deprecated Use `slots.transition` instead. This prop will be removed in a future major release. See [Migrating from deprecated APIs](/material-ui/migration/migrating-from-deprecated-apis/) for more details.
   */
  TransitionComponent?:
    | React.JSXElementConstructor<
        TransitionProps & { children?: React.ReactElement<unknown, any> | undefined }
      >
    | undefined;
  /**
   * Props applied to the transition element.
   * By default, the element is based on this [`Transition`](https://reactcommunity.org/react-transition-group/transition/) component.
   * @deprecated Use `slotProps.transition` instead. This prop will be removed in a future major release. See [Migrating from deprecated APIs](/material-ui/migration/migrating-from-deprecated-apis/) for more details.
   */
  TransitionProps?: TransitionProps | undefined;
}

export type AccordionTypeMap<
  AdditionalProps = {},
  RootComponent extends React.ElementType = 'div',
> = ExtendPaperTypeMap<
  {
    props: AdditionalProps & AccordionOwnProps & AccordionSlotsAndSlotProps;
    defaultComponent: RootComponent;
  },
  'onChange' | 'classes'
>;

/**
 *
 * Demos:
 *
 * - [Accordion](https://next.mui.com/material-ui/react-accordion/)
 *
 * API:
 *
 * - [Accordion API](https://next.mui.com/material-ui/api/accordion/)
 * - inherits [Paper API](https://next.mui.com/material-ui/api/paper/)
 */
declare const Accordion: OverridableComponent<AccordionTypeMap>;

export type AccordionProps<
  RootComponent extends React.ElementType = AccordionTypeMap['defaultComponent'],
  AdditionalProps = {},
> = OverrideProps<AccordionTypeMap<AdditionalProps, RootComponent>, RootComponent> & {
  component?: React.ElementType | undefined;
};

export interface AccordionOwnerState extends AccordionProps {}

export default Accordion;
