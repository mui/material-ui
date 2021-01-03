export default function generateUtilityClasses<T extends keyof any>(
  componentName: string,
  slots: T[]
): Record<T, string>;
