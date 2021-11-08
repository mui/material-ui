import * as React from 'react';
import clsx from 'clsx';
import { appendOwnerState } from '../utils';
import composeClasses from '../composeClasses';
import { getTabPanelUnstyledUtilityClass } from './tabPanelUnstyledClasses';
import { useTabContext, getPanelId, getTabId } from '../TabsUnstyled';

const useUtilityClasses = (ownerState: { hidden: boolean }) => {
  const { hidden } = ownerState;

  const slots = {
    root: ['root', hidden && 'hidden'],
  };

  return composeClasses(slots, getTabPanelUnstyledUtilityClass, {});
};

interface TabPanelUnstyled {
  children?: React.ReactNode;
  className?: string;
  value: number;
  components?: {
    Root?: React.ElementType;
  };
  componentsProps?: {
    // TODO: Fix me please
    root?: any;
  };
  component?: React.ElementType;
}

const TabPanelUnstyled = React.forwardRef<unknown, TabPanelUnstyled>(function TabPanelUnstyled(
  props,
  ref,
) {
  const {
    children,
    className,
    value,
    components = {},
    componentsProps = {},
    component,
    ...other
  } = props;

  const context = useTabContext();
  if (context === null) {
    throw new TypeError('No TabContext provided');
  }

  const hidden = value !== context.value;
  const id = getPanelId(context, value);
  const tabId = getTabId(context, value);

  const ownerState = {
    ...props,
    hidden,
  };

  const classes = useUtilityClasses(ownerState);

  const TabPanelRoot: React.ElementType = component ?? components.Root ?? 'div';
  const tabPanelRootProps = appendOwnerState(
    TabPanelRoot,
    { ...other, ...componentsProps.root },
    ownerState,
  );

  return (
    <TabPanelRoot
      aria-labelledby={tabId}
      hidden={hidden}
      id={id}
      ref={ref}
      role="tabpanel"
      {...tabPanelRootProps}
      className={clsx(classes.root, className)}
    >
      {!hidden && children}
    </TabPanelRoot>
  );
});

export default TabPanelUnstyled;
