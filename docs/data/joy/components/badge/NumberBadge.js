import * as React from 'react';
import Badge from '@mui/joy/Badge';
import Box from '@mui/joy/Box';
import IconButton from '@mui/joy/IconButton';
import Typography from '@mui/joy/Typography';
import Checkbox from '@mui/joy/Checkbox';
import Add from '@mui/icons-material/Add';
import Remove from '@mui/icons-material/Remove';

export default function NumberBadge() {
  const [count, setCount] = React.useState(0);
  const [showZero, setShowZero] = React.useState(false);
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 2,
        mt: 4,
      }}
    >
      <Badge badgeContent={count} showZero={showZero}>
        <Typography level="h1" component="h2">
          🛍
        </Typography>
      </Badge>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 2,
          pt: 4,
          mb: 2,
          borderTop: '1px solid',
          borderColor: 'background.level1',
        }}
      >
        <IconButton
          size="sm"
          variant="outlined"
          onClick={() => setCount((c) => c - 1)}
        >
          <Remove />
        </IconButton>
        <Typography textColor="text.secondary" sx={{ fontWeight: 'md' }}>
          {count}
        </Typography>
        <IconButton
          size="sm"
          variant="outlined"
          onClick={() => setCount((c) => c + 1)}
        >
          <Add />
        </IconButton>
      </Box>
      <Checkbox
        onChange={(event) => setShowZero(event.target.checked)}
        checked={showZero}
        label="show zero"
      />
    </Box>
  );
}
