import * as React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Box from '@mui/joy/Box';
import Sheet from '@mui/joy/Sheet';
import Card from '@mui/joy/Card';
import CardCover from '@mui/joy/CardCover';
import CardContent from '@mui/joy/CardContent';
import CardOverflow from '@mui/joy/CardOverflow';
import Link from '@mui/joy/Link';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import FormHelperText from '@mui/joy/FormHelperText';
import Input from '@mui/joy/Input';
import Typography from '@mui/joy/Typography';
import BrandingProvider from 'docs/src/BrandingProvider';
import HighlightedCode from 'docs/src/modules/components/HighlightedCode';

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

export default function CardVariables() {
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
        <Card variant="outlined" sx={{ maxWidth: 200, boxShadow: 'none', ...sx }}>
          <CardOverflow>
            <AspectRatio>
              <img
                src="https://images.unsplash.com/photo-1523404343994-489a5eefd760?auto=format&fit=crop&w=198"
                srcSet="https://images.unsplash.com/photo-1523404343994-489a5eefd760?auto=format&fit=crop&w=198&dpr=2 2x"
                loading="lazy"
                alt=""
              />
            </AspectRatio>
          </CardOverflow>
          <Box sx={{ mt: -3, width: 48 }}>
            <AspectRatio ratio="1">
              <img
                src="https://images.unsplash.com/photo-1507833423370-a126b89d394b?auto=format&fit=crop&w=48"
                srcSet="https://images.unsplash.com/photo-1507833423370-a126b89d394b?auto=format&fit=crop&w=48&dpr=2 2x"
                loading="lazy"
                alt=""
              />
            </AspectRatio>
          </Box>
          <Box>
            <Typography fontWeight="lg" mt={1.5}>
              <Link href="#card-variables" overlay color="neutral">
                Card title
              </Link>
            </Typography>
            <Typography level="body2">A very very long description.</Typography>
          </Box>
        </Card>
        <Card
          variant="outlined"
          color="neutral"
          sx={{ maxWidth: 200, boxShadow: 'none', ...sx }}
        >
          <CardCover>
            <img
              src="https://images.unsplash.com/photo-1523404343994-489a5eefd760?auto=format&fit=crop&w=198"
              srcSet="https://images.unsplash.com/photo-1523404343994-489a5eefd760?auto=format&fit=crop&w=198&dpr=2 2x"
              loading="lazy"
              alt=""
            />
          </CardCover>
          <CardCover
            sx={{
              background:
                'linear-gradient(to top, rgba(0,0,0,0.4), rgba(0,0,0,0) 200px), linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0) 300px)',
            }}
          />
          <CardContent sx={{ mt: 'auto', flexGrow: 0 }}>
            <Typography fontWeight="lg" textColor="#fff">
              Card title
            </Typography>
            <Typography level="body2" textColor="neutral.400">
              A very very long description.
            </Typography>
          </CardContent>
        </Card>
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
          <Typography fontWeight="xl" level="body2" textColor="text.primary">
            CSS variables
          </Typography>
          {vars.map((data) => (
            <FormControl key={data.var}>
              <FormLabel sx={{ '--FormLabel-fontSize': 'var(--joy-fontSize-xs)' }}>
                {data.var}
              </FormLabel>
              <Input
                size="sm"
                variant="outlined"
                defaultValue={
                  Number(data.defaultValue.replace('px', '')) || undefined
                }
                endDecorator={<Typography level="body3">px</Typography>}
                type={data.type}
                sx={{
                  maxWidth: 160,
                  '& .JoyInput-root': { '--Input-paddingInline': '0.5rem' },
                }}
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
              />
              {data.defaultValue ? (
                <FormHelperText
                  sx={{ '--FormHelperText-fontSize': 'var(--joy-fontSize-xs)' }}
                >{`Default as ${data.defaultValue}`}</FormHelperText>
              ) : null}
            </FormControl>
          ))}
        </Box>
      </Sheet>
      <BrandingProvider mode="dark">
        <HighlightedCode
          code={`<Card${formatSx(sx)}>`}
          language="jsx"
          sx={{ display: { xs: 'none', md: 'initial' } }}
        />
      </BrandingProvider>
    </Box>
  );
}
