import * as React from 'react';
import PropTypes from 'prop-types';
import { unstable_extendSxProp as extendSxProp } from '@material-ui/system';
import experimentalStyled from '../styles/experimentalStyled';
import useThemeProps from '../styles/useThemeProps';

const getSideFromDirection = (direction) => (direction === 'row' ? 'Left' : 'Top');

const StackRoot = experimentalStyled(
  'div',
  {},
  { name: 'Stack' },
)(({ styleProps: { direction, spacing } }) => ({
  display: 'flex',
  flexDirection: direction,
  '& > * + *': {
    [`margin${getSideFromDirection(direction)}`]: spacing,
  },
}));

const Stack = React.forwardRef((inProps, ref) => {
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
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.func,
    PropTypes.number,
    PropTypes.object,
    PropTypes.shape({
      '__@iterator': PropTypes.func.isRequired,
      '__@unscopables': PropTypes.func.isRequired,
      concat: PropTypes.func.isRequired,
      copyWithin: PropTypes.func.isRequired,
      entries: PropTypes.func.isRequired,
      every: PropTypes.func.isRequired,
      fill: PropTypes.func.isRequired,
      filter: PropTypes.func.isRequired,
      find: PropTypes.func.isRequired,
      findIndex: PropTypes.func.isRequired,
      forEach: PropTypes.func.isRequired,
      includes: PropTypes.func.isRequired,
      indexOf: PropTypes.func.isRequired,
      join: PropTypes.func.isRequired,
      keys: PropTypes.func.isRequired,
      lastIndexOf: PropTypes.func.isRequired,
      length: PropTypes.number.isRequired,
      map: PropTypes.func.isRequired,
      pop: PropTypes.func.isRequired,
      push: PropTypes.func.isRequired,
      reduce: PropTypes.func.isRequired,
      reduceRight: PropTypes.func.isRequired,
      reverse: PropTypes.func.isRequired,
      shift: PropTypes.func.isRequired,
      slice: PropTypes.func.isRequired,
      some: PropTypes.func.isRequired,
      sort: PropTypes.func.isRequired,
      splice: PropTypes.func.isRequired,
      toLocaleString: PropTypes.func.isRequired,
      toString: PropTypes.func.isRequired,
      unshift: PropTypes.func.isRequired,
      values: PropTypes.func.isRequired,
    }),
    PropTypes.string,
    PropTypes.bool,
  ]),
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
