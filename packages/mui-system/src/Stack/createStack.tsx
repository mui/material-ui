import * as React from 'react';
import PropTypes from 'prop-types';
import { OverridableComponent } from '@mui/types';
import {
  deepmerge,
  unstable_composeClasses as composeClasses,
  unstable_generateUtilityClass as generateUtilityClass,
} from '@mui/utils';
import systemStyled from '../styled';
import useThemePropsSystem from '../useThemeProps';
import { extendSxProp } from '../styleFunctionSx';
import createTheme from '../createTheme';
import { CreateMUIStyled } from '../createStyled';
import { StackTypeMap, StackOwnerState } from './StackProps';
import type { Breakpoint } from '../createTheme';
import { Breakpoints } from '../createTheme/createBreakpoints';
import {
  handleBreakpoints,
  mergeBreakpointsInOrder,
  resolveBreakpointValues,
} from '../breakpoints';
import { createUnarySpacing, getValue } from '../spacing';
import { Spacing } from '../createTheme/createSpacing';

const defaultTheme = createTheme();

interface StyleFunctionProps {
  theme: { breakpoints: Breakpoints; spacing: Spacing };
  ownerState: StackOwnerState;
}

// widening Theme to any so that the consumer can own the theme structure.
const defaultCreateStyledComponent = (systemStyled as CreateMUIStyled<any>)('div', {
  name: 'MuiStack',
  slot: 'Root',
  overridesResolver: (props, styles) => styles.root,
});

function useThemePropsDefault<T>(props: T) {
  return useThemePropsSystem({
    props,
    name: 'MuiStack',
    defaultTheme,
  });
}

/**
 * Return an array with the separator React element interspersed between
 * each React node of the input children.
 *
 * > joinChildren([1,2,3], 0)
 * [1,0,2,0,3]
 */
function joinChildren(children: React.ReactNode, separator: React.ReactElement) {
  const childrenArray = React.Children.toArray(children).filter(Boolean);

  return childrenArray.reduce<React.ReactNode[]>((output, child, index) => {
    output.push(child);

    if (index < childrenArray.length - 1) {
      output.push(React.cloneElement(separator, { key: `separator-${index}` }));
    }

    return output;
  }, []);
}

const getSideFromDirection = (direction: StackOwnerState['direction']) => {
  return {
    row: 'Left',
    'row-reverse': 'Right',
    column: 'Top',
    'column-reverse': 'Bottom',
    // @ts-ignore
  }[direction];
};

export const style = ({ ownerState, theme }: StyleFunctionProps) => {
  let styles = {
    display: 'flex',
    flexDirection: 'column',
    ...handleBreakpoints(
      { theme },
      // @ts-ignore TODO: add types for resolveBreakpointValues
      resolveBreakpointValues({
        values: ownerState.direction,
        breakpoints: theme.breakpoints.values,
      }),
      (propValue: string) => ({
        flexDirection: propValue,
      }),
    ),
  };

  if (ownerState.spacing) {
    const transformer = createUnarySpacing(theme);

    const base = Object.keys(theme.breakpoints.values).reduce((acc, breakpoint) => {
      if (
        // @ts-ignore
        (typeof ownerState.spacing === 'object' && ownerState.spacing[breakpoint] != null) ||
        // @ts-ignore
        (typeof ownerState.direction === 'object' && ownerState.direction[breakpoint] != null)
      ) {
        // @ts-ignore
        acc[breakpoint] = true;
      }
      return acc;
    }, {});

    // @ts-ignore TODO: add types for resolveBreakpointValues
    const directionValues = resolveBreakpointValues({
      values: ownerState.direction,
      base,
    });

    // @ts-ignore TODO: add types for resolveBreakpointValues
    const spacingValues = resolveBreakpointValues({
      values: ownerState.spacing,
      base,
    });

    if (typeof directionValues === 'object') {
      Object.keys(directionValues).forEach((breakpoint, index, breakpoints) => {
        const directionValue = directionValues[breakpoint];
        if (!directionValue) {
          const previousDirectionValue =
            index > 0 ? directionValues[breakpoints[index - 1]] : 'column';
          directionValues[breakpoint] = previousDirectionValue;
        }
      });
    }

    const styleFromPropValue = (propValue: string | number | null, breakpoint: Breakpoint) => {
      return {
        '& > :not(style) + :not(style)': {
          margin: 0,
          [`margin${getSideFromDirection(
            breakpoint ? directionValues[breakpoint] : ownerState.direction,
          )}`]: getValue(transformer, propValue),
        },
      };
    };
    styles = deepmerge(styles, handleBreakpoints({ theme }, spacingValues, styleFromPropValue));
  }

  styles = mergeBreakpointsInOrder(theme.breakpoints, styles);

  return styles;
};

export default function createStack(
  options: {
    createStyledComponent?: typeof defaultCreateStyledComponent;
    useThemeProps?: typeof useThemePropsDefault;
    componentName?: string;
  } = {},
) {
  const {
    // This will allow adding custom styled fn (for example for custom sx style function)
    createStyledComponent = defaultCreateStyledComponent,
    useThemeProps = useThemePropsDefault,
    componentName = 'MuiStack',
  } = options;

  // TODO: Why the Stack in Material UI didn't have any utility classes?
  const useUtilityClasses = (ownerState: StackOwnerState, theme: typeof defaultTheme) => {
    const slots = {
      root: ['root'],
    };

    return composeClasses(slots, (slot) => generateUtilityClass(componentName, slot), {});
  };

  const StackRoot = createStyledComponent<{
    ownerState: StackOwnerState;
  }>(style);

  const Stack = React.forwardRef(function Grid(inProps, ref) {
    const themeProps = useThemeProps<typeof inProps & { component?: React.ElementType }>(inProps);
    const props = extendSxProp(themeProps);
    const {
      component = 'div',
      direction = 'column',
      spacing = 0,
      divider,
      children,
      ...other
    } = props;

    const ownerState = {
      direction,
      spacing,
    };

    return (
      // @ts-ignore ref type mismatch
      <StackRoot as={component} ownerState={ownerState} ref={ref} {...other}>
        {divider ? joinChildren(children, divider as React.ReactElement) : children}
      </StackRoot>
    );
  }) as OverridableComponent<StackTypeMap>;

  Stack.propTypes /* remove-proptypes */ = {
    children: PropTypes.node,
    direction: PropTypes.oneOfType([
      PropTypes.oneOf(['column-reverse', 'column', 'row-reverse', 'row']),
      PropTypes.arrayOf(PropTypes.oneOf(['column-reverse', 'column', 'row-reverse', 'row'])),
      PropTypes.object,
    ]),
    divider: PropTypes.node,
    spacing: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.number, PropTypes.string])),
      PropTypes.number,
      PropTypes.object,
      PropTypes.string,
    ]),
    sx: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])),
      PropTypes.func,
      PropTypes.object,
    ]),
  };

  return Stack;
}
