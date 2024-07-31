import kebabCase from 'lodash/kebabCase';

type HashParams = { componentName: string; className: string };

export function getClassesHash({ componentName, className }: HashParams) {
  return `${kebabCase(componentName)}-classes-${className}`;
}

export interface ClassDefinition {
  className: string;
  key: string;
  description?: string;
  isGlobal?: boolean;
  isDeprecated?: boolean;
  deprecationInfo?: string;
}
