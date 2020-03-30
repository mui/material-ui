import * as React from 'react';
import { StandardProps } from '..';
import { TransitionProps } from '../transitions/transition';
import { PaperProps } from '../Paper';

export interface ExpansionPanelProps
  extends StandardProps<PaperProps, ExpansionPanelClassKey, 'onChange'> {
  /**
   * The content of the expansion panel.
   */
  children: Exclude<React.ReactNode, null | undefined>;
  /**
   * If `true`, expands the panel by default.
   */
  defaultExpanded?: boolean;
  /**
   * If `true`, the panel will be displayed in a disabled state.
   */
  disabled?: boolean;
  /**
   * If `true`, expands the panel, otherwise collapse it.
   * Setting this prop enables control over the panel.
   */
  expanded?: boolean;
  /**
   * Callback fired when the expand/collapse state is changed.
   *
   * @param {object} event The event source of the callback.
   * @param {boolean} expanded The `expanded` state of the panel.
   */
  onChange?: (event: React.ChangeEvent<{}>, expanded: boolean) => void;
  /**
   * The component used for the collapse effect.
   * [Follow this guide](/components/transitions/#transitioncomponent-prop) to learn more about the requirements for this component.
   */
  TransitionComponent?: React.ComponentType<
    TransitionProps & { children?: React.ReactElement<any, any> }
  >;
  /**
   * Props applied to the [`Transition`](http://reactcommunity.org/react-transition-group/transition#Transition-props) element.
   */
  TransitionProps?: TransitionProps;
}

export type ExpansionPanelClassKey = 'root' | 'rounded' | 'expanded' | 'disabled';

/**
 *
 * Demos:
 *
 * - [Expansion Panels](https://material-ui.com/components/expansion-panels/)
 *
 * API:
 *
 * - [ExpansionPanel API](https://material-ui.com/api/expansion-panel/)
 * - inherits [Paper API](https://material-ui.com/api/paper/)
 */
export default function ExpansionPanel(props: ExpansionPanelProps): JSX.Element;
