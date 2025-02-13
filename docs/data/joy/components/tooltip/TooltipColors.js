import * as React from 'react';
import Button from '@mui/joy/Button';
import Tooltip from '@mui/joy/Tooltip';
import Box from '@mui/joy/Box';
import Radio from '@mui/joy/Radio';
import RadioGroup from '@mui/joy/RadioGroup';
import Sheet from '@mui/joy/Sheet';
import Typography from '@mui/joy/Typography';

export default function TooltipColors() {
  const [variant, setVariant] = React.useState('solid');
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, minmax(150px, 1fr))',
          gap: 1,
        }}
      >
        <Tooltip title="Delete" color="primary" placement="top" variant={variant}>
          <Button variant="plain" color="primary">
            Primary
          </Button>
        </Tooltip>
        <Tooltip title="Delete" color="neutral" placement="top" variant={variant}>
          <Button variant="plain" color="neutral">
            Neutral
          </Button>
        </Tooltip>
        <Tooltip title="Delete" color="danger" placement="top" variant={variant}>
          <Button variant="plain" color="danger">
            Danger
          </Button>
        </Tooltip>
        <Tooltip title="Delete" color="success" variant={variant}>
          <Button variant="plain" color="success">
            Success
          </Button>
        </Tooltip>
        <Tooltip title="Delete" color="warning" variant={variant}>
          <Button variant="plain" color="warning">
            Warning
          </Button>
        </Tooltip>
      </Box>
      <Sheet
        sx={{
          background: 'transparent',
          pl: 4,
          borderLeft: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Typography
          level="body-sm"
          id="variant-label"
          textColor="text.primary"
          sx={{ fontWeight: 'xl', mb: 1 }}
        >
          Variant:
        </Typography>
        <RadioGroup
          size="sm"
          aria-labelledby="variant-label"
          name="variant"
          value={variant}
          onChange={(event) => setVariant(event.target.value)}
        >
          <Radio label="Solid" value="solid" />
          <Radio label="Soft" value="soft" />
          <Radio label="Outlined" value="outlined" />
          <Radio label="Plain" value="plain" />
        </RadioGroup>
      </Sheet>
    </Box>
  );
}
