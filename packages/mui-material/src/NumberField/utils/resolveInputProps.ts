import resolveComponentProps from '@mui/utils/resolveComponentProps';

import type { NumberFieldOwnerState, NumberFieldProps } from '../NumberField.types';
import omitNullishEventHandlers from './omitNullishEventHandlers';

type SlotProps = NonNullable<NumberFieldProps['slotProps']>;
type ResolvedSlotProps<T> = Exclude<
  T,
  ((ownerState: NumberFieldOwnerState) => unknown) | undefined
>;
export type ResolvedInputSlotProps = ResolvedSlotProps<SlotProps['input']>;

let warnedAboutSlotName = false;

/** Resolves the wrapper and native props before Base UI composes its input handlers and ref. */
export default function resolveInputProps(
  slotProps: SlotProps,
  ownerState: NumberFieldOwnerState,
): {
  materialInputProps: ResolvedInputSlotProps;
  nativeSlotProps: ResolvedSlotProps<SlotProps['htmlInput']>;
} {
  // Ignore unsupported wrapper props passed by JavaScript callers.
  const {
    onKeyDown,
    onKeyUp,
    value,
    defaultValue,
    name: inputName,
    type,
    multiline,
    rows,
    minRows,
    maxRows,
    inputProps: ignoredInputProps,
    slotProps: wrapperSlotProps,
    ...materialInputProps
  } = resolveComponentProps(slotProps.input, ownerState) ?? {};

  // InputBase applies its nested input slot last. Only NumberField's htmlInput configures it.
  const { input: ignoredNativeSlot, ...materialSlotProps } = wrapperSlotProps ?? {};
  const nativeSlotProps = resolveComponentProps(slotProps.htmlInput, ownerState) ?? {};

  if (process.env.NODE_ENV !== 'production') {
    if (!warnedAboutSlotName && !ownerState.name && (inputName || nativeSlotProps.name)) {
      warnedAboutSlotName = true;
      console.warn(
        'MUI: NumberField ignores `name` on its input slots. ' +
          'Set `name` directly on NumberField to submit its numeric value.',
      );
    }
  }

  return {
    materialInputProps: {
      ...materialInputProps,
      slotProps: materialSlotProps,
    },
    nativeSlotProps: omitNullishEventHandlers(
      nativeSlotProps,
      ([key]) => key !== 'value' && key !== 'defaultValue' && key !== 'type' && key !== 'name',
    ),
  };
}
