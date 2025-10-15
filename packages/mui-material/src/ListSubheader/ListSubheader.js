'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import composeClasses from '@mui/utils/composeClasses';
import { styled } from '../zero-styled';
import memoTheme from '../utils/memoTheme';
import { useDefaultProps } from '../DefaultPropsProvider';
import capitalize from '../utils/capitalize';
import { getListSubheaderUtilityClass } from './listSubheaderClasses';

const useUtilityClasses = (ownerState) => {
  const { classes, color, disableGutters, inset, disableSticky } = ownerState;

  const slots = {
    root: [
      'root',
      color !== 'default' && `color${capitalize(color)}`,
      !disableGutters && 'gutters',
      inset && 'inset',
      !disableSticky && 'sticky',
    ],
  };

  return composeClasses(slots, getListSubheaderUtilityClass, classes);
};

const ListSubheaderRoot = styled('li', {
  name: 'MuiListSubheader',
  slot: 'Root',
  overridesResolver: (props, styles) => {
    const { ownerState } = props;

    return [
      styles.root,
      ownerState.color !== 'default' && styles[`color${capitalize(ownerState.color)}`],
      !ownerState.disableGutters && styles.gutters,
      ownerState.inset && styles.inset,
      !ownerState.disableSticky && styles.sticky,
    ];
  },
})(
  memoTheme(({ theme }) => ({
    boxSizing: 'border-box',
    lineHeight: '48px',
    listStyle: 'none',
    color: (theme.vars || theme).palette.text.secondary,
    fontFamily: theme.typography.fontFamily,
    fontWeight: theme.typography.fontWeightMedium,
    fontSize: theme.typography.pxToRem(14),
    variants: [
      {
        props: {
          color: 'primary',
        },
        style: {
          color: (theme.vars || theme).palette.primary.main,
        },
      },
      {
        props: {
          color: 'inherit',
        },
        style: {
          color: 'inherit',
        },
      },
      {
        props: ({ ownerState }) => !ownerState.disableGutters,
        style: {
          paddingLeft: 16,
          paddingRight: 16,
        },
      },
      {
        props: ({ ownerState }) => ownerState.inset,
        style: {
          paddingLeft: 72,
        },
      },
      {
        props: ({ ownerState }) => !ownerState.disableSticky,
        style: {
          position: 'sticky',
          top: 0,
          zIndex: 1,
          backgroundColor: (theme.vars || theme).palette.background.paper,
        },
      },
    ],
  })),
);

const ListSubheader = React.forwardRef(function ListSubheader(inProps, ref) {
  const props = useDefaultProps({ props: inProps, name: 'MuiListSubheader' });
  const {
    className,
    color = 'default',
    component = 'li',
    disableGutters = false,
    disableSticky = false,
    inset = false,
    ...other
  } = props;

  const ownerState = {
    ...props,
    color,
    component,
    disableGutters,
    disableSticky,
    inset,
  };

  const classes = useUtilityClasses(ownerState);

  return (
    <ListSubheaderRoot
      as={component}
      className={clsx(classes.root, className)}
      ref={ref}
      ownerState={ownerState}
      {...other}
    />
  );
});

if (ListSubheader) {
  ListSubheader.muiSkipListHighlight = true;
}

ListSubheader.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
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
   * The color of the component. It supports those theme colors that make sense for this component.
   * @default 'default'
   */
  color: PropTypes.oneOf(['default', 'inherit', 'primary']),
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: PropTypes.elementType,
  /**
   * If `true`, the List Subheader will not have gutters.
   * @default false
   */
  disableGutters: PropTypes.bool,
  /**
   * If `true`, the List Subheader will not stick to the top during scroll.
   * @default false
   */
  disableSticky: PropTypes.bool,
  /**
   * If `true`, the List Subheader is indented.
   * @default false
   */
  inset: PropTypes.bool,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])),
    PropTypes.func,
    PropTypes.object,
  ]),
};

export default ListSubheader;
