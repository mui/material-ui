import { SlotComponentProps } from '@mui/utils/types';
import clsx from 'clsx';

// Brought from [Base UI](https://github.com/mui/base-ui/blob/master/packages/react/src/merge-props/mergeProps.ts#L119)
// Use it directly from Base UI once it's a package dependency.
function isEventHandler(key: string, value: unknown) {
  // This approach is more efficient than using a regex.
  const thirdCharCode = key.charCodeAt(2);
  return (
    key[0] === 'o' &&
    key[1] === 'n' &&
    thirdCharCode >= 65 /* A */ &&
    thirdCharCode <= 90 /* Z */ &&
    typeof value === 'function'
  );
}

export default function mergeSlotProps<
  T extends SlotComponentProps<React.ElementType, {}, {}>,
  K = T,
  // infer external slot props first to provide autocomplete for default slot props
  U = T extends Function ? T : K extends Function ? K : T extends undefined ? K : T,
>(externalSlotProps: T | undefined, defaultSlotProps: K): U {
  if (!externalSlotProps) {
    return defaultSlotProps as unknown as U;
  }
  function extractHandlers(
    externalSlotPropsValue: Record<string, any>,
    defaultSlotPropsValue: Record<string, any>,
  ) {
    const handlers: Record<string, Function> = {};

    Object.keys(defaultSlotPropsValue).forEach((key) => {
      if (
        isEventHandler(key, defaultSlotPropsValue[key]) &&
        typeof externalSlotPropsValue[key] === 'function'
      ) {
        // only compose the handlers if both default and external slot props match the event handler
        handlers[key] = (...args: unknown[]) => {
          externalSlotPropsValue[key](...args);
          defaultSlotPropsValue[key](...args);
        };
      }
    });
    return handlers;
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
      const handlers = extractHandlers(externalSlotPropsValue, defaultSlotPropsValue);

      const result: Record<string, any> = {
        ...defaultSlotPropsValue,
        ...externalSlotPropsValue,
        ...handlers,
        ...(!!className && { className }),
      };
      if (defaultSlotPropsValue?.style && externalSlotPropsValue?.style) {
        result.style = { ...defaultSlotPropsValue.style, ...externalSlotPropsValue.style };
      }
      if (defaultSlotPropsValue?.sx && externalSlotPropsValue?.sx) {
        result.sx = [
          ...(Array.isArray(defaultSlotPropsValue.sx)
            ? defaultSlotPropsValue.sx
            : [defaultSlotPropsValue.sx]),
          ...(Array.isArray(externalSlotPropsValue.sx)
            ? externalSlotPropsValue.sx
            : [externalSlotPropsValue.sx]),
        ];
      }
      return result;
    }) as U;
  }
  const typedDefaultSlotProps = defaultSlotProps as Record<string, any>;
  const handlers = extractHandlers(externalSlotProps, typedDefaultSlotProps);
  const className = clsx(typedDefaultSlotProps?.className, externalSlotProps?.className);
  const result: Record<string, any> = {
    ...defaultSlotProps,
    ...externalSlotProps,
    ...handlers,
    ...(!!className && { className }),
  };
  if (typedDefaultSlotProps?.style && externalSlotProps?.style) {
    result.style = { ...typedDefaultSlotProps.style, ...externalSlotProps.style };
  }
  if (typedDefaultSlotProps?.sx && externalSlotProps?.sx) {
    result.sx = [
      ...(Array.isArray(typedDefaultSlotProps.sx)
        ? typedDefaultSlotProps.sx
        : [typedDefaultSlotProps.sx]),
      ...(Array.isArray(externalSlotProps.sx) ? externalSlotProps.sx : [externalSlotProps.sx]),
    ];
  }
  return result as U;
}
