import * as React from 'react';
import PropTypes from 'prop-types';
import { OverridableComponent } from '@mui/types';
import ButtonUnstyled from '../ButtonUnstyled';
import clsx from 'clsx';
import composeClasses from '../composeClasses';
import { useTabContext, getTabId, getPanelId } from '../TabsUnstyled';
import appendOwnerState from '../utils/appendOwnerState';
import { getTabUnstyledUtilityClass } from './tabUnstyledClasses';
import TabUnstyledProps, { TabUnstyledTypeMap } from './TabUnstyledProps';

const useUtilityClasses = (ownerState: { selected: boolean; disabled: boolean }) => {
  const { selected, disabled } = ownerState;

  const slots = {
    root: ['root', selected && 'selected', disabled && 'disabled'],
  };

  return composeClasses(slots, getTabUnstyledUtilityClass, {});
};
/**
 *
 * Demos:
 *
 * - [Tabs](https://mui.com/components/tabs/)
 *
 * API:
 *
 * - [TabUnstyled API](https://mui.com/api/tab-unstyled/)
 */
const TabUnstyled = React.forwardRef<unknown, TabUnstyledProps>(function TabUnstyled(props, ref) {
  const {
    children,
    value: valueProp,
    className,
    disabled = false,
    onChange,
    onClick,
    onFocus,
    component,
    components = {},
    componentsProps = {},
    ...other
  } = props;
  const context = useTabContext();
  if (context === null) {
    throw new TypeError('No TabContext provided');
  }

  const value = valueProp ?? 0;
  const selected = context.value === value;
  const selectionFollowsFocus = context.selectionFollowsFocus;

  const a11yAttributes = {
    role: 'tab',
    'aria-controls': getPanelId(context, value),
    id: getTabId(context, value),
    'aria-selected': selected,
    disabled,
  };

  const handleFocus = (event: React.FocusEvent<HTMLButtonElement, Element>) => {
    if (selectionFollowsFocus && !selected) {
      if (onChange) onChange(event, value);
      context.onSelected(event, value);
    }

    if (onFocus) {
      onFocus(event);
    }
  };

  const handleClick = (event: React.MouseEvent<Element, MouseEvent>) => {
    if (!selected) {
      if (onChange) onChange(event, value);
      context.onSelected(event, value);
    }

    if (onClick) {
      onClick(event);
    }
  };

  const ownerState = {
    ...props,
    disabled,
    selected,
  };

  const classes = useUtilityClasses(ownerState);

  const TabRoot: React.ElementType = component ?? components.Root ?? ButtonUnstyled;
  const tabRootProps = appendOwnerState(
    TabRoot,
    { ...a11yAttributes, ...other, ...componentsProps.root },
    ownerState,
  );

  return (
    <TabRoot
      {...tabRootProps}
      className={clsx(classes.root, componentsProps.root?.className, className)}
      ref={ref}
      onClick={handleClick}
      onFocus={handleFocus}
    >
      {children}
    </TabRoot>
  );
}) as OverridableComponent<TabUnstyledTypeMap>;

TabUnstyled.propTypes /* remove-proptypes */ = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: PropTypes.elementType,
  /**
   * Callback invoked when new value is being set.
   */
  onChange: PropTypes.func,
  /**
   * You can provide your own value. Otherwise, we fallback to the child position index.
   */
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
} as any;

export default TabUnstyled;
