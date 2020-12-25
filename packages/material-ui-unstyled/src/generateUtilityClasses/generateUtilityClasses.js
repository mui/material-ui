import generateUtilityClass from '../generateUtilityClass';

export default function generateUtilityClasses(componentName, slots) {
  const result = {};

  slots.forEach((slot) => {
    result[slot] = generateUtilityClass(componentName, slot);
  });

  return result;
}
