import capitalize from './capitalize';

/**
 * Declares a styling layer's appearance vocabulary.
 *
 * Props like `color` and `size` select an appearance and have no behaviour, so
 * they belong to whichever styling layer is in use rather than to the component.
 * This turns a declaration of them into the `appearance` prop that an unstyled
 * component accepts.
 *
 * Nothing here is specific to Material Design. A different styling layer
 * declares a different vocabulary, with different prop names, different values
 * and different class names, and the component underneath is unchanged.
 *
 * Each entry describes one prop:
 *
 *   className  value -> class key, or null for no class. This is what lets one
 *              vocabulary produce `colorPrimary`, another produce `contained`,
 *              and a boolean produce `fullWidth` or nothing.
 *   values     the known values, used to tell the styled layer which
 *              `styleOverrides` keys exist. Open-ended props give a `prefix`
 *              instead.
 *   prefix     for values that cannot be listed, such as a palette colour a
 *              theme adds.
 *   default    applied when the prop is absent.
 *   slot       which slot carries the class. Defaults to the root.
 */
export default function createAppearance(modifiers) {
  const entries = Object.entries(modifiers);

  /** Class keys this vocabulary can produce, per slot, for the overridesResolver. */
  const classes = {};
  const prefixes = [];

  entries.forEach(([, modifier]) => {
    const slot = modifier.slot ?? 'root';
    classes[slot] ??= [];
    (modifier.values ?? []).forEach((value) => {
      const key = modifier.className(value);
      if (key) {
        classes[slot].push(key);
      }
    });
    if (modifier.prefix) {
      prefixes.push(modifier.prefix);
    }
  });

  /**
   * Reads the appearance props off a component's props and returns the two
   * things the unstyled component needs.
   */
  function resolve(props) {
    const ownerState = {};
    const slotClasses = {};

    entries.forEach(([name, modifier]) => {
      const value = props[name] ?? modifier.default;
      if (value === undefined) {
        return;
      }
      // Kept so existing `styleOverrides` callbacks and theme `variants` still
      // match. Expected to be phased out in userland.
      ownerState[name] = value;

      const key = modifier.className(value);
      if (key) {
        const slot = modifier.slot ?? 'root';
        slotClasses[slot] ??= [];
        slotClasses[slot].push(key);
      }
    });

    return { ownerState, classes: slotClasses };
  }

  return { resolve, classes, prefixes, propNames: entries.map(([name]) => name) };
}

/** The two naming patterns Material uses most: `colorPrimary`, and a bare value. */
export const prefixed = (prop) => (value) => `${prop}${capitalize(value)}`;
export const bare = (value) => value;
export const whenTrue = (key) => (value) => (value ? key : null);
