import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { unstable_composeClasses as composeClasses } from '@material-ui/unstyled';
import experimentalStyled from '../styles/experimentalStyled';
import capitalize from '../utils/capitalize';
import { isHorizontal } from '../Drawer/Drawer';
import { generateUtilityClass } from '@material-ui/unstyled';

export function getSwipeAreaUtilityClass(slot) {
  return generateUtilityClass('MuiSwipeableDrawer', slot);
}

const SwipeAreaRoot = experimentalStyled(
  'span',
  {},
  {
    name: 'PrivateSwipeArea',
    slot: 'Root',
  },
)(({ theme, styleProps }) => ({
  position: 'fixed',
  top: 0,
  left: 0,
  bottom: 0,
  zIndex: theme.zIndex.drawer - 1,
  ...(styleProps.anchor === 'left' && {
    right: 'auto',
  }),
  ...(styleProps.anchor === 'right' && {
    left: 'auto',
    right: 0,
  }),
  ...(styleProps.anchor === 'top' && {
    bottom: 'auto',
    right: 0,
  }),
  ...(styleProps.anchor === 'bottom' && {
    top: 'auto',
    bottom: 0,
    right: 0,
  }),
}));

const useUtilityClasses = (styleProps) => {
  const { classes, anchor } = styleProps;

  const slots = {
    root: ['root', anchor && `anchor${capitalize(anchor)}`],
  };

  return composeClasses(slots, getSwipeAreaUtilityClass, classes);
};

/**
 * @ignore - internal component.
 */
const SwipeArea = React.forwardRef(function SwipeArea(props, ref) {
  const { anchor, className, width, ...other } = props;

  const styleProps = props;

  const classes = useUtilityClasses(styleProps);

  return (
    <SwipeAreaRoot
      className={clsx(classes.root, className)}
      ref={ref}
      style={{
        [isHorizontal(anchor) ? 'width' : 'height']: width,
      }}
      styleProps={styleProps}
      {...other}
    />
  );
});

SwipeArea.propTypes = {
  /**
   * Side on which to attach the discovery area.
   */
  anchor: PropTypes.oneOf(['left', 'top', 'right', 'bottom']).isRequired,
  /**
   * @ignore
   */
  classes: PropTypes.object,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * The width of the left most (or right most) area in `px` where the
   * drawer can be swiped open from.
   */
  width: PropTypes.number.isRequired,
};

export default SwipeArea;
