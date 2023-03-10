/* eslint-disable jsx-a11y/aria-role */
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { unstable_composeClasses as composeClasses } from '@mui/base';
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
    slotsProps = {},
    direction,
    orientation,
    disabled,
    ...other
  } = props;

  const theme = useTheme();
  const isRtl = theme.direction === 'rtl';

  const ownerState = { isRtl, ...props };

  const classes = useUtilityClasses(ownerState);
  const ScrollButtonStart = slots.ScrollButtonStart ?? KeyboardArrowLeft;
  const ScrollButtonEnd = slots.ScrollButtonEnd ?? KeyboardArrowRight;
  const getIconProps = (icon) => {
    switch (icon) {
      case KeyboardArrowLeft:
        return { fontSize: 'small', ...slotsProps?.scrollButtonStart };
      case KeyboardArrowRight:
        return { fontSize: 'small', ...slotsProps?.scrollButtonEnd };
      case ScrollButtonStart:
        return slotsProps?.scrollButtonStart ?? {};
      case ScrollButtonEnd:
        return slotsProps?.scrollButtonEnd ?? {};
      default:
        return {};
    }
  };

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
        <ScrollButtonStart {...getIconProps(ScrollButtonStart)} />
      ) : (
        <ScrollButtonEnd {...getIconProps(ScrollButtonEnd)} />
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
   * The components used for ScrollButtonStart, ScrollButtonEnd item type
   *
   * This prop is an alias for the `components` prop, which will be deprecated in the future.
   *
   * @default {}
   */
  slots: PropTypes.shape({
    ScrollButtonEnd: PropTypes.elementType,
    ScrollButtonStart: PropTypes.elementType,
  }),
  /**
   * The extra props for the slot components.
   * You can override the existing props or add new ones.
   *
   * This prop is an alias for the `componentsProps` prop, which will be deprecated in the future.
   *
   * @default {}
   */
  slotsProps: PropTypes.object,
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
