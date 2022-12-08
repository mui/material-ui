/**
 * Add keys, values of `defaultProps` that does not exist in `props`
 * @param {object} defaultProps
 * @param {object} props
 * @returns {object} resolved props
 */
export default function resolveProps<T extends { className?: string } & Record<string, unknown>>(
  defaultProps: T,
  props: T,
) {
  const output = { ...props };

  Object.keys(defaultProps).forEach((propName: keyof T) => {
    if (output[propName] === undefined) {
      output[propName] = defaultProps[propName];
    }
  });

  return output;
}
