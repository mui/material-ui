'use client';
import * as React from 'react';
import useId from '../utils/useId';
import { useRovingTabIndexItem } from '../utils/useRovingTabIndex';

interface RovingToggleButtonChildProps {
  ref?: React.Ref<HTMLElement> | undefined;
  tabIndex?: number | undefined;
}

interface RovingToggleButtonProps {
  children: React.ReactElement<RovingToggleButtonChildProps>;
  disabled?: boolean | undefined;
  selected?: boolean | undefined;
}

function RovingToggleButton(props: RovingToggleButtonProps, ref: React.ForwardedRef<HTMLElement>) {
  const { children, disabled = false, selected = false } = props;
  const id = useId();
  const rovingItemProps = useRovingTabIndexItem({
    id,
    ref,
    disabled,
    selected,
  });

  return React.cloneElement(React.Children.only(children), {
    ...rovingItemProps,
    tabIndex: children.props.tabIndex ?? rovingItemProps.tabIndex,
  });
}

export default React.forwardRef(RovingToggleButton);
