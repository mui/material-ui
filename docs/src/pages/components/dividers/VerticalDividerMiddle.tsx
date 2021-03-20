import * as React from 'react';
import Divider from '@material-ui/core/Divider';
import { VerticalDividersContainer } from './VerticalDividers';

export default function VerticalDividerMiddle() {
  return (
    <VerticalDividersContainer>
      <Divider orientation="vertical" variant="middle" flexItem />
    </VerticalDividersContainer>
  );
}
