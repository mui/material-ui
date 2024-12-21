import { SlotComponentProps } from '@mui/utils';
import clsx from 'clsx';

type PickFn<T> = T extends Function ? T : never;
type ExcludeFn<T> = Exclude<T, Function>;

export default function mergeSlotProps<
  T extends SlotComponentProps<React.ElementType, {}, {}>,
  K = T,
  U = T extends Function
    ? PickFn<T>
    : K extends Function
      ? PickFn<K>
      : T extends undefined
        ? K
        : ExcludeFn<T>,
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
  } as U;
}
