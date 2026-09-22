'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import chainPropTypes from '@mui/utils/chainPropTypes';
import composeClasses from '@mui/utils/composeClasses';
import type { SxProps } from '@mui/system';
import type { DistributiveOmit } from '@mui/types';
import { styled } from '../zero-styled';
import { useDefaultProps } from '../DefaultPropsProvider';
import Paper from '../Paper';
import { getCardUtilityClass } from './cardClasses';
import type { OverridableComponent, OverrideProps } from '../OverridableComponent';
import type { Theme } from '../styles';
import type { PaperOwnProps } from '../Paper';
import type { CardClasses } from './cardClasses';

// TODO: v6 remove this interface, it is not used
export interface CardPropsColorOverrides {}

export interface CardOwnProps extends DistributiveOmit<PaperOwnProps, 'classes'> {
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: Partial<CardClasses> | undefined;
  /**
   * If `true`, the card will use raised styling.
   * @default false
   */
  raised?: boolean | undefined;
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx?: SxProps<Theme> | undefined;
}

export interface CardTypeMap<
  AdditionalProps = {},
  RootComponent extends React.ElementType = 'div',
> {
  props: AdditionalProps & CardOwnProps;
  defaultComponent: RootComponent;
}

export type CardProps<
  RootComponent extends React.ElementType = CardTypeMap['defaultComponent'],
  AdditionalProps = {},
> = OverrideProps<CardTypeMap<AdditionalProps, RootComponent>, RootComponent> & {
  component?: React.ElementType | undefined;
};

type OwnerState = CardProps;

const useUtilityClasses = (ownerState: OwnerState) => {
  const { classes } = ownerState;

  const slots = {
    root: ['root'],
  };

  return composeClasses(slots, getCardUtilityClass, classes);
};

const CardRoot = styled(Paper, {
  name: 'MuiCard',
  slot: 'Root',
})<{ ownerState: OwnerState }>({
  overflow: 'hidden',
});

/**
 *
 * Demos:
 *
 * - [Card](https://mui.com/material-ui/react-card/)
 *
 * API:
 *
 * - [Card API](https://mui.com/material-ui/api/card/)
 * - inherits [Paper API](https://mui.com/material-ui/api/paper/)
 */
const Card = React.forwardRef(function Card(inProps: CardProps, ref: React.Ref<HTMLDivElement>) {
  const props = useDefaultProps({
    props: inProps,
    name: 'MuiCard',
  });

  const { className, raised = false, ...other } = props;

  const ownerState = { ...props, raised };

  const classes = useUtilityClasses(ownerState);

  return (
    <CardRoot
      className={clsx(classes.root, className)}
      elevation={raised ? 8 : undefined}
      ref={ref}
      ownerState={ownerState}
      {...other}
    />
  );
}) as OverridableComponent<CardTypeMap>;

Card.propTypes /* remove-proptypes */ = {
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
   * If `true`, the card will use raised styling.
   * @default false
   */
  raised: chainPropTypes(PropTypes.bool, (props) => {
    if (props.raised && props.variant === 'outlined') {
      return new Error('MUI: Combining `raised={true}` with `variant="outlined"` has no effect.');
    }

    return null;
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

export default Card;
