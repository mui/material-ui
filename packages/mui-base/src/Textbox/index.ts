'use client';
import { Textbox } from './Textbox';
import { TextboxInput } from './TextboxInput';

type TextboxRootExport = typeof Textbox & {
  Input: typeof TextboxInput;
};

const textboxExport = Textbox as TextboxRootExport;
textboxExport.Input = TextboxInput;

export { textboxExport as Textbox };

export * from './Textbox.types';
export * from './TextboxInput.types';
export * from './textboxClasses';
