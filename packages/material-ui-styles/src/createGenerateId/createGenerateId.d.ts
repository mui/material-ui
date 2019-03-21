import { GenerateId } from 'jss';

export interface GenerateIdOptions {
  globalClassNames?: boolean;
  productionPrefix?: string;
  seed?: string;
}

export default function createGenerateId(options?: GenerateIdOptions): GenerateId;
