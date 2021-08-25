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
import { getMasonryUtilityClass } from './masonryClasses';
import MasonryContext from './MasonryContext';

const useUtilityClasses = (ownerState) => {
  const { classes } = ownerState;

  const slots = {
    root: ['root'],
  };

  return composeClasses(slots, getMasonryUtilityClass, classes);
};

export const style = ({ ownerState, theme }) => {
  let styles = {
    display: 'grid',
    gridAutoRows: 0,
    padding: 0,
    overflow: 'auto',
    width: '100%',
    rowGap: 2,
    boxSizing: 'border-box',
  };

  const base = {};
  Object.keys(theme.breakpoints.values).forEach((breakpoint) => {
    if (ownerState.spacing[breakpoint] != null) {
      base[breakpoint] = true;
    }
  });

  const spacingValues = resolveBreakpointValues({ values: ownerState.spacing, base });
  const transformer = createUnarySpacing(theme);
  const spacingStyleFromPropValue = (propValue) => {
    return {
      columnGap: getValue(transformer, propValue),
    };
  };

  styles = {
    ...styles,
    ...handleBreakpoints({ theme }, spacingValues, spacingStyleFromPropValue),
  };

  const columnValues = resolveBreakpointValues({ values: ownerState.columns, base });
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

  const masonryRef = React.useRef();
  const { children, className, component = 'div', columns = 4, spacing = 1, ...other } = props;
  const ownerState = { ...props, spacing, columns };
  const classes = useUtilityClasses(ownerState);

  const contextValue = React.useMemo(() => ({ spacing }), [spacing]);
  let didWarn = false;
  React.useEffect(() => {
    // scroller always appears when masonry's height goes beyond 2,000px on Chrome
    const handleScroll = () => {
      if (masonryRef.current.clientHeight === 1998 && !didWarn) {
        console.warn(
          [
            'Material-UI: The Masonry can have the maximum height of 2,000px on Chrome browser.',
            'Items that go beyond this height fail to be rendered on Chrome browser.',
            'You can find more in this open issue: https://github.com/mui-org/material-ui/issues/27934',
          ].join('\n'),
        );

        // eslint-disable-next-line react-hooks/exhaustive-deps
        didWarn = true;
      }
    };
    const container = masonryRef.current;
    container.addEventListener('scroll', handleScroll);
    return () => {
      container.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleRef = useForkRef(ref, masonryRef);
  return (
    <MasonryContext.Provider value={contextValue}>
      <MasonryRoot
        as={component}
        className={clsx(classes.root, className)}
        ref={handleRef}
        ownerState={ownerState}
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
   * The content of the component. It's recommended to be `<MasonryItem />`s.
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
