import * as React from 'react';
import { ExtendButtonBase, ExtendButtonBaseTypeMap } from '../ButtonBase';
import { IconButtonProps } from '../IconButton';
import { OverrideProps } from '../OverridableComponent';

export type ExpansionPanelSummaryTypeMap<
  P = {},
  D extends React.ElementType = 'div'
> = ExtendButtonBaseTypeMap<{
  props: P & {
    /**
     * The content of the expansion panel summary.
     */
    children?: React.ReactNode;
    /**
     * The icon to display as the expand indicator.
     */
    expandIcon?: React.ReactNode;
    /**
     * Props applied to the `IconButton` element wrapping the expand icon.
     */
    IconButtonProps?: Partial<IconButtonProps>;
  };
  defaultComponent: D;
  classKey: ExpansionPanelSummaryClassKey;
}>;

/**
 * ⚠️ The ExpansionPanelSummary component was renamed to AccordionSummary to use a more common naming convention.
 *
 * You should use `import { AccordionSummary } from '@material-ui/core'`
 * or `import AccordionSummary from '@material-ui/core/AccordionSummary'`.
 * API:
 *
 * - [ExpansionPanelSummary API](https://mui.com/api/expansion-panel-summary/)
 * - inherits [ButtonBase API](https://mui.com/api/button-base/)
 */
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
