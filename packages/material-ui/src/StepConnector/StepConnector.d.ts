import * as React from 'react';
import { InternalStandardProps as StandardProps } from '..';

export type StepConnectorIcon = React.ReactElement | string | number;

export interface StepConnectorProps
  extends StandardProps<React.HTMLAttributes<HTMLDivElement>, 'children'> {
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: {
    /** Styles applied to the root element. */
    root?: string;
    /** Styles applied to the root element if `orientation="horizontal"`. */
    horizontal?: string;
    /** Styles applied to the root element if `orientation="vertical"`. */
    vertical?: string;
    /** Styles applied to the root element if `alternativeLabel={true}`. */
    alternativeLabel?: string;
    /** Pseudo-class applied to the root element if `active={true}`. */
    active?: string;
    /** Pseudo-class applied to the root element if `completed={true}`. */
    completed?: string;
    /** Pseudo-class applied to the root element if `disabled={true}`. */
    disabled?: string;
    /** Styles applied to the line element. */
    line?: string;
    /** Styles applied to the root element if `orientation="horizontal"`. */
    lineHorizontal?: string;
    /** Styles applied to the root element if `orientation="vertical"`. */
    lineVertical?: string;
  };
}

export type StepConnectorClasskey = keyof NonNullable<StepConnectorProps['classes']>;

/**
 *
 * Demos:
 *
 * - [Steppers](https://material-ui.com/components/steppers/)
 *
 * API:
 *
 * - [StepConnector API](https://material-ui.com/api/step-connector/)
 */
export default function StepConnector(props: StepConnectorProps): JSX.Element;
