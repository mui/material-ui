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

export interface ClassesApiProcessorParams {
  componentClasses: ComponentApiContent['classes'];
  classDescriptions: PropsTranslations['classDescriptions'];
  componentName: string;
}

export function classesApiProcessor(params: ClassesApiProcessorParams): ClassDefinition[] {
  const { componentClasses, classDescriptions, componentName } = params;

  return componentClasses.map((classDefinition) => {
    const { description, conditions, nodeName, deprecationInfo } =
      classDescriptions[classDefinition.key];

    if (!conditions && description.search(/{{conditions}}/) !== -1) {
      throw Error(
        `In ${componentName} the class "${classDefinition.className}" description with "{{conditions}}" but without \`conditions\` to replace it.`,
      );
    }

    if (!conditions && description.search(/{{nodeName}}/) !== -1) {
      throw Error(
        `In ${componentName} the class "${classDefinition.className}" description with "{{nodeName}}" but without \`nodeName\` to replace it.`,
      );
    }

    return {
      ...classDefinition,
      description: description
        .replace(/{{conditions}}/, conditions!)
        .replace(/{{nodeName}}/, nodeName!),
      deprecationInfo,
      hash: `${kebabCase(componentName)}-classes-${classDefinition.className}`,
    };
  });
}
