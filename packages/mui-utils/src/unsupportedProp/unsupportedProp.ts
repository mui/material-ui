export default function unsupportedProp(
  props: { [key: string]: any },
  propName: string,
  componentName: string,
  location: string,
  propFullName: string,
): Error | null {
  if (process.env.NODE_ENV === 'production') {
    return null;
  }

  const propFullNameSafe = propFullName || propName;

  if (typeof props[propName] !== 'undefined') {
    return new Error(`The prop \`${propFullNameSafe}\` is not supported. Please remove it.`);
  }

  return null;
}
