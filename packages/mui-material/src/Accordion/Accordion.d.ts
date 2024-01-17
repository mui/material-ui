import * as React from 'react';
import { SxProps } from '@mui/system';
import { Theme } from '..';
import { TransitionProps } from '../transitions/transition';
import { AccordionClasses } from './accordionClasses';
import { OverridableComponent, OverrideProps } from '../OverridableComponent';
import { ExtendPaperTypeMap } from '../Paper/Paper';
import { CreateSlotsAndSlotProps, SlotProps } from '../utils/types';

export interface AccordionSlots {
  /**
   * The component that renders the transition.
   * [Follow this guide](/material-ui/transitions/#transitioncomponent-prop) to learn more about the requirements for this component.
   * @default Collapse
   */
  transition?: React.JSXElementConstructor<
    TransitionProps & { children?: React.ReactElement<any, any> }
  >;
}

export interface AccordionTransitionSlotPropsOverrides {}

export type AccordionSlotsAndSlotProps = CreateSlotsAndSlotProps<
  AccordionSlots,
  {
    transition: SlotProps<
      React.ElementType<TransitionProps>,
      AccordionTransitionSlotPropsOverrides,
      AccordionOwnerState
    >;
  }
>;

export type AccordionTypeMap<
  AdditionalProps = {},
  RootComponent extends React.ElementType = 'div',
> = ExtendPaperTypeMap<
  {
    props: AdditionalProps & {
      /**
       * The content of the component.
       */
      children: NonNullable<React.ReactNode>;
      /**
       * Override or extend the styles applied to the component.
       */
      classes?: Partial<AccordionClasses>;
      /**
       * If `true`, expands the accordion by default.
       * @default false
       */
      defaultExpanded?: boolean;
      /**
       * If `true`, the component is disabled.
       * @default false
       */
      disabled?: boolean;
      /**
       * If `true`, it removes the margin between two expanded accordion items and the increase of height.
       * @default false
       */
      disableGutters?: boolean;
      /**
       * If `true`, expands the accordion, otherwise collapse it.
       * Setting this prop enables control over the accordion.
       */
      expanded?: boolean;
      /**
       * Callback fired when the expand/collapse state is changed.
       *
       * @param {React.SyntheticEvent} event The event source of the callback. **Warning**: This is a generic event not a change event.
       * @param {boolean} expanded The `expanded` state of the accordion.
       */
      onChange?: (event: React.SyntheticEvent, expanded: boolean) => void;
      /**
       * The system prop that allows defining system overrides as well as additional CSS styles.
       */
      sx?: SxProps<Theme>;
      /**
       * The component used for the transition.
       * [Follow this guide](/material-ui/transitions/#transitioncomponent-prop) to learn more about the requirements for this component.
       * @deprecated Use `slots.transition` instead. This prop will be removed in v7.
       */
      TransitionComponent?: React.JSXElementConstructor<
        TransitionProps & { children?: React.ReactElement<any, any> }
      >;
      /**
       * Props applied to the transition element.
       * By default, the element is based on this [`Transition`](http://reactcommunity.org/react-transition-group/transition/) component.
       * @deprecated Use `slotProps.transition` instead. This prop will be removed in v7.
       */
      TransitionProps?: TransitionProps;
    } & AccordionSlotsAndSlotProps;
    defaultComponent: RootComponent;
  },
  'onChange' | 'classes'
>;

/**
 *
 * Demos:
 *
 * - [Accordion](https://mui.com/material-ui/react-accordion/)
 *
 * API:
 *
 * - [Accordion API](https://mui.com/material-ui/api/accordion/)
 * - inherits [Paper API](https://mui.com/material-ui/api/paper/)
 */
declare const Accordion: OverridableComponent<AccordionTypeMap>;

export type AccordionProps<
  RootComponent extends React.ElementType = AccordionTypeMap['defaultComponent'],
  AdditionalProps = {},
> = OverrideProps<AccordionTypeMap<AdditionalProps, RootComponent>, RootComponent> & {
  component?: React.ElementType;
};

export interface AccordionOwnerState extends AccordionProps {}

export default Accordion;
