import Box from './Box';

export default function createBox(options?: {
  defaultTheme: object;
  defaultClassName?: string;
  generateClassName?: () => string;
}): typeof Box;
