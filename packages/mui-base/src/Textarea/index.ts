'use client';
import { Textarea } from './Textarea';
import { TextareaInput } from './TextareaInput';

type TextareaRootExport = typeof Textarea & {
  Input: typeof TextareaInput;
};

const textareaExport = Textarea as TextareaRootExport;
textareaExport.Input = TextareaInput;

export { textareaExport as Textarea };

export * from './Textarea.types';
