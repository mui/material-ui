import * as React from 'react';
import { VariantProp } from '@mui/joy/styles';
import ButtonGroup from '@mui/joy/ButtonGroup';
import IconButton from '@mui/joy/IconButton';
import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft';
import FormatAlignCenterIcon from '@mui/icons-material/FormatAlignCenter';
import FormatAlignRightIcon from '@mui/icons-material/FormatAlignRight';
import FormatAlignJustifyIcon from '@mui/icons-material/FormatAlignJustify';

export default function FigmaButtonGroup() {
  const [index, setIndex] = React.useState(0);
  const getVariant = (itemIndex: number): VariantProp =>
    itemIndex === index ? 'soft' : 'plain';
  return (
    <ButtonGroup
      aria-label="figma button group"
      sx={{
        '--ButtonGroup-radius': '3px',
        '--ButtonGroup-separatorSize': '0px',
        '--ButtonGroup-connected': '0',
        '--joy-palette-neutral-plainHoverBg': 'transparent',
        '--joy-palette-neutral-plainActiveBg': 'transparent',
        '&:hover': {
          boxShadow: 'inset 0px 0px 0px 1px var(--joy-palette-neutral-softBg)',
          '--ButtonGroup-connected': '1',
        },
      }}
    >
      <IconButton variant={getVariant(0)} onClick={() => setIndex(0)}>
        <FormatAlignLeftIcon />
      </IconButton>
      <IconButton variant={getVariant(1)} onClick={() => setIndex(1)}>
        <FormatAlignCenterIcon />
      </IconButton>
      <IconButton variant={getVariant(2)} onClick={() => setIndex(2)}>
        <FormatAlignRightIcon />
      </IconButton>
      <IconButton variant={getVariant(3)} onClick={() => setIndex(3)}>
        <FormatAlignJustifyIcon />
      </IconButton>
    </ButtonGroup>
  );
}
