import * as React from 'react';
import useEventCallback from '@mui/utils/useEventCallback';
import DialogsContext from './DialogsContext';
import type { DialogComponent, OpenDialog, OpenDialogOptions } from './useDialogs';

interface DialogStackEntry<P, R> {
  key: string;
  open: boolean;
  promise: Promise<R>;
  Component: DialogComponent<P, R>;
  payload: P;
  onClose: (result: R) => Promise<void>;
  resolve: (result: R) => void;
}

export interface DialogProviderProps {
  children?: React.ReactNode;
  unmountAfter?: number;
}

/**
 * Provider for Dialog stacks. The subtree of this component can use the `useDialogs` hook to
 * access the dialogs API. The dialogs are rendered in the order they are requested.
 */
export default function DialogsProvider(props: DialogProviderProps) {
  const { children, unmountAfter = 1000 } = props;
  const [stack, setStack] = React.useState<DialogStackEntry<any, any>[]>([]);
  const keyPrefix = React.useId();
  const nextId = React.useRef(0);
  const dialogMetadata = React.useRef(
    new WeakMap<Promise<any>, DialogStackEntry<any, any>>(),
  );

  const requestDialog = useEventCallback<OpenDialog>(function open<P, R>(
    Component: DialogComponent<P, R>,
    payload: P,
    options: OpenDialogOptions<R> = {},
  ) {
    const { onClose = async () => {} } = options;
    let resolve: ((result: R) => void) | undefined;
    const promise = new Promise<R>((resolveImpl) => {
      resolve = resolveImpl;
    });

    if (!resolve) {
      throw new Error('resolve not set.');
    }

    const key = `${keyPrefix}-${nextId.current}`;
    nextId.current += 1;

    const newEntry: DialogStackEntry<P, R> = {
      key,
      open: true,
      promise,
      Component,
      payload,
      onClose,
      resolve,
    };

    // Store metadata for reliable access during close
    dialogMetadata.current.set(promise, newEntry);

    setStack((prevStack) => [...prevStack, newEntry]);
    return promise;
  });

  const closeDialogUi = useEventCallback(function closeDialogUi<R>(
    dialog: Promise<R>,
  ) {
    setStack((prevStack) =>
      prevStack.map((entry) =>
        entry.promise === dialog ? { ...entry, open: false } : entry,
      ),
    );
    setTimeout(() => {
      // wait for closing animation
      setStack((prevStack) => prevStack.filter((entry) => entry.promise !== dialog));
      // WeakMap automatically cleans up when promise is garbage collected
    }, unmountAfter);
  });

  const closeDialog = useEventCallback(async function closeDialog<R>(
    dialog: Promise<R>,
    result: R,
  ) {
    const entryToClose = dialogMetadata.current.get(dialog);
    if (!entryToClose) {
      throw new Error('Dialog not found.');
    }

    try {
      await entryToClose.onClose(result);
    } finally {
      entryToClose.resolve(result);
      closeDialogUi(dialog);
    }
    return dialog;
  });

  const contextValue = React.useMemo(
    () => ({ open: requestDialog, close: closeDialog }),
    [requestDialog, closeDialog],
  );

  return (
    <DialogsContext.Provider value={contextValue}>
      {children}
      {stack.map(({ key, open, Component, payload, promise }) => (
        <Component
          key={key}
          payload={payload}
          open={open}
          onClose={async (result) => {
            await closeDialog(promise, result);
          }}
        />
      ))}
    </DialogsContext.Provider>
  );
}
