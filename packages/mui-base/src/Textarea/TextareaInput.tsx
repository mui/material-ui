import * as React from 'react';
import clsx from 'clsx';
import { unstable_useForkRef as useForkRef } from '@mui/utils';
import { TextareaContext } from './TextareaContext';
import { TextareaAutosize, type TextareaAutosizeProps } from '../TextareaAutosize';
import { textboxClasses as classes } from '../Textbox';

/**
 * @ignore - do not document.
 */
const TextareaInput = React.forwardRef(function TextareaInput(
  props: TextareaAutosizeProps,
  forwardedRef: React.ForwardedRef<HTMLTextAreaElement>,
) {
  const { className, ...other } = props;

  const context = React.useContext(TextareaContext);
  if (!context) {
    throw new Error('TextareaInput must be used within an Textarea');
  }

  const updateRef = React.useCallback(
    (element: HTMLElement | null) => {
      context.registerInput(element);
    },
    [context],
  );

  const handleRef = useForkRef(forwardedRef, updateRef);

  console.log(context);

  const textareaProps = {
    defaultValue: context.defaultValue,
    value: context.value,
    ...other,
    className: clsx(className, classes.input),
    ref: handleRef,
  };

  return <TextareaAutosize {...textareaProps} />;
});

export { TextareaInput };
