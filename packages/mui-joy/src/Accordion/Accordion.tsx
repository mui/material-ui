'use client';
import * as React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { unstable_composeClasses as composeClasses } from '@mui/base';
import { OverridableComponent } from '@mui/types';
import { unstable_useControlled as useControlled, unstable_useId as useId } from '@mui/utils';
import { useThemeProps } from '../styles';
import styled from '../styles/styled';
import { getAccordionUtilityClass } from './accordionClasses';
import { AccordionProps, AccordionOwnerState, AccordionTypeMap } from './AccordionProps';
import useSlot from '../utils/useSlot';
import AccordionContext from './AccordionContext';
import { StyledListItem } from '../ListItem/ListItem';

const useUtilityClasses = () => {
  const slots = {
    root: ['root'],
  };

  return composeClasses(slots, getAccordionUtilityClass, {});
};

const AccordionRoot = styled(StyledListItem as unknown as 'div', {
  name: 'JoyAccordion',
  slot: 'Root',
  overridesResolver: (props, styles) => styles.root,
})<{ ownerState: AccordionOwnerState }>(({ ownerState }) => ({}));
/**
 * ⚠️ Accordion must be used as a direct child of the [Card](https://mui.com/joy-ui/react-card/) component.
 *
 * Demos:
 *
 * - [Card](https://mui.com/joy-ui/react-card/)
 *
 * API:
 *
 * - [Accordion API](https://mui.com/joy-ui/api/card-content/)
 */
const Accordion = React.forwardRef(function Accordion(inProps, ref) {
  const props = useThemeProps<typeof inProps & AccordionProps>({
    props: inProps,
    name: 'JoyAccordion',
  });

  const {
    accordionId: idOverride,
    className,
    component = 'div',
    children,
    defaultExpanded = false,
    disabled = false,
    expanded: expandedProp,
    onChange,
    slots = {},
    slotProps = {},
    ...other
  } = props;

  const accordionId = useId(idOverride);

  const [expanded, setExpandedState] = useControlled({
    controlled: expandedProp,
    default: defaultExpanded,
    name: 'Accordion',
    state: 'expanded',
  });

  const handleChange = React.useCallback(
    (event: React.SyntheticEvent) => {
      setExpandedState(!expanded);

      if (onChange) {
        onChange(event, !expanded);
      }
    },
    [expanded, onChange, setExpandedState],
  );

  const contextValue = React.useMemo(
    () => ({ accordionId, expanded, disabled, toggle: handleChange }),
    [accordionId, expanded, disabled, handleChange],
  );

  const externalForwardedProps = { ...other, component, slots, slotProps };

  const ownerState = {
    ...props,
    component,
    nested: true, // for the ListItem styles
  };

  const classes = useUtilityClasses();

  const [SlotRoot, rootProps] = useSlot('root', {
    ref,
    className: clsx(classes.root, className),
    elementType: AccordionRoot,
    externalForwardedProps,
    ownerState,
  });

  return (
    <AccordionContext.Provider value={contextValue}>
      <SlotRoot {...rootProps}>
        {React.Children.map(children, (child, index) =>
          React.isValidElement(child) && index === 0
            ? React.cloneElement(child, {
                // @ts-ignore: to let ListItem knows when to apply margin(Inline|Block)Start
                'data-first-child': '',
              })
            : child,
        )}
      </SlotRoot>
    </AccordionContext.Provider>
  );
}) as OverridableComponent<AccordionTypeMap>;

Accordion.propTypes /* remove-proptypes */ = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * Used to render icon or text elements inside the Accordion if `src` is not set.
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

export default Accordion;
