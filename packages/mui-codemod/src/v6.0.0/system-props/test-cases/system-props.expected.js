import { Box as Boxxx, Grid as Griddd } from '@mui/material';
import Typographyyy from '@mui/material/Typography';
import Stackkk from '@mui/material/Stack';

<Boxxx sx={{
  typography: "body1"
}} />;
<Boxxx
  sx={{
    color: "palette.main",
    display: 'block'
  }} />;

<Griddd container sx={{
  flexDirection: `column`
}} />;

const sx = { display: 'flex' };
const ml = 2;
<Typographyyy
  variant="body1"
  sx={[{
    ml: ml
  }, ...(Array.isArray(sx) ? sx : [sx])]} />;

<Stackkk
  sx={[{
    flex: "1"
  }, ...(Array.isArray(sx) ? sx : [sx])]} />;

<Boxxx
  sx={[{
    typography: "body1"
  }, foo.bar ? { opacity: 0 } : sx]} />;
