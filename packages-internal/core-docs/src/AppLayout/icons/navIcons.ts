import type SvgIcon from '@mui/material/SvgIcon';
import ArticleRoundedIcon from '@mui/icons-material/ArticleRounded';
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';
import BookRoundedIcon from '@mui/icons-material/BookRounded';
import ChromeReaderModeRoundedIcon from '@mui/icons-material/ChromeReaderModeRounded';
import WebRoundedIcon from '@mui/icons-material/WebRounded';

type NavIconName = 'ReaderIcon' | 'BookIcon' | 'DescriptionIcon' | 'VisibilityIcon' | 'WebIcon';

// Without the annotation, the declaration points at `packages/mui-material/src`.
export const standardNavIcons: Record<NavIconName, typeof SvgIcon> = {
  ReaderIcon: ChromeReaderModeRoundedIcon,
  BookIcon: BookRoundedIcon,
  DescriptionIcon: ArticleRoundedIcon,
  VisibilityIcon: VisibilityRoundedIcon,
  WebIcon: WebRoundedIcon,
};
