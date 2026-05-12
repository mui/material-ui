import Alert from '@mui/material/Alert';

export default function ColorAlerts() {
  // @focus-start @padding 1
  return (
    <Alert severity="success" color="warning">
      This is a success Alert with warning colors.
    </Alert>
  );
  // @focus-end
}
