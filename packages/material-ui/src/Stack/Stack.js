import * as React from 'react';
import PropTypes from 'prop-types';
import {
  createUnarySpacing,
  handleBreakpoints,
  unstable_extendSxProp as extendSxProp,
} from '@material-ui/system';
import { deepmerge } from '@material-ui/utils';
import { getValue } from '@material-ui/system/spacing';
import experimentalStyled from '../styles/experimentalStyled';
import useThemeProps from '../styles/useThemeProps';

const getSideFromDirection = (direction) => {
  switch (direction) {
    case 'row':
      return 'Left';
    case 'row-reverse':
      return 'Right';
    case 'column':
      return 'Top';
    case 'column-reverse':
      return 'Bottom';
  }
};

const StackRoot = experimentalStyled(
  'div',
  {},
  { name: 'Stack' },
)(({ styleProps, theme }) => {
  let styles = {
    display: 'flex',
    ...handleBreakpoints({ theme }, styleProps.direction, (propValue) => ({
      flexDirection: propValue,
    })),
  };

  if (styleProps.spacing) {
    const transformer = createUnarySpacing(theme);
    const styleFromPropValue = (propValue, breakpoint) => {
      const direction = styles[breakpoint]?.flexDirection || styleProps.direction;
      return {
        '& > :not(styles) + :not(styles)': {
          margin: 0,
          [`margin${getSideFromDirection(direction)}`]: getValue(transformer, propValue),
        },
      };
    };
    styles = deepmerge(
      styles,
      handleBreakpoints({ theme }, styleProps.spacing, styleFromPropValue),
    );
  }

  return styles;
});

const Stack = React.forwardRef(function Stack(inProps, ref) {
  const themeProps = useThemeProps({ props: inProps, name: 'MuiStack' });
  const props = extendSxProp(themeProps);
  const { direction = 'column', spacing, divider, children, ...other } = props;
  const lastChildIndex = React.Children.count(children) - 1;
  const styleProps = {
    direction,
    spacing,
  };

  return (
    <StackRoot styleProps={styleProps} ref={ref} {...other}>
      {divider
        ? React.Children.toArray(children).reduce(
            (result, child, index) =>
              index < lastChildIndex
                ? result.concat([child, React.cloneElement(divider, { key: index + '-divider' })])
                : result.concat(child),
            [],
          )
        : children}
    </StackRoot>
  );
});

Stack.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------
  /**
   * The content of the component.
   */
  children: PropTypes.node,
  /**
   * Defines the `flex-direction` style property.
   * It is applied for all screen sizes.
   * @default 'column'
   */
  direction: PropTypes.oneOfType([
    PropTypes.oneOf(['column', 'row']),
    PropTypes.arrayOf(PropTypes.oneOf(['column', 'row'])),
    PropTypes.object,
  ]),
  /**
   * Add an element between each child.
   */
  divider: PropTypes.node,
  /**
   * Defines the space between immediate children.
   */
  spacing: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.number),
    PropTypes.number,
    PropTypes.object,
  ]),
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.object,
};

export default Stack;
