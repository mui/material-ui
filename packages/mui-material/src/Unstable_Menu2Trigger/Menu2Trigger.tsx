'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import elementAcceptingRef from '@mui/utils/elementAcceptingRef';
import useForkRef from '@mui/utils/useForkRef';
import { Menu as BaseMenu } from '@base-ui/react/menu';
import { useDefaultProps } from '../DefaultPropsProvider';
import { menu2TriggerClasses } from '../Unstable_Menu2/menu2Classes';
import { warnMenu2FragmentTrigger, warnMenu2TriggerRef } from '../Unstable_Menu2/menu2Utils';

export interface Menu2TriggerProps<Payload = unknown>
  extends
    Omit<React.HTMLAttributes<HTMLElement>, 'children'>,
    Pick<
      BaseMenu.Trigger.Props<Payload>,
      'handle' | 'payload' | 'disabled' | 'openOnHover' | 'delay' | 'closeDelay'
    > {
  /**
   * The element that opens the menu. It must forward its props and ref.
   * Set visual props, such as `sx` and `variant`, on this element.
   */
  children: React.ReactElement;
  /**
   * Whether the child renders a native `<button>` element.
   * Set to `false` when the child renders a different element.
   * @default true
   */
  nativeButton?: BaseMenu.Trigger.Props['nativeButton'] | undefined;
}

interface Menu2TriggerComponent extends Pick<
  React.ForwardRefExoticComponent<Menu2TriggerProps & React.RefAttributes<HTMLElement>>,
  'propTypes' | 'displayName'
> {
  <Payload = unknown>(
    props: Menu2TriggerProps<Payload> & React.RefAttributes<HTMLElement>,
  ): React.JSX.Element;
}

/**
 *
 * Demos:
 *
 * - [Menu v2](https://next.mui.com/material-ui/react-menu2/)
 *
 * API:
 *
 * - [Menu2Trigger API](https://next.mui.com/material-ui/api/menu-2-trigger/)
 */
const Menu2Trigger = React.forwardRef(function Menu2Trigger<Payload>(
  inProps: Menu2TriggerProps<Payload>,
  ref: React.ForwardedRef<HTMLElement>,
) {
  const { children, className, ...props } = useDefaultProps({
    props: inProps,
    name: 'MuiMenu2Trigger',
  });
  if (process.env.NODE_ENV !== 'production') {
    warnMenu2FragmentTrigger(children, 'Menu2Trigger', 'Button', 'children');
  }

  const localRef = React.useRef<HTMLElement | null>(null);
  const handleRef = useForkRef(ref, localRef);
  React.useEffect(() => {
    if (process.env.NODE_ENV !== 'production' && localRef.current == null) {
      warnMenu2TriggerRef(children, 'Menu2Trigger', 'children');
    }
  }, [children]);

  return (
    <BaseMenu.Trigger
      {...props}
      ref={handleRef}
      render={children}
      className={(state) =>
        clsx(
          menu2TriggerClasses.root,
          state.disabled && menu2TriggerClasses.disabled,
          state.open && menu2TriggerClasses.open,
          className,
        )
      }
    />
  );
}) as Menu2TriggerComponent;

Menu2Trigger.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * The element that opens the menu. It must forward its props and ref.
   * Set visual props, such as `sx` and `variant`, on this element.
   */
  children: elementAcceptingRef.isRequired,
  /**
   * How long to wait before closing the menu that was opened on hover.
   * Specified in milliseconds.
   *
   * Requires the `openOnHover` prop.
   * @default 0
   */
  closeDelay: PropTypes.number,
  /**
   * How long to wait before the menu may be opened on hover. Specified in milliseconds.
   *
   * Requires the `openOnHover` prop.
   * @default 100
   */
  delay: PropTypes.number,
  /**
   * Whether the component should ignore user interaction.
   * @default false
   */
  disabled: PropTypes.bool,
  /**
   * A handle to associate the trigger with a menu.
   */
  handle: PropTypes /* @typescript-to-proptypes-ignore */.object,
  /**
   * Whether the child renders a native `<button>` element.
   * Set to `false` when the child renders a different element.
   * @default true
   */
  nativeButton: PropTypes.bool,
  /**
   * Whether the menu should also open when the trigger is hovered.
   */
  openOnHover: PropTypes.bool,
  /**
   * A payload to pass to the menu when it is opened.
   */
  payload: PropTypes.any,
} as any;

export default Menu2Trigger;
