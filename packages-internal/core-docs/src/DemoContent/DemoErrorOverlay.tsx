import * as React from 'react';
import Alert from '@mui/material/Alert';
import { styled } from '@mui/material/styles';

// `styled` (static, cached) rather than `sx` (re-processed per render): this
// overlay can re-render on every live-edit keystroke, so keep its styles off the
// render path.
const ErrorAlert = styled(Alert)(({ theme }) => ({
  position: 'absolute',
  top: 0,
  left: '50%',
  maxWidth: 'calc(100% - 32px)',
  transform: 'translateX(-50%) translateY(-50%)',
  paddingTop: '2px',
  paddingBottom: '2px',
  paddingLeft: '6px',
  paddingRight: '6px',
  '& .MuiAlert-icon': {
    fontSize: 14,
    marginRight: theme.spacing(0.5),
    marginTop: theme.spacing(0.25),
    paddingTop: 0,
    paddingBottom: 0,
  },
  '& .MuiAlert-message': {
    fontSize: 12,
    paddingTop: 0,
    paddingBottom: 0,
    whiteSpace: 'pre-wrap',
  },
}));

/**
 * Floating alert anchored to the top edge of the preview area. Surfaces the
 * live-edit runtime error for the selected variant, reported by
 * `useDemoController` through `CodeControllerContext` and read off `useDemo().error`.
 */
export function DemoErrorOverlay({ message }: { message: string | null }) {
  if (!message) {
    return null;
  }
  return (
    <ErrorAlert aria-live="polite" variant="filled" severity="error">
      {message}
    </ErrorAlert>
  );
}
