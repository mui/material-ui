import * as React from 'react';
import { Button } from '@mui/base/Button';

export default function OverridingRootSlot() {
  return <Button slots={{ root: 'div' }}>Button</Button>;
}
