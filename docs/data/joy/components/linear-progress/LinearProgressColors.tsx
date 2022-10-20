import * as React from 'react';
import LinearProgress from '@mui/joy/LinearProgress';
import Box from '@mui/joy/Box';
import Radio from '@mui/joy/Radio';
import RadioGroup from '@mui/joy/RadioGroup';
import Sheet from '@mui/joy/Sheet';
import Typography from '@mui/joy/Typography';
import { VariantProp } from '@mui/joy/styles';

export default function LinearProgressColors() {
  const [variant, setVariant] = React.useState<VariantProp>('soft');

  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        gap: 3,
      }}
    >
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          gap: 2,
          flexDirection: 'column',
        }}
      >
        <LinearProgress color="primary" variant={variant} />
        <LinearProgress color="neutral" variant={variant} />
        <LinearProgress color="danger" variant={variant} />
        <LinearProgress color="info" variant={variant} />
        <LinearProgress color="success" variant={variant} />
        <LinearProgress color="warning" variant={variant} />
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
          level="body2"
          fontWeight="xl"
          id="variant-label"
          textColor="text.primary"
          mb={1}
        >
          Variant:
        </Typography>
        <RadioGroup
          size="sm"
          aria-labelledby="variant-label"
          name="variant"
          value={variant}
          onChange={(event) => setVariant(event.target.value as VariantProp)}
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
