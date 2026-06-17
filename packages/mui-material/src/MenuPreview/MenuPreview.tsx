'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import { Menu as BaseMenu } from '@base-ui/react/menu';
import { useDefaultProps } from '../DefaultPropsProvider';

export interface MenuPreviewProps {
  /**
   * The content of the menu.
   */
  children?: React.ReactNode;
  /**
   * Whether the menu is initially open.
   *
   * To render a controlled menu, use the `open` prop instead.
   * @default false
   */
  defaultOpen?: boolean | undefined;
  /**
   * Whether the menu is currently open.
   */
  open?: boolean | undefined;
  /**
   * Event handler called when the menu is opened or closed.
   */
  onOpenChange?: BaseMenu.Root.Props['onOpenChange'];
  /**
   * Event handler called after any animations complete when the menu is opened or closed.
   */
  onOpenChangeComplete?: BaseMenu.Root.Props['onOpenChangeComplete'];
  /**
   * Determines if the menu enters a modal state when open.
   * @default true
   */
  modal?: boolean | undefined;
  /**
   * Whether the component should ignore user interaction.
   * @default false
   */
  disabled?: boolean | undefined;
  /**
   * Whether to loop keyboard focus back to the first item.
   * @default true
   */
  loopFocus?: boolean | undefined;
  /**
   * Whether moving the pointer over items should highlight them.
   * @default true
   */
  highlightItemOnHover?: boolean | undefined;
  /**
   * The visual orientation of the menu.
   * @default 'vertical'
   */
  orientation?: 'horizontal' | 'vertical' | undefined;
  /**
   * When in a submenu, determines whether pressing the Escape key closes the entire menu.
   * @default false
   */
  closeParentOnEsc?: boolean | undefined;
}

/**
 *
 * Demos:
 *
 * - [Menu](https://mui.com/material-ui/react-menu/)
 *
 * API:
 *
 * - [MenuPreview API](https://mui.com/material-ui/api/menu-preview/)
 */
function MenuPreview(props: MenuPreviewProps): React.JSX.Element {
  const themedProps = useDefaultProps({
    props,
    name: 'MuiMenuPreview',
  });

  return <BaseMenu.Root {...themedProps} />;
}

MenuPreview.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * The content of the menu.
   */
  children: PropTypes.node,
  /**
   * When in a submenu, determines whether pressing the Escape key closes the entire menu.
   * @default false
   */
  closeParentOnEsc: PropTypes.bool,
  /**
   * Whether the menu is initially open.
   *
   * To render a controlled menu, use the `open` prop instead.
   * @default false
   */
  defaultOpen: PropTypes.bool,
  /**
   * Whether the component should ignore user interaction.
   * @default false
   */
  disabled: PropTypes.bool,
  /**
   * Whether moving the pointer over items should highlight them.
   * @default true
   */
  highlightItemOnHover: PropTypes.bool,
  /**
   * Whether to loop keyboard focus back to the first item.
   * @default true
   */
  loopFocus: PropTypes.bool,
  /**
   * Determines if the menu enters a modal state when open.
   * @default true
   */
  modal: PropTypes.bool,
  /**
   * Event handler called when the menu is opened or closed.
   */
  onOpenChange: PropTypes.func,
  /**
   * Event handler called after any animations complete when the menu is opened or closed.
   */
  onOpenChangeComplete: PropTypes.func,
  /**
   * Whether the menu is currently open.
   */
  open: PropTypes.bool,
  /**
   * The visual orientation of the menu.
   * @default 'vertical'
   */
  orientation: PropTypes.oneOf(['horizontal', 'vertical']),
} as any;

export default MenuPreview;
