import { useTabContext, getTabId, getPanelId } from '../TabsUnstyled';
import { useButton } from '../ButtonUnstyled';

export interface UseTabProps {
  /**
   * You can provide your own value. Otherwise, we fall back to the child position index.
   */
  value?: number | string;
  /**
   * Callback invoked when new value is being set.
   */
  onChange?: (event: React.SyntheticEvent, value: number | string) => void;
  onClick?: React.MouseEventHandler;
  disabled?: boolean;
  onFocus?: React.FocusEventHandler;
  ref: React.Ref<any>;
}

const useTab = (props: UseTabProps) => {
  const { value: valueProp, onChange, onClick, onFocus } = props;

  const { getRootProps: getRootPropsButton, ...otherButtonProps } = useButton(props);

  const context = useTabContext();
  if (context === null) {
    throw new Error('No TabContext provided');
  }

  const value = valueProp ?? 0;
  const selected = context.value === value;
  const selectionFollowsFocus = context.selectionFollowsFocus;

  const a11yAttributes = {
    role: 'tab',
    'aria-controls': getPanelId(context, value),
    id: getTabId(context, value),
    'aria-selected': selected,
    disabled: otherButtonProps.disabled,
  };

  const handleFocus = (event: React.FocusEvent<HTMLButtonElement, Element>) => {
    if (selectionFollowsFocus && !selected) {
      if (onChange) {
        onChange(event, value);
      }
      context.onSelected(event, value);
    }

    if (onFocus) {
      onFocus(event);
    }
  };

  const handleClick = (event: React.MouseEvent<Element, MouseEvent>) => {
    if (!selected) {
      if (onChange) {
        onChange(event, value);
      }
      context.onSelected(event, value);
    }

    if (onClick) {
      onClick(event);
    }
  };

  const getRootProps = (otherHandlers?: Record<string, React.EventHandler<any>>) => {
    const buttonResolvedProps = getRootPropsButton({
      onClick: handleClick,
      onFocus: handleFocus,
      ...otherHandlers,
    });

    return {
      ...buttonResolvedProps,
      ...a11yAttributes,
    };
  };

  return {
    getRootProps,
    ...otherButtonProps,
    selected,
  };
};

export default useTab;
