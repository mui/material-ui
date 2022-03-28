import * as React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { unstable_composeClasses as composeClasses } from '@mui/base';
import { OverridableComponent } from '@mui/types';
import { useThemeProps } from '../styles';
import styled from '../styles/styled';
import { getCardOverflowUtilityClass } from './cardOverflowClasses';
import { CardOverflowProps, CardOverflowTypeMap } from './CardOverflowProps';

const useUtilityClasses = () => {
  const slots = {
    root: ['root'],
  };

  return composeClasses(slots, getCardOverflowUtilityClass, {});
};

const CardOverflowRoot = styled('div', {
  name: 'MuiCardOverflow',
  slot: 'Root',
  overridesResolver: (props, styles) => styles.root,
})<{ ownerState: CardOverflowProps }>(() => {
  const overflow = 'calc(-1 * var(--Card-padding))';
  return {
    marginLeft: overflow,
    marginRight: overflow,
    '&:first-child': {
      '--AspectRatio-radius': 'var(--Card-radius) var(--Card-radius) 0 0',
      marginTop: overflow,
      marginBottom: 'var(--Card-padding)',
    },
    '&:last-child': {
      '--AspectRatio-radius': '0 0 var(--Card-radius) var(--Card-radius)',
      marginBottom: overflow,
      marginTop: 'var(--Card-padding)',
    },
  };
});

const CardOverflow = React.forwardRef(function CardOverflow(inProps, ref) {
  const props = useThemeProps<typeof inProps & CardOverflowProps>({
    props: inProps,
    name: 'MuiCardOverflow',
  });

  const { className, component = 'div', children, ...other } = props;

  const ownerState = {
    ...props,
    component,
  };

  const classes = useUtilityClasses();

  return (
    <CardOverflowRoot
      as={component}
      ownerState={ownerState}
      className={clsx(classes.root, className)}
      ref={ref}
      {...other}
    >
      {children}
    </CardOverflowRoot>
  );
}) as OverridableComponent<CardOverflowTypeMap>;

CardOverflow.propTypes /* remove-proptypes */ = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * Used to render icon or text elements inside the CardOverflow if `src` is not set.
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
} as any;

export default CardOverflow;
