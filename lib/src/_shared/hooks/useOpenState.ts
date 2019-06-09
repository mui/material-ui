/* eslint-disable react-hooks/rules-of-hooks */
import { useCallback, useState } from 'react';
import { BasePickerProps } from '../../typings/BasePicker';

function makeControlledOpenProps(props: BasePickerProps) {
  return {
    isOpen: props.open!,
    setIsOpen: (newIsOpen: boolean) => {
      return newIsOpen ? props.onOpen && props.onOpen() : props.onClose && props.onClose();
    },
  };
}

export function useOpenState(props: BasePickerProps) {
  if (props.open !== undefined && props.open !== null) {
    return makeControlledOpenProps(props);
  }

  const [isOpen, setIsOpenState] = useState(false);
  // prettier-ignore
  const setIsOpen = useCallback((newIsOpen: boolean) => {
    setIsOpenState(newIsOpen);

    return newIsOpen
      ? props.onOpen && props.onOpen()
      : props.onClose && props.onClose();
  }, [props]);

  return { isOpen, setIsOpen };
}
