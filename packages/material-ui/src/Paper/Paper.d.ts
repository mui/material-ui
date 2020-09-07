import * as React from 'react';
import { OverridableStringUnion } from '@material-ui/types';
import { InternalStandardProps as StandardProps } from '..';

export interface PaperPropsVariantOverrides {}
export type PaperVariantDefaults = Record<'elevation' | 'outlined', true>;

export interface PaperProps extends StandardProps<React.HTMLAttributes<HTMLDivElement>> {
  /**
   * The content of the component.
   */
  children?: React.ReactNode;
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: {
    /** Styles applied to the root element. */
    root?: string;
    /** Styles applied to the root element if `square={false}`. */
    rounded?: string;
    /** Styles applied to the root element if `variant="outlined"`. */
    outlined?: string;
    /** Styles applied to the root element if `variant="elevation"`. */
    elevation?: string;
    elevation0?: string;
    elevation1?: string;
    elevation2?: string;
    elevation3?: string;
    elevation4?: string;
    elevation5?: string;
    elevation6?: string;
    elevation7?: string;
    elevation8?: string;
    elevation9?: string;
    elevation10?: string;
    elevation11?: string;
    elevation12?: string;
    elevation13?: string;
    elevation14?: string;
    elevation15?: string;
    elevation16?: string;
    elevation17?: string;
    elevation18?: string;
    elevation19?: string;
    elevation20?: string;
    elevation21?: string;
    elevation22?: string;
    elevation23?: string;
    elevation24?: string;
  };
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component?: React.ElementType<React.HTMLAttributes<HTMLElement>>;
  /**
   * Shadow depth, corresponds to `dp` in the spec.
   * It accepts values between 0 and 24 inclusive.
   * @default 1
   */
  elevation?: number;
  /**
   * If `true`, rounded corners are disabled.
   * @default false
   */
  square?: boolean;
  /**
   * The variant to use.
   * @default 'elevation'
   */
  variant?: OverridableStringUnion<PaperVariantDefaults, PaperPropsVariantOverrides>;
}

export type PaperClassKey = keyof NonNullable<PaperProps['classes']>;

/**
 *
 * Demos:
 *
 * - [Cards](https://material-ui.com/components/cards/)
 * - [Paper](https://material-ui.com/components/paper/)
 *
 * API:
 *
 * - [Paper API](https://material-ui.com/api/paper/)
 */
export default function Paper(props: PaperProps): JSX.Element;
