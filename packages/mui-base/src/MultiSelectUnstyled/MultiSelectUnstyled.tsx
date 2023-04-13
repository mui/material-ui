let warnedOnce = false;

const warn = () => {
  if (!warnedOnce) {
    console.error(
      [
        'Base UI: The MultiSelectUnstyled component was removed from the library.',
        '',
        'The multi-select functionality is now available in the SelectUnstyled component.',
        'Replace <MultiSelectUnstyled> with <SelectUnstyled multiple /> in your code to remove this error.',
      ].join('\n'),
    );

    warnedOnce = true;
  }
};

/**
 * The foundation for building custom-styled multi-selection select components.
 *
 * @deprecated The multi-select functionality is now available in the SelectUnstyled component. Replace <MultiSelectUnstyled> with <SelectUnstyled multiple /> in your code.
 * @ignore - do not document.
 */
export default function MultiSelectUnstyled() {
  warn();
  return null;
}
