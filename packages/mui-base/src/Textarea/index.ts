'use client';
import { Textarea } from './Textarea';
import { TextareaAutosize } from '../TextareaAutosize';

type TextareaRootExport = typeof Textarea & {
  Input: typeof TextareaAutosize;
};

const textareaExport = Textarea as TextareaRootExport;
textareaExport.Input = TextareaAutosize;

export { textareaExport as Textarea };

export * from './Textarea.types';
// export * from './TextareaInput.types';
// export * from './textareaClasses';
