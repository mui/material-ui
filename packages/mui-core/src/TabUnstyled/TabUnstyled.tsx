import * as React from 'react';
import ButtonUnstyled, { ButtonUnstyledProps } from '../ButtonUnstyled';
import clsx from 'clsx';
import composeClasses from '../composeClasses';
import { useTabContext, getTabId, getPanelId } from '../TabsUnstyled';
import appendOwnerState from '../utils/appendOwnerState';
import { getTabUnstyledUtilityClass } from './tabUnstyledClasses';

const useUtilityClasses = (ownerState: { selected: boolean; disabled: boolean }) => {
  const { selected, disabled } = ownerState;

  const slots = {
    root: ['root', selected && 'selected', disabled && 'disabled'],
  };

  return composeClasses(slots, getTabUnstyledUtilityClass, {});
};

interface TabUnstyledProps extends Omit<ButtonUnstyledProps, 'onChange'> {
  value?: number;
  onChange?: (event: React.SyntheticEvent, value: number) => void;
  selectionFollowsFocus?: boolean;
}

const TabUnstyled = React.forwardRef<unknown, TabUnstyledProps>(function TabUnstyled(props, ref) {
  const {
    children,
    value: valueProp,
    className,
    disabled = false,
    onChange,
    onClick,
    onFocus,
    selectionFollowsFocus,
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

  const a11yAttributes = {
    role: 'tab',
    'aria-controls': getPanelId(context, value),
    id: getTabId(context, value),
    'aria-selected': selected,
    disabled,
    tabIndex: selected ? 0 : -1,
  };

  const handleFocus = (event: React.FocusEvent<HTMLButtonElement, Element>) => {
    if (selectionFollowsFocus && !selected) {
      if (onChange) onChange(event, value);
      context.onSelected(value);
    }

    if (onFocus) {
      onFocus(event);
    }
  };

  const handleClick = (event: React.MouseEvent<Element, MouseEvent>) => {
    if (!selected) {
      if (onChange) onChange(event, value);
      context.onSelected(value);
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
      className={clsx(classes.root, className)}
      ref={ref}
      onClick={handleClick}
      onFocus={handleFocus}
    >
      {children}
    </TabRoot>
  );
});

export default TabUnstyled;
