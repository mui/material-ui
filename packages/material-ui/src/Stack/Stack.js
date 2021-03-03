import * as React from 'react';
import PropTypes from 'prop-types';
import {
  createUnaryUnit,
  handleBreakpoints,
  unstable_extendSxProp as extendSxProp,
} from '@material-ui/system';
import { getValue } from '@material-ui/system/spacing';
import experimentalStyled from '../styles/experimentalStyled';
import useThemeProps from '../styles/useThemeProps';

const getSideFromDirection = (direction) => (direction === 'row' ? 'Left' : 'Top');

const StackRoot = experimentalStyled(
  'div',
  {},
  { name: 'Stack' },
)(({ styleProps, theme }) => {
  let styles = {
    display: 'flex',
    flexDirection: styleProps.direction,
  };

  if (styleProps.spacing) {
    const transformer = createUnaryUnit(theme, 'spacing', 8, 'spacing');
    const styleFromPropValue = (propValue) => ({
      '& > :not(styles) + :not(styles)': {
        [`margin${getSideFromDirection(styleProps.direction)}`]: getValue(transformer, propValue),
      },
    });

    styles = {
      ...styles,
      ...handleBreakpoints({ theme }, styleProps.spacing, styleFromPropValue),
    };
  }
  return styles;
});

const Stack = React.forwardRef(function Stack(inProps, ref) {
  const themeProps = useThemeProps({ props: inProps, name: 'MuiStack' });
  const props = extendSxProp(themeProps);
  const { direction = 'column', spacing, ...other } = props;
  const styleProps = {
    direction,
    spacing,
  };

  return <StackRoot styleProps={styleProps} ref={ref} {...other} />;
});

Stack.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------
  /**
   * @ignore
   */
  children: PropTypes.node,
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: PropTypes.elementType,
  /**
   * @ignore
   */
  direction: PropTypes.oneOf(['column', 'row']),
  /**
   * @ignore
   */
  spacing: PropTypes.number,
  /**
   * @ignore
   */
  sx: PropTypes.object,
};

export default Stack;
