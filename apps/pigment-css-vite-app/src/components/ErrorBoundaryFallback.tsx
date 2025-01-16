import { css } from '@mui/material-pigment-css';
import Alert from '@mui/material/Alert';
import { FallbackProps } from 'react-error-boundary';

export function ErrorBoundaryFallback({ error }: FallbackProps) {
  const err = error as Error;
  return (
    <Alert severity="error" variant="outlined">
      Error while rendering.
      <pre
        className={css({
          border: '1px dotted #ccc',
          padding: 4,
          whiteSpace: 'pre-wrap',
        })}
      >
        {err.message}
      </pre>
    </Alert>
  );
}
