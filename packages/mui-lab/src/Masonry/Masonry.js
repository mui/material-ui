import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  createUnarySpacing,
  getValue,
  handleBreakpoints,
  unstable_resolveBreakpointValues as resolveBreakpointValues,
} from '@mui/system';
import { deepmerge, unstable_useForkRef as useForkRef } from '@mui/utils';
import { unstable_composeClasses as composeClasses } from '@mui/core';
import { styled, useThemeProps, useTheme } from '@mui/material/styles';
import { getMasonryUtilityClass } from './masonryClasses';

const useUtilityClasses = (ownerState) => {
  const { classes } = ownerState;

  const slots = {
    root: ['root'],
  };

  return composeClasses(slots, getMasonryUtilityClass, classes);
};

const configureChildrenOrder = (columns) => {
  const childrenOrder = {};
  childrenOrder[`& *:nth-of-type(${columns}n)`] = { order: columns };
  for (let i = 1; i < columns; i += 1) {
    childrenOrder[`& *:nth-of-type(${columns}n+${i})`] = { order: i };
  }
  return childrenOrder;
};

const computeBreakpointsBase = (breakpoints, prop) => {
  const base = {};
  Object.keys(breakpoints.values).forEach((breakpoint) => {
    if (prop[breakpoint] != null) {
      base[breakpoint] = true;
    }
  });
  return base;
};

const computeNumberOfLineBreaks = (columnValues) => {
  let result = 0;
  if (Array.isArray(columnValues)) {
    result = Math.max(...columnValues);
  } else if (typeof columnValues === 'object') {
    result = Math.max(...Object.values(columnValues));
  } else {
    result = columnValues;
  }
  return result > 0 ? result - 1 : 0;
};

export const style = ({ ownerState, theme }) => {
  let styles = {
    display: 'flex',
    flexFlow: 'column wrap',
    alignContent: 'space-between',
    boxSizing: 'border-box',
    '& *': {
      boxSizing: 'border-box',
    },
  };

  const spacingValues = resolveBreakpointValues({
    values: ownerState.spacing,
    base: computeBreakpointsBase(theme.breakpoints, ownerState.spacing),
  });

  const transformer = createUnarySpacing(theme);
  const spacingStyleFromPropValue = (propValue) => {
    const spacing = Number(getValue(transformer, propValue).replace('px', ''));
    return {
      '& *': {
        margin: spacing / 2,
      },
      ...(ownerState.maxColumnHeight &&
        ownerState.maxNumOfRows && {
          height: ownerState.maxColumnHeight + spacing * ownerState.maxNumOfRows,
        }),
    };
  };

  styles = deepmerge(
    styles,
    handleBreakpoints({ theme }, spacingValues, spacingStyleFromPropValue),
  );

  const columnValues = resolveBreakpointValues({
    values: ownerState.columns,
    base: computeBreakpointsBase(theme.breakpoints, ownerState.columns),
  });

  const columnStyleFromPropValue = (propValue) => {
    return {
      ...configureChildrenOrder(propValue),
      '& *': { width: `${(100 / propValue).toFixed(2)}%` },
    };
  };

  styles = deepmerge(styles, handleBreakpoints({ theme }, columnValues, columnStyleFromPropValue));

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

  const masonryRef = React.useRef();
  const [maxColumnHeight, setMaxColumnHeight] = React.useState();
  const [maxNumOfRows, setMaxNumOfRows] = React.useState();
  const { children, className, component = 'div', columns = 4, spacing = 1, ...other } = props;
  const ownerState = { ...props, spacing, columns, maxColumnHeight, maxNumOfRows };
  const classes = useUtilityClasses(ownerState);
  const lineBreakStyle = {
    flexBasis: '100%',
    width: 0,
    margin: 0,
    padding: 0,
    content: '',
  };

  React.useEffect(() => {
    const handleResize = () => {
      const columnHeights = [];
      const numOfRows = [];
      let skip = false;
      masonryRef.current.childNodes.forEach((child) => {
        if (child.dataset.class === 'line-break' || skip) {
          return;
        }
        const computedStyle = window.getComputedStyle(child);
        // if any one of children is not rendered yet, container's height shouldn't be set;
        // this is especially crucial for image masonry
        if (computedStyle.height === '0px') {
          skip = true;
          return;
        }
        const order = computedStyle.order;
        const height = Number(computedStyle.height.replace('px', ''));
        columnHeights[order - 1] = columnHeights[order - 1]
          ? columnHeights[order - 1] + Math.ceil(height)
          : Math.ceil(height);
        numOfRows[order - 1] = numOfRows[order - 1] ? numOfRows[order - 1] + 1 : 1;
      });
      if (!skip) {
        setMaxColumnHeight(Math.max(...columnHeights));
        setMaxNumOfRows(Math.max(...numOfRows));
      }
    };
    if (typeof ResizeObserver === 'undefined') {
      return null;
    }
    const resizeObserver = new ResizeObserver(handleResize);

    const container = masonryRef.current;
    resizeObserver.observe(container);
    return () => {
      resizeObserver.unobserve(container);
    };
  }, []);

  const handleRef = useForkRef(ref, masonryRef);
  const theme = useTheme();
  const columnValues = resolveBreakpointValues({
    values: columns,
    base: computeBreakpointsBase(theme.breakpoints, columns),
  });

  return (
    <MasonryRoot
      as={component}
      className={clsx(classes.root, className)}
      ref={handleRef}
      ownerState={ownerState}
      {...other}
    >
      {children}
      {new Array(computeNumberOfLineBreaks(columnValues)).fill('').map((_, index) => (
        <span key={index} data-class="line-break" style={lineBreakStyle} />
      ))}
    </MasonryRoot>
  );
});

Masonry.propTypes /* remove-proptypes */ = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------
  /**
   * The content of the component.
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
  columns: PropTypes.oneOfType([
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
   * Defines the space between children. It is a factor of the theme's spacing.
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
