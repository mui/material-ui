import { internal_resolveProps as resolveProps } from '@mui/utils';

/**
 * Runtime function for creating `useThemeProps`.
 * In the codebase, the first argument will be a string that represent the component slug (should match one of the `theme.components.*`).
 * Then, the transformation will replace the first argument with the `defaultProps` object if provided.
 */
export default function createUseThemeProps(nameOrDefaultProps) {
  return function useThemeProps({ props }) {
    if (typeof nameOrDefaultProps === 'string') {
      // if no default props provided in the theme, return the props as is.
      return props;
    }
    const defaultProps = nameOrDefaultProps;
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
  };
}
