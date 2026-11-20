# Styling

These rules apply to any new Material UI component; none of them depends on Base UI. They come from the review of the NumberField ([#49275](https://github.com/mui/material-ui/pull/49275)).

## Variant rules

Write a `variants` rule as an object when it checks equality, including several keys at once:

```ts
{ props: { size: 'medium' }, style: { … } },
{ props: { controlsPosition: 'stacked', size: 'small' }, style: { … } },
```

Write a callback only when the check needs other logic, such as `!==` or `||`:

```ts
{ props: ({ ownerState }) => ownerState.disabled || ownerState.readOnly, style: { … } },
```

The two forms read props differently (`packages/mui-system/src/createStyled/createStyled.ts`, `processStyleVariants`):

- An object rule matches a key when the slot's own prop **or** `ownerState` has the value.
- A callback receives `{ ...props, ...props.ownerState }`, so `ownerState` wins over the slot's own prop.

## Typing variants

When a style's `variants` include a callback or a hand-written object rule, annotate the style function's return type with `Interpolation<Props>` from `../styles`. Never annotate or cast a callback's parameter.

```ts
import type { Interpolation } from '../styles';

interface NumberFieldButtonStyleProps {
  ownerState: Omit<NumberFieldOwnerState, 'size'> & { size?: IconButtonProps['size'] | undefined };
}

const buttonStyles = memoTheme(({ theme }): Interpolation<NumberFieldButtonStyleProps> => ({
  variants: [
    { props: { size: 'small' }, style: { … } },
    { props: ({ ownerState }) => ownerState.controlsPosition !== 'split', style: { … } },
  ],
}));
```

- `Props` holds `ownerState` plus any slot prop that a rule reads, such as a `data-*` attribute.
- Use the return annotation, not the type argument `memoTheme<Props>(…)`. Only the annotation checks object rules: it rejects an unknown key or a value outside the prop's type.
- The annotation needs a `memoTheme` that accepts `Interpolation<Props>`. If `packages/mui-material/src/utils/memoTheme.ts` only accepts `CSSInterpolation`, add an overload. The first overload keeps today's signature, so existing callers do not change:

  ```ts
  import { unstable_memoTheme } from '@mui/system';
  import type { CSSInterpolation, Interpolation } from '../styles';
  import type { Theme } from '../styles/createTheme';

  type ThemeProps = { theme: Theme };

  function memoTheme(
    styleFn: (props: ThemeProps) => CSSInterpolation,
  ): (props: ThemeProps) => CSSInterpolation;
  function memoTheme<Props>(
    styleFn: (props: ThemeProps) => Interpolation<Props>,
  ): (props: ThemeProps) => Interpolation<Props>;
  function memoTheme(styleFn: (props: ThemeProps) => any) {
    return unstable_memoTheme<Theme>(styleFn);
  }
  ```

- A style object passed to `styled()` without `memoTheme` takes the same type: `const inputStyles: Interpolation<{ ownerState: NumberFieldOwnerState }> = { … }`. Without it, `styled()` turns the object rule's keys into required props of the styled component.
- Leave rules generated from the palette (`Object.entries(theme.palette).filter(createSimplePaletteValueFilter())`) without the annotation, as `LinearProgress` does. The loop types `color` as `string`, which only a cast would satisfy.

## A slot prop with the same name as an `ownerState` key

A slot can have its own value for a key that the component's `ownerState` also holds, such as a stepper button's `size` and the field's `size`. Because both rule forms let `ownerState` match, rules for the slot's own value never win: `<NumberField size="medium" slotProps={{ incrementButton: { size: 'small' } }} />` kept the medium padding.

Put the slot's resolved value into the slot's `ownerState`, so both agree, and type `ownerState` in the style's `Props` with the slot's type:

```ts
appendOwnerState(ButtonSlot, mergedProps, {
  ...ownerState,
  size: buttonProps.size,
});
```

Test it in Chromium with the slot's value set differently from the component's (see [testing.md](testing.md)).

## Theme overrides

- Never set `overridesResolver` on a `styled()` call. The default resolver applies `styleOverrides[<slot>]` for the slot's own name, which is the direction in [#47787](https://github.com/mui/material-ui/issues/47787).
- `styleOverrides` keys are the component's styled slots. An element that no styled slot of the component renders, such as the native input inside `InputBase`, gets no key. Document a nested selector on `root` instead: ``[`& .${numberFieldClasses.htmlInput}`]: { … }``.
- A live state gets a utility class on the root, not a `styleOverrides` key. Users write ``[`&.${numberFieldClasses.scrubbing}`]: { … }`` inside `root`. `TextField` follows the same pattern: only a `root` class, and `htmlInput` reached through `slotProps`.

## Composing Material inputs

When a part renders inside an `InputAdornment`, or the component switches between the `standard`, `filled`, and `outlined` inputs, check the layout in Chromium for every variant and position. The filled input gives a start adornment `marginTop: 16` when the field has a label, which put one split control 8px lower than the other. Add a Chromium test that compares the positions.
