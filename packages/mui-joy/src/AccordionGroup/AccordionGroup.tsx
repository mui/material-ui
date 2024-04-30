'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import { unstable_capitalize as capitalize } from '@mui/utils';
import { unstable_composeClasses as composeClasses } from '@mui/base';
import { OverridableComponent } from '@mui/types';
import { useThemeProps } from '../styles';
import styled from '../styles/styled';
import { getAccordionGroupUtilityClass } from './accordionGroupClasses';
import {
  AccordionGroupProps,
  AccordionGroupOwnerState,
  AccordionGroupTypeMap,
} from './AccordionGroupProps';
import useSlot from '../utils/useSlot';
import ListProvider from '../List/ListProvider';
import { StyledList } from '../List/List';
import accordionDetailsClasses from '../AccordionDetails/accordionDetailsClasses';
import accordionClasses from '../Accordion/accordionClasses';

const useUtilityClasses = (ownerState: AccordionGroupOwnerState) => {
  const { variant, color, size } = ownerState;
  const slots = {
    root: [
      'root',
      variant && `variant${capitalize(variant)}`,
      color && `color${capitalize(color)}`,
      size && `size${capitalize(size)}`,
    ],
  };

  return composeClasses(slots, getAccordionGroupUtilityClass, {});
};

const AccordionGroupRoot = styled(StyledList as unknown as 'div', {
  name: 'JoyAccordionGroup',
  slot: 'Root',
  overridesResolver: (props, styles) => styles.root,
})<{ ownerState: AccordionGroupOwnerState }>(({ theme, ownerState }) => {
  let transition: Record<string, any> = {};
  if (ownerState.transition) {
    if (typeof ownerState.transition === 'string') {
      transition = {
        '--AccordionDetails-transition': `grid-template-rows ${ownerState.transition}, padding-block ${ownerState.transition}`,
      };
    }
    if (typeof ownerState.transition === 'object') {
      transition = {
        '--AccordionDetails-transition': `grid-template-rows ${ownerState.transition.initial}, padding-block ${ownerState.transition.initial}`,
        [`& .${accordionDetailsClasses.root}.${accordionDetailsClasses.expanded}`]: {
          '--AccordionDetails-transition': `grid-template-rows ${ownerState.transition.expanded}, padding-block ${ownerState.transition.expanded}`,
        },
      };
    }
  }
  return {
    '--List-padding': '0px',
    '--ListDivider-gap': '0px',
    ...transition,
    ...(!ownerState.disableDivider && {
      [`& .${accordionClasses.root}:not([data-last-child])`]: {
        '--Accordion-borderBottom': `1px solid ${theme.vars.palette.divider}`,
      },
    }),
  };
});

/**
 *
 * Demos:
 *
 * - [Accordion](https://mui.com/joy-ui/react-accordion/)
 *
 * API:
 *
 * - [AccordionGroup API](https://mui.com/joy-ui/api/accordion-group/)
 */
const AccordionGroup = React.forwardRef(function AccordionGroup(inProps, ref) {
  const props = useThemeProps<typeof inProps & AccordionGroupProps>({
    props: inProps,
    name: 'JoyAccordionGroup',
  });

  const {
    component = 'div',
    color = 'neutral',
    children,
    disableDivider = false,
    variant = 'plain',
    transition = '0.2s ease',
    size = 'md',
    slots = {},
    slotProps = {},
    ...other
  } = props;

  const externalForwardedProps = { ...other, component, slots, slotProps };

  const ownerState = {
    ...props,
    component,
    color,
    disableDivider,
    variant,
    transition,
    size,
  };

  const classes = useUtilityClasses(ownerState);

  const [SlotRoot, rootProps] = useSlot('root', {
    ref,
    className: classes.root,
    elementType: AccordionGroupRoot,
    externalForwardedProps,
    ownerState,
  });

  return (
    <SlotRoot {...rootProps}>
      <ListProvider>{children}</ListProvider>
    </SlotRoot>
  );
}) as OverridableComponent<AccordionGroupTypeMap>;

AccordionGroup.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * Used to render icon or text elements inside the AccordionGroup if `src` is not set.
   * This can be an element, or just a string.
   */
  children: PropTypes.node,
  /**
   * The color of the component. It supports those theme colors that make sense for this component.
   * @default 'neutral'
   */
  color: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['danger', 'neutral', 'primary', 'success', 'warning']),
    PropTypes.string,
  ]),
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: PropTypes.elementType,
  /**
   * If `true`, the divider between accordions will be hidden.
   * @default false
   */
  disableDivider: PropTypes.bool,
  /**
   * The size of the component (affect other nested list* components).
   * @default 'md'
   */
  size: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['sm', 'md', 'lg']),
    PropTypes.string,
  ]),
  /**
   * The props used for each slot inside.
   * @default {}
   */
  slotProps: PropTypes.shape({
    root: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  }),
  /**
   * The components used for each slot inside.
   * @default {}
   */
  slots: PropTypes.shape({
    root: PropTypes.elementType,
  }),
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])),
    PropTypes.func,
    PropTypes.object,
  ]),
  /**
   * The CSS transition for the Accordion details.
   * @default '0.2s ease'
   */
  transition: PropTypes.oneOfType([
    PropTypes.shape({
      expanded: PropTypes.string.isRequired,
      initial: PropTypes.string.isRequired,
    }),
    PropTypes.string,
  ]),
  /**
   * The [global variant](https://mui.com/joy-ui/main-features/global-variants/) to use.
   * @default 'plain'
   */
  variant: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['outlined', 'plain', 'soft', 'solid']),
    PropTypes.string,
  ]),
} as any;

export default AccordionGroup;
