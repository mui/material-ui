'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import resolveComponentProps from '@mui/utils/resolveComponentProps';
import composeClasses from '@mui/utils/composeClasses';
import { Menu as BaseMenu } from '@base-ui/react/menu';
import { mergeProps } from '@base-ui/react/merge-props';
import { SxProps } from '@mui/system';
import { Theme } from '../styles';
import { styled } from '../zero-styled';
import { useDefaultProps } from '../DefaultPropsProvider';
import RadioButtonIcon from '../Radio/RadioButtonIcon';
import { menu2IndicatorStyles } from '../Unstable_Menu2/menu2SharedStyles';
import { getMenu2RootRender, Menu2RootSlotProps } from '../Unstable_Menu2/menu2Utils';
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

// The same icon the real Radio uses, so the dot keeps its scale transition.
// `small` keeps the 1.25rem box the menu row is built around.
const defaultCheckedIcon = <RadioButtonIcon checked fontSize="small" />;
const defaultIcon = <RadioButtonIcon fontSize="small" />;

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
      // The render callback is the only place the checked state is available,
      // and the icon has to change with it.
      render={(elementProps, state) =>
        getMenu2RootRender(slots?.root ?? Menu2RadioItemIndicatorRoot, ownerState, {
          ...mergeProps(elementProps, {
            ...resolveComponentProps(slotProps?.root, ownerState),
            as: component,
            ownerState,
            sx,
          }),
          children: children ?? (state.checked ? defaultCheckedIcon : defaultIcon),
        })
      }
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
    />
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
