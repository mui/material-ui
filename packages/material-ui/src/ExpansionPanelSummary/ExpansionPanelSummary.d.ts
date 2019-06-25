import * as React from 'react';
import { ExtendButtonBase } from '../ButtonBase';
import { IconButtonProps } from '../IconButton';
import { SimplifiedPropsOf } from '../OverridableComponent';

declare const ExpansionPanelSummary: ExtendButtonBase<{
  props: {
    disabled?: boolean;
    expanded?: boolean;
    expandIcon?: React.ReactNode;
    IconButtonProps?: Partial<IconButtonProps>;
    onChange?: React.ReactEventHandler<{}>;
  };
  defaultComponent: 'div';
  classKey: ExpansionPanelSummaryClassKey;
}>;

export type ExpansionPanelSummaryClassKey =
  | 'root'
  | 'expanded'
  | 'focused'
  | 'disabled'
  | 'content'
  | 'expandIcon';

export type ExpansionPanelSummaryProps = SimplifiedPropsOf<typeof ExpansionPanelSummary>;

export default ExpansionPanelSummary;
