import { GenerateClassName } from 'jss';

export interface GenerateClassNameOptions {
  dangerouslyUseGlobalCSS?: boolean;
  productionPrefix?: string;
}

export default function createGenerateClassName(
  options?: GenerateClassNameOptions,
): GenerateClassName;
