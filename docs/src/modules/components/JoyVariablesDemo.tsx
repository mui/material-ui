import * as React from 'react';
import Box from '@mui/joy/Box';
import Link from '@mui/joy/Link';
import List from '@mui/joy/List';
import ListDivider from '@mui/joy/ListDivider';
import IconButton from '@mui/joy/IconButton';
import TextField from '@mui/joy/TextField';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';
import BrandingProvider from 'docs/src/BrandingProvider';
import HighlighedCode from 'docs/src/modules/components/HighlightedCode';
import { inputClasses } from '@mui/joy/Input';
import ReplayRoundedIcon from '@mui/icons-material/ReplayRounded';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';

interface DataItem {
  var: string;
  defaultValue?: string;
  helperText?: string;
}

function formatSx(sx: { [k: string]: string }) {
  const lines = Object.keys(sx);
  if (!lines.length) {
    return '';
  }
  return `\n  sx={${JSON.stringify(sx, null, 4)}}`.replace('}}', '  }}\n');
}

interface SlotVariablesProps {
  slot: string;
  data: Array<DataItem>;
  renderField: (item: DataItem) => React.ReactElement;
  defaultOpen?: boolean;
}

const SlotVariables = ({ slot, data, renderField, defaultOpen = false }: SlotVariablesProps) => {
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
        fontSize="xs"
        letterSpacing="md"
        textTransform="uppercase"
        fontWeight="lg"
        endDecorator={
          <KeyboardArrowDown
            sx={{ transition: '0.2s', transform: open ? 'rotate(-180deg)' : undefined }}
          />
        }
        onClick={() => setOpen(!open)}
        sx={{ justifyContent: 'space-between', color: open ? 'text.primary' : 'text.tertiary' }}
      >
        {slot}
      </Link>
      {open && (
        <Box
          hidden={open}
          role="region"
          aria-labelledby={`accordion-${slot}`}
          id={`section-${slot}`}
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 2,
          }}
        >
          {data.map((item) => renderField(item))}
        </Box>
      )}
    </React.Fragment>
  );
};

export default function JoyVariablesDemo(props: {
  componentName: string;
  childrenAccepted?: boolean;
  data: Array<DataItem | [string, Array<DataItem>, { defaultOpen?: boolean } | undefined]>;
  renderDemo: (sx: { [k: string]: string }) => React.ReactElement;
  renderCode?: (formattedSx: string) => string;
}) {
  const { componentName, data = [], childrenAccepted = false, renderCode } = props;
  const [sx, setSx] = React.useState<{ [k: string]: string }>({});
  return (
    <Box
      sx={{
        m: 0,
        flexGrow: 1,
        maxWidth: 'calc(100% + 24px)',
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row' },
        flexWrap: 'wrap',
        gap: 2,
        '& .markdown-body pre': {
          margin: 0,
          borderRadius: 'sm',
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
          mt: 3,
          minWidth: 0,
          flexBasis: 240,
          flexGrow: 1,
          borderRadius: 'sm',
        }}
      >
        <List component="div" sx={{ '--List-padding': '1rem', '--List-divider-gap': '0px' }}>
          <Box
            sx={{ mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
          >
            <Typography fontWeight="lg">CSS Variables</Typography>
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
              flexDirection: 'column',
              gap: 2,
            }}
          >
            {data.map((dataItem) => {
              function renderField(item: DataItem) {
                const resolvedValue = sx[item.var] || item.defaultValue;
                return (
                  <TextField
                    key={item.var}
                    label={item.var}
                    size="sm"
                    variant="outlined"
                    helperText={item.helperText}
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
                          delete newSx[item.var];
                          return newSx;
                        }
                        return {
                          ...prevSx,
                          [item.var]: `${value}px`,
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
                );
              }
              if (Array.isArray(dataItem)) {
                const [slot, slotData, options] = dataItem;
                return [
                  <ListDivider key="divider" />,
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
