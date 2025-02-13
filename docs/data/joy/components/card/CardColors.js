import * as React from 'react';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Typography from '@mui/joy/Typography';
import Stack from '@mui/joy/Stack';

export default function CardColors() {
  const [variant, setVariant] = React.useState('plain');
  const [color, setColor] = React.useState('neutral');
  return (
    <Stack spacing={2}>
      <Card variant={variant} color={color} sx={{ minWidth: 343 }}>
        <Typography
          level="title-md"
          textColor="inherit"
          sx={{ textTransform: 'capitalize' }}
        >
          {color} {variant} card
        </Typography>
      </Card>
      <FormControl>
        <FormLabel>Variant</FormLabel>
        <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
          <Button
            size="sm"
            variant="soft"
            color="neutral"
            onClick={() => setVariant('plain')}
          >
            plain
          </Button>
          <Button
            size="sm"
            variant="soft"
            color="neutral"
            onClick={() => setVariant('outlined')}
          >
            outlined
          </Button>
          <Button
            size="sm"
            variant="soft"
            color="neutral"
            onClick={() => setVariant('soft')}
          >
            soft
          </Button>
          <Button
            size="sm"
            variant="soft"
            color="neutral"
            onClick={() => setVariant('solid')}
          >
            solid
          </Button>
        </Box>
      </FormControl>
      <FormControl>
        <FormLabel>Color</FormLabel>
        <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
          <Button
            size="sm"
            variant="soft"
            color="primary"
            onClick={() => setColor('primary')}
          >
            primary
          </Button>
          <Button
            size="sm"
            variant="soft"
            color="neutral"
            onClick={() => setColor('neutral')}
          >
            neutral
          </Button>
          <Button
            size="sm"
            variant="soft"
            color="danger"
            onClick={() => setColor('danger')}
          >
            danger
          </Button>
          <Button
            size="sm"
            variant="soft"
            color="success"
            onClick={() => setColor('success')}
          >
            success
          </Button>
          <Button
            size="sm"
            variant="soft"
            color="warning"
            onClick={() => setColor('warning')}
          >
            warning
          </Button>
        </Box>
      </FormControl>
    </Stack>
  );
}
