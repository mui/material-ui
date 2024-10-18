import { GridRowId } from '@mui/x-data-grid-premium';

export type FileType =
  | 'pdf'
  | 'docx'
  | 'txt'
  | 'mp4'
  | 'mov'
  | 'webm'
  | 'jpg'
  | 'jpeg'
  | 'png'
  | 'gif'
  | 'tiff'
  | 'webp'
  | 'zip';

export type FileState = 'uploaded' | 'pending';

export type RowModel = {
  id: GridRowId;
  type: FileType;
  name: string;
  description: string;
  size: number;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  state: FileState;
};
