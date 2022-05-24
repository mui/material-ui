import Box from '@mui/joy/Box';
import Chip from '@mui/joy/Chip';
import ChipDelete from '@mui/joy/ChipDelete';
import Typography from '@mui/joy/Typography';
import * as React from 'react';

export default function DeleteButtonChip() {
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: 5,
        my: 3,
      }}
    >
      <Box
        sx={(theme) => ({
          p: 0.5,
          borderRadius: 'sm',
          ...theme.variants.outlined.neutral,
        })}
      >
        {['Apple', 'Mango', 'Pineapple', 'Strawberry', 'Mixberry'].map((item) => (
          <Chip
            key={item}
            variant="outlined"
            endDecorator={<ChipDelete sx={{ boxShadow: 'xs' }} />}
            sx={{ mb: 0.5, mr: 0.5 }}
          >
            {item}
          </Chip>
        ))}
      </Box>
      <Box>
        <Typography level="h2" fontSize="lg" id="refine-title" mb={1}>
          Refine results
        </Typography>
        <Box
          role="group"
          aria-labelledby="refine-title"
          sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}
        >
          {[
            'Top Rated',
            'Men',
            'Black',
            'Red',
            'Green',
            'Blue',
            'Turquoise',
            'Shoes',
            'Watches',
          ].map((item) => (
            <Chip
              key={item}
              color="neutral"
              variant="outlined"
              endDecorator={<ChipDelete variant="plain" />}
              sx={{ '--Chip-radius': '10px' }}
            >
              {item}
            </Chip>
          ))}
        </Box>
      </Box>
    </Box>
  );
}
