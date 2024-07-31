type HashParams = { componentName: string; className: string | null; name: string };

// eslint-disable-next-line import/prefer-default-export
export function getSlotsHash({ componentName, className, name }: HashParams) {
  // We can use "-css-" linke in `getClassesHash` because slots with associated className should not be rendered in classes.
  return `${componentName}-css-${className ?? name}`;
}

export type SlotsDefinition = {
  className: string | null;
  componentName: string;
  description?: string;
  name: string;
  defaultValue?: string;
};
