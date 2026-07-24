'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import composeClasses from '@mui/utils/composeClasses';
import { Menu as BaseMenu } from '@base-ui/react/menu';
import { SxProps } from '@mui/system';
import { Theme } from '../styles';
import { styled } from '../zero-styled';
import { useDefaultProps } from '../DefaultPropsProvider';
import { menu2IndicatorStyles } from '../Unstable_Menu2/menu2SharedStyles';
import {
  getMenu2RootRender,
  Menu2RootSlotProps,
  resolveSlotProps,
} from '../Unstable_Menu2/menu2Utils';
import {
  getMenu2RadioItemIndicatorUtilityClass,
  Menu2RadioItemIndicatorClasses,
} from '../Unstable_Menu2/menu2Classes';

export interface Menu2RadioItemIndicatorSlots {
  /**
   * The component that renders the root.
   * @default 'span'
   */
  root?: React.ElementType | undefined;
}

export interface Menu2RadioItemIndicatorSlotProps extends Menu2RootSlotProps<Menu2RadioItemIndicatorProps> {}

export interface Menu2RadioItemIndicatorProps extends Omit<
  BaseMenu.RadioItemIndicator.Props,
  'className' | 'render' | 'style'
> {
  /**
   * The component used for the root node.
   */
  component?: React.ElementType | undefined;
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: Partial<Menu2RadioItemIndicatorClasses> | undefined;
  /**
   * CSS class applied to the element.
   */
  className?: string | undefined;
  /**
   * Whether to keep the HTML element in the DOM when the radio item is inactive.
   * @default false
   */
  keepMounted?: boolean | undefined;
  /**
   * The components used for each slot inside.
   */
  slots?: Menu2RadioItemIndicatorSlots | undefined;
  /**
   * The props used for each slot inside.
   */
  slotProps?: Menu2RadioItemIndicatorSlotProps | undefined;
  /**
   * Styles applied to the root element.
   */
  style?: React.CSSProperties | undefined;
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx?: SxProps<Theme> | undefined;
}

const useUtilityClasses = (ownerState: Menu2RadioItemIndicatorProps) => {
  const { classes } = ownerState;

  const slots = {
    root: ['root'],
    checked: ['checked'],
    disabled: ['disabled'],
    highlighted: ['highlighted'],
  };

  return {
    ...classes,
    ...composeClasses(slots, getMenu2RadioItemIndicatorUtilityClass, classes),
  };
};

const Menu2RadioItemIndicatorRoot = styled('span', {
  name: 'MuiMenu2RadioItemIndicator',
  slot: 'Root',
  overridesResolver: (props, styles) => styles.root,
})(menu2IndicatorStyles) as any;

function DefaultRadioIndicatorIcon() {
  return (
    <svg aria-hidden="true" data-mui-menu2-indicator-icon="" focusable="false" viewBox="0 0 24 24">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z" />
      <path
        data-mui-menu2-indicator-mark=""
        d="M8.465 8.465C9.37 7.56 10.62 7 12 7C14.76 7 17 9.24 17 12C17 13.38 16.44 14.63 15.535 15.535C14.63 16.44 13.38 17 12 17C9.24 17 7 14.76 7 12C7 10.62 7.56 9.37 8.465 8.465Z"
      />
    </svg>
  );
}

/**
 *
 * Demos:
 *
 * - [Menu](https://mui.com/material-ui/react-menu/)
 */
const Menu2RadioItemIndicator = React.forwardRef(function Menu2RadioItemIndicator(
  inProps: Menu2RadioItemIndicatorProps,
  ref: React.ForwardedRef<HTMLSpanElement>,
) {
  const props = useDefaultProps({
    props: inProps,
    name: 'MuiMenu2RadioItemIndicator',
  });

  const {
    children,
    className,
    classes: classesProp,
    component,
    slotProps,
    slots,
    sx,
    style,
    ...other
  } = props;
  const ownerState = {
    ...props,
    classes: classesProp,
  };
  const classes = useUtilityClasses(ownerState);

  return (
    <BaseMenu.RadioItemIndicator
      ref={ref}
      render={getMenu2RootRender(slots?.root ?? Menu2RadioItemIndicatorRoot, ownerState, {
        ...resolveSlotProps(slotProps?.root, ownerState),
        as: component,
        ownerState,
        sx,
      })}
      className={(state) =>
        clsx(
          className,
          classes.root,
          state.checked && classes.checked,
          state.disabled && classes.disabled,
          state.highlighted && classes.highlighted,
        )
      }
      style={style}
      {...other}
    >
      {children ?? <DefaultRadioIndicatorIcon />}
    </BaseMenu.RadioItemIndicator>
  );
});

Menu2RadioItemIndicator.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * @ignore
   */
  children: PropTypes.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: PropTypes.object,
  /**
   * CSS class applied to the element.
   */
  className: PropTypes.string,
  /**
   * The component used for the root node.
   */
  component: PropTypes.elementType,
  /**
   * Whether to keep the HTML element in the DOM when the radio item is inactive.
   * @default false
   */
  keepMounted: PropTypes.bool,
  /**
   * The props used for each slot inside.
   */
  slotProps: PropTypes.shape({
    root: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  }),
  /**
   * The components used for each slot inside.
   */
  slots: PropTypes.shape({
    root: PropTypes.elementType,
  }),
  /**
   * Styles applied to the root element.
   */
  style: PropTypes.object,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])),
    PropTypes.func,
    PropTypes.object,
  ]),
} as any;

export default Menu2RadioItemIndicator;
