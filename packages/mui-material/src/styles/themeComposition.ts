import { isPlainObject } from '@mui/utils/deepmerge';

/**
 * A theme created with CSS variables can be passed back to `createTheme()`, as in
 * `createTheme(theme, { palette })` or `createTheme({ ...theme, palette })`.
 * Under this key, the theme and each of its palettes keep the values they generated,
 * so that a new theme generates them again, unless they were changed.
 * `Symbol.for()` keeps the key the same across copies of the package.
 */
export const themeBuildKey = Symbol.for('mui.material.themeBuild');

export interface Shape {
  [key: string]: Shape | true;
}

/**
 * Returns the keys of `value`, and of the plain objects it holds, to find the values added to it later.
 */
export function getShape(value: Record<string, any>): Shape {
  const shape: Shape = {};
  Object.keys(value).forEach((key) => {
    shape[key] = isPlainObject(value[key]) ? getShape(value[key]) : true;
  });
  return shape;
}

/**
 * Returns a copy of the values of `value` that aren't in `shape`, the ones added since `shape` was taken.
 */
export function getAddedValues(value: Record<string, any>, shape: Shape): Record<string, any> {
  const added: Record<string, any> = {};
  Object.keys(value).forEach((key) => {
    const child = value[key];
    const childShape = shape[key];
    if (isPlainObject(child) && childShape !== true) {
      const addedChild = getAddedValues(child, childShape ?? {});
      if (Object.keys(addedChild).length > 0) {
        added[key] = addedChild;
      }
    } else if (childShape === undefined) {
      added[key] = child;
    }
  });
  return added;
}

/**
 * Returns a copy of `value` without the values that are still the same as in `generated`.
 */
export function removeUnchanged<T>(value: T, generated: Record<string, any> | undefined): T {
  if (!isPlainObject(value) || !isPlainObject(generated)) {
    return value;
  }
  const output: Record<keyof any, unknown> = { ...value };
  Object.keys(generated).forEach((key) => {
    if (!(key in output)) {
      return;
    }
    if (isPlainObject(generated[key])) {
      output[key] = removeUnchanged(output[key], generated[key]);
    } else if (output[key] === generated[key]) {
      delete output[key];
    }
  });
  return output as T;
}
