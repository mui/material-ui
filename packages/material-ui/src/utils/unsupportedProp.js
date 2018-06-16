// @flow

function unsupportedProp(
  props: Object,
  propName: string,
  componentName?: string,
  location?: string,
  propFullName?: string,
) {
  /* istanbul ignore if */
  if (process.env.NODE_ENV === 'production') {
    return null;
  }

  const propFullNameSafe = propFullName || propName;

  if (typeof props[propName] !== 'undefined') {
    return new Error(`The property \`${propFullNameSafe}\` is not supported. Please remove it.`);
  }

  return null;
}

export default unsupportedProp;
