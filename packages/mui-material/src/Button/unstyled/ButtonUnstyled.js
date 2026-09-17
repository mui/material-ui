'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import composeClasses from '@mui/utils/composeClasses';
// Imported directly rather than through `../../utils`: that barrel re-exports
// `memoTheme` and `SvgIcon`, so importing one thing from it pulls in styling.
import useId from '../../utils/useId';
import capitalize from '../../utils/capitalize';
import { getButtonUtilityClass } from '../buttonClasses';
import buttonSlots from './buttonSlots';

const slotDefs = buttonSlots.slots;

const useUtilityClasses = (ownerState, appearanceClasses) => {
  const { loading, loadingPosition, classes } = ownerState;

  const slots = {
    root: [
      'root',
      loading && 'loading',
      loading && `loadingPosition${capitalize(loadingPosition)}`,
    ],
    startIcon: ['icon', 'startIcon'],
    endIcon: ['icon', 'endIcon'],
    loadingIndicator: ['loadingIndicator'],
    loadingWrapper: ['loadingWrapper'],
  };

  // Class keys contributed by the styling layer, appended per slot.
  if (appearanceClasses) {
    Object.entries(appearanceClasses).forEach(([slotName, keys]) => {
      if (slots[slotName]) {
        slots[slotName].push(...keys);
      }
    });
  }

  const composedClasses = composeClasses(slots, getButtonUtilityClass, classes);

  return {
    ...classes, // forward the focused, disabled, etc. classes to the root slot
    ...composedClasses,
  };
};

const ButtonUnstyled = React.forwardRef(function Button(props, ref) {
  const {
    appearance,
    children,
    component = 'button',
    className,
    slots = {},
    disabled = false,
    disableFocusRipple = false,
    endIcon: endIconProp,
    focusVisibleClassName,
    id: idProp,
    loading = null,
    loadingIndicator: loadingIndicatorProp,
    loadingPosition = 'center',
    startIcon: startIconProp,
    type,
    ...other
  } = props;

  const {
    root: RootSlot = slotDefs.root.elementType,
    startIcon: StartIconSlot = slotDefs.startIcon.elementType,
    endIcon: EndIconSlot = slotDefs.endIcon.elementType,
    loadingIndicator: LoadingIndicatorWrapperSlot = slotDefs.loadingIndicator.elementType,
    loadingIconPlaceholder: LoadingIconPlaceholderSlot = slotDefs.loadingIconPlaceholder
      .elementType,
    // The spinner rendered when no `loadingIndicator` is given. Material's is a
    // CircularProgress; this layer has no opinion and renders an empty span.
    loadingSpinner: LoadingSpinnerSlot = slotDefs.loadingSpinner.elementType,
  } = slots;

  const loadingId = useId(idProp);
  const loadingIndicator = loadingIndicatorProp ?? (
    <LoadingSpinnerSlot aria-labelledby={loadingId} />
  );

  const ownerState = {
    ...props,
    component,
    disabled,
    disableFocusRipple,
    loading,
    loadingIndicator,
    loadingPosition,
    type,
    ...appearance?.ownerState,
  };

  const classes = useUtilityClasses(ownerState, appearance?.classes);

  const startIcon = (startIconProp || (loading && loadingPosition === 'start')) && (
    <StartIconSlot className={classes.startIcon} ownerState={ownerState}>
      {startIconProp || (
        <LoadingIconPlaceholderSlot
          className={classes.loadingIconPlaceholder}
          ownerState={ownerState}
        />
      )}
    </StartIconSlot>
  );

  const endIcon = (endIconProp || (loading && loadingPosition === 'end')) && (
    <EndIconSlot className={classes.endIcon} ownerState={ownerState}>
      {endIconProp || (
        <LoadingIconPlaceholderSlot
          className={classes.loadingIconPlaceholder}
          ownerState={ownerState}
        />
      )}
    </EndIconSlot>
  );

  const loader =
    typeof loading === 'boolean' ? (
      // use plain HTML span to minimize the runtime overhead
      <span className={classes.loadingWrapper} style={{ display: 'contents' }}>
        {loading && (
          <LoadingIndicatorWrapperSlot className={classes.loadingIndicator} ownerState={ownerState}>
            {loadingIndicator}
          </LoadingIndicatorWrapperSlot>
        )}
      </span>
    ) : null;

  // Don't forward the 'root' classes to the ButtonBase, as they will get duplicated with the one passed to the className prop.
  const { root, ...forwardedClasses } = classes;

  return (
    <RootSlot
      ownerState={ownerState}
      className={clsx(classes.root, className)}
      component={component}
      disabled={disabled || loading}
      focusRipple={!disableFocusRipple}
      focusVisibleClassName={clsx(classes.focusVisible, focusVisibleClassName)}
      ref={ref}
      internalNativeButton
      type={type}
      id={loading ? loadingId : idProp}
      {...other}
      classes={forwardedClasses}
    >
      {startIcon}
      {loadingPosition !== 'end' && loader}
      {children}
      {loadingPosition === 'end' && loader}
      {endIcon}
    </RootSlot>
  );
});

ButtonUnstyled.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * The content of the component.
   */
  children: PropTypes.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: PropTypes.object,
  /**
   * Contributed by the styling layer. See `createAppearance`.
   */
  appearance: PropTypes.shape({
    classes: PropTypes.objectOf(PropTypes.arrayOf(PropTypes.string)),
    ownerState: PropTypes.object,
  }),
  /**
   * Components used for each slot inside, supplied by the styling layer.
   * @default {}
   */
  slots: PropTypes.object,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * The color of the component.
   * It supports both default and custom theme colors, which can be added as shown in the
   * [palette customization guide](https://mui.com/material-ui/customization/palette/#custom-colors).
   * @default 'primary'
   */
  color: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['inherit', 'primary', 'secondary', 'success', 'error', 'info', 'warning']),
    PropTypes.string,
  ]),
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: PropTypes.elementType,
  /**
   * If `true`, the component is disabled.
   * @default false
   */
  disabled: PropTypes.bool,
  /**
   * If `true`, the  keyboard focus ripple is disabled.
   * @default false
   */
  disableFocusRipple: PropTypes.bool,
  /**
   * If `true`, the ripple effect is disabled.
   *
   * ⚠️ Without a ripple there is no styling for :focus-visible by default. Be sure
   * to highlight the element by applying separate styles with the `.Mui-focusVisible` class.
   * @default false
   */
  disableRipple: PropTypes.bool,
  /**
   * Element placed after the children.
   */
  endIcon: PropTypes.node,
  /**
   * @ignore
   */
  focusVisibleClassName: PropTypes.string,
  /**
   * The URL to link to when the button is clicked.
   * If defined, an `a` element will be used as the root node.
   */
  href: PropTypes.string,
  /**
   * @ignore
   */
  id: PropTypes.string,
  /**
   * If `true`, the loading indicator is visible and the button is disabled.
   * If `true | false`, the loading wrapper is always rendered before the children to prevent [Google Translation Crash](https://github.com/mui/material-ui/issues/27853).
   * @default null
   */
  loading: PropTypes.bool,
  /**
   * Element placed before the children if the button is in loading state.
   * The node should contain an element with `role="progressbar"` with an accessible name.
   * By default, it renders a `CircularProgress` that is labeled by the button itself.
   * @default <CircularProgress color="inherit" size={16} />
   */
  loadingIndicator: PropTypes.node,
  /**
   * The loading indicator can be positioned on the start, end, or the center of the button.
   * @default 'center'
   */
  loadingPosition: PropTypes.oneOf(['center', 'end', 'start']),
  /**
   * The size of the component.
   * `small` is equivalent to the dense button styling.
   * @default 'medium'
   */
  size: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['small', 'medium', 'large']),
    PropTypes.string,
  ]),
  /**
   * Element placed before the children.
   */
  startIcon: PropTypes.node,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])),
    PropTypes.func,
    PropTypes.object,
  ]),
  /**
   * @ignore
   */
  type: PropTypes.string,
  /**
   * The variant to use.
   * @default 'text'
   */
  variant: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['contained', 'outlined', 'text']),
    PropTypes.string,
  ]),
};

export default ButtonUnstyled;
