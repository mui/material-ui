import type { TableOfContentsEntry } from '@mui/internal-markdown';

// TODO Move this type definition to the AppLayoutDocs file when moved to TS
export interface TableOfContentsParams {
  children: (TableOfContentsParams | TableOfContentsEntry)[];
  hash: string;
  text: string;
}

export interface LayoutStorageKeys {
  slots: string;
  props: string;
  classes: string;
}
