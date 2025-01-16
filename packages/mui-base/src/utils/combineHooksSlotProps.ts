import { EventHandlers } from './types';

/**
 * Combines the two get*Props functions from Base UI hooks into one.
 * Useful when a hook uses two other hooks behind the scenes
 * (such as useSelect that depends on useList and useButton for its root slot).
 *
 * The resulting function will return the combined props.
 * They are merged from left to right, similarly to how Object.assign works.
 *
 * The getSecondProps function will receive the result of the getFirstProps function as its argument,
 * so its event handlers can call the previous handlers and act depending on its result.
 *
 * @param getFirstProps - A getter function that returns the props for the first slot. It receives the external event handlers as its argument.
 * @param getSecondProps - A getter function that returns the props for the second slot. It receives the result of the getFirstProps function as its argument.
 */
export function combineHooksSlotProps<
  ExternalHandlers extends EventHandlers,
  FirstSlotProps extends ExternalHandlers,
  SecondSlotProps extends ExternalHandlers,
>(
  getFirstProps: (external?: ExternalHandlers) => FirstSlotProps,
  getSecondProps: (external?: ExternalHandlers) => SecondSlotProps,
) {
  return function getCombinedProps<OtherProps extends ExternalHandlers>(
    external: OtherProps = {} as OtherProps,
  ) {
    const firstResult = {
      ...external,
      ...getFirstProps(external),
    };

    const result = {
      ...firstResult,
      ...getSecondProps(firstResult),
    };

    return result;
  };
}
