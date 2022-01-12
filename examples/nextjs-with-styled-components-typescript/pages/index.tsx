import * as React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import LocalTypography from '../src/Typography';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import ProTip from '../src/ProTip';
import Link from '../src/Link';

const CustomButton = styled(Button)({
  backgroundColor: 'red',
});

const LeftAlignedTypography = styled(Typography)`
  text-align: left;
`;

const LeftAlignedLocalTypography = styled(LocalTypography)`
  text-align: left;
`;

export default function Index() {
  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 4 }}>
        <Link href="/about" color="secondary">
          Go to the about page
        </Link>
        <ProTip />
        <CustomButton>Should have red background</CustomButton>
        <LeftAlignedTypography align={'right'}>
          This should be always aligned left (not working - coming from MUI)
        </LeftAlignedTypography>
        {/* @ts-ignore */}
        <LeftAlignedLocalTypography align="right">
          This should be always aligned left
        </LeftAlignedLocalTypography>
      </Box>
    </Container>
  );
}
