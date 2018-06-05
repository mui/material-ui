import * as React from 'react';
import { StandardProps } from '..';
import { ButtonBaseProps } from '../ButtonBase/ButtonBase';

export interface TabScrollButtonProps<C>
  extends StandardProps<ButtonBaseProps<C>, TabScrollButtonClassKey> {
  direction?: 'left' | 'right';
  visible?: boolean;
}

export type TabScrollButtonClassKey = 'root';

declare class TabScrollButton<C> extends React.Component<C & TabScrollButtonProps<C>> {}

export default TabScrollButton;
