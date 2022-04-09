import * as React from 'react';
import { OverridableComponent, OverrideProps } from '../OverridableComponent';
import { ScopedCssBaselineClasses } from './scopedCssBaselineClasses';

export interface ScopedCssBaselineTypeMap<P = {}, D extends React.ElementType = 'div'> {
  props: P & {
    /**
     * The content of the component.
     */
    children?: React.ReactNode;
    /**
     * Override or extend the styles applied to the component.
     */
    classes?: Partial<ScopedCssBaselineClasses>;
    /**
     * Enable `color-scheme` CSS property to use `theme.palette.mode`.
     * For more details, check out https://developer.mozilla.org/en-US/docs/Web/CSS/color-scheme
     * For browser support, check out https://caniuse.com/?search=color-scheme
     */
    enableColorScheme?: boolean;
  };
  defaultComponent: D;
}
/**
 *
 * Demos:
 *
 * - [Css Baseline](https://mui.com/material-ui/react-css-baseline/)
 *
 * API:
 *
 * - [ScopedCssBaseline API](https://mui.com/material-ui/api/scoped-css-baseline/)
 */
declare const ScopedCssBaseline: OverridableComponent<ScopedCssBaselineTypeMap>;

export type ScopedCssBaselineProps<
  D extends React.ElementType = ScopedCssBaselineTypeMap['defaultComponent'],
  P = {},
> = OverrideProps<ScopedCssBaselineTypeMap<P, D>, D>;

/**
 *
 * Demos:
 *
 * - [Css Baseline](https://mui.com/components/css-baseline/)
 *
 * API:
 *
 * - [ScopedCssBaseline API](https://mui.com/api/scoped-css-baseline/)
 */
export default ScopedCssBaseline;
