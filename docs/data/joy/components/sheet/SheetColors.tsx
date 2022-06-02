import Box from '@mui/joy/Box';
import Radio from '@mui/joy/Radio';
import RadioGroup from '@mui/joy/RadioGroup';
import Sheet, { sheetClasses } from '@mui/joy/Sheet';
import { VariantProp } from '@mui/joy/styles';
import Typography from '@mui/joy/Typography';
import * as React from 'react';

export default function SheetColors() {
  const [variant, setVariant] = React.useState<VariantProp>('plain');
  return (
    <Box
      sx={{
        display: 'flex',
        gap: 2,
        justifyContent: 'center',
        flexWrap: 'wrap',
        [`& > .${sheetClasses.root}`]: {
          m: 2,
          width: 128,
          height: 128,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        },
      }}
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
      <Sheet variant={variant} color="primary">
        Primary
      </Sheet>
      <Sheet variant={variant} color="neutral">
        Neutral
      </Sheet>
      <Sheet variant={variant} color="danger">
        Danger
      </Sheet>
      <Sheet variant={variant} color="info">
        Info
      </Sheet>
      <Sheet variant={variant} color="success">
        Success
      </Sheet>
      <Sheet variant={variant} color="warning">
        Warning
      </Sheet>
    </Box>
  );
}
