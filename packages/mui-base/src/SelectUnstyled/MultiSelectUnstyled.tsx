import * as React from 'react';
import clsx from 'clsx';
import {
  unstable_useForkRef as useForkRef,
  unstable_useControlled as useControlled,
} from '@mui/utils';
import { MultiSelectUnstyledOwnerState, MultiSelectUnstyledProps } from './SelectUnstyledProps';
import {
  flattenOptionGroups,
  getOptionsFromChildren,
  useUtilityClasses,
  renderOption,
} from './utils';
import useSelect from './useSelect';
import { SelectChild, SelectOption } from './useSelectProps';
import { appendOwnerState } from '../utils';
import PopperUnstyled from '../PopperUnstyled';

function defaultRenderMultipleValues<TValue extends {}>(selectedOptions: SelectOption<TValue>[]) {
  return <React.Fragment>{selectedOptions.map((o) => o.label).join(', ')}</React.Fragment>;
}

/**
 * @ignore - internal component.
 */
const MultiSelectUnstyled = React.forwardRef(function MultiSelectUnstyled<TValue extends {}>(
  props: MultiSelectUnstyledProps<TValue>,
  ref: React.ForwardedRef<any>,
) {
  const {
    autoFocus,
    children,
    className,
    component,
    components = {},
    componentsProps = {},
    defaultListboxOpen = false,
    defaultValue = [],
    disabled: disabledProp,
    listboxId,
    listboxOpen: listboxOpenProp,
    onChange,
    onListboxOpenChange,
    renderValue = defaultRenderMultipleValues,
    value: valueProp,
    ...other
  } = props;

  const [groupedOptions, setGroupedOptions] = React.useState<SelectChild<TValue>[]>([]);
  const options = React.useMemo(() => flattenOptionGroups(groupedOptions), [groupedOptions]);
  const [listboxOpen, setListboxOpen] = useControlled({
    controlled: listboxOpenProp,
    default: defaultListboxOpen,
    name: 'SelectUnstyled',
    state: 'listboxOpen',
  });

  React.useEffect(() => {
    setGroupedOptions(getOptionsFromChildren(children));
  }, [children]);

  const buttonRef = React.useRef<HTMLElement | null>(null);

  const Button = component ?? components.Root ?? 'button';
  const ListboxRoot = components.ListboxRoot ?? 'ul';
  const ListboxOption = components.ListboxOption ?? 'li';
  const ListboxOptionGroupRoot = components.ListboxOptionGroupRoot ?? 'li';
  const ListboxOptionGroupHeader = components.ListboxOptionGroupHeader ?? 'span';
  const ListboxOptionGroupOptions = components.ListboxOptionGroupOptions ?? 'ul';

  const handleButtonRef = useForkRef(ref, buttonRef);

  const handleListboxRef = (element: HTMLUListElement) => {
    if (element != null) {
      // whenever the listbox is visible, it should be focused
      element.focus();
    }
  };

  React.useEffect(() => {
    if (autoFocus) {
      buttonRef.current!.focus();
    }
  }, [autoFocus]);

  const handleChange = (newValues: TValue[]) => {
    onChange?.(newValues);
  };

  const handleOpenChange = (isOpen: boolean) => {
    setListboxOpen(isOpen);
    onListboxOpenChange?.(isOpen);
  };

  const {
    buttonActive,
    buttonFocusVisible,
    disabled,
    getButtonProps,
    getListboxProps,
    getOptionProps,
    getOptionState,
    value,
  } = useSelect<TValue>({
    buttonComponent: Button,
    buttonRef: handleButtonRef,
    defaultValue,
    disabled: disabledProp,
    listboxId,
    listboxRef: handleListboxRef,
    multiple: true,
    onChange: handleChange,
    onOpenChange: handleOpenChange,
    open: listboxOpen,
    options,
    value: valueProp,
  });

  const ownerState: MultiSelectUnstyledOwnerState<TValue> = {
    ...props,
    active: buttonActive,
    defaultListboxOpen,
    disabled,
    focusVisible: buttonFocusVisible,
    open: listboxOpen,
    renderValue,
    value: value as TValue[],
  };

  const classes = useUtilityClasses(ownerState);

  const selectedOptions = React.useMemo(() => {
    if (value == null) {
      return [];
    }
    return options.filter((o) => (value as TValue[]).includes(o.value));
  }, [options, value]);

  const buttonProps = appendOwnerState(
    Button,
    {
      ...other,
      ...componentsProps.root,
      ...getButtonProps(),
      className: clsx(className, componentsProps.root?.className, classes.button),
    },
    ownerState,
  );

  const listboxProps = appendOwnerState(
    ListboxRoot,
    {
      ...componentsProps.listboxRoot,
      ...getListboxProps(),
      className: clsx(componentsProps.listboxRoot?.className, classes.listbox),
    },
    ownerState,
  );

  const getRenderOptionParameters = (option: SelectChild<TValue>, itemIndex: number) => ({
    option,
    itemIndex,
    getOptionState,
    getOptionProps,
    listboxOption: ListboxOption,
    listboxOptionGroupRoot: ListboxOptionGroupRoot,
    listboxOptionGroupHeader: ListboxOptionGroupHeader,
    listboxOptionGroupOptions: ListboxOptionGroupOptions,
    componentsProps,
    ownerState,
    optionClassName: classes.option,
  });

  return (
    <React.Fragment>
      <Button {...buttonProps}>{renderValue(selectedOptions as any)}</Button>
      <PopperUnstyled
        open={listboxOpen}
        anchorEl={buttonRef.current}
        placement="bottom-start"
        disablePortal
        role={undefined}
      >
        <ListboxRoot {...listboxProps}>
          {groupedOptions.map((option, index) =>
            renderOption(getRenderOptionParameters(option, index)),
          )}
        </ListboxRoot>
      </PopperUnstyled>
    </React.Fragment>
  );
});

export default MultiSelectUnstyled as <TValue>(
  props: MultiSelectUnstyledProps<TValue> & Pick<React.ComponentPropsWithRef<'ul'>, 'ref'>,
) => React.ReactElement;
