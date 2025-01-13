/**
 * Utility to filter out MUI internal props and custom props from being forwarded to DOM elements.
 * Used with MUI's styled() utility to prevent prop leakage.
 *
 * @example
 * const StyledDiv = styled('div', {
 *   shouldForwardProp,
 * })<StyledDivProps>`
 *   // styles
 * `;
 *
 * @param prop - The prop name to check
 * @returns boolean - Whether the prop should be forwarded to the DOM element
 */
const muiInternalProps = ['sx', 'as', 'theme', 'component', 'ownerState', 'classes'];

export const shouldForwardProp = (prop: PropertyKey): boolean => {
  return !muiInternalProps.includes(prop as string);
}; 