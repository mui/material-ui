import * as React from 'react';
import { StandardProps } from '..';
import { ButtonBaseProps } from '../ButtonBase';
import { IconButtonProps } from '../IconButton';

export interface ExpansionPanelSummaryProps<C = {}>
  extends StandardProps<ButtonBaseProps<C>, ExpansionPanelSummaryClassKey> {
  disabled?: boolean;
  expanded?: boolean;
  expandIcon?: React.ReactNode;
  IconButtonProps?: Partial<IconButtonProps>;
  onChange?: React.ReactEventHandler<{}>;
}

export type ExpansionPanelSummaryClassKey =
  | 'root'
  | 'expanded'
  | 'focused'
  | 'disabled'
  | 'content'
  | 'expandIcon';

declare class ExpansionPanelSummary<C> extends React.Component<C & ExpansionPanelSummaryProps<C>> {}

export default ExpansionPanelSummary;
