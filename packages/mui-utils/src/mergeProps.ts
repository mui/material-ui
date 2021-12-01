export default function mergeProps<T extends { className?: string } & Record<string, unknown>>(
  defaultProps: T,
  props: T,
) {
  const output = { ...props };

  Object.keys(defaultProps).forEach((propName: keyof T) => {
    if (output[propName] === undefined) {
      output[propName] = defaultProps[propName];
    }

    if (propName === 'className' && (output.className || defaultProps.className)) {
      output.className = [defaultProps[propName], output[propName]]
        .filter((value) => !!value)
        .join(' ');
    }
  });

  return output;
}
