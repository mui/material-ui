import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { unstable_composeClasses as composeClasses } from '@mui/base';
import styled from '../styles/styled';
import useThemeProps from '../styles/useThemeProps';
import AddIcon from '../internal/svg-icons/Add';
import speedDialIconClasses, { getSpeedDialIconUtilityClass } from './speedDialIconClasses';

const useUtilityClasses = (ownerState) => {
  const { classes, open, openIcon } = ownerState;

  const slots = {
    root: ['root'],
    icon: ['icon', open && 'iconOpen', openIcon && open && 'iconWithOpenIconOpen'],
    openIcon: ['openIcon', open && 'openIconOpen'],
  };

  return composeClasses(slots, getSpeedDialIconUtilityClass, classes);
};

const SpeedDialIconRoot = styled('span', {
  name: 'MuiSpeedDialIcon',
  slot: 'Root',
  overridesResolver: (props, styles) => {
    const { ownerState } = props;

    return [
      { [`& .${speedDialIconClasses.icon}`]: styles.icon },
      { [`& .${speedDialIconClasses.icon}`]: ownerState.open && styles.iconOpen },
      {
        [`& .${speedDialIconClasses.icon}`]:
          ownerState.open && ownerState.openIcon && styles.iconWithOpenIconOpen,
      },
      { [`& .${speedDialIconClasses.openIcon}`]: styles.openIcon },
      { [`& .${speedDialIconClasses.openIcon}`]: ownerState.open && styles.openIconOpen },
      styles.root,
    ];
  },
})(({ theme, ownerState }) => ({
  height: 24,
  [`& .${speedDialIconClasses.icon}`]: {
    transition: theme.transitions.create(['transform', 'opacity'], {
      duration: theme.transitions.duration.short,
    }),
    ...(ownerState.open && {
      transform: 'rotate(45deg)',
      ...(ownerState.openIcon && {
        opacity: 0,
      }),
    }),
  },
  [`& .${speedDialIconClasses.openIcon}`]: {
    position: 'absolute',
    transition: theme.transitions.create(['transform', 'opacity'], {
      duration: theme.transitions.duration.short,
    }),
    opacity: 0,
    transform: 'rotate(-45deg)',
    ...(ownerState.open && {
      transform: 'rotate(0deg)',
      opacity: 1,
    }),
  },
}));

const SpeedDialIcon = React.forwardRef(function SpeedDialIcon(inProps, ref) {
  const props = useThemeProps({ props: inProps, name: 'MuiSpeedDialIcon' });
  const { className, icon: iconProp, open, openIcon: openIconProp, ...other } = props;

  const ownerState = props;
  const classes = useUtilityClasses(ownerState);

  function formatIcon(icon, newClassName) {
    if (React.isValidElement(icon)) {
      return React.cloneElement(icon, { className: newClassName });
    }

    return icon;
  }

  return (
    <SpeedDialIconRoot
      className={clsx(classes.root, className)}
      ref={ref}
      ownerState={ownerState}
      {...other}
    >
      {openIconProp ? formatIcon(openIconProp, classes.openIcon) : null}
      {iconProp ? formatIcon(iconProp, classes.icon) : <AddIcon className={classes.icon} />}
    </SpeedDialIconRoot>
  );
});

SpeedDialIcon.propTypes /* remove-proptypes */ = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------
  /**
   * Override or extend the styles applied to the component.
   */
  classes: PropTypes.object,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * The icon to display.
   */
  icon: PropTypes.node,
  /**
   * @ignore
   * If `true`, the component is shown.
   */
  open: PropTypes.bool,
  /**
   * The icon to display in the SpeedDial Floating Action Button when the SpeedDial is open.
   */
  openIcon: PropTypes.node,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])),
    PropTypes.func,
    PropTypes.object,
  ]),
};

SpeedDialIcon.muiName = 'SpeedDialIcon';

export default SpeedDialIcon;
