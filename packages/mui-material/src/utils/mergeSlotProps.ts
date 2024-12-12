import { SlotComponentProps } from '@mui/utils';

export default function mergeSlotProps<
  T extends SlotComponentProps<React.ElementType, {}, {}>,
  K extends T,
>(externalSlotProps: T, defaultSlotProps: K) {
  if (!externalSlotProps) {
    return defaultSlotProps;
  }
  if (typeof externalSlotProps === 'function' || typeof defaultSlotProps === 'function') {
    return ((ownerState) => {
      const defaultSlotPropsValue =
        typeof defaultSlotProps === 'function' ? defaultSlotProps(ownerState) : defaultSlotProps;
      const externalSlotPropsValue =
        typeof externalSlotProps === 'function' ? externalSlotProps(ownerState) : externalSlotProps;
      return { ...defaultSlotPropsValue, ...externalSlotPropsValue };
    }) as T;
  }
  return { ...defaultSlotProps, ...externalSlotProps };
}
