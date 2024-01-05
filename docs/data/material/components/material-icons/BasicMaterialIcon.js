import * as React from 'react';
import Stack from '@mui/material/Stack';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';

export default function BasicMaterialIcon() {
  return (
    <Stack spacing={2} direction="row" useFlexGap>
      <AcUnitIcon />
      <AccountBalanceIcon />
      <AddAPhotoIcon />
    </Stack>
  );
}
