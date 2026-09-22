'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import composeClasses from '@mui/utils/composeClasses';
import type { SxProps } from '@mui/system';
import { styled } from '../zero-styled';
import { useDefaultProps } from '../DefaultPropsProvider';
import { getCardActionsUtilityClass } from './cardActionsClasses';
import type { Theme } from '../styles';
import type { InternalStandardProps as StandardProps } from '../internal';
import type { CardActionsClasses } from './cardActionsClasses';

export interface CardActionsProps extends StandardProps<React.ComponentPropsWithRef<'div'>> {
  /**
   * The content of the component.
   */
  children?: React.ReactNode;
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: Partial<CardActionsClasses> | undefined;
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx?: SxProps<Theme> | undefined;
  /**
   * If `true`, the actions do not have additional margin.
   * @default false
   */
  disableSpacing?: boolean | undefined;
}

type OwnerState = CardActionsProps;

const useUtilityClasses = (ownerState: OwnerState) => {
  const { classes, disableSpacing } = ownerState;

  const slots = {
    root: ['root', !disableSpacing && 'spacing'],
  };

  return composeClasses(slots, getCardActionsUtilityClass, classes);
};

const CardActionsRoot = styled('div', {
  name: 'MuiCardActions',
  slot: 'Root',
  overridesResolver: (props, styles) => {
    const { ownerState } = props;

    return [styles.root, !ownerState.disableSpacing && styles.spacing];
  },
})<{ ownerState: OwnerState }>({
  display: 'flex',
  alignItems: 'center',
  padding: 8,
  variants: [
    {
      props: { disableSpacing: false },
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
 * - [Card](https://mui.com/material-ui/react-card/)
 *
 * API:
 *
 * - [CardActions API](https://mui.com/material-ui/api/card-actions/)
 */
const CardActions = React.forwardRef(function CardActions(
  inProps: CardActionsProps,
  ref: React.Ref<HTMLDivElement>,
) {
  const props = useDefaultProps({
    props: inProps,
    name: 'MuiCardActions',
  });

  const { disableSpacing = false, className, ...other } = props;

  const ownerState = { ...props, disableSpacing };

  const classes = useUtilityClasses(ownerState);

  return (
    <CardActionsRoot
      className={clsx(classes.root, className)}
      ownerState={ownerState}
      ref={ref}
      {...other}
    />
  );
}) as React.ForwardRefExoticComponent<CardActionsProps>;

CardActions.propTypes /* remove-proptypes */ = {
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

export default CardActions;
