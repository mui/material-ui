import { PropsTranslations, ComponentApiContent } from '@mui-internal/api-docs-builder';
import kebabCase from 'lodash/kebabCase';

export interface ClassDefinition {
  className: string;
  key: string;
  hash: string;
  description?: string;
  isGlobal?: boolean;
  isDeprecated?: boolean;
  deprecationInfo?: string;
}

export interface ClassesApiProcessorParams {
  componentClasses: ComponentApiContent['classes'];
  classDescriptions: PropsTranslations['classDescriptions'];
  componentName: string;
}

export function classesApiProcessor(params: ClassesApiProcessorParams): ClassDefinition[] {
  const { componentClasses, classDescriptions, componentName } = params;

  return componentClasses.map((classDefinition) => {
    return {
      ...classDefinition,
      description:
        classDescriptions[classDefinition.key]?.description
          ?.replace(/{{conditions}}/, classDescriptions[classDefinition.key].conditions!)
          ?.replace(/{{nodeName}}/, classDescriptions[classDefinition.key].nodeName!) ??
        classDefinition.description,
      deprecationInfo: classDescriptions[classDefinition.key]?.deprecationInfo,
      hash: `${kebabCase(componentName)}-classes-${classDefinition.className}`,
    };
  });
}
