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

export function renderInline(markdown: string): string;
