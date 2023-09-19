import * as React from 'react';
import Button from '@mui/joy/Button';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import StarRateRoundedIcon from '@mui/icons-material/StarRateRounded';

export default function HeaderSection() {
  return (
    <Stack
      direction={{
        xs: 'column',
        sm: 'row',
      }}
      justifyContent="space-between"
      alignItems="flex-start"
      spacing={2}
    >
      <div>
        <Typography
          level="h2"
          sx={{
            mt: 1,
            mb: 2,
          }}
        >
          232 stays in Melbourne
        </Typography>
        <Typography level="body-md" color="neutral">
          Book your next stay at one of our properties.
        </Typography>
      </div>

      <Stack direction="row" spacing={1.5}>
        <Button variant="outlined" color="neutral">
          Shared
        </Button>
        <Button
          variant="solid"
          color="primary"
          startDecorator={<StarRateRoundedIcon />}
        >
          Save search
        </Button>
      </Stack>
    </Stack>
  );
}
