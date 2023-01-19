import * as React from 'react';
import { SelectUnstyledContext } from '../SelectUnstyled';

interface UseOptionParameters<Value> {
  disabled: boolean;
  value: Value;
}

interface UseOptionReturnValue {}

export default function useOption<Value>(params: UseOptionParameters<Value>): UseOptionReturnValue {
  const { value } = params;

  const selectContext = React.useContext(SelectUnstyledContext);
  if (!selectContext) {
    throw new Error('OptionUnstyled must be used within a SelectUnstyled');
  }

  const optionState = selectContext.getOptionState(value);
  const optionProps = selectContext.getOptionProps(value);

  return {
    getRootProps: () => optionProps,
    selected: optionState.selected,
    disabled: optionState.disabled,
    highlighted: optionState.highlighted,
  };
}
