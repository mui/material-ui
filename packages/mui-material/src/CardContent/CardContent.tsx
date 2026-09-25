'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import composeClasses from '@mui/utils/composeClasses';
import type { SxProps } from '@mui/system';
import { styled } from '../zero-styled';
import { useDefaultProps } from '../DefaultPropsProvider';
import { getCardContentUtilityClass } from './cardContentClasses';
import type { OverridableComponent, OverrideProps } from '../OverridableComponent';
import type { Theme } from '../styles';
import type { CardContentClasses } from './cardContentClasses';

export interface CardContentOwnProps {
  /**
   * The content of the component.
   */
  children?: React.ReactNode;
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: Partial<CardContentClasses> | undefined;
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx?: SxProps<Theme> | undefined;
}

export interface CardContentTypeMap<
  AdditionalProps = {},
  RootComponent extends React.ElementType = 'div',
> {
  props: AdditionalProps & CardContentOwnProps;
  defaultComponent: RootComponent;
}

export type CardContentProps<
  RootComponent extends React.ElementType = CardContentTypeMap['defaultComponent'],
  AdditionalProps = {},
> = OverrideProps<CardContentTypeMap<AdditionalProps, RootComponent>, RootComponent> & {
  component?: React.ElementType | undefined;
};

type OwnerState = CardContentProps;

const useUtilityClasses = (ownerState: OwnerState) => {
  const { classes } = ownerState;

  const slots = {
    root: ['root'],
  };

  return composeClasses(slots, getCardContentUtilityClass, classes);
};

const CardContentRoot = styled('div', {
  name: 'MuiCardContent',
  slot: 'Root',
})<{ ownerState: OwnerState }>({
  padding: 16,
  '&:last-child': {
    paddingBottom: 24,
  },
});

/**
 *
 * Demos:
 *
 * - [Card](https://mui.com/material-ui/react-card/)
 *
 * API:
 *
 * - [CardContent API](https://mui.com/material-ui/api/card-content/)
 */
const CardContent = React.forwardRef(function CardContent(
  inProps: CardContentProps,
  ref: React.Ref<HTMLDivElement>,
) {
  const props = useDefaultProps({
    props: inProps,
    name: 'MuiCardContent',
  });

  const { className, component = 'div', ...other } = props;

  const ownerState = { ...props, component };

  const classes = useUtilityClasses(ownerState);

  return (
    <CardContentRoot
      as={component}
      className={clsx(classes.root, className)}
      ownerState={ownerState}
      ref={ref}
      {...other}
    />
  );
}) as OverridableComponent<CardContentTypeMap>;

CardContent.propTypes /* remove-proptypes */ = {
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
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: PropTypes.elementType,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])),
    PropTypes.func,
    PropTypes.object,
  ]),
} as any;

export default CardContent;
