import kebabCase from 'lodash/kebabCase';

export type GetHashParams = {
  componentName: string;
  propName: string;
};

export function getHookParamsHash({ componentName, propName }: GetHashParams) {
  return `${kebabCase(componentName)}-parameters-${propName}`;
}

export function getHookReturnHash({ componentName, propName }: GetHashParams) {
  return `${kebabCase(componentName)}-return-value-${propName}`;
}

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
