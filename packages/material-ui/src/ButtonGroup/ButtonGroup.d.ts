import * as React from 'react';
import { OverridableStringUnion } from '@material-ui/types';
import { OverridableComponent, OverrideProps } from '../OverridableComponent';

export interface ButtonGroupPropsVariantOverrides {}
export type ButtonGroupVariantDefaults = Record<'text' | 'outlined' | 'contained', true>;

export interface ButtonGroupTypeMap<P = {}, D extends React.ElementType = 'div'> {
  props: P & {
    /**
     * The content of the button group.
     */
    children?: React.ReactNode;
    /**
     * Override or extend the styles applied to the component.
     */
    classes?: {
      /** Styles applied to the root element. */
      root?: string;
      /** Styles applied to the root element if `variant="contained"`. */
      contained?: string;
      /** Styles applied to the root element if `variant="outlined"`. */
      outlined?: string;
      /** Styles applied to the root element if `variant="text"`. */
      text?: string;
      /** Styles applied to the root element if `disableElevation={true}`. */
      disableElevation?: string;
      /** Pseudo-class applied to child elements if `disabled={true}`. */
      disabled?: string;
      /** Styles applied to the root element if `fullWidth={true}`. */
      fullWidth?: string;
      /** Styles applied to the root element if `orientation="vertical"`. */
      vertical?: string;
      /** Styles applied to the children. */
      grouped?: string;
      /** Styles applied to the children if `orientation="horizontal"`. */
      groupedHorizontal?: string;
      /** Styles applied to the children if `orientation="vertical"`. */
      groupedVertical?: string;
      /** Styles applied to the children if `variant="text"`. */
      groupedText?: string;
      /** Styles applied to the children if `variant="text"` and `orientation="horizontal"`. */
      groupedTextHorizontal?: string;
      /** Styles applied to the children if `variant="text"` and `orientation="vertical"`. */
      groupedTextVertical?: string;
      /** Styles applied to the children if `variant="text"` and `color="primary"`. */
      groupedTextPrimary?: string;
      /** Styles applied to the children if `variant="text"` and `color="secondary"`. */
      groupedTextSecondary?: string;
      /** Styles applied to the children if `variant="outlined"`. */
      groupedOutlined?: string;
      /** Styles applied to the children if `variant="outlined"` and `orientation="horizontal"`. */
      groupedOutlinedHorizontal?: string;
      /** Styles applied to the children if `variant="outlined"` and `orientation="vertical"`. */
      groupedOutlinedVertical?: string;
      /** Styles applied to the children if `variant="outlined"` and `color="primary"`. */
      groupedOutlinedPrimary?: string;
      /** Styles applied to the children if `variant="outlined"` and `color="secondary"`. */
      groupedOutlinedSecondary?: string;
      /** Styles applied to the children if `variant="contained"`. */
      groupedContained?: string;
      /** Styles applied to the children if `variant="contained"` and `orientation="horizontal"`. */
      groupedContainedHorizontal?: string;
      /** Styles applied to the children if `variant="contained"` and `orientation="vertical"`. */
      groupedContainedVertical?: string;
      /** Styles applied to the children if `variant="contained"` and `color="primary"`. */
      groupedContainedPrimary?: string;
      /** Styles applied to the children if `variant="contained"` and `color="secondary"`. */
      groupedContainedSecondary?: string;
    };
    /**
     * The color of the component. It supports those theme colors that make sense for this component.
     */
    color?: 'inherit' | 'primary' | 'secondary';
    /**
     * If `true`, the buttons will be disabled.
     */
    disabled?: boolean;
    /**
     * If `true`, no elevation is used.
     */
    disableElevation?: boolean;
    /**
     * If `true`, the button keyboard focus ripple will be disabled.
     */
    disableFocusRipple?: boolean;
    /**
     * If `true`, the button ripple effect will be disabled.
     */
    disableRipple?: boolean;
    /**
     * If `true`, the buttons will take up the full width of its container.
     */
    fullWidth?: boolean;
    /**
     * The group orientation (layout flow direction).
     */
    orientation?: 'vertical' | 'horizontal';
    /**
     * The size of the button.
     * `small` is equivalent to the dense button styling.
     */
    size?: 'small' | 'medium' | 'large';
    /**
     * The variant to use.
     */
    variant?: OverridableStringUnion<ButtonGroupVariantDefaults, ButtonGroupPropsVariantOverrides>;
  };
  defaultComponent: D;
}

/**
 *
 * Demos:
 *
 * - [Button Group](https://material-ui.com/components/button-group/)
 *
 * API:
 *
 * - [ButtonGroup API](https://material-ui.com/api/button-group/)
 */
declare const ButtonGroup: OverridableComponent<ButtonGroupTypeMap>;

export type ButtonGroupClassKey = keyof NonNullable<ButtonGroupTypeMap['props']['classes']>;

export type ButtonGroupProps<
  D extends React.ElementType = ButtonGroupTypeMap['defaultComponent'],
  P = {}
> = OverrideProps<ButtonGroupTypeMap<P, D>, D>;

export default ButtonGroup;
