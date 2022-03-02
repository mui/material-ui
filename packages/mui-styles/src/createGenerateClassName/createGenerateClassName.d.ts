import { GenerateId } from 'jss';

export interface GenerateClassNameOptions {
  disableGlobal?: boolean;
  productionPrefix?: string;
  seed?: string;
}

export default function createGenerateClassName(options?: GenerateClassNameOptions): GenerateId;
