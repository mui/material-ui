import { GenerateClassName } from 'jss';

interface GenerateClassNameOptions {
  dangerouslyUseGlobalCSS?: boolean;
  productionPrefix?: string;
}

export default function createGenerateClassName(
  options?: GenerateClassNameOptions,
): GenerateClassName<any>;
