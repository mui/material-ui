import type { MuiProductId } from 'docs/src/modules/utils/getProductInfoFromUrl';

export type CodeStyling = 'Tailwind' | 'MUI System';
export type CodeVariant = 'TS' | 'JS';
export interface DemoData {
  title: string;
  language: string;
  raw: string;
  codeVariant: CodeVariant;
  githubLocation: string;
  productId?: Exclude<MuiProductId, 'null'>;
  codeStyling: CodeStyling;
}
