import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

export default function AlertA11ySemanticStates() {
  return (
    <Stack spacing={1}>
      {/* Default: role="alert", an assertive live region. The severity icon is aria-hidden. */}
      <Alert severity="error">Your session has expired.</Alert>
      {/* The severity is available as text, not only through the icon and the color. */}
      <Alert severity="warning">
        <AlertTitle>Warning</AlertTitle>
        Your storage is almost full.
      </Alert>
      {/* Non-urgent message: the author swaps the role for a polite live region. */}
      <Alert severity="info" role="status">
        A new version is available.
      </Alert>
      {/* Close button: its name comes from `closeText` (default "Close"). */}
      <Alert severity="success" onClose={() => {}}>
        The file was saved.
      </Alert>
      <Alert severity="success" onClose={() => {}} closeText="Dismiss">
        The message was sent.
      </Alert>
      {/* With no icon, the severity must be in the text. */}
      <Alert severity="error" icon={false} variant="outlined">
        Error: the payment was declined.
      </Alert>
      {/* An action replaces the close button. */}
      <Alert
        severity="success"
        variant="filled"
        action={
          <Button color="inherit" size="small">
            Undo
          </Button>
        }
      >
        The item was archived.
      </Alert>
    </Stack>
  );
}
