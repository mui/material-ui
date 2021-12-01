export default function mergeProps<T extends { className?: string } & Record<string, unknown>>(
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
