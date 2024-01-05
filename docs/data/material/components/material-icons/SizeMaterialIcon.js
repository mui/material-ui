import * as React from 'react';
import Stack from '@mui/material/Stack';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';

export default function SizeMaterialIcon() {
  return (
    <Stack spacing={2} direction="row" useFlexGap alignItems="center">
      <AddAPhotoIcon sx={{ fontSize: 10 }} />
      <AcUnitIcon fontSize="small" />
      <AccountBalanceIcon fontSize="large" />
    </Stack>
  );
}
