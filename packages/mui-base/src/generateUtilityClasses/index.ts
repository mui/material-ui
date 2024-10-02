import { generateUtilityClass } from '../generateUtilityClass';

export function generateUtilityClasses<T extends string>(
  componentName: string,
  slots: T[],
): Record<T, string> {
  const result = {} as Record<T, string>;

  slots.forEach((slot) => {
    result[slot] = generateUtilityClass(componentName, slot);
  });

  return result;
}
