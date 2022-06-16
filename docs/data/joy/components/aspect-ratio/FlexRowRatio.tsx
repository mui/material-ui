import * as React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Box from '@mui/joy/Box';
import TextField from '@mui/joy/TextField';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';

export default function FlexRowRatio() {
  const [flexBasis, setFlexBasis] = React.useState(200);
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Sheet
        variant="outlined"
        sx={{
          display: 'flex',
          gap: 2,
          p: 2,
          minWidth: 300,
          borderRadius: 'sm',
        }}
      >
        <AspectRatio
          sx={{
            flexBasis: flexBasis ? `${flexBasis}px` : undefined,
            borderRadius: 'sm',
            overflow: 'auto',
          }}
        >
          <img
            src="https://images.unsplash.com/photo-1502657877623-f66bf489d236?auto=format&fit=crop&w=800"
            srcSet="https://images.unsplash.com/photo-1502657877623-f66bf489d236?auto=format&fit=crop&w=800&dpr=2 2x"
            alt=""
          />
        </AspectRatio>
        <Box>
          <Typography fontWeight="md">Yosemite National Park</Typography>
          <Typography level="body2">California, USA</Typography>
        </Box>
      </Sheet>
      <br />
      <TextField
        variant="outlined"
        label="flexBasis"
        placeholder="number"
        endDecorator="px"
        type="number"
        value={flexBasis}
        onChange={(event) => setFlexBasis(event.target.valueAsNumber)}
        sx={{ mx: 'auto', width: '100%' }}
      />
    </Box>
  );
}
