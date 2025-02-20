import { Breakpoint, Breakpoints } from '../createTheme';

const getLegacyGridWarning = (propName: 'item' | 'zeroMinWidth' | Breakpoint) => {
  if (['item', 'zeroMinWidth'].includes(propName)) {
    return `The \`${propName}\` prop has been removed and is no longer necessary. You can safely remove it.`;
  }

  // #host-reference
  return `The \`${propName}\` prop has been removed. See https://mui.com/material-ui/migration/upgrade-to-grid-v2/ for migration instructions.`;
};

const warnedAboutProps: string[] = [];

/**
 * Deletes the legacy Grid component props from the `props` object and warns once about them if found.
 *
 * @param {object} props The props object to remove the legacy Grid props from.
 * @param {Breakpoints} breakpoints The breakpoints object.
 */
export default function deleteLegacyGridProps(
  props: { item?: boolean; zeroMinWidth?: boolean } & Partial<
    Record<Breakpoint, 'auto' | number | boolean>
  > &
    Record<string, any>,
  breakpoints: Breakpoints,
) {
  const propsToWarn: ('item' | 'zeroMinWidth' | Breakpoint)[] = [];

  if (props.item !== undefined) {
    delete props.item;
    propsToWarn.push('item');
  }

  if (props.zeroMinWidth !== undefined) {
    delete props.zeroMinWidth;
    propsToWarn.push('zeroMinWidth');
  }

  breakpoints.keys.forEach((breakpoint) => {
    if (props[breakpoint] !== undefined) {
      propsToWarn.push(breakpoint);
      delete props[breakpoint];
    }
  });

  if (process.env.NODE_ENV !== 'production') {
    propsToWarn.forEach((prop) => {
      if (!warnedAboutProps.includes(prop)) {
        warnedAboutProps.push(prop);
        console.warn(`MUI Grid2: ${getLegacyGridWarning(prop)}\n`);
      }
    });
  }
}
