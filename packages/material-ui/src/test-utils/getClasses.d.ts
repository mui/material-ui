/**
 * @deprecated
 * @param element
 * @param options
 */
export default function getClasses<T = { [name: string]: string }>(
  element: React.ReactElement,
  options?: Partial<{ withTheme: boolean }>
): T;
