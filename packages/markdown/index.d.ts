interface TableOfContentsEntry {
  children: TableOfContentsEntry;
  hash: string;
  level: number;
  text: string;
}

export function createRender(context: {
  headingHashes: Record<string, string>;
  toc: TableOfContentsEntry[];
  userLanguage: string;
  ignoreLanguagePages: (path: string) => boolean;
}): (markdown: string) => string;

export function getHeaders(markdown: string): Record<string, string | string[]>;

export function getTitle(markdown: string): string;

export function renderMarkdown(markdown: string): string;

export interface Doc {
  rendered: Array<string | { component: string } | { demo: string }>;
}

export type Docs = Record<string, Doc>;

export interface Demo {
  module: string;
  raw: string;
  moduleTailwind?: string;
  rawTailwind?: string;
  moduleTSTailwind?: string;
  rawTailwindTS?: string;
  moduleCSS?: string;
  rawCSS?: string;
  moduleTSCSS?: string;
  rawCSSTS?: string;
  tailwindJsxPreview?: string;
  cssJsxPreview?: string;
  jsxPreview?: string;
}

export type Demos = Record<string, Demo>;

export type DemoComponents = Record<string, string>;

export type SrcComponents = Record<string, string>;

export interface MarkDownProps {
  docs: Docs;
  demos: Demos;
  demoComponents: DemoComponents;
  srcComponents: SrcComponents;
}
