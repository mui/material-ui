import { styled } from '../zero-styled';
import capitalize from './capitalize';

/**
 * Builds one styled shell per slot from an unstyled component's slot declaration.
 *
 * The shells exist so `sx`, `styleOverrides` and theme `variants` keep working;
 * `@mui/material` passes its style bodies in unchanged. The generated
 * `overridesResolver` selects overrides with a class selector rather than by
 * reading `ownerState`, so it never touches `props`.
 *
 * @param {object} def the slot declaration from the unstyled component
 * @param {(slot: string) => string} getUtilityClass resolves a class key to its full name
 * @param {object} styles style bodies, keyed by slot name
 */
export default function createStyledSlots(def, getUtilityClass, styles = {}) {
  const result = {};

  Object.entries(def.slots).forEach(([slotName, slot]) => {
    // A slot with no classes and no styles has nothing for a shell to do, and
    // wrapping it would give it an Emotion class it does not have today.
    if (slot.classes.length === 0 && !styles[slotName]) {
      return;
    }

    const declared = new Set(slot.classes);

    // A prefix only applies to a slot that already declares a class using it —
    // the root declares `colorPrimary`, so a theme adding `palette.brand` can
    // also override `colorBrand` there, but the thumb carries no colour class.
    const prefixes = (def.dynamicPrefixes || []).filter((prefix) =>
      slot.classes.some((cls) => cls.startsWith(prefix)),
    );
    const isDynamic = (key) =>
      prefixes.some((prefix) => key.startsWith(prefix) && key.length > prefix.length);

    result[slotName] = styled(slot.elementType, {
      name: def.name,
      slot: capitalize(slotName),
      overridesResolver: (props, themeStyles) => [
        themeStyles[slotName],
        // Resolve the class name rather than reading it off the classes object:
        // some emitted classes are absent from it (`MuiSlider-sizeMedium`), and
        // the global state classes resolve to `Mui-*` rather than `MuiSlider-*`.
        ...Object.keys(themeStyles)
          .filter(
            (key) => key !== slotName && themeStyles[key] && (declared.has(key) || isDynamic(key)),
          )
          .map((key) => ({ [`&.${getUtilityClass(key)}`]: themeStyles[key] })),
      ],
    })(styles[slotName] ?? {});
  });

  return result;
}
