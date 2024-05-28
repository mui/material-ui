import Grid from '@mui/material/Grid';
import { Grid as MyGrid } from '@mui/material';

<Grid wrap="wrap-reverse" />;
<MyGrid wrap="wrap-reverse" />;

<Grid wrap="wrap-reverse" flexWrap="wrap" />;
<MyGrid wrap="wrap-reverse" flexWrap="wrap" />;

// should skip non MUI components
<NonMuiGrid wrap="wrap-reverse" />;
