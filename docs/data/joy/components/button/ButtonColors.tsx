import * as React from 'react';
import { VariantProp } from '@mui/joy/styles';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import RadioGroup from '@mui/joy/RadioGroup';
import Radio from '@mui/joy/Radio';
import Typography from '@mui/joy/Typography';

export default function ButtonColors() {
  const [variant, setVariant] = React.useState<VariantProp>('solid');
  return (
    <Box
      sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}
    >
      <Box
        sx={{
          mb: 2,
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Typography fontWeight="lg" mr={2} id="variant-label">
          Variant:
        </Typography>
        <RadioGroup
          aria-labelledby="variant-label"
          name="variant"
          row
          value={variant}
          onChange={(event) => setVariant(event.target.value as VariantProp)}
        >
          <Radio label="Plain" value="plain" />
          <Radio label="Outlined" value="outlined" />
          <Radio label="Soft" value="soft" />
          <Radio label="Solid" value="solid" />
        </RadioGroup>
      </Box>
      <Button variant={variant} color="primary">
        Primary
      </Button>
      <Button variant={variant} color="neutral">
        Neutral
      </Button>
      <Button variant={variant} color="danger">
        Danger
      </Button>
      <Button variant={variant} color="info">
        Info
      </Button>
      <Button variant={variant} color="success">
        Success
      </Button>
      <Button variant={variant} color="warning">
        Warning
      </Button>
    </Box>
  );
}
