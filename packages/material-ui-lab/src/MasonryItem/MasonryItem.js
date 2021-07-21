import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { createUnarySpacing, getValue, handleBreakpoints } from '@material-ui/system';
import { unstable_composeClasses as composeClasses } from '@material-ui/unstyled';
import { styled, useThemeProps } from '@material-ui/core/styles';
import { deepmerge } from '@material-ui/utils';
import { getMasonryItemUtilityClass } from './masonryItemClasses';
import MasonryContext from '../Masonry/MasonryContext';

const useUtilityClasses = (styleProps) => {
  const { classes } = styleProps;

  const slots = {
    root: ['root'],
  };

  return composeClasses(slots, getMasonryItemUtilityClass, classes);
};

// Duplicated with Stack.js
function resolveBreakpointValues({ values, base }) {
  const keys = Object.keys(base);

  if (keys.length === 0) {
    return values;
  }

  let previous;

  return keys.reduce((acc, breakpoint) => {
    if (typeof values === 'object') {
      acc[breakpoint] = values[breakpoint] != null ? values[breakpoint] : values[previous];
    } else {
      acc[breakpoint] = values;
    }
    previous = breakpoint;
    return acc;
  }, {});
}

export const style = ({ styleProps, theme }) => {
  let styles = {
    width: '100%',
    [`& *`]: {
      objectFit: 'cover',
      width: '100%',
      height: '100%',
    },
    ...((typeof styleProps.spacing === 'string' || typeof styleProps.spacing === 'number') && {
      gridRowEnd: `span ${
        styleProps.height + Number(theme.spacing(styleProps.spacing).replace('px', ''))
      }`,
      paddingBottom: Number(theme.spacing(styleProps.spacing).replace('px', '')) - 1,
    }),
  };

  if (typeof styleProps.spacing !== 'string' && typeof styleProps.spacing !== 'number') {
    const base = Object.keys(theme.breakpoints.values).reduce((acc, breakpoint) => {
      if (styleProps.spacing[breakpoint] != null) {
        acc[breakpoint] = true;
      }
      return acc;
    }, {});
    const spacingValues = resolveBreakpointValues({ values: styleProps.spacing, base });
    const transformer = createUnarySpacing(theme);
    const styleFromPropValue = (propValue) => {
      const gap = Number(getValue(transformer, propValue).replace('px', ''));
      const rowSpan = styleProps.height ? Math.ceil(styleProps.height + gap) : 0;
      return {
        gridRowEnd: `span ${rowSpan}`,
        paddingBottom: gap - 1,
      };
    };
    styles = deepmerge(styles, handleBreakpoints({ theme }, spacingValues, styleFromPropValue));
  }
  return styles;
};

const MasonryItemRoot = styled('div', {
  name: 'MuiMasonryItem',
  slot: 'Root',
  overridesResolver: (props, styles) => {
    return [styles.root];
  },
})(style);

const MasonryItem = React.forwardRef(function MasonryItem(inProps, ref) {
  const props = useThemeProps({
    props: inProps,
    name: 'MuiMasonryItem',
  });

  const { spacing = 1 } = React.useContext(MasonryContext);
  const { children, className, component = 'div', ...other } = props;
  const styleProps = {
    ...props,
    spacing,
  };

  const classes = useUtilityClasses(styleProps);

  return (
    <MasonryItemRoot
      as={component}
      className={clsx(classes.root, className)}
      ref={ref}
      styleProps={styleProps}
      {...other}
    >
      {React.Children.only(children)}
    </MasonryItemRoot>
  );
});

MasonryItem.propTypes /* remove-proptypes */ = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------
  /**
   * The content of the component, normally an `<img />` or a `<div />`.
   */
  children: PropTypes.element.isRequired,
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
   * The height of the component in px.
   */
  height: PropTypes.number.isRequired,
  /**
   * Allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.object,
};

export default MasonryItem;
