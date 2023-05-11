/// <reference types="./modules.d.ts" />

export interface Doc {
  description: string;
  location: string;
  rendered: (string | { component: string; demo: string })[];
  toc: TableOfContentsEntry[];
  title: string;
  headers: Headers;
}

export interface TableOfContentsEntry {
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

export type Headers = Record<string, string | string[]>;

export function getHeaders(markdown: string): Record<string, string | string[]>;

export function getTitle(markdown: string): string;

export function renderInline(markdown: string): string;

export interface Demo {
  module: string;
  raw: string;
  jsxPreview?: string;
  moduleTS?: string;
  rawTS?: string;
}

export type Docs = Record<string, Doc>;
export type Demos = Record<string, Demo>;
export type DemoComponents = Partial<Record<string, React.ComponentType<{ markdown: Doc }>>>;
export type SrcComponents = Partial<Record<string, React.ComponentType<{ markdown: Doc }>>>;
