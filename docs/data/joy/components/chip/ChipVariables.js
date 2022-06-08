import * as React from 'react';
import Avatar from '@mui/joy/Avatar';
import Box from '@mui/joy/Box';
import Sheet from '@mui/joy/Sheet';
import Chip from '@mui/joy/Chip';
import ChipDelete from '@mui/joy/ChipDelete';
import TextField from '@mui/joy/TextField';
import Typography from '@mui/joy/Typography';
import BrandingProvider from 'docs/src/BrandingProvider';
import HighlighedCode from 'docs/src/modules/components/HighlightedCode';

function formatSx(sx) {
  const lines = Object.keys(sx);
  if (!lines.length) {
    return '';
  }
  if (lines.length === 1) {
    return `  sx={${JSON.stringify(sx)
      .replace('{', '{ ')
      .replace('}', ' }')
      .replace(':', ': ')}}`;
  }
  return `  sx={${JSON.stringify(sx, null, 2)}}`;
}

const vars = [
  {
    var: '--Chip-minHeight',
    defaultValue: '32px',
    type: 'number',
  },
  {
    var: '--Chip-radius',
    defaultValue: '24px',
    type: 'number',
  },
  {
    var: '--Chip-gap',
    defaultValue: '6px',
    type: 'number',
  },
  {
    var: '--Chip-paddingInline',
    defaultValue: '12px',
    type: 'number',
  },
  {
    var: '--Chip-decorator-childHeight',
    defaultValue: '',
    type: 'number',
  },
];

export default function GroupedAvatars() {
  const [sx, setSx] = React.useState({});
  return (
    <Box
      sx={{
        m: -1.5,
        mt: 0.25,
        flexGrow: 1,
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', md: '1fr auto' },
        gridTemplateRows: '1fr auto',
        gap: 2,
        '& .markdown-body pre': {
          margin: 0,
          borderRadius: 'xs',
        },
      }}
    >
      <Box
        sx={{
          alignSelf: 'center',
          justifyContent: 'center',
          mx: 'auto',
          display: 'flex',
          flexDirection: 'column',
          placeSelf: 'center',
          gap: 1,
          flexWrap: 'wrap',
        }}
      >
        <Chip
          startDecorator={<Avatar src="/static/images/avatar/1.jpg" />}
          endDecorator={<ChipDelete />}
          sx={sx}
        >
          Person name
        </Chip>
        <Chip
          variant="outlined"
          color="neutral"
          startDecorator={<Avatar src="/static/images/avatar/1.jpg" />}
          endDecorator={<ChipDelete />}
          sx={sx}
        >
          Person name
        </Chip>
      </Box>
      <Sheet
        variant="outlined"
        sx={{
          gridRow: 'span 2',
          display: 'flex',
          flexWrap: 'wrap',
          gap: 2,
          p: 2,
          borderRadius: 'sm',
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Typography fontWeight="lg">CSS variables</Typography>
          {vars.map((data) => (
            <TextField
              key={data.var}
              label={data.var}
              size="sm"
              variant="outlined"
              defaultValue={Number(data.defaultValue.replace('px', '')) || undefined}
              endDecorator={<Typography level="body3">px</Typography>}
              type={data.type}
              helperText={
                data.defaultValue ? `Default as ${data.defaultValue}` : undefined
              }
              onChange={(event) => {
                const { value } = event.target;
                setSx((prevSx) => {
                  if (!value) {
                    const newSx = { ...prevSx };
                    // @ts-ignore
                    delete newSx[data.var];
                    return newSx;
                  }
                  return {
                    ...prevSx,
                    [data.var]: `${value}px`,
                  };
                });
              }}
              sx={{
                maxWidth: 180,
                '& .JoyInput-root': { '--Input-paddingInline': '0.5rem' },
              }}
            />
          ))}
        </Box>
      </Sheet>
      <BrandingProvider mode="dark">
        <HighlighedCode
          code={`<Chip
  startDecorator={<Avatar />}
  endDecorator={<ChipDelete />}
${formatSx(sx)}>`}
          language="jsx"
          sx={{ display: { xs: 'none', md: 'initial' } }}
        />
      </BrandingProvider>
    </Box>
  );
}
