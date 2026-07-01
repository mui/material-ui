'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import composeClasses from '@mui/utils/composeClasses';
import { styled } from '../zero-styled';
import memoTheme from '../utils/memoTheme';
import { useDefaultProps } from '../DefaultPropsProvider';
import { getToolbarUtilityClass } from './toolbarClasses';
import { private_toolbarVars as vars } from './toolbarVars';

const useUtilityClasses = (ownerState) => {
  const { classes, disableGutters, variant } = ownerState;

  const slots = {
    root: ['root', !disableGutters && 'gutters', variant],
  };

  return composeClasses(slots, getToolbarUtilityClass, classes);
};

const ToolbarRoot = styled('div', {
  name: 'MuiToolbar',
  slot: 'Root',
  overridesResolver: (props, styles) => {
    const { ownerState } = props;

    return [styles.root, !ownerState.disableGutters && styles.gutters, styles[ownerState.variant]];
  },
})(
  memoTheme(({ theme }) => ({
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    variants: [
      {
        props: ({ ownerState }) => !ownerState.disableGutters,
        style: {
          // Density seam: gutter inline padding (16 base / 24 ≥sm).
          '--_inlinePad': theme.spacing(2),
          '--comp-inlinePad': `var(${vars.inlinePad}, var(--_inlinePad))`,
          paddingLeft: 'var(--comp-inlinePad, var(--_inlinePad))',
          paddingRight: 'var(--comp-inlinePad, var(--_inlinePad))',
          [theme.breakpoints.up('sm')]: {
            '--_inlinePad': theme.spacing(3),
            '--comp-inlinePad': `var(${vars.wideInlinePad}, var(--_inlinePad))`,
          },
        },
      },
      {
        props: {
          variant: 'dense',
        },
        style: {
          // Dense bar min-height (raw px). Regular height stays the mixin below.
          '--_minHeight': '48px',
          '--comp-minHeight': `var(${vars.denseMinHeight}, var(--_minHeight))`,
          minHeight: 'var(--comp-minHeight, var(--_minHeight))',
        },
      },
      {
        props: {
          variant: 'regular',
        },
        style: theme.mixins.toolbar,
      },
    ],
  })),
);

const Toolbar = React.forwardRef(function Toolbar(inProps, ref) {
  const props = useDefaultProps({ props: inProps, name: 'MuiToolbar' });
  const {
    className,
    component = 'div',
    disableGutters = false,
    variant = 'regular',
    ...other
  } = props;

  const ownerState = {
    ...props,
    component,
    disableGutters,
    variant,
  };

  const classes = useUtilityClasses(ownerState);

  return (
    <ToolbarRoot
      as={component}
      className={clsx(classes.root, className)}
      ref={ref}
      ownerState={ownerState}
      {...other}
    />
  );
});

Toolbar.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * The Toolbar children, usually a mixture of `IconButton`, `Button` and `Typography`.
   * The Toolbar is a flex container, allowing flex item properties to be used to lay out the children.
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
   * If `true`, disables gutter padding.
   * @default false
   */
  disableGutters: PropTypes.bool,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])),
    PropTypes.func,
    PropTypes.object,
  ]),
  /**
   * The variant to use.
   * @default 'regular'
   */
  variant: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['dense', 'regular']),
    PropTypes.string,
  ]),
};

export default Toolbar;
