import * as React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Grid from '@mui/joy/Grid';
import Typography from '@mui/joy/Typography';

export default function VariantsRatio() {
  return (
    <Grid container spacing={2} sx={{ width: '100%' }}>
      <Grid size={{ xs: 6, md: 'grow' }}>
        <AspectRatio variant="solid">
          <Typography level="inherit" sx={{ fontWeight: 'lg' }}>
            Solid
          </Typography>
        </AspectRatio>
      </Grid>
      <Grid size={{ xs: 6, md: 'grow' }}>
        <AspectRatio variant="soft">
          <Typography level="inherit" sx={{ fontWeight: 'lg' }}>
            Soft
          </Typography>
        </AspectRatio>
      </Grid>
      <Grid size={{ xs: 6, md: 'grow' }}>
        <AspectRatio variant="outlined">
          <Typography level="inherit" sx={{ fontWeight: 'lg' }}>
            Outlined
          </Typography>
        </AspectRatio>
      </Grid>
      <Grid size={{ xs: 6, md: 'grow' }}>
        <AspectRatio variant="plain">
          <Typography level="inherit" sx={{ fontWeight: 'lg' }}>
            Plain
          </Typography>
        </AspectRatio>
      </Grid>
    </Grid>
  );
}
