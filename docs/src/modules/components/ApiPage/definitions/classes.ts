import { PropsTranslations, ComponentApiContent } from '@mui-internal/api-docs-builder';
import { Translate } from '@mui/docs/i18n';
import kebabCase from 'lodash/kebabCase';
import type { TableOfContentsParams } from 'docs/src/modules/components/ApiPage';

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

export const getClassesToC = ({ classes, t, hash }: GetCssToCParams): TableOfContentsParams[] =>
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

export interface GetClassApiDefinitionsParams {
  componentClasses: ComponentApiContent['classes'];
  classDescriptions: PropsTranslations['classDescriptions'];
  componentName: string;
}

const errorMessage = (componentName: string, className: string, slotName: string): string =>
  `${className} description from component ${componentName} should include ${slotName} since its definition includes "{{${slotName}}}"`;

export function getClassApiDefinitions(params: GetClassApiDefinitionsParams): ClassDefinition[] {
  const { componentClasses, classDescriptions, componentName } = params;

  return componentClasses.map((classDefinition) => {
    const {
      conditions,
      nodeName,
      deprecationInfo,
      description: translatedDescription,
    } = classDescriptions[classDefinition.key] ?? {}; // Not all classes have a description.

    let description = translatedDescription ?? classDefinition.description;

    if (description.includes('{{conditions}}')) {
      if (!conditions) {
        throw Error(errorMessage(componentName, classDefinition.className, 'conditions'));
      }
      description = description.replace(/{{conditions}}/, conditions);
    }

    if (description.includes('{{nodeName}}')) {
      if (!nodeName) {
        throw Error(errorMessage(componentName, classDefinition.className, 'nodeName'));
      }
      description = description.replace(/{{nodeName}}/, nodeName);
    }

    return {
      ...classDefinition,
      description,
      deprecationInfo,
      hash: `${kebabCase(componentName)}-classes-${classDefinition.className}`,
    };
  });
}
