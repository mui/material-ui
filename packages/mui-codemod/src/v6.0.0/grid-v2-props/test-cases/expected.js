import GridA from '@mui/material/Unstable_Grid2';
import GridB from '@mui/system/Unstable_Grid';
import GridC from '@mui/joy/Grid';
import { Unstable_Grid2 as GridD, Grid as GridV1 } from '@mui/material';
import { Unstable_Grid as GridE } from '@mui/system';
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
<GridV1 xs={2} />;
