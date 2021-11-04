import { unstable_composeClasses as composeClasses } from '@mui/core';
import { styled, useThemeProps } from '@mui/material/styles';
import {
  createUnarySpacing,
  getValue,
  handleBreakpoints,
  unstable_resolveBreakpointValues as resolveBreakpointValues,
} from '@mui/system';
import { deepmerge, unstable_useForkRef as useForkRef } from '@mui/utils';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import * as React from 'react';
import { getMasonryUtilityClass } from './masonryClasses';

export const parseToNumber = (val) => {
  return Number(val.replace('px', ''));
};

const useUtilityClasses = (ownerState) => {
  const { classes } = ownerState;

  const slots = {
    root: ['root'],
  };

  return composeClasses(slots, getMasonryUtilityClass, classes);
};

export const getStyle = ({ ownerState, theme }) => {
  let styles = {
    width: '100%',
    display: 'flex',
    flexFlow: 'column wrap',
    alignContent: 'space-between',
    boxSizing: 'border-box',
    '& > *': {
      boxSizing: 'border-box',
    },
  };

  const stylesSSR = {};
  if (ownerState.isSSR) {
    const orderStyleSSR = {};
    const defaultSpacing = Number(theme.spacing(ownerState.defaultSpacing).replace('px', ''));
    for (let i = 1; i <= ownerState.defaultColumns; i += 1) {
      orderStyleSSR[
        `&:nth-of-type(${ownerState.defaultColumns}n+${i % ownerState.defaultColumns})`
      ] = {
        order: i,
      };
    }
    stylesSSR.height = ownerState.defaultHeight;
    stylesSSR.margin = -(defaultSpacing / 2);
    stylesSSR['& > *'] = {
      ...styles['& > *'],
      ...orderStyleSSR,
      margin: defaultSpacing / 2,
      width: `calc(${(100 / ownerState.defaultColumns).toFixed(2)}% - ${defaultSpacing}px)`,
    };

    return {
      ...styles,
      ...stylesSSR,
    };
  }

  const spacingValues = resolveBreakpointValues({
    values: ownerState.spacing,
    breakpoints: theme.breakpoints.values,
  });

  const transformer = createUnarySpacing(theme);
  const spacingStyleFromPropValue = (propValue) => {
    const themeSpacingValue = Number(propValue);
    const spacing = Number(getValue(transformer, themeSpacingValue).replace('px', ''));
    return {
      margin: -(spacing / 2),
      '& > *': {
        margin: spacing / 2,
      },
      ...(ownerState.maxColumnHeight && {
        height: Math.ceil(ownerState.maxColumnHeight + spacing),
      }),
    };
  };

  styles = deepmerge(
    styles,
    handleBreakpoints({ theme }, spacingValues, spacingStyleFromPropValue),
  );

  const columnValues = resolveBreakpointValues({
    values: ownerState.columns,
    breakpoints: theme.breakpoints.values,
  });

  const columnStyleFromPropValue = (propValue) => {
    const columnValue = Number(propValue);
    const width = `${(100 / columnValue).toFixed(2)}%`;
    const spacing =
      typeof spacingValues !== 'object' ? getValue(transformer, Number(spacingValues)) : '0px';
    return {
      '& > *': { width: `calc(${width} - ${spacing})` },
    };
  };

  styles = deepmerge(styles, handleBreakpoints({ theme }, columnValues, columnStyleFromPropValue));

  // configure width for responsive spacing values
  if (typeof spacingValues === 'object') {
    styles = deepmerge(
      styles,
      handleBreakpoints({ theme }, spacingValues, (propValue, breakpoint) => {
        if (breakpoint) {
          const themeSpacingValue = Number(propValue);
          const lastBreakpoint = Object.keys(columnValues).pop();
          const spacing = getValue(transformer, themeSpacingValue);
          const column =
            typeof columnValues === 'object'
              ? columnValues[breakpoint] || columnValues[lastBreakpoint]
              : columnValues;
          const width = `${(100 / column).toFixed(2)}%`;
          return {
            '& > *': { width: `calc(${width} - ${spacing})` },
          };
        }
        return null;
      }),
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
})(getStyle);

const Masonry = React.forwardRef(function Masonry(inProps, ref) {
  const props = useThemeProps({
    props: inProps,
    name: 'MuiMasonry',
  });

  const {
    children,
    className,
    component = 'div',
    columns = 4,
    spacing = 1,
    defaultColumns,
    defaultHeight,
    defaultSpacing,
    ...other
  } = props;

  const masonryRef = React.useRef();
  const [maxColumnHeight, setMaxColumnHeight] = React.useState();
  const isSSR =
    !maxColumnHeight &&
    defaultHeight &&
    defaultColumns !== undefined &&
    defaultSpacing !== undefined;
  const [numberOfLineBreaks, setNumberOfLineBreaks] = React.useState(
    isSSR ? defaultColumns - 1 : 0,
  );

  const ownerState = {
    ...props,
    spacing,
    columns,
    maxColumnHeight,
    defaultColumns,
    defaultHeight,
    defaultSpacing,
    isSSR,
  };

  const classes = useUtilityClasses(ownerState);

  const handleResize = (elements) => {
    if (!elements) {
      return;
    }
    let masonry;
    let masonryFirstChild;
    let parentWidth;
    let childWidth;
    if (elements[0].target.className.includes(classes.root)) {
      masonry = elements[0].target;
      parentWidth = elements[0].contentRect.width;
      masonryFirstChild = elements[1]?.target || masonry.firstChild;
      childWidth = masonryFirstChild?.contentRect?.width || masonryFirstChild?.clientWidth || 0;
    } else {
      masonryFirstChild = elements[0].target;
      childWidth = elements[0].contentRect.width;
      masonry = elements[1]?.target || masonryFirstChild.parentElement;
      parentWidth = masonry.contentRect?.width || masonry.clientWidth;
    }

    if (parentWidth === 0 || childWidth === 0 || !masonry || !masonryFirstChild) {
      return;
    }

    const firstChildComputedStyle = window.getComputedStyle(masonryFirstChild);
    const firstChildMarginLeft = parseToNumber(firstChildComputedStyle.marginLeft);
    const firstChildMarginRight = parseToNumber(firstChildComputedStyle.marginRight);

    const currentNumberOfColumns = Math.round(
      parentWidth / (childWidth + firstChildMarginLeft + firstChildMarginRight),
    );

    const columnHeights = new Array(currentNumberOfColumns).fill(0);
    let skip = false;
    masonry.childNodes.forEach((child) => {
      if (child.nodeType !== Node.ELEMENT_NODE || child.dataset.class === 'line-break' || skip) {
        return;
      }
      const childComputedStyle = window.getComputedStyle(child);
      const childMarginTop = parseToNumber(childComputedStyle.marginTop);
      const childMarginBottom = parseToNumber(childComputedStyle.marginBottom);
      // if any one of children isn't rendered yet, masonry's height shouldn't be computed yet
      const childHeight = parseToNumber(childComputedStyle.height)
        ? Math.ceil(parseToNumber(childComputedStyle.height)) + childMarginTop + childMarginBottom
        : 0;
      if (childHeight === 0) {
        skip = true;
        return;
      }
      // if there is a nested image that isn't rendered yet, masonry's height shouldn't be computed yet
      for (let i = 0; i < child.childNodes.length; i += 1) {
        const nestedChild = child.childNodes[i];
        if (nestedChild.tagName === 'IMG' && nestedChild.clientHeight === 0) {
          skip = true;
          break;
        }
      }
      if (!skip) {
        // find the current shortest column (where the current item will be placed)
        const currentMinColumnIndex = columnHeights.indexOf(Math.min(...columnHeights));
        columnHeights[currentMinColumnIndex] += childHeight;
        const order = currentMinColumnIndex + 1;
        child.style.order = order;
      }
    });
    if (!skip) {
      setMaxColumnHeight(Math.max(...columnHeights));
      const numOfLineBreaks = currentNumberOfColumns > 0 ? currentNumberOfColumns - 1 : 0;
      setNumberOfLineBreaks(numOfLineBreaks);
    }
  };

  const observer = React.useRef(
    typeof ResizeObserver === 'undefined' ? undefined : new ResizeObserver(handleResize),
  );

  React.useEffect(() => {
    const resizeObserver = observer.current;
    // IE and old browsers are not supported
    if (resizeObserver === undefined) {
      return undefined;
    }

    const container = masonryRef.current;
    if (container && resizeObserver) {
      // only the masonry container and its first child are observed for resizing;
      // this might cause unforeseen problems in some use cases;
      resizeObserver.observe(container);
      if (container.firstChild) {
        resizeObserver.observe(container.firstChild);
      }
    }
    return () => (resizeObserver ? resizeObserver.disconnect() : {});
  }, [columns, spacing, children]);

  const handleRef = useForkRef(ref, masonryRef);
  const lineBreakStyle = {
    flexBasis: '100%',
    width: 0,
    margin: 0,
    padding: 0,
  };

  //  columns are likely to have different heights and hence can start to merge;
  //  a line break at the end of each column prevents columns from merging
  const lineBreaks = new Array(numberOfLineBreaks)
    .fill('')
    .map((_, index) => (
      <span key={index} data-class="line-break" style={{ ...lineBreakStyle, order: index + 1 }} />
    ));

  return (
    <MasonryRoot
      as={component}
      className={clsx(classes.root, className)}
      ref={handleRef}
      ownerState={ownerState}
      {...other}
    >
      {children}
      {lineBreaks}
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
   * The default number of columns of the component. This is provided for server-side rendering.
   */
  defaultColumns: PropTypes.number,
  /**
   * The default height of the component in px. This is provided for server-side rendering.
   */
  defaultHeight: PropTypes.number,
  /**
   * The default spacing of the component. Like `spacing`, it is a factor of the theme's spacing. This is provided for server-side rendering.
   */
  defaultSpacing: PropTypes.number,
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
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object])),
    PropTypes.func,
    PropTypes.object,
  ]),
};

export default Masonry;
