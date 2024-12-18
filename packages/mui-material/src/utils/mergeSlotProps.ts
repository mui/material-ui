import { SlotComponentProps } from '@mui/utils';

type PickFn<T> = T extends Function ? T : never;
type ExcludeFn<T> = Exclude<T, Function>;

function concatClassName(
  arg1: undefined | Record<string, any>,
  arg2: undefined | Record<string, any>,
  arg3?: Record<string, any>,
) {
  let className = '';
  if (arg1?.className) {
    className += arg1.className;
  }
  if (arg2?.className) {
    className += `${className ? ` ` : ''}${arg2.className}`;
  }
  if (arg3?.className) {
    className += `${className ? ` ` : ''}${arg3.className}`;
  }
  return className;
}

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

      const className = concatClassName(ownerState, defaultSlotPropsValue, externalSlotPropsValue);
      return {
        ...defaultSlotPropsValue,
        ...externalSlotPropsValue,
        ...(!!className && { className }),
      };
    }) as U;
  }
  const className = concatClassName(defaultSlotProps as Record<string, any>, externalSlotProps);
  return {
    ...defaultSlotProps,
    ...externalSlotProps,
    ...(!!className && { className }),
  } as U;
}
