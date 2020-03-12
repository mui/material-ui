/* eslint-disable react-hooks/rules-of-hooks */
import { BasePickerProps } from '../../typings/BasePicker';
import { useCallback, useState, Dispatch, SetStateAction } from 'react';

export function useOpenState({ open, onOpen, onClose }: BasePickerProps<any, any>) {
  let setIsOpenState: null | Dispatch<SetStateAction<boolean>> = null;
  if (open === undefined || open === null) {
    // The component is uncontrolled, so we need to give it its own state.
    [open, setIsOpenState] = useState<boolean>(false);
  }

  // prettier-ignore
  const setIsOpen = useCallback((newIsOpen: boolean) => {
    setIsOpenState && setIsOpenState(newIsOpen);

    return newIsOpen
      ? onOpen && onOpen()
      : onClose && onClose();
  }, [onOpen, onClose, setIsOpenState]);

  return { isOpen: open, setIsOpen };
}
