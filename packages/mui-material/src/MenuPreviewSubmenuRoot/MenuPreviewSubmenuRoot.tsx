'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import { Menu as BaseMenu } from '@base-ui/react/menu';
import { useDefaultProps } from '../DefaultPropsProvider';

export interface MenuPreviewSubmenuRootProps extends BaseMenu.SubmenuRoot.Props {
  /**
   * The content of the submenu.
   */
  children?: BaseMenu.SubmenuRoot.Props['children'];
  /**
   * Whether the submenu is initially open.
   *
   * To render a controlled submenu, use the `open` prop instead.
   * @default false
   */
  defaultOpen?: boolean | undefined;
  /**
   * Whether the submenu is currently open.
   */
  open?: boolean | undefined;
  /**
   * Event handler called when the submenu is opened or closed.
   */
  onOpenChange?: BaseMenu.SubmenuRoot.Props['onOpenChange'];
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
   * The visual orientation of the submenu.
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
 * - [MenuPreviewSubmenuRoot API](https://mui.com/material-ui/api/menu-preview-submenu-root/)
 */
function MenuPreviewSubmenuRoot(props: MenuPreviewSubmenuRootProps): React.JSX.Element {
  const themedProps = useDefaultProps({
    props,
    name: 'MuiMenuPreviewSubmenuRoot',
  });

  return <BaseMenu.SubmenuRoot {...themedProps} />;
}

MenuPreviewSubmenuRoot.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * The content of the submenu.
   */
  children: PropTypes /* @typescript-to-proptypes-ignore */.node,
  /**
   * When in a submenu, determines whether pressing the Escape key closes the entire menu.
   * @default false
   */
  closeParentOnEsc: PropTypes.bool,
  /**
   * Whether the submenu is initially open.
   *
   * To render a controlled submenu, use the `open` prop instead.
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
   * Event handler called when the submenu is opened or closed.
   */
  onOpenChange: PropTypes.func,
  /**
   * Whether the submenu is currently open.
   */
  open: PropTypes.bool,
  /**
   * The visual orientation of the submenu.
   * @default 'vertical'
   */
  orientation: PropTypes.oneOf(['horizontal', 'vertical']),
} as any;

export default MenuPreviewSubmenuRoot;
