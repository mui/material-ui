import * as React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Box from '@mui/joy/Box';
import Card from '@mui/joy/Card';
import CardCover from '@mui/joy/CardCover';
import CardContent from '@mui/joy/CardContent';
import CardOverflow from '@mui/joy/CardOverflow';
import Link from '@mui/joy/Link';
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
    return ` sx={${JSON.stringify(sx)
      .replace('{', '{ ')
      .replace('}', ' }')
      .replace(':', ': ')}}`;
  }
  return ` sx={${JSON.stringify(sx, null, 2)}}`;
}

const vars = [
  {
    var: '--Card-padding',
    defaultValue: '16px',
    type: 'number',
  },
  {
    var: '--Card-radius',
    defaultValue: '12px',
    type: 'number',
  },
];

export default function GroupedAvatars() {
  const [sx, setSx] = React.useState({});
  return (
    <Box
      sx={{
        width: '100%',
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', md: '1fr auto' },
        gridTemplateRows: '1fr auto',
        gap: 2,
        mt: 2,
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
          placeSelf: 'center',
          gap: 2,
          flexWrap: 'wrap',
        }}
      >
        <Card sx={{ maxWidth: 160, boxShadow: 'md', ...sx }}>
          <CardOverflow>
            <AspectRatio>
              <img alt="" src="/static/images/cards/paella.jpg" />
            </AspectRatio>
          </CardOverflow>
          <Box sx={{ py: 1.5 }}>
            <Typography fontWeight="lg">
              <Link href="#card-variables" overlay color="neutral">
                Card title
              </Link>
            </Typography>
            <Typography level="body2">A very very long description.</Typography>
          </Box>
          <CardOverflow sx={{ py: 1, bgcolor: 'neutral.softBg' }}>
            <Typography level="body2" color="neutral.plainColor">
              Metadata
            </Typography>
          </CardOverflow>
        </Card>
        <Card
          variant="outlined"
          color="warning"
          sx={{ maxWidth: 160, boxShadow: 'md', ...sx }}
        >
          <CardCover sx={{ opacity: 0.4 }}>
            <img
              alt=""
              src="https://images.unsplash.com/photo-1620987278429-ab178d6eb547?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1450&amp;q=80"
              data-first-child=""
            />
          </CardCover>
          <CardContent sx={{ mt: 'auto', flexGrow: 0 }}>
            <Typography fontWeight="lg">Card title</Typography>
            <Typography level="body2">A very very long description.</Typography>
          </CardContent>
        </Card>
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
          code={`<Card${formatSx(sx)}>`}
          language="jsx"
          sx={{ display: { xs: 'none', md: 'initial' } }}
        />
      </BrandingProvider>
    </Box>
  );
}
