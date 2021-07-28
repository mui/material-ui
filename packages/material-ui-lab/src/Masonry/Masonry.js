import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  createUnarySpacing,
  getValue,
  handleBreakpoints,
  unstable_resolveBreakpointValues as resolveBreakpointValues,
} from '@material-ui/system';
import { deepmerge } from '@material-ui/utils';
import { unstable_composeClasses as composeClasses } from '@material-ui/unstyled';
import { styled, useThemeProps } from '@material-ui/core/styles';
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
  };

  const base = Object.keys(theme.breakpoints.values).reduce((acc, breakpoint) => {
    if (styleProps.spacing[breakpoint] != null) {
      acc[breakpoint] = true;
    }
    return acc;
  }, {});

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

  const columnValues = resolveBreakpointValues({ values: styleProps.columns, base });
  const columnStyleFromPropValue = (propValue) => {
    return {
      gridTemplateColumns: `repeat(${propValue}, 1fr)`,
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

  const { children, className, component = 'div', columns = 4, spacing = 1, ...other } = props;
  const styleProps = { ...props, spacing, columns };
  const classes = useUtilityClasses(styleProps);

  const masonry = React.useMemo(() => ({ spacing }), [spacing]);

  return (
    <MasonryContext.Provider value={masonry}>
      <MasonryRoot
        as={component}
        className={clsx(classes.root, className)}
        ref={ref}
        styleProps={styleProps}
        {...other}
      >
        {children}
      </MasonryRoot>
    </MasonryContext.Provider>
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
