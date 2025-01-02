import * as React from 'react';
import { styled, alpha, SxProps } from '@mui/material/styles';
import { shouldForwardProp } from '@mui/system';

const FlashCodeRoot = styled('div', {
  shouldForwardProp: (prop) =>
    shouldForwardProp(prop) && prop !== 'endLine' && prop !== 'startLine' && prop !== 'lineHeight',
})<{ endLine?: number; startLine?: number; lineHeight?: number | string }>(({ theme }) => ({
  borderRadius: 2,
  pointerEvents: 'none',
  position: 'absolute',
  left: -1, // Have at least a 1px gap between the text and the border of the FlashCode.
  right: 0,
  top: `calc(var(--Flashcode-lineHeight) * 1.5 * var(--Flashcode-startLine))`,
  height: `calc(var(--Flashcode-lineHeight) * 1.5 * (var(--Flashcode-endLine) - var(--Flashcode-startLine) + 1))`,
  transition: '0.3s',
  ...theme.typography.caption,
  backgroundColor: theme.vars
    ? `rgba(${theme.vars.palette.primary.mainChannel} / 0.15)`
    : alpha(theme.palette.primary.main, 0.1),
  border: '1px solid',
  borderColor: (theme.vars || theme).palette.primary.dark,
}));

const FlashCode = React.forwardRef(function FlashCode(
  props: React.JSX.IntrinsicElements['div'] & {
    sx?: SxProps;
    endLine?: number;
    startLine?: number;
    lineHeight?: number | string;
  },
  ref: React.ForwardedRef<HTMLDivElement>,
) {
  const { children, startLine = 0, endLine = startLine, lineHeight = '0.75rem', ...other } = props;

  return (
    <FlashCodeRoot
      ref={ref}
      endLine={endLine}
      startLine={startLine}
      lineHeight={lineHeight}
      {...other}
      style={{
        ...({
          '--Flashcode-lineHeight': lineHeight,
          '--Flashcode-startLine': startLine,
          '--Flashcode-endLine': endLine,
        } as any),
        ...other.style,
      }}
    >
      {children}
    </FlashCodeRoot>
  );
});

export default FlashCode;
