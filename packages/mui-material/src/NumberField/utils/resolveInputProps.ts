import resolveComponentProps from '@mui/utils/resolveComponentProps';

import type { NumberFieldOwnerState, NumberFieldProps } from '../NumberField.types';
import omitNullishEventHandlers from './omitNullishEventHandlers';

type SlotProps = NonNullable<NumberFieldProps['slotProps']>;
type ResolvedSlotProps<T> = Exclude<
  T,
  ((ownerState: NumberFieldOwnerState) => unknown) | undefined
>;
export type ResolvedInputSlotProps = ResolvedSlotProps<SlotProps['input']>;

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

  return {
    materialInputProps: {
      ...materialInputProps,
      slotProps: materialSlotProps,
    },
    nativeSlotProps: omitNullishEventHandlers(
      resolveComponentProps(slotProps.htmlInput, ownerState) ?? {},
      ([key]) => key !== 'value' && key !== 'defaultValue' && key !== 'type',
    ),
  };
}
