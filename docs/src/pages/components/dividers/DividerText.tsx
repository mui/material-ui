import * as React from 'react';
import { experimentalStyled as styled } from '@material-ui/core/styles';
import MuiStack from '@material-ui/core/Stack';
import Divider from '@material-ui/core/Divider';
import Chip from '@material-ui/core/Chip';

const Stack = styled(MuiStack)(({ theme }) => ({
  width: '100%',
  ...theme.typography.body2,
}));

export default function DividerText() {
  const content = (
    <div>
      {`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus id dignissim justo.
   Nulla ut facilisis ligula. Interdum et malesuada fames ac ante ipsum primis in faucibus.
   Sed malesuada lobortis pretium.`}
    </div>
  );

  return (
    <Stack spacing={2}>
      {content}
      <Divider>CENTER</Divider>
      {content}
      <Divider textAlign="left">LEFT</Divider>
      {content}
      <Divider textAlign="right">RIGHT</Divider>
      {content}
      <Divider>
        <Chip label="CHIP" />
      </Divider>
      {content}
    </Stack>
  );
}
