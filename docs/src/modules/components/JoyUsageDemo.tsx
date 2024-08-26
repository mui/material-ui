import * as React from 'react';
import Check from '@mui/icons-material/Check';
import CheckRounded from '@mui/icons-material/CheckRounded';
import ReplayRoundedIcon from '@mui/icons-material/ReplayRounded';
import Box from '@mui/joy/Box';
import Divider from '@mui/joy/Divider';
import Chip from '@mui/joy/Chip';
import FormControl from '@mui/joy/FormControl';
import FormLabel, { formLabelClasses } from '@mui/joy/FormLabel';
import FormHelperText from '@mui/joy/FormHelperText';
import IconButton from '@mui/joy/IconButton';
import Input, { inputClasses } from '@mui/joy/Input';
import ListItemDecorator, { listItemDecoratorClasses } from '@mui/joy/ListItemDecorator';
import Option, { optionClasses } from '@mui/joy/Option';
import Radio, { radioClasses } from '@mui/joy/Radio';
import RadioGroup from '@mui/joy/RadioGroup';
import Select from '@mui/joy/Select';
import Sheet from '@mui/joy/Sheet';
import Switch from '@mui/joy/Switch';
import Typography from '@mui/joy/Typography';
import { BrandingProvider } from '@mui/docs/branding';
import { HighlightedCode } from '@mui/docs/HighlightedCode';

const shallowEqual = (item1: { [k: string]: any }, item2: { [k: string]: any }) => {
  let equal = true;
  Object.entries(item1).forEach(([key, value]: [string, any]) => {
    if (item2[key] !== value) {
      equal = false;
    }
  });
  return equal;
};

const defaultGetCodeBlock = (code: string) => code;

function createCode(
  data: {
    name: string;
    props: Record<string, string | number | boolean>;
    childrenAccepted?: boolean;
  },
  getCodeBlock = defaultGetCodeBlock,
) {
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
      }
      if (prop[0] === 'children') {
        children = prop[1] as string;
      }
    });
    if (children) {
      code = `${code}${props.length > 2 ? `\n>` : '>'}\n  ${children}\n</${name}>`;
    } else {
      code = `${code}${props.length > 2 ? `\n${closedJsx}` : `${childrenAccepted ? '>' : ' />'}`}`;
    }
  }

  return getCodeBlock(code);
}

export const prependLinesSpace = (code: string, size: number = 2) => {
  const newCode: string[] = [];
  code.split('\n').forEach((line) => {
    newCode.push(`${Array(size).fill(' ').join('')}${line}`);
  });
  return newCode.join('\n');
};

interface JoyUsageDemoProps<ComponentProps> {
  /**
   * Name of the component to show in the code block.
   */
  componentName: string;
  /**
   * For displaying the close bracket of the component in the code block.
   * if `true`, shows '>' otherwise shows '/>'
   */
  childrenAccepted?: boolean;
  /**
   * Configuration
   */
  data: Array<{
    /**
     * Name of the prop, for example 'children'
     */
    propName: Extract<keyof ComponentProps, string>;
    /**
     * The controller to be used:
     * - `switch`: render the switch component for boolean
     * - `color`: render the built-in color selector
     * - `select`: render <select> with the specified options
     * - `input`: render <input />
     * - `radio`: render group of radios
     */
    knob?:
      | 'switch'
      | 'color'
      | 'select'
      | 'input'
      | 'radio'
      | 'controlled'
      | 'number'
      | 'placement';
    /**
     * The options for these knobs: `select` and `radio`
     */
    options?: Array<string>;
    /**
     * The labels for these knobs: `radio`
     */
    labels?: Array<string>;
    /**
     * The default value to be used by the components.
     * If exists, it will be injected to the `renderDemo` callback but it will not show
     * in the code block.
     *
     * To make it appears in the code block, specified `codeBlockDisplay: true`
     */
    defaultValue?: string | number | boolean;
    /**
     * If not specify (`undefined`), the prop displays when user change the value
     * If `true`, the prop with defaultValue will always display in the code block.
     * If `false`, the prop does not display in the code block.
     */
    codeBlockDisplay?: boolean;
    /**
     * The string to be displayed in the form label.
     * If not provided, the `propName` is displayed as Pascal case.
     */
    formLabel?: string;
    /**
     * The helper text to be displayed for the knob.
     */
    helperText?: string;
  }>;
  /**
   * A function to override the code block result.
   */
  getCodeBlock?: (code: string, props: ComponentProps) => string;
  renderDemo: (props: ComponentProps) => React.ReactElement<any>;
}

export default function JoyUsageDemo<T extends { [k: string]: any } = {}>({
  componentName,
  childrenAccepted = false,
  data,
  renderDemo,
  getCodeBlock = defaultGetCodeBlock,
}: JoyUsageDemoProps<T>) {
  const initialProps = {} as { [k in keyof T]: any };
  let demoProps = {} as { [k in keyof T]: any };
  let codeBlockProps = {} as { [k in keyof T]: any };
  data.forEach((p) => {
    demoProps[p.propName] = p.defaultValue;
    if (p.codeBlockDisplay) {
      initialProps[p.propName] = p.defaultValue;
    }
    if (!p.knob) {
      codeBlockProps[p.propName] = p.defaultValue;
    }
  });
  const [props, setProps] = React.useState<T>(initialProps as T);
  demoProps = { ...demoProps, ...props };
  codeBlockProps = { ...props, ...codeBlockProps };
  data.forEach((p) => {
    if (p.codeBlockDisplay === false) {
      delete codeBlockProps[p.propName];
    }
  });
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
          bgcolor: '#FFF',
          [theme.getColorSchemeSelector('dark')]: {
            backgroundColor: theme.palette.neutral[900],
          },
        })}
      >
        <Box sx={{ flexGrow: 1, m: 'auto', display: 'flex', alignItems: 'center' }}>
          {renderDemo(demoProps)}
        </Box>
        <BrandingProvider mode="dark">
          <HighlightedCode
            code={createCode(
              {
                name: componentName,
                props: codeBlockProps,
                childrenAccepted,
              },
              (code) => getCodeBlock(code, demoProps),
            )}
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
        <Box
          sx={{
            px: 3,
            py: 2,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Typography
            id="usage-props"
            component="h3"
            sx={{ fontWeight: 'lg', scrollMarginTop: 160, fontFamily: 'General Sans' }}
          >
            Playground
          </Typography>
          <IconButton
            aria-label="Reset all"
            variant="outlined"
            color="primary"
            size="sm"
            onClick={() => setProps(initialProps as T)}
            sx={{
              visibility: !shallowEqual(props, initialProps) ? 'visible' : 'hidden',
              '--IconButton-size': '30px',
            }}
          >
            <ReplayRoundedIcon />
          </IconButton>
        </Box>
        <Divider sx={{ opacity: 0.5 }} />
        <Box
          sx={{
            p: 3,
            display: 'flex',
            flexDirection: 'column',
            gap: 3,
            [`& .${formLabelClasses.root}`]: {
              fontWeight: 'lg',
            },
          }}
        >
          {data.map(
            ({
              propName,
              formLabel = propName,
              knob,
              options = [],
              defaultValue,
              labels,
              helperText,
            }) => {
              const resolvedValue = props[propName] ?? defaultValue;
              if (!knob) {
                return null;
              }
              if (knob === 'switch') {
                return (
                  <FormControl
                    key={propName}
                    size="sm"
                    sx={{ display: 'grid', gridTemplateColumns: '1fr auto', alignItems: 'center' }}
                  >
                    <FormLabel sx={{ textTransform: 'capitalize', mb: 0 }}>{formLabel}</FormLabel>
                    <Switch
                      checked={Boolean(resolvedValue)}
                      onChange={(event) =>
                        setProps((latestProps) => ({
                          ...latestProps,
                          [propName]: event.target.checked,
                        }))
                      }
                      sx={{
                        '--Switch-trackWidth': '32px',
                        '--Switch-trackBackground': (theme) =>
                          `rgba(${theme.vars.palette.neutral.mainChannel} / 0.3)`,
                        '&:hover': {
                          '--Switch-trackBackground': (theme) =>
                            `rgba(${theme.vars.palette.neutral.mainChannel} / 0.5)`,
                        },
                      }}
                    />
                    {helperText && (
                      <FormHelperText sx={{ gridColumn: 'span 2', m: 0 }}>
                        {helperText}
                      </FormHelperText>
                    )}
                  </FormControl>
                );
              }
              if (knob === 'radio') {
                const labelId = `${componentName}-${propName}`;
                return (
                  <FormControl key={propName} size="sm">
                    <FormLabel sx={{ textTransform: 'capitalize' }}>{formLabel}</FormLabel>
                    <RadioGroup
                      orientation="horizontal"
                      name={labelId}
                      value={resolvedValue}
                      onChange={(event) => {
                        let value: string | boolean | undefined = event.target.value;
                        if (value === 'true') {
                          value = true;
                        } else if (value === 'false') {
                          value = false;
                        } else if (value === 'undefined') {
                          value = undefined;
                        }
                        setProps((latestProps) => ({
                          ...latestProps,
                          [propName]: value,
                        }));
                      }}
                      sx={{ flexWrap: 'wrap', gap: 1, '--unstable_RadioGroup-margin': 0 }}
                    >
                      {options.map((value: string, index: number) => {
                        const checked = String(resolvedValue) === value;
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
                              label={<Typography>{labels?.[index] || value}</Typography>}
                              value={value}
                              disableIcon
                              overlay
                            />
                          </Chip>
                        );
                      })}
                    </RadioGroup>
                    {helperText && <FormHelperText>{helperText}</FormHelperText>}
                  </FormControl>
                );
              }
              if (knob === 'controlled') {
                const labelId = `${componentName}-${propName}`;
                const finalValue =
                  resolvedValue === undefined ? 'uncontrolled' : String(resolvedValue);
                return (
                  <FormControl key={propName} size="sm">
                    <FormLabel sx={{ textTransform: 'capitalize' }}>{formLabel}</FormLabel>
                    <RadioGroup
                      orientation="horizontal"
                      name={labelId}
                      value={finalValue}
                      onChange={(event) => {
                        let value: string | boolean | undefined = event.target.value;
                        if (value === 'true') {
                          value = true;
                        } else if (value === 'false') {
                          value = false;
                        } else if (value === 'uncontrolled') {
                          value = undefined;
                        }
                        setProps((latestProps) => ({
                          ...latestProps,
                          [propName]: value,
                        }));
                      }}
                      sx={{ flexWrap: 'wrap', gap: 1 }}
                    >
                      {['uncontrolled', 'true', 'false'].map((value, index) => {
                        const checked = finalValue === value;
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
                              label={<Typography>{labels?.[index] || value}</Typography>}
                              value={value}
                              disableIcon
                              overlay
                            />
                          </Chip>
                        );
                      })}
                    </RadioGroup>
                    {helperText && <FormHelperText>{helperText}</FormHelperText>}
                  </FormControl>
                );
              }
              if (knob === 'color') {
                return (
                  <FormControl key={propName} sx={{ mb: 1 }} size="sm">
                    <FormLabel sx={{ textTransform: 'capitalize' }}>{formLabel}</FormLabel>
                    <RadioGroup
                      orientation="horizontal"
                      name={`${componentName}-color`}
                      value={resolvedValue || ''}
                      onChange={(event) =>
                        setProps((latestProps) => ({
                          ...latestProps,
                          [propName || 'color']: event.target.value,
                        }))
                      }
                      sx={{ flexWrap: 'wrap', gap: 1.5, '--unstable_RadioGroup-margin': 0 }}
                    >
                      {(['primary', 'neutral', 'danger', 'success', 'warning'] as const).map(
                        (value) => {
                          const checked = resolvedValue === value;
                          return (
                            <Sheet
                              key={value}
                              variant="solid"
                              color={value}
                              sx={{
                                width: 26,
                                height: 26,
                                borderRadius: 'xl',
                                textTransform: 'capitalize',
                              }}
                            >
                              <Radio
                                variant="solid"
                                color={value}
                                label={value}
                                value={value}
                                disableIcon
                                overlay
                                sx={{
                                  // [`& .${radioClasses.action}`]: { bgcolor: `${value}.500` },
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
                                  color="inherit"
                                  sx={{
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
                        },
                      )}
                    </RadioGroup>
                    {helperText && <FormHelperText>{helperText}</FormHelperText>}
                  </FormControl>
                );
              }
              if (knob === 'select') {
                return (
                  <FormControl key={propName} size="sm">
                    <FormLabel sx={{ textTransform: 'capitalize' }}>{formLabel}</FormLabel>
                    <Select
                      placeholder="Select a variant..."
                      slotProps={{
                        listbox: {
                          sx: {
                            '--ListItemDecorator-size': '24px',
                          },
                        },
                      }}
                      value={(resolvedValue || 'none') as string}
                      onChange={(event, val) =>
                        setProps((latestProps) => ({
                          ...latestProps,
                          [propName]: val,
                        }))
                      }
                    >
                      {options.map((value) => (
                        <Option
                          key={value}
                          value={value}
                          label={value}
                          sx={{
                            [`&.${optionClasses.selected}`]: {
                              [`& .${listItemDecoratorClasses.root}`]: {
                                opacity: 1,
                              },
                            },
                          }}
                        >
                          <ListItemDecorator sx={{ opacity: 0 }}>
                            <CheckRounded />
                          </ListItemDecorator>
                          {value}
                        </Option>
                      ))}
                    </Select>
                    {helperText && <FormHelperText>{helperText}</FormHelperText>}
                  </FormControl>
                );
              }
              if (knob === 'input') {
                return (
                  <FormControl key={propName} size="sm">
                    <FormLabel sx={{ textTransform: 'capitalize' }}>{formLabel}</FormLabel>
                    <Input
                      size="sm"
                      value={props[propName] ?? ''}
                      onChange={(event) =>
                        setProps((latestProps) => ({
                          ...latestProps,
                          [propName]: event.target.value,
                        }))
                      }
                      sx={{
                        textTransform: 'capitalize',
                        [`& .${inputClasses.root}`]: {
                          bgcolor: 'background.body',
                        },
                      }}
                    />
                    {helperText && <FormHelperText>{helperText}</FormHelperText>}
                  </FormControl>
                );
              }
              if (knob === 'number') {
                return (
                  <FormControl key={propName} size="sm">
                    <FormLabel sx={{ textTransform: 'capitalize' }}>{formLabel}</FormLabel>
                    <Input
                      size="sm"
                      type="number"
                      value={
                        typeof props[propName] === 'number'
                          ? (props[propName] as number)
                          : (defaultValue as string)
                      }
                      onChange={(event) =>
                        setProps((latestProps) => ({
                          ...latestProps,
                          [propName]: Number.isNaN(event.target.valueAsNumber)
                            ? undefined
                            : event.target.valueAsNumber,
                        }))
                      }
                      sx={{
                        textTransform: 'capitalize',
                        [`& .${inputClasses.root}`]: {
                          bgcolor: 'background.body',
                        },
                      }}
                    />
                    {helperText && <FormHelperText>{helperText}</FormHelperText>}
                  </FormControl>
                );
              }
              if (knob === 'placement') {
                return (
                  <FormControl key={propName}>
                    <FormLabel sx={{ textTransform: 'capitalize' }}>{formLabel}</FormLabel>
                    <RadioGroup
                      name="placement"
                      value={resolvedValue}
                      onChange={(event) =>
                        setProps((latestProps) => ({
                          ...latestProps,
                          [propName]: event.target.value,
                        }))
                      }
                    >
                      <Box
                        sx={{
                          display: 'grid',
                          gridTemplateColumns: '40px 1fr 1fr 1fr 40px',
                          gridTemplateRows: 'repeat(5, 20px)',
                          gridAutoFlow: 'row dense',
                          alignItems: 'center',
                        }}
                      >
                        <Box
                          sx={{
                            gridRow: '2 / -2',
                            gridColumn: '2 / -2',
                            fontSize: 'sm',
                            border: '1px solid',
                            borderColor: 'divider',
                            borderRadius: 'sm',
                            alignSelf: 'stretch',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            fontWeight: 'md',
                            color: 'text.secondary',
                          }}
                        >
                          {resolvedValue}
                        </Box>
                        {/* void */}
                        <div />
                        <Box sx={{ gridColumn: '-1 / -2', gridRow: '1' }} />
                        <Box sx={{ gridRow: '-1 / -2', gridColumn: '1' }} />
                        {/* void */}
                        {[
                          'top-start',
                          'top',
                          'top-end',
                          'left-start',
                          'right-start',
                          'left',
                          'right',
                          'left-end',
                          'right-end',
                          'bottom-start',
                          'bottom',
                          'bottom-end',
                        ].map((placement) => (
                          <Sheet
                            key={placement}
                            variant="soft"
                            color="primary"
                            sx={{
                              position: 'relative',
                              height: '14px',
                              width: 32,
                              borderRadius: 'xs',
                              mx: 0.5,
                              ...(placement.match(/^(top|bottom)$/) && {
                                justifySelf: 'center',
                              }),
                              ...(placement.match(/^(top-end|bottom-end)$/) && {
                                justifySelf: 'flex-end',
                              }),
                            }}
                          >
                            <Radio
                              value={placement}
                              overlay
                              disableIcon
                              slotProps={{
                                action: ({ checked }) => ({
                                  sx: (theme) => ({
                                    ...(checked && {
                                      ...theme.variants.solid.primary,
                                      '&:hover': theme.variants.solid.primary,
                                    }),
                                  }),
                                }),
                              }}
                            />
                          </Sheet>
                        ))}
                      </Box>
                    </RadioGroup>
                    {helperText && <FormHelperText>{helperText}</FormHelperText>}
                  </FormControl>
                );
              }
              return null;
            },
          )}
        </Box>
      </Sheet>
    </Box>
  );
}
