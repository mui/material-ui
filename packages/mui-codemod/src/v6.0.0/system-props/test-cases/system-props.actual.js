import { Box as Boxxx, Grid as Griddd, Grid2 as Griddd2 } from '@mui/material';
import Typographyyy from '@mui/material/Typography';
import Stackkk from '@mui/material/Stack';

<Boxxx typography="body1" />;
<Boxxx color="palette.main" sx={{ display: 'block' }} />;

<Griddd container flexDirection={`column`} />;
<Griddd2 container flexDirection={`column`} />;

const sx = { display: 'flex' };
const ml = 2;
<Typographyyy variant="body1" color="primary.main" ml={ml} sx={sx} />;
<Typographyyy variant="body1" color="divider" ml={ml} sx={sx} />;
<Typographyyy variant="body1" color="inherit" ml={ml} sx={sx} />;
<Typographyyy
  fontSize="xl4"
  lineHeight={1}
  startDecorator={
    <Typographyyy fontSize="lg" textColor="text.secondary">
      $
    </Typographyyy>
  }
  sx={{ alignItems: 'flex-start' }}
>
  25
</Typographyyy>;
function Copyright(props) {
  return (
    <Typographyyy variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typographyyy>
  );
}

<Stackkk flex="1" sx={[...(Array.isArray(sx) ? sx : [sx])]} />;

<Boxxx typography="body1" sx={foo.bar ? { opacity: 0 } : sx} />;
