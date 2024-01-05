import * as React from 'react';
import Stack from '@mui/material/Stack';
import AcUnitIcon from '@mui/icons-material/AcUnit';

export default function ColorMaterialIcon() {
  return (
    <Stack spacing={2} direction="row" useFlexGap>
      <AcUnitIcon color="primary" />
      <AcUnitIcon color="secondary" />
      <AcUnitIcon color="success" />
      <AcUnitIcon color="warning" />
      <AcUnitIcon color="error" />
      <AcUnitIcon color="info" />
    </Stack>
  );
}
