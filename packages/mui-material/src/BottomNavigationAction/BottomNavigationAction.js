'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import composeClasses from '@mui/utils/composeClasses';
import { styled } from '../zero-styled';
import memoTheme from '../utils/memoTheme';
import { useDefaultProps } from '../DefaultPropsProvider';
import ButtonBase from '../ButtonBase';
import unsupportedProp from '../utils/unsupportedProp';
import bottomNavigationActionClasses, {
  getBottomNavigationActionUtilityClass,
} from './bottomNavigationActionClasses';

const useUtilityClasses = (ownerState) => {
  const { classes, showLabel, selected } = ownerState;

  const slots = {
    root: ['root', !showLabel && !selected && 'iconOnly', selected && 'selected'],
    label: ['label', !showLabel && !selected && 'iconOnly', selected && 'selected'],
  };

  return composeClasses(slots, getBottomNavigationActionUtilityClass, classes);
};

const BottomNavigationActionRoot = styled(ButtonBase, {
  name: 'MuiBottomNavigationAction',
  slot: 'Root',
  overridesResolver: (props, styles) => {
    const { ownerState } = props;

    return [styles.root, !ownerState.showLabel && !ownerState.selected && styles.iconOnly];
  },
})(
  memoTheme(({ theme }) => ({
    transition: theme.transitions.create(['color', 'padding-top'], {
      duration: theme.transitions.duration.short,
    }),
    padding: '0px 12px',
    minWidth: 80,
    maxWidth: 168,
    color: (theme.vars || theme).palette.text.secondary,
    flexDirection: 'column',
    flex: '1',
    [`&.${bottomNavigationActionClasses.selected}`]: {
      color: (theme.vars || theme).palette.primary.main,
    },
    variants: [
      {
        props: ({ showLabel, selected }) => !showLabel && !selected,
        style: {
          paddingTop: 14,
        },
      },
      {
        props: ({ showLabel, selected, label }) => !showLabel && !selected && !label,
        style: {
          paddingTop: 0,
        },
      },
    ],
  })),
);

const BottomNavigationActionLabel = styled('span', {
  name: 'MuiBottomNavigationAction',
  slot: 'Label',
  overridesResolver: (props, styles) => styles.label,
})(
  memoTheme(({ theme }) => ({
    fontFamily: theme.typography.fontFamily,
    fontSize: theme.typography.pxToRem(12),
    opacity: 1,
    transition: 'font-size 0.2s, opacity 0.2s',
    transitionDelay: '0.1s',
    [`&.${bottomNavigationActionClasses.selected}`]: {
      fontSize: theme.typography.pxToRem(14),
    },
    variants: [
      {
        props: ({ showLabel, selected }) => !showLabel && !selected,
        style: {
          opacity: 0,
          transitionDelay: '0s',
        },
      },
    ],
  })),
);

const BottomNavigationAction = React.forwardRef(function BottomNavigationAction(inProps, ref) {
  const props = useDefaultProps({ props: inProps, name: 'MuiBottomNavigationAction' });
  const {
    className,
    icon,
    label,
    onChange,
    onClick,
    // eslint-disable-next-line react/prop-types -- private, always overridden by BottomNavigation
    selected,
    showLabel,
    value,
    ...other
  } = props;

  const ownerState = props;
  const classes = useUtilityClasses(ownerState);

  const handleChange = (event) => {
    if (onChange) {
      onChange(event, value);
    }

    if (onClick) {
      onClick(event);
    }
  };

  return (
    <BottomNavigationActionRoot
      ref={ref}
      className={clsx(classes.root, className)}
      focusRipple
      onClick={handleChange}
      ownerState={ownerState}
      {...other}
    >
      {icon}
      <BottomNavigationActionLabel className={classes.label} ownerState={ownerState}>
        {label}
      </BottomNavigationActionLabel>
    </BottomNavigationActionRoot>
  );
});

BottomNavigationAction.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * This prop isn't supported.
   * Use the `component` prop if you need to change the children structure.
   */
  children: unsupportedProp,
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
   * The label element.
   */
  label: PropTypes.node,
  /**
   * @ignore
   */
  onChange: PropTypes.func,
  /**
   * @ignore
   */
  onClick: PropTypes.func,
  /**
   * If `true`, the `BottomNavigationAction` will show its label.
   * By default, only the selected `BottomNavigationAction`
   * inside `BottomNavigation` will show its label.
   *
   * The prop defaults to the value (`false`) inherited from the parent BottomNavigation component.
   */
  showLabel: PropTypes.bool,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])),
    PropTypes.func,
    PropTypes.object,
  ]),
  /**
   * You can provide your own value. Otherwise, we fallback to the child position index.
   */
  value: PropTypes.any,
};

export default BottomNavigationAction;
