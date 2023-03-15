/* eslint-disable jsx-a11y/aria-role */
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { unstable_composeClasses as composeClasses, useSlotProps } from '@mui/base';
import KeyboardArrowLeft from '../internal/svg-icons/KeyboardArrowLeft';
import KeyboardArrowRight from '../internal/svg-icons/KeyboardArrowRight';
import ButtonBase from '../ButtonBase';
import useTheme from '../styles/useTheme';
import useThemeProps from '../styles/useThemeProps';
import styled from '../styles/styled';
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
  const {
    className,
    slots = {},
    slotProps = {},
    direction,
    orientation,
    disabled,
    ...other
  } = props;

  const theme = useTheme();
  const isRtl = theme.direction === 'rtl';

  const ownerState = { isRtl, ...props };

  const classes = useUtilityClasses(ownerState);

  const StartButtonIcon = slots.StartScrollButtonIcon ?? KeyboardArrowLeft;
  const EndButtonIcon = slots.EndScrollButtonIcon ?? KeyboardArrowRight;

  const startButtonIconProps = useSlotProps({
    elementType: StartButtonIcon,
    externalSlotProps: slotProps.startScrollButtonIcon,
    additionalProps: {
      fontSize: 'small',
    },
    ownerState,
  });

  const endButtonIconProps = useSlotProps({
    elementType: EndButtonIcon,
    externalSlotProps: slotProps.endScrollButtonIcon,
    additionalProps: {
      fontSize: 'small',
    },
    ownerState,
  });

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
        <StartButtonIcon {...startButtonIconProps} />
      ) : (
        <EndButtonIcon {...endButtonIconProps} />
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
   * @default false
   */
  disabled: PropTypes.bool,
  /**
   * The component orientation (layout flow direction).
   */
  orientation: PropTypes.oneOf(['horizontal', 'vertical']).isRequired,
  /**
   * The extra props for the slot components.
   * You can override the existing props or add new ones.
   * @default {}
   */
  slotProps: PropTypes.shape({
    endScrollButtonIcon: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    startScrollButtonIcon: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  }),
  /**
   * The components used for each slot inside.
   * @default {}
   */
  slots: PropTypes.shape({
    EndScrollButtonIcon: PropTypes.elementType,
    StartScrollButtonIcon: PropTypes.elementType,
  }),
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
