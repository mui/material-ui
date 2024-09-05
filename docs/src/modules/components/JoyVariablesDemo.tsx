import * as React from 'react';
import Box from '@mui/joy/Box';
import Divider from '@mui/joy/Divider';
import Link from '@mui/joy/Link';
import List from '@mui/joy/List';
import IconButton from '@mui/joy/IconButton';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import FormHelperText from '@mui/joy/FormHelperText';
import Input, { inputClasses } from '@mui/joy/Input';
import ReplayRoundedIcon from '@mui/icons-material/ReplayRounded';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
import { HighlightedCode } from '@mui/docs/HighlightedCode';
import { BrandingProvider } from '@mui/docs/branding';

interface DataItem {
  var: string;
  defaultValue?: string | number;
  helperText?: string;
  inputAttributes?: React.InputHTMLAttributes<HTMLInputElement>;
}

function formatSx(sx: { [k: string]: string | number }) {
  const lines = Object.keys(sx);
  if (!lines.length) {
    return '';
  }
  return `\n  sx={${JSON.stringify(sx, null, 4)}}`.replace('}}', '  }}\n');
}

interface SlotVariablesProps {
  slot: string;
  data: Array<DataItem>;
  renderField: (item: DataItem) => React.ReactElement<any>;
  defaultOpen?: boolean;
}

function SlotVariables({ slot, data, renderField, defaultOpen = false }: SlotVariablesProps) {
  const [open, setOpen] = React.useState(defaultOpen);
  return (
    <React.Fragment>
      {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
      <Link
        id={`accordion-${slot}`}
        aria-expanded={open ? 'true' : 'false'}
        aria-controls={`section-${slot}`}
        component="button"
        underline="none"
        endDecorator={
          <KeyboardArrowDown
            sx={{ transition: '0.2s', transform: open ? 'rotate(-180deg)' : undefined }}
          />
        }
        onClick={() => setOpen(!open)}
        sx={{
          fontSize: 'sm',
          fontWeight: 'lg',
          pb: 1,
          justifyContent: 'space-between',
          color: open ? 'text.primary' : 'text.tertiary',
        }}
      >
        {slot}
      </Link>
      {open && (
        <Box
          hidden={open}
          role="region"
          aria-labelledby={`accordion-${slot}`}
          id={`section-${slot}`}
          sx={{ display: 'flex', flexDirection: 'column', flexWrap: 'wrap', gap: 1 }}
        >
          {data.map((item) => renderField(item))}
        </Box>
      )}
    </React.Fragment>
  );
}

export default function JoyVariablesDemo(props: {
  componentName: string;
  childrenAccepted?: boolean;
  data: Array<DataItem | [string, Array<DataItem>, { defaultOpen?: boolean } | undefined]>;
  renderDemo: (sx: { [k: string]: string | number }) => React.ReactElement<any>;
  renderCode?: (formattedSx: string) => string;
}) {
  const { componentName, data = [], childrenAccepted = false, renderCode } = props;
  const [sx, setSx] = React.useState<{ [k: string]: string | number }>({});
  return (
    <Box
      sx={{
        flexGrow: 1,
        maxWidth: '100%',
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        '& .markdown-body pre': {
          margin: 0,
          borderRadius: 'md',
        },
      }}
    >
      <Box
        sx={(theme) => ({
          display: 'flex',
          flexDirection: 'column',
          flexGrow: 999,
          minWidth: 0,
          p: 3,
          gap: 3,
          bgcolor: '#FFF',
          [theme.getColorSchemeSelector('dark')]: {
            backgroundColor: theme.palette.neutral[900],
          },
        })}
      >
        <Box sx={{ flexGrow: 1, m: 'auto', display: 'flex', alignItems: 'center' }}>
          {props.renderDemo(sx)}
        </Box>
        <BrandingProvider mode="dark">
          <HighlightedCode
            code={
              renderCode
                ? renderCode(formatSx(sx))
                : `<${componentName} ${formatSx(sx)}${childrenAccepted ? '>' : '/>'}`
            }
            language="jsx"
            sx={{ display: { xs: 'none', md: 'block' } }}
          />
        </BrandingProvider>
      </Box>
      <Sheet
        sx={(theme) => ({
          flexShrink: 0,
          gap: 2,
          borderLeft: '1px solid',
          borderColor: `rgba(${theme.vars.palette.neutral.mainChannel} / 0.1)`,
          background: `rgba(${theme.vars.palette.primary.mainChannel} / 0.02)`,
          backdropFilter: 'blur(8px)',
          minWidth: '280px',
        })}
      >
        <List component="div">
          <Box
            sx={{
              px: 3,
              pt: 1,
              pb: 2,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Typography sx={{ fontWeight: 'lg', fontFamily: 'General Sans' }}>
              CSS variables
            </Typography>
            <IconButton
              aria-label="Reset all"
              variant="outlined"
              color="primary"
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
          <Divider sx={{ opacity: 0.5 }} />
          <Box sx={{ p: 3, display: 'flex', flexDirection: 'column', gap: 1 }}>
            {data.map((dataItem) => {
              function renderField(item: DataItem) {
                const resolvedValue = sx[item.var] || item.defaultValue;
                const resolvedInputAttributes = item.inputAttributes || {};
                return (
                  <FormControl key={item.var}>
                    <FormLabel
                      sx={{ fontFamily: 'Menlo, Consolas', '--FormLabel-fontSize': '0.75rem' }}
                    >
                      {item.var}
                    </FormLabel>
                    <Input
                      size="sm"
                      variant="outlined"
                      value={Number(`${resolvedValue}`?.replace('px', '')) || ''}
                      slotProps={{
                        input: { ...resolvedInputAttributes },
                      }}
                      endDecorator={
                        <React.Fragment>
                          {typeof resolvedValue === 'string' && (
                            <Typography level="body-xs" sx={{ mr: 0.5 }}>
                              px
                            </Typography>
                          )}
                          <IconButton
                            tabIndex={-1}
                            variant="plain"
                            color="neutral"
                            disabled={!sx[item.var] && sx[item.var] !== item.defaultValue}
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
                        </React.Fragment>
                      }
                      type="number"
                      onKeyDown={(event) => {
                        if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'z') {
                          setSx((prevSx) => {
                            const newSx = { ...prevSx };
                            delete newSx[item.var];
                            return newSx;
                          });
                        }
                      }}
                      onChange={(event) => {
                        const { value } = event.target;
                        setSx((prevSx) => {
                          if (!value) {
                            const newSx = { ...prevSx };
                            // @ts-ignore
                            delete newSx[item.var];
                            return newSx;
                          }
                          return {
                            ...prevSx,
                            [item.var]:
                              typeof resolvedValue === 'number' ? Number(value) : `${value}px`,
                          };
                        });
                      }}
                      sx={{
                        minWidth: 0,
                        flexGrow: 1,
                        [`& .${inputClasses.root}`]: { '--Input-paddingInline': '0.5rem' },
                        [`& .${inputClasses.endDecorator}`]: { alignItems: 'center' },
                      }}
                    />
                    <FormHelperText sx={{ mb: 1, '--FormHelperText-fontSize': '0.75rem' }}>
                      {item.helperText}
                    </FormHelperText>
                  </FormControl>
                );
              }
              if (Array.isArray(dataItem)) {
                const [slot, slotData, options] = dataItem;
                return [
                  <SlotVariables
                    key="variables"
                    slot={slot}
                    data={slotData}
                    renderField={renderField}
                    {...options}
                  />,
                ];
              }
              return renderField(dataItem);
            })}
          </Box>
        </List>
      </Sheet>
    </Box>
  );
}
