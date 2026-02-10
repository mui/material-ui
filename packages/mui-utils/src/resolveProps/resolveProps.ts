/**
 * Add keys, values of `defaultProps` that does not exist in `props`
 * @param {object} defaultProps
 * @param {object} props
 * @returns {object} resolved props
 */
export default function resolveProps<
  T extends {
    components?: Record<string, unknown>;
    componentsProps?: Record<string, unknown>;
    slots?: Record<string, unknown>;
    slotProps?: Record<string, unknown>;
  } & Record<string, unknown>,
>(defaultProps: T, props: T) {
  const output = { ...props };

  (Object.keys(defaultProps) as Array<keyof T>).forEach((propName) => {
    if (propName.toString().match(/^(components|slots)$/)) {
      output[propName] = {
        ...(defaultProps[propName] as any),
        ...(output[propName] as any),
      };
    } else if (propName.toString().match(/^(componentsProps|slotProps)$/)) {
      const defaultSlotProps = (defaultProps[propName] || {}) as T[keyof T];
      const slotProps = props[propName] as {} as T[keyof T];
      output[propName] = {} as T[keyof T];

      if (!slotProps || !Object.keys(slotProps)) {
        // Reduce the iteration if the slot props is empty
        output[propName] = defaultSlotProps;
      } else if (!defaultSlotProps || !Object.keys(defaultSlotProps)) {
        // Reduce the iteration if the default slot props is empty
        output[propName] = slotProps;
      } else {
        output[propName] = { ...slotProps };
        Object.keys(defaultSlotProps).forEach((slotPropName) => {
          (output[propName] as Record<string, unknown>)[slotPropName] = resolveProps(
            (defaultSlotProps as Record<string, any>)[slotPropName],
            (slotProps as Record<string, any>)[slotPropName],
          );
        });
      }
    } else if (output[propName] === undefined) {
      output[propName] = defaultProps[propName];
    }
  });

  return output;
}
