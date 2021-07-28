import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  createUnarySpacing,
  getValue,
  handleBreakpoints,
  unstable_resolveBreakpointValues as resolveBreakpointValues,
} from '@material-ui/system';
import { deepmerge, unstable_useForkRef as useForkRef } from '@material-ui/utils';
import { unstable_composeClasses as composeClasses } from '@material-ui/unstyled';
import { styled, useThemeProps } from '@material-ui/core/styles';
import ResizeObserver from 'resize-observer-polyfill';
import { getMasonryItemUtilityClass } from './masonryItemClasses';
import MasonryContext from '../Masonry/MasonryContext';

const useUtilityClasses = (styleProps) => {
  const { classes } = styleProps;

  const slots = {
    root: ['root'],
  };

  return composeClasses(slots, getMasonryItemUtilityClass, classes);
};

export const style = ({ styleProps, theme }) => {
  let styles = {
    width: '100%',
    [`& > *`]: {
      // all contents should have a width of 100%
      width: '100%',
    },
    visibility: styleProps.height ? 'visible' : 'hidden',
    gridColumnEnd: `span ${styleProps.columnSpan}`,
  };

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
    const rowSpan = Math.ceil(styleProps.height + gap);
    return {
      gridRowEnd: `span ${rowSpan}`,
      paddingBottom: gap - 1,
    };
  };
  styles = deepmerge(styles, handleBreakpoints({ theme }, spacingValues, styleFromPropValue));

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

  const masonryItemRef = React.useRef(null);

  const { spacing = 1, documentReady = false } = React.useContext(MasonryContext);
  const { children, className, component = 'div', columnSpan = 1, height = 0, ...other } = props;
  const [styleProps, setStyleProps] = React.useState({
    ...props,
    spacing,
    columnSpan,
    height,
  });

  const classes = useUtilityClasses(styleProps);

  const computeHeight = () => {
    const child = masonryItemRef.current.firstChild;
    setStyleProps({
      ...styleProps,
      height: child?.getBoundingClientRect().height,
    });
  };
  const resizeObserver = React.useRef(new ResizeObserver(computeHeight));

  React.useEffect(() => {
    if (documentReady) {
      computeHeight();
    }
  }, [documentReady]); // eslint-disable-line

  // eslint-disable-next-line
  React.useEffect(() => {
    if (resizeObserver?.current && masonryItemRef?.current) {
      const observer = resizeObserver.current;
      const item = masonryItemRef.current;
      observer.observe(item);
      return () => {
        observer.unobserve(item);
      };
    }
  }, [masonryItemRef]);

  const handleRef = useForkRef(ref, masonryItemRef);

  return (
    <MasonryItemRoot
      as={component}
      className={clsx(classes.root, className)}
      ref={handleRef}
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
   * The number of columns taken up by the component
   * @default 1
   */
  columnSpan: PropTypes.number,
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: PropTypes.elementType,
  /**
   * The height of the component in px.
   */
  height: PropTypes.number,
  /**
   * Allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.object,
};

export default MasonryItem;
