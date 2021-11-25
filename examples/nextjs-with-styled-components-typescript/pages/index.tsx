import * as React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import TouchRipple from '@mui/material/ButtonBase/TouchRipple';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import ProTip from '../src/ProTip';
import Link from '../src/Link';

const CustomButton = styled(Button)({
  backgroundColor: 'red'
});

const LeftAlignedTypography = styled(Typography)`
  text-align: left;
`;

const CustomTouchRipple = styled(TouchRipple)`
  opacity: 0.5;
  background: red;
`;

export default function Index() {
  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Next.js v5-beta with TypeScript example
        </Typography>
        <Link href="/about" color="secondary">
          Go to the about page
        </Link>
        <ProTip />
        <CustomButton>This is not working as styles are defined with fn</CustomButton>
        <Typography textAlign={"right"}>This should be aligned right.</Typography>
        <LeftAlignedTypography textAlign={"right"}>This will be aligned left, no matter what! (not working as the styles are defined with fn)</LeftAlignedTypography>
        <div style={{ width: 200, height: 200, position: 'relative', border: "2px dashed grey"}}>
          <CustomTouchRipple />
          This override is always working, as the TouchRipple is defined using ``
        </div>
        <div style={{ width: 200, height: 200, position: 'relative', border: "2px dashed grey"}}>
          <TouchRipple />
          This is the default Touch Ripple
        </div>
      </Box>
    </Container>
  );
}
