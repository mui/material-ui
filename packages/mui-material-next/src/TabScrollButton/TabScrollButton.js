/* eslint-disable jsx-a11y/aria-role */
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { unstable_composeClasses as composeClasses } from '@mui/base';
import KeyboardArrowLeft from '@mui/material/internal/svg-icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/material/internal/svg-icons/KeyboardArrowRight';
// TODO: use useButton hook here
import ButtonBase from '@mui/material/ButtonBase';
import { styled, useTheme, useThemeProps } from '@mui/material/styles';
import tabScrollButtonClasses, { getTabScrollButtonUtilityClass } from './tabScrollButtonClasses';

const useUtilityClasses = (ownerState) => {
  const { classes, orientation, disabled } = ownerState;

  const slots = {
    root: ['root', orientation, disabled && 'disabled'],
  };

  return composeClasses(slots, getTabScrollButtonUtilityClass, classes);
};

const TabScrollButtonRoot = styled(ButtonBase, {
  name: 'MuiTabScrollButton',
  slot: 'Root',
  overridesResolver: (props, styles) => {
    const { ownerState } = props;

    return [styles.root, ownerState.orientation && styles[ownerState.orientation]];
  },
})(({ ownerState }) => ({
  width: 40,
  flexShrink: 0,
  opacity: 0.8,
  [`&.${tabScrollButtonClasses.disabled}`]: {
    opacity: 0,
  },
  ...(ownerState.orientation === 'vertical' && {
    width: '100%',
    height: 40,
    '& svg': {
      transform: `rotate(${ownerState.isRtl ? -90 : 90}deg)`,
    },
  }),
}));

const TabScrollButton = React.forwardRef(function TabScrollButton(inProps, ref) {
  const props = useThemeProps({ props: inProps, name: 'MuiTabScrollButton' });
  const { className, direction, orientation, disabled, ...other } = props;

  const theme = useTheme();
  const isRtl = theme.direction === 'rtl';

  const ownerState = { isRtl, ...props };

  const classes = useUtilityClasses(ownerState);

  return (
    <TabScrollButtonRoot
      component="div"
      className={clsx(classes.root, className)}
      ref={ref}
      role={null}
      ownerState={ownerState}
      tabIndex={null}
      {...other}
    >
      {direction === 'left' ? (
        <KeyboardArrowLeft fontSize="small" />
      ) : (
        <KeyboardArrowRight fontSize="small" />
      )}
    </TabScrollButtonRoot>
  );
});

TabScrollButton.propTypes /* remove-proptypes */ = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------
  /**
   * The content of the component.
   */
  children: PropTypes.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: PropTypes.object,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * The direction the button should indicate.
   */
  direction: PropTypes.oneOf(['left', 'right']).isRequired,
  /**
   * If `true`, the component is disabled.
   */
  disabled: PropTypes.bool,
  /**
   * The component orientation (layout flow direction).
   */
  orientation: PropTypes.oneOf(['horizontal', 'vertical']).isRequired,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])),
    PropTypes.func,
    PropTypes.object,
  ]),
};

export default TabScrollButton;
