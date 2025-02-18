'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import { unstable_composeClasses as composeClasses } from '@mui/base';
import { OverridableComponent } from '@mui/types';
import { useThemeProps } from '../styles';
import styled from '../styles/styled';
import accordionSummaryClasses, {
  getAccordionSummaryUtilityClass,
} from './accordionSummaryClasses';
import {
  AccordionSummaryProps,
  AccordionSummaryOwnerState,
  AccordionSummaryTypeMap,
} from './AccordionSummaryProps';
import useSlot from '../utils/useSlot';
import AccordionContext from '../Accordion/AccordionContext';
import { StyledListItem } from '../ListItem/ListItem';
import { StyledListItemButton } from '../ListItemButton/ListItemButton';
import KeyboardArrowDown from '../internal/svg-icons/KeyboardArrowDown';

const useUtilityClasses = (ownerState: AccordionSummaryOwnerState) => {
  const { disabled, expanded } = ownerState;
  const slots = {
    root: ['root', disabled && 'disabled', expanded && 'expanded'],
    button: ['button', disabled && 'disabled', expanded && 'expanded'],
    indicator: ['indicator', disabled && 'disabled', expanded && 'expanded'],
  };

  return composeClasses(slots, getAccordionSummaryUtilityClass, {});
};

const AccordionSummaryRoot = styled(StyledListItem as unknown as 'div', {
  name: 'JoyAccordionSummary',
  slot: 'Root',
  overridesResolver: (props, styles) => styles.root,
})<{ ownerState: AccordionSummaryOwnerState }>(({ theme }) => ({
  fontWeight: theme.vars.fontWeight.md,
  gap: 'calc(var(--ListItem-paddingX, 0.75rem) + 0.25rem)',
  [`&.${accordionSummaryClasses.expanded}`]: {
    '--Icon-color': 'currentColor',
  },
}));

const AccordionSummaryButton = styled(StyledListItemButton as unknown as 'button', {
  name: 'JoyAccordionSummary',
  slot: 'Button',
  overridesResolver: (props, styles) => styles.button,
})<{ ownerState: AccordionSummaryOwnerState }>({
  gap: 'inherit',
  fontWeight: 'inherit',
  justifyContent: 'space-between',
  font: 'inherit',
  '&:focus-visible': {
    zIndex: 1, // to make the focus ring appear above the next Accordion.
  },
  [`.${accordionSummaryClasses.root} &`]: {
    '--unstable_ListItem-flex': '1 0 0%', // grow to fill the available space of ListItem
  },
});

const AccordionSummaryIndicator = styled('span', {
  name: 'JoyAccordionSummary',
  slot: 'Indicator',
  overridesResolver: (props, styles) => styles.indicator,
})<{ ownerState: AccordionSummaryOwnerState }>({
  display: 'inline-flex',
  [`&.${accordionSummaryClasses.expanded}`]: {
    transform: 'rotate(180deg)',
  },
});

/**
 *
 * Demos:
 *
 * - [Accordion](https://mui.com/joy-ui/react-accordion/)
 *
 * API:
 *
 * - [AccordionSummary API](https://mui.com/joy-ui/api/accordion-summary/)
 */
const AccordionSummary = React.forwardRef(function AccordionSummary(inProps, ref) {
  const props = useThemeProps<typeof inProps & AccordionSummaryProps>({
    props: inProps,
    name: 'JoyAccordionSummary',
  });

  const {
    component = 'div',
    color = 'neutral',
    children,
    indicator = <KeyboardArrowDown />,
    variant = 'plain',
    slots = {},
    slotProps = {},
    ...other
  } = props;

  const {
    accordionId,
    disabled = false,
    expanded = false,
    toggle,
  } = React.useContext(AccordionContext);

  const externalForwardedProps = { ...other, component, slots, slotProps };

  const ownerState = {
    ...props,
    component,
    color,
    disabled,
    expanded,
    variant,
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (toggle) {
      toggle(event);
    }
    if (typeof slotProps.button === 'function') {
      slotProps.button(ownerState)?.onClick?.(event);
    } else {
      slotProps.button?.onClick?.(event);
    }
  };

  const classes = useUtilityClasses(ownerState);

  const [SlotRoot, rootProps] = useSlot('root', {
    ref,
    className: classes.root,
    elementType: AccordionSummaryRoot,
    externalForwardedProps,
    ownerState,
  });

  const [SlotButton, buttonProps] = useSlot('button', {
    ref,
    className: classes.button,
    elementType: AccordionSummaryButton,
    externalForwardedProps,
    additionalProps: {
      component: 'button',
      id: `${accordionId}-summary`,
      'aria-expanded': expanded ? 'true' : 'false',
      'aria-controls': `${accordionId}-details`,
      disabled,
      type: 'button',
      onClick: handleClick,
    },
    ownerState,
  });

  const [SlotIndicator, indicatorProps] = useSlot('indicator', {
    ref,
    className: classes.indicator,
    elementType: AccordionSummaryIndicator,
    externalForwardedProps,
    ownerState,
  });

  return (
    // Root and Button slots are required based on [WAI-ARIA Accordion](https://www.w3.org/WAI/ARIA/apg/patterns/accordion/examples/accordion/)
    <SlotRoot {...rootProps}>
      <SlotButton {...buttonProps}>
        {children}
        {indicator && <SlotIndicator {...indicatorProps}>{indicator}</SlotIndicator>}
      </SlotButton>
    </SlotRoot>
  );
}) as OverridableComponent<AccordionSummaryTypeMap>;

AccordionSummary.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * Used to render icon or text elements inside the AccordionSummary if `src` is not set.
   * This can be an element, or just a string.
   */
  children: PropTypes.node,
  /**
   * The color of the component. It supports those theme colors that make sense for this component.
   * @default 'neutral'
   */
  color: PropTypes.oneOf(['danger', 'neutral', 'primary', 'success', 'warning']),
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: PropTypes.elementType,
  /**
   * The indicator element to display.
   * @default <KeyboardArrowDown />
   */
  indicator: PropTypes.node,
  /**
   * The props used for each slot inside.
   * @default {}
   */
  slotProps: PropTypes.shape({
    button: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    indicator: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    root: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  }),
  /**
   * The components used for each slot inside.
   * @default {}
   */
  slots: PropTypes.shape({
    button: PropTypes.elementType,
    indicator: PropTypes.elementType,
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
   * The [global variant](https://mui.com/joy-ui/main-features/global-variants/) to use.
   * @default 'plain'
   */
  variant: PropTypes.oneOf(['outlined', 'plain', 'soft', 'solid']),
} as any;

export default AccordionSummary;
