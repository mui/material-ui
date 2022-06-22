import Box from './Box';
import styleFunctionSx from './styleFunctionSx';

export default function createBox(options?: {
  defaultTheme: object;
  defaultClassName?: string;
  generateClassName?: (componentName: string) => string;
  styleFunctionSx?: typeof styleFunctionSx;
}): typeof Box;
