'use client';
import * as React from 'react';
import { OverridableComponent, OverrideProps } from '@mui/types';
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
import CheckBoxIcon from '../internal/svg-icons/CheckBox';
import CheckBoxOutlineBlankIcon from '../internal/svg-icons/CheckBoxOutlineBlank';
import { menu2IndicatorStyles } from '../Unstable_Menu2/menu2SharedStyles';
import { getMenu2RootRender, Menu2RootSlotProps } from '../Unstable_Menu2/menu2Utils';
import {
  getMenu2CheckboxItemIndicatorUtilityClass,
  Menu2CheckboxItemIndicatorClasses,
} from '../Unstable_Menu2/menu2Classes';

export interface Menu2CheckboxItemIndicatorSlots {
  /**
   * The component that renders the root.
   * @default 'span'
   */
  root?: React.ElementType | undefined;
}

export interface Menu2CheckboxItemIndicatorSlotProps extends Menu2RootSlotProps<Menu2CheckboxItemIndicatorProps> {}

export interface Menu2CheckboxItemIndicatorOwnProps {
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: Partial<Menu2CheckboxItemIndicatorClasses> | undefined;
  /**
   * CSS class applied to the element.
   */
  className?: string | undefined;
  /**
   * Whether to keep the HTML element in the DOM when the checkbox item is not checked.
   * @default false
   */
  keepMounted?: boolean | undefined;
  /**
   * The components used for each slot inside.
   */
  slots?: Menu2CheckboxItemIndicatorSlots | undefined;
  /**
   * The props used for each slot inside.
   */
  slotProps?: Menu2CheckboxItemIndicatorSlotProps | undefined;
  /**
   * Styles applied to the root element.
   */
  style?: React.CSSProperties | undefined;
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx?: SxProps<Theme> | undefined;
}

export interface Menu2CheckboxItemIndicatorTypeMap<
  AdditionalProps = {},
  RootComponent extends React.ElementType = 'span',
> {
  props: AdditionalProps & Menu2CheckboxItemIndicatorOwnProps;
  defaultComponent: RootComponent;
}

export type Menu2CheckboxItemIndicatorProps<
  RootComponent extends React.ElementType = Menu2CheckboxItemIndicatorTypeMap['defaultComponent'],
  AdditionalProps = {},
> = OverrideProps<
  Menu2CheckboxItemIndicatorTypeMap<AdditionalProps, RootComponent>,
  RootComponent
> & {
  /**
   * The component used for the root node.
   */
  component?: React.ElementType | undefined;
};

const useUtilityClasses = (ownerState: Menu2CheckboxItemIndicatorProps) => {
  const { classes } = ownerState;

  const slots = {
    root: ['root'],
    checked: ['checked'],
    disabled: ['disabled'],
    highlighted: ['highlighted'],
  };

  return {
    ...classes,
    ...composeClasses(slots, getMenu2CheckboxItemIndicatorUtilityClass, classes),
  };
};

const Menu2CheckboxItemIndicatorRoot = styled('span', {
  name: 'MuiMenu2CheckboxItemIndicator',
  slot: 'Root',
  overridesResolver: (props, styles) => styles.root,
})(menu2IndicatorStyles) as any;

// `small` keeps the 1.25rem box the menu row is built around.
const defaultCheckedIcon = <CheckBoxIcon fontSize="small" />;
const defaultIcon = <CheckBoxOutlineBlankIcon fontSize="small" />;

/**
 *
 * Demos:
 *
 * - [Menu](https://mui.com/material-ui/react-menu/)
 */
const Menu2CheckboxItemIndicator = React.forwardRef(function Menu2CheckboxItemIndicator(
  inProps: Menu2CheckboxItemIndicatorProps,
  ref: React.ForwardedRef<HTMLSpanElement>,
) {
  const props = useDefaultProps({
    props: inProps,
    name: 'MuiMenu2CheckboxItemIndicator',
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
    <BaseMenu.CheckboxItemIndicator
      ref={ref}
      // The render callback is the only place the checked state is available,
      // and the icon has to change with it.
      render={(elementProps, state) =>
        getMenu2RootRender(slots?.root ?? Menu2CheckboxItemIndicatorRoot, ownerState, {
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
}) as OverridableComponent<Menu2CheckboxItemIndicatorTypeMap>;

Menu2CheckboxItemIndicator.propTypes /* remove-proptypes */ = {
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
   * Either a string to use a HTML element or a component.
   */
  component: PropTypes.elementType,
  /**
   * Whether to keep the HTML element in the DOM when the checkbox item is not checked.
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

export default Menu2CheckboxItemIndicator;
