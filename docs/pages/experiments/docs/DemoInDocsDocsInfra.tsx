import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

export default function DemoInDocsDocsInfra() {
  return (
    <Stack sx={{ width: '100%' }} spacing={2}>
      <Alert severity="info">This demo loads its source through docs-infra.</Alert>
      <Alert severity="success">Its siblings still use the legacy pipeline.</Alert>
    </Stack>
  );
}
