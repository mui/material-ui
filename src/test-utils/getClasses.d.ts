export default function getClasses<T = { [name: string]: string }>(
  element: React.ReactElement<any>,
  options?: Partial<{ withTheme: boolean }>,
): T;
