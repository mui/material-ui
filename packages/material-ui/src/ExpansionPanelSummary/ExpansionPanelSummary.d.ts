import * as React from 'react';
import { ExtendButtonBase, ExtendButtonBaseTypeMap } from '../ButtonBase';
import { IconButtonProps } from '../IconButton';
import { OverrideProps } from '../OverridableComponent';

export type ExpansionPanelSummaryTypeMap<
  P = {},
  D extends React.ElementType = 'div'
> = ExtendButtonBaseTypeMap<{
  props: P & {
    disabled?: boolean;
    expanded?: boolean;
    expandIcon?: React.ReactNode;
    IconButtonProps?: Partial<IconButtonProps>;
    onChange?: React.ReactEventHandler<{}>;
  };
  defaultComponent: D;
  classKey: ExpansionPanelSummaryClassKey;
}>;

declare const ExpansionPanelSummary: ExtendButtonBase<ExpansionPanelSummaryTypeMap>;

export type ExpansionPanelSummaryClassKey =
  | 'root'
  | 'expanded'
  | 'focused'
  | 'disabled'
  | 'content'
  | 'expandIcon';

export type ExpansionPanelSummaryProps<
  D extends React.ElementType = ExpansionPanelSummaryTypeMap['defaultComponent'],
  P = {}
> = OverrideProps<ExpansionPanelSummaryTypeMap<P, D>, D>;

export default ExpansionPanelSummary;
