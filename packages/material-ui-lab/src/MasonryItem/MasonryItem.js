import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  createUnarySpacing,
  getValue,
  handleBreakpoints,
  unstable_resolveBreakpointValues as resolveBreakpointValues,
} from '@material-ui/system';
import { unstable_useForkRef as useForkRef } from '@material-ui/utils';
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
    '& > *': {
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
    const gap = styleProps.height ? Number(getValue(transformer, propValue).replace('px', '')) : 0;
    const rowSpan = styleProps.height ? Math.ceil(styleProps.height + gap) : 0;
    return {
      gridRowEnd: `span ${rowSpan}`,
      paddingBottom: gap - 1,
    };
  };
  styles = { ...styles, ...handleBreakpoints({ theme }, spacingValues, styleFromPropValue) };

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

  const { spacing = 1 } = React.useContext(MasonryContext);
  const { children, className, component = 'div', columnSpan = 1, height, ...other } = props;
  const [styleProps, setStyleProps] = React.useState({
    ...props,
    spacing,
    columnSpan,
    height: height < 0 ? 0 : height, // MasonryItems to which negative or zero height is passed will be hidden
  });

  const classes = useUtilityClasses(styleProps);

  // If height is passed by user, ResizeObserver is not used.
  const resizeObserver = React.useRef(
    height === undefined
      ? new ResizeObserver(([item]) => {
          setStyleProps({
            ...styleProps,
            height: item.contentRect.height,
          });
        })
      : null,
  );

  React.useEffect(() => {
    if (resizeObserver?.current && masonryItemRef?.current) {
      const observer = resizeObserver.current;
      const item = masonryItemRef.current.firstChild;
      observer.observe(item);
      return () => {
        observer.unobserve(item);
      };
    }
    return true;
  }, []);

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
   * The content of the component, normally an `<img />` or a `<div />`. It should be only one element.
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
   * @default undefined
   */
  height: PropTypes.number,
  /**
   * Allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.object,
};

export default MasonryItem;
