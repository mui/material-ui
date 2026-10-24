import Grid from '@mui/material/Grid';

const columns = [4, null, 12] as const;
const spacing = [1, null, '2rem'] as const;
const direction = ['row', null, 'row-reverse'] as const;
const size = [false, null, 'auto', 'grow', 6] as const;
const offset = [0, null, 'auto', 2] as const;

<Grid
  container
  columns={columns}
  spacing={spacing}
  rowSpacing={spacing}
  columnSpacing={spacing}
  direction={direction}
  size={size}
  offset={offset}
/>;

<Grid columns={[4, null, 12]} spacing={[1, null, '2rem']} size={[6, null, 'grow']} />;

// @ts-expect-error column counts must be numbers
<Grid columns={['4', null, 12] as const} />;

// @ts-expect-error vertical directions are not supported
<Grid direction={['row', null, 'column'] as const} />;

// @ts-expect-error sizes must be valid grid sizes
<Grid size={[6, null, 'invalid'] as const} />;
