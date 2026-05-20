import * as React from 'react';
import Alert from '@mui/material/Alert';
import { useDemoError } from './DemoErrorContext';

/**
 * Floating alert anchored to the top edge of the preview area. Surfaces
 * live-edit runtime errors reported by `DemoController`'s react-runner
 * instances.
 */
export function DemoErrorOverlay({ variantKey }: { variantKey: string | undefined }) {
  const message = useDemoError(variantKey);
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
