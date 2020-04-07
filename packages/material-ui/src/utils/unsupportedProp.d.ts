export default function unsupportedProp(
  props: { [key: string]: any },
  propName: string,
  componentName: string,
  location: string,
  propFullName: string
): Error | null;
