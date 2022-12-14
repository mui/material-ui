/**
 * Add keys, values of `defaultProps` that does not exist in `props`
 * @param {object} defaultProps
 * @param {object} props
 * @returns {object} resolved props
 */
export default function resolveProps<
  T extends {
    className?: string;
    components?: Record<string, unknown>;
    componentsProps?: Record<string, unknown>;
    slots?: Record<string, unknown>;
    slotProps?: Record<string, unknown>;
  } & Record<string, unknown>,
>(defaultProps: T, props: T) {
  const output = { ...props };

  Object.keys(defaultProps).forEach((propName: keyof T) => {
    if (propName.toString().match(/^(components|componentsProps|slots|slotProps)$/)) {
      output[propName] = {
        ...(defaultProps[propName] as any),
        ...(output[propName] as any),
      };
    } else if (output[propName] === undefined) {
      output[propName] = defaultProps[propName];
    }
  });

  return output;
}
