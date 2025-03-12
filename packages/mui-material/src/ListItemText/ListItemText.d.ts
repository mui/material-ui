import * as React from 'react';
import { SxProps } from '@mui/system';
import { InternalStandardProps as StandardProps, Theme } from '..';
import { TypographyProps } from '../Typography';
import { ListItemTextClasses } from './listItemTextClasses';
import { CreateSlotsAndSlotProps, SlotProps } from '../utils/types';

export interface ListItemTextSlots {
  /**
   * The component that renders the root slot.
   * @default 'div'
   */
  root?: React.ElementType;
  /**
   * The component that renders the primary slot.
   * @default Typography
   */
  primary?: React.ElementType;
  /**
   * The component that renders the secondary slot.
   * @default Typography
   */
  secondary?: React.ElementType;
}

export type ListItemTextSlotsAndSlotProps = CreateSlotsAndSlotProps<
  ListItemTextSlots,
  {
    /**
     * Props forwared to the root slot.
     * By default, the available props are based on `div` element.
     */
    root: SlotProps<'div', {}, ListItemTextOwnerState>;
    /**
     * Props forwared to the primary slot (as long as disableTypography is not `true`)
     * By default, the available props are based on the [Typography](https://mui.com/material-ui/api/typography/#props) component
     */
    primary: SlotProps<React.ElementType<TypographyProps>, {}, ListItemTextOwnerState>;
    /**
     * Props forwarded to the secondary slot (as long as disableTypography is not `true`)
     * By default, the available props are based on the [Typography](https://mui.com/material-ui/api/typography/#props) component
     */
    secondary: SlotProps<React.ElementType<TypographyProps>, {}, ListItemTextOwnerState>;
  }
>;

export interface ListItemTextOwnerState extends ListItemTextProps {}

export interface ListItemTextProps<
  PrimaryTypographyComponent extends React.ElementType = 'span',
  SecondaryTypographyComponent extends React.ElementType = 'p',
> extends StandardProps<React.HTMLAttributes<HTMLDivElement>>,
    ListItemTextSlotsAndSlotProps {
  /**
   * Alias for the `primary` prop.
   */
  children?: React.ReactNode;
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: Partial<ListItemTextClasses>;
  /**
   * If `true`, the children won't be wrapped by a Typography component.
   * This can be useful to render an alternative Typography variant by wrapping
   * the `children` (or `primary`) text, and optional `secondary` text
   * with the Typography component.
   * @default false
   */
  disableTypography?: boolean;
  /**
   * If `true`, the children are indented.
   * This should be used if there is no left avatar or left icon.
   * @default false
   */
  inset?: boolean;
  /**
   * The main content element.
   */
  primary?: React.ReactNode;
  /**
   * These props will be forwarded to the primary typography component
   * (as long as disableTypography is not `true`).
   * @deprecated Use `slotProps.primary` instead. This prop will be removed in v7. See [Migrating from deprecated APIs](/material-ui/migration/migrating-from-deprecated-apis/) for more details.
   */
  primaryTypographyProps?: TypographyProps<
    PrimaryTypographyComponent,
    { component?: PrimaryTypographyComponent }
  >;
  /**
   * The secondary content element.
   */
  secondary?: React.ReactNode;
  /**
   * These props will be forwarded to the secondary typography component
   * (as long as disableTypography is not `true`).
   * @deprecated Use `slotProps.secondary` instead. This prop will be removed in v7. See [Migrating from deprecated APIs](/material-ui/migration/migrating-from-deprecated-apis/) for more details.
   */
  secondaryTypographyProps?: TypographyProps<
    SecondaryTypographyComponent,
    { component?: SecondaryTypographyComponent }
  >;
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx?: SxProps<Theme>;
}

/**
 *
 * Demos:
 *
 * - [Lists](https://mui.com/material-ui/react-list/)
 *
 * API:
 *
 * - [ListItemText API](https://mui.com/material-ui/api/list-item-text/)
 */
export default function ListItemText<
  PrimaryTypographyComponent extends React.ElementType = 'span',
  SecondaryTypographyComponent extends React.ElementType = 'p',
>(
  props: ListItemTextProps<PrimaryTypographyComponent, SecondaryTypographyComponent>,
): React.JSX.Element;
