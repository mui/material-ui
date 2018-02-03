import * as React from 'react';
import { StandardProps } from '..';
import { ButtonBaseProps, ButtonBaseClassKey } from '../ButtonBase';

export interface ExpansionPanelSummaryProps
  extends StandardProps<ButtonBaseProps, ExpansionPanelSummaryClassKey> {
  disabled?: boolean;
  expanded?: boolean;
  expandIcon?: React.ReactNode;
  onChange?: React.ReactEventHandler<{}>;
}

export type ExpansionPanelSummaryClassKey =
  | ButtonBaseClassKey
  | 'expanded'
  | 'focused'
  | 'disabled'
  | 'content'
  | 'contentExpanded'
  | 'expandIcon'
  | 'expandIconExpanded';

declare const ExpansionPanelSummary: React.ComponentType<ExpansionPanelSummaryProps>;

export default ExpansionPanelSummary;
