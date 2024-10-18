import * as React from 'react';
import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import VideocamIcon from '@mui/icons-material/Videocam';
import ImageIcon from '@mui/icons-material/Image';
import FolderZipIcon from '@mui/icons-material/FolderZip';
import { FileType } from '../types';

const FILE_TYPE_ICONS = {
  video: {
    component: VideocamIcon,
    color: 'error',
  },
  image: {
    component: ImageIcon,
    color: 'error',
  },
  document: {
    component: TextSnippetIcon,
    color: 'primary',
  },
  archive: {
    component: FolderZipIcon,
    color: 'inherit',
  },
} satisfies Record<
  string,
  { component: React.ElementType; color: SvgIconProps['color'] }
>;

const FILE_ICON: Record<
  FileType,
  { component: React.ElementType; color: SvgIconProps['color'] }
> = {
  pdf: FILE_TYPE_ICONS.document,
  docx: FILE_TYPE_ICONS.document,
  txt: FILE_TYPE_ICONS.document,
  mp4: FILE_TYPE_ICONS.video,
  mov: FILE_TYPE_ICONS.video,
  webm: FILE_TYPE_ICONS.video,
  jpg: FILE_TYPE_ICONS.image,
  jpeg: FILE_TYPE_ICONS.image,
  png: FILE_TYPE_ICONS.image,
  gif: FILE_TYPE_ICONS.image,
  tiff: FILE_TYPE_ICONS.image,
  webp: FILE_TYPE_ICONS.image,
  zip: FILE_TYPE_ICONS.archive,
};

export function FileIcon(props: SvgIconProps & { type: FileType }) {
  const { type } = props;
  const iconProps = FILE_ICON[type];
  return <SvgIcon {...iconProps} {...props} />;
}
