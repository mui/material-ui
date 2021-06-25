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
  };
  defaultComponent: D;
}
/**
 *
 * Demos:
 *
 * - [Css Baseline](https://material-ui.com/components/css-baseline/)
 *
 * API:
 *
 * - [ScopedCssBaseline API](https://material-ui.com/api/scoped-css-baseline/)
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
 * - [Css Baseline](https://material-ui.com/components/css-baseline/)
 *
 * API:
 *
 * - [ScopedCssBaseline API](https://material-ui.com/api/scoped-css-baseline/)
 */
export default ScopedCssBaseline;
