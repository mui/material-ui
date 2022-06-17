import * as React from 'react';
import BrandingProvider from 'docs/src/BrandingProvider';
import HighlightedCode from 'docs/src/modules/components/HighlightedCode';
import { styled, ColorPaletteProp } from '@mui/joy/styles';
import Box from '@mui/joy/Box';
import Chip from '@mui/joy/Chip';
import Typography from '@mui/joy/Typography';
import IconButton from '@mui/joy/IconButton';
import RadioGroup from '@mui/joy/RadioGroup';
import Radio, { radioClasses } from '@mui/joy/Radio';
import Switch from '@mui/joy/Switch';
import Sheet from '@mui/joy/Sheet';
import Check from '@mui/icons-material/Check';
import TextField from '@mui/joy/TextField';
import { inputClasses } from '@mui/joy/Input';
import ReplayRoundedIcon from '@mui/icons-material/ReplayRounded';

const Select = styled('select')(({ theme }) => ({
  padding: '0.25rem',
  border: 'none',
  borderRadius: theme.radius.sm,
  width: '100%',
  minHeight: '2rem',
  ...theme.typography.body2,
  ...theme.variants.outlined.neutral,
  [theme.focus.selector]: {
    borderColor: theme.vars.palette.primary[500],
    boxShadow: `inset 0 0 0 1px ${theme.vars.palette.primary[500]}`,
    outline: 'none',
  },
}));

function createCode(data: {
  name: string;
  props: Record<string, string | number | boolean>;
  childrenAccepted?: boolean;
}) {
  const { props: inProps, name, childrenAccepted } = data;
  const closedJsx = childrenAccepted ? '>' : '/>';
  let code = `<${name}`;
  const props = Object.entries(inProps).sort((a, b) => a[0].localeCompare(b[0]));

  if (!Object.keys(props).length) {
    code = `${code} ${closedJsx}`;
  } else {
    let children = '';
    props.forEach((prop) => {
      if (prop[0] !== 'children' && prop[1] !== undefined) {
        if (props.length <= 2) {
          if (typeof prop[1] === 'boolean') {
            code = `${code} ${prop[0]}${prop[1] ? '' : '={false}'}`;
          } else if (typeof prop[1] === 'function') {
            code = `${code} ${prop[0]}={${(prop[1] as Function).toString()}}`;
          } else {
            code = `${code} ${prop[0]}=${
              typeof prop[1] === 'number' ? `{${prop[1]}}` : `"${prop[1]}"`
            }`;
          }
        } else if (typeof prop[1] === 'function') {
          code = `${code}\n  ${prop[0]}={${(prop[1] as Function).toString()}}`;
        } else if (typeof prop[1] === 'boolean') {
          code = `${code}\n  ${prop[0]}${prop[1] ? '' : '={false}'}`;
        } else {
          code = `${code}\n  ${prop[0]}=${
            typeof prop[1] === 'number' ? `{${prop[1]}}` : `"${prop[1]}"`
          }`;
        }
      } else {
        children = prop[1] as string;
      }
    });
    if (children) {
      code = `${code}>\n  ${children}\n</${name}>`;
    } else {
      code = `${code}${props.length > 2 ? `\n${closedJsx}` : `${childrenAccepted ? '>' : ' />'}`}`;
    }
  }

  return code;
}

interface JoyUsageDemoProps<ComponentProps> {
  componentName: string;
  childrenAccepted?: boolean;
  data: Array<{
    propName: keyof ComponentProps;
    knob?: 'switch' | 'color' | 'select' | 'input' | 'radio';
    options?: Array<string>;
    defaultValue?: string | number | boolean;
  }>;
  renderDemo: (props: ComponentProps) => React.ReactElement;
}

export default function JoyUsageDemo<T extends {} = {}>({
  componentName,
  childrenAccepted = false,
  data,
  renderDemo,
}: JoyUsageDemoProps<T>) {
  const defaultProps = data.reduce(
    (prev, curr) => ({
      ...prev,
      [curr.propName]: curr.defaultValue,
    }),
    {},
  ) as T;
  const staticProps = data
    .filter((p) => !p.knob)
    .reduce(
      (prev, curr) => ({
        ...prev,
        [curr.propName]: curr.defaultValue,
      }),
      {},
    ) as T;
  const [props, setProps] = React.useState<T>({} as T);
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
          {renderDemo({ ...defaultProps, ...props })}
        </Box>
        <BrandingProvider mode="dark">
          <HighlightedCode
            code={createCode({
              name: componentName,
              props: { ...props, ...staticProps },
              childrenAccepted,
            })}
            language="jsx"
            sx={{ display: { xs: 'none', md: 'block' } }}
          />
        </BrandingProvider>
      </Box>
      <Sheet
        variant="outlined"
        sx={{
          flexGrow: 1,
          gap: 2,
          p: 2,
          borderRadius: 'sm',
        }}
      >
        <Box
          sx={{
            mb: 2,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Typography id="usage-props" component="h3" fontWeight="lg" sx={{ scrollMarginTop: 160 }}>
            Props
          </Typography>
          <IconButton
            aria-label="Reset all"
            variant="outlined"
            color="neutral"
            size="sm"
            onClick={() => setProps({} as T)}
            sx={{
              visibility: Object.keys(props).length ? 'visible' : 'hidden',
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
          {data.map(({ propName, knob, options = [], defaultValue }) => {
            const resolvedValue = props[propName] || defaultValue;
            if (!knob) {
              return null;
            }
            if (knob === 'switch') {
              return (
                <Switch
                  key={propName as string}
                  checked={Boolean(props[propName])}
                  onChange={(event) =>
                    setProps((latestProps) => ({
                      ...latestProps,
                      [propName]: event.target.checked,
                    }))
                  }
                  endDecorator={String(propName)}
                  size="sm"
                  sx={{
                    alignSelf: 'flex-start',
                    '--Switch-track-background': (theme) =>
                      `rgba(${theme.vars.palette.neutral.mainChannel} / 0.3)`,
                    '&:hover': {
                      '--Switch-track-background': (theme) =>
                        `rgba(${theme.vars.palette.neutral.mainChannel} / 0.5)`,
                    },
                  }}
                />
              );
            }
            if (knob === 'radio') {
              const labelId = `${componentName}-${String(propName)}`;
              return (
                <Box key={propName as string}>
                  <Typography id={labelId} fontSize="xs" fontWeight="md" sx={{ mb: 0.5 }}>
                    {String(propName)}
                  </Typography>
                  <RadioGroup
                    row
                    name={labelId}
                    aria-labelledby={labelId}
                    value={resolvedValue}
                    onChange={(event) =>
                      setProps((latestProps) => ({
                        ...latestProps,
                        [propName]: event.target.value,
                      }))
                    }
                    sx={{ flexWrap: 'wrap', gap: 1 }}
                  >
                    {options.map((value) => {
                      const checked = resolvedValue === value;
                      return (
                        <Chip
                          key={value}
                          variant="plain"
                          color={checked ? 'primary' : 'neutral'}
                          size="sm"
                          sx={{ bgcolor: 'background.body' }}
                        >
                          <Radio
                            size="sm"
                            variant={checked ? 'solid' : 'outlined'}
                            color={checked ? 'primary' : 'neutral'}
                            label={<Typography>{value}</Typography>}
                            value={value}
                            disableIcon
                            overlay
                          />
                        </Chip>
                      );
                    })}
                  </RadioGroup>
                </Box>
              );
            }
            if (knob === 'color') {
              return (
                <Box key={propName as string} sx={{ mb: 1 }}>
                  <Typography id={`${componentName}-color`} fontSize="xs" fontWeight="lg" mb={1}>
                    Color
                  </Typography>
                  <RadioGroup
                    row
                    name={`${componentName}-color`}
                    aria-labelledby={`${componentName}-color`}
                    value={resolvedValue || ''}
                    onChange={(event) =>
                      setProps((latestProps) => ({
                        ...latestProps,
                        color: event.target.value,
                      }))
                    }
                    sx={{ flexWrap: 'wrap', gap: 1.5 }}
                  >
                    {['primary', 'neutral', 'danger', 'info', 'success', 'warning'].map((value) => {
                      const checked = resolvedValue === value;
                      return (
                        <Sheet key={value} sx={{ width: 28, height: 28, bgcolor: 'unset' }}>
                          <Radio
                            variant="solid"
                            color={value as ColorPaletteProp}
                            label={value}
                            value={value}
                            disableIcon
                            overlay
                            sx={{
                              [`& .${radioClasses.action}`]: { bgcolor: `${value}.500` },
                              [`& .${radioClasses.label}`]: {
                                fontSize: '10px',
                                color: 'text.secondary',
                                position: 'absolute',
                                bottom: '-1rem',
                                left: '50%',
                                transform: 'translateX(-50%)',
                                opacity: '0.01', // prevent double for touch device.
                                transition: '0.2s',
                              },
                              [`&:hover, &.${radioClasses.focusVisible}, &.${radioClasses.checked}`]:
                                {
                                  [`& .${radioClasses.label}`]: {
                                    opacity: 1,
                                    bottom: '-1.25rem',
                                  },
                                },
                            }}
                          />
                          {checked && (
                            <Check
                              fontSize="md"
                              sx={{
                                color: '#fff',
                                zIndex: 1,
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)',
                                pointerEvents: 'none',
                              }}
                            />
                          )}
                        </Sheet>
                      );
                    })}
                  </RadioGroup>
                </Box>
              );
            }
            if (knob === 'select') {
              const selectId = `${componentName}-${String(propName)}`;
              return (
                <Box key={propName as string}>
                  <Typography
                    component="label"
                    fontSize="xs"
                    fontWeight="lg"
                    mb={1}
                    htmlFor={selectId}
                  >
                    {String(propName)}
                  </Typography>
                  <Select
                    id={selectId}
                    value={(resolvedValue || 'none') as string}
                    onChange={(event) =>
                      setProps((latestProps) => ({
                        ...latestProps,
                        [propName]: event.target.value,
                      }))
                    }
                  >
                    {!resolvedValue && <option value="none">{''}</option>}
                    {options.map((value) => (
                      <option key={value} value={value}>
                        {value}
                      </option>
                    ))}
                  </Select>
                </Box>
              );
            }
            if (knob === 'input') {
              return (
                <TextField
                  key={propName as string}
                  label={String(propName)}
                  size="sm"
                  value={resolvedValue || ''}
                  onChange={(event) =>
                    setProps((latestProps) => ({
                      ...latestProps,
                      badgeContent: event.target.value || undefined,
                    }))
                  }
                  sx={{
                    [`& .${inputClasses.root}`]: {
                      bgcolor: 'background.body',
                    },
                  }}
                />
              );
            }
            return null;
          })}
        </Box>
      </Sheet>
    </Box>
  );
}
