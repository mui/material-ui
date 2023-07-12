import * as React from 'react';
import Button from '@mui/joy/Button';
import IconButton from '@mui/joy/IconButton';
import Stack from '@mui/joy/Stack';
import FormatBold from '@mui/icons-material/FormatBold';

export default function ToggleButtons() {
  const [pressed, setPressed] = React.useState(false);
  return (
    <Stack spacing={2} direction="row">
      <Button
        variant="outlined"
        color="neutral"
        onClick={() => setPressed(!pressed)}
        aria-pressed={pressed ? 'true' : 'false'}
        sx={(theme) =>
          pressed ? { boxShadow: theme.shadow.md.replace(/,/g, ',inset ') } : {}
        }
      >
        Button
      </Button>
      <IconButton
        variant="outlined"
        color="neutral"
        onClick={() => setPressed(!pressed)}
        aria-pressed={pressed ? 'true' : 'false'}
        sx={(theme) =>
          pressed ? { boxShadow: theme.shadow.md.replace(/,/g, ',inset ') } : {}
        }
      >
        <FormatBold />
      </IconButton>
    </Stack>
  );
}
