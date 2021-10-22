import useId from './useId';

/**
 *
 * @example <div id={useId} />
 * @param idOverride
 * @returns {string} Can only be passed to props
 */
export default function useReactId(idOverride?: string): string | undefined {
  // TODO: Prefer https://github.com/reactwg/react-18/discussions/111 once it's shipped
  return useId(idOverride);
}
