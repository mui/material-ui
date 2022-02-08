export default function HTMLElementType(
  props: { [key: string]: unknown },
  propName: string,
  componentName: string,
  location: string,
  propFullName: string,
): Error | null {
  if (process.env.NODE_ENV === 'production') {
    return null;
  }

  const propValue = props[propName];
  const safePropName = propFullName || propName;

  if (propValue == null) {
    return null;
  }

  if (propValue && (propValue as any).nodeType !== 1) {
    return new Error(
      `Invalid ${location} \`${safePropName}\` supplied to \`${componentName}\`. ` +
        `Expected an HTMLElement.`,
    );
  }

  return null;
}
