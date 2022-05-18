import * as React from 'react';
import Avatar from '@mui/joy/Avatar';
import AvatarGroup from '@mui/joy/AvatarGroup';
import Box from '@mui/joy/Box';
import TextField from '@mui/joy/TextField';
import Typography from '@mui/joy/Typography';
import BrandingProvider from 'docs/src/BrandingProvider';
import HighlighedCode from 'docs/src/modules/components/HighlightedCode';

function formatSx(sx: object) {
  const lines = Object.keys(sx);
  if (!lines.length) {
    return '';
  }
  if (lines.length === 1) {
    return ` sx={${JSON.stringify(sx)
      .replace('{', '{ ')
      .replace('}', ' }')
      .replace(':', ': ')}}`;
  }
  return ` sx={${JSON.stringify(sx, null, 2)}}`;
}

const vars = [
  {
    var: '--AvatarGroup-gap',
    defaultValue: '-8px',
    type: 'number',
  },
  {
    var: '--Avatar-size',
    defaultValue: '40px',
    type: 'number',
  },
  {
    var: '--Avatar-ringSize',
    defaultValue: '4px',
    type: 'number',
  },
];

export default function GroupedAvatars() {
  const [sx, setSx] = React.useState({});
  return (
    <Box
      sx={{
        width: '100%',
        mt: 2,
        display: 'grid',
        gridTemplateColumns: '1fr auto',
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
          mx: 'auto',
          display: 'flex',
          placeSelf: 'center',
        }}
      >
        <AvatarGroup sx={sx}>
          <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
          <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
          <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
          <Avatar>+3</Avatar>
        </AvatarGroup>
      </Box>
      <Box
        sx={{
          gridRow: 'span 2',
          display: 'flex',
          flexWrap: 'wrap',
          gap: 2,
          p: 2,
          bgcolor: 'background.level1',
          borderRadius: 'xs',
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Typography fontWeight="lg">CSS variables</Typography>
          {vars.map((data) => (
            <TextField
              key={data.var}
              label={data.var}
              size="sm"
              variant="soft"
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
                maxWidth: 160,
                '& .JoyInput-root': { '--Input-gutter': '1rem' },
              }}
            />
          ))}
        </Box>
      </Box>
      <BrandingProvider mode="dark">
        <HighlighedCode
          code={`<AvatarGroup${formatSx(sx)}>
  ...avatars
</AvatarGroup>`}
          language="jsx"
        />
      </BrandingProvider>
    </Box>
  );
}
