'use client';
import * as React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { unstable_composeClasses as composeClasses } from '@mui/base';
import { OverridableComponent } from '@mui/types';
import { useThemeProps } from '../styles';
import styled from '../styles/styled';
import { getAccordionSummaryUtilityClass } from './accordionSummaryClasses';
import {
  AccordionSummaryProps,
  AccordionSummaryOwnerState,
  AccordionSummaryTypeMap,
} from './AccordionSummaryProps';
import useSlot from '../utils/useSlot';
import AccordionContext from '../Accordion/AccordionContext';

const useUtilityClasses = (ownerState: AccordionSummaryOwnerState) => {
  const { disabled, expanded } = ownerState;
  const slots = {
    root: ['root', disabled && 'disabled', expanded && 'expanded'],
    button: ['button', disabled && 'disabled', expanded && 'expanded'],
  };

  return composeClasses(slots, getAccordionSummaryUtilityClass, {});
};

const AccordionSummaryRoot = styled('div', {
  name: 'JoyAccordionSummary',
  slot: 'Root',
  overridesResolver: (props, styles) => styles.root,
})<{ ownerState: AccordionSummaryOwnerState }>(({ ownerState }) => ({
  display: 'flex',
  flex: 1, // fill the available space in the Card and also shrink if needed
  zIndex: 1,
  columnGap: 'calc(0.75 * var(--Card-padding))',
  padding: 'var(--unstable_padding)',
}));

const AccordionSummaryButton = styled('button', {
  name: 'JoyAccordionSummary',
  slot: 'Button',
  overridesResolver: (props, styles) => styles.button,
})<{ ownerState: AccordionSummaryOwnerState }>({});

/**
 * ⚠️ AccordionSummary must be used as a direct child of the [Card](https://mui.com/joy-ui/react-card/) component.
 *
 * Demos:
 *
 * - [Card](https://mui.com/joy-ui/react-card/)
 *
 * API:
 *
 * - [AccordionSummary API](https://mui.com/joy-ui/api/card-content/)
 */
const AccordionSummary = React.forwardRef(function AccordionSummary(inProps, ref) {
  const props = useThemeProps<typeof inProps & AccordionSummaryProps>({
    props: inProps,
    name: 'JoyAccordionSummary',
  });

  const { className, component = 'div', children, slots = {}, slotProps = {}, ...other } = props;

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
    disabled,
    expanded,
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
    className: clsx(classes.root, className),
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
      'aria-expanded': expanded ? 'true' : 'false',
      'aria-controls': accordionId,
      disabled,
      onClick: handleClick,
    },
    ownerState,
  });

  return (
    <SlotRoot {...rootProps}>
      <SlotButton {...buttonProps}>{children}</SlotButton>
    </SlotRoot>
  );
}) as OverridableComponent<AccordionSummaryTypeMap>;

AccordionSummary.propTypes /* remove-proptypes */ = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * Used to render icon or text elements inside the AccordionSummary if `src` is not set.
   * This can be an element, or just a string.
   */
  children: PropTypes.node,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: PropTypes.elementType,
  /**
   * The component orientation.
   * @default 'vertical'
   */
  orientation: PropTypes.oneOf(['horizontal', 'vertical']),
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
} as any;

export default AccordionSummary;
