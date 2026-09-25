'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import composeClasses from '@mui/utils/composeClasses';
import type { SxProps } from '@mui/system';
import { styled } from '../zero-styled';
import { useDefaultProps } from '../DefaultPropsProvider';
import { getAccordionActionsUtilityClass } from './accordionActionsClasses';
import type { Theme } from '../styles';
import type { InternalStandardProps as StandardProps } from '../internal';
import type { AccordionActionsClasses } from './accordionActionsClasses';

export interface AccordionActionsProps extends StandardProps<React.ComponentPropsWithRef<'div'>> {
  /**
   * The content of the component.
   */
  children?: React.ReactNode;
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: Partial<AccordionActionsClasses> | undefined;
  /**
   * If `true`, the actions do not have additional margin.
   * @default false
   */
  disableSpacing?: boolean | undefined;
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx?: SxProps<Theme> | undefined;
}

type OwnerState = AccordionActionsProps;

const useUtilityClasses = (ownerState: OwnerState) => {
  const { classes, disableSpacing } = ownerState;

  const slots = {
    root: ['root', !disableSpacing && 'spacing'],
  };

  return composeClasses(slots, getAccordionActionsUtilityClass, classes);
};

const AccordionActionsRoot = styled('div', {
  name: 'MuiAccordionActions',
  slot: 'Root',
  overridesResolver: (props, styles) => {
    const { ownerState } = props;

    return [styles.root, !ownerState.disableSpacing && styles.spacing];
  },
})<{ ownerState: OwnerState }>({
  display: 'flex',
  alignItems: 'center',
  padding: 8,
  justifyContent: 'flex-end',
  variants: [
    {
      props: (props) => !props.disableSpacing,
      style: {
        '& > :not(style) ~ :not(style)': {
          marginLeft: 8,
        },
      },
    },
  ],
});

/**
 *
 * Demos:
 *
 * - [Accordion](https://mui.com/material-ui/react-accordion/)
 *
 * API:
 *
 * - [AccordionActions API](https://mui.com/material-ui/api/accordion-actions/)
 */
const AccordionActions = React.forwardRef(function AccordionActions(
  inProps: AccordionActionsProps,
  ref: React.Ref<HTMLDivElement>,
) {
  const props = useDefaultProps({ props: inProps, name: 'MuiAccordionActions' });
  const { className, disableSpacing = false, ...other } = props;
  const ownerState = { ...props, disableSpacing };

  const classes = useUtilityClasses(ownerState);

  return (
    <AccordionActionsRoot
      className={clsx(classes.root, className)}
      ref={ref}
      ownerState={ownerState}
      {...other}
    />
  );
}) as React.ForwardRefExoticComponent<AccordionActionsProps>;

AccordionActions.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * The content of the component.
   */
  children: PropTypes.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: PropTypes.object,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * If `true`, the actions do not have additional margin.
   * @default false
   */
  disableSpacing: PropTypes.bool,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])),
    PropTypes.func,
    PropTypes.object,
  ]),
} as any;

export default AccordionActions;
