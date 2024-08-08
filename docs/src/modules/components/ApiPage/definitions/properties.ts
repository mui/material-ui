import { PropsTableItem, PropsTranslations } from '@mui-internal/api-docs-builder';
import { Translate } from '@mui/docs/i18n';
import kebabCase from 'lodash/kebabCase';
import {
  HookApiContent,
  HooksTranslations,
} from 'packages/api-docs-builder/types/ApiBuilder.types';
import type { TableOfContentsParams } from 'docs/src/modules/components/ApiPage';

export interface PropertyDefinition {
  additionalInfo?: string[];
  hash: string;
  deprecationInfo?: string;
  description?: string;
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

export type GetCssToCParams = {
  properties: PropertyDefinition[];
  inheritance?: boolean;
  themeDefaultProps?: boolean;
  t: Translate;
  hash: string;
};

export const getPropertiesToC = ({
  properties,
  inheritance,
  themeDefaultProps,
  t,
  hash,
}: GetCssToCParams): TableOfContentsParams => ({
  text: t('api-docs.props'),
  hash,
  children: [
    ...properties.map(({ propName, hash: propertyHash }) => ({
      text: propName,
      hash: propertyHash,
      children: [],
    })),
    ...(inheritance
      ? [{ text: t('api-docs.inheritance'), hash: 'inheritance', children: [] }]
      : []),
    ...(themeDefaultProps
      ? [{ text: t('api-docs.themeDefaultProps'), hash: 'theme-default-props', children: [] }]
      : []),
  ],
});

interface GetPropsApiDefinitionsParams {
  componentName: string;
  properties: {
    [name: string]: PropsTableItem;
  };
  propertiesDescriptions: PropsTranslations['propDescriptions'];
  /**
   * Add indicators that the properties is optional instead of showing it is required.
   */
  showOptionalAbbr?: boolean;
}

export function getPropsApiDefinitions(params: GetPropsApiDefinitionsParams): PropertyDefinition[] {
  const { properties, propertiesDescriptions, componentName, showOptionalAbbr = false } = params;

  return Object.entries(properties).map(([propName, propData]) => {
    const isRequired = propData.required && !showOptionalAbbr;
    const isOptional = !propData.required && showOptionalAbbr;

    const isDeprecated = propData.deprecated;
    const deprecationInfo = propData.deprecationInfo;

    const typeName = propData.type?.description || propData.type.name;
    const propDefault = propData.default;
    const propDescription = propertiesDescriptions[propName];

    const additionalInfo = (
      ['cssApi', 'sx', 'slotsApi', 'joy-size', 'joy-color', 'joy-variant'] as const
    ).filter((key) => propData.additionalInfo?.[key]);

    const seeMoreDescription =
      propDescription?.seeMoreText &&
      propData.seeMoreLink &&
      propDescription.seeMoreText.replace(
        '{{link}}',
        `<a href="${propData.seeMoreLink.url}">${propData.seeMoreLink.text}</a>`,
      );

    const signature = propData.signature?.type;
    const signatureArgs = propData.signature?.describedArgs?.map((argName) => ({
      argName,
      argDescription: propertiesDescriptions[propName].typeDescriptions?.[argName],
    }));
    const signatureReturnDescription =
      propData.signature?.returned &&
      propertiesDescriptions[propName].typeDescriptions?.[propData.signature.returned];

    return {
      hash: `${kebabCase(componentName)}-prop-${propName}`,
      propName,
      seeMoreDescription,
      description: propDescription?.description,
      requiresRef: propDescription?.requiresRef,
      isOptional,
      isRequired,
      isDeprecated,
      deprecationInfo,
      typeName,
      propDefault,
      additionalInfo,
      signature,
      signatureArgs,
      signatureReturnDescription,
    };
  });
}

// interface InterfaceApiProcessorParams {}

// export function InterfaceApiProcessor(params: InterfaceApiProcessorParams): PropertyDefinition[] {
//   return [];
// }

interface HookCommonApiParams {
  hookName: string;
  showOptionalAbbr?: boolean;
}

interface GetHookReturnApiDefinitionsParams extends HookCommonApiParams {
  kind: 'return';
  properties: HookApiContent['returnValue'];
  translations: HooksTranslations['returnValueDescriptions'];
}

interface GetHookParametersApiDefinitions extends HookCommonApiParams {
  kind: 'parameters';
  properties: HookApiContent['parameters'];
  translations: HooksTranslations['parametersDescriptions'];
}

export function getHookApiDefinitions(
  params: GetHookReturnApiDefinitionsParams | GetHookParametersApiDefinitions,
): PropertyDefinition[] {
  const { properties, translations, hookName, kind, showOptionalAbbr } = params;

  return Object.entries(properties).map(([propName, propData]) => {
    const isRequired = propData.required && !showOptionalAbbr;
    const isOptional = !propData.required && showOptionalAbbr;

    const isDeprecated = propData.deprecated;
    const deprecationInfo = propData.deprecationInfo;

    const typeName = propData.type?.description || propData.type.name;
    const propDefault = propData.default;
    const propDescription = translations[propName];

    return {
      hash: `${kebabCase(hookName)}-${kind === 'parameters' ? 'parameters' : 'return-value'}-${propName}`,
      propName,
      description: propDescription?.description,
      isRequired,
      isOptional,
      isDeprecated,
      deprecationInfo,
      typeName,
      propDefault,
    };
  });
}
