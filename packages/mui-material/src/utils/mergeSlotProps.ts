import { SlotComponentProps } from '@mui/utils';
import clsx from 'clsx';

export default function mergeSlotProps<
  T extends SlotComponentProps<React.ElementType, {}, {}>,
  K = T,
  // infer external slot props first to provide autocomplete for default slot props
  U = T extends Function ? T : K extends Function ? K : T extends undefined ? K : T,
>(externalSlotProps: T | undefined, defaultSlotProps: K): U {
  if (!externalSlotProps) {
    return defaultSlotProps as unknown as U;
  }
  if (typeof externalSlotProps === 'function' || typeof defaultSlotProps === 'function') {
    return ((ownerState: Record<string, any>) => {
      const defaultSlotPropsValue =
        typeof defaultSlotProps === 'function' ? defaultSlotProps(ownerState) : defaultSlotProps;
      const externalSlotPropsValue =
        typeof externalSlotProps === 'function'
          ? externalSlotProps({ ...ownerState, ...defaultSlotPropsValue })
          : externalSlotProps;

      const className = clsx(
        ownerState?.className,
        defaultSlotPropsValue?.className,
        externalSlotPropsValue?.className,
      );
      return {
        ...defaultSlotPropsValue,
        ...externalSlotPropsValue,
        ...(!!className && { className }),
        ...(defaultSlotPropsValue?.style &&
          externalSlotPropsValue?.style && {
            style: { ...defaultSlotPropsValue.style, ...externalSlotPropsValue.style },
          }),
      };
    }) as U;
  }
  const className = clsx(
    (defaultSlotProps as Record<string, any>)?.className,
    externalSlotProps?.className,
  );
  return {
    ...defaultSlotProps,
    ...externalSlotProps,
    ...(!!className && { className }),
    ...((defaultSlotProps as Record<string, any>)?.style &&
      externalSlotProps?.style && {
        style: { ...(defaultSlotProps as Record<string, any>).style, ...externalSlotProps.style },
      }),
  } as U;
}
