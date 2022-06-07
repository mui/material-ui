import * as React from 'react';
import Box from '@mui/joy/Box';
import Link from '@mui/joy/Link';
import IconButton from '@mui/joy/IconButton';
import TextField from '@mui/joy/TextField';
import Typography from '@mui/joy/Typography';
import BrandingProvider from 'docs/src/BrandingProvider';
import HighlighedCode from 'docs/src/modules/components/HighlightedCode';
import { inputClasses } from '@mui/joy/Input';
import Replay from '@mui/icons-material/ReplayRounded';

function formatSx(sx: { [k: string]: string }) {
  const lines = Object.keys(sx);
  if (!lines.length) {
    return '';
  }
  return `\n  sx={${JSON.stringify(sx, null, 4)}}`.replace('}}', '  }}\n');
}

export default function JoyVariablesDemo(props: {
  componentName: string;
  childrenAccepted?: boolean;
  data: Array<{ var: string; defaultValue?: string }>;
  renderDemo: (sx: { [k: string]: string }) => React.ReactElement;
}) {
  const { componentName, data = [], childrenAccepted = false } = props;
  const [sx, setSx] = React.useState<{ [k: string]: string }>({});
  return (
    <Box
      sx={{
        m: -1.5,
        mt: 0.25,
        flexGrow: 1,
        maxWidth: 'calc(100% + 24px)',
        display: 'flex',
        flexWrap: 'wrap',
        gap: 1.5,
        '& .markdown-body pre': {
          margin: 0,
          borderRadius: 'xs',
        },
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 999 }}>
        <Box
          sx={{
            flexGrow: 1,
            m: 'auto',
            display: 'flex',
            alignItems: 'center',
            p: 2,
          }}
        >
          {props.renderDemo(sx)}
        </Box>
        <BrandingProvider mode="dark">
          <HighlighedCode
            code={`<${componentName} ${formatSx(sx)}${childrenAccepted ? '>' : '/>'}`}
            language="jsx"
            sx={{ display: { xs: 'none', md: 'initial' } }}
          />
        </BrandingProvider>
      </Box>
      <Box
        sx={{
          minWidth: 0,
          flexBasis: 240,
          flexGrow: 1,
          p: 2,
          bgcolor: 'background.body',
          borderRadius: 'xs',
        }}
      >
        <Typography
          fontWeight="lg"
          mb={2}
          endDecorator={
            // eslint-disable-next-line jsx-a11y/anchor-is-valid
            <Link
              component="button"
              onClick={() => setSx({})}
              startDecorator={<Replay />}
              fontSize="xs"
              sx={{ visibility: Object.keys(sx).length > 1 ? 'visible' : 'hidden' }}
            >
              Reset All
            </Link>
          }
          justifyContent="space-between"
        >
          CSS variables
        </Typography>
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 2,
          }}
        >
          {data.map((item) => {
            const resolvedValue = sx[item.var] || item.defaultValue;
            return (
              <TextField
                key={item.var}
                label={item.var}
                size="sm"
                variant="outlined"
                value={Number(resolvedValue?.replace('px', '')) || ''}
                endDecorator={
                  <React.Fragment>
                    <Typography level="body3" mr={0.5}>
                      px
                    </Typography>
                    {sx[item.var] && sx[item.var] !== item.defaultValue && (
                      <IconButton
                        variant="plain"
                        color="neutral"
                        size="sm"
                        onClick={() =>
                          setSx((prevSx) => {
                            const newSx = { ...prevSx };
                            delete newSx[item.var];
                            return newSx;
                          })
                        }
                      >
                        <Replay fontSize="sm" />
                      </IconButton>
                    )}
                  </React.Fragment>
                }
                type="number"
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
                      [item.var]: `${value}px`,
                    };
                  });
                }}
                sx={{
                  flexBasis: 180,
                  minWidth: 0,
                  flexGrow: 1,
                  [`& .${inputClasses.root}`]: { '--Input-paddingInline': '0.5rem' },
                  [`& .${inputClasses.endDecorator}`]: { alignItems: 'center' },
                }}
              />
            );
          })}
        </Box>
      </Box>
    </Box>
  );
}
