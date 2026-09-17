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
 * @param {object} [appearance] this styling layer's vocabulary, from
 *   `createAppearance`. Its class keys are override keys too, so they have to be
 *   resolvable even though the unstyled component knows nothing about them.
 */
export default function createStyledSlots(def, getUtilityClass, styles, appearance) {
  const result = {};

  Object.entries(def.slots).forEach(([slotName, slot]) => {
    const appearanceClasses = appearance?.classes?.[slotName] ?? [];
    const slotStyles = styles?.[slotName];

    // A slot with no classes and no styles has nothing for a shell to do, and
    // wrapping it would give it an Emotion class it does not have today.
    if (slot.classes.length === 0 && appearanceClasses.length === 0 && !slotStyles) {
      return;
    }

    const declared = new Set([...slot.classes, ...appearanceClasses]);

    // A prefix only applies to a slot that already declares a class using it,
    // so a theme adding `palette.brand` can override `colorBrand` on the root
    // while the thumb, which carries no colour class, is left alone.
    const prefixes = (appearance?.prefixes ?? []).filter((prefix) =>
      appearanceClasses.some((cls) => cls.startsWith(prefix)),
    );
    const isDynamic = (key) =>
      prefixes.some((prefix) => key.startsWith(prefix) && key.length > prefix.length);

    result[slotName] = styled(slot.elementType, {
      name: def.name,
      slot: capitalize(slotName),
      // Escape hatch for slots whose root is another component that takes props
      // of its own. Button's is `ButtonBase`, which needs `classes` forwarded to
      // it rather than filtered off as a styling prop.
      ...slot.styledOptions,
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
    })(slotStyles ?? {});
  });

  return result;
}
