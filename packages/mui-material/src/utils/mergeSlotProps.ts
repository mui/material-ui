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
        ...(defaultSlotPropsValue?.sx &&
          externalSlotPropsValue?.sx && {
            sx: [
              ...(Array.isArray(defaultSlotPropsValue.sx)
                ? defaultSlotPropsValue.sx
                : [defaultSlotPropsValue.sx]),
              ...(Array.isArray(externalSlotPropsValue.sx)
                ? externalSlotPropsValue.sx
                : [externalSlotPropsValue.sx]),
            ],
          }),
      };
    }) as U;
  }
  const typedDefaultSlotProps = defaultSlotProps as Record<string, any>;
  const className = clsx(typedDefaultSlotProps?.className, externalSlotProps?.className);
  return {
    ...defaultSlotProps,
    ...externalSlotProps,
    ...(!!className && { className }),
    ...(typedDefaultSlotProps?.style &&
      externalSlotProps?.style && {
        style: { ...typedDefaultSlotProps.style, ...externalSlotProps.style },
      }),
    ...(typedDefaultSlotProps?.sx &&
      externalSlotProps?.sx && {
        sx: [
          ...(Array.isArray(typedDefaultSlotProps.sx)
            ? typedDefaultSlotProps.sx
            : [typedDefaultSlotProps.sx]),
          ...(Array.isArray(externalSlotProps.sx) ? externalSlotProps.sx : [externalSlotProps.sx]),
        ],
      }),
  } as U;
}
