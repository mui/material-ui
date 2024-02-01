'use client';
import { Input } from './Input';
import { InputInput } from './InputInput';

type InputRootExport = typeof Input & {
  Input: typeof InputInput;
};

const inputExport = Input as InputRootExport;
inputExport.Input = InputInput;

export { inputExport as Input };

export * from './Input.types';
export * from './inputClasses';
