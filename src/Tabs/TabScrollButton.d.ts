import { StyledComponent } from '..';

import { ButtonBaseProps } from '../ButtonBase';

export interface TabScrollButtonProps extends ButtonBaseProps {
  direction?: 'left' | 'right';
  visible?: boolean;
}

export default class TabScrollButton extends StyledComponent<
  TabScrollButtonProps
> {}
