import * as React from 'react';
import { StandardProps } from '..';
import { ButtonBaseProps } from '../ButtonBase';
import { IconButtonProps } from '../IconButton';

export interface ExpansionPanelSummaryProps
  extends StandardProps<ButtonBaseProps, ExpansionPanelSummaryClassKey> {
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

declare const ExpansionPanelSummary: React.ComponentType<ExpansionPanelSummaryProps>;

export default ExpansionPanelSummary;
