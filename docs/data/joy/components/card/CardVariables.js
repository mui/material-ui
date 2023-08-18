import * as React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Sheet from '@mui/joy/Sheet';
import Card from '@mui/joy/Card';
import CardActions from '@mui/joy/CardActions';
import CardCover from '@mui/joy/CardCover';
import CardContent from '@mui/joy/CardContent';
import CardOverflow from '@mui/joy/CardOverflow';
import CircularProgress from '@mui/joy/CircularProgress';
import IconButton from '@mui/joy/IconButton';
import Link from '@mui/joy/Link';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import FormHelperText from '@mui/joy/FormHelperText';
import Input from '@mui/joy/Input';
import Typography from '@mui/joy/Typography';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
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
        <Card variant="outlined" sx={{ maxWidth: 240, boxShadow: 'none', ...sx }}>
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
          <AspectRatio
            variant="outlined"
            ratio="1"
            sx={{
              width: 48,
              mt: -5,
              '& > div': {
                '--variant-borderWidth': '2px',
                borderColor: 'background.surface',
              },
            }}
          >
            <img src="/static/images/avatar/6.jpg" loading="lazy" alt="" />
          </AspectRatio>
          <CardContent>
            <Typography fontWeight="lg">
              <Link
                href="#card-variables"
                overlay
                underline="none"
                textColor="text.primary"
              >
                Card title
              </Link>
            </Typography>
            <Typography level="body-sm">A very very long description.</Typography>
          </CardContent>
          <CardActions buttonFlex="1">
            <IconButton variant="outlined" color="neutral" size="sm">
              <BookmarkBorderIcon />
            </IconButton>
            <Button variant="solid" color="primary" size="sm">
              Buy
            </Button>
          </CardActions>
        </Card>
        <Card
          variant="solid"
          color="neutral"
          invertedColors
          sx={{ minWidth: 200, maxWidth: 240, boxShadow: 'none', ...sx }}
        >
          <CardCover>
            <img
              src="https://images.unsplash.com/photo-1523262297412-fafbd40c6aa4?auto=format&fit=crop&w=198"
              srcSet="https://images.unsplash.com/photo-1523262297412-fafbd40c6aa4?auto=format&fit=crop&w=198&dpr=2 2x"
              loading="lazy"
              alt=""
            />
          </CardCover>
          <CardCover
            sx={{
              background:
                'linear-gradient(to top, rgba(0,0,0,0.4), rgba(0,0,0,0) 200px), linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0) 300px)',
              backdropFilter: 'blur(4px)',
            }}
          />
          <CardContent>
            <CircularProgress
              determinate
              value={70}
              sx={{
                '--CircularProgress-size': '100px',
                '--CircularProgress-progressThickness': '8px',
                '--CircularProgress-trackThickness': '8px',
                m: 'auto',
              }}
            >
              <Typography>70%</Typography>
            </CircularProgress>
          </CardContent>
          <CardContent sx={{ textAlign: 'center', justifyContent: 'center' }}>
            <Typography fontWeight="lg" textColor="#fff">
              Card title
            </Typography>
            <Typography level="body-sm" textColor="neutral.300">
              Long description.
            </Typography>
          </CardContent>
          <CardActions>
            <Button variant="outlined">Get started</Button>
          </CardActions>
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
          <Typography fontWeight="xl" level="body-sm" textColor="text.primary">
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
                endDecorator={<Typography level="body-xs">px</Typography>}
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
