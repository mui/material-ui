import GridA from '@mui/material/Grid2';
import GridV1A from '@mui/material/Grid';
import GridB from '@mui/system/Grid';
import GridC from '@mui/joy/Grid';
import { Grid2 as GridD, Grid as GridV1B } from '@mui/material';
import { Grid as GridE } from '@mui/system';
import { Grid as GridF } from '@mui/joy';

// Transforms on all the possible imports
<GridA size={2} />;
<GridB size={2} />;
<GridC size={2} />;
<GridD size={2} />;
<GridE size={2} />;
<GridF size={2} />;

// Transforms responsive sizes
<GridA
  size={{
    xs: 2,
    sm: 4,
    md: 6,
    lg: 8,
    xl: 10
  }} />;

// Transforms all the possible size values
<GridA
  size={{
    xs: "grow",
    sm: "auto",
    md: 2,
    lg: "grow",
    xl: false
  }} />;

// Doesn't add jsx object expression for single string values
<GridA size="auto" />;

// Transforms offset
<GridA offset={2} />;

// Transforms responsive offset
<GridA
  offset={{
    xs: 2,
    sm: 4,
    md: 6,
    lg: 8,
    xl: 10
  }} />;

// Transforms all the possible offset values
<GridA
  offset={{
    xs: 2,
    sm: "auto"
  }} />;

// Transforms spread props
<GridA
  size={{
    xs: 2,
    sm: 4
  }}
  offset={{
    xs: 0,
    sm: 2
  }} />;

// Doesn't transform Grid v1
<GridV1A xs={2} />;
<GridV1B xs={2} />;
