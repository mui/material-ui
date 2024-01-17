import { internal_resolveProps as resolveProps } from '@mui/utils';

export default function useThemeProps({ theme, props, name }) {
  if (
    !theme ||
    !theme.components ||
    !theme.components[name] ||
    !theme.components[name].defaultProps
  ) {
    return props;
  }

  const defaultProps = theme.components[name].defaultProps;

  // The same logic as in packages/mui-utils/src/resolveProps.ts
  // TODO: consider reusing the logic from the utils package
  const output = { ...props };

  Object.keys(defaultProps).forEach((propName) => {
    if (propName.toString().match(/^(components|slots)$/)) {
      output[propName] = {
        ...defaultProps[propName],
        ...output[propName],
      };
    } else if (propName.toString().match(/^(componentsProps|slotProps)$/)) {
      const defaultSlotProps = defaultProps[propName] || {};
      const slotProps = props[propName];
      output[propName] = {};

      if (!slotProps || !Object.keys(slotProps)) {
        // Reduce the iteration if the slot props is empty
        output[propName] = defaultSlotProps;
      } else if (!defaultSlotProps || !Object.keys(defaultSlotProps)) {
        // Reduce the iteration if the default slot props is empty
        output[propName] = slotProps;
      } else {
        output[propName] = { ...slotProps };
        Object.keys(defaultSlotProps).forEach((slotPropName) => {
          output[propName][slotPropName] = resolveProps(
            defaultSlotProps[slotPropName],
            slotProps[slotPropName],
          );
        });
      }
    } else if (output[propName] === undefined) {
      output[propName] = defaultProps[propName];
    }
  });

  return output;
}
