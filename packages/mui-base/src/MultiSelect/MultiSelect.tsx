'use client';
let warnedOnce = false;

const warn = () => {
  if (!warnedOnce) {
    console.error(
      [
        'Base UI: The MultiSelect component was removed from the library.',
        '',
        'The multi-select functionality is now available in the Select component.',
        'Replace <MultiSelect> with <Select multiple /> in your code to remove this error.',
      ].join('\n'),
    );

    warnedOnce = true;
  }
};

/**
 * The foundation for building custom-styled multi-selection select components.
 *
 * @deprecated The multi-select functionality is now available in the Select component. Replace <MultiSelect> with <Select multiple /> in your code.
 * @ignore - do not document.
 */
export function MultiSelect() {
  warn();
  return null;
}
