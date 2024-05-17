import { Box as Boxxx, Grid as Griddd } from '@mui/material';
import Typographyyy from '@mui/material/Typography';
import Stackkk from '@mui/material/Stack';

<Boxxx typography="body1" />;
<Boxxx color="palette.main" sx={{ display: 'block' }} />;

<Griddd container flexDirection={`column`} />;

const sx = { display: 'flex' };
const ml = 2;
<Typographyyy variant="body1" color="primary.main" ml={ml} sx={sx} />;
<Typographyyy variant="body1" color="divider" ml={ml} sx={sx} />;
<Typographyyy variant="body1" color="inherit" ml={ml} sx={sx} />;

<Stackkk flex="1" sx={[...(Array.isArray(sx) ? sx : [sx])]} />;

<Boxxx typography="body1" sx={foo.bar ? { opacity: 0 } : sx} />;
