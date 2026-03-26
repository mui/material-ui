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

function mergeRefs<Instance>(
  defaultRef: React.Ref<Instance> | undefined,
  externalRef: React.Ref<Instance> | undefined,
) {
  if (defaultRef == null) {
    return externalRef;
  }

  if (externalRef == null) {
    return defaultRef;
  }

  return (instance: Instance | null) => {
    const cleanups = [defaultRef, externalRef].map((ref) => {
      if (ref == null) {
        return null;
      }

      if (typeof ref === 'function') {
        const refCleanup = ref(instance);

        return typeof refCleanup === 'function'
          ? refCleanup
          : () => {
              ref(null);
            };
      }

      ref.current = instance;

      return () => {
        ref.current = null;
      };
    });

    return () => {
      cleanups.forEach((cleanup) => cleanup?.());
    };
  };
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
      const ref = mergeRefs(defaultSlotPropsValue?.ref, externalSlotPropsValue?.ref);

      return {
        ...defaultSlotPropsValue,
        ...externalSlotPropsValue,
        ...handlers,
        ...(!!className && { className }),
        ...(!!ref && { ref }),
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
  const handlers = extractHandlers(externalSlotProps, typedDefaultSlotProps);
  const className = clsx(typedDefaultSlotProps?.className, externalSlotProps?.className);
  const ref = mergeRefs(typedDefaultSlotProps?.ref, externalSlotProps?.ref);
  return {
    ...defaultSlotProps,
    ...externalSlotProps,
    ...handlers,
    ...(!!className && { className }),
    ...(!!ref && { ref }),
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
