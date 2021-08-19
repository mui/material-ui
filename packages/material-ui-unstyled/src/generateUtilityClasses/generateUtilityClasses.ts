import generateUtilityClass from '../generateUtilityClass';

export default function generateUtilityClasses<T extends string>(
  componentName: string,
  slots: T[],
): Record<T, string> {
  const result: Record<string, string> = {};

  slots.forEach((slot) => {
    result[slot] = generateUtilityClass(componentName, slot);
  });

  return result;
}
