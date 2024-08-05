import { PropsTranslations, ComponentApiContent } from '@mui-internal/api-docs-builder';
import { Translate } from '@mui/docs/i18n';
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

export type GetCssToCParams = {
  classes: ClassDefinition[];
  t: Translate;
  hash?: string;
};

export const getClassesToC = ({ classes, t, hash }: GetCssToCParams) =>
  !classes || classes.length === 0
    ? []
    : [
        {
          text: t('api-docs.classes'),
          hash: hash ?? 'classes',
          children: [
            ...classes.map(({ key, hash: classeHash }) => ({
              text: key,
              hash: classeHash,
              children: [],
            })),
          ],
        },
      ];

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
