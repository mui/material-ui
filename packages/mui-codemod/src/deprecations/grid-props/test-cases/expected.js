import Grid from '@mui/material/Grid';
import { Grid as MyGrid } from '@mui/material';

<Grid flexWrap="wrap-reverse" />;
<MyGrid flexWrap="wrap-reverse" />;

<Grid flexWrap="wrap" />;
<MyGrid flexWrap="wrap" />;

// should skip non MUI components
<NonMuiGrid wrap="wrap-reverse" />;
