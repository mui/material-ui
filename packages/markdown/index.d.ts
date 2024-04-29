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

export interface MarkdownHeaders {
  packageName?: string;
  productId: string;
  githubLabel?: string;
  waiAria?: string;
  materialDesign?: string;
}

export function getHeaders(markdown: string): MarkdownHeaders;

export function getTitle(markdown: string): string;

export function renderMarkdown(markdown: string): string;
