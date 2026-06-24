import * as React from 'react';
import Alert from '@mui/material/Alert';

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
    <Alert
      aria-live="polite"
      variant="filled"
      severity="error"
      sx={{
        position: 'absolute',
        top: 0,
        left: '50%',
        maxWidth: 'calc(100% - 32px)',
        transform: 'translateX(-50%) translateY(-50%)',
        py: '2px',
        px: '6px',
        '& .MuiAlert-icon': {
          fontSize: 14,
          mr: 0.5,
          mt: 0.25,
          py: 0,
        },
        '& .MuiAlert-message': {
          fontSize: 12,
          py: 0,
          whiteSpace: 'pre-wrap',
        },
      }}
    >
      {message}
    </Alert>
  );
}
