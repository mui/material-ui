/* eslint
     no-restricted-syntax: 0
     prefer-template: 0
     no-unreachable-loop: 0
   ---
   These rules are preventing the performance optimizations below.
 */

export default function composeClasses<ClassKey extends string>(
  slots: Record<ClassKey, ReadonlyArray<string | false | undefined | null>>,
  getUtilityClass: (slot: string) => string,
  classes: Record<string, string> | undefined = undefined,
): Record<ClassKey, string> {
  const output = {} as Record<ClassKey, string>;

  /* This is split in 2 loops for performance reasons, as it allows to avoid the `if (classes)`
   * check in both of those cases. If `classes` is either `{}` or `undefined`, we consider it empty. */
  if (isEmpty(classes)) {
    for (const slotName in slots) {
      if (Object.prototype.hasOwnProperty.call(slots, slotName)) {
        const slotNames = slots[slotName];

        let result = '';
        for (let i = 0; i < slotNames.length; i += 1) {
          const slotPart = slotNames[i];
          if (slotPart) {
            const utilityClass = getUtilityClass(slotPart);
            if (utilityClass) {
              result += ' ' + utilityClass;
            }
          }
        }
        output[slotName] = result;
      }
    }
  } else {
    for (const slotName in slots) {
      if (Object.prototype.hasOwnProperty.call(slots, slotName)) {
        const slotNames = slots[slotName];

        let result = '';
        for (let i = 0; i < slotNames.length; i += 1) {
          const slotPart = slotNames[i];
          if (slotPart) {
            const utilityClass = getUtilityClass(slotPart);
            if (utilityClass) {
              result += ' ' + utilityClass;
            }
            if (classes[slotPart]) {
              result += ' ' + classes[slotPart];
            }
          }
        }
        output[slotName] = result;
      }
    }
  }

  return output;
}

function isEmpty(value: object | undefined): value is undefined {
  if (!value) {
    return true;
  }
  for (const key in value) {
    if (Object.prototype.hasOwnProperty.call(value, key)) {
      return false;
    }
  }
  return true;
}
