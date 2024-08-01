import { PropsTableItem, PropsTranslations } from '@mui-internal/api-docs-builder';
import { PropertyDefinition } from 'docs/src/modules/components/ApiPage/common/properties';
import kebabCase from 'lodash/kebabCase';
import {
  HookApiContent,
  HooksTranslations,
} from 'packages/api-docs-builder/types/ApiBuilder.types';

interface PropsApiProcessorParams {
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

export function propsApiProcessor(params: PropsApiProcessorParams): PropertyDefinition[] {
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
}

interface HookReturnApiProcessorParams extends HookCommonApiParams {
  kind: 'return';
  properties: HookApiContent['returnValue'];
  translations: HooksTranslations['returnValueDescriptions'];
}

interface HookParametersApiProcessorParams extends HookCommonApiParams {
  kind: 'parameters';
  properties: HookApiContent['parameters'];
  translations: HooksTranslations['parametersDescriptions'];
}

export function hookApiProcessor(
  params: HookReturnApiProcessorParams | HookParametersApiProcessorParams,
): PropertyDefinition[] {
  const { properties, translations, hookName, kind } = params;

  return Object.entries(properties).map(([propName, propData]) => {
    const isOptional = !propData.required;

    const isDeprecated = propData.deprecated;
    const deprecationInfo = propData.deprecationInfo;

    const typeName = propData.type?.description || propData.type.name;
    const propDefault = propData.default;
    const propDescription = translations[propName];

    return {
      hash: `${kebabCase(hookName)}-${kind === 'parameters' ? 'parameters' : 'return-value'}-${propName}`,
      propName,
      description: propDescription?.description,
      isOptional,
      isDeprecated,
      deprecationInfo,
      typeName,
      propDefault,
    };
  });
}
