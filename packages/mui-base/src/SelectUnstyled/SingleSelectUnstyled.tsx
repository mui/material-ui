import * as React from 'react';
import clsx from 'clsx';
import {
  unstable_useForkRef as useForkRef,
  unstable_useControlled as useControlled,
} from '@mui/utils';
import { SelectUnstyledOwnerState, SingleSelectUnstyledOwnProps } from './SelectUnstyledProps';
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

function defaultRenderSingleValue<TValue extends {}>(selectedOption: SelectOption<TValue> | null) {
  return selectedOption?.label ?? '';
}

/**
 * @ignore Internal component
 */
const SingleSelectUnstyled = React.forwardRef(function SingleSelectUnstyled<TValue extends {}>(
  props: SingleSelectUnstyledOwnProps<TValue>,
  ref: React.ForwardedRef<any>,
) {
  const {
    autoFocus,
    children,
    className,
    components = {},
    componentsProps = {},
    defaultValue,
    defaultListboxOpen = false,
    disabled: disabledProp,
    listboxId,
    listboxOpen: listboxOpenProp,
    onChange,
    onListboxOpenChange,
    renderValue = defaultRenderSingleValue,
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

  const Button = components.Button ?? 'button';
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

  const handleChange = (newValue: TValue | null) => {
    onChange?.(newValue);
    setListboxOpen(false);
    buttonRef.current?.focus();
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
  } = useSelect({
    buttonComponent: Button,
    buttonRef: handleButtonRef,
    defaultValue,
    disabled: disabledProp,
    listboxId,
    listboxRef: handleListboxRef,
    onChange: handleChange,
    onOpenChange: handleOpenChange,
    open: listboxOpen,
    options,
    value: valueProp,
  });

  const ownerState: SelectUnstyledOwnerState = {
    active: buttonActive,
    disabled,
    open: listboxOpen,
    focusVisible: buttonFocusVisible,
  };

  const classes = useUtilityClasses(ownerState);

  const selectedOptions = React.useMemo(() => {
    return options.find((o) => value === o.value);
  }, [options, value]);

  const buttonProps = appendOwnerState(
    Button,
    {
      ...other,
      ...componentsProps.button,
      ...getButtonProps(),
      className: clsx(className, componentsProps.button?.className, classes.button),
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
}) as <TValue>(
  props: SingleSelectUnstyledOwnProps<TValue> & Pick<React.ComponentPropsWithRef<'ul'>, 'ref'>,
) => React.ReactElement;

export default SingleSelectUnstyled;
