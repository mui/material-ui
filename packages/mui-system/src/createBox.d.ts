import Box from './Box';

export default function createBox(options?: {
  defaultTheme: object;
  defaultClassName?: string;
  generateClassName?: (componentName: string) => string;
}): typeof Box;
