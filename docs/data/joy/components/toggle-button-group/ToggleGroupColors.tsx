import * as React from 'react';
import Button from '@mui/joy/Button';
import IconButton from '@mui/joy/IconButton';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import RadioGroup from '@mui/joy/RadioGroup';
import Radio from '@mui/joy/Radio';
import ToggleButtonGroup from '@mui/joy/ToggleButtonGroup';
import Stack from '@mui/joy/Stack';
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import FormatUnderlinedIcon from '@mui/icons-material/FormatUnderlined';
import { VariantProp, ColorPaletteProp } from '@mui/joy/styles';

export default function ToggleGroupColors() {
  const [variant, setVariant] = React.useState<VariantProp | null>('plain');
  const [color, setColor] = React.useState<ColorPaletteProp | null>('neutral');
  return (
    <Stack spacing={2}>
      <ToggleButtonGroup
        variant={variant || undefined}
        color={color || undefined}
        value="pressed"
      >
        <Button value="pressed">I&apos;m pressed</Button>
        <IconButton value="bold">
          <FormatBoldIcon />
        </IconButton>
        <IconButton value="italic">
          <FormatItalicIcon />
        </IconButton>
        <IconButton value="underlined">
          <FormatUnderlinedIcon />
        </IconButton>
      </ToggleButtonGroup>
      <FormControl>
        <FormLabel>Variant</FormLabel>
        <RadioGroup
          orientation="horizontal"
          value={variant}
          onChange={(event) => setVariant(event.target.value as VariantProp)}
        >
          <Radio value="plain" label="plain" />
          <Radio value="outlined" label="outlined" />
          <Radio value="soft" label="soft" />
          <Radio value="solid" label="solid" />
        </RadioGroup>
      </FormControl>
      <FormControl>
        <FormLabel>Color</FormLabel>
        <RadioGroup
          orientation="horizontal"
          value={color}
          onChange={(event) => setColor(event.target.value as ColorPaletteProp)}
        >
          <Radio value="primary" label="primary" />
          <Radio value="neutral" label="neutral" />
          <Radio value="danger" label="danger" />
          <Radio value="success" label="success" />
          <Radio value="warning" label="warning" />
        </RadioGroup>
      </FormControl>
    </Stack>
  );
}
