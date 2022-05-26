import { useTabContext, getTabId, getPanelId } from '../TabsUnstyled';
import { useButton } from '../ButtonUnstyled';
import { UseTabParameters, UseTabRootSlotProps } from './useTab.types';
import { EventHandlers } from '../utils';

const useTab = (parameters: UseTabParameters) => {
  const { value: valueProp, onChange, onClick, onFocus } = parameters;

  const { getRootProps: getRootPropsButton, ...otherButtonProps } = useButton(parameters);

  const context = useTabContext();
  if (context === null) {
    throw new Error('No TabContext provided');
  }

  const value = valueProp ?? 0;
  const selected = context.value === value;
  const selectionFollowsFocus = context.selectionFollowsFocus;

  const a11yAttributes = {
    role: 'tab',
    'aria-controls': getPanelId(context, value) ?? undefined,
    id: getTabId(context, value) ?? undefined,
    'aria-selected': selected,
    disabled: otherButtonProps.disabled,
  };

  const createHandleFocus =
    (otherHandlers: EventHandlers) => (event: React.FocusEvent<HTMLButtonElement, Element>) => {
      otherHandlers.onFocus?.(event);
      if (event.defaultPrevented) {
        return;
      }

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

  const createHandleClick =
    (otherHandlers: EventHandlers) => (event: React.MouseEvent<Element, MouseEvent>) => {
      otherHandlers.onClick?.(event);
      if (event.defaultPrevented) {
        return;
      }

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

  const getRootProps = <TOther extends EventHandlers>(
    otherHandlers: TOther = {} as TOther,
  ): UseTabRootSlotProps<TOther> => {
    const buttonResolvedProps = getRootPropsButton({
      ...otherHandlers,
      onClick: createHandleClick(otherHandlers),
      onFocus: createHandleFocus(otherHandlers),
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
