import * as React from 'react';
import Box from '@mui/joy/Box';
import SaveIcon from '@mui/icons-material/Save';
import SendIcon from '@mui/icons-material/Send';
import Button from '@mui/joy/Button';
import Switch from '@mui/joy/Switch';

export default function ButtonLoading() {
  const [loading, setLoading] = React.useState(true);
  function handleClick() {
    setLoading(true);
  }

  return (
    <Box>
      <Switch
        checked={loading}
        onChange={() => setLoading(!loading)}
        endDecorator={loading ? 'On' : 'Off'}
      />
      <Box sx={{ '& > button': { m: 1 } }}>
        <Button
          size="sm"
          onClick={handleClick}
          loading={loading}
          variant="outlined"
          disabled
        >
          disabled
        </Button>
        <Button
          size="sm"
          onClick={handleClick}
          loading={loading}
          loadingIndicator="Loading…"
          variant="outlined"
        >
          Fetch data
        </Button>
        <Button
          size="sm"
          onClick={handleClick}
          endDecorator={<SendIcon />}
          loading={loading}
          loadingPosition="end"
          variant="solid"
        >
          Send
        </Button>
        <Button
          size="sm"
          onClick={handleClick}
          loading={loading}
          loadingPosition="start"
          startDecorator={<SaveIcon />}
          variant="solid"
        >
          Save
        </Button>
      </Box>

      <Box sx={{ '& > button': { m: 1 } }}>
        <Button onClick={handleClick} loading={loading} variant="outlined" disabled>
          disabled
        </Button>
        <Button
          onClick={handleClick}
          loading={loading}
          loadingIndicator="Loading…"
          variant="outlined"
        >
          Fetch data
        </Button>
        <Button
          onClick={handleClick}
          endDecorator={<SendIcon />}
          loading={loading}
          loadingPosition="end"
          variant="solid"
        >
          Send
        </Button>
        <Button
          onClick={handleClick}
          loading={loading}
          loadingPosition="start"
          startDecorator={<SaveIcon />}
          variant="solid"
        >
          Save
        </Button>
      </Box>
    </Box>
  );
}
