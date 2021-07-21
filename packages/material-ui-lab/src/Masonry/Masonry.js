// A masonry component using the following libs as inspiration.
// - https://github.com/STRML/react-grid-layout
// - https://next.material-ui.com/components/image-list/#masonry-image-list
// - https://github.com/desandro/masonry
// - https://w3bits.com/css-grid-masonry

import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  createUnarySpacing,
  getValue,
  handleBreakpoints,
  resolveBreakpointValues,
} from '@material-ui/system';
import { unstable_composeClasses as composeClasses } from '@material-ui/unstyled';
import { styled, useThemeProps } from '@material-ui/core/styles';
import { deepmerge } from '@material-ui/utils';
import { getMasonryUtilityClass } from './masonryClasses';
import MasonryContext from './MasonryContext';

const useUtilityClasses = (styleProps) => {
  const { classes } = styleProps;

  const slots = {
    root: ['root'],
  };

  return composeClasses(slots, getMasonryUtilityClass, classes);
};

export const style = ({ styleProps, theme }) => {
  let styles = {
    display: 'grid',
    gridAutoRows: 0,
    padding: 0,
    overflow: 'auto',
    width: '100%',
    rowGap: 1,
    ...((typeof styleProps.spacing === 'string' || typeof styleProps.spacing === 'number') && {
      columnGap: theme.spacing(styleProps.spacing),
    }),
    ...((typeof styleProps.cols === 'string' || typeof styleProps.cols === 'number') && {
      gridTemplateColumns: `repeat(${styleProps.cols}, 1fr)`,
    }),
  };

  const base = Object.keys(theme.breakpoints.values).reduce((acc, breakpoint) => {
    if (styleProps.spacing[breakpoint] != null) {
      acc[breakpoint] = true;
    }
    return acc;
  }, {});

  if (typeof styleProps.spacing === 'object' || Array.isArray(styleProps.spacing)) {
    const spacingValues = resolveBreakpointValues({ values: styleProps.spacing, base });
    const transformer = createUnarySpacing(theme);
    const spacingStyleFromPropValue = (propValue) => {
      return {
        columnGap: getValue(transformer, propValue),
      };
    };

    styles = deepmerge(
      styles,
      handleBreakpoints({ theme }, spacingValues, spacingStyleFromPropValue),
    );
  }

  if (typeof styleProps.cols === 'object' || Array.isArray(styleProps.cols)) {
    const columnValues = resolveBreakpointValues({ values: styleProps.cols, base });
    const columnStyleFromPropValue = (propValue) => {
      return {
        gridTemplateColumns: `repeat(${propValue}, 1fr)`,
      };
    };

    styles = deepmerge(
      styles,
      handleBreakpoints({ theme }, columnValues, columnStyleFromPropValue),
    );
  }

  return styles;
};

const MasonryRoot = styled('div', {
  name: 'MuiMasonry',
  slot: 'Root',
  overridesResolver: (props, styles) => {
    return [styles.root];
  },
})(style);

const Masonry = React.forwardRef(function Masonry(inProps, ref) {
  const props = useThemeProps({
    props: inProps,
    name: 'MuiMasonry',
  });

  const { children, className, component = 'div', cols = 4, spacing = 1, ...other } = props;
  const styleProps = { ...props, spacing, cols };
  const classes = useUtilityClasses(styleProps);

  return (
    <MasonryRoot
      as={component}
      className={clsx(classes.root, className)}
      ref={ref}
      styleProps={styleProps}
      {...other}
    >
      <MasonryContext.Provider value={{ spacing }}>{children}</MasonryContext.Provider>
    </MasonryRoot>
  );
});

Masonry.propTypes /* remove-proptypes */ = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------
  /**
   * The content of the component, normally `<MasonryItem />`s.
   */
  children: PropTypes /* @typescript-to-proptypes-ignore */.node.isRequired,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: PropTypes.object,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * Number of columns.
   * @default 4
   */
  cols: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.number, PropTypes.string])),
    PropTypes.number,
    PropTypes.object,
    PropTypes.string,
  ]),
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: PropTypes.elementType,
  /**
   * Defines the space between children.
   * @default 1
   */
  spacing: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.number, PropTypes.string])),
    PropTypes.number,
    PropTypes.object,
    PropTypes.string,
  ]),
  /**
   * Allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.object,
};

export default Masonry;
