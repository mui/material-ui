import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';

const severities = ['error', 'warning', 'info', 'success'];
const variants = ['standard', 'outlined', 'filled'];

export default function AlertA11yColorMatrix() {
  return (
    <Stack spacing={1}>
      {variants.map((variant) =>
        severities.map((severity) => (
          <Alert key={`${variant}-${severity}`} severity={severity} variant={variant}>
            <AlertTitle>{`${severity} (${variant})`}</AlertTitle>
            This is the {severity} alert message.
          </Alert>
        )),
      )}
    </Stack>
  );
}
