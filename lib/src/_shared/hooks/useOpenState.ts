import * as React from 'react';
import { BasePickerProps } from '../../typings/BasePicker';

export function useOpenState({ open, onOpen, onClose }: BasePickerProps<any, any>) {
  const isControllingOpenProp = React.useRef(typeof open === 'boolean').current;
  const [_open, _setIsOpen] = React.useState(false);

  // It is required to update inner state in useEffect in order to avoid situation when
  // Our component is not mounted yet, but `open` state is set to `true` (e.g. initially opened)
  React.useEffect(() => {
    if (isControllingOpenProp) {
      if (typeof open !== 'boolean') {
        throw new Error('You must not mix controlling and uncontrolled mode for `open` prop');
      }

      _setIsOpen(open);
    }
  }, [isControllingOpenProp, open]);

  const setIsOpen = React.useCallback(
    (newIsOpen: boolean) => {
      if (!isControllingOpenProp) {
        _setIsOpen(newIsOpen);
      }

      return newIsOpen ? onOpen && onOpen() : onClose && onClose();
    },
    [isControllingOpenProp, onOpen, onClose]
  );

  return { isOpen: _open, setIsOpen };
}
