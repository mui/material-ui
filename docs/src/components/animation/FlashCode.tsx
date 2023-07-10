import { styled, alpha } from '@mui/material/styles';
import { shouldForwardProp } from '@mui/system';

const FlashCode = styled('div', {
  shouldForwardProp: (prop) =>
    shouldForwardProp(prop) && prop !== 'endLine' && prop !== 'startLine' && prop !== 'lineHeight',
})<{ endLine?: number; startLine?: number; lineHeight?: number | string }>(
  ({ theme, startLine = 0, endLine = startLine, lineHeight = '0.75rem' }) => ({
    borderRadius: 2,
    pointerEvents: 'none',
    position: 'absolute',
    left: 0,
    right: 0,
    top: `calc(${lineHeight} * 1.5 * ${startLine})`,
    height: `calc(${lineHeight} * 1.5 * ${endLine - startLine + 1})`,
    transition: '0.3s',
    ...theme.typography.caption,
    backgroundColor: theme.vars
      ? `rgba(${theme.vars.palette.primary.mainChannel} / 0.2)`
      : alpha(theme.palette.primary.main, 0.2),
    border: '1px solid',
    borderColor: (theme.vars || theme).palette.primary.dark,
  }),
);

export default FlashCode;
