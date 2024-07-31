import { Translator } from '@mui/docs/i18n';
import kebabCase from 'lodash/kebabCase';
import { ComponentApiContent } from 'packages/api-docs-builder';

export function getPropertiesHash({
  componentName,
  propName,
  hooksParameters,
  hooksReturnValue,
}: {
  componentName: string;
  propName: string;
  hooksParameters?: boolean;
  hooksReturnValue?: boolean;
}) {
  let sectionName = 'prop';
  if (hooksParameters) {
    sectionName = 'parameters';
  } else if (hooksReturnValue) {
    sectionName = 'return-value';
  }
  return `${kebabCase(componentName)}-${sectionName}-${propName}`;
}

export interface PropertyDefinition {
  additionalInfo: string[];
  componentName: string;
  deprecationInfo?: string;
  description?: string;
  hooksParameters?: boolean;
  hooksReturnValue?: boolean;
  isDeprecated?: boolean;
  isOptional?: boolean;
  isRequired?: boolean;
  propDefault?: string;
  propName: string;
  requiresRef?: boolean;
  seeMoreDescription?: string;
  signature?: string;
  signatureArgs?: { argName: string; argDescription?: string }[];
  signatureReturnDescription?: string;
  typeName: string;
  /**
   * Used by MUI X interface documentation
   */
  isProPlan?: boolean;
  /**
   * Used by MUI X interface documentation
   */
  isPremiumPlan?: boolean;
}

interface GetPropsToCParams extends Pick<ComponentApiContent, 'inheritance' | 'themeDefaultProps'> {
  componentProps: ComponentApiContent['props'];
  componentName: ComponentApiContent['name'];
  t: Translator;
  /**
   * @default 'props'
   */
  hash?: string;
}

export function getPropsToC({
  componentName,
  componentProps,
  inheritance,
  themeDefaultProps,
  t,
  hash = 'props',
}: GetPropsToCParams) {
  return {
    text: t('api-docs.props'),
    hash,
    children: [
      ...Object.entries(componentProps).map(([propName]) => ({
        text: propName,
        hash: getPropertiesHash({ propName, componentName }),
        children: [],
      })),
      ...(inheritance
        ? [{ text: t('api-docs.inheritance'), hash: 'inheritance', children: [] }]
        : []),
      ...(themeDefaultProps
        ? [{ text: t('api-docs.themeDefaultProps'), hash: 'theme-default-props', children: [] }]
        : []),
    ],
  };
}
