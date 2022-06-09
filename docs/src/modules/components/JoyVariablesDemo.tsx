import * as React from 'react';
import Box from '@mui/joy/Box';
import IconButton from '@mui/joy/IconButton';
import TextField from '@mui/joy/TextField';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';
import BrandingProvider from 'docs/src/BrandingProvider';
import HighlighedCode from 'docs/src/modules/components/HighlightedCode';
import { inputClasses } from '@mui/joy/Input';
import ReplayRoundedIcon from '@mui/icons-material/ReplayRounded';

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
  renderCode?: (formattedSx: string) => string;
}) {
  const { componentName, data = [], childrenAccepted = false, renderCode } = props;
  const [sx, setSx] = React.useState<{ [k: string]: string }>({});
  return (
    <Box
      sx={{
        m: -1.5,
        mt: 0.25,
        flexGrow: 1,
        maxWidth: 'calc(100% + 24px)',
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row' },
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
            code={
              renderCode
                ? renderCode(formatSx(sx))
                : `<${componentName} ${formatSx(sx)}${childrenAccepted ? '>' : '/>'}`
            }
            language="jsx"
            sx={{ display: { xs: 'none', md: 'initial' } }}
          />
        </BrandingProvider>
      </Box>
      <Sheet
        variant="outlined"
        sx={{
          minWidth: 0,
          flexBasis: 240,
          flexGrow: 1,
          p: 2,
          bgcolor: 'background.body',
          borderRadius: 'xs',
        }}
      >
        <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography fontWeight="lg">CSS variables</Typography>
          <IconButton
            aria-label="Reset all"
            variant="outlined"
            color="neutral"
            size="sm"
            onClick={() => setSx({})}
            sx={{
              visibility: Object.keys(sx).length > 1 ? 'visible' : 'hidden',
              '--IconButton-size': '30px',
            }}
          >
            <ReplayRoundedIcon />
          </IconButton>
        </Box>
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
                componentsProps={{
                  input: {
                    onKeyDown: (event) => {
                      if ((event.ctrlKey || event.metaKey) && event.code === 'KeyZ') {
                        setSx((prevSx) => {
                          const newSx = { ...prevSx };
                          delete newSx[item.var];
                          return newSx;
                        });
                      }
                    },
                  },
                }}
                endDecorator={
                  <React.Fragment>
                    <Typography level="body3" mr={0.5}>
                      px
                    </Typography>
                    {sx[item.var] && sx[item.var] !== item.defaultValue && (
                      <IconButton
                        tabIndex={-1}
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
                        <ReplayRoundedIcon fontSize="sm" />
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
      </Sheet>
    </Box>
  );
}
